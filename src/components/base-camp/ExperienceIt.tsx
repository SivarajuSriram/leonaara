import React from "react";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

const experience = [
  {
    title: "Book a stay",
    body: "Stay at Leonaara Camp through BESIDE. Cook, sleep, feel the difference. The best way to understand a Leonaara is to live in one.",
    cta: "Book a stay",
    href: "/#interested",
  },
  {
    title: "Schedule a visit",
    body: "Walk through with Leonaara's founder. Touch the panels, see the systems, ask anything.",
    cta: "Schedule a visit",
    href: "/#interested",
  },
  {
    title: "Follow along",
    body: "Follow @leonaara for updates on new builds, behind-the-scenes, and the next chapter.",
    cta: "Follow on Instagram",
    href: "https://www.instagram.com/leonaara/",
  },
];

export default function ExperienceIt() {
  return (
    <section className="relative w-full bg-[#f5f5e7] py-16 text-black md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          className="mb-12 md:mb-16"
          eyebrow="Experience it"
          heading="Come see for yourself."
          headingMaxWidth="max-w-2xl"
          body="Leonaara Camp is living proof of what Leonaara stands for. Here are a few ways to check it out."
        />

        <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-3" stagger={0.12} y={30}>
          {experience.map((item) => (
            <div key={item.title} className="flex flex-col gap-4 rounded-[4px] bg-white p-8">
              <h3 className="m-0 text-[20px] font-normal tracking-[-0.02em]">{item.title}</h3>
              <p className="m-0 flex-1 text-[14px] leading-[1.42] text-gray-600">{item.body}</p>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-1 text-[14px] font-medium uppercase text-black transition-colors hover:text-brand-red"
              >
                {item.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
