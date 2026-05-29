"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ComponentType } from "react";
import {
  Bot,
  BookOpenText,
  ExternalLink,
  FileText,
  Mail,
  Rocket
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

type IconComponent = ComponentType<{ className?: string }>;

interface DockLink {
  label: string;
  href: string;
  icon: IconComponent;
}

interface FloatingItem {
  title: string;
  caption: string;
  href: string;
  image: string;
  icon: IconComponent;
  positionClass: string;
  delay: number;
}

const dockLinks: DockLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/imharshitsinghin",
    icon: FaLinkedinIn
  },
  {
    label: "X",
    href: "https://x.com/HarshitSingh_in",
    icon: FaXTwitter
  },
  {
    label: "GitHub",
    href: "https://github.com/devwithharshit",
    icon: FaGithub
  },
  {
    label: "Instagram",
    href: "https://instagram.com/imsinghharshit",
    icon: FaInstagram
  },
  {
    label: "Email",
    href: "mailto:hi@imharshitsingh.in",
    icon: Mail
  },
  {
    label: "ReProfiled",
    href: "https://reprofiled.vercel.app/",
    icon: Rocket
  },
  {
    label: "ReachOutBotAI",
    href: "https://reachoutbotai.vercel.app/",
    icon: Bot
  }
];

const floatingItems: FloatingItem[] = [
  {
    title: "Chronicles by Harshit",
    caption: "Weekly thoughts and reflections",
    href: "https://harshitsinghofcl.wixsite.com/chronicles-by-h/blog",
    image: "/portrait-magic.jpeg",
    icon: FileText,
    positionClass: "lg:left-[10%] lg:top-[17%]",
    delay: 0.15
  },
  {
    title: "ReProfiled",
    caption: "AI resume and profile optimizer",
    href: "https://reprofiled.vercel.app/",
    image: "/brand-imhs.png",
    icon: Rocket,
    positionClass: "lg:right-[11%] lg:top-[14%]",
    delay: 0.25
  },
  {
    title: "ReachOutBotAI",
    caption: "AI outreach automation engine",
    href: "https://reachoutbotai.vercel.app/",
    image: "/avatar-cutout.png",
    icon: Bot,
    positionClass: "lg:right-[10%] lg:top-[38%]",
    delay: 0.35
  },
  {
    title: "My Book (Soon)",
    caption: "A personal journey in progress",
    href: "mailto:hi@imharshitsingh.in?subject=Book%20updates",
    image: "/avatar-yes.png",
    icon: BookOpenText,
    positionClass: "lg:left-[9%] lg:top-[43%]",
    delay: 0.45
  }
];

function FloatingCard({ item }: { item: FloatingItem }) {
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: item.delay }}
      whileHover={{ y: -7, scale: 1.02 }}
      className={"floating-card " + item.positionClass}
    >
      <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/15 bg-white/10">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[#f1f1f1]">{item.title}</p>
        <p className="text-xs text-[#c9c9c9]">{item.caption}</p>
      </div>
      <Icon className="h-4 w-4 text-[#f0d65f]" />
    </motion.a>
  );
}

export default function Home() {
  return (
    <main className="makos-page">
      <div className="makos-backdrop">
        <Image
          src="/portrait-pp.png"
          alt="Harshit Singh background portrait"
          fill
          priority
          className="object-cover object-center md:object-[center_24%]"
        />
      </div>
      <div className="makos-overlay"></div>

      <motion.aside
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="brand-tag"
      >
        <Image src="/brand-imhs.png" alt="imhs brand mark" width={116} height={116} />
      </motion.aside>

      <motion.section
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, delay: 0.08 }}
        className="identity-core"
      >
        <p className="identity-overline">I&apos;m Harshit Singh</p>
        <h1>Builder. Writer. AI Enthusiast.</h1>
        <p className="identity-sub">
          Live it Simple, Live it Kind, Just don&apos;t Mind!
        </p>
        <p className="identity-body">
          Teen creator from India building useful AI products, documenting ideas, and shaping
          my own path with consistency.
        </p>
      </motion.section>

      <section className="floating-zone">
        {floatingItems.map((item) => (
          <FloatingCard key={item.title} item={item} />
        ))}
      </section>

      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        href="https://harshitsinghofcl.wixsite.com/chronicles-by-h/blog"
        target="_blank"
        rel="noopener noreferrer"
        className="quick-link"
      >
        <span>Read all blogs</span>
        <ExternalLink className="h-4 w-4" />
      </motion.a>

      <motion.nav
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="makos-dock"
      >
        {dockLinks.map((link) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              whileHover={{ y: -7, scale: 1.14 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="dock-item"
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </motion.a>
          );
        })}
      </motion.nav>
    </main>
  );
}
