import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import YourSpace from "@/components/YourSpace";
import Models from "@/components/Models";
import ModelsIntro from "@/components/ModelsIntro";
import BaseAdvantage from "@/components/BaseAdvantage";
import RedefiningCottageIntro from "@/components/RedefiningCottageIntro";
import RedefiningCottageFeatures from "@/components/RedefiningCottageFeatures";
import SleepUnderStars from "@/components/SleepUnderStars";
import UpgradeModelIntro from "@/components/UpgradeModelIntro";
import UpgradeModelCards from "@/components/UpgradeModelCards";
import InteriorSlider from "@/components/InteriorSlider";
import PartnersIntro from "@/components/PartnersIntro";
import Partners from "@/components/Partners";
import DesignerBioCards from "@/components/DesignerBioCards";
import DesignerBioGallery from "@/components/DesignerBioGallery";
import BuiltForPeaceIntro from "@/components/BuiltForPeaceIntro";
import BuiltForPeaceFeatures from "@/components/BuiltForPeaceFeatures";
import Baseletter from "@/components/Baseletter";
import RawHtml from "@/components/RawHtml";
import FAQ from "@/components/FAQ";
import TextMedias from "@/components/TextMedias";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-red selection:text-white">
      <Header />
      <main className="single single-page relative z-10 bg-white" id="page-9">
        <Hero />
        <WhatWeDo />
        <YourSpace />
        <Models />
        <ModelsIntro />
        <BaseAdvantage />
        <RedefiningCottageIntro />
        <RedefiningCottageFeatures />
        <SleepUnderStars />
        <UpgradeModelIntro />
        <UpgradeModelCards />
        <InteriorSlider />
        <PartnersIntro />
        <Partners />
        <DesignerBioCards />
        <DesignerBioGallery />
        <BuiltForPeaceIntro />
        <BuiltForPeaceFeatures />
        <Baseletter />
        <FAQ />
        <TextMedias />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
