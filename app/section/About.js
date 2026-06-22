"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const techStack = [
  "React.js", "Next.js", "JavaScript", "Redux",
  "Node.js", "MongoDB", "Tailwind", "Figma",
];

const philosophyLines = [
  "I believe that the best interfaces are felt before they are seen.",
  "Every animation should serve a reason. Every pixel should earn its place.",
  "I bridge the gap between design vision and technical execution — and I enjoy every step of that process.",
];

const stats = [
  { value: "2+",  label: "Years exp." },
  { value: "10+", label: "Projects shipped" },
  { value: "2",   label: "Companies" },
];

/* ─── Rotating Badge ─────────────────────────────────────────────────────── */

function RotatingBadge() {
  return (
    <div className="absolute -right-4 -top-4 w-[88px] h-[88px] pointer-events-none z-20">
      <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
        <defs>
          <path
            id="circlePath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          />
        </defs>
        <text
          style={{
            fontSize: "9px",
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            fill: "var(--text-muted)",
            opacity: 0.65,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <textPath xlinkHref="#circlePath">
            Frontend · Developer · Creative ·{" "}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const [photoHovered, setPhotoHovered] = useState(false);

  const photoRef = useRef(null);
  const isPhotoInView = useInView(photoRef, { once: true, amount: 0.25 });

  return (
    <section
      id="about"
      className="py-section relative overflow-hidden border-b border-border/30"
    >
      {/* ── Architectural background section number ──────────────────── */}
      <div
        className="section-bg-number absolute -left-6 top-4 select-none pointer-events-none"
        aria-hidden="true"
      >
        01
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20 relative">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-14">
            <span className="text-label font-mono text-accent uppercase tracking-[0.2em]">01</span>
            <div className="h-px w-16 bg-accent/30" />
            <span className="text-label font-mono text-text-muted uppercase tracking-[0.15em]">Profile</span>
          </div>
        </ScrollReveal>

        {/* Grid: left statement + right photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Statement + Manifesto ──────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-black text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.04] tracking-tight text-text-primary">
                I don&apos;t just<br />
                build UIs<span className="text-accent">.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-body-lg text-text-secondary leading-[1.8]">
                I engineer the moment someone{" "}
                <em className="text-text-primary not-italic font-semibold">feels</em>{" "}
                the product. Having shipped production code across dynamic e-commerce
                modules and large legacy refactors, I know visual details and motion
                shape the entire brand experience.
              </p>
            </ScrollReveal>

            {/* Expandable manifesto */}
            <ScrollReveal delay={0.3}>
              <div className="border-t border-border/30 pt-6">
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      key="manifesto"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 space-y-4 border-l-2 border-accent/30 pl-4">
                        {philosophyLines.map((line, i) => (
                          <p key={i} className="text-body-md text-text-secondary leading-[1.8]">
                            {line}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setExpanded(!expanded)}
                  data-cursor="read"
                  className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-fast"
                >
                  <motion.span
                    animate={{ rotate: expanded ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block text-accent text-base leading-none"
                  >
                    +
                  </motion.span>
                  {expanded ? "Collapse" : "Read my manifesto"}
                </button>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.4}>
              <div className="flex gap-8 pt-4 border-t border-border/20">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="font-display font-black text-2xl text-text-primary leading-none">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-text-muted">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Location + graduation */}
            <ScrollReveal delay={0.5}>
              <div className="flex flex-col gap-1 font-mono text-[10px] text-text-muted">
                <span>📍 Pernambut, Tamil Nadu, India</span>
                <span>🎓 B.Sc. CS · Mazharul Uloom College · 2024</span>
                <span>🌐 English · Tamil · Urdu</span>
              </div>
            </ScrollReveal>
          </div>

          {/* ── RIGHT: Photo + Daily Stack ───────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Photo block */}
            <motion.div
              ref={photoRef}
              initial={{ opacity: 0, y: 50 }}
              animate={isPhotoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              onMouseEnter={() => setPhotoHovered(true)}
              onMouseLeave={() => setPhotoHovered(false)}
              data-cursor="HELLO 👋"
            >
              {/* Image container with tilt */}
              <motion.div
                animate={{
                  rotate: photoHovered ? -1.2 : 0,
                  scale: photoHovered ? 1.012 : 1,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="relative w-full aspect-[4/5] max-h-[520px] rounded-2xl overflow-hidden border border-border bg-bg-secondary"
              >
                <Image
                  src="/person.jpg"
                  alt="Raiyan Ahmed — Frontend Engineer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
                {/* Accent tint on hover */}
                <motion.div
                  animate={{ opacity: photoHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-accent/[0.06] pointer-events-none"
                />
                {/* Bottom gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/30 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Offset decorative card */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-accent/15 -z-10" />

              {/* Rotating circular badge */}
              <RotatingBadge />
            </motion.div>

            {/* Daily Stack */}
            <ScrollReveal delay={0.3}>
              <div className="pt-2">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-text-muted mb-4">
                  Daily Stack
                </span>
                <StaggerContainer
                  className="flex flex-wrap gap-2"
                  stagger={0.06}
                  delayStart={0.5}
                >
                  {techStack.map((tech) => (
                    <StaggerItem key={tech}>
                      <motion.span
                        whileHover={{ y: -3, scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 400, damping: 12 }}
                        className="px-3 py-1.5 rounded-full text-[11px] font-mono bg-bg-surface border border-border text-text-secondary hover:text-accent hover:border-accent/40 transition-colors duration-fast inline-block"
                        data-cursor={tech}
                      >
                        {tech}
                      </motion.span>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
