"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import ModelLightbox from "./ModelLightbox";

gsap.registerPlugin(ScrollTrigger);

type ColorKey = "black" | "beige";

interface ModelData {
  id: string;
  title: string;
  colors: Record<ColorKey, string[]>;
  defaultColor: ColorKey;
  swatches: { key: ColorKey; hex: string; label: string }[];
  spec: string;
  description: string;
  plans: string[];
}

const models: ModelData[] = [
  {
    id: "base-1",
    title: "Base 1",
    defaultColor: "black",
    colors: {
      black: [
        "/media/2024/03/Base-I-Elevation-Front-Dark.png",
        "/media/2024/02/BASE1_Black_BACK.png",
      ],
      beige: [
        "/media/2024/02/BASE1_White_FRONT.png",
        "/media/2024/02/BACK_A_Pale_V3.png",
      ],
    },
    swatches: [
      { key: "black", hex: "#000000", label: "Black" },
      { key: "beige", hex: "#f5f5e7", label: "Beige" },
    ],
    spec: "1 Sleeping loft – 960 sq ft",
    description:
      "Our signature model has the basics covered. Compact yet generous, efficient yet flexible, it maximizes its space for your comfort. The total area includes a 200 sq ft sleeping loft.",
    plans: [
      "/media/2024/03/Base-1-RDC.png",
      "/media/2024/03/Base-1-Mezz.png",
    ],
  },
  {
    id: "base-1-plus",
    title: "Base 1+",
    defaultColor: "beige",
    colors: {
      beige: [
        "/media/2024/02/BASE1_White_FRONT-1.png",
        "/media/2024/02/BACK_B_Pale_V3.png",
      ],
      black: [
        "/media/2024/02/BASE1_Black_FRONT-1.png",
        "/media/2024/02/BASE1_Black_BACK-1.png",
      ],
    },
    swatches: [
      { key: "beige", hex: "#f5f5e7", label: "Beige" },
      { key: "black", hex: "#000000", label: "Black" },
    ],
    spec: "1-2 Bedrooms + 1 sleeping loft – 1200 sq ft",
    description:
      "Our upgraded model offers an extra bedroom off the end of the cabin. You'll find everything else just as it is in the BASE 1. The total area includes a 200 sq ft sleeping loft.",
    plans: [
      "/media/2024/03/Base-1-RDC-1.png",
      "/media/2024/03/Base-1-Mezz-1.png",
    ],
  },
];

function ModelCard({
  model,
  showEyebrow,
  onEnlarge,
  onOpenPlans,
}: {
  model: ModelData;
  showEyebrow: boolean;
  onEnlarge: (
    model: ModelData,
    color: ColorKey,
    index: number,
    sourceEl: HTMLImageElement,
    sync: {
      setColor: (c: ColorKey) => void;
      setIndex: (i: number) => void;
      getSourceEl: () => HTMLImageElement | null;
    }
  ) => void;
  onOpenPlans: (model: ModelData) => void;
}) {
  const [color, setColor] = useState<ColorKey>(model.defaultColor);
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const images = model.colors[color];
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  // Kept in sync every render so the lightbox can always look up the
  // *currently* active thumbnail (color/index can change while it's open,
  // which unmounts the old <img> since it's keyed by src).
  const indexRef = useRef(index);
  useEffect(() => {
    indexRef.current = index;
  });

  const cursorRef = useRef<HTMLSpanElement>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    if (!cursorRef.current) return;
    quickX.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.35, ease: "power3" });
    quickY.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.35, ease: "power3" });
  });

  const selectColor = (key: ColorKey) => {
    setColor(key);
    setIndex(0);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 48;
    const y = e.clientY - rect.top - 16;
    if (!quickX.current || !quickY.current) return;
    quickX.current(x);
    quickY.current(y);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    gsap.set(cursorRef.current, { x: e.clientX - rect.left - 48, y: e.clientY - rect.top - 16 });
    setShowCursor(true);
  };

  const handleMouseLeave = () => setShowCursor(false);

  const handleEnlarge = () => {
    const el = imgRefs.current[index];
    if (el) {
      onEnlarge(model, color, index, el, {
        setColor,
        setIndex,
        getSourceEl: () => imgRefs.current[indexRef.current] ?? null,
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className="relative aspect-[3/2] w-full cursor-none overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleEnlarge}
      >
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            ref={(el) => {
              imgRefs.current[i] = el;
            }}
            src={src}
            alt={model.title}
            className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}

        <span
          ref={cursorRef}
          className="pointer-events-none absolute left-0 top-0 z-20 flex h-8 w-[96px] items-center overflow-hidden rounded-[4px] bg-black text-[13px] uppercase tracking-wide text-white transition-opacity duration-200"
          style={{ opacity: showCursor ? 1 : 0 }}
        >
          <span className="flex w-max animate-ticker">
            <span className="whitespace-nowrap pr-4">Enlarge+</span>
            <span className="whitespace-nowrap pr-4">Enlarge+</span>
          </span>
        </span>

        <button
          onClick={prev}
          onMouseEnter={() => setShowCursor(false)}
          onMouseLeave={() => setShowCursor(true)}
          aria-label="Previous image"
          className="absolute left-3 top-[calc(50%-18px)] z-10 flex h-9 w-9 cursor-pointer items-center justify-center text-[16px] transition-transform hover:-translate-x-1"
        >
          ←
        </button>
        <button
          onClick={next}
          onMouseEnter={() => setShowCursor(false)}
          onMouseLeave={() => setShowCursor(true)}
          aria-label="Next image"
          className="absolute right-3 top-[calc(50%-18px)] z-10 flex h-9 w-9 cursor-pointer items-center justify-center text-[16px] transition-transform hover:translate-x-1"
        >
          →
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-5">
        <p
          className={`m-0 text-[12px] font-normal uppercase leading-[1.16] text-black xl:text-[14px] xl:leading-none ${
            showEyebrow ? "" : "invisible"
          }`}
        >
          Models
        </p>

        <div className="flex items-start justify-between gap-4">
          <h3 className="m-0 text-[20px] font-normal uppercase leading-none tracking-[-0.02em] xl:text-[32px] xl:leading-[1.4]">
            {model.title}
          </h3>
          <button
            onClick={() => onOpenPlans(model)}
            className="group flex items-center gap-1 text-[16px] font-medium uppercase text-black transition-colors hover:text-brand-red"
          >
            Plans
            <span className="inline-block text-brand-red transition-transform duration-500 ease-out group-hover:rotate-90">
              +
            </span>
          </button>
        </div>

        <div className="flex items-center gap-[6px]">
          {model.swatches.map((s) => (
            <button
              key={s.key}
              onClick={() => selectColor(s.key)}
              aria-label={s.label}
              aria-current={color === s.key}
              className={`h-[30px] w-[30px] rounded-full border transition-shadow ${
                color === s.key ? "ring-1 ring-black ring-offset-2" : "border-black/20"
              }`}
              style={{ backgroundColor: s.hex }}
            />
          ))}
        </div>

        <div className="mt-[5px] grid grid-cols-1 gap-y-3 xl:grid-cols-[5fr_6fr] xl:gap-x-5 xl:gap-y-0">
          <div className="flex flex-col gap-[18px]">
            <p className="m-0 text-[14px] font-medium uppercase leading-[normal]">{model.spec}</p>

            <Link
              href="/system-pricing"
              className="inline-flex h-[26px] w-fit items-center justify-center rounded-none border border-[#c4c4c4] px-[14px] text-[14px] uppercase transition-colors hover:bg-black hover:border-black hover:text-white"
            >
              See Pricing
            </Link>
          </div>

          <p className="m-0 text-[14px] leading-[1.42] text-[#333333]">{model.description}</p>
        </div>
      </div>
    </div>
  );
}

interface LightboxState {
  model: ModelData;
  mode: "photos" | "plans";
  color: ColorKey;
  index: number;
  sourceEl: HTMLImageElement | null;
  sync?: {
    setColor: (c: ColorKey) => void;
    setIndex: (i: number) => void;
    getSourceEl: () => HTMLImageElement | null;
  };
}

export default function Models() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  const openLightbox = (
    model: ModelData,
    color: ColorKey,
    index: number,
    sourceEl: HTMLImageElement,
    sync: {
      setColor: (c: ColorKey) => void;
      setIndex: (i: number) => void;
      getSourceEl: () => HTMLImageElement | null;
    }
  ) => {
    setLightbox({ model, mode: "photos", color, index, sourceEl, sync });
  };

  const openPlans = (model: ModelData) => {
    setLightbox({ model, mode: "plans", color: model.defaultColor, index: 0, sourceEl: null });
  };

  return (
    <section className="relative w-full bg-white py-16 text-black md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <div ref={containerRef} className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12 xl:gap-x-16">
          {models.map((model, i) => (
            <ModelCard
              key={model.id}
              model={model}
              showEyebrow={i === 0}
              onEnlarge={openLightbox}
              onOpenPlans={openPlans}
            />
          ))}
        </div>
      </div>

      {lightbox && (
        <ModelLightbox
          model={lightbox.model}
          mode={lightbox.mode}
          initialColor={lightbox.color}
          initialIndex={lightbox.index}
          sourceEl={lightbox.sourceEl}
          getSourceEl={lightbox.sync?.getSourceEl}
          onColorChange={lightbox.sync?.setColor}
          onIndexChange={lightbox.sync?.setIndex}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
