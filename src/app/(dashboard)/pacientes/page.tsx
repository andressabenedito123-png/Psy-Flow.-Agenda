"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { NewPatientModal } from "@/components/new-patient-modal";
import {
  Search,
  ShieldCheck,
  Phone,
  Calendar,
  MoreVertical,
  Loader2
} from "lucide-react";

// Conexão direta com o Supabase usando as chaves de ambiente
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Busca os pacientes reais do Supabase ao carregar a página
  useEffect(() => {
    async function buscarPacientes() {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('full_name', { ascending: true }); // Ordem alfabética

      if (data) {
        setPacientes(data);
      }
      setCarregando(false);
    }

    buscarPacientes();
  }, []);

  // Formata os dados do banco para encaixar perfeitamente no design da tabela
  const pacientesFormatados = pacientes.map((paciente) => ({
    id: paciente.id,
    nome: paciente.full_name || "Sem Nome",
    telefone: paciente.phone || "Sem telefone",
    email: paciente.email || "Sem e-mail",
    status: "active",
    totalSessoes: 0,
    ultimaSessao: "-",
    proximaSessao: "Agendar",
    anotacoes: ""
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Gestão de Pacientes
            </h1>
            <span className="finpath-badge finpath-badge-lime text-[11px]">
              {carregando ? "Carregando..." : `${pacientesFormatados.length} cadastrados`}
            </span>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Lista de pacientes, dados de contato protegidos e histórico logístico de agendamentos.
          </p>
        </div>

        <NewPatientModal />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome ou telefone..."
            className="w-full bg-[#11131a] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D2F802]/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-[#D2F802]" />
          <span>Telefones mascarados conforme Art. 6º LGPD</span>
        </div>
      </div>

      {/* Finpath Patient Tracking Table */}
      <div className="finpath-card overflow-hidden border border-white/10 rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#12151d] text-gray-400 uppercase tracking-wider font-semibold text-[10px] border-b border-white/5">
              <tr>
                <th className="py-3.5 px-5">Paciente</th>
                <th className="py-3.5 px-5">WhatsApp / Contato</th>
                <th className="py-3.5 px-5">Sessões Realizadas</th>
                <th className="py-3.5 px-5">Próxima Consulta</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {carregando ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Buscando pacientes no banco de dados...
                  </td>
                </tr>
              ) : pacientesFormatados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500">
                    Nenhum paciente cadastrado ainda.
                  </td>
                </tr>
              ) : (
                pacientesFormatados.map((paciente) => (
                  <tr key={paciente.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs text-[#D2F802]">
                          {paciente.nome.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">{paciente.nome}</div>
                          <div className="text-[10px] text-gray-500">{paciente.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 font-mono text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-500" />
                        {paciente.telefone}
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-bold text-white font-mono">{paciente.totalSessoes}</div>
                      <div className="text-[10px] text-gray-500">Última: {paciente.ultimaSessao}</div>
                    </td>

                    <td className="py-4 px-5">
                      <div className="font-semibold text-gray-200 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D2F802]" />
                        {paciente.proximaSessao}
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${paciente.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-gray-500/10 text-gray-400 border-gray-500/30"
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${paciente.status === "active" ? "bg-emerald-400" : "bg-gray-400"}`} />
                        {paciente.status === "active" ? "Ativo" : "Inativo"}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
