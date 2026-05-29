"use client";

import { ArrowRight } from "lucide-react";
import GlassCard from "./GlassCard";

const posts = [
  { title: "Wave of change...", date: "Apr 24, 2026" },
  { title: "Waste of time...", date: "Apr 17, 2026" },
  { title: "Get up buddy!", date: "Apr 10, 2026" },
  { title: "The Rat Race...", date: "Apr 3, 2026" },
  { title: "Rain rain go away...", date: "Mar 20, 2026" },
  { title: "After a break...", date: "Mar 13, 2026" }
];

const blogUrl = "https://harshitsinghofcl.wixsite.com/chronicles-by-h/blog";

export default function Blogs() {
  return (
    <GlassCard className="h-full" trafficLights delay={0.4}>
      <div className="space-y-5">
        <div>
          <h2 className="card-title text-2xl text-primaryText">Chronicles by Harshit ✍️</h2>
          <p className="mt-1 text-sm text-secondaryText">
            Thoughts, reflections & life as I see it - every week.
          </p>
        </div>

        <div className="max-h-[228px] space-y-2 overflow-y-auto pr-1">
          {posts.map((post) => (
            <a
              key={post.title}
              href={blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-lg border border-transparent bg-white/[0.03] px-3 py-2 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08]"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-primaryText">{post.title}</span>
                <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
              <span className="text-xs text-secondaryText">{post.date}</span>
            </a>
          ))}
        </div>

        <a
          href={blogUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)]"
        >
          Read all <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </GlassCard>
  );
}
