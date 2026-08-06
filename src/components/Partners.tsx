"use client";
import React from "react";

export default function Partners() {
  const logos = [
    "/media/2026/01/OVI-1024x599.png",
    "/media/2026/01/MSF-1024x357.png",
    "/media/2026/01/NZP-1024x320.png",
    "/media/2026/01/Stele-2.png",
    "/media/2026/01/thev-1024x551.png",
    "/media/2024/03/ceragres_Logo.png",
    "/media/2024/03/Logo_Alumilex.png"
  ];

  return (
    <section className="w-full bg-white pt-0 pb-10 md:pb-10 xl:pb-[90px] overflow-hidden">
      <div
        className="relative flex w-full max-w-[900px] mx-auto items-center overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex animate-[ticker_30s_linear_infinite] whitespace-nowrap">
          {/* Double the logos array to ensure seamless loop */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="h-[52px] flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <img
                src={logo}
                alt={`Partner Logo ${index}`}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* We need to add the keyframes for the ticker if it doesn't exist in globals.css. We can just add inline style for now. */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33%, 0, 0); }
        }
      `}} />
    </section>
  );
}
