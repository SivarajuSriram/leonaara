import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ImageHero from "@/components/ImageHero";
import PageHeading from "@/components/PageHeading";
import WhatsIncluded from "@/components/base-build-system/WhatsIncluded";
import SystemAdvantageStats from "@/components/base-build-system/SystemAdvantageStats";
import BuildComparison from "@/components/base-build-system/BuildComparison";
import SpecsAndPalette from "@/components/base-build-system/SpecsAndPalette";
import FinalCta from "@/components/base-build-system/FinalCta";

const pageDescription =
  "See what's included in the Leonaara Build System: complete plans, a certified builder, fixed pricing, and performance guarantees.";

export const metadata: Metadata = {
  title: "Leonaara Build System",
  description: pageDescription,
  openGraph: {
    title: "Leonaara Build System | Leonaara",
    description: pageDescription,
    url: "https://leonaara.com/base-build-system",
    images: ["/media/2026/04/Base-Build-System-Main-2800x1842.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonaara Build System | Leonaara",
    description: pageDescription,
    images: ["/media/2026/04/Base-Build-System-Main-2800x1842.jpg"],
  },
};

export default function BaseBuildSystemPage() {
  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-red selection:text-white">
      <Header light />
      <main className="relative z-10 bg-white">
        <ImageHero
          img="/media/2026/04/Base-Build-System-Main-2800x1842.jpg"
          alt="Leonaara Build System"
          eyebrow="How it works"
        />
        <PageHeading
          eyebrow="Leonaara Build System"
          title="A complete housing system."
          body="Most homes are built from scratch. Custom plans with custom problems and surprises. The Leonaara Build System is different. The materials, the details, the performance targets have been designed, tested, and documented before your project begins."
        />
        <WhatsIncluded />
        <SystemAdvantageStats />
        <BuildComparison />
        <SpecsAndPalette />
        <FinalCta />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
