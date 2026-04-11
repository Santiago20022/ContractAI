import { ClientTypes } from "@/components/landing/ClientTypes";
import { Comparison } from "@/components/landing/Comparison";
import { ContractTypes } from "@/components/landing/ContractTypes";
import { CTA } from "@/components/landing/CTA";
import { FAQ } from "@/components/landing/FAQ";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ClientTypes />
      <Features />
      <Stats />
      <HowItWorks />
      <ContractTypes />
      <Testimonials />
      <Pricing />
      <Comparison />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
