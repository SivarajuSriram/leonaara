"use client";
import React from "react";
import AnimatedText from "./AnimatedText";

export default function BuiltForPeaceIntro() {
  return (
    <section className="w-full bg-white text-black pt-10 pb-[50px] md:pt-20 md:pb-20 xl:pt-[100px] xl:pb-20">
      <div className="container mx-auto px-6 flex flex-col items-center max-w-4xl">
        <p className="text-[12px] md:text-[14px] font-normal leading-none text-center uppercase text-black">
          A simpler way to live
        </p>
        <h2 className="mt-5 md:mt-[30px] xl:mt-10 font-sans text-[28px] md:text-[44px] xl:text-[64px] font-normal leading-tight md:leading-none xl:leading-[60px] tracking-[-0.04em] text-center">
          <AnimatedText
            text="Do less, better."
            className="justify-center"
          />
        </h2>
        <div className="mt-6 md:mt-[30px] xl:mt-[60px] text-[14px] md:text-[16px] xl:text-[18px] leading-snug text-center text-black max-w-[670px]">
          <p>
            Our homes are compact by design. With a focus on quality over size, we can offer a more tailored design with greater emphasis on the details.
          </p>
        </div>
      </div>
    </section>
  );
}
