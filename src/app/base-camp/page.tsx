import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ImageHero from "@/components/ImageHero";
import FirstBuildIntro from "@/components/base-camp/FirstBuildIntro";
import MediaGalleryDuo from "@/components/base-camp/MediaGalleryDuo";
import DetailsGallery from "@/components/base-camp/DetailsGallery";
import ExperienceIt from "@/components/base-camp/ExperienceIt";

const pageDescription =
  "Tour Leonaara Camp, Leonaara's finished prototype home, and discover ways to visit, stay, or follow along.";

export const metadata: Metadata = {
  title: "Leonaara Camp",
  description: pageDescription,
  openGraph: {
    title: "Leonaara Camp | Leonaara",
    description: pageDescription,
    url: "https://leonaara.com/base-camp",
    images: ["/media/2026/04/Base-Camp-Lao-044-copy-1800x1197.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonaara Camp | Leonaara",
    description: pageDescription,
    images: ["/media/2026/04/Base-Camp-Lao-044-copy-1800x1197.jpg"],
  },
};

export default function BaseCampPage() {
  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-red selection:text-white">
      <Header />
      <main className="relative z-10 bg-white">
        <ImageHero
          img="/media/2026/04/Base-Camp-Lao-044-copy-1800x1197.jpg"
          alt="Leonaara Camp kitchen interior"
          title="Leonaara Camp"
        />
        <FirstBuildIntro />
        <MediaGalleryDuo />
        <DetailsGallery />
        <ExperienceIt />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
