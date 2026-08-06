"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Flip, ScrollTrigger);

const cards = [
  {
    title: "Custom Lighting",
    text: "The lighting in our cabins has been custom designed in collaboration with Montreal design studio <i>Jeta</i>. Each piece was carefully crafted to optimize each area of the home.",
    video: "/media/2024/04/Base_Lamps_v02.mp4"
  },
  {
    title: "Mitz Takahashi",
    text: "We offer the <i>Journey Couch</i> as an added feature for all our homes. Designed by Montreal-based designer <i>Mitz Takahashi</i>, the piece subtly blends his influence of Japanese minimalism with Nordic sturdiness.",
    video: "/media/2024/02/c79e-4541-8437-96c3bdf025f7.mp4"
  }
];

export default function DesignerBioCards() {
  // Mitz Takahashi (index 1) is open by default, matching the live site.
  const [active, setActive] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentBoxRef = useRef<HTMLDivElement>(null);
  const flipStateRef = useRef<Flip.FlipState | null>(null);
  const containerHeightRef = useRef<number | null>(null);

  const toggle = (index: number) => {
    if (index === active || !containerRef.current) return;
    flipStateRef.current = Flip.getState(Array.from(containerRef.current.children));
    containerHeightRef.current = containerRef.current.getBoundingClientRect().height;
    setActive(index);
  };

  useGSAP(
    () => {
      if (flipStateRef.current && containerRef.current) {
        const container = containerRef.current;

        // While Flip's `absolute:true` is in effect, the flipped grid items
        // are pulled out of layout flow, so the grid row itself can momentarily
        // collapse toward zero height. Whatever section follows this one then
        // slides up to fill that gap while the (still visible, absolutely
        // positioned) cards are mid-flight — the overlap this caused is what
        // was glitching. Locking the row to its pre-toggle height for the
        // duration of the flip makes that collapse impossible.
        if (containerHeightRef.current) {
          gsap.set(container, { height: containerHeightRef.current });
        }

        // Passing the container's current (post-render) children as explicit
        // targets lets Flip diff them against the old state itself, rather
        // than only the elements it originally captured. That's what makes it
        // recognize the freshly-mounted text panel as an "entering" element
        // (and the outgoing one as "leaving") instead of just letting it pop
        // in at full opacity in its final grid cell while the video it used
        // to share that cell with is still mid-flight out of it.
        Flip.from(flipStateRef.current, {
          duration: 0.6,
          ease: "power2.inOut",
          absolute: true,
          targets: container.children,
          onEnter: (elements) =>
            gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, duration: 0.3, delay: 0.3, ease: "power1.out" }),
          onLeave: (elements) => gsap.to(elements, { opacity: 0, duration: 0.2, ease: "power1.out" }),
          onComplete: () => {
            // Flip's `absolute:true` inline-positions targets for the flight
            // and is meant to hand them back to normal grid flow afterward,
            // but the freshly-entered element (never part of the old state)
            // doesn't go through that revert path — left unfixed, it stays
            // pinned at an absolute pixel position and floats over whatever
            // section happens to scroll underneath it. Force every grid item
            // back to plain, class-driven layout once the flight settles.
            gsap.set(container.children, {
              clearProps: "position,top,left,right,bottom,width,height,transform",
            });
            gsap.set(container, { clearProps: "height" });
          },
        });
        flipStateRef.current = null;
      }
    },
    { dependencies: [active], scope: containerRef }
  );

  // The bordered box starts sized to fit the title/text (its natural height),
  // then grows downward the rest of the way to the video's full height as the
  // user scrolls — the title/text sit flush against its bottom edge via
  // flex-end, so they visually "ride down" with the growing bottom edge.
  useGSAP(
    () => {
      const box = contentBoxRef.current;
      if (!box) return;
      const startHeight = box.getBoundingClientRect().height;
      gsap.fromTo(
        box,
        { height: startHeight },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            // Tied to the box's BOTTOM edge (where the text sits) rather than
            // its top — the box is taller than the viewport, so anchoring to
            // the top meant the whole grow animation finished while the text
            // was still below the fold. Starting when the bottom edge enters
            // the viewport keeps the text on screen for the entire animation.
            trigger: box,
            start: "bottom bottom",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );
    },
    { dependencies: [active], scope: containerRef }
  );

  // The text panel always sits immediately after the active video, pushing
  // any later videos one slot further right — matching the original site's
  // toggle behaviour (only one card "open" at a time).
  const slots =
    active === 0
      ? [{ type: "video" as const, i: 0 }, { type: "text" as const, i: 0 }, { type: "video" as const, i: 1 }]
      : [{ type: "video" as const, i: 0 }, { type: "video" as const, i: 1 }, { type: "text" as const, i: 1 }];

  // Flip's `absolute: true` temporarily removes the moving videos from grid
  // flow. Without an explicit column per slot, the CSS grid auto-placement
  // recalculates around whatever's left in flow, so the newly-mounted text
  // panel would flash into column 1 before snapping to its real spot once
  // Flip finishes. Pinning each slot to its column index sidesteps that.
  const colClasses = ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3"];

  return (
    <section className="w-full bg-white text-black pt-0 pb-[60px] md:pb-[100px] xl:pb-[200px]">
      <div className="container mx-auto px-6 max-w-[1920px]">
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-6 xl:gap-5">
          {slots.map((slot, idx) => {
            if (slot.type === "video") {
              const card = cards[slot.i];
              const isOpen = slot.i === active;
              return (
                <div key={`video-${slot.i}`} className={`flex flex-col gap-6 ${colClasses[idx]}`}>
                  <div className="relative w-full overflow-hidden rounded-[4px] aspect-[9/16] md:aspect-[3/4] lg:aspect-[9/16]">
                    <video
                      src={card.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggle(slot.i)}
                      aria-label={isOpen ? `Hide ${card.title} details` : `Show ${card.title} details`}
                      className="group absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black transition-transform hover:scale-105"
                    >
                      <span className="inline-block text-lg leading-none">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </div>
                </div>
              );
            }

            const card = cards[slot.i];
            return (
              <div
                key={`text-${slot.i}`}
                className={`relative aspect-[9/16] md:aspect-[3/4] lg:aspect-[9/16] ${colClasses[idx]}`}
              >
                <div
                  ref={contentBoxRef}
                  className="absolute left-0 top-0 w-full overflow-hidden rounded-[4px] border border-black/20 flex flex-col justify-end gap-4 p-5 xl:p-6"
                >
                  <h3 className="font-serif text-[20px] xl:text-[24px] font-light m-0">{card.title}</h3>
                  <p
                    className="text-[14px] xl:text-[16px] leading-snug text-black"
                    dangerouslySetInnerHTML={{ __html: card.text }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
