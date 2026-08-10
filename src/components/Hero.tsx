"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({
  title = "Bringing Purpose to Existence",
  eyebrow,
}: {
  title?: string;
  eyebrow?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !titleWrapRef.current) return;

      // The title-fade-on-scroll only makes sense on desktop, where the
      // pinned image visibly scrolls underneath it; on mobile the user
      // asked for the text overlay to stay put instead of fading away.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(titleWrapRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <div className="relative isolate">
      {/* Image layer: pinned via sticky inside a box that overlaps into the next section,
          so it stays visually static underneath the content scrolling over it, then releases
          once the overlap runs out. Sits behind all normal-flow content. The overlap is capped
          at a fixed 220px on mobile (instead of a full 100vh) because on short mobile sections
          a 100vh overlap can outlast the next section's actual height and bleed into the one
          after it; desktop sections are reliably tall enough for the full 100vh overlap. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[calc(100svh_+_220px)] w-full md:h-[200vh]">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-brand-dark md:h-screen">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-home.webp"
            alt="Leonaara cabin in a snowy forest"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        </div>
      </div>

      {/* Content layer: Hero's real document-flow height (100vh). Scrolls away normally,
          same as every other section, independent of the pinned video behind it. */}
      <section ref={sectionRef} className="relative h-screen w-full">
        <div
          ref={titleWrapRef}
          className="absolute inset-x-0 bottom-0 z-10 w-full px-6 pb-[30px] md:pb-[40px]"
        >
          <div className="mx-auto w-full max-w-[1920px]">
            {eyebrow && (
              <p className="m-0 mb-4 text-[12px] uppercase text-white md:text-[14px]">{eyebrow}</p>
            )}
            <h1 className="m-0 font-sans text-[32px] font-normal leading-none tracking-[-0.03em] text-white md:text-[44px] xl:text-[64px]">
              {title}
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
