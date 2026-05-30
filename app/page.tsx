"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  BookOpenText,
  Bot,
  Github,
  Instagram,
  Linkedin,
  Mail,
  NotebookText,
  Rocket,
  X,
  type LucideIcon
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BlogApp {
  id: string;
  title: string;
  date: string;
  href: string;
  imageClass: string;
  positionClass: string;
  delay: number;
}

type InfoTab = "experience" | "about";

interface DockLinkItem {
  type: "link";
  label: string;
  href: string;
  icon: LucideIcon;
  toneClass: string;
}

interface DockAboutItem {
  type: "about";
  label: string;
}

type DockItem = DockAboutItem | DockLinkItem;

const linkedInHeadline = "Builder, Writer, AI Enthusiast, Aspiring Entrepreneur.";
const blogUrl = "https://harshitsinghofcl.wixsite.com/chronicles-by-h/blog";

const blogApps: BlogApp[] = [
  {
    id: "wave",
    title: "Wave of change...",
    date: "Apr 24, 2026",
    href: blogUrl,
    imageClass: "tile-a",
    positionClass: "pos-a",
    delay: 0.08
  },
  {
    id: "waste",
    title: "Waste of time...",
    date: "Apr 17, 2026",
    href: blogUrl,
    imageClass: "tile-b",
    positionClass: "pos-b",
    delay: 0.14
  },
  {
    id: "get-up",
    title: "Get up buddy!",
    date: "Apr 10, 2026",
    href: blogUrl,
    imageClass: "tile-c",
    positionClass: "pos-c",
    delay: 0.2
  },
  {
    id: "rat-race",
    title: "The Rat Race...",
    date: "Apr 3, 2026",
    href: blogUrl,
    imageClass: "tile-d",
    positionClass: "pos-d",
    delay: 0.26
  },
  {
    id: "rain",
    title: "Rain rain go away...",
    date: "Mar 20, 2026",
    href: blogUrl,
    imageClass: "tile-e",
    positionClass: "pos-e",
    delay: 0.32
  },
  {
    id: "break",
    title: "After a break...",
    date: "Mar 13, 2026",
    href: blogUrl,
    imageClass: "tile-f",
    positionClass: "pos-f",
    delay: 0.38
  }
];

const dockItems: DockItem[] = [
  {
    type: "about",
    label: "About Me"
  },
  {
    type: "link",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/imharshitsinghin/",
    icon: Linkedin,
    toneClass: "tone-linkedin"
  },
  {
    type: "link",
    label: "X",
    href: "https://x.com/HarshitSingh_in",
    icon: X,
    toneClass: "tone-x"
  },
  {
    type: "link",
    label: "GitHub",
    href: "https://github.com/devwithharshit",
    icon: Github,
    toneClass: "tone-github"
  },
  {
    type: "link",
    label: "Instagram",
    href: "https://instagram.com/imsinghharshit",
    icon: Instagram,
    toneClass: "tone-instagram"
  },
  {
    type: "link",
    label: "ReProfiled",
    href: "https://reprofiled.vercel.app/",
    icon: Rocket,
    toneClass: "tone-reprofiled"
  },
  {
    type: "link",
    label: "ReachOutBotAI",
    href: "https://reachoutbotai.vercel.app/",
    icon: Bot,
    toneClass: "tone-reachout"
  },
  {
    type: "link",
    label: "Book (NotionPress)",
    href: "https://notionpress.com/in/read/phases-unexpected",
    icon: BookOpenText,
    toneClass: "tone-book"
  },
  {
    type: "link",
    label: "Book (Amazon)",
    href: "https://amzn.to/4u6wdH8",
    icon: BookOpenText,
    toneClass: "tone-book"
  },
  {
    type: "link",
    label: "Book (Flipkart)",
    href: "https://www.flipkart.com/phases-unexpected/p/itmd43685e0e6b05?pid=9798904315887&lid=LSTBOK9798904315887LFNWAP&marketplace=FLIPKART&q=phases+unexpected&store=bks&srno=s_1_2&otracker=search&fm=search-autosuggest&iid=13f87641-5a27-4e35-8a6a-9fe87349ffb5.9798904315887.SEARCH&ppt=sp&ppn=sp&ssid=q2f0j8of3k0000001780058149733&qH=ccb1b48cd108a53c&ov_redirect=true&ov_redirect=true",
    icon: BookOpenText,
    toneClass: "tone-book"
  },
  {
    type: "link",
    label: "Blogs",
    href: blogUrl,
    icon: NotebookText,
    toneClass: "tone-blogs"
  },
  {
    type: "link",
    label: "Email",
    href: "mailto:hi@imharshitsingh.in",
    icon: Mail,
    toneClass: "tone-mail"
  }
];

const infoData = {
  experience: {
    date: "May 29, 2026",
    title: "Experience",
    lines: [
      "Founder, ReProfiled (2026 - Present)",
      "Building an AI-powered resume and professional profile optimizer.",
      "",
      "Founder, ReachOutBotAI (2026 - Present)",
      "Building AI outreach automation to help people connect and network faster.",
      "",
      "Author, Phases: Unexpected (2026)",
      "Published and distributed on NotionPress, Amazon, and Flipkart.",
      "",
      "Writer, Chronicles by Harshit",
      "Publishing weekly reflections on life, growth, and mindset."
    ]
  },
  about: {
    date: "May 29, 2026",
    title: "About me",
    lines: [
      "Hey! I'm Harshit - a 17-year-old from Uttarakhand, India.",
      "",
      "I'm passionate about AI, building products that matter, and writing honestly about life.",
      "",
      "I build AI apps, write weekly blogs, and explore the intersection of tech and creativity.",
      "",
      "My goal is to craft my own path and build things that help people."
    ]
  }
};

export default function Home() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<InfoTab>("experience");
  const [isDesktop, setIsDesktop] = useState(false);
  const dragConstraintsRef = useRef<HTMLElement | null>(null);
  const draggedBlogIdRef = useRef<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="scene-wrap">
      <div className="quote-spotlight" />
      <div className="quote-center-wrap">
        <motion.p
          className="quote-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          LET&apos;S JUST BE THE SIMPLEST, BEST, & KINDEST
          <br />
          VERSION OF OURSELVES!
        </motion.p>
      </div>

      <section ref={dragConstraintsRef} className="desktop-blog-cloud" aria-label="Blog apps">
        {blogApps.map((blog) => (
          <motion.a
            key={blog.id}
            href={blog.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`desktop-blog-app ${blog.positionClass}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: blog.delay }}
            whileHover={{ y: -5, scale: 1.04 }}
            drag={isDesktop}
            dragConstraints={dragConstraintsRef}
            dragElastic={0.08}
            dragMomentum={false}
            whileDrag={{ scale: 1.08, cursor: "grabbing", zIndex: 120 }}
            onDragStart={() => {
              draggedBlogIdRef.current = blog.id;
            }}
            onDragEnd={() => {
              setTimeout(() => {
                draggedBlogIdRef.current = null;
              }, 0);
            }}
            onClick={(event) => {
              if (draggedBlogIdRef.current === blog.id) {
                event.preventDefault();
              }
            }}
          >
            <div className={`blog-app-tile ${blog.imageClass}`}>
              <span>✍️</span>
            </div>
            <span className="blog-app-title">{blog.title}</span>
            <span className="blog-app-date">{blog.date}</span>
          </motion.a>
        ))}
      </section>

      <div className="dock-wrap">
        <motion.nav
          className="makos-dock-bar"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {dockItems.map((item) => {
            if (item.type === "about") {
              return (
                <button
                  key={item.label}
                  type="button"
                  className="dock-icon-button dock-about-button"
                  onClick={() => {
                    setActiveTab("about");
                    setIsInfoOpen(true);
                  }}
                  aria-label={item.label}
                  title={item.label}
                >
                  <span className="dock-about-imhs" aria-hidden="true">
                    <Image src="/dock-imhs.png" alt="" fill sizes="53px" className="dock-about-imhs-image" />
                  </span>
                  <span className="dock-about-avatar" aria-hidden="true">
                    <Image src="/dock-profile.png" alt="" fill sizes="24px" className="dock-about-avatar-image" />
                  </span>
                </button>
              );
            }

            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`dock-icon-button ${item.toneClass}`}
                aria-label={item.label}
                title={item.label}
              >
                <Icon className="h-6 w-6" />
              </a>
            );
          })}
        </motion.nav>
      </div>

      <AnimatePresence>
        {isInfoOpen ? (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="notes-overlay"
            onClick={() => setIsInfoOpen(false)}
          >
            <motion.article
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="notes-window"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="notes-window-top">
                <div className="window-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p>About me</p>
                <button
                  type="button"
                  className="notes-close"
                  onClick={() => setIsInfoOpen(false)}
                  aria-label="Close window"
                >
                  ×
                </button>
              </header>

              <div className="notes-layout">
                <aside className="notes-sidebar">
                  <button
                    type="button"
                    onClick={() => setActiveTab("about")}
                    className={activeTab === "about" ? "note-tab active" : "note-tab"}
                  >
                    <strong>About me</strong>
                    <span>LinkedIn heading + profile</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("experience")}
                    className={activeTab === "experience" ? "note-tab active" : "note-tab"}
                  >
                    <strong>Experience</strong>
                    <span>Current work and writing</span>
                  </button>
                </aside>

                <section className="notes-content">
                  <p className="notes-date">{infoData[activeTab].date}</p>
                  <h2>{infoData[activeTab].title}</h2>

                  {activeTab === "about" ? (
                    <article className="about-profile-card">
                      <div className="about-profile-head">
                        <div className="about-profile-image-wrap">
                          <Image
                            src="/dock-profile.png"
                            alt="Harshit Singh"
                            fill
                            sizes="96px"
                            className="about-profile-image"
                          />
                        </div>
                        <div className="about-profile-meta">
                          <p>
                            <span>NAME</span>
                            Harshit Singh
                          </p>
                          <p>
                            <span>POSITION</span>
                            {linkedInHeadline}
                          </p>
                          <p>
                            <span>MAIL</span>
                            hi@imharshitsingh.in
                          </p>
                        </div>
                      </div>
                    </article>
                  ) : null}

                  <div className="notes-lines">
                    {infoData[activeTab].lines.map((line, index) => (
                      <p key={`${line}-${index}`}>{line}</p>
                    ))}
                  </div>
                </section>
              </div>
            </motion.article>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
