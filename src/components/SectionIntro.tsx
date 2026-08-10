import React from "react";
import Reveal from "./Reveal";
import AnimatedText from "./AnimatedText";

/**
 * The eyebrow + heading + body block repeated at the top of nearly every
 * section across the site (home, base-camp, base-build-system,
 * system-pricing). Centralizes that markup plus the word-reveal/fade-up
 * scroll animations so every section gets the same entrance treatment.
 */
export default function SectionIntro({
  eyebrow,
  heading,
  body,
  eyebrowClassName = "text-black",
  headingClassName = "",
  bodyClassName = "text-gray-600",
  headingMaxWidth = "max-w-3xl",
  bodyMaxWidth = "max-w-md",
  headingAnimatedText = true,
  bodyAnimatedText = false,
  className = "",
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  eyebrowClassName?: string;
  headingClassName?: string;
  bodyClassName?: string;
  headingMaxWidth?: string;
  bodyMaxWidth?: string;
  headingAnimatedText?: boolean;
  bodyAnimatedText?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {eyebrow && (
        <Reveal>
          <p className={`m-0 text-[12px] uppercase md:text-[14px] ${eyebrowClassName}`}>{eyebrow}</p>
        </Reveal>
      )}
      <h2
        className={`${eyebrow ? "mt-5 md:mt-[30px] xl:mt-10" : ""} ${headingMaxWidth} text-[28px] font-normal leading-tight tracking-[-0.04em] md:text-[44px] xl:text-[64px] xl:leading-[60px] ${headingClassName}`}
      >
        {headingAnimatedText ? <AnimatedText text={heading} className="text-center" /> : heading}
      </h2>
      {body && (bodyAnimatedText ? (
        <div className={`mt-6 ${bodyMaxWidth} text-[14px] leading-[1.42] md:text-[16px] ${bodyClassName}`}>
          <AnimatedText text={body} className="text-center" delay={0.4} />
        </div>
      ) : (
        <Reveal delay={0.4}>
          <p className={`mt-6 ${bodyMaxWidth} text-[14px] leading-[1.42] md:text-[16px] ${bodyClassName}`}>{body}</p>
        </Reveal>
      ))}
    </div>
  );
}
