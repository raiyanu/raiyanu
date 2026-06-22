"use client";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import MagneticWrap from "./MagneticWrap";
import { Github, Linkedin, Mail, X } from "lucide-react";

const navLinks = [
  { href: "#home",       label: "Home",     number: "01" },
  { href: "#about",      label: "About",    number: "02" },
  { href: "#experience", label: "Work",     number: "03" },
  { href: "#projects",   label: "Projects", number: "04" },
  { href: "#skills",     label: "Method",   number: "05" },
  { href: "#contact",    label: "Contact",  number: "06" },
];

/* ─── Animated Hamburger Button ─────────────────────────────────────────── */

function MenuButton({ isOpen, toggle }) {
  return (
    <MagneticWrap strength={0.4}>
      <motion.button
        onClick={toggle}
        data-cursor={isOpen ? "Close" : "Menu"}
        className="relative z-50 w-12 h-12 rounded-full flex flex-col items-center justify-center gap-[5px] bg-bg-surface border border-border hover:border-accent/40 transition-colors duration-fast overflow-hidden shadow-sm"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.90 }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {/* Animated fill sweep on open */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: "var(--accent)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Line 1 */}
        <motion.span
          className="block h-[1.5px] rounded-full origin-center relative z-10"
          style={{ backgroundColor: isOpen ? "#080706" : "var(--text-primary)" }}
          animate={
            isOpen
              ? { rotate: 45, y: 6.5, width: 16 }
              : { rotate: 0, y: 0, width: 18 }
          }
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Line 2 */}
        <motion.span
          className="block h-[1.5px] rounded-full relative z-10"
          style={{ backgroundColor: isOpen ? "#080706" : "var(--text-primary)" }}
          animate={isOpen ? { opacity: 0, scaleX: 0, x: -10 } : { opacity: 1, scaleX: 1, x: 0 }}
          transition={{ duration: 0.28 }}
          initial={{ width: 14 }}
        />
        {/* Line 3 */}
        <motion.span
          className="block h-[1.5px] rounded-full origin-center relative z-10"
          style={{ backgroundColor: isOpen ? "#080706" : "var(--text-primary)" }}
          animate={
            isOpen
              ? { rotate: -45, y: -6.5, width: 16 }
              : { rotate: 0, y: 0, width: 12 }
          }
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.button>
    </MagneticWrap>
  );
}

/* ─── SVG Liquid Sweep ───────────────────────────────────────────────────── */
const svgCurveVariants = {
  initial:  { d: "M 100 0 L 100 100 L 100 100 L 100 0 Z" },
  enter: {
    d: [
      "M 100 0 L 100 100 L 100 100 L 100 0 Z",
      "M 100 0 L 100 100 L 0 100 Q -30 50 0 0 Z",
      "M 100 0 L 100 100 L 0 100 L 0 0 Z",
    ],
    transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    d: [
      "M 100 0 L 100 100 L 0 100 L 0 0 Z",
      "M 100 0 L 100 100 L 100 100 Q 130 50 100 0 Z",
      "M 100 0 L 100 100 L 100 100 L 100 0 Z",
    ],
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};

/* ─── Nav Link ───────────────────────────────────────────────────────────── */
function NavLink({ link, index, activeSection, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isActive = activeSection === link.href.slice(1);

  return (
    <div className="overflow-hidden" key={link.href}>
      <motion.a
        href={link.href}
        custom={index}
        variants={{
          closed: { opacity: 0, y: 70, rotate: 5, filter: "blur(8px)" },
          open: (i) => ({
            opacity: 1, y: 0, rotate: 0, filter: "blur(0px)",
            transition: { delay: 0.3 + i * 0.055, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
          }),
        }}
        initial="closed"
        animate="open"
        exit="closed"
        onClick={(e) => { e.preventDefault(); onClick(link.href); }}
        data-cursor={link.label}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`group relative flex items-baseline gap-4 font-display text-4xl md:text-6xl font-black uppercase tracking-tighter py-1 transition-colors duration-fast ${
          isActive ? "text-accent" : "text-text-primary"
        }`}
      >
        {/* Number */}
        <span className="font-mono text-[0.38em] text-text-muted font-medium self-center shrink-0">
          {link.number}
        </span>

        {/* Label with hover x-slide */}
        <motion.span
          animate={{ x: hovered ? 18 : 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          className="block"
        >
          {link.label}
        </motion.span>

        {/* Active underline */}
        {isActive && (
          <motion.div
            layoutId="activeNavLine"
            className="absolute -bottom-0.5 left-14 h-px bg-accent"
            style={{ width: "40px" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </motion.a>
    </div>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────────── */

export default function Navbar() {
  const [isOpen, setIsOpen]           = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [timeString, setTimeString]   = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  // Intersection observer for active section
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

  // Scroll lock when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Live clock
  useEffect(() => {
    const update = () => {
      setTimeString(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit", minute: "2-digit", second: "2-digit",
          hour12: false,
        }) + " IST"
      );
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClick = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 550);
  };

  return (
    <>
      {/* ── Fixed Top Bar ────────────────────────────────────────────── */}
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

          {/* Controls row */}
          <div className="flex items-center gap-6">
            <MagneticWrap strength={0.3}>
              <ThemeToggle />
            </MagneticWrap>
            <div className="flex items-center gap-3">
              <motion.span
                className="hidden md:inline font-mono text-xs uppercase tracking-widest text-text-secondary select-none"
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                Menu
              </motion.span>
              <MenuButton isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ── Full-screen Menu Overlay ─────────────────────────────────── */}
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

            {/* Backdrop click to close */}
            <motion.div
              className="absolute inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* ── Menu panel ──────────────────────────────────────────── */}
            <div className="absolute inset-0 z-50 flex items-center p-6 md:p-16 lg:p-24 pointer-events-none">
              <div className="max-w-content w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch h-full py-20 lg:py-12 pointer-events-auto">

                {/* Left column: Studio details */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: 0.4, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5 flex-col justify-between h-full border-r border-border/30 pr-8 hidden lg:flex"
                >
                  <div className="flex flex-col gap-6 pt-12">
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55, duration: 0.6 }}
                      className="font-display font-black leading-none select-none tracking-tighter"
                      style={{
                        fontSize: "10vw",
                        color: "transparent",
                        WebkitTextStroke: "1px var(--border-strong)",
                        opacity: 0.25,
                      }}
                    >
                      RAIYAN
                    </motion.span>

                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="text-body-md text-text-secondary leading-relaxed max-w-xs"
                    >
                      Shaping high-performance, premium web interfaces at{" "}
                      <span className="text-text-primary font-semibold">Colan Infotech</span>.
                      Dedicated to precise frontend craft and meaningful motion.
                    </motion.p>
                  </div>

                  <div className="flex flex-col gap-8 pb-12">
                    {/* Availability */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65, duration: 0.5 }}
                      className="flex flex-col gap-1.5"
                    >
                      <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">
                        Status
                      </span>
                      <span className="text-xs font-semibold text-accent flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                        </span>
                        AVAILABLE FOR FULL-TIME / FREELANCE
                      </span>
                    </motion.div>

                    {/* Clock */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="flex flex-col gap-1"
                    >
                      <span className="text-[9px] font-mono uppercase tracking-widest text-text-muted">
                        Pernambut, IN
                      </span>
                      <span className="text-body-sm font-mono text-text-secondary tabular-nums">
                        {timeString || "00:00:00 IST"}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right column: Nav links */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full pl-0 lg:pl-16">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.28 }}
                    className="flex items-center justify-between border-b border-border/30 pb-3"
                  >
                    <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
                      Navigation
                    </span>
                    {/* ── Close button ────────────────────────────── */}
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ scale: 1.12, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      transition2={{ type: "spring", stiffness: 260, damping: 16 }}
                      data-cursor="Close"
                      aria-label="Close navigation"
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition-colors duration-fast"
                    >
                      <X size={15} strokeWidth={1.5} />
                    </motion.button>
                  </motion.div>

                  {/* Nav items */}
                  <nav className="flex flex-col gap-2 py-6 my-auto">
                    {navLinks.map((link, i) => (
                      <NavLink
                        key={link.href}
                        link={link}
                        index={i}
                        activeSection={activeSection}
                        onClick={handleClick}
                      />
                    ))}
                  </nav>

                  {/* Mobile metadata */}
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

                  {/* Social links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.62 }}
                    className="flex justify-between items-center border-t border-border/30 pt-6"
                  >
                    <div className="flex gap-4">
                      {[
                        { href: "https://github.com/raiyanu",       icon: Github,   label: "GitHub" },
                        { href: "https://linkedin.com/in/c-raiyan", icon: Linkedin, label: "LinkedIn" },
                        { href: "mailto:raiyan.c.me@gmail.com",     icon: Mail,     label: "Email" },
                      ].map((s) => (
                        <MagneticWrap key={s.label} strength={0.35}>
                          <motion.a
                            href={s.href}
                            target={s.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            className="text-text-secondary hover:text-accent transition-colors p-1"
                            data-cursor={s.label}
                            whileHover={{ y: -3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 12 }}
                          >
                            <s.icon size={19} strokeWidth={1.5} />
                          </motion.a>
                        </MagneticWrap>
                      ))}
                    </div>
                    <span className="font-mono text-xs text-text-muted select-none">
                      © {new Date().getFullYear()}
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
