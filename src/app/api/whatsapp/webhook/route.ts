import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { decryptSecret } from "@/lib/crypto";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Formato padrão do webhook da Evolution API:
    // payload.data.message...
    const instance = payload.instance;

    if (!instance) {
      return NextResponse.json({ ignored: true, reason: "Sem instância informada." });
    }

    const supabaseAdmin = createAdminClient();

    // Busca o psicólogo dono desta instância
    const { data: botSetting } = await supabaseAdmin
      .from("bot_settings")
      .select("*, users!inner(*)")
      .eq("whatsapp_instance_name", instance)
      .eq("is_active", true)
      .single();

    if (!botSetting) {
      return NextResponse.json({ ignored: true, reason: "Instância não configurada ou inativa." });
    }

    // Se for mensagem recebida (não enviada por nós)
    const messageData = payload.data;
    const isFromMe = messageData?.key?.fromMe;
    const remoteJid = messageData?.key?.remoteJid; // ex: 5511999999999@s.whatsapp.net
    const text = messageData?.message?.conversation || messageData?.message?.extendedTextMessage?.text;

    if (isFromMe || !remoteJid || !text) {
      return NextResponse.json({ ignored: true });
    }

    const senderPhone = remoteJid.replace("@s.whatsapp.net", "").replace(/\D/g, "");
    const formattedPhone = `+${senderPhone}`;

    // 1. Localiza ou cadastra o paciente automaticamente
    let { data: patient } = await supabaseAdmin
      .from("patients")
      .select("*")
      .eq("user_id", botSetting.user_id)
      .eq("phone", formattedPhone)
      .single();

    if (!patient) {
      const pushName = messageData.pushName || "Novo Paciente";
      const { data: newPatient } = await supabaseAdmin
        .from("patients")
        .insert({
          user_id: botSetting.user_id,
          full_name: pushName,
          phone: formattedPhone,
          status: "active",
        })
        .select()
        .single();
      patient = newPatient;
    }

    // 2. Resposta automatizada via Evolution API se token estiver configurado
    if (botSetting.whatsapp_api_url && botSetting.whatsapp_api_token) {
      try {
        const decryptedToken = decryptSecret(botSetting.whatsapp_api_token);
        const sendUrl = `${botSetting.whatsapp_api_url}/message/sendText/${instance}`;

        await fetch(sendUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: decryptedToken,
          },
          body: JSON.stringify({
            number: senderPhone,
            text: botSetting.welcome_message,
          }),
        });
      } catch (sendErr) {
        console.error("[whatsapp/webhook] Erro ao disparar resposta:", sendErr);
      }
    }

    return NextResponse.json({ ok: true, processed: true });
  } catch (err: unknown) {
    console.error("[whatsapp/webhook] Erro no processamento:", err);
    const message = err instanceof Error ? err.message : "Erro interno no processamento.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
