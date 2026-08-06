"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroTitle from "./HeroTitle";

gsap.registerPlugin(ScrollTrigger);

export default function ImageHero({
  img,
  alt,
  eyebrow,
  title,
  body,
  cta,
}: {
  img: string;
  alt: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  cta?: { label: string; href: string };
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !contentRef.current) return;

      gsap.to(contentRef.current, {
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
      {/* Image layer: pinned via sticky inside a 200vh box that overlaps 100vh into the
          next section, so it stays visually static underneath the content scrolling over it,
          then releases once the overlap runs out. Sits behind all normal-flow content. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[200vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>
      </div>

      {/* Content layer: real document-flow height (100vh). Scrolls away normally,
          same as every other section, independent of the pinned image behind it. */}
      <section ref={sectionRef} className="relative flex h-screen w-full items-end text-white">
        <div ref={contentRef} className="relative z-10 w-full px-6 pb-16 pt-32 md:pb-24">
          <div className="mx-auto w-full max-w-[1920px]">
            {eyebrow && (
              <p className="m-0 text-[12px] uppercase tracking-wide text-white/80 md:text-[14px]">{eyebrow}</p>
            )}
            {title && (
              <h1 className="mt-4 max-w-3xl text-[32px] font-normal leading-[1.05] tracking-[-0.04em] md:text-[48px] xl:text-[64px]">
                <HeroTitle text={title} />
              </h1>
            )}
            {body && (
              <p className="mt-6 max-w-md text-[14px] leading-[1.42] text-white/80 md:text-[16px]">{body}</p>
            )}
            {cta && (
              <Link
                href={cta.href}
                className="mt-8 inline-flex h-12 items-center justify-center rounded-[4px] bg-brand-red px-8 text-[15px] font-medium text-white transition-colors hover:bg-white hover:text-black"
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
