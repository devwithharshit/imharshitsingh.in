"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Apps", href: "#apps" },
  { label: "Blogs", href: "#blogs" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export default function DesktopBar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card sticky top-4 z-30 mb-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="window-chrome" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-secondaryText">I&apos;m Harshit Singh</p>
        </div>

        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-secondaryText transition-all duration-300 hover:bg-white/10 hover:text-primaryText"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
