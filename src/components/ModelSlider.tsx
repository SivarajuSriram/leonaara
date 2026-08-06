"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedText from "./AnimatedText";

const models = [
  {
    name: "Base I",
    price: "From $295,000",
    size: "785 sq. ft.",
    beds: "1-2 Bedrooms",
    image: "https://images.unsplash.com/photo-1542662053-15df15e8bfa1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Base II",
    price: "From $360,000",
    size: "1,000 sq. ft.",
    beds: "2-3 Bedrooms",
    image: "https://images.unsplash.com/photo-1542661556-9e65ea0e4fde?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Base III",
    price: "From $490,000",
    size: "1,460 sq. ft.",
    beds: "3-4 Bedrooms",
    image: "https://images.unsplash.com/photo-1542662053-15df15e8bfa1?q=80&w=1200&auto=format&fit=crop",
  }
];

export default function ModelSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % models.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + models.length) % models.length);
  };

  useGSAP(() => {
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        xPercent: -(activeIndex * 100),
        duration: 0.8,
        ease: "power3.inOut"
      });
    }
  }, { scope: containerRef, dependencies: [activeIndex] });

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12 border-b border-gray-300 pb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-medium text-gray-500 mb-6">Models</p>
            <AnimatedText 
              text="Two base models. Unlimited adventures." 
              className="text-huge max-w-4xl" 
            />
          </div>
          <div className="hidden md:flex gap-4 mb-4">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors" aria-label="Previous model">←</button>
            <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors" aria-label="Next model">→</button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden rounded-sm">
          <div ref={trackRef} className="flex w-full">
            {models.map((model, idx) => (
              <div key={idx} className="w-full flex-shrink-0 flex flex-col md:flex-row bg-white">
                <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[60vh] bg-gray-200">
                  <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                  <h3 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">{model.name}</h3>
                  <div className="space-y-4 mb-12 text-lg text-gray-600 border-t border-gray-200 pt-6">
                    <p className="flex justify-between border-b border-gray-100 pb-2"><span>Starting Price</span> <span className="font-medium text-black">{model.price}</span></p>
                    <p className="flex justify-between border-b border-gray-100 pb-2"><span>Surface Area</span> <span className="font-medium text-black">{model.size}</span></p>
                    <p className="flex justify-between border-b border-gray-100 pb-2"><span>Configuration</span> <span className="font-medium text-black">{model.beds}</span></p>
                  </div>
                  <Link href="/system-pricing" className="inline-block bg-black text-white text-xs uppercase tracking-widest px-8 py-4 rounded-full text-center hover:bg-brand-red transition-colors self-start">
                    See full comparison specs
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden justify-center gap-4 mt-8">
          <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-black flex items-center justify-center">←</button>
          <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-black flex items-center justify-center">→</button>
        </div>
      </div>
    </section>
  );
}
