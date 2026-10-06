import "server-only";
import { Resend } from "resend";

const FROM = process.env.RESEND_FROM_EMAIL || "PsiFlow <onboarding@resend.dev>";

async function send(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return; // e-mail opcional até a chave ser configurada
  try {
    await new Resend(key).emails.send({ from: FROM, to, subject, html });
  } catch (err) {
    console.error("[email] falha ao enviar", err);
  }
}

const wrap = (body: string) =>
  `<div style="font-family:Urbanist,Arial,sans-serif;max-width:520px;margin:auto;padding:24px;color:#0f1312">
    <h2 style="margin:0 0 16px">PsiFlow</h2>${body}
    <p style="color:#6b7280;font-size:12px;margin-top:32px">Este é um e-mail automático. Não responda.</p>
  </div>`;

export function sendWelcomeEmail(to: string, name: string) {
  return send(
    to,
    "Bem-vindo(a) ao PsiFlow",
    wrap(`<p>Olá, ${escapeHtml(name || "profissional")}!</p>
      <p>Sua conta foi criada e seu período de teste de 7 dias já começou.</p>`),
  );
}

export function sendAccountDeletedEmail(to: string) {
  return send(
    to,
    "Sua conta PsiFlow foi excluída",
    wrap(`<p>Confirmamos a exclusão definitiva da sua conta e de todos os dados de pacientes e agendamentos
      associados, conforme o Art. 18 da LGPD.</p>`),
  );
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
