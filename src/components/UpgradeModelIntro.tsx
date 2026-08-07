"use client";
import React from "react";
import AnimatedLines from "./AnimatedLines";

export default function UpgradeModelIntro() {
  return (
    <section className="w-full bg-[#f5f5e7] text-black pt-[50px] pb-[40px] md:pt-[50px] md:pb-[60px] xl:pt-[90px] xl:pb-[90px]">
      <div className="container mx-auto px-6 flex flex-col items-center max-w-4xl xl:max-w-6xl">
        <p className="text-[12px] md:text-[14px] font-normal leading-none text-center uppercase text-black">
          The Leonaara Philosophy
        </p>
        <h2 className="mt-5 md:mt-[30px] xl:mt-10 font-sans text-[28px] md:text-[44px] xl:text-[64px] font-normal leading-tight md:leading-none xl:leading-[60px] tracking-[-0.04em] text-center">
          <AnimatedLines
            className="text-center"
            lines={[
              { content: "Four Promises." },
              { content: "One Uncompromising Commitment." },
            ]}
          />
        </h2>
        <div className="mt-6 md:mt-[30px] xl:mt-[60px] text-[14px] md:text-[16px] xl:text-[18px] leading-snug text-center text-black max-w-[670px]">
          <p>
            Every creation is guided by four promises, shaping spaces with trust, quality, purpose, and lasting value.
          </p>
        </div>
      </div>
    </section>
  );
}
