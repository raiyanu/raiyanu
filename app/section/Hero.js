"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail, FileText, ArrowUpRight } from "lucide-react";
import MagneticWrap from "../components/MagneticWrap";

const firstName = "Raiyan";
const lastName = "Ahmed";

const charVariant = {
  hidden: { opacity: 0, y: 120, rotateX: 75, filter: "blur(16px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 24,
      stiffness: 110,
      mass: 0.8,
      delay: 0.4 + i * 0.03,
    },
  }),
};

const fadeUp = (delay) => ({
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
});

function AnimatedName({ text, startIndex = 0 }) {
  return text.split("").map((char, i) => (
    <motion.span
      key={`${char}-${i}`}
      custom={startIndex + i}
      variants={charVariant}
      initial="hidden"
      animate="visible"
      className="inline-block origin-bottom will-change-[transform,opacity,filter]"
      style={{ display: char === " " ? "inline" : "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scaleDown = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
    >
      {/* Decorative Structural Lines (Awwwards/Architectural layout) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-border/40 stroke-[0.75px]" fill="none">
        {/* Horizontal grid lines */}
        <motion.line
          x1="0" y1="20%" x2="100%" y2="20%"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.line
          x1="0" y1="75%" x2="100%" y2="75%"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
        {/* Vertical grid lines */}
        <motion.line
          x1="12%" y1="0" x2="12%" y2="100%"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.line
          x1="78%" y1="0" x2="78%" y2="100%"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </svg>

      {/* Warm Background Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[12%] left-[8%] w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />
        <div className="absolute bottom-[15%] right-[12%] w-[450px] h-[450px] rounded-full bg-accent-secondary/[0.03] blur-[100px]" />
      </div>

      {/* Grid dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--text-muted) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content wrapper */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: scaleDown }}
        className="relative z-10 w-full max-w-content mx-auto px-6 md:px-12 lg:px-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Lat/Long Coordinates and hiring banner */}
          <div className="lg:col-span-3 flex flex-col gap-6 pt-2 font-mono text-[10px] text-text-muted select-none">
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-0.5"
            >
              <span className="uppercase tracking-widest text-[8px]">Coordinates</span>
              <span className="text-text-secondary">12° 53&apos; 35&quot; N, 78° 42&apos; 10&quot; E</span>
            </motion.div>

            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2 text-accent font-semibold uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              AVAILABLE FOR COLLABORATION
            </motion.div>
          </div>

          {/* Center Column: Big Name Reveal */}
          <div className="lg:col-span-9 flex flex-col gap-10">
            <div className="flex flex-col border-b border-border/30 pb-10">
              <h1 className="font-display font-black leading-[0.85] tracking-tighter" style={{ perspective: "1000px" }}>
                <span className="block text-[13vw] sm:text-[11vw] lg:text-[10vw] uppercase text-text-primary whitespace-nowrap">
                  <AnimatedName text={firstName} startIndex={0} />
                </span>
                <span className="block text-[13vw] sm:text-[11vw] lg:text-[10vw] uppercase text-outline ml-[8%] mt-2 whitespace-nowrap">
                  <AnimatedName text={lastName} startIndex={firstName.length} />
                </span>
              </h1>
            </div>

            {/* Description & CTAs in asymmetric grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Short conversational bio */}
              <motion.div
                variants={fadeUp(0.85)}
                initial="hidden"
                animate="visible"
                className="md:col-span-7 flex flex-col gap-4"
              >
                <p className="text-body-lg text-text-secondary leading-[1.75]">
                  I craft web interfaces that feel <em className="text-text-primary not-italic font-semibold">alive</em>. Currently engineering modern e-commerce and dynamic user experiences at <span className="text-accent font-medium link-underline">Colan Infotech</span> using React.js, Next.js, and high-end animations.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeUp(1.05)}
                initial="hidden"
                animate="visible"
                className="md:col-span-5 flex flex-col items-start gap-4 md:pl-8 border-l border-border/20"
              >
                <MagneticWrap strength={0.25}>
                  <a
                    href="#projects"
                    data-cursor="view"
                    className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-text-primary text-text-inverse font-medium text-xs tracking-wider uppercase overflow-hidden transition-all duration-normal hover:shadow-md"
                  >
                    <span className="relative z-10">Explore Work</span>
                    <ArrowDown
                      size={12}
                      className="relative z-10 group-hover:translate-y-1 transition-transform duration-normal"
                    />
                    <div className="absolute inset-0 bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-slow ease-out-expo" />
                  </a>
                </MagneticWrap>

                <div className="flex gap-4 items-center">
                  <MagneticWrap strength={0.3}>
                    <a
                      href="mailto:raiyan.c.me@gmail.com"
                      data-cursor="email"
                      className="text-xs font-mono uppercase tracking-widest text-text-muted hover:text-accent transition-colors py-1"
                    >
                      Email
                    </a>
                  </MagneticWrap>
                  <span className="text-border/40 font-mono text-xs">/</span>
                  <MagneticWrap strength={0.3}>
                    <a
                      href="/resume.pdf"
                      download
                      data-cursor="download"
                      className="text-xs font-mono uppercase tracking-widest text-text-muted hover:text-accent transition-colors py-1 flex items-center gap-1.5"
                    >
                      <FileText size={11} />
                      Resume
                    </a>
                  </MagneticWrap>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fixed-Floating Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-[12%] translate-x-4 flex items-center gap-4 select-none z-10"
      >
        <span className="text-[9px] text-text-muted font-mono tracking-[0.25em] uppercase hidden sm:block">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1"
        >
          <motion.div
            animate={{ opacity: [1, 0.4, 1], y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-accent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
