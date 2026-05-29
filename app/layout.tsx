import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading"
});

export const metadata: Metadata = {
  title: "I'm Harshit Singh - Builder, Writer, AI Enthusiast",
  description:
    "Personal site of Harshit Singh - teen AI builder, blogger, and aspiring entrepreneur from India.",
  openGraph: {
    title: "I'm Harshit Singh",
    description: "Building AI products. Writing about life. Crafting my own path.",
    url: "https://imharshitsingh.in",
    siteName: "Harshit Singh"
  },
  twitter: {
    card: "summary_large_image",
    creator: "@HarshitSingh_in"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${instrumentSerif.variable}`}>{children}</body>
    </html>
  );
}
