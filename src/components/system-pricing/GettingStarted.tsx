import React from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

const gettingStarted = [
  {
    title: "Looking for land?",
    body: "We have buildable lots available in partnership with developers across Québec. From Lanaudière to the Eastern Townships. We can also help you evaluate your own terrain.",
    cta: "See available opportunities",
  },
  {
    title: "Permits & documentation",
    body: "Our specification package gives your builder everything needed for the building permit application. We've already done the technical work.",
    cta: "Learn more about the system",
  },
  {
    title: "Leonaara Certified Builders",
    body: "See if we have Leonaara Certified Builders in your area. If not, let us know and we'll onboard one near you.",
    cta: "Get the Leonaara Certified Builder list",
  },
];

export default function GettingStarted() {
  return (
    <section className="relative w-full bg-[#f5f5e7] py-16 md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          eyebrow="Getting started"
          heading="We can help with every part."
          body="You don't need to have it all figured out. Here's what we can help with."
        />

        <Reveal className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3" stagger={0.12} y={30}>
          {gettingStarted.map((item) => (
            <div key={item.title} className="flex flex-col gap-4 rounded-[4px] bg-white p-8">
              <h3 className="m-0 text-[20px] font-normal tracking-[-0.02em]">{item.title}</h3>
              <p className="m-0 flex-1 text-[14px] leading-[1.42] text-gray-600">{item.body}</p>
              <Link
                href="/#interested"
                className="group inline-flex items-center gap-1 text-[14px] font-medium uppercase text-black transition-colors md:hover:text-brand-red"
              >
                {item.cta}
                <span className="transition-transform duration-300 md:group-hover:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
