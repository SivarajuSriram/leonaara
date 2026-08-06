"use client";
import React from "react";
import AnimatedText from "./AnimatedText";

export default function PartnersIntro() {
  return (
    <section className="w-full bg-white text-black pt-[60px] pb-[40px] md:pt-[60px] md:pb-[40px] xl:pt-[120px] xl:pb-[70px]">
      <div className="container mx-auto px-6 flex flex-col items-center max-w-4xl">
        <p className="text-[12px] md:text-[14px] font-normal leading-none text-center uppercase text-black">
          Our partners
        </p>
        <h2 className="mt-5 md:mt-[30px] xl:mt-10 font-sans text-[28px] md:text-[44px] xl:text-[64px] font-normal leading-tight md:leading-none xl:leading-[60px] tracking-[-0.04em] text-center">
          <AnimatedText
            text="An ode to good craftsmanship in collaboration with local artisans."
            className="justify-center"
            highlightWord="craftsmanship"
          />
        </h2>
      </div>
    </section>
  );
}
