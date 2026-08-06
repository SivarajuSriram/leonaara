"use client";
import React from "react";
import AnimatedText from "./AnimatedText";

export default function UpgradeModelIntro() {
  return (
    <section className="w-full bg-[#f5f5e7] text-black pt-[50px] pb-[40px] md:pt-[50px] md:pb-[60px] xl:pt-[90px] xl:pb-[90px]">
      <div className="container mx-auto px-6 flex flex-col items-center max-w-4xl">
        <p className="text-[12px] md:text-[14px] font-normal leading-none text-center uppercase text-black">
          REDEFINING THE COTTAGE
        </p>
        <h2 className="mt-5 md:mt-[30px] xl:mt-10 font-sans text-[28px] md:text-[44px] xl:text-[64px] font-normal leading-tight md:leading-none xl:leading-[60px] tracking-[-0.04em] text-center">
          <AnimatedText
            text="Your pied-à-terre in the mountains, the forest or the countryside."
            className="justify-center"
            highlightWord="pied-à-terre"
          />
        </h2>
        <div className="mt-6 md:mt-[30px] xl:mt-[60px] text-[14px] md:text-[16px] xl:text-[18px] leading-snug text-center text-black max-w-[670px]">
          <p>
            The <em>cottage</em> has evolved. That&apos;s why we&apos;re creating a simpler and more accessible alternative by building it better and faster, and by future-proofing it with our Base Ecosystem.
          </p>
        </div>
      </div>
    </section>
  );
}
