import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { articles, getArticle, type Block } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const description = `${article.title} — an update from Leonaara.`;

  return {
    title: article.title,
    description,
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: `https://leonaara.com/articles/${article.slug}`,
      images: [article.img],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [article.img],
    },
  };
}

// The live site bolds key phrases inline within paragraphs/list items using
// **double asterisks**; render those spans as <strong>.
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, idx) =>
    idx % 2 === 1 ? (
      <strong key={idx} className="font-semibold text-black">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

// Consecutive "image" blocks (no caption in between) render as a side-by-side
// pair on the live site instead of stacking full-width.
type RenderGroup = { block: Block; index: number } | { images: Block[]; index: number };

function groupBody(body: Block[]): RenderGroup[] {
  const groups: RenderGroup[] = [];
  let i = 0;
  while (i < body.length) {
    const block = body[i];
    if (block.type === "image") {
      const run: Block[] = [block];
      let j = i + 1;
      while (j < body.length && body[j].type === "image") {
        run.push(body[j]);
        j++;
      }
      if (run.length > 1) {
        groups.push({ images: run, index: i });
      } else {
        groups.push({ block, index: i });
      }
      i = j;
    } else {
      groups.push({ block, index: i });
      i++;
    }
  }
  return groups;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-red selection:text-white">
      <Header />
      <main className="relative z-10 bg-white">
        <section className="w-full bg-white pb-10 pt-32 md:pb-16 md:pt-40">
          <div className="mx-auto w-full max-w-[1920px] px-6">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1 text-[13px] uppercase text-gray-500 transition-colors md:hover:text-brand-red"
            >
              ← All articles
            </Link>
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <p className="m-0 text-[13px] text-gray-500">{article.date}</p>
                  <span className="rounded-full bg-[#f5f5e7] px-3 py-1 text-[11px] uppercase tracking-[0.06em] text-black">
                    The Leonaara Letter
                  </span>
                </div>
                <h1 className="mt-6 text-[32px] font-normal leading-[1.05] tracking-[-0.04em] md:text-[48px] xl:text-[56px]">
                  {article.title}
                </h1>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px] bg-gray-100 lg:aspect-[16/11]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-white pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-[1920px] px-6">
            <div className="mx-auto flex w-full max-w-[760px] flex-col gap-6 text-[17px] leading-[1.65] text-gray-800 md:text-[19px] xl:text-[20px]">
              {groupBody(article.body).map((g) => {
                if ("images" in g) {
                  return (
                    <div key={g.index} className="mx-auto grid w-[92%] grid-cols-2 gap-3 md:gap-5">
                      {g.images.map((img, j) => (
                        <div key={j} className="relative w-full overflow-hidden rounded-[4px] bg-gray-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.src} alt={img.alt ?? ""} className="w-full h-auto object-cover" />
                        </div>
                      ))}
                    </div>
                  );
                }
                const { block, index: i } = g;
                if (block.type === "h") {
                  return (
                    <h2
                      key={i}
                      className="m-0 mt-6 font-serif text-[28px] font-light leading-[1.1] tracking-[-0.01em] text-black md:mt-8 md:text-[38px] xl:mt-10 xl:text-[48px] xl:leading-[1]"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      className="m-0 text-[17px] italic leading-[1.65] text-black md:text-[19px] xl:text-[20px]"
                    >
                      &ldquo;{block.text}&rdquo;
                      {block.attribution && (
                        <footer className="mt-2 text-[17px] italic leading-[1.65] text-black md:text-[19px] xl:text-[20px]">
                          — {block.attribution}
                        </footer>
                      )}
                    </blockquote>
                  );
                }
                if (block.type === "image") {
                  return (
                    <div key={i} className="relative mx-auto w-[92%] overflow-hidden rounded-[4px] bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={block.src} alt={block.alt ?? ""} className="w-full h-auto object-cover" />
                    </div>
                  );
                }
                if (block.type === "caption") {
                  return (
                    <p
                      key={i}
                      className="mx-auto mt-[-8px] mb-0 w-[92%] text-center text-[11px] uppercase tracking-normal text-black md:text-[12px] xl:text-[14px]"
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="m-0 flex list-none flex-col gap-2 p-0">
                      {block.items?.map((item, j) => <li key={j}>{renderInline(item)}</li>)}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="m-0">
                    {renderInline(block.text ?? "")}
                  </p>
                );
              })}

              {article.moreReading && article.moreReading.length > 0 && (
                <>
                  <p className="m-0">
                    <strong className="font-bold">More reading:</strong>
                  </p>
                  <ol className="m-0 flex list-decimal flex-col gap-2 pl-6">
                    {article.moreReading.map((item, i) => (
                      <li key={i}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-black/30 underline-offset-2 transition-colors md:hover:text-brand-red md:hover:decoration-brand-red"
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          </div>
        </section>

        {more.length > 0 && (
          <section className="w-full bg-white py-16 md:py-20 xl:py-24">
            <div className="mx-auto w-full max-w-[1920px] px-6">
              <h2 className="m-0 text-[20px] font-normal tracking-[-0.02em] text-black md:text-[22px] xl:text-[24px]">
                Keep reading
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6 md:mt-10">
                {more.map((a) => (
                  <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex flex-col gap-4">
                    <div className="relative aspect-square w-full overflow-hidden rounded-[4px] bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.img}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 md:group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <p className="m-0 text-[12px] text-black">{a.date}</p>
                        <span className="rounded-full bg-[#f5f5e7] px-3 py-1 text-[11px] uppercase tracking-[0.06em] text-black">
                          The Leonaara Letter
                        </span>
                      </div>
                      <h3 className="m-0 text-[16px] font-normal leading-[1.25] tracking-[-0.02em]">
                        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat bg-left-bottom bg-[length:0%_1px] transition-[background-size,color] duration-500 ease-[cubic-bezier(0.645,0.045,0.355,1)] md:group-hover:bg-[length:100%_1px] md:group-hover:text-brand-red">
                          {a.title}
                        </span>
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
