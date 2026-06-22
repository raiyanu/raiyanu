"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MagneticWrap from "./MagneticWrap";
import { Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

function MenuButton({ isOpen, toggle }) {
  return (
    <MagneticWrap strength={0.4}>
      <motion.button
        onClick={toggle}
        data-cursor={isOpen ? "Close" : "Menu"}
        className="relative z-50 w-12 h-12 rounded-full flex flex-col items-center justify-center gap-[5px] bg-bg-surface border border-border hover:border-accent/40 transition-colors duration-fast overflow-hidden shadow-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <motion.span
          className="block w-5 h-[1.5px] bg-text-primary rounded-full origin-center"
          animate={
            isOpen
              ? { rotate: 45, y: 6.5, width: 16, backgroundColor: "var(--accent)" }
              : { rotate: 0, y: 0, width: 18 }
          }
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="block w-4 h-[1.5px] bg-text-primary rounded-full"
          animate={isOpen ? { opacity: 0, scaleX: 0, x: -10 } : { opacity: 1, scaleX: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block w-5 h-[1.5px] bg-text-primary rounded-full origin-center"
          animate={
            isOpen
              ? { rotate: -45, y: -6.5, width: 16, backgroundColor: "var(--accent)" }
              : { rotate: 0, y: 0, width: 12 }
          }
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.button>
    </MagneticWrap>
  );
}

// Liquid sweep animation coordinates
const svgCurveVariants = {
  initial: {
    d: "M 100 0 L 100 100 L 100 100 L 100 0 Z"
  },
  enter: {
    d: [
      "M 100 0 L 100 100 L 100 100 L 100 0 Z",
      "M 100 0 L 100 100 L 0 100 Q -30 50 0 0 Z",
      "M 100 0 L 100 100 L 0 100 L 0 0 Z"
    ],
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    d: [
      "M 100 0 L 100 100 L 0 100 L 0 0 Z",
      "M 100 0 L 100 100 L 100 100 Q 130 50 100 0 Z",
      "M 100 0 L 100 100 L 100 100 L 100 0 Z"
    ],
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] }
  }
};

const linkVariants = {
  closed: { opacity: 0, y: 60, rotate: 6, filter: "blur(6px)" },
  open: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.35 + i * 0.05,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [timeString, setTimeString] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -65% 0px" }
    );
    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Dynamic ticking time in Pernambut (IST)
  useEffect(() => {
    const updateClock = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      const istTime = new Date().toLocaleTimeString("en-US", options);
      setTimeString(istTime + " IST");
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 550);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-slow ${
          scrolled ? "glass shadow-surface-md" : "bg-transparent"
        }`}
      >
        <nav className="max-w-content mx-auto px-6 md:px-12 lg:px-20 h-nav flex items-center justify-between">
          {/* Logo */}
          <MagneticWrap strength={0.3}>
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleClick("#home"); }}
              data-cursor="Home"
              className="font-display font-bold text-xl text-text-primary hover:text-accent transition-colors duration-fast relative z-50"
            >
              <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
                R<span className="text-accent">.</span>
              </motion.span>
            </a>
          </MagneticWrap>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <MagneticWrap strength={0.3}>
              <ThemeToggle />
            </MagneticWrap>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline font-mono text-xs uppercase tracking-widest text-text-secondary select-none">
                {isOpen ? "Close" : "Menu"}
              </span>
              <MenuButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen Liquid SVG Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 overflow-hidden pointer-events-auto">
            {/* SVG sweep backdrop */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none fill-bg-secondary stroke-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <motion.path
                variants={svgCurveVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              />
            </svg>

            {/* Menu Panel Content */}
            <div className="absolute inset-0 z-50 flex items-center p-6 md:p-16 lg:p-24">
              <div className="max-w-content w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch h-full py-20 lg:py-12">
                {/* Left Column: Studio Details (Fades in slightly later) */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 flex flex-col justify-between h-full border-r border-border/30 pr-8 hidden lg:flex"
                >
                  <div className="flex flex-col gap-6 pt-12">
                    <span className="text-[10vw] font-display font-black text-outline opacity-[0.07] leading-none select-none">
                      RAIYAN
                    </span>
                    <p className="text-body-md text-text-secondary leading-relaxed max-w-xs">
                      Shaping high-performance, premium web interfaces at Colan Infotech. Dedicated to precise frontend craft and animations.
                    </p>
                  </div>

                  <div className="flex flex-col gap-8 pb-12">
                    {/* Availability */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">
                        Status
                      </span>
                      <span className="text-xs font-semibold text-accent flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        AVAILABLE FOR FULL-TIME / FREELANCE
                      </span>
                    </div>

                    {/* Clock */}
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">
                        Pernambut, IN
                      </span>
                      <span className="text-body-sm font-mono text-text-secondary">
                        {timeString || "00:00:00 IST"}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column: Navigation Links */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full pl-0 lg:pl-16">
                  {/* Category Header */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-mono text-xs uppercase tracking-widest text-text-muted border-b border-border/30 pb-3"
                  >
                    Index
                  </motion.span>

                  {/* Navigation List */}
                  <nav className="flex flex-col gap-3 py-6 my-auto">
                    {navLinks.map((link, i) => (
                      <div key={link.href} className="overflow-hidden">
                        <motion.a
                          href={link.href}
                          custom={i}
                          variants={linkVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                          data-cursor={link.label}
                          className={`block font-display text-4xl md:text-6xl font-black uppercase tracking-tighter py-1 transition-all duration-fast ${
                            activeSection === link.href.slice(1)
                              ? "text-accent"
                              : "text-text-primary hover:text-accent"
                          }`}
                          whileHover={{ x: 16 }}
                          transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        >
                          <span className="font-mono text-[0.4em] text-text-muted mr-4 align-middle font-medium">
                            0{i + 1}
                          </span>
                          {link.label}
                        </motion.a>
                      </div>
                    ))}
                  </nav>

                  {/* Mobile-only Footer metadata */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col gap-6 border-t border-border/30 pt-6 lg:hidden"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-text-muted">
                      <span>{timeString}</span>
                      <span>✦ AVAILABLE</span>
                    </div>
                  </motion.div>

                  {/* Social links row */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-between items-center border-t border-border/30 pt-6"
                  >
                    <div className="flex gap-5">
                      <MagneticWrap strength={0.3}>
                        <a
                          href="https://github.com/raiyanu"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-accent transition-colors p-1"
                          data-cursor="GitHub"
                        >
                          <Github size={20} />
                        </a>
                      </MagneticWrap>
                      <MagneticWrap strength={0.3}>
                        <a
                          href="https://linkedin.com/in/c-raiyan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-secondary hover:text-accent transition-colors p-1"
                          data-cursor="LinkedIn"
                        >
                          <Linkedin size={20} />
                        </a>
                      </MagneticWrap>
                      <MagneticWrap strength={0.3}>
                        <a
                          href="mailto:raiyan.c.me@gmail.com"
                          className="text-text-secondary hover:text-accent transition-colors p-1"
                          data-cursor="Email"
                        >
                          <Mail size={20} />
                        </a>
                      </MagneticWrap>
                    </div>
                    <span className="font-mono text-xs text-text-muted select-none">
                      © 2026
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
