"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedText from "./AnimatedText";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ModelsIntro() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white text-black pb-[60px] pt-0 lg:pb-[110px] lg:pt-[120px]"
    >
      <div className="container mx-auto px-6 flex flex-col items-center">
        <h2 className="font-sans text-[28px] md:text-[44px] xl:text-[64px] font-normal leading-tight md:leading-none xl:leading-[60px] tracking-[-0.04em] text-center">
          <AnimatedText
            text="Two base models."
            className="justify-center"
          />
          <AnimatedText
            text="Unlimited adventures."
            className="justify-center"
          />
        </h2>

        <div className="mt-10 flex justify-center">
          <Link
            href="#waitlist"
            className="inline-flex h-11 items-center justify-center rounded-[4px] bg-brand-red px-8 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-black"
          >
            Join the Waitlist
          </Link>
        </div>
      </div>
    </section>
  );
}
