"use client";
import React from "react";

export default function TextMedias() {
  return (
    <section className="w-full bg-white text-black py-12 md:py-24">
      <div className="container mx-auto px-6 max-w-[1920px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left Column - Sticky Image */}
          <div className="w-full lg:w-5/12">
            <div className="sticky top-0 h-[50vh] w-full overflow-hidden rounded-[4px] lg:h-screen">
              <img
                src="/media/2024/04/Base-Deck-Plus-Crop.jpg"
                alt="Leonaara Deck Plus"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/media/2024/04/Base-Deck-Plus-Crop-576x730.jpg";
                }}
              />
            </div>
          </div>

          {/* Right Column - Scrollable Content */}
          <div className="w-full lg:w-7/12 flex flex-col gap-20 lg:gap-32 lg:pt-10">

            {/* Block 1 */}
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4 lg:col-span-3">
                  <h3 className="text-[12px] md:text-[14px] uppercase text-black">
                    ABOUT
                  </h3>
                </div>
                <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-6 text-[16px] xl:text-[18px] leading-snug text-black">
                  <p>Here at <strong className="font-normal text-brand-red">Leonaara</strong>, we believe in doing a lot with a little. We champion a return to the basics for simpler, better living. We also believe in a better way to build, geared towards today&apos;s growing needs in order to weather tomorrow&apos;s challenges.</p>
                  <p>We are from the North, based in Quebec, Canada with experience in harsh climates. That&apos;s why we are designing a sustainable product ecosystem highlighting natural and local materials that respond best to challenging environments.</p>
                  <p>At its core, Leonaara is an initiative to reconnect us to the wild, to our natural surroundings – to reclaim a sense of wonder of the world around us.</p>
                  <p>Let the wild in.<br/>Find your Leonaara.</p>
                </div>
              </div>

              <div className="w-full h-[40vh] md:h-[50vh] rounded-[4px] overflow-hidden md:ml-auto md:w-8/12 lg:w-9/12">
                <video
                  className="w-full h-full object-cover"
                  muted
                  autoPlay
                  loop
                  playsInline
                  src="/media/2024/04/Find-your-base.mp4"
                />
              </div>
            </div>

            {/* Block 2 */}
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4 lg:col-span-3">
                  <h3 className="text-[12px] md:text-[14px] uppercase text-black">
                    Bio
                  </h3>
                </div>
                <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-6 text-[16px] xl:text-[18px] leading-snug text-black">
                  <p>Hi! I&apos;m Julien, founder of Leonaara. As an architect with experience in the Arctic, the Amazonian jungle and Copenhagen, I&apos;ve had the chance to study some truly amazing ways of living. They almost always come down to two basic ideas: building smarter and living simpler.</p>
                  <p>Shouldn&apos;t we strive for that too? I think so – and that&apos;s why I created <em>Leonaara</em>.</p>
                </div>
              </div>

              <div className="w-full h-[50vh] md:h-[60vh] rounded-[4px] overflow-hidden md:ml-auto md:w-8/12 lg:w-9/12">
                <img
                  src="/media/2024/04/IMG_JULIEN04.png"
                  alt="Julien"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/media/2024/04/IMG_JULIEN04-576x766.png";
                  }}
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
