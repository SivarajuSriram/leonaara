"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  highlightWord?: string; // a specific word to italicize/highlight
  highlightClassName?: string; // classes applied to the highlighted word, defaults to italic serif
  delay?: number; // extra delay (s) before the reveal starts, e.g. to sync after another animation
}

export default function AnimatedText({
  text,
  className = "",
  highlightWord,
  highlightClassName = "font-serif italic font-light",
  delay = 0,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split text by space
  const words = text.split(" ");

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      ".animated-word",
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, index) => {
        const isHighlight = highlightWord && word.includes(highlightWord);
        return (
          <React.Fragment key={index}>
            <span className="overflow-hidden inline-block pb-2">
              <span
                className={`animated-word inline-block ${isHighlight ? highlightClassName : ""}`}
              >
                {word}
              </span>
            </span>
            {index < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </div>
  );
}
