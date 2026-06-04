"use client";

import { ExternalLink } from "lucide-react";
import GlassCard from "./GlassCard";

const apps = [
  {
    name: "ReProfiled",
    url: "https://reprofiled.vercel.app/",
    description: "AI-powered resume & profile optimizer. Craft your best professional story."
  },
  {
    name: "ReachOutBotAI",
    url: "https://reachoutbotai.vercel.app/",
    description: "AI outreach automation. Send smarter, connect faster."
  },
  {
    name: "MeetingPrepAI",
    url: "https://meetingprepai.vercel.app/",
    description: "AI-powered meeting preparation to walk in sharper, clearer, and ready."
  }
];

export default function AIApps() {
  return (
    <GlassCard className="h-full" trafficLights delay={0.3}>
      <div className="space-y-5">
        <div>
          <h2 className="card-title text-2xl text-primaryText">What I&apos;m Building 🚀</h2>
          <p className="mt-2 text-sm text-secondaryText">Active AI products and experiments.</p>
        </div>

        <div className="space-y-3">
          {apps.map((app) => (
            <article
              key={app.name}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e8d5b0]/35"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="font-semibold text-primaryText">{app.name}</h3>
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-secondaryText">
                  <span className="h-2 w-2 rounded-full bg-green-400"></span>
                  Live
                </span>
              </div>
              <p className="text-sm leading-relaxed text-secondaryText">{app.description}</p>
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]"
              >
                Visit <ExternalLink className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
