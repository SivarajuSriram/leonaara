import React from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import AnimatedText from "@/components/AnimatedText";

export default function FirstBuildIntro() {
  return (
    <section className="relative w-full bg-white py-[50px] text-black md:pb-[90px] md:pt-[100px] xl:py-[100px]">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="m-0 text-[12px] uppercase text-black md:text-[14px]">First build</p>
          <Link
            href="/#interested"
            className="inline-flex h-12 items-center justify-center rounded-[4px] bg-brand-red px-8 text-[15px] font-medium text-white transition-colors md:hover:bg-black"
          >
            Book Now
          </Link>
        </Reveal>
        <h2 className="mt-5 max-w-3xl text-[28px] font-normal leading-tight tracking-[-0.04em] md:mt-[30px] md:text-[44px] xl:mt-10 xl:text-[64px] xl:leading-[60px]">
          <AnimatedText text="Our first prototype, nestled in the woods." />
        </h2>
        <Reveal delay={0.4}>
          <p className="mt-6 max-w-md text-[14px] leading-[1.42] text-gray-600 md:text-[16px]">
            Leonaara Camp is our proof of concept, and you can spend the night in it. A complete Leonaara I in Racine in
            the Eastern Townships (QC), built with the same design, the same materials, and the same builders
            who&apos;ll work on your home.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
