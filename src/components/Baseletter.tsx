"use client";
import React from "react";
import AnimatedText from "./AnimatedText";

export default function Baseletter() {
  return (
    <section className="w-full bg-white text-black pt-0 pb-16 md:pb-10 lg:pt-10 lg:pb-20">
      <div className="container mx-auto px-6 flex flex-col items-center max-w-5xl text-center">
        <h2 className="font-sans text-[28px] md:text-[40px] xl:text-[52px] font-normal leading-tight tracking-[-0.03em]">
          <AnimatedText
            text="Sound like music to your ears?"
            className="justify-center"
          />
          <AnimatedText
            text="Follow the Baseletter for more."
            className="justify-center"
            highlightWord="Baseletter"
          />
        </h2>

        <div className="mt-4 md:mt-6 xl:mt-8 w-full flex justify-center">
          <button className="inline-flex h-11 items-center justify-center rounded-[4px] bg-brand-red px-8 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-black">
            Sign up
          </button>
        </div>
      </div>
    </section>
  );
}
