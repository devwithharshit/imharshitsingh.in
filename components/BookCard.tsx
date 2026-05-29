"use client";

import GlassCard from "./GlassCard";

export default function BookCard() {
  return (
    <GlassCard className="h-full" trafficLights delay={0.7}>
      <div className="space-y-4">
        <h2 className="card-title text-xl text-primaryText">My Book 📖</h2>
        <p className="text-sm leading-relaxed text-secondaryText">
          Working on my first book. Stay tuned - it&apos;s going to be a journey worth reading.
        </p>
        <span className="inline-flex animate-pulseSoft rounded-full border border-[#e8d5b0]/35 bg-[#e8d5b0]/12 px-3 py-1 text-xs font-medium text-[var(--accent)]">
          Coming Soon
        </span>
      </div>
    </GlassCard>
  );
}
