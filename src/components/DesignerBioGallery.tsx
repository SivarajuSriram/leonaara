"use client";
import React, { useState } from "react";
import clsx from "clsx";
import AnimatedText from "./AnimatedText";

const images = [
  {
    label: "Leonaara Deck +",
    src: "/media/2024/04/Deck-Plus.jpg",
  },
  {
    label: "Leonaara Deck",
    src: "/media/2024/04/BASE_deck01-version2.jpg",
  },
];

export default function DesignerBioGallery() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-white text-black pt-0 pb-[20px] md:pb-[20px] xl:pb-0">
      <div className="container mx-auto px-6">
        <header className="w-full max-w-4xl mb-12 lg:mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <h2 className="font-sans text-[32px] md:text-[48px] xl:text-[64px] font-normal leading-tight tracking-tight">
            <AnimatedText
              text="Upgrade your model."
              className="justify-start"
            />
          </h2>
          <div className="text-[14px] xl:text-[16px] leading-snug text-[#333333] md:pt-4">
            <p>Enhance your model with pre-designed add-ons like the <em>Leonaara Deck</em> and the <em>Leonaara Deck+</em>. Additional items are also available through key partnerships.</p>
          </div>
        </header>

        <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden">
          {images.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.label}
              loading="lazy"
              className={clsx(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                active === index ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            />
          ))}

          <nav className="absolute inset-x-0 bottom-3 z-20 flex items-center gap-1.5 px-3 md:justify-center md:px-5 md:bottom-5">
            {images.map((image, index) => (
              <button
                key={image.label}
                type="button"
                onClick={() => setActive(index)}
                className="group relative flex h-[26px] items-center justify-center overflow-hidden rounded-[4px] px-3.5"
              >
                <span
                  className={clsx(
                    "absolute inset-0 bg-black transition-opacity",
                    active === index ? "opacity-50" : "opacity-20 group-hover:opacity-35"
                  )}
                />
                <span className="relative block h-[15px] overflow-hidden">
                  <span
                    aria-hidden="true"
                    className="flex translate-y-[-15px] flex-col transition-transform duration-300 ease-out group-hover:translate-y-0"
                  >
                    <span className="h-[15px] text-[15px] uppercase leading-[15px] text-white">{image.label}</span>
                    <span className="h-[15px] text-[15px] uppercase leading-[15px] text-white">{image.label}</span>
                  </span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
