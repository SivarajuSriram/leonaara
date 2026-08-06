"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroTitle({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const charEls = containerRef.current.querySelectorAll(".hero-char");
      const total = charEls.length;

      gsap.fromTo(
        charEls,
        {
          opacity: 0,
          x: (i: number) => 40 + (75 * i) / Math.max(total - 1, 1),
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.3,
          stagger: 0.02,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <span ref={containerRef} aria-label={text}>
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          {/* Wrapping each word's characters together keeps line-wrapping at
              word boundaries only, since the char-by-char reveal below would
              otherwise let the browser break mid-word. */}
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {word.split("").map((char, ci) => (
              <span key={ci} className="hero-char inline-block">
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}
