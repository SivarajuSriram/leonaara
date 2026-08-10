"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    (window as typeof window & { __lenis?: Lenis }).__lenis = lenis;

    // Mobile browsers resize the visual viewport as their address bar
    // collapses/expands mid-scroll, which can leave Lenis's cached scroll
    // limit stale right at the page bottom — this is what caused the fixed
    // footer reveal to visibly desync from the content sliding over it.
    const onViewportResize = () => lenis.resize();
    window.visualViewport?.addEventListener("resize", onViewportResize);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.visualViewport?.removeEventListener("resize", onViewportResize);
      delete (window as typeof window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  useEffect(() => {
    const lenis = (window as typeof window & { __lenis?: Lenis }).__lenis;
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
