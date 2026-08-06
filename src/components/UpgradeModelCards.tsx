"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";

export default function UpgradeModelCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragState = useRef({ isDown: false, startX: 0, startScrollLeft: 0, lastX: 0, lastT: 0, velocity: 0 });
  const momentumTween = useRef<gsap.core.Tween | null>(null);

  const cards = [
    {
      title: "Flexibility",
      subtitle: "An inclusive model",
      text: "Our needs have also evolved. New realities call for innovative solutions, and our approach aims to provide you the flexibility to live on your own terms.",
      image: "/media/2024/02/NM_01-2.png"
    },
    {
      title: "Simplicity",
      subtitle: "More time to do less",
      text: "An easy to manage home means less to worry about – giving you more time to do what you love with those you love.",
      image: "/media/2024/02/NM_01-6.png"
    },
    {
      title: "Adaptability",
      subtitle: "Evolves with you over time",
      text: "What if our homes could easily evolve with us over time? An extra module that attaches directly onto your home could become a personal greenhouse, studio or workshop.",
      image: "/media/2024/02/NM_01-7.png"
    },
    {
      title: "Self-Sustainability",
      subtitle: "Geared towards self-sustainability",
      text: "You are the master of your own domain. If going off-grid and growing some vegetables is your thing, then we want to help.",
      image: "/media/2024/04/NM_01-2.png"
    },
    {
      title: "Wellness",
      subtitle: "A key part of your wellbeing",
      text: "Allowing yourself regular escapes into the wilderness may be the real key to a good routine. Your body, mind and soul will thank you.",
      image: "/media/2024/02/NM_01-8.png"
    },
    {
      title: "Community",
      subtitle: "Built around common values",
      text: "Base is building a community centered on simple, sustainable living. Our values as well as yours are what drive it forward.",
      image: "/media/2024/04/Base-Logo.gif"
    }
  ];

  const updateActiveIndex = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const progress = maxScroll > 0 ? slider.scrollLeft / maxScroll : 0;
    const index = Math.round(progress * (cards.length - 1));
    setActiveIndex(index);
  };

  const clampScroll = (value: number) => {
    const slider = sliderRef.current;
    if (!slider) return value;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    return Math.min(maxScroll, Math.max(0, value));
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;
    if (!slider) return;
    momentumTween.current?.kill();
    dragState.current = {
      isDown: true,
      startX: e.clientX,
      startScrollLeft: slider.scrollLeft,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
    };
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;
    const state = dragState.current;
    if (!state.isDown || !slider) return;
    const now = performance.now();
    const dt = now - state.lastT;
    if (dt > 0) state.velocity = (e.clientX - state.lastX) / dt;
    state.lastX = e.clientX;
    state.lastT = now;
    slider.scrollLeft = clampScroll(state.startScrollLeft - (e.clientX - state.startX));
    updateActiveIndex();
  };

  const endDrag = () => {
    const state = dragState.current;
    if (!state.isDown) return;
    state.isDown = false;
    setIsDragging(false);
    const slider = sliderRef.current;
    if (!slider) return;

    // Continue the motion after release, decaying smoothly — this is the
    // momentum "coast" a native/Swiper drag has that a plain 1:1 scrollLeft
    // assignment doesn't, which is what made the old drag feel abrupt.
    const throwDistance = -state.velocity * 260;
    const target = clampScroll(slider.scrollLeft + throwDistance);
    const distance = Math.abs(target - slider.scrollLeft);
    momentumTween.current = gsap.to(slider, {
      scrollLeft: target,
      duration: Math.min(1.1, Math.max(0.35, distance / 900)),
      ease: "power3.out",
      onUpdate: updateActiveIndex,
    });
  };

  const goToCard = (index: number) => {
    const slider = sliderRef.current;
    const child = slider?.children[index] as HTMLElement | undefined;
    if (!slider || !child) return;
    momentumTween.current?.kill();
    momentumTween.current = gsap.to(slider, {
      scrollLeft: child.offsetLeft,
      duration: 0.7,
      ease: "power3.inOut",
      onUpdate: updateActiveIndex,
    });
  };

  return (
    <section ref={containerRef} className="w-full bg-[#f5f5e7] text-black pt-0 pb-[30px] md:pb-5 xl:pb-[90px] overflow-hidden">
      <div className="container mx-auto px-6 w-full">
        <div className="mb-5 flex items-center justify-end gap-3 md:mb-8">
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => goToCard(i)}
                aria-label={`Go to card ${i + 1}`}
                className="p-1.5"
              >
                <span
                  className={`block h-[6px] rounded-full transition-all duration-300 ${
                    activeIndex === i ? "w-6 bg-brand-red" : "w-[6px] bg-black/20"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-[10px] font-medium text-brand-red md:text-[12px]">
            {String(activeIndex + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
          </span>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={sliderRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onScroll={updateActiveIndex}
          className={`flex gap-6 md:gap-10 overflow-x-auto pb-8 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="w-[85vw] md:w-[45vw] lg:w-[30vw] bg-white p-5 xl:p-10 flex flex-col gap-5 xl:gap-[30px] rounded-[12px] shrink-0"
            >
              <h3 className="font-serif text-[20px] md:text-[24px] xl:text-[28px] font-light italic">
                {card.title}
              </h3>

              <div className="w-full aspect-[422/289] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[16px] xl:text-[18px] leading-[1.11] text-brand-red font-normal">
                  {card.subtitle}
                </p>
                <p className="text-[14px] xl:text-[16px] leading-snug text-black">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
