"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  trafficLights?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  contentClassName = "",
  trafficLights = false,
  delay = 0
}: GlassCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.22)" }}
      className={"glass-card overflow-hidden " + className}
    >
      {trafficLights ? (
        <div className="border-b border-white/10 px-5 py-3">
          <div className="window-chrome" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : null}
      <div className={"p-5 md:p-6 " + contentClassName}>{children}</div>
    </motion.section>
  );
}
