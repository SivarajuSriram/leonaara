import React from "react";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

const gallery = [
  "/media/2026/04/Base-Camp-Lao-007-copy-1800x2708.jpg",
  "/media/2026/04/Base-Camp-Lao-018-copy-1800x2700.jpg",
  "/media/2026/04/Base-Camp-Lao-010-copy.jpg",
  "/media/2026/04/Base-Camp-Lao-030-copy-1800x2700.jpg",
  "/media/2026/04/Base-Camp-Lao-003-copy.jpg",
  "/media/2026/04/Base-Camp-Lao-039-copy-1800x2707.jpg",
];

export default function DetailsGallery() {
  return (
    <section className="relative w-full bg-white py-16 text-black md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          className="mb-12 md:mb-16"
          eyebrow="The details"
          heading="Every detail, up close."
          headingMaxWidth="max-w-2xl"
          body="More with less. Fewer materials, fewer finishes, fewer decisions, but every one carefully chosen and meant to last."
        />

        <Reveal className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4" stagger={0.1} y={40}>
          {gallery.map((src, i) => (
            <div
              key={src}
              className={`relative aspect-[3/4] overflow-hidden rounded-[4px] ${i === 0 ? "col-span-2 aspect-[3/2] md:col-span-1 md:aspect-[3/4]" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
