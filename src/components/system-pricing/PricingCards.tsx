import React from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

const pricingCards = [
  {
    model: "Base 1",
    spec: "1 Sleeping Loft – 960 sq ft",
    price: "$414 000",
    img: "/media/2026/04/BACK_A_Dark_Adjusted-copy.png",
    system: "$18 500",
    construction: "$395 500",
    featured: false,
    siteInfra: [
      ["Foundation", "~$25 000"],
      ["Excavation", "~$60 000"],
      ["Well", "~$25 000"],
      ["Septic System", "~$20 000"],
    ],
  },
  {
    model: "Base 1+",
    spec: "1-2 Bedrooms + 1 Sleeping Loft – 1200 sq ft",
    price: "$529 000",
    img: "/media/2026/04/BACK_B_Light_V3-copy.png",
    system: "$23 500",
    construction: "$505 500",
    featured: true,
    siteInfra: [
      ["Foundation", "~$30 000"],
      ["Excavation", "~$60 000"],
      ["Well", "~$25 000"],
      ["Septic System", "~$20 000"],
    ],
  },
];

export default function PricingCards() {
  return (
    <section className="relative w-full bg-[#141414] py-16 text-white md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          eyebrow="Pricing"
          eyebrowClassName="text-white/60"
          heading="Transparent from the start."
          headingClassName="text-white"
          bodyClassName="text-white/60"
          body="Our estimated prices represent fully built realities. From the exterior finishes and high-performance windows, to the architectural millwork and mechanical system inside, we've got you covered."
        />

        <Reveal className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-2" stagger={0.15} y={40}>
          {pricingCards.map((c) => (
            <div
              key={c.model}
              className={`relative flex flex-col gap-6 rounded-[4px] p-8 ${
                c.featured ? "bg-white text-black" : "border border-white/15 bg-white/5"
              }`}
            >
              {c.featured && (
                <span className="absolute right-8 top-8 rounded-full bg-brand-red px-3 py-1 text-[11px] uppercase text-white">
                  Most popular
                </span>
              )}
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[4px] bg-black/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.model} className="absolute inset-0 h-full w-full object-contain" />
              </div>
              <div>
                <h3 className="m-0 text-[24px] font-normal uppercase tracking-[-0.02em]">{c.model}</h3>
                <p className={`m-0 mt-1 text-[13px] uppercase ${c.featured ? "text-gray-500" : "text-white/60"}`}>
                  {c.spec}
                </p>
              </div>
              <div>
                <p className={`m-0 text-[12px] uppercase ${c.featured ? "text-gray-500" : "text-white/60"}`}>
                  Starting at
                </p>
                <p className="m-0 text-[36px] font-normal leading-none tracking-[-0.04em] xl:text-[44px]">
                  {c.price}*
                </p>
              </div>
              <div
                className={`flex flex-col gap-2 border-t pt-4 text-[14px] ${
                  c.featured ? "border-black/10" : "border-white/15"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className={c.featured ? "text-gray-500" : "text-white/60"}>Base Build System</span>
                  <span className="font-medium">{c.system}</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className={c.featured ? "text-gray-500" : "text-white/60"}>Construction & Materials</span>
                  <span className="font-medium">{c.construction}</span>
                </div>
                <p className={`m-0 ${c.featured ? "text-gray-500" : "text-white/60"}`}>
                  Final price confirmed with Base-Certified Builder
                </p>
                <div className="flex items-baseline justify-between gap-4 border-t border-current/10 pt-2 text-[16px]">
                  <span>Total</span>
                  <span className="font-medium">{c.price}</span>
                </div>
              </div>
              <p className={`m-0 text-[12px] ${c.featured ? "text-gray-500" : "text-white/50"}`}>
                *Estimated build cost before foundation and infrastructure costs, taxes not included.
              </p>

              <div
                className={`flex flex-col gap-2 border-t pt-4 text-[13px] ${
                  c.featured ? "border-black/10 text-gray-500" : "border-white/15 text-white/60"
                }`}
              >
                <p className="m-0 uppercase">Foundation & site infrastructure (not included)</p>
                <div className="grid grid-cols-2 gap-2">
                  {c.siteInfra.map(([k, v]) => (
                    <div key={k} className="flex flex-col gap-1">
                      <span>{k}</span>
                      <span className={c.featured ? "text-black" : "text-white"}>{v}</span>
                    </div>
                  ))}
                </div>
                <p className="m-0 mt-2">Costs vary by terrain and site conditions.</p>
              </div>

              <Link
                href="/#interested"
                className={`mt-2 inline-flex h-12 items-center justify-center rounded-[4px] text-[15px] font-medium uppercase transition-colors ${
                  c.featured
                    ? "bg-black text-white hover:bg-brand-red"
                    : "bg-white text-black hover:bg-brand-red hover:text-white"
                }`}
              >
                Get in touch
              </Link>
            </div>
          ))}
        </Reveal>

        <p className="mt-10 text-center text-[13px] text-white/50">
          These prices are estimates only and subject to change. Confirm final pricing with one of our
          Base-Certified Builders.
        </p>

        <Reveal
          className="mt-16 flex flex-col items-center gap-6 border-t border-white/15 pt-16 text-center"
          delay={0.2}
        >
          <h3 className="m-0 text-[24px] font-normal tracking-[-0.02em] md:text-[32px]">Already on the list?</h3>
          <a
            href="mailto:info@basehabitation.com"
            className="inline-flex h-12 items-center justify-center rounded-[4px] bg-white px-8 text-[15px] font-medium uppercase text-black transition-colors hover:bg-brand-red hover:text-white"
          >
            Connect with us
          </a>
        </Reveal>
      </div>
    </section>
  );
}
