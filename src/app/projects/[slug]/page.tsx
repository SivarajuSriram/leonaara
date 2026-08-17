import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ImageHero from "@/components/ImageHero";
import FirstBuildIntro from "@/components/base-camp/FirstBuildIntro";
import MediaGalleryDuo from "@/components/base-camp/MediaGalleryDuo";
import DetailsGallery from "@/components/base-camp/DetailsGallery";
import ExperienceIt from "@/components/base-camp/ExperienceIt";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.metaDescription,
    openGraph: {
      title: `${project.name} | Leonaara`,
      description: project.metaDescription,
      url: `https://leonaara.com/projects/${project.slug}`,
      images: [project.heroImg],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Leonaara`,
      description: project.metaDescription,
      images: [project.heroImg],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="bg-white min-h-screen text-black font-sans selection:bg-brand-red selection:text-white">
      <Header light />
      <main className="relative z-10 bg-white">
        <ImageHero img={project.heroImg} alt={project.heroAlt} eyebrow={project.heroEyebrow} title={project.name} />
        <FirstBuildIntro eyebrow={project.introEyebrow} heading={project.introHeading} body={project.introBody} />
        <MediaGalleryDuo slides={project.gallerySlides} />
        <DetailsGallery gallery={project.detailsGallery} />
        <ExperienceIt
          eyebrow={project.experienceEyebrow}
          heading={project.experienceHeading}
          items={project.experienceItems}
        />
        <ContactForm image={project.contactImg} imageAlt={project.contactImgAlt} />
      </main>
      <Footer />
    </div>
  );
}
