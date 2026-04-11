import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ContractAI — Contratos legales sin complicaciones",
  description:
    "Genera y analiza contratos legales en segundos con IA. Gratis para freelancers, startups y empresas en Latinoamérica. Sin abogados, sin demoras.",
  keywords: [
    "contratos legales",
    "generador de contratos",
    "IA legal",
    "freelancers",
    "NDA",
    "contrato de servicios",
    "LATAM",
    "Colombia",
    "México",
    "Argentina",
  ],
  authors: [{ name: "Santiago García" }],
  openGraph: {
    title: "ContractAI — Contratos legales sin complicaciones",
    description:
      "Genera y analiza contratos legales en segundos con IA. Gratis para freelancers, startups y empresas en Latinoamérica.",
    siteName: "ContractAI",
    locale: "es_LA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ContractAI — Contratos legales sin complicaciones",
    description:
      "Genera y analiza contratos en segundos con IA. Gratis para freelancers y startups.",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
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
