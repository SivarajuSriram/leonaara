"use client";

const features = [
  {
    title: "What We Stand For",
    text: "A home is where life grows. We value quality over speed, design over crowding, and build for the long term with complete honesty at every step.",
  },
  {
    title: "The Leonaara Philosophy",
    text: "We design homes around people, placing nature, space, light, and comfort at the heart of every detail. Technology is thoughtfully integrated to enhance everyday living, simplifying life without adding complexity.",
  },
  {
    title: "What makes Leonaara Different",
    text: "Fewer homes, thoughtfully designed with more open space, natural light, fresh air, and effortless flow. Smart, secure features and enduring quality ensure lasting comfort and value over time.",
  },
  {
    title: "Our Approach to Building",
    text: "We begin by understanding the land, using technology to create precise and thoughtful designs. We select durable materials and uphold uncompromising quality through every stage of development.",
  },
];

export default function BuiltForPeaceFeatures() {
  return (
    <section className="w-full bg-white text-black pt-0 pb-[60px] md:pb-[100px] xl:pb-10">
      <div className="container mx-auto max-w-[1920px] px-6">
        <div className="flex flex-col items-center text-center mb-6 md:mb-12 xl:mb-16">
          <h2 className="max-w-3xl text-[28px] font-normal leading-tight tracking-[-0.04em] md:text-[44px] xl:text-[64px] xl:leading-[60px]">
            Our Foundations
          </h2>
          <p className="mt-6 max-w-none text-[14px] leading-[1.42] text-gray-600 md:text-[16px]">
            A strong foundation is the cornerstone of every enduring structure, providing stability, strength, and the confidence to build for the future.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-24">
          <div className="w-full max-w-[280px] overflow-hidden mx-auto lg:mx-0 lg:w-1/2 lg:max-w-none">
            <video
              className="aspect-square w-full object-cover"
              width="1600"
              height="1600"
              muted
              autoPlay
              loop
              playsInline
              src="/media/2024/03/BaseHabitation_Musique-V03_carre.mp4"
            />
          </div>

          <div className="flex w-full flex-col lg:w-1/2">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex flex-col gap-3 py-8 ${index > 0 ? "border-t border-black/10" : ""}`}
              >
                <h3 className="font-serif font-light text-[24px] leading-tight md:text-[28px] xl:text-[32px]">
                  {feature.title}
                </h3>
                <p className="text-[14px] leading-snug text-black xl:text-[16px]">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
