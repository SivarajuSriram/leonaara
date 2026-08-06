import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ImageHero from "@/components/ImageHero";
import FirstBuildIntro from "@/components/base-camp/FirstBuildIntro";
import MediaGalleryDuo from "@/components/base-camp/MediaGalleryDuo";
import DetailsGallery from "@/components/base-camp/DetailsGallery";
import ExperienceIt from "@/components/base-camp/ExperienceIt";

export default function BaseCampPage() {
  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-red selection:text-white">
      <Header />
      <main className="relative z-10 bg-white">
        <ImageHero
          img="/media/2026/04/Base-Camp-Lao-044-copy-1800x1197.jpg"
          alt="Base Camp kitchen interior"
          title="Base Camp"
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
