import React from "react";
import Reveal from "@/components/Reveal";

export default function FinalCta() {
  return (
    <section className="relative w-full bg-white py-16 text-center md:py-20 xl:py-24">
      <Reveal className="mx-auto w-full max-w-[1920px] px-6">
        <h2 className="mx-auto max-w-2xl text-[28px] font-normal leading-tight tracking-[-0.04em] md:text-[44px] xl:text-[64px] xl:leading-[60px]">
          Let&apos;s build something together.
        </h2>
        <a
          href="/system-pricing"
          className="mt-10 inline-flex h-12 items-center justify-center rounded-[4px] bg-brand-red px-8 text-[15px] font-medium text-white transition-colors hover:bg-black"
        >
          See Pricing
        </a>
      </Reveal>
    </section>
  );
}
