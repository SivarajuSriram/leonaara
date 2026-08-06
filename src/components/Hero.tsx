"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroTitle from "./HeroTitle";

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
    },
    { scope: sectionRef }
  );

  return (
    <div className="relative isolate">
      {/* Video layer: pinned via sticky inside a 200vh box that overlaps 100vh into the
          next section, so it stays visually static underneath the content scrolling over it,
          then releases once the overlap runs out. Sits behind all normal-flow content. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[200vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-brand-dark">
          <video
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            muted
            autoPlay
            loop
            playsInline
            disableRemotePlayback
            src="/media/2024/04/BASE_HERO_version2.mp4"
          />
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
              <HeroTitle text={title} />
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
