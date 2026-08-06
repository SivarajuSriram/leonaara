"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared scroll-reveal wrapper: fades + slides children up into view once the
 * wrapper crosses the given trigger point. Used across every section on the
 * homepage/articles page via each section's own hand-rolled useGSAP call —
 * this centralizes that same fade-up pattern for reuse on other pages.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 30,
  stagger,
  start = "top 80%",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = stagger ? Array.from(ref.current.children) : ref.current;

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
