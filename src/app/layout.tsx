import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// The live site uses a licensed display serif ("IvyPresto Display") for
// italic accent words and card titles. That font isn't freely redistributable,
// so Playfair Display stands in as the closest freely-licensed match for the
// same high-contrast, elegant serif look.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const siteTitle = "Leonaara - Let the wild in. Find your Leonaara.";
const siteDescription =
  "We produce high-performance, compact homes that let you escape the everyday to a space that is good for you and good for the planet.";

export const metadata: Metadata = {
  metadataBase: new URL("https://leonaara.com"),
  title: {
    default: siteTitle,
    template: "%s | Leonaara",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    url: "https://leonaara.com",
    siteName: "Leonaara",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/leonara-logo-color.webp",
        width: 1600,
        height: 900,
        alt: "Leonaara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/leonara-logo-color.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="flex flex-col font-sans bg-white text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
