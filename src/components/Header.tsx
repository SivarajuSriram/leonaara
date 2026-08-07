"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { href: "/system-pricing", label: "System & Pricing" },
  { href: "/base-build-system", label: "Leonaara Build" },
  { href: "/articles", label: "Articles" },
  { href: "/base-camp", label: "Leonaara Camp" },
];

const NAV_LINK_CLASS = "group relative inline-block pb-0.5";
const NAV_UNDERLINE_CLASS =
  "pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100";

export default function Header({ light = false }: { light?: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const lenis = (window as typeof window & { __lenis?: { scrollTo: (target: number, opts?: Record<string, unknown>) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const lenis = (window as typeof window & { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (menuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const heroHeight = window.innerHeight;
      const diff = y - lastY.current;

      if (y < heroHeight) {
        setHidden(false);
        setSolid(false);
      } else {
        setSolid(true);
        if (diff > 4) {
          setHidden(true);
        } else if (diff < -4) {
          setHidden(false);
        }
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onToggle = (e: Event) => setModalOpen(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener("lightbox-toggle", onToggle);
    return () => window.removeEventListener("lightbox-toggle", onToggle);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full pointer-events-none transition-all duration-500 ease-out ${
        (hidden && !menuOpen) || modalOpen ? "-translate-y-full" : "translate-y-0"
      } ${solid || menuOpen ? "bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : "bg-transparent"}`}
    >
      <div
        className={`pointer-events-auto flex w-full -translate-y-3 items-start justify-between px-10 pt-10 pb-0 transition-colors duration-500 ${
          light && !solid && !menuOpen ? "text-white" : "text-black"
        }`}
      >
        {/* Logo */}
        <Link href="/" onClick={handleLogoClick} className="group flex-shrink-0 -mt-1.5">
          <img
            src="/leonara-logo-color.webp"
            alt="Leonaara"
            width={103}
            height={58}
            className="h-[58px] w-auto origin-left scale-[1.55] object-contain"
          />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5">
          <MagneticButton
            href="#interested"
            className="flex h-11 items-center justify-center rounded-[4px] bg-[#f5f5e7] px-5 text-[15px] font-medium text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            I&apos;m interested
          </MagneticButton>

          <nav className="hidden md:flex gap-5 text-xs uppercase font-normal">
            <Link href="/" onClick={handleLogoClick} className={NAV_LINK_CLASS}>
              Home
              <span className={NAV_UNDERLINE_CLASS} />
            </Link>
            {/*<Link href="/system-pricing" className={NAV_LINK_CLASS}>
              System & Pricing
              <span className={NAV_UNDERLINE_CLASS} />
            </Link> */}
            <Link href="/base-camp" className={NAV_LINK_CLASS}>
              Projects
              <span className={NAV_UNDERLINE_CLASS} />
            </Link>
            <Link href="/articles" className={NAV_LINK_CLASS}>
              Blog
              <span className={NAV_UNDERLINE_CLASS} />
            </Link>
            <Link href="/base-camp" className={NAV_LINK_CLASS}>
              Connect
              <span className={NAV_UNDERLINE_CLASS} />
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden relative z-10 flex h-6 w-6 flex-col items-center justify-center gap-1.5 p-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={`md:hidden fixed inset-0 top-0 z-40 flex h-screen w-full flex-col justify-between bg-white px-10 pt-32 pb-10 text-black transition-opacity duration-300 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-6 text-2xl">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={NAV_LINK_CLASS}
            >
              {link.label}
              <span className={NAV_UNDERLINE_CLASS} />
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-6">
          <MagneticButton
            href="#interested"
            className="flex h-12 w-full items-center justify-center rounded-[4px] bg-brand-red text-[15px] font-medium text-white transition-colors duration-300 hover:bg-black"
          >
            I&apos;m interested
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
