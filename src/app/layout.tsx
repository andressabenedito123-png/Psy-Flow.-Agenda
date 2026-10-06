import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PsiFlow | Secretária Virtual WhatsApp para Psicólogos",
  description: "Plataforma multi-tenant de gestão, triagem e agendamento automático via WhatsApp para psicólogos e clínicas com segurança LGPD.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${urbanist.variable} dark`}>
      <body className="min-h-screen bg-[#08090b] text-[#f3f4f6] font-sans antialiased selection:bg-[#D2F802] selection:text-[#08090b]">
        {children}
      </body>
    </html>
  );
}
