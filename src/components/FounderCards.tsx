"use client";
import React, { useState } from "react";
import AnimatedText from "./AnimatedText";

// TODO: replace with real founder names, roles, bios and headshots.
const founders = [
  {
    name: "Founder One",
    role: "Co-Founder",
    bio: "Placeholder bio copy — swap in the real founder bio here.",
    image: "",
  },
  {
    name: "Founder Two",
    role: "Co-Founder",
    bio: "Placeholder bio copy — swap in the real founder bio here.",
    image: "",
  },
  {
    name: "Founder Three",
    role: "Co-Founder",
    bio: "Placeholder bio copy — swap in the real founder bio here.",
    image: "",
  },
  {
    name: "Founder Four",
    role: "Co-Founder",
    bio: "Placeholder bio copy — swap in the real founder bio here.",
    image: "",
  },
];

export default function FounderCards() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-white text-black pt-[30px] pb-[60px] md:pt-[50px] md:pb-[100px] xl:pt-[70px] xl:pb-[200px]">
      <div className="container mx-auto px-6 max-w-[1920px]">
        <header className="mb-8 md:mb-12">
          <h2 className="m-0 text-[20px] font-normal leading-[1.4] tracking-[-0.03em] text-black md:text-[32px] md:leading-none xl:text-[48px]">
            <AnimatedText text="Meet the Minds Shaping Tomorrow’s Spaces" className="justify-start !flex-nowrap" />
          </h2>
        </header>

        <div className="flex w-full aspect-[3/1] gap-3 md:gap-4">
          {founders.map((founder, i) => {
            const isActive = i === active;
            return (
              <button
                key={founder.name}
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                aria-label={`Show ${founder.name}'s bio`}
                className="group relative flex h-full min-w-0 flex-col justify-end overflow-hidden rounded-[4px] bg-[#f5f5e7] text-left transition-[flex-grow] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ flexGrow: isActive ? 2.4 : 1, flexBasis: 0 }}
              >
                {/* Background image, fades in when active. */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  {founder.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-300 font-serif text-4xl text-neutral-500">
                      {founder.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>

                {/* Bordered info panel with the founder's name, role, and bio. */}
                <div
                  className={`absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end gap-1 overflow-hidden rounded-[4px] border border-white/25 bg-black/20 backdrop-blur-sm p-4 transition-opacity duration-500 xl:p-6 ${
                    isActive ? "opacity-100 delay-200" : "pointer-events-none opacity-0"
                  }`}
                >
                  <h3 className="m-0 font-serif text-[16px] font-light text-white md:text-[18px] xl:text-[22px]">
                    {founder.name}
                  </h3>
                  <p className="mt-1 text-[10px] uppercase tracking-wide text-white/70 md:text-[12px] xl:text-[13px]">
                    {founder.role}
                  </p>
                  <p className="mt-3 hidden text-[13px] leading-snug text-white/90 lg:block xl:text-[14px]">
                    {founder.bio}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
