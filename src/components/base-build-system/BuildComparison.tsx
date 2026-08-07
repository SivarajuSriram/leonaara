import React from "react";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

const comparison = [
  ["Architectural plans", true, true],
  ["Curated design package", false, true],
  ["Complete specification book", false, true],
  ["Certified builder", false, true],
  ["On-site milestone inspections", false, true],
  ["Tested performance targets", false, true],
  ["Leonaara support throughout build", false, true],
  ["Outcome defined before construction", false, true],
] as const;

function Check({ v, badge }: { v: boolean; badge?: boolean }) {
  if (!v) return <span className="text-white/35">—</span>;
  if (badge) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white text-[13px] font-semibold text-white">
        ✓
      </span>
    );
  }
  return <span className="text-white/50">✓</span>;
}

export default function BuildComparison() {
  return (
    <section className="relative w-full bg-[#2d2d2d] py-16 text-white md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          eyebrow="System vs. plans"
          eyebrowClassName="text-white/50"
          heading="You're not buying pdfs. You're buying peace of mind."
          bodyClassName="text-white/70"
          body="When you buy plans alone, what happens on site is up to your builder. When you buy the Leonaara Build System, the outcome is defined before construction begins."
        />

        <Reveal className="mx-auto mt-16 w-full max-w-[720px] rounded-[18px] bg-white/5 px-6 py-8 md:mt-20 md:px-12 md:py-10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 text-left text-[12px] font-medium uppercase tracking-wide text-white/60"> </th>
                  <th className="w-[110px] py-3 text-center text-[12px] font-medium uppercase tracking-wide text-white/60">
                    Plans alone
                  </th>
                  <th className="w-[110px] py-3 text-center text-[12px] font-medium uppercase tracking-wide text-white">
                    Leonaara Build System
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([label, plans, base]) => (
                  <tr key={label} className="border-b border-white/10 last:border-b-0">
                    <td className="py-3.5 font-medium">{label}</td>
                    <td className="py-3.5 text-center">
                      <Check v={plans} />
                    </td>
                    <td className="py-3.5 text-center">
                      <Check v={base} badge />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal className="mt-16 flex flex-col items-center gap-8 md:mt-20" delay={0.2}>
          <h2 className="mx-auto max-w-2xl text-center text-[28px] font-normal leading-tight tracking-[-0.04em] md:text-[44px] xl:text-[64px] xl:leading-[60px]">
            A straightforward build and a clear price.
          </h2>
          <a
            href="/system-pricing"
            className="inline-flex h-12 items-center justify-center rounded-[4px] bg-brand-red px-8 text-[15px] font-medium text-white transition-colors hover:bg-black"
          >
            See Pricing
          </a>
        </Reveal>
      </div>
    </section>
  );
}
