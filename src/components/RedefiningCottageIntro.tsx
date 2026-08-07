"use client";
import React from "react";
import AnimatedText from "./AnimatedText";

export default function RedefiningCottageIntro() {
  return (
    <section className="w-full bg-white text-black pt-[50px] pb-[50px] md:pt-[60px] md:pb-[80px] xl:pt-[140px] xl:pb-[140px]">
      <div className="container mx-auto px-6 flex flex-col items-center max-w-4xl">
        <p className="text-[12px] md:text-[14px] font-normal leading-none text-center uppercase text-black">
          Why Leonaara
        </p>
        <h2 className="mt-5 md:mt-[30px] xl:mt-10 font-sans text-[28px] md:text-[44px] xl:text-[64px] font-normal leading-tight md:leading-none xl:leading-[60px] tracking-[-0.04em] text-center">
          <AnimatedText
            text="Built better and delivered faster for an all-in-one escape."
            className="justify-center"
            highlightWord="escape."
          />
        </h2>
        <div className="mt-6 md:mt-[30px] xl:mt-[60px] text-[14px] md:text-[16px] xl:text-[18px] leading-snug text-center text-black max-w-[670px]">
          <p>
            Our homes are prefabricated quickly and efficiently with innovative materials for a robust shell and a minimalist design.
          </p>
        </div>
      </div>
    </section>
  );
}
