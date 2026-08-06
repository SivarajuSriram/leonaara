"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

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

  // The footer is pinned behind the page (position: fixed) so it sits on the
  // same visual layer as the Hero's pinned video. This spacer reserves the
  // matching amount of flow height so the page still scrolls far enough for
  // the content above (which paints on top, see the `main` z-10 wrapper) to
  // slide up and reveal it, instead of the footer just appearing normally.
  useLayoutEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const update = () => setSpacerHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <div style={{ height: spacerHeight }} aria-hidden="true" />
      <footer
        ref={footerRef}
        className="fixed inset-x-0 bottom-0 z-0 bg-white text-black pt-5 pb-5 md:pb-10 px-6"
      >
        <div className="container mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Headline */}
          <div className="flex flex-col gap-5 md:col-span-1">
            <p className="m-0 text-[12px] xl:text-[14px] uppercase text-black">Base Habitation</p>
            <p className="m-0 text-[18px] md:text-[20px] xl:text-[28px] leading-[1.2]">
              Base is building the next generation of prefabricated housing – using natural, climate-resilient materials to create a sustainable and adaptable ecosystem.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[12px] xl:text-[14px] uppercase text-black">Contact</p>
            <p className="m-0 text-[14px] xl:text-[16px]">
              <a href="mailto:info@basehabitation.com" className="hover:text-brand-red transition-colors">
                info@basehabitation.com
              </a>
            </p>
          </div>

          {/* Follow us */}
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[12px] xl:text-[14px] uppercase text-black">Follow us</p>
            <ul className="m-0 p-0 list-none flex flex-col gap-2 text-[14px] xl:text-[16px]">
              <li>
                <a href="https://www.instagram.com/basehabitation/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <Link href="/articles" className="hover:text-brand-red transition-colors">
                  Articles
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-6">
          <Link href="/" onClick={handleLogoClick} className="inline-block">
            <svg width="120" height="40" viewBox="0 0 157 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
              <path
                d="M157 53H74.3388L62.8543 28.059L50.151 53H0V0H157V53ZM78.769 46.5582H150.224V6.44183H6.77586V46.5585H45.904L63.1641 12.67L78.769 46.5585V46.5582Z"
                fill="currentColor"
              />
              <path
                d="M33.7576 25.5931C37.6272 26.5921 39.5621 28.9572 39.5621 32.6882C39.5621 35.0274 38.7537 36.9125 37.1367 38.3446C35.5197 39.7772 33.1908 40.4928 30.1504 40.4928H17.2148V12.5068H28.3265C31.5604 12.5068 33.9859 13.0981 35.6029 14.2806C37.2199 15.4631 38.0284 17.145 38.0284 19.326C38.0284 22.3217 36.6044 24.3848 33.7579 25.5142V25.5931H33.7576ZM24.0142 18.3012V23.6616H27.2896C28.3676 23.6616 29.259 23.4251 29.9639 22.9521C30.6687 22.4791 31.0211 21.8226 31.0211 20.9813C31.0211 19.1947 29.6944 18.3012 27.0409 18.3012H24.0142ZM27.9945 34.7379C29.3212 34.7379 30.3785 34.4817 31.1662 33.9692C31.954 33.4568 32.3479 32.7276 32.3479 31.7816C32.3479 30.8886 31.9811 30.1724 31.2492 29.6334C30.5166 29.0951 29.4313 28.8253 27.9945 28.8253H24.0142V34.7379H27.9945Z"
                fill="currentColor"
              />
              <path
                d="M97.5237 40.8873C93.4047 40.8873 89.7841 39.3895 86.6611 36.3937L90.7658 31.5848C92.9218 33.8186 95.2293 34.9353 97.6898 34.9353C99.901 34.9353 101.007 34.1733 101.007 32.6491C101.007 31.8871 100.702 31.2892 100.095 30.8556C99.4864 30.422 98.3255 29.9293 96.6118 29.3775C95.2851 28.9575 94.172 28.5367 93.2742 28.1161C92.3758 27.6961 91.4563 27.1376 90.517 26.4409C89.5771 25.7447 88.8723 24.8975 88.4025 23.8985C87.9321 22.9 87.6977 21.7441 87.6977 20.4297C87.6977 18.1178 88.6305 16.1666 90.4963 14.5763C92.362 12.9866 94.6351 12.1657 97.3167 12.1127C101.048 12.0869 104.461 13.3088 107.557 15.7785L103.618 20.6663C101.269 18.8794 99.251 17.9859 97.5654 17.9859C96.7362 17.9859 96.0792 18.183 95.596 18.5771C95.1122 18.9713 94.8705 19.4974 94.8705 20.1538C94.8427 20.7587 95.1256 21.2711 95.7204 21.6911C96.3143 22.1116 97.4545 22.6241 99.141 23.2284C100.025 23.5437 100.592 23.7475 100.841 23.8393C101.09 23.9318 101.594 24.1289 102.354 24.4306C103.114 24.7329 103.611 24.9566 103.847 25.1007C104.081 25.2453 104.482 25.4818 105.049 25.8102C105.615 26.1392 105.996 26.4212 106.189 26.6577C106.382 26.8942 106.659 27.2162 107.019 27.6234C107.377 28.0312 107.62 28.4315 107.744 28.8256C107.869 29.2198 107.986 29.6798 108.097 30.2052C108.207 30.7313 108.262 31.2959 108.262 31.9002C108.262 33.1615 108.041 34.3113 107.599 35.3492C107.157 36.3877 106.576 37.2412 105.858 37.9113C105.139 38.5814 104.303 39.1469 103.349 39.6063C102.396 40.0665 101.435 40.3946 100.468 40.5917C99.4998 40.7888 98.519 40.8873 97.524 40.8873H97.5237Z"
                fill="currentColor"
              />
              <path
                d="M120.492 40.4928V12.5068H139.689V18.38H127.292V23.7408H137.077V29.5351H127.292V34.6199H140.559V40.4931H120.492L120.492 40.4928Z"
                fill="currentColor"
              />
            </svg>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 text-[13px] xl:text-[15px]">
            <p className="m-0">&copy; {new Date().getFullYear()} Leonaara</p>
            <Link href="/privacy-policy" className="hover:text-brand-red transition-colors">Privacy policy</Link>
            <a href="https://marksandmethods.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
              Credits <span className="text-brand-red">Marks & Methods</span>
            </a>
          </div>
        </div>
        </div>
      </footer>
    </>
  );
}
