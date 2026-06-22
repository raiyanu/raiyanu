"use client";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect } from "react";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import MagneticWrap from "../components/MagneticWrap";

/* ─── Animation variants ─────────────────────────────────────────────────── */

const charVariantDown = {
  hidden: {
    opacity: 0,
    y: 110,
    rotateX: 72,
    filter: "blur(14px)",
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 100,
      mass: 0.9,
      delay: 0.48 + i * 0.038,
    },
  }),
};

const charVariantUp = {
  hidden: {
    opacity: 0,
    y: -90,
    rotateX: -62,
    filter: "blur(10px)",
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 100,
      delay: 0.68 + i * 0.038,
    },
  }),
};

const fadeUp = (delay) => ({
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
});

/* ─── Animated Name ──────────────────────────────────────────────────────── */

function AnimatedName({ text, startIndex = 0, reverse = false }) {
  const variant = reverse ? charVariantUp : charVariantDown;
  return text.split("").map((char, i) => (
    <motion.span
      key={`${char}-${startIndex + i}`}
      custom={startIndex + i}
      variants={variant}
      initial="hidden"
      animate="visible"
      className="inline-block will-change-[transform,opacity,filter]"
      style={{ transformOrigin: "bottom center" }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function Hero() {
  const containerRef = useRef(null);

  // Scroll-driven fade/scale
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const contentY       = useTransform(scrollYProgress, [0, 0.5], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0]);
  const scaleDown      = useTransform(scrollYProgress, [0, 0.5],  [1, 0.96]);

  // Mouse-tracking orbs
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const spX  = useSpring(rawX, { damping: 28, stiffness: 45 });
  const spY  = useSpring(rawY, { damping: 28, stiffness: 45 });
  const orb1X = useTransform(spX, [0, 1], [-55, 55]);
  const orb1Y = useTransform(spY, [0, 1], [-38, 38]);
  const orb2X = useTransform(spX, [0, 1], [38, -38]);
  const orb2Y = useTransform(spY, [0, 1], [28, -28]);

  useEffect(() => {
    const onMove = (e) => {
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-end pb-16 md:pb-20 overflow-hidden"
    >
      {/* ── Structural Grid Lines ────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
        aria-hidden="true"
      >
        {[
          { x1: "0", y1: "20%",  x2: "100%", y2: "20%",  delay: 0    },
          { x1: "0", y1: "79%",  x2: "100%", y2: "79%",  delay: 0.25 },
          { x1: "9%",  y1: "0", x2: "9%",  y2: "100%", delay: 0.1  },
          { x1: "82%", y1: "0", x2: "82%", y2: "100%", delay: 0.35 },
        ].map((line, i) => (
          <motion.line
            key={i}
            {...line}
            stroke="var(--border)"
            strokeWidth="0.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
              delay: line.delay,
            }}
          />
        ))}

        {/* Corner ticks at grid intersections */}
        {[
          { cx: "9%", cy: "20%" },
          { cx: "82%", cy: "20%" },
          { cx: "9%", cy: "79%" },
          { cx: "82%", cy: "79%" },
        ].map((dot, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={dot.cx}
            cy={dot.cy}
            r="2"
            fill="var(--accent)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
          />
        ))}
      </svg>

      {/* ── Mouse-Tracking Ambient Orbs ──────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="absolute top-[12%] left-[4%] w-[550px] h-[550px] rounded-full bg-accent/[0.04] dark:bg-accent/[0.05] blur-[140px]"
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute bottom-[8%] right-[6%] w-[480px] h-[480px] rounded-full bg-accent-secondary/[0.03] dark:bg-accent-secondary/[0.04] blur-[120px]"
        />
      </div>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: scaleDown }}
        className="relative z-10 w-full max-w-content mx-auto px-6 md:px-12 lg:px-20"
      >
        {/* Top metadata bar */}
        <div className="flex items-start justify-between mb-8 md:mb-10">
          <motion.div
            variants={fadeUp(0.18)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-1"
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-text-muted">
              Coordinates
            </span>
            <span className="font-mono text-[10px] text-text-secondary">
              12°53&apos;N · 78°42&apos;E
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp(0.28)}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.18em] text-accent"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            Available for work
          </motion.div>
        </div>

        {/* Giant name display */}
        <div
          className="overflow-hidden"
          style={{ perspective: "1400px" }}
        >
          <h1 className="font-display font-black leading-[0.87] tracking-tighter">
            {/* First name — falls from above */}
            <span
              className="block uppercase text-text-primary"
              style={{ fontSize: "clamp(7vw, 10vw, 12vw)" }}
            >
              <AnimatedName text="RAIYAN" startIndex={0} />
            </span>
            {/* Last name — rises from below, outline style, offset */}
            <span
              className="block uppercase ml-[5%] mt-1"
              style={{
                fontSize: "clamp(7vw, 10vw, 12vw)",
                WebkitTextStroke: "1.5px var(--text-primary)",
                color: "transparent",
              }}
            >
              <AnimatedName text="AHMED" startIndex={6} reverse />
            </span>
          </h1>
        </div>

        {/* Bottom strip — tagline + CTAs */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-end border-t border-border/30 pt-8">
          {/* Tagline */}
          <motion.div
            variants={fadeUp(1.0)}
            initial="hidden"
            animate="visible"
            className="md:col-span-7"
          >
            <p className="text-body-lg text-text-secondary leading-[1.75] max-w-sm">
              I engineer digital products that feel{" "}
              <em className="text-text-primary not-italic font-semibold">alive</em>.
              Currently at{" "}
              <span className="text-accent font-medium">Colan Infotech</span>{" "}
              building high-performance React experiences.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp(1.15)}
            initial="hidden"
            animate="visible"
            className="md:col-span-5 flex flex-col gap-4 items-start md:items-end"
          >
            <MagneticWrap strength={0.25}>
              <a
                href="#projects"
                data-cursor="view"
                className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-text-primary text-text-inverse font-medium text-[11px] tracking-widest uppercase overflow-hidden transition-shadow duration-normal hover:shadow-md"
              >
                <span className="relative z-10">Explore Work</span>
                <ArrowDown
                  size={11}
                  className="relative z-10 group-hover:translate-y-1 transition-transform duration-normal"
                />
                <div
                  className="absolute inset-0 bg-accent scale-x-0 origin-left group-hover:scale-x-100"
                  style={{
                    transition: "transform var(--duration-slow) var(--ease-out-expo)",
                  }}
                />
              </a>
            </MagneticWrap>

            {/* Social row */}
            <div className="flex items-center gap-4">
              {[
                { href: "https://github.com/raiyanu",        icon: Github,   label: "GitHub" },
                { href: "https://linkedin.com/in/c-raiyan",  icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:raiyan.c.me@gmail.com",      icon: Mail,     label: "Email" },
                { href: "/resume.pdf",                       icon: FileText, label: "Resume", download: true },
              ].map((link) => (
                <MagneticWrap key={link.label} strength={0.3}>
                  <a
                    href={link.href}
                    download={link.download || undefined}
                    target={!link.download && !link.href.startsWith("mailto") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-cursor={link.label}
                    className="text-text-muted hover:text-accent transition-colors duration-fast p-1"
                    aria-label={link.label}
                  >
                    <link.icon size={16} strokeWidth={1.5} />
                  </a>
                </MagneticWrap>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1 }}
        className="absolute bottom-8 left-[9%] flex items-center gap-3 z-10 select-none"
      >
        <span className="text-[8px] font-mono uppercase tracking-[0.28em] text-text-muted hidden sm:block">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-7 rounded-full border border-border/60 flex items-start justify-center pt-[5px]"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[3px] h-[5px] rounded-full bg-accent"
          />
        </motion.div>
      </motion.div>

      {/* ── Live stats badge ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 right-6 md:right-[9%] z-10 hidden md:flex items-center gap-2 text-[8px] font-mono text-text-muted select-none"
      >
        <span className="w-4 h-px bg-border" />
        <span className="uppercase tracking-[0.2em]">2+ years exp · 10+ projects</span>
        <span className="w-4 h-px bg-border" />
      </motion.div>
    </section>
  );
}
