"use client";
import React, { useState } from "react";
import clsx from "clsx";

export default function RedefiningCottageFeatures() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Quick assembly, transparent process",
      text: "Our prefabricated panel assembly allows our homes to be built up to three times faster than a typical construction. With a clear budget and a predictable timeline, you get less unfortunate surprises.",
      image: "/media/2024/08/Quick-Assembly-Transparent-Process_sm.jpg"
    },
    {
      title: "Climate-resilient, natural materials",
      text: "The Leonaara Panel System sets itself apart by using only high-performance, natural and local materials like wood fiber and hemp insulation. The result is a shell of carbon-neutral wall and roof panels.",
      image: "/media/2024/04/20240315_Base_Material_Section_D-scaled.jpg"
    },
    {
      title: "A home that adapts with you over time",
      text: "With our evolutive Leonaara Ecosystem, our homes have the ability to be expanded and upgraded. That means they can keep up with your evolving needs and budget.",
      image: "/media/2024/04/Adapts-with-you-over-time.png"
    }
  ];

  return (
    <section className="w-full bg-white text-black pt-0 pb-[50px] md:pb-[80px] xl:pb-[110px]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-5">

          {/* Text/Accordion Section (Left on Desktop) */}
          <div className="w-full lg:w-1/2 flex flex-col lg:order-1 order-2">
            {features.map((feature, index) => {
              const isActive = activeFeature === index;
              return (
                <div
                  key={index}
                  className={clsx(
                    "flex flex-col gap-4 cursor-pointer py-8",
                    index > 0 && "border-t border-black/10"
                  )}
                  onClick={() => setActiveFeature(index)}
                >
                  {/* Mobile Image (shown only on mobile when active) */}
                  {isActive && (
                    <div className="lg:hidden w-full h-[40vh] rounded-sm overflow-hidden mb-2">
                      <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <h3 className="font-serif text-[20px] md:text-[24px] xl:text-[32px] font-light leading-tight text-black">
                    {feature.title}
                  </h3>

                  {/* Both the paragraph and the "Read more" link occupy the same
                      grid cell so this slot's height never changes between the
                      active/inactive states — only opacity cross-fades. This
                      keeps the accordion column's total height constant, which
                      is what keeps the sticky image/thumbnails on the right
                      from jumping when switching features. */}
                  <div className="grid">
                    <p
                      className={clsx(
                        "col-start-1 row-start-1 text-[14px] xl:text-[16px] leading-snug text-black transition-opacity duration-500",
                        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                      )}
                    >
                      {feature.text}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveFeature(index);
                      }}
                      className={clsx(
                        "group col-start-1 row-start-1 flex items-center gap-2 self-start text-[13px] xl:text-[14px] text-black/50 transition-opacity duration-300",
                        isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                      )}
                    >
                      <span className="inline-block text-brand-red transition-transform duration-500 ease-out group-hover:rotate-90">
                        +
                      </span>
                      <span className="relative block h-[17px] overflow-hidden xl:h-[19px]">
                        <span
                          aria-hidden="true"
                          className="flex translate-y-[-17px] flex-col transition-transform duration-300 ease-out group-hover:translate-y-0 xl:translate-y-[-19px]"
                        >
                          <span className="h-[17px] leading-[17px] xl:h-[19px] xl:leading-[19px]">Read more</span>
                          <span className="h-[17px] leading-[17px] text-brand-red xl:h-[19px] xl:leading-[19px]">
                            Read more
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Image Section (Right on Desktop) */}
          <div className="hidden lg:block w-full lg:w-1/2 lg:order-2 order-1 lg:self-center">
            <div>
              <div className="w-full h-[82vh] rounded-[20px] overflow-hidden relative">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "absolute top-0 left-0 w-full h-full transition-opacity duration-700",
                      activeFeature === index ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Thumbnails */}
              <div className="flex justify-end gap-2 mt-4">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={clsx(
                      "w-16 h-16 rounded-[4px] overflow-hidden border-2 transition-all",
                      activeFeature === index ? "border-brand-red" : "border-transparent opacity-50 hover:opacity-100"
                    )}
                  >
                    <img src={feature.image} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
