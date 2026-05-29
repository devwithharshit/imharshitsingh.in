"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Hero() {
  return (
    <GlassCard className="h-full" trafficLights delay={0.1}>
      <motion.div
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.12
            }
          }
        }}
        initial="hidden"
        animate="show"
        className="flex h-full flex-col gap-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <motion.p variants={item} className="text-xs uppercase tracking-[0.18em] text-secondaryText">
              Identity Card
            </motion.p>
            <motion.h1 variants={item} className="card-title text-4xl font-semibold leading-tight text-primaryText sm:text-5xl">
              I&apos;m Harshit Singh
            </motion.h1>
            <motion.p variants={item} className="text-base font-medium text-[#e7dcc7]">
              Builder. Writer. AI Enthusiast. Aspiring Entrepreneur.
            </motion.p>
            <motion.p variants={item} className="text-sm italic text-secondaryText">
              Live it Simple, Live it Kind, Just don&apos;t Mind!
            </motion.p>
          </div>

          <motion.div variants={item} className="relative h-[120px] w-[120px] shrink-0">
            <div className="absolute inset-0 rounded-full bg-[var(--accent-glow)] blur-xl"></div>
            <Image
              src="/avatar.jpg"
              alt="Harshit Singh avatar"
              width={120}
              height={120}
              className="relative rounded-full border border-[#e8d5b0]/40 object-cover"
              priority
            />
          </motion.div>
        </div>

        <motion.p variants={item} className="max-w-2xl text-sm leading-relaxed text-secondaryText sm:text-base">
          A teen from India building AI products, writing about life, and crafting my own path. I blend curiosity with creativity - one project, one blog at a time.
        </motion.p>
      </motion.div>
    </GlassCard>
  );
}
