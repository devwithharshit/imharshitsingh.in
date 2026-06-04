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

import { blogContentById } from "./blogPostsData";

interface BlogApp {
  id: string;
  title: string;
  date: string;
  href: string;
  imageClass: string;
  positionClass: string;
  delay: number;
}

type NotesTab = "experience" | "about" | "skills" | "certifications";

interface NoteSection {
  heading: string;
  meta?: string;
  points: string[];
}

interface CertificationItem {
  title: string;
  issuer: string;
  issued: string;
  description: string;
}

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

const profileHeadline =
  "AI Builder 🤖 | Published Author ✍🏻 | Blending AI, Writing & Storytelling | Building Studio2Beyond | 18-Year-Old Indie Creator | Crafting My Path | Sharing My Journey 🚀";

const profileSummary = [
  "I am Harshit Singh - teen builder from India, building in public across AI, writing, and creator projects.",
  "I write, ship, and iterate continuously through Chronicles by Harshit, Studio2Beyond, and my AI apps.",
  "Let's connect if you care about AI, storytelling, or building meaningful products from scratch."
];

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
  imageClass: tileClasses[index % tileClasses.length],
  positionClass: desktopPositions[index],
  delay: 0.06 + index * 0.025
}));

const desktopIconCutoff = new Date("Jul 1, 2025").getTime();

const desktopBlogApps = blogApps.filter((blog) => {
  const blogTime = new Date(blog.date).getTime();
  return Number.isFinite(blogTime) && blogTime >= desktopIconCutoff;
});

const experienceSections: NoteSection[] = [
  {
    heading: "Notion Press - Book Author",
    meta: "Apr 2026 - Present (2 months) | India",
    points: [
      "Phases Unexpected is a heartfelt reflection on the different stages of growing up- childhood memories, teenage confusion, friendships, and the silent questions that shape who we become.",
      "Written from the perspective of someone still living these moments, the book captures raw emotions and real experiences that many go through but rarely express.",
      "The book embraces uncertainty, overthinking, and the constant search for meaning while inviting readers to find pieces of their own story within its pages."
    ]
  },
  {
    heading: "Studio2Beyond - Founder",
    meta: "Mar 2026 - Present (3 months) | India",
    points: [
      "Building a multi-channel content, AI, Creativity, & real exploration venture combining multiple ventures.",
      "Leading strategic direction and content planning across blog, YouTube, and emerging platforms.",
      "Developing projects and documenting learning journey in real-time for audience growth."
    ]
  },
  {
    heading: "Chronicles by Harshit - Editor in Chief",
    meta: "Jun 2025 - Present (1 year) | Haldwani",
    points: [
      "Launched \"The Chronicles\" quarterly magazine with strong student/professional participation.",
      "Hired and onboarded 7+ interns for editorial assistance; established editorial guidelines and quality benchmarks.",
      "Delivered the first magazine editions with 95%+ positive reader feedback."
    ]
  },
  {
    heading: "Chronicles by Harshit - Founder",
    meta: "May 2025 - Present | India",
    points: [
      "Built and grew personal blog by publishing weekly reflections on life, growth, and learning.",
      "Architected editorial workflow, content calendar, and SEO strategy to drive organic traffic and audience retention.",
      "Driving ~40% month-over-month growth in blog subscribers through authentic storytelling and consistent publication."
    ]
  },
  {
    heading: "Chronicles by Harshit - Blogger",
    meta: "May 2025 - Present (1 year 1 month) | India",
    points: [
      "Launched and grew personal blog publishing by writing thoughtful pieces weekly on life and self-reflection.",
      "Architected editorial workflow, content calendar, and SEO strategy to drive organic traffic and audience retention.",
      "Driving ~40% month-over-month growth in blog subscribers through authentic storytelling and consistent publication."
    ]
  },
  {
    heading: "Content Creator - YouTube",
    meta: "Jan 2025 - Present (1 year 5 months) | India",
    points: [
      "Built YouTube channel from 0 to a few many subscribers in a few months through different content on AI learning, writing, and entrepreneurial mindset.",
      "Created 70+ videos blending technical AI explanations with personal reflection and storytelling; average watch-time increased 25% over 6 months.",
      "Establishing thought leadership as a teen voice in AI space with authentic, educational content."
    ]
  },
  {
    heading: "Inspiration Public School - Cultural Club Incharge",
    meta: "Aug 2025 - Feb 2026 (7 months) | Haldwani",
    points: [
      "Led 20+ student members in planning and executing 10+ cultural events with 300+ school participants; increased club engagement by 60%.",
      "Headed and coordinated with school leadership and creative teams to raise visibility of cultural activities across the institution.",
      "Managed budget, schedules, and cross-functional logistics; recognized in school cabinet for impact."
    ]
  },
  {
    heading: "Inspiration Public School - Student Editor",
    meta: "Mar 2025 - Aug 2025 (6 months) | Haldwani",
    points: [
      "Collaborated with 3 co-editors to redesign and edit the school's REFLECTION magazine; improved interest by 35% through refreshed layout and storytelling focus.",
      "Managed editorial calendar, reviewed submissions, and provided feedback to 40+ student contributors.",
      "Established editorial voice and standards that became template for future editions."
    ]
  },
  {
    heading: "Inspiration Public School - Cultural Club Member",
    meta: "Aug 2024 - Mar 2025 (8 months) | Haldwani, Uttarakhand, India",
    points: [
      "Assigned duties as a Culture Club member and worked closely with the Digital Creative Team.",
      "Managed and actively participated in multiple cultural events and execution tasks."
    ]
  }
];

const aboutParagraphs = [
  "I'm Harshit Singh- an 18-year-old AI Enthusiast, Published Author, and Indie AI Content Creator on a mission to make complex AI ideas accessible through storytelling. I believe the future belongs to creators who can bridge technology and human connection, and that's exactly what I'm building.",
  "I've published \"Phases Unexpected\" with Notion Press, launched Chronicles by Harshit (blogs & magazine), and built a YouTube channel where I share AI learnings, writing insights, and entrepreneurial explorations.",
  "My superpowers: I write to reflect, I code to explore, and I create to connect. Whether I'm diving into AI concepts, crafting thoughtful blog posts, or editing Chronicles Unfurled magazine, I approach every project with authenticity and curiosity.",
  "I'm not just exploring- I'm building in public. Right now, that means growing Studio2Beyond, shipping consistent content, and turning my AI journey into practical insights others can learn from."
];

const skillsList = [
  "Vibe Coding",
  "Anthropic Claude",
  "Critical Thinking",
  "Editorial Project Management",
  "Decision-Making",
  "Nonprofit Volunteering",
  "Event Management",
  "Proofreading",
  "Organization Skills",
  "Public Speaking",
  "Artificial Intelligence (AI)",
  "Project Management",
  "Club Management",
  "Writing",
  "Content Creation",
  "Editorial",
  "Blogging",
  "Team Leadership",
  "Matplotlib",
  "Pandas (Software)",
  "NumPy",
  "Python (Programming Language)",
  "MySQL",
  "Entrepreneurship",
  "Canva",
  "Presentation Skills",
  "Presentation Development",
  "Microsoft Office"
];

const certificationItems: CertificationItem[] = [
  {
    title: "Notion Press - Certificate of Publishing (Phases Unexpected)",
    issuer: "Notion Press",
    issued: "Issued Apr 20, 2026",
    description:
      "Official publishing recognition for successfully publishing Phases Unexpected as a published author."
  },
  {
    title: "IBM SkillsBuild - What is Cybersecurity?",
    issuer: "IBM SkillsBuild",
    issued: "Issued Mar 2026",
    description:
      "Course completion certificate in cybersecurity fundamentals (Credential: ILB-JYWPQZZDDEVJKGJQ)."
  },
  {
    title: "DISMUN 4.0 2024 | Participation - UNGA (Canada)",
    issuer: "Dikshant International School",
    issued: "Issued Aug 2024",
    description:
      "Recognized participation in DISMUN Chapter 4 as UNGA committee delegate with formal certification."
  },
  {
    title: "First World Community Delhi Chapter Launch",
    issuer: "First World Community",
    issued: "Issued Mar 2025",
    description: "Participation and volunteer certificate for Delhi chapter launch event."
  },
  {
    title: "Late Shri NC Balutia Entrepreneurship Contest - Third Position",
    issuer: "TWIN WIN",
    issued: "Issued Jan 2023",
    description: "Awarded third position in school-level entrepreneurship competition."
  },
  {
    title: "Late Shri NC Balutia Entrepreneurship Contest - Second Position",
    issuer: "TWIN WIN",
    issued: "Issued Jan 2025",
    description: "Awarded second position with improved entrepreneurial pitch and execution."
  },
  {
    title: "IBM SkillsBuild - Introduction to Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    issued: "Issued Aug 2024",
    description: "AI fundamentals completion certificate (Course code: MDLPT-222)."
  }
];

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

const bookCoverSrc = "/phases-unexpected-cover.png";

const dockItems: DockItem[] = [
  {
    type: "about",
    label: "Profile"
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
    type: "link",
    label: "MeetingPrepAI",
    href: "https://meetingprepai.vercel.app/",
    iconType: "image",
    iconSrc: "/icons/meetingprepai.svg",
    iconAlt: "MeetingPrepAI",
    toneClass: "tone-favicon"
  },
  {
    type: "blogs",
    label: "Blogs"
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

function WindowTrafficLights({ onClose }: { onClose: () => void }) {
  return (
    <div className="window-dots" role="group" aria-label="Window controls">
      <button type="button" className="window-dot dot-red" onClick={onClose} aria-label="Close window" />
      <button type="button" className="window-dot dot-yellow" onClick={onClose} aria-label="Close window" />
      <button type="button" className="window-dot dot-green" onClick={onClose} aria-label="Close window" />
    </div>
  );
}

export default function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isBlogWindowOpen, setIsBlogWindowOpen] = useState(false);
  const [activeBlogId, setActiveBlogId] = useState(blogApps[0]?.id ?? "");
  const [activeTab, setActiveTab] = useState<NotesTab>("experience");
  const [isDesktop, setIsDesktop] = useState(false);
  const dragConstraintsRef = useRef<HTMLElement | null>(null);
  const draggedBlogIdRef = useRef<string | null>(null);

  const activeBlog = blogApps.find((blog) => blog.id === activeBlogId) ?? blogApps[0];
  const activeBlogContent = activeBlog ? blogContentById[activeBlog.id] : undefined;

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openProfile = () => {
    setIsProfileOpen(true);
    setIsInfoOpen(false);
    setIsBlogWindowOpen(false);
  };

  const openNotes = (tab: NotesTab = "experience") => {
    setActiveTab(tab);
    setIsInfoOpen(true);
    setIsProfileOpen(false);
    setIsBlogWindowOpen(false);
  };

  const openBlogs = (blogId?: string) => {
    if (blogId) setActiveBlogId(blogId);
    setIsBlogWindowOpen(true);
    setIsProfileOpen(false);
    setIsInfoOpen(false);
  };

  const blogParagraphs =
    activeBlogContent?.paragraphs?.length && activeBlogContent.paragraphs.length > 0
      ? activeBlogContent.paragraphs
      : ["Blog content loading...", "Please open source link for complete version."];

  return (
    <main className="scene-wrap">
      <div className="quote-spotlight" />

      <div className="focal-center-stack">
        <motion.div
          className="quote-portrait-wrap"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="quote-portrait-ring" />
          <div className="quote-portrait-image-wrap">
            <Image src="/avatar-cutout.png" alt="Harshit Singh" fill sizes="140px" className="quote-portrait-image" />
          </div>
        </motion.div>

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
        {desktopBlogApps.map((blog) => (
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
              openBlogs(blog.id);
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
                  onClick={openProfile}
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
                  onClick={() => openNotes("experience")}
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
                  onClick={() => openBlogs(blogApps[0]?.id ?? "")}
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
        {isProfileOpen ? (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="notes-overlay"
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.article
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="profile-window"
              onClick={(event) => event.stopPropagation()}
            >
              <header className="notes-window-top">
                <WindowTrafficLights onClose={() => setIsProfileOpen(false)} />
                <p>Profile</p>
                <span className="window-spacer" />
              </header>

              <section className="profile-window-body">
                <div className="profile-identity">
                  <div className="profile-image-wrap">
                    <Image src="/dock-profile.png" alt="Harshit Singh" fill sizes="96px" className="profile-image" />
                  </div>
                  <div>
                    <h2>Harshit Singh</h2>
                    <p className="profile-headline-text">{profileHeadline}</p>
                    <p className="profile-contact">✉️ hi@imharshitsingh.in</p>
                    <p className="profile-contact">🌐 imharshitsingh.in</p>
                  </div>
                </div>

                <div className="notes-lines profile-lines">
                  {profileSummary.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                <div className="about-book-links">
                  <p>Phases Unexpected - Buy links</p>
                  <div className="about-book-cover-wrap">
                    <div className="about-book-cover">
                      <Image src={bookCoverSrc} alt="Phases Unexpected book cover" fill sizes="150px" className="book-cover-image" />
                    </div>
                    <div className="about-book-cover-meta">
                      <strong>Phases Unexpected</strong>
                      <span>Stories Never Planned For</span>
                    </div>
                  </div>
                  <div>
                    {bookLinks.map((book) => (
                      <a key={book.label} href={book.href} target="_blank" rel="noopener noreferrer">
                        {book.label}
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            </motion.article>
          </motion.section>
        ) : null}

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
                <WindowTrafficLights onClose={() => setIsInfoOpen(false)} />
                <p>Notes</p>
                <span className="window-spacer" />
              </header>

              <div className="notes-layout">
                <aside className="notes-sidebar">
                  <button
                    type="button"
                    onClick={() => setActiveTab("experience")}
                    className={activeTab === "experience" ? "note-tab active" : "note-tab"}
                  >
                    <strong>Experience</strong>
                    <span>LinkedIn work timeline</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("about")}
                    className={activeTab === "about" ? "note-tab active" : "note-tab"}
                  >
                    <strong>About</strong>
                    <span>Bio and current focus</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("skills")}
                    className={activeTab === "skills" ? "note-tab active" : "note-tab"}
                  >
                    <strong>Skills</strong>
                    <span>Core skills list</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("certifications")}
                    className={activeTab === "certifications" ? "note-tab active" : "note-tab"}
                  >
                    <strong>Certifications</strong>
                    <span>Licenses and badges</span>
                  </button>
                </aside>

                <section className="notes-content">
                  <p className="notes-date">Updated May 30, 2026</p>
                  <h2>
                    {activeTab === "experience" && "Experience"}
                    {activeTab === "about" && "About"}
                    {activeTab === "skills" && "Skills"}
                    {activeTab === "certifications" && "Licenses & Certifications"}
                  </h2>

                  {activeTab === "experience" ? (
                    <div className="notes-stack">
                      {experienceSections.map((section) => (
                        <article key={section.heading} className="notes-block">
                          <h3>{section.heading}</h3>
                          {section.meta ? <p className="notes-meta">{section.meta}</p> : null}
                          <ul>
                            {section.points.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </article>
                      ))}
                    </div>
                  ) : null}

                  {activeTab === "about" ? (
                    <>
                      <div className="about-profile-card">
                        <div className="about-profile-photo">
                          <Image src="/dock-profile.png" alt="Harshit Singh profile" fill sizes="94px" className="about-profile-photo-image" />
                        </div>
                        <div className="about-profile-grid">
                          <div>
                            <span>NAME</span>
                            <strong>Harshit Singh</strong>
                          </div>
                          <div>
                            <span>POSITION</span>
                            <strong>{profileHeadline}</strong>
                          </div>
                          <div>
                            <span>MAIL</span>
                            <strong>hi@imharshitsingh.in</strong>
                          </div>
                        </div>
                      </div>

                      <div className="notes-lines">
                        {aboutParagraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>

                      <div className="about-book-links">
                        <p>Phases Unexpected - Buy links</p>
                        <div className="about-book-cover-wrap">
                          <div className="about-book-cover">
                            <Image src={bookCoverSrc} alt="Phases Unexpected book cover" fill sizes="150px" className="book-cover-image" />
                          </div>
                          <div className="about-book-cover-meta">
                            <strong>Phases Unexpected</strong>
                            <span>Stories Never Planned For</span>
                          </div>
                        </div>
                        <div>
                          {bookLinks.map((book) => (
                            <a key={book.label} href={book.href} target="_blank" rel="noopener noreferrer">
                              {book.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : null}

                  {activeTab === "skills" ? (
                    <div className="skills-grid">
                      {skillsList.map((skill) => (
                        <span key={skill} className="skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {activeTab === "certifications" ? (
                    <div className="notes-stack">
                      {certificationItems.map((certificate) => (
                        <article key={`${certificate.title}-${certificate.issued}`} className="notes-block cert-block">
                          <h3>{certificate.title}</h3>
                          <p className="notes-meta">
                            {certificate.issuer} · {certificate.issued}
                          </p>
                          <p>{certificate.description}</p>
                        </article>
                      ))}
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
                <WindowTrafficLights onClose={() => setIsBlogWindowOpen(false)} />
                <p>Blogs</p>
                <span className="window-spacer" />
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

                  <div className="blog-window-paragraphs">
                    {blogParagraphs.map((paragraph, index) => (
                      <p key={`${activeBlog.id}-${index}`}>{paragraph}</p>
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
