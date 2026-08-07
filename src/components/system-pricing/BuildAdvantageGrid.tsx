import React from "react";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

const buildAdvantage = [
  {
    title: "Design resolved",
    subtitle: "A clear starting point",
    body: "Pre-developed design packages and a dedicated design meeting. The spec book your builder receives covers materials, finishes, and details. Ready to build from.",
  },
  {
    title: "Materials specified",
    subtitle: "Selected for a reason",
    body: "Passive House certified windows, bio-sourced panels, architectural millwork. Each component has been tested and sourced through a coordinated supply chain.",
  },
  {
    title: "Performance defined",
    subtitle: "Measured on site",
    body: "Airtightness, thermal envelope, and material standards. Built into the documentation your builder follows.",
  },
  {
    title: "Build coordinated",
    subtitle: "We stay involved",
    body: "Your certified builder gets the full documentation package. Leonaara coordinates milestone check-ins during the build.",
  },
];

export default function BuildAdvantageGrid() {
  return (
    <section className="relative w-full bg-white py-16 md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          eyebrow="Leonaara Build Advantage"
          heading="Less to figure out. More to look forward to."
          body="We've tested the materials, refined the details, and documented the build process. What's left for you is the fun part: picking a model and a design package."
        />

        <Reveal
          className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 xl:grid-cols-4"
          stagger={0.1}
          y={30}
        >
          {buildAdvantage.map((item) => (
            <div key={item.title} className="border-t border-black/10 pt-6">
              <h3 className="m-0 text-[20px] font-normal tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 text-[14px] text-brand-red">{item.subtitle}</p>
              <p className="mt-3 text-[14px] leading-[1.42] text-gray-600">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
