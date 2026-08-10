import React from "react";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

type PerformanceStat = {
  headline: string;
  label: string;
  value: string;
  unit: string;
  rows?: string[][];
  table?: { headers: string[]; rows: string[][] };
  note: string;
};

const performance: PerformanceStat[] = [
  {
    headline: "The leading indicator of efficiency: Air tightness",
    label: "Air tightness",
    value: "0.25",
    unit: "ACH @ 50Pa",
    rows: [
      ["Leonaara", "0.25–0.29"],
      ["Passive House", "0.6"],
      ["Conventional", "3.0–5.0"],
    ],
    note: "The lower the better. 2X better than Passive House strict minimums and 10–20X better than conventional homes.",
  },
  {
    headline: "The benefit of bio-sourced materials",
    label: "Thermal lag",
    value: "11–17.2",
    unit: "Hours",
    table: {
      headers: ["", "LEONAARA", "Conventional"],
      rows: [
        ["Walls", "11h", "4h"],
        ["Roof", "17.2h", "6h"],
      ],
    },
    note: "The longer the better. Thermal lag refers to the time it takes for heat to move through a home's shell.",
  },
  {
    headline: "Triple-glazed, Passive House certified windows",
    label: "Window performance",
    value: "0.64",
    unit: "W/(m²K)",
    rows: [
      ["NZP Passive House certified triple glazed", "0.64"],
      ["Conventional double-glazed", "2.0–2.5"],
    ],
    note: "The lower the better. Our Passive House certified windows are nearly 4X more efficient than conventional double-glazed.",
  },
  {
    headline: "Carbon negative panels: the future of building",
    label: "Carbon footprint",
    value: "-42",
    unit: "kg CO₂/m²",
    rows: [
      ["Leonaara: Building shell carbon average", "-42"],
      ["Conventional: Building shell carbon average", "+45"],
    ],
    note: "Our bio-based building shells use materials that have absorbed more carbon than their production emitted.",
  },
];

export default function PerformanceStats() {
  return (
    <section className="relative w-full bg-white py-16 md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          eyebrow="Performance"
          heading="How does Leonaara compare?"
          body="We've tested the system in real conditions. Airtightness, thermal envelope, embodied carbon. Here's what we measured."
        />
        <Reveal delay={0.5} className="flex justify-center">
          <a
            href="https://leonaara.com/wp-content/uploads/2026/05/Leonaara-Technical-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1 text-[14px] font-medium uppercase text-black transition-colors md:hover:text-brand-red"
          >
            See full comparison specs
            <span>→</span>
          </a>
        </Reveal>

        <Reveal className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2" stagger={0.12} y={30}>
          {performance.map((p) => (
            <div key={p.label} className="flex flex-col gap-4 rounded-[4px] border border-black/10 p-8">
              <p className="m-0 text-[15px] font-normal leading-snug">{p.headline}</p>
              <p className="m-0 text-[12px] uppercase text-gray-500">{p.label}</p>
              <p className="m-0 text-[36px] font-normal leading-none tracking-[-0.04em] text-brand-red xl:text-[44px]">
                {p.value} <span className="text-[16px] text-black">{p.unit}</span>
              </p>
              {p.table ? (
                <table className="w-full border-t border-black/10 pt-4 text-[14px]" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {p.table.headers.map((h, i) => (
                        <th
                          key={h || `h-${i}`}
                          className={`pt-4 pb-1 text-[12px] uppercase text-gray-500 ${
                            i === 0 ? "text-left" : "text-right"
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {p.table.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => (
                          <td
                            key={i}
                            className={`py-1 ${i === 0 ? "text-left text-gray-600" : "text-right font-medium"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col gap-1 border-t border-black/10 pt-4 text-[14px]">
                  {p.rows!.map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4">
                      <span className="text-gray-600">{k}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              )}
              <p className="m-0 text-[13px] leading-[1.42] text-gray-500">{p.note}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
