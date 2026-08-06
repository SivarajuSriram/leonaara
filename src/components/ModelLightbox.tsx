"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type ColorKey = "black" | "beige";

function computeFlipTransform(sourceEl: HTMLImageElement, wrapEl: HTMLElement) {
  const rect = sourceEl.getBoundingClientRect();
  const current = wrapEl.getBoundingClientRect();

  const iw = sourceEl.naturalWidth || rect.width;
  const ih = sourceEl.naturalHeight || rect.height;

  const sourceScale = Math.min(rect.width / iw, rect.height / ih);
  const targetScale = Math.min(current.width / iw, current.height / ih);

  return {
    x: rect.left + rect.width / 2 - (current.left + current.width / 2),
    y: rect.top + rect.height / 2 - (current.top + current.height / 2),
    scale: sourceScale / targetScale,
  };
}

interface ModelData {
  id: string;
  title: string;
  colors: Record<ColorKey, string[]>;
  swatches: { key: ColorKey; hex: string; label: string }[];
  spec: string;
  plans: string[];
}

export default function ModelLightbox({
  model,
  mode,
  initialColor,
  initialIndex,
  sourceEl,
  getSourceEl,
  onColorChange,
  onIndexChange,
  onClose,
}: {
  model: ModelData;
  mode: "photos" | "plans";
  initialColor: ColorKey;
  initialIndex: number;
  sourceEl: HTMLImageElement | null;
  getSourceEl?: () => HTMLImageElement | null;
  onColorChange?: (color: ColorKey) => void;
  onIndexChange?: (index: number) => void;
  onClose: () => void;
}) {
  const isPlans = mode === "plans";
  const [color, setColor] = useState(initialColor);
  const [index, setIndex] = useState(initialIndex);
  const images = isPlans ? model.plans : model.colors[color];
  // The grid thumbnail behind the modal is keyed by src, so switching color
  // unmounts the original `sourceEl` entirely. Always resolve the CURRENT
  // thumbnail lazily instead of trusting the frozen `sourceEl` reference.
  const currentSourceEl = () => (getSourceEl ? getSourceEl() : sourceEl);
  const [loaded, setLoaded] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    const initial: Record<string, boolean> = {};
    const allSrcs = isPlans
      ? model.plans
      : [...model.colors.black, ...model.colors.beige];
    allSrcs.forEach((src) => {
      const probe = new window.Image();
      probe.src = src;
      if (probe.complete) initial[src] = true;
    });
    return initial;
  });
  const markLoaded = (src: string) => setLoaded((prev) => (prev[src] ? prev : { ...prev, [src]: true }));

  const backdropRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const specRef = useRef<HTMLParagraphElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const swatchesRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const prev = () =>
    setIndex((i) => {
      const prevI = (i - 1 + images.length) % images.length;
      onIndexChange?.(prevI);
      return prevI;
    });
  const next = () =>
    setIndex((i) => {
      const nextI = (i + 1) % images.length;
      onIndexChange?.(nextI);
      return nextI;
    });
  const selectColor = (key: ColorKey) => {
    setColor(key);
    setIndex(0);
    onColorChange?.(key);
    onIndexChange?.(0);
  };

  const chromeRefs = () =>
    [
      closeBtnRef.current,
      titleRef.current,
      specRef.current,
      prevBtnRef.current,
      nextBtnRef.current,
      paginationRef.current,
      !isPlans ? swatchesRef.current : null,
    ].filter(Boolean) as Element[];

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    // Resolve the thumbnail ONCE, live, right now — never the frozen prop.
    // If color was changed while the modal was open, the original `sourceEl`
    // is a detached node from an unmounted <img> (it's keyed by src), and
    // FLIPping back to a detached node's (0,0,0,0) rect is exactly what
    // caused the position/movement glitch on close.
    const closeEl = currentSourceEl();

    const tl = gsap.timeline({
      onComplete: () => {
        if (closeEl) {
          // The grid thumbnail has a CSS `transition-opacity duration-500` for its
          // own color/index fades. Clearing the inline opacity here would let that
          // transition animate it back in over 500ms, showing a blank gap right as
          // the modal image unmounts. Disable the transition for one frame so it
          // snaps back instantly instead.
          closeEl.style.transition = "none";
          closeEl.style.opacity = "";
          void closeEl.offsetHeight;
          requestAnimationFrame(() => {
            closeEl.style.transition = "";
          });
        }
        onClose();
      },
    });

    tl.to(chromeRefs(), { opacity: 0, duration: 0.25, ease: "power2.in" }, 0);

    if (imgWrapRef.current) {
      if (closeEl) {
        const { x, y, scale } = computeFlipTransform(closeEl, imgWrapRef.current);

        tl.to(
          imgWrapRef.current,
          {
            x,
            y,
            scale,
            duration: 1.1,
            ease: "power3.inOut",
          },
          0
        );
      } else {
        tl.to(
          imgWrapRef.current,
          { opacity: 0, scale: 0.94, duration: 0.35, ease: "power2.in" },
          0
        );
      }
    }

    tl.to(backdropRef.current, { opacity: 0, duration: 0.5, ease: "none" }, 0.6);
  };

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("lightbox-toggle", { detail: true }));
    return () => {
      document.body.style.overflow = prevOverflow;
      const el = currentSourceEl();
      if (el) el.style.opacity = "";
      window.dispatchEvent(new CustomEvent("lightbox-toggle", { detail: false }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Color/index can change while the modal is open. The newly-active
  // thumbnail behind the modal (a fresh DOM node when color changed, since
  // it's keyed by src) needs to be hidden too, same as the one captured at
  // mount — otherwise it flashes visible underneath the modal.
  useLayoutEffect(() => {
    const el = currentSourceEl();
    if (el) el.style.opacity = "0";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  useGSAP(
    () => {
      if (!imgWrapRef.current) return;

      gsap.set(backdropRef.current, { opacity: 0 });
      gsap.set(chromeRefs(), { opacity: 0 });
      gsap.set([titleRef.current, specRef.current], { y: 18 });
      gsap.set([prevBtnRef.current, nextBtnRef.current, paginationRef.current, swatchesRef.current], { y: 10 });
      gsap.set(closeBtnRef.current, { scale: 0.6, y: 0 });

      gsap.to(backdropRef.current, { opacity: 1, duration: 0.45, ease: "none" });

      if (sourceEl) {
        // Hiding the FLIP source thumbnail during the open animation is
        // intentional imperative DOM work, not a React-managed mutation.
        sourceEl.style.opacity = "0";

        const { x, y, scale } = computeFlipTransform(sourceEl, imgWrapRef.current);

        gsap.set(imgWrapRef.current, { transformOrigin: "center center", x, y, scale });
        gsap.to(imgWrapRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.3,
          ease: "power3.out",
        });
      } else {
        gsap.fromTo(
          imgWrapRef.current,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
        );
      }

      const chromeDelay = sourceEl ? 0.9 : 0.35;

      gsap.to(closeBtnRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
        delay: chromeDelay,
      });
      gsap.to([titleRef.current, specRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: chromeDelay + 0.1,
      });
      gsap.to([prevBtnRef.current, nextBtnRef.current, paginationRef.current, swatchesRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
        delay: chromeDelay + 0.2,
      });
    },
    { dependencies: [] }
  );

  return (
    <div className="fixed inset-0 z-[100]">
      <div ref={backdropRef} className="absolute inset-0 bg-white" />

      <button
        ref={closeBtnRef}
        onClick={handleClose}
        aria-label="Close"
        className="group absolute right-0 top-0 z-20 flex h-14 w-14 items-center justify-center"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-black/[0.06]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="transition-transform duration-500 ease-out group-hover:rotate-90"
          >
            <path d="M1 1L17 17M17 1L1 17" stroke="black" strokeWidth="1.5" />
          </svg>
        </span>
      </button>

      <div className="absolute left-6 top-5 z-20 flex flex-wrap items-baseline gap-x-4 gap-y-1 md:left-10">
        <p ref={titleRef} className="m-0 text-[24px] font-normal uppercase leading-none md:text-[32px]">
          {model.title}
        </p>
        <p ref={specRef} className="m-0 text-[13px] font-medium uppercase text-black md:text-[14px]">
          {model.spec}
        </p>
      </div>

      <div className="pointer-events-none absolute left-0 top-6 z-20 hidden w-full justify-center md:flex">
        <div ref={paginationRef} className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-[6px] w-[6px] rounded-full ${i === index ? "bg-brand-red" : "bg-gray-300"}`}
              />
            ))}
          </span>
          <span className="text-[13px] text-brand-red">
            {index + 1}/{images.length}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 z-10">
        <button
          ref={prevBtnRef}
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-4 top-[calc(50%-18px)] z-10 flex h-9 w-9 items-center justify-center rounded-full text-[20px] transition-all duration-200 hover:-translate-x-1 hover:bg-black/[0.06] md:left-10"
        >
          ←
        </button>

        <div
          ref={imgWrapRef}
          className="absolute inset-0 m-auto h-fit w-[calc(100%-40px)] max-w-[1800px] aspect-[5/2] md:w-[calc(100%-80px)]"
        >
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={model.title}
              onLoad={() => markLoaded(src)}
              className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out"
              style={{ opacity: i === index && loaded[src] ? 1 : 0 }}
            />
          ))}

          {!loaded[images[index]] && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-black/15 border-t-black" />
            </div>
          )}
        </div>

        <button
          ref={nextBtnRef}
          onClick={next}
          aria-label="Next image"
          className="absolute right-4 top-[calc(50%-18px)] z-10 flex h-9 w-9 items-center justify-center rounded-full text-[20px] transition-all duration-200 hover:translate-x-1 hover:bg-black/[0.06] md:right-10"
        >
          →
        </button>
      </div>

      {!isPlans && (
        <div className="pointer-events-none absolute bottom-8 left-0 z-20 flex w-full justify-center md:bottom-10">
          <div ref={swatchesRef} className="pointer-events-auto flex items-center gap-2">
            {model.swatches.map((s) => (
              <button
                key={s.key}
                onClick={() => selectColor(s.key)}
                aria-label={s.label}
                aria-current={color === s.key}
                className={`h-[26px] w-[26px] rounded-full border transition-shadow ${
                  color === s.key ? "ring-1 ring-black ring-offset-2" : "border-black/20"
                }`}
                style={{ backgroundColor: s.hex }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
