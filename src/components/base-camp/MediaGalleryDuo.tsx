"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export interface GallerySlide {
  key: string;
  src: string;
  alt: string;
}

const defaultSlides: GallerySlide[] = [
  {
    key: "loft-skylight",
    src: "/media/2026/04/Base-Camp-Lao-033-1800x1197.jpg",
    alt: "Leonaara Camp loft bedroom with skylight",
  },
  {
    key: "exterior-woods",
    src: "/media/2026/04/Base-Camp-Lao-006-1-scaled.jpg",
    alt: "Leonaara Camp prototype in the woods",
  },
];

export default function MediaGalleryDuo({ slides = defaultSlides }: { slides?: GallerySlide[] } = {}) {
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  // Grows from a small rounded box centered on the section into the
  // full-bleed image, corners softening to square as it fills out.
  useGSAP(
    () => {
      if (!boxRef.current) return;
      gsap.fromTo(
        boxRef.current,
        { scale: 0.28, borderRadius: 24 },
        {
          scale: 1,
          borderRadius: 0,
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: boxRef.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: boxRef }
  );

  return (
    <section className="relative w-full overflow-hidden bg-white pb-16 md:pb-20 xl:pb-24">
      <div
        ref={boxRef}
        className="relative aspect-[16/9] w-full overflow-hidden bg-gray-200 md:aspect-[21/10]"
      >
        {slides.map((slide, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.key}
            src={slide.src}
            alt={slide.alt}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}

        <nav className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 md:bottom-8">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              onClick={() => setActive(i)}
              aria-label={`Show ${slide.alt}`}
              className="h-[6px] w-7 rounded-full bg-white transition-opacity md:w-9"
              style={{ opacity: active === i ? 1 : 0.4 }}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}
