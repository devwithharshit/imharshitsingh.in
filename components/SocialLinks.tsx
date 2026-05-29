"use client";

import GlassCard from "./GlassCard";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/imharshitsinghin/",
    icon: FaLinkedinIn
  },
  {
    label: "X",
    href: "https://x.com/HarshitSingh_in",
    icon: FaXTwitter
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Im_Harshit_Singh",
    icon: FaYoutube
  },
  {
    label: "GitHub",
    href: "https://github.com/devwithharshit",
    icon: FaGithub
  },
  {
    label: "Email",
    href: "mailto:hi@imharshitsingh.in",
    icon: Mail
  }
];

export default function SocialLinks() {
  return (
    <GlassCard className="h-full" trafficLights delay={0.2}>
      <div className="space-y-4">
        <h2 className="card-title text-2xl text-primaryText">Socials</h2>
        <p className="text-sm text-secondaryText">Find me across platforms.</p>
        <div className="flex flex-wrap gap-3">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[var(--accent)] transition-all duration-300 hover:scale-110 hover:border-[#e8d5b0]/50 hover:shadow-glow"
              >
                <Icon className="text-base" />
              </a>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}
