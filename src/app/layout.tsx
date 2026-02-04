import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ContractAI - Tu Asistente Legal Inteligente",
  description: "Genera, analiza y comprende contratos legales en segundos. Protege tu negocio con inteligencia artificial.",
  keywords: ["contratos", "legal", "AI", "freelancer", "negocios", "NDA", "servicios"],
  authors: [{ name: "ContractAI" }],
  openGraph: {
    title: "ContractAI - Tu Asistente Legal Inteligente",
    description: "Genera, analiza y comprende contratos legales en segundos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
