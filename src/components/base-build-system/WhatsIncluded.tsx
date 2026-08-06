"use client";
import React, { useState } from "react";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

const included = [
  {
    n: "01",
    title: "House plans & construction documents",
    body: "Permit-ready drawings and full construction documentation. Structural, mechanical, electrical. What your builder and municipality need to get started.",
    collapsible: false,
  },
  {
    n: "02",
    title: "Curated design package + design meeting",
    body: "Pre-developed palettes of cladding, finishes, lighting, and hardware. You finalize your selections in a dedicated meeting with Base, and it all gets documented before the build starts.",
    collapsible: true,
  },
  {
    n: "03",
    title: "Certified builder",
    body: "A builder trained and certified on the Base panel system. Your construction price is clear before the build begins.",
    collapsible: true,
  },
  {
    n: "04",
    title: "On-site milestone inspections",
    body: "Base checks in at key stages. Foundation, envelope close, millwork installation, final walkthrough.",
    collapsible: true,
  },
  {
    n: "05",
    title: "Verified performance targets",
    body: "Airtightness testing, thermal envelope verification, and carbon accounting. Measured on site, not modeled.",
    collapsible: true,
  },
  {
    n: "06",
    title: "Direct access to Base",
    body: "A dedicated point of contact from first call to moving day. Questions go straight to us, not a call center.",
    collapsible: true,
  },
];

export default function WhatsIncluded() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const toggleItem = (n: string) => setOpenItems((prev) => ({ ...prev, [n]: !prev[n] }));

  return (
    <section className="relative w-full bg-[#2d2d2d] py-16 text-white md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          eyebrow="What's included"
          eyebrowClassName="text-white/50"
          heading="The full package, not just plans."
          bodyClassName="text-white/70"
          body="From house plans to builder coordination. Everything you need for a successful build, documented and ready."
        />

        <Reveal className="mt-16 grid grid-cols-1 gap-x-12 gap-y-0 md:mt-20 md:grid-cols-2" stagger={0.08} y={30}>
          {included.map((s) => {
            const isOpen = !s.collapsible || openItems[s.n];
            return (
              <div key={s.n} className="border-b border-white/15 py-9 first:pt-0">
                <p className="m-0 text-[13px] text-white/40">{s.n}</p>
                <h3 className="mt-4 text-[20px] font-normal tracking-[-0.02em] xl:text-[26px]">{s.title}</h3>
                {s.collapsible && (
                  <button
                    type="button"
                    onClick={() => toggleItem(s.n)}
                    className="mt-3 inline-flex items-center gap-2 text-[13px] font-normal text-white/40 transition-colors hover:text-white"
                    aria-expanded={isOpen}
                  >
                    <span className="text-brand-red">{isOpen ? "−" : "+"}</span>
                    Read more
                  </button>
                )}
                {s.collapsible ? (
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-3 text-[14px] leading-[1.42] text-white/70">{s.body}</p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-[14px] leading-[1.42] text-white/70">{s.body}</p>
                )}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
