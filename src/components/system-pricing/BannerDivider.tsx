import React from "react";

export default function BannerDivider({ text }: { text: string }) {
  return (
    <section className="relative w-full bg-black py-4 text-center">
      <p className="m-0 text-[13px] uppercase tracking-wide text-white/70">{text}</p>
    </section>
  );
}
