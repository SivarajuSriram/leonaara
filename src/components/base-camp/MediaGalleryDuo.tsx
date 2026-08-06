import React from "react";
import Reveal from "@/components/Reveal";

export default function MediaGalleryDuo() {
  return (
    <section className="relative w-full bg-white pb-16 md:pb-20 xl:pb-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <Reveal className="grid grid-cols-2 gap-4 md:gap-6" stagger={0.15} y={40}>
          <div className="relative mt-16 aspect-[2/1] overflow-hidden rounded-[4px] md:mt-24">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/2026/04/Base-Camp-Lao-033-1800x1197.jpg"
              alt="Base Camp exterior in the snow"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="relative aspect-[2/1] overflow-hidden rounded-[4px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/2026/04/Base-Camp-Lao-006-1-scaled.jpg"
              alt="Base Camp prototype in the woods"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
