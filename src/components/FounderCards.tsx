"use client";
import React, { useState } from "react";

// TODO: replace with real founder names, roles, bios and headshots.
const founders = [
  {
    name: "Ravikanth Reddy Busam",
    role: "Founder & CEO",
    bio: "Some build structures. A rare few build belief. Ravikanth Reddy Busam belongs to the latter. With 25+ years across finance, technology, and real estate, his journey has been guided by one belief, lasting value is built on integrity. From founding a global technology venture in 2008 to shaping 1M+ sq. ft. of development, serving 560+ homeowners, and creating ₹1000+ crores in value, his work reflects discipline, precision, and trust. ",
    image: "",
  },
  {
    name: "Rajashekhar Reddy",
    role: "Executive Director - Engineering",
    bio: "With a strong foundation in engineering and execution, Rajashekhar Reddy brings strategic expertise and technical excellence to Leonaara as Executive Director (Engineering).",
    image: "",
  },
  {
    name: "Avinash Reddy",
    role: "Executive Director – Strategy & Customer Relations",
    bio: "As Executive Director (Strategy & Customer Relations), Avinash Reddy brings a strong focus on strategic growth, customer experience, and long-term relationships. With a vision centered on trust and excellence, he ensures every interaction reflects Leonaara’s commitment to transparency, thoughtful service, and creating meaningful experiences for homeowners.",
    image: "",
  },
  {
    name: "Srinivas Reddy",
    role: "Executive Director – Projects & Liaisoning",
    bio: "Srinivas Reddy leads Projects & Liaisoning at Leonaara with a focus on seamless execution, strategic coordination, and timely delivery. His expertise ensures every project moves forward with precision, compliance, and excellence.",
    image: "",
  },
];

export default function FounderCards() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-white text-black pt-[30px] pb-[60px] md:pt-[50px] md:pb-[80px] xl:pt-[70px] xl:pb-[100px]">
      <div className="container mx-auto px-6 max-w-[1920px]">
        <header className="mb-4 md:mb-12">
          <h2 className="m-0 text-[20px] font-normal leading-[1.4] tracking-[-0.03em] text-black md:text-[32px] md:leading-none xl:text-[48px] md:whitespace-nowrap">
            Meet the Minds Shaping Tomorrow’s Spaces
          </h2>
        </header>

        <div className="flex w-full flex-col h-[520px] gap-3 sm:h-[560px] md:h-[620px] md:flex-row md:gap-4 xl:h-[720px]">
          {founders.map((founder, i) => {
            const isActive = i === active;
            return (
              <button
                key={founder.name}
                type="button"
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                aria-label={`Show ${founder.name}'s bio`}
                className={`group relative ${isActive ? "flex" : "hidden"} h-full min-w-0 flex-col justify-end overflow-hidden rounded-[4px] bg-neutral-300 text-left transition-[flex-grow] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] md:flex`}
                style={{ flexGrow: isActive ? 2.4 : 1, flexBasis: 0 }}
              >
                {/* Background image / avatar fallback, always visible. */}
                <div className="absolute inset-0">
                  {founder.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-300 font-serif text-6xl text-neutral-400">
                      {founder.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Info panel: name + role always visible, bio slides in when active. */}
                <div className="relative z-10 flex flex-col gap-1 p-4 xl:p-6">
                  <h3 className="m-0 font-serif text-[16px] font-light text-white md:text-[18px] xl:text-[22px]">
                    {founder.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-wide text-white/70 md:text-[12px] xl:text-[13px]">
                    {founder.role}
                  </p>
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isActive ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[13px] leading-snug text-white/90 xl:text-[14px]">
                        {founder.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Carousel controls: mobile only, since the desktop accordion shows
            all four cards side by side and doesn't need them. */}
        <div className="mt-4 flex items-center justify-between md:hidden">
          <button
            type="button"
            onClick={() => setActive((active - 1 + founders.length) % founders.length)}
            aria-label="Previous founder"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-[16px]"
          >
            ←
          </button>
          <span className="text-[12px] uppercase tracking-wide text-black/60">
            {String(active + 1).padStart(2, "0")} / {String(founders.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => setActive((active + 1) % founders.length)}
            aria-label="Next founder"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 text-[16px]"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
