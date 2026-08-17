import type { GallerySlide } from "@/components/base-camp/MediaGalleryDuo";
import type { ExperienceItem } from "@/components/base-camp/ExperienceIt";

export interface Project {
  slug: string;
  name: string;
  cardImg: string;
  cardTagline: string;
  heroImg: string;
  heroAlt: string;
  heroEyebrow: string;
  heroBody: string;
  introEyebrow: string;
  introHeading: string;
  introBody: string;
  gallerySlides: GallerySlide[];
  detailsGallery: string[];
  experienceEyebrow: string;
  experienceHeading: string;
  experienceBody: string;
  experienceItems: ExperienceItem[];
  metaDescription: string;
  contactImg?: string;
  contactImgAlt?: string;
}

// Placeholder copy and imagery (reusing the Leonaara Camp photo set) until
// real photography and project details are ready to swap in — every field
// below is meant to be a quick, obvious edit per project.
export const projects: Project[] = [
  {
    slug: "kadamba",
    name: "@Kadamba",
    cardImg: "/media/2026/04/Base-Camp-Lao-033-1800x1197.jpg",
    cardTagline: "Reshaping Slow Living",
    heroImg: "/media/2026/04/Base-Camp-Lao-044-copy-1800x1197.jpg",
    heroAlt: "Kadamba — placeholder hero image",
    heroEyebrow: "Reshaping Slow Living",
    heroBody: "Placeholder hero copy for Kadamba — replace with the real project description, location, and details.",
    introEyebrow: "About Kadamba",
    introHeading: "Where Sukoon Happens Naturally",
    introBody:
      "Inspired by Dolce Far Niente, the art of unhurried living, Kadamba is built on the belief that a home should enrich everyday life. Rooted in nature’s finest luxuries: sunlight, fresh air, open space, and silence, Kadamba invites you to slow down, breathe deeply, and reconnect with what matters most. Spread across 22 lush acres, Kadamba offers an exclusive low-density sanctuary designed for maximum privacy, tranquility, and room to breathe.",
    gallerySlides: [
      { key: "kadamba-1", src: "/media/2026/04/Base-Camp-Lao-033-1800x1197.jpg", alt: "Kadamba — placeholder image" },
      { key: "kadamba-2", src: "/media/2026/04/Base-Camp-Lao-006-1-scaled.jpg", alt: "Kadamba — placeholder image" },
    ],
    detailsGallery: [
      "/media/2026/04/Base-Camp-Lao-007-copy-1800x2708.jpg",
      "/media/2026/04/Base-Camp-Lao-018-copy-1800x2700.jpg",
      "/media/2026/04/Base-Camp-Lao-010-copy.jpg",
      "/media/2026/04/Base-Camp-Lao-030-copy-1800x2700.jpg",
      "/media/2026/04/Base-Camp-Lao-003-copy.jpg",
      "/media/2026/04/Base-Camp-Lao-039-copy-1800x2707.jpg",
    ],
    experienceEyebrow: "Concierge Services",
    experienceHeading: "A Fully Serviced Villa Experience",
    experienceBody: "Kadamba is living proof of what Leonaara stands for. Here are a few ways to check it out.",
    experienceItems: [
      {
        title: "CULINARY CARE",
        body: "A refined culinary experience featuring thoughtfully crafted dishes that bring together the comfort of home and the elegance of fine living.",
      },
      {
        title: "HOUSE KEEPING",
        body: "Dedicated housekeeping services keep your villa effortlessly pristine, ensuring every space is cared for whether you are staying or away.",
      },
      {
        title: "GARDEN CURATION",
        body: "Curate your own harvest while we care for every detail. From orchards to kitchen gardens, your landscape is nurtured, maintained, and always ready to enjoy.",
      },
    ],
    metaDescription: "Placeholder overview of Kadamba, a Leonaara project. Replace with real copy once available.",
    contactImg:"/image-1.png",
  },
  {
    slug: "anantha-meadows",
    name: "Anantha Meadows",
    cardImg: "/media/2026/04/Base-Camp-Lao-039-copy-1800x2707.jpg",
    cardTagline: "A Leonaara project",
    heroImg: "/media/2026/04/Base-Camp-Lao-006-1-scaled.jpg",
    heroAlt: "Anantha Meadows — placeholder hero image",
    heroEyebrow: "A Leonaara project",
    heroBody:
      "Placeholder hero copy for Anantha Meadows — replace with the real project description, location, and details.",
    introEyebrow: "Anantha Meadows",
    introHeading: "Placeholder heading for Anantha Meadows.",
    introBody:
      "Placeholder body copy — swap in the real story of Anantha Meadows: its location, the site, and what makes it a Leonaara project.",
    gallerySlides: [
      { key: "anantha-meadows-1", src: "/media/2026/04/Base-Camp-Lao-044-copy-1800x1197.jpg", alt: "Anantha Meadows — placeholder image" },
      { key: "anantha-meadows-2", src: "/media/2026/04/Base-Camp-Lao-003-copy.jpg", alt: "Anantha Meadows — placeholder image" },
    ],
    detailsGallery: [
      "/media/2026/04/Base-Camp-Lao-039-copy-1800x2707.jpg",
      "/media/2026/04/Base-Camp-Lao-030-copy-1800x2700.jpg",
      "/media/2026/04/Base-Camp-Lao-010-copy.jpg",
      "/media/2026/04/Base-Camp-Lao-018-copy-1800x2700.jpg",
      "/media/2026/04/Base-Camp-Lao-007-copy-1800x2708.jpg",
      "/media/2026/04/Base-Camp-Lao-033-1800x1197.jpg",
    ],
    experienceEyebrow: "Experience it",
    experienceHeading: "Come see for yourself.",
    experienceBody: "Anantha Meadows is living proof of what Leonaara stands for. Here are a few ways to check it out.",
    experienceItems: [
      {
        title: "Book a stay",
        body: "Stay at Anantha Meadows. Cook, sleep, feel the difference. The best way to understand a Leonaara is to live in one.",
      },
      {
        title: "Schedule a visit",
        body: "Walk through with Leonaara's founder. Touch the panels, see the systems, ask anything.",
      },
      {
        title: "Follow along",
        body: "Follow @leonaara for updates on new builds, behind-the-scenes, and the next chapter.",
      },
    ],
    metaDescription:
      "Placeholder overview of Anantha Meadows, a Leonaara project. Replace with real copy once available.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
