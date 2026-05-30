"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  NotebookText,
  X,
  type LucideIcon
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface BlogApp {
  id: string;
  title: string;
  date: string;
  href: string;
  summary: string;
  imageClass: string;
  positionClass: string;
  delay: number;
}

type InfoTab = "experience" | "about";

interface DockLinkItem {
  type: "link";
  label: string;
  href: string;
  toneClass: string;
  iconType: "lucide" | "image";
  icon?: LucideIcon;
  iconSrc?: string;
  iconAlt?: string;
}

interface DockAboutItem {
  type: "about";
  label: string;
}

interface DockNotesItem {
  type: "notes";
  label: string;
}

interface DockBlogsItem {
  type: "blogs";
  label: string;
}

type DockItem = DockAboutItem | DockNotesItem | DockBlogsItem | DockLinkItem;

const linkedInHeadline = "Builder, Writer, AI Enthusiast, Aspiring Entrepreneur.";
const blogPostBase = "https://harshitsinghofcl.wixsite.com/chronicles-by-h/post";

const desktopPositions = [
  "pos-a",
  "pos-b",
  "pos-c",
  "pos-d",
  "pos-e",
  "pos-f",
  "pos-g",
  "pos-h",
  "pos-i",
  "pos-j",
  "pos-k",
  "pos-l",
  "pos-m",
  "pos-n",
  "pos-o",
  "pos-p",
  "pos-q",
  "pos-r",
  "pos-s",
  "pos-t"
] as const;

const tileClasses = ["tile-a", "tile-b", "tile-c", "tile-d", "tile-e", "tile-f", "tile-g", "tile-h"] as const;

const rawBlogs = [
  { id: "a-new-beginning", title: "A new Beginning...", date: "Jun 1, 2025", slug: "a-new-beginning" },
  { id: "i-guess-date", title: "I guess, its the date!", date: "May 27, 2025", slug: "i-guess-its-the-date" },
  { id: "really-very-late", title: "I am really very late....", date: "Jun 10, 2025", slug: "i-am-really-very-late" },
  { id: "mood-off", title: "Was it really a Mood Off?", date: "Jun 8, 2025", slug: "was-it-really-a-mood-off" },
  { id: "just-do-it", title: "Just do it...", date: "Jun 3, 2025", slug: "just-do-it" },
  { id: "keep-going", title: "Keep It Going Like It Does...", date: "Jun 17, 2025", slug: "keep-it-going-like-it-does" },
  {
    id: "reading-writing",
    title: "Reading & Writing isn't always Studying...!",
    date: "Jun 24, 2025",
    slug: "reading-writing-isn-t-always-studying"
  },
  { id: "does-matter", title: "Does it really matter...?", date: "Jun 22, 2025", slug: "does-it-really-matter" },
  { id: "breaks", title: "Breaks...", date: "Aug 3, 2025", slug: "breaks" },
  { id: "stressful", title: "Its stressful...", date: "Jul 20, 2025", slug: "its-stressful" },
  { id: "be-calm", title: "Be Calm...", date: "Jul 13, 2025", slug: "be-calm" },
  { id: "is-it-done", title: "Is it done?", date: "Jul 6, 2025", slug: "is-it-done" },
  {
    id: "heyy-july",
    title: "Heyy... Welcome to July! Are you ready?",
    date: "Jul 1, 2025",
    slug: "heyy-welcome-to-july-are-you-ready"
  },
  { id: "lets-express", title: "Let's express it...", date: "Aug 10, 2025", slug: "let-s-express-it" },
  { id: "wave", title: "Wave of change...", date: "Apr 24, 2025", slug: "wave-of-change" },
  { id: "waste", title: "Waste of time...", date: "Apr 17, 2025", slug: "waste-of-time" },
  { id: "get-up", title: "Get up buddy!", date: "Apr 10, 2025", slug: "get-up-buddy" },
  { id: "rat-race", title: "The Rat Race...", date: "Apr 3, 2025", slug: "the-rat-race" },
  { id: "rain", title: "Rain rain go away...", date: "Mar 20, 2025", slug: "rain-rain-go-away" },
  { id: "after-break", title: "After a break...", date: "Mar 13, 2025", slug: "after-a-break" }
] as const;

const blogApps: BlogApp[] = rawBlogs.map((blog, index) => ({
  id: blog.id,
  title: blog.title,
  date: blog.date,
  href: `${blogPostBase}/${blog.slug}`,
  summary: `Chronicles by Harshit post: ${blog.title}`,
  imageClass: tileClasses[index % tileClasses.length],
  positionClass: desktopPositions[index],
  delay: 0.06 + index * 0.025
}));

const bookLinks = [
  {
    label: "NotionPress",
    href: "https://notionpress.com/in/read/phases-unexpected"
  },
  {
    label: "Amazon",
    href: "https://amzn.to/4u6wdH8"
  },
  {
    label: "Flipkart",
    href: "https://www.flipkart.com/phases-unexpected/p/itmd43685e0e6b05?pid=9798904315887&lid=LSTBOK9798904315887LFNWAP&marketplace=FLIPKART&q=phases+unexpected&store=bks&srno=s_1_2&otracker=search&fm=search-autosuggest&iid=13f87641-5a27-4e35-8a6a-9fe87349ffb5.9798904315887.SEARCH&ppt=sp&ppn=sp&ssid=q2f0j8of3k0000001780058149733&qH=ccb1b48cd108a53c&ov_redirect=true&ov_redirect=true"
  }
];

const dockItems: DockItem[] = [
  {
    type: "about",
    label: "About Me"
  },
  {
    type: "notes",
    label: "Notes"
  },
  {
    type: "link",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/imharshitsinghin/",
    iconType: "lucide",
    icon: Linkedin,
    toneClass: "tone-linkedin"
  },
  {
    type: "link",
    label: "X",
    href: "https://x.com/HarshitSingh_in",
    iconType: "lucide",
    icon: X,
    toneClass: "tone-x"
  },
  {
    type: "link",
    label: "GitHub",
    href: "https://github.com/devwithharshit",
    iconType: "lucide",
    icon: Github,
    toneClass: "tone-github"
  },
  {
    type: "link",
    label: "Instagram",
    href: "https://instagram.com/imsinghharshit",
    iconType: "lucide",
    icon: Instagram,
    toneClass: "tone-instagram"
  },
  {
    type: "link",
    label: "ReProfiled",
    href: "https://reprofiled.vercel.app/",
    iconType: "image",
    iconSrc: "/icons/reprofiled.svg",
    iconAlt: "ReProfiled",
    toneClass: "tone-favicon"
  },
  {
    type: "link",
    label: "ReachOutBotAI",
    href: "https://reachoutbotai.vercel.app/",
    iconType: "image",
    iconSrc: "/icons/reachoutbotai.ico",
    iconAlt: "ReachOutBotAI",
    toneClass: "tone-favicon"
  },
  {
    type: "blogs",
    label: "Blogs",
  },
  {
    type: "link",
    label: "Email",
    href: "mailto:hi@imharshitsingh.in",
    iconType: "lucide",
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
  const [isBlogWindowOpen, setIsBlogWindowOpen] = useState(false);
  const [activeBlogId, setActiveBlogId] = useState(blogApps[0]?.id ?? "");
  const [activeTab, setActiveTab] = useState<InfoTab>("experience");
  const [isDesktop, setIsDesktop] = useState(false);
  const dragConstraintsRef = useRef<HTMLElement | null>(null);
  const draggedBlogIdRef = useRef<string | null>(null);
  const activeBlog = blogApps.find((blog) => blog.id === activeBlogId) ?? blogApps[0];

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
          <motion.button
            key={blog.id}
            type="button"
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
            onClick={() => {
              if (draggedBlogIdRef.current === blog.id) return;
              setActiveBlogId(blog.id);
              setIsBlogWindowOpen(true);
            }}
          >
            <div className={`blog-app-tile ${blog.imageClass}`}>
              <span>✍️</span>
            </div>
            <span className="blog-app-title">{blog.title}</span>
            <span className="blog-app-date">{blog.date}</span>
          </motion.button>
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

            if (item.type === "notes") {
              return (
                <button
                  key={item.label}
                  type="button"
                  className="dock-icon-button notes-dock-button"
                  onClick={() => {
                    setActiveTab("about");
                    setIsInfoOpen(true);
                  }}
                  aria-label={item.label}
                  title={item.label}
                >
                  <span className="notes-app-icon" aria-hidden="true">
                    <span className="notes-app-top" />
                    <span className="notes-app-body">
                      <span />
                      <span />
                      <span />
                    </span>
                  </span>
                </button>
              );
            }

            if (item.type === "blogs") {
              return (
                <button
                  key={item.label}
                  type="button"
                  className="dock-icon-button tone-blogs"
                  onClick={() => {
                    setActiveBlogId(blogApps[0]?.id ?? "");
                    setIsBlogWindowOpen(true);
                  }}
                  aria-label={item.label}
                  title={item.label}
                >
                  <NotebookText className="h-7 w-7" />
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
                {item.iconType === "image" && item.iconSrc ? (
                  <span className="dock-image-icon-wrap" aria-hidden="true">
                    <Image
                      src={item.iconSrc}
                      alt={item.iconAlt ?? item.label}
                      fill
                      sizes="40px"
                      className="dock-image-icon"
                    />
                  </span>
                ) : Icon ? (
                  <Icon className="h-7 w-7" />
                ) : null}
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

                  {activeTab === "about" ? (
                    <div className="about-book-links">
                      <p>Buy my book: Phases: Unexpected</p>
                      <div>
                        {bookLinks.map((book) => (
                          <a key={book.label} href={book.href} target="_blank" rel="noopener noreferrer">
                            {book.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </section>
              </div>
            </motion.article>
          </motion.section>
        ) : null}

        {isBlogWindowOpen && activeBlog ? (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="notes-overlay"
            onClick={() => setIsBlogWindowOpen(false)}
          >
            <motion.article
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="blog-window"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="notes-window-top">
                <div className="window-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <p>Blogs</p>
                <button
                  type="button"
                  className="notes-close"
                  onClick={() => setIsBlogWindowOpen(false)}
                  aria-label="Close blog window"
                >
                  ×
                </button>
              </header>

              <div className="blog-window-layout">
                <aside className="blog-window-sidebar">
                  {blogApps.map((blog) => (
                    <button
                      key={blog.id}
                      type="button"
                      onClick={() => setActiveBlogId(blog.id)}
                      className={activeBlog.id === blog.id ? "blog-item active" : "blog-item"}
                    >
                      <strong>{blog.title}</strong>
                      <span>{blog.date}</span>
                    </button>
                  ))}
                </aside>

                <section className="blog-window-content">
                  <p className="notes-date">{activeBlog.date}</p>
                  <h2>{activeBlog.title}</h2>
                  <p className="blog-window-summary">{activeBlog.summary}</p>
                  <p className="blog-window-sub">
                    Same-page app style open ho raha hai. Full post read karna ho to niche button use karo.
                  </p>
                  <a href={activeBlog.href} target="_blank" rel="noopener noreferrer" className="blog-window-read">
                    Read Full Post ↗
                  </a>
                </section>
              </div>
            </motion.article>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
