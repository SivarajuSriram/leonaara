import React from "react";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

const stats = [
  {
    key: "cost",
    label: "Cost certainty",
    value: "0",
    note: "Surprises. Clear price range before construction begins.",
    base: "Price clarity",
    conventional: "15–20% overruns",
  },
  {
    key: "decisions",
    label: "Decisions",
    value: "10–20",
    note: "Choices. Not 100+. You pick a model and a design package.",
    base: "10–20 decisions",
    conventional: "100+ decisions",
  },
];

export default function SystemAdvantageStats() {
  return (
    <section className="relative w-full bg-[#2d2d2d] py-16 text-white md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          eyebrow="The system advantage"
          eyebrowClassName="text-white/50"
          heading="The system removes the uncertainty."
          bodyClassName="text-white/70"
          body="Custom builds come with custom problems. Budget overruns, hundreds of decisions, and outcomes that depend on who shows up on site. The Base System locks everything down before construction begins."
        />

        <Reveal className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2" stagger={0.15} y={30}>
          {stats.map((s) => (
            <div key={s.key} className="flex flex-col gap-6 rounded-2xl bg-white/5 p-8">
              <p className="m-0 text-[12px] uppercase text-white/50">{s.label}</p>
              <p className="m-0 text-[48px] font-normal leading-none tracking-[-0.04em] text-white xl:text-[64px]">
                {s.value}
              </p>
              <p className="m-0 text-[14px] text-white/70">{s.note}</p>
              <div className="mt-2 flex items-end gap-8 border-t border-white/15 pt-4">
                <div>
                  <p className="m-0 text-[12px] uppercase text-white/50">Base</p>
                  <p className="m-0 text-[18px] text-white">{s.base}</p>
                </div>
                <div>
                  <p className="m-0 text-[12px] uppercase text-white/50">Conventional</p>
                  <p className="m-0 text-[18px] text-white">{s.conventional}</p>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
