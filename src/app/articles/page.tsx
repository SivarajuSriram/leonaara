import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import { articles } from "@/lib/articles";

export default function ArticlesPage() {
  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-red selection:text-white">
      <Header />
      <main className="relative z-10 bg-white">
        <Hero title="Articles" eyebrow="The Baseletter" />

        <section className="relative w-full bg-white py-10 md:py-16">
          <div className="mx-auto w-full max-w-[1920px] px-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex flex-col gap-4">
                  <div className="relative aspect-square w-full overflow-hidden rounded-[4px] bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.img}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="m-0 text-[12px] uppercase text-gray-500">
                      {a.date} <span className="mx-1">·</span> The Baseletter
                    </p>
                    <h2 className="m-0 text-[18px] font-normal leading-[1.25] tracking-[-0.02em] xl:text-[20px]">
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-left-bottom bg-[length:0%_1px] transition-[background-size,color] duration-500 ease-[cubic-bezier(0.645,0.045,0.355,1)] group-hover:bg-[length:100%_1px] group-hover:text-brand-red">
                        {a.title}
                      </span>
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
