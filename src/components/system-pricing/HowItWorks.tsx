import React from "react";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

const steps = [
  {
    n: "01",
    title: "Choose your model",
    body: "Leonaara I or Leonaara I+. Two distinct homes built on the same high-performance panel system.",
  },
  {
    n: "02",
    title: "Choose a design",
    body: "Select from our pre-developed design packages. Curated palettes of materials and finishes, every option fully resolved. No grey areas.",
  },
  {
    n: "03",
    title: "Your Leonaara Build System",
    body: "This is where your project becomes real. You activate the Leonaara Build System: plans, specifications, a certified builder, fixed-price guarantee, and performance milestones included.",
  },
  {
    n: "04",
    title: "Production begins",
    body: "Your panels are prefabricated off-site in a controlled shop environment, while your site is prepared in parallel.",
  },
  {
    n: "05",
    title: "Construction",
    body: "A certified builder constructs your home using our prefabricated panels. Built to defined specifications, no improvisation.",
  },
  {
    n: "06",
    title: "Move-in",
    body: "Keys in hand. A home that performs as well as it looks. Built with healthy materials, in a fraction of the usual time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative w-full bg-white py-16 md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          eyebrow="How it works"
          heading="From first call to keys in hand."
          body="You choose a model and a design package. We deliver the plans, the specs, and a certified builder. Everything is documented before construction starts."
        />

        <Reveal
          className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-20 md:grid-cols-2 xl:grid-cols-3"
          stagger={0.08}
          y={30}
        >
          {steps.map((s) => (
            <div key={s.n} className="border-t border-black/10 pt-6">
              <p className="m-0 text-[13px] text-brand-red">{s.n}</p>
              <h3 className="mt-3 text-[20px] font-normal tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.42] text-gray-600">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
