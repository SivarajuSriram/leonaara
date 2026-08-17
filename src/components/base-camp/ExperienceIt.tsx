import React from "react";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

export interface ExperienceItem {
  title: string;
  body: string;
}

const defaultExperience: ExperienceItem[] = [
  {
    title: "Book a stay",
    body: "Stay at Leonaara Camp through BESIDE. Cook, sleep, feel the difference. The best way to understand a Leonaara is to live in one.",
  },
  {
    title: "Schedule a visit",
    body: "Walk through with Leonaara's founder. Touch the panels, see the systems, ask anything.",
  },
  {
    title: "Follow along",
    body: "Follow @leonaara for updates on new builds, behind-the-scenes, and the next chapter.",
  },
];

export default function ExperienceIt({
  eyebrow = "Experience it",
  heading = "Come see for yourself.",
  body = "Leonaara Camp is living proof of what Leonaara stands for. Here are a few ways to check it out.",
  items = defaultExperience,
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  items?: ExperienceItem[];
} = {}) {
  return (
    <section className="relative w-full bg-white py-16 text-black md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          className="mb-12 md:mb-16"
          eyebrow={eyebrow}
          heading={heading}
          headingMaxWidth="max-w-2xl"
          body={body}
        />

        <Reveal className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-12" stagger={0.12} y={24}>
          {items.map((item) => (
            <div key={item.title} className="flex flex-col">
              <h3 className="m-0 border-b border-black/15 pb-[18px] text-[17px] font-semibold tracking-[-0.01em]">
                {item.title}
              </h3>
              <p className="mb-7 mt-[18px] flex-1 text-[15px] leading-[1.6] text-black/80">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
