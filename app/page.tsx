import About from "@/components/About";
import AIApps from "@/components/AIApps";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import Blogs from "@/components/Blogs";
import BookCard from "@/components/BookCard";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import DesktopBar from "@/components/DesktopBar";
import Hero from "@/components/Hero";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <>
      <BackgroundOrbs />
      <CustomCursor />

      <main className="page-wrap">
        <DesktopBar />

        <section className="grid grid-cols-12 gap-4">
          <div id="hero" className="col-span-12 xl:col-span-8">
            <Hero />
          </div>

          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <SocialLinks />
          </div>

          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <BookCard />
          </div>

          <div id="apps" className="col-span-12 xl:col-span-8">
            <AIApps />
          </div>

          <div id="about" className="col-span-12 lg:col-span-7">
            <About />
          </div>

          <div id="contact" className="col-span-12 lg:col-span-5">
            <Contact />
          </div>

          <div id="blogs" className="col-span-12">
            <Blogs />
          </div>
        </section>

        <footer className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-secondaryText sm:flex sm:items-center sm:justify-between">
          <span>imharshitsingh.in</span>
          <span>Designed as a personal desktop experience</span>
        </footer>
      </main>
    </>
  );
}
