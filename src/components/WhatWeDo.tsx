"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedLines from "./AnimatedLines";

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative pt-0 pb-0 md:pt-0 md:pb-0 lg:pt-0 lg:pb-0 mt-0 mb-0 md:mt-0 md:mb-0 lg:mt-0 lg:mb-0 bg-white text-black">
      <header className="w-full max-w-[1920px] mx-auto px-6 flex flex-col items-center py-[100px] md:py-[150px]">
        <div>
          <p className="text-[12px] md:text-[14px] font-normal leading-[1.16] md:leading-none text-center uppercase m-0">The Birth of Leonaara</p>
        </div>
        
        <h2 
          className="font-sans text-[28px] md:text-[44px] xl:text-[64px] font-normal leading-[1.07] md:leading-none xl:leading-[0.93] tracking-[-0.04em] text-center m-0 mt-[20px] md:mt-[30px] xl:mt-[40px]"
        >
          <AnimatedLines
            className="text-center"
            lines={[
              { content: "Inspired by the Forces That" },
              {
                content: (
                  <>
                    Shape{" "}
                    <span className="font-serif italic font-light">Life.</span>
                  </>
                ),
              },
            ]}
          />
        </h2>
        
        <div 
          ref={textRef}
          className="text-[14px] md:text-[16px] xl:text-[18px] leading-[1.42] md:leading-[1.5] xl:leading-[1.33] text-center mt-[24px] md:mt-[30px] xl:mt-[60px] max-w-2xl text-[#1a1a1a]"
        >
          <p>Before there were structures, there were elements. Earth, water, air, light, and space have shaped existence for millennia.  At Leonaara, we draw from these timeless forces to craft environments that feel balanced, natural, and deeply connected to the way people want to live.</p>
        </div>
      </header>
    </section>
  );
}