import React from "react";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

const stats = [
  {
    key: "timeline",
    label: "Build timeline",
    value: "3X",
    note: "Up to 3X faster than a conventional custom build",
    base: "3-4 Months",
    conventional: "6-12 Months",
  },
  {
    key: "waste",
    label: "Building waste",
    value: "60%",
    note: "Up to 60% less waste than conventional construction",
    base: "12.9 kg waste/m²",
    conventional: "21.5 kg waste/m²",
  },
];

export default function BaseAdvantageStats() {
  return (
    <section className="relative w-full bg-[#f5f5e7] py-16 md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          eyebrow="The Leonaara Advantage"
          heading="Building faster and building better."
          body="Build smarter, build faster, waste less. Our prefabricated panels assemble up to 3X faster than conventional construction. Cutting happens in the factory, so most of the waste never reaches your land."
        />

        <Reveal className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2" stagger={0.15} y={30}>
          {stats.map((s) => (
            <div key={s.key} className="flex flex-col gap-6 rounded-[4px] bg-white p-8">
              <p className="m-0 text-[12px] uppercase text-gray-500">{s.label}</p>
              <p className="m-0 text-[48px] font-normal leading-none tracking-[-0.04em] text-brand-red xl:text-[64px]">
                {s.value}
              </p>
              <p className="m-0 text-[14px] text-gray-600">{s.note}</p>
              <div className="mt-2 flex items-end gap-8 border-t border-black/10 pt-4">
                <div>
                  <p className="m-0 text-[12px] uppercase text-gray-500">Leonaara</p>
                  <p className="m-0 text-[18px]">{s.base}</p>
                </div>
                <div>
                  <p className="m-0 text-[12px] uppercase text-gray-500">Conventional</p>
                  <p className="m-0 text-[18px]">{s.conventional}</p>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
