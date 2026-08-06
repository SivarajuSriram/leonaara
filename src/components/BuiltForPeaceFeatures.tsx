"use client";
import React from "react";

const features = [
  {
    title: "Lean on square footage, big on quality.",
    text: "Reduce your footprint without sacrificing what's important. The basics, elevated.",
  },
  {
    title: "Do more, with less.",
    text: "Less time for worrying, more time for living.",
  },
  {
    title: "Minimize the excess, maximize the essential.",
    text: "It's the little things that matter the most, really.",
  },
];

export default function BuiltForPeaceFeatures() {
  return (
    <section className="w-full bg-white text-black pt-0 pb-[60px] md:pb-[100px] xl:pb-10">
      <div className="container mx-auto max-w-[1920px] px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-24">
          <div className="w-full overflow-hidden lg:w-1/2">
            <video
              className="aspect-square w-full object-cover"
              width="1600"
              height="1600"
              muted
              autoPlay
              loop
              playsInline
              src="/media/2024/03/BaseHabitation_Musique-V03_carre.mp4"
            />
          </div>

          <div className="flex w-full flex-col lg:w-1/2">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex flex-col gap-3 py-8 ${index > 0 ? "border-t border-black/10" : ""}`}
              >
                <h3 className="font-serif font-light text-[24px] leading-tight md:text-[28px] xl:text-[32px]">
                  {feature.title}
                </h3>
                <p className="text-[14px] leading-snug text-black xl:text-[16px]">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
