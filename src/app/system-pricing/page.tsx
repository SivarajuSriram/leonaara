import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ImageHero from "@/components/ImageHero";
import PageHeading from "@/components/PageHeading";
import HowItWorks from "@/components/system-pricing/HowItWorks";
import BaseAdvantageStats from "@/components/system-pricing/BaseAdvantageStats";
import BannerDivider from "@/components/system-pricing/BannerDivider";
import BuildAdvantageGrid from "@/components/system-pricing/BuildAdvantageGrid";
import PerformanceStats from "@/components/system-pricing/PerformanceStats";
import PricingCards from "@/components/system-pricing/PricingCards";
import GettingStarted from "@/components/system-pricing/GettingStarted";

const easySystemBanner = "An easy building system for fast, high performance builds.";

const pageDescription =
  "Explore Leonaara's build system, performance stats, and pricing for the Leonaara 1 and Leonaara 1+ models.";

export const metadata: Metadata = {
  title: "System & Pricing",
  description: pageDescription,
  openGraph: {
    title: "System & Pricing | Leonaara",
    description: pageDescription,
    url: "https://leonaara.com/system-pricing",
    images: ["/media/2026/04/How-it-works-2800x1842.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "System & Pricing | Leonaara",
    description: pageDescription,
    images: ["/media/2026/04/How-it-works-2800x1842.jpg"],
  },
};

export default function SystemPricingPage() {
  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-red selection:text-white">
      <Header light />
      <main className="relative z-10 bg-white">
        <ImageHero
          img="/media/2026/04/How-it-works-2800x1842.jpg"
          alt="System & Pricing"
          eyebrow="System & Pricing"
        />
        <PageHeading
          eyebrow="Leonaara Build System"
          title="A better way to build a home."
          body="A high-performance home with a defined price, a certified builder, and a clear process from start to finish."
        />
        <HowItWorks />
        <BaseAdvantageStats />
        <BannerDivider text={easySystemBanner} />
        <BuildAdvantageGrid />
        <PerformanceStats />
        <BannerDivider text={easySystemBanner} />
        <PricingCards />
        <GettingStarted />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
