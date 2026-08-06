import React from "react";
import HeroTitle from "./HeroTitle";

export default function PageHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="relative w-full bg-white py-16 text-black md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        {eyebrow && (
          <p className="m-0 text-[12px] uppercase tracking-wide text-black/60 md:text-[14px]">{eyebrow}</p>
        )}
        <h1 className="mt-4 max-w-3xl text-[32px] font-normal leading-[1.05] tracking-[-0.04em] md:text-[48px] xl:text-[64px]">
          <HeroTitle text={title} />
        </h1>
        {body && (
          <p className="mt-6 max-w-md text-[14px] leading-[1.42] text-gray-600 md:text-[16px]">{body}</p>
        )}
      </div>
    </section>
  );
}
