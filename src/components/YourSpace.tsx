"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedText from "./AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    key: "winter",
    label: "Base 1",
    src: "/media/2024/04/Winter-Shot-1536x866.jpg",
    alt: "Winter Shot",
  },
  {
    key: "summer",
    label: "Base 1+",
    src: "/media/2024/04/Summer-Shot-1536x866.jpg",
    alt: "Summer Shot",
  },
];

export default function YourSpace() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !overlayRef.current) return;

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.6 },
        {
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-16 text-black md:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <header className="mb-8 grid gap-4 md:mb-12 md:grid-cols-2 md:gap-6">
          <h2 className="m-0 text-[20px] font-normal leading-[1.1] tracking-[-0.03em] md:text-[32px] md:leading-none xl:text-[48px]">
            <AnimatedText
              text="Your base camp, no matter your mountain."
              highlightWord="mountain."
            />
          </h2>
          <p className="self-end text-[14px] leading-[1.42] text-[#333333]">
            Built to go virtually anywhere, our models are the starting and end point for all your adventures.
          </p>
        </header>

        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
          {images.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.key}
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
              style={{ opacity: active === i ? 1 : 0 }}
            />
          ))}

          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 bg-[#f5f5e7]"
          />

          <nav className="absolute bottom-0 left-0 md:left-1/2 md:-translate-x-1/2 z-10 flex items-center gap-[6px] p-[12px] md:p-[20px]">
            {images.map((img, i) => (
              <button
                key={img.key}
                onClick={() => setActive(i)}
                aria-label={img.label}
                className="group relative flex h-[26px] items-center justify-center overflow-hidden rounded-[4px] px-[14px]"
              >
                <span
                  className={`absolute inset-0 bg-black transition-opacity ${
                    active === i ? "opacity-50" : "opacity-20 group-hover:opacity-35"
                  }`}
                />
                <span className="relative block h-[15px] overflow-hidden">
                  <span
                    aria-hidden="true"
                    className="flex translate-y-[-15px] flex-col transition-transform duration-300 ease-out group-hover:translate-y-0"
                  >
                    <span className="h-[15px] text-[15px] uppercase leading-[15px] text-white">
                      {img.label}
                    </span>
                    <span className="h-[15px] text-[15px] uppercase leading-[15px] text-white">
                      {img.label}
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
