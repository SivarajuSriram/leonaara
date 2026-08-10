"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AnimatedText from "./AnimatedText";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    key: "kadamba",
    label: "Kadamba",
    src: "/kadamba.webp",
    alt: "Kadamba living room",
  },
  {
    key: "anantha-meadows",
    label: "Anantha Meadows",
    src: "/anme.webp",
    alt: "Anantha Meadows living room",
  },
];

export default function BaseAdvantage() {
  const [active, setActive] = useState(0);
  const mediaRef = useRef<HTMLDivElement>(null);
  const activeImgRef = useRef<HTMLImageElement | null>(null);
  const tagsRef = useRef<HTMLElement>(null);

  // The image reveals like a curtain pulling apart (clip-path inset shrinking
  // to 0) while the photo itself zooms out from a slight scale and fades in.
  // The heading and tag toggle only start their own fade-ins once that
  // curtain has finished opening, matching the original site's sequencing.
  useGSAP(() => {
    const media = mediaRef.current;
    if (!media) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: media, start: "top 80%", once: true },
    });

    tl.fromTo(media, { clipPath: "inset(4%)" }, { clipPath: "inset(0%)", duration: 1.85, ease: "power4.inOut" }, 0);
    if (activeImgRef.current) {
      tl.fromTo(activeImgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.85, ease: "none" }, 0);
      tl.fromTo(activeImgRef.current, { scale: 1.2 }, { scale: 1, duration: 2.2, ease: "power4.inOut" }, 0);
    }
    if (tagsRef.current) {
      tl.fromTo(
        Array.from(tagsRef.current.children),
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        1.3
      );
    }
  }, { scope: mediaRef });

  return (
    <section className="relative w-full bg-white text-brand-dark">
      <div ref={mediaRef} className="relative aspect-[4/5] w-full overflow-hidden bg-gray-200 md:aspect-[16/9]">
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img.key}
            ref={(el) => {
              if (i === active) activeImgRef.current = el;
            }}
            src={img.src}
            alt={img.alt}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}

        <header className="pointer-events-none absolute left-0 top-0 z-10 max-w-2xl p-6 md:p-10">
          <h2 className="m-0 text-[20px] font-normal leading-[1.4] tracking-[-0.03em] text-white md:text-[32px] md:leading-none xl:text-[48px]">
            <AnimatedText text="Our Signature Creations" className="text-left" delay={1.5} />
          </h2>
        </header>

        <nav ref={tagsRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 flex items-center gap-[6px] p-[12px] md:p-[20px]">
          {images.map((img, i) => (
            <button
              key={img.key}
              onClick={() => setActive(i)}
              aria-label={img.label}
              className="group relative flex h-[26px] items-center justify-center overflow-hidden rounded-[4px] px-[14px]"
            >
              <span
                className={`absolute inset-0 bg-black transition-opacity ${
                  active === i ? "opacity-50" : "opacity-20 md:group-hover:opacity-35"
                }`}
              />
              <span className="relative block h-[15px] overflow-hidden">
                <span
                  aria-hidden="true"
                  className="flex translate-y-[-15px] flex-col transition-transform duration-300 ease-out group-hover:translate-y-0"
                >
                  <span className="h-[15px] whitespace-nowrap text-[15px] uppercase leading-[15px] text-white">{img.label}</span>
                  <span className="h-[15px] whitespace-nowrap text-[15px] uppercase leading-[15px] text-white">{img.label}</span>
                </span>
              </span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
