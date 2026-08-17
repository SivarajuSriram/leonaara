"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import Reveal from "@/components/Reveal";
import SectionIntro from "@/components/SectionIntro";

const defaultGallery = [
  "/media/2026/04/Base-Camp-Lao-007-copy-1800x2708.jpg",
  "/media/2026/04/Base-Camp-Lao-018-copy-1800x2700.jpg",
  "/media/2026/04/Base-Camp-Lao-010-copy.jpg",
  "/media/2026/04/Base-Camp-Lao-030-copy-1800x2700.jpg",
  "/media/2026/04/Base-Camp-Lao-003-copy.jpg",
  "/media/2026/04/Base-Camp-Lao-039-copy-1800x2707.jpg",
];

// iOS UIScrollView-style rubber band curve: diminishing resistance that
// asymptotically approaches `dimension` as the drag-past-the-edge distance
// grows, instead of following the pointer 1:1 or dead-stopping.
function rubberBand(overshoot: number, dimension: number, constant = 0.55) {
  const sign = overshoot < 0 ? -1 : 1;
  const x = Math.abs(overshoot);
  return sign * (x * dimension * constant) / (dimension + constant * x);
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      className={direction === "left" ? "-scale-x-100" : ""}
    >
      <path
        d="M0.5 8H23M23 8L16 1M23 8L16 15"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DetailsGallery({ gallery = defaultGallery }: { gallery?: string[] } = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  // The rubber-band overshoot transform is written to this wrapper instead
  // of trackRef itself. trackRef is an actively-scrolling overflow-x-auto
  // element (scrollLeft is written to it every frame during a drag); giving
  // it a live `transform` too forces the compositor to reconcile a moving
  // scroll offset and a moving transform on the very same layer every
  // frame, which is far heavier than transforming a plain static wrapper
  // around it. That's what made dragging past the first/last card (where
  // overshoot is non-zero) choppier than dragging in the middle.
  const shellRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Mouse-drag state. Touch already gets native momentum scrolling (plus
  // its own rubber-band overscroll) for free, so this only kicks in for
  // pointerType "mouse" — dragging with a mouse isn't something
  // overflow-x-auto supports on its own.
  //
  // The scrollLeft writes are batched into a rAF loop (rafId) rather than
  // applied straight from the pointermove handler: pointermove can fire
  // far more often than the screen repaints, and scrollLeft is a
  // layout-triggering property, so writing it once per event — instead of
  // once per frame — is what made the drag feel choppy. lastX/lastT track
  // a short velocity sample so release can hand off into an inertia glide.
  //
  // Dragging past either edge can't push scrollLeft past its native
  // clamp, so the overshoot is rendered as a resisted transform on the
  // track instead — same trick native scroll views use for rubber-band
  // overscroll — and springs back to 0 on release. The transform sign is
  // negated relative to the overshoot: scrolling further forward (past
  // the end) is what would keep sliding the content further left, so the
  // "as if it could keep going" motion is a negative translateX, and
  // symmetrically positive past the start — matching the drag direction
  // instead of snapping back against it.
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
    pendingDx: 0,
    rafId: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    overshoot: 0,
    maxScroll: 0,
    dimension: 0,
  });

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  };

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 12 : el.clientWidth * 0.8;
    const target = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + dir * step));
    // Lenis drives the page's scroll via its own rAF loop, which fights the
    // browser's native smooth-scroll timing on nested scrollers (scrollBy/
    // scrollLeft with behavior: "smooth" gets silently dropped mid-flight).
    // Tweening scrollLeft directly with GSAP writes the property every
    // frame instead, so it isn't subject to that conflict. scroll-snap
    // also has to be switched off for the duration: with it left on, the
    // browser fights every intermediate scrollLeft the tween writes by
    // trying to re-snap to the nearest card, which is what made clicking
    // the arrows feel like it was stepping instead of gliding.
    gsap.killTweensOf(el);
    el.style.scrollSnapType = "none";
    gsap.to(el, {
      scrollLeft: target,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        el.style.scrollSnapType = "";
      },
    });
  };

  // maxScroll/dimension are cached once at drag start (onPointerDown) rather
  // than read from el.scrollWidth/el.clientWidth here every frame. Reading a
  // layout property right after a style write from the previous frame forces
  // the browser to synchronously flush layout before it can answer — since
  // scrollLeft and transform are both being written every tick, that read
  // was forcing a synchronous reflow on every single frame of the drag,
  // which is what made the spring/drag feel choppy.
  const dragTick = () => {
    const state = dragState.current;
    const el = trackRef.current;
    const shell = shellRef.current;
    if (!state.dragging || !el || !shell) {
      state.rafId = 0;
      return;
    }
    const raw = state.startScrollLeft - state.pendingDx;
    const clamped = Math.max(0, Math.min(state.maxScroll, raw));
    if (el.scrollLeft !== clamped) el.scrollLeft = clamped;

    const overshoot = raw - clamped;
    state.overshoot = overshoot ? -rubberBand(overshoot, state.dimension) : 0;
    shell.style.transform = state.overshoot ? `translateX(${state.overshoot}px)` : "";

    state.rafId = requestAnimationFrame(dragTick);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    const shell = shellRef.current;
    if (!shell) return;
    gsap.killTweensOf(shell);
    el.style.scrollSnapType = "none";
    // Promote the shell to its own compositor layer up front, since it's
    // about to get a transform written to it every frame — without this the
    // browser may only decide to composite it after the first paint, which
    // shows up as a visible stutter right as the drag starts.
    shell.style.willChange = "transform";
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
      pendingDx: 0,
      rafId: 0,
      lastX: e.clientX,
      lastT: e.timeStamp,
      velocity: 0,
      overshoot: 0,
      maxScroll: el.scrollWidth - el.clientWidth,
      dimension: el.clientWidth,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const el = trackRef.current;
    if (!state.dragging || !el) return;
    const dx = e.clientX - state.startX;
    if (Math.abs(dx) > 3) state.moved = true;
    state.pendingDx = dx;

    const dt = e.timeStamp - state.lastT;
    if (dt > 0) state.velocity = (e.clientX - state.lastX) / dt;
    state.lastX = e.clientX;
    state.lastT = e.timeStamp;

    if (!state.rafId) state.rafId = requestAnimationFrame(dragTick);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const el = trackRef.current;
    const shell = shellRef.current;
    if (!state.dragging || !el || !shell) return;
    state.dragging = false;
    if (state.rafId) cancelAnimationFrame(state.rafId);
    trackRef.current?.releasePointerCapture(e.pointerId);

    const restoreSnap = () => {
      el.style.scrollSnapType = "";
      shell.style.willChange = "";
    };

    // Pulled past an edge: spring the overshoot transform back to 0
    // instead of gliding scrollLeft — the pinned edge IS the destination.
    if (state.overshoot) {
      // fromTo with an explicit `from` matters here: dragTick writes
      // shell.style.transform directly via raw DOM every frame, bypassing
      // GSAP entirely. GSAP only ever "meets" this element once, in
      // killTweensOf above — at that moment transform is still empty, so
      // GSAP caches x:0 as its notion of "current". A plain gsap.to(x:0)
      // trusts that stale cache, thinks it's already at 0, and snaps
      // instead of springing. Passing the real current value as `from`
      // overrides the cache instead of reading it.
      gsap.fromTo(
        shell,
        { x: state.overshoot },
        {
          x: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.6)",
          onComplete: () => {
            shell.style.transform = "";
            restoreSnap();
          },
        }
      );
      return;
    }

    // Otherwise hand off into an inertia glide scaled from release
    // velocity (px/ms), clamped to the scrollable range, then restore
    // snap so it settles on a card edge — same shape as a native
    // carousel's flick gesture.
    const maxScroll = state.maxScroll;
    const throwDistance = state.velocity * 260;
    if (Math.abs(throwDistance) > 4) {
      const target = Math.max(0, Math.min(maxScroll, el.scrollLeft - throwDistance));
      gsap.to(el, { scrollLeft: target, duration: 0.9, ease: "power3.out", onComplete: restoreSnap });
    } else {
      restoreSnap();
    }
  };

  return (
    <section className="relative w-full bg-white py-16 text-black md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <SectionIntro
          className="mb-10 md:mb-12"
          eyebrow="Lifestyle Amenities"
          heading="Life in Perfect Harmony"
          headingMaxWidth="max-w-2xl"
          body="Kadamba offers 28+ thoughtfully curated amenities, a 20,000+ sq. ft. clubhouse, and beautifully designed spaces that celebrate wellness, nature, recreation, and community. From K-Life and Soul Space to the Miyawaki Forest, Fit Fields, Fresh Pick, Happy Tails, and Well Springs, every experience is crafted to elevate everyday living."
        />

        <div className="mb-4 hidden items-center justify-end gap-10 md:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous detail"
            className="flex items-center justify-center p-1 text-black transition-opacity disabled:opacity-25"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next detail"
            className="flex items-center justify-center p-1 text-black transition-opacity disabled:opacity-25"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <Reveal>
        <div ref={shellRef}>
          <div
            ref={trackRef}
            onScroll={updateEdges}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={(e) => {
              if (dragState.current.moved) e.preventDefault();
            }}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pl-6 cursor-grab select-none active:cursor-grabbing xl:pl-[max(1.5rem,calc((100vw-1920px)/2+1.5rem))]"
          >
            {gallery.map((src, i) => (
              <div
                key={src}
                data-card
                className="relative aspect-[2/3] w-[78vw] flex-shrink-0 snap-start overflow-hidden rounded-[4px] sm:w-[46vw] md:w-[30vw] xl:w-[24vw]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  draggable={false}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  loading={i > 1 ? "lazy" : undefined}
                />
              </div>
            ))}
            <div className="w-[calc(6px)] flex-shrink-0 md:w-6" aria-hidden="true" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
