import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";

const pageDescription = "Explore the projects being built under the Leonaara ecosystem.";

export const metadata: Metadata = {
  title: "Projects",
  description: pageDescription,
  openGraph: {
    title: "Projects | Leonaara",
    description: pageDescription,
    url: "https://leonaara.com/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Leonaara",
    description: pageDescription,
  },
};

export default function ProjectsPage() {
  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-red selection:text-white">
      <Header />
      <main className="relative z-10 bg-white">
        <Hero title="Projects" eyebrow="The Leonaara ecosystem" />

        <section className="relative w-full bg-white py-16 md:py-20 xl:py-24">
          <div className="mx-auto w-full max-w-[1920px] px-6">
            <p className="m-0 max-w-2xl text-[16px] leading-[1.5] text-gray-600 md:text-[18px]">
              Every Leonaara project shares the same foundation: the same design, the same materials, and the same
              builders. Here&apos;s what we&apos;re building.
            </p>

            <Reveal
              className="mt-12 grid grid-cols-1 gap-x-6 gap-y-16 md:mt-16 md:grid-cols-2"
              stagger={0.12}
              y={24}
            >
              {projects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="group flex flex-col gap-5">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.cardImg}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="m-0 text-[12px] uppercase tracking-wide text-gray-500">{project.cardTagline}</p>
                    <h2 className="m-0 text-[24px] font-normal leading-[1.15] tracking-[-0.02em] md:text-[28px]">
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-left-bottom bg-[length:0%_1px] transition-[background-size,color] duration-500 ease-[cubic-bezier(0.645,0.045,0.355,1)] md:group-hover:bg-[length:100%_1px] md:group-hover:text-brand-red">
                        {project.name}
                      </span>
                    </h2>
                  </div>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
