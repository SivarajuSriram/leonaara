"use client";
import React, { useState } from "react";
import Reveal from "@/components/Reveal";

const specs = [
  {
    title: "Envelope",
    body: "Bio-sourced prefabricated panels. Hemp and wood fibre insulation, Pro Clima intelligent membranes. No plastic foam, no polystyrene.",
    rows: [
      ["Walls", "33.7 cm, U=0.20, R-30, phase shift 11h"],
      ["Roof", "51.6 cm, U=0.12, R-46, phase shift 14.2h"],
      ["Airtightness", "0.25 ACH @ 50Pa, tested on every home"],
      ["Carbon (walls)", "-38 kg CO₂/m²"],
      ["Carbon (roof)", "-47 kg CO₂/m²"],
    ],
  },
  {
    title: "Windows",
    body: "Passive House certified triple-glazed windows. Made in Québec.",
    rows: [
      ["Glazing", "Triple glazed 44mm (4-16-4-16-4)"],
      ["Glass U-value", "Ug = 0.54 W/m²K"],
      ["Window U-value", "UW = 0.64 (fixed) / 0.66 (operable)"],
      ["Spacer", "Swisspacer Ultimate"],
    ],
  },
  {
    title: "Roof",
    body: "",
    rows: [
      ["Material", "Corrugated galvalume steel, raw finish"],
      ["Pitch", "6:12 (26°)"],
    ],
  },
  {
    title: "Climate System",
    body: "Invisible. Heating, cooling, and ventilation integrated into the walls and millwork.",
    rows: [
      ["Heat pump", "GE Endure-S ducted, 12,000 BTU, operates to -35°C"],
      ["Hot water", "Heat pump water heater"],
      ["HRV", "Greentek SOLACE 1.2 H, 120 CFM, ENERGY STAR"],
      ["Distribution", "Ducted through architectural millwork"],
      ["Floors", "Electric radiant heating"],
    ],
  },
  {
    title: "Foundation",
    body: "No basement, no crawl space.",
    rows: [
      ["Type", "Monolithic insulated slab on grade"],
      ["Heating", "Integrated radiant floor"],
    ],
  },
];

const palette = [
  ["Exterior siding", "Natural wood", "Dark stained wood"],
  ["Windows", "Light aluminium finish", "Wood-finish uPVC"],
  [
    "Kitchen",
    "Classic: closed upper cabinets, quartz countertops, off-white TopCer tile backsplash, wooden island",
    "Minimalist: open upper cabinets, stainless steel counters and backsplash",
  ],
  ["Shower", "Off-white TopCer tile", "Stainless steel"],
];

const roofUpgrade = {
  title: "Roof upgrade",
  body: "Standing seam steel with concealed joints. Available in Light Steel or Anthracite Steel.",
};

const addons = [
  { title: "Custom couch and stools", body: "Custom-designed seating for Leonaara homes" },
  { title: "Custom lighting", body: "Custom lighting designed for each zone of the home" },
  { title: "Stainless steel bench and log holder", body: "Functional pieces in brushed stainless steel" },
  { title: "Stainless steel accessories", body: "Interior and exterior hooks, entrance ledge" },
];

export default function SpecsAndPalette() {
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>({});
  const togglePanel = (k: string) => setOpenPanels((prev) => ({ ...prev, [k]: !prev[k] }));

  return (
    <section className="relative w-full bg-[#f9f9f9] py-16 text-black md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <p className="m-0 text-center text-[12px] uppercase text-black/60 md:text-[14px]">Specifications</p>
        <h2 className="mt-5 max-w-3xl text-center text-[28px] font-normal leading-tight tracking-[-0.04em] text-black md:mt-[30px] md:text-[44px] xl:mt-10 xl:text-[64px] xl:leading-[60px] mx-auto">
          Specs & material palettes.
        </h2>

        <Reveal className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2" stagger={0.1} y={30}>
          {specs.map((s) => (
            <div key={s.title} className="flex flex-col gap-4 rounded-[4px] border border-black/10 bg-white p-8">
              <h3 className="m-0 text-[20px] font-normal tracking-[-0.02em]">{s.title}</h3>
              {s.body && <p className="m-0 text-[14px] leading-[1.42] text-black/60">{s.body}</p>}
              <div className="flex flex-col gap-2 border-t border-black/10 pt-4 text-[14px]">
                {s.rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4">
                    <span className="text-black/60">{k}</span>
                    <span className="text-right font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        {/* Your palette (collapsed by default) */}
        <div className="mt-16 border-t border-black/10 pt-10 md:mt-20">
          <button
            type="button"
            onClick={() => togglePanel("palette")}
            className="mx-auto flex items-center justify-center gap-2 text-[12px] uppercase text-black/60 md:text-[14px]"
            aria-expanded={!!openPanels.palette}
          >
            <span className="text-brand-red">{openPanels.palette ? "−" : "+"}</span> Your palette
          </button>
          <p className="mx-auto mt-3 max-w-md text-center text-[14px] text-black/60">
            Every Leonaara starts with one of two palettes. Every option can be swapped.
          </p>
          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-out ${
              openPanels.palette ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="mx-auto mt-10 w-full max-w-3xl overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-[14px]">
                  <thead>
                    <tr className="border-b border-black/10">
                      <th className="py-3 text-left font-normal text-black/60"> </th>
                      <th className="py-3 text-left font-normal text-black">Scout</th>
                      <th className="py-3 text-left font-normal text-black">Ranger</th>
                    </tr>
                  </thead>
                  <tbody>
                    {palette.map(([label, scout, ranger]) => (
                      <tr key={label} className="border-b border-black/10">
                        <td className="py-3 text-black/60">{label}</td>
                        <td className="py-3">{scout}</td>
                        <td className="py-3">{ranger}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mx-auto mt-6 w-full max-w-3xl border-t border-black/10 pt-6 text-[14px]">
                <p className="m-0 text-black">{roofUpgrade.title}</p>
                <p className="m-0 mt-1 text-black/60">{roofUpgrade.body}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add-ons (collapsed by default) */}
        <div className="mt-16 border-t border-black/10 pt-10 md:mt-20">
          <button
            type="button"
            onClick={() => togglePanel("addons")}
            className="mx-auto flex items-center justify-center gap-2 text-[12px] uppercase text-black/60 md:text-[14px]"
            aria-expanded={!!openPanels.addons}
          >
            <span className="text-brand-red">{openPanels.addons ? "−" : "+"}</span> Add-ons
          </button>
          <p className="mx-auto mt-3 max-w-md text-center text-[14px] text-black/60">
            Pieces designed specifically for Leonaara homes. Available as add-ons to any model.
          </p>
          <div
            className={`grid transition-[grid-template-rows] duration-500 ease-out ${
              openPanels.addons ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
                {addons.map((a) => (
                  <div
                    key={a.title}
                    className="flex flex-col gap-2 rounded-[4px] border border-black/10 bg-white p-6 text-center text-[14px]"
                  >
                    <p className="m-0">{a.title}</p>
                    <p className="m-0 text-black/60">{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
