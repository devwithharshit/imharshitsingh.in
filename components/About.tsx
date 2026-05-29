"use client";

import GlassCard from "./GlassCard";

const tags = [
  "🤖 AI Builder",
  "✍️ Writer",
  "📚 Student",
  "🇮🇳 India",
  "🚀 Entrepreneur-in-the-making"
];

export default function About() {
  return (
    <GlassCard className="h-full" trafficLights delay={0.5}>
      <div className="space-y-4">
        <h2 className="card-title text-2xl text-primaryText">A bit about me</h2>
        <p className="text-sm leading-relaxed text-secondaryText sm:text-base">
          Hey! I&apos;m Harshit - a 17-year-old from Uttarakhand, India. I&apos;m passionate about AI, building products that matter, and writing honestly about life. I build AI apps, write weekly blogs, and am constantly exploring the intersection of tech and creativity. My goal? To craft my own path and build things that help people.
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-secondaryText"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
