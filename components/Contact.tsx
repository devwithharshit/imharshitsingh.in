"use client";

import { Mail } from "lucide-react";
import GlassCard from "./GlassCard";

export default function Contact() {
  return (
    <GlassCard className="h-full" trafficLights delay={0.6}>
      <div className="space-y-4">
        <h2 className="card-title text-2xl text-primaryText">Say Hello 👋</h2>
        <p className="text-sm leading-relaxed text-secondaryText">
          Always open to interesting conversations, collaborations, or just a hello.
        </p>
        <a
          href="mailto:hi@imharshitsingh.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#e8d5b0]/40 bg-[#e8d5b0]/10 px-4 py-2 text-sm font-medium text-[var(--accent)] transition-all duration-300 hover:shadow-glow"
        >
          <Mail className="h-4 w-4" />
          hi@imharshitsingh.in
        </a>
      </div>
    </GlassCard>
  );
}
