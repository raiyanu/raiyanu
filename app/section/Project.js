"use client";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";
import MagneticWrap from "../components/MagneticWrap";

/* ─── Project Data ───────────────────────────────────────────────────────── */

const projects = [
  {
    title: "6thStreet",
    subtitle: "E-commerce Platform — Apparel Group",
    number: "01",
    description:
      "Large-scale ScandiPWA e-commerce serving millions of customers. New features across business-critical modules, performance optimizations, production debugging, and advanced analytics integrations in a fast-paced multi-team environment.",
    technologies: ["React", "ScandiPWA", "Redux", "GraphQL"],
    type: "Professional",
    image: "/project_6thstreet.png",
  },
  {
    title: "ontoRX",
    subtitle: "Clinical Dashboard Migration",
    number: "02",
    description:
      "Migrated a legacy ASP.NET monolith to a clean, modern React.js architecture. Designed a metadata-driven CRUD form engine that generates dynamic fields, validation, and layouts at runtime from a configuration object.",
    technologies: ["React", "JavaScript", "CSS"],
    type: "Professional",
    image: "/project_ontorx.png",
  },
  {
    title: "Foodie-Site",
    subtitle: "Restaurant Discovery Platform",
    number: "03",
    description:
      "Dynamic content from Sanity.io CMS, responsive masonry layout, QR code menu integration, and performance-optimized delivery. Smooth loading states and interaction design throughout.",
    technologies: ["JavaScript", "HTML/CSS", "Sanity.io"],
    links: {
      github: "https://github.com/raiyanu/foodie-site",
      live: "https://raiyanu.github.io/foodie-site",
    },
    type: "Personal",
    image: "/project_foodiesite.png",
  },
  {
    title: "ChadGym",
    subtitle: "Fitness & Wellness Website",
    number: "04",
    description:
      "Semantic HTML & CSS with fully responsive layout, functional chatbot UI, form validations, and dynamic content sections. Clean, accessible, and performant — built for real users.",
    technologies: ["HTML", "CSS", "JavaScript"],
    links: {
      github: "https://github.com/raiyanu/chad-gym",
      live: "https://raiyanu.github.io/chad-gym",
    },
    type: "Personal",
    image: "/project_chadgym.png",
  },
];

/* ─── Project Chapter ────────────────────────────────────────────────────── */

function ProjectChapter({ project, index, onHover }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.06 });
  const [imageHovered, setImageHovered] = useState(false);

  // Alternate image side: even=left, odd=right
  const imageRight = index % 2 !== 0;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.05 }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="relative py-14 md:py-20 border-b border-border/30 last:border-b-0"
    >
      {/* Large background project number */}
      <span
        className="absolute font-display font-black leading-none tracking-tighter pointer-events-none select-none"
        style={{
          fontSize: "clamp(12rem, 20vw, 28rem)",
          color: "transparent",
          WebkitTextStroke: "1px var(--border)",
          opacity: 0.6,
          top: "50%",
          [imageRight ? "right" : "left"]: "-2%",
          transform: "translateY(-50%)",
        }}
        aria-hidden="true"
      >
        {project.number}
      </span>

      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative"
      >
        {/* ── Image block ────────────────────────────────────────────── */}
        <div
          className={`lg:col-span-7 ${imageRight ? "lg:order-last" : ""}`}
        >
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
            transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
            className="relative rounded-2xl overflow-hidden bg-bg-secondary"
            style={{ aspectRatio: "16/10" }}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            {/* Image with zoom */}
            <motion.div
              animate={{
                scale: imageHovered ? 1.05 : 1,
                y: imageHovered ? -5 : 0,
              }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </motion.div>

            {/* Accent overlay on hover */}
            <motion.div
              animate={{ opacity: imageHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-accent/[0.06] pointer-events-none"
            />

            {/* Type badge */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bg-primary/85 backdrop-blur-sm border border-border/50 text-[9px] font-mono uppercase tracking-widest text-text-muted">
              {project.type}
            </div>

            {/* Image border shimmer on hover */}
            <motion.div
              animate={{ opacity: imageHovered ? 1 : 0 }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: "inset 0 0 0 1px var(--border-accent)" }}
            />
          </motion.div>
        </div>

        {/* ── Content block ──────────────────────────────────────────── */}
        <div className={`lg:col-span-5 flex flex-col gap-5 ${imageRight ? "" : "lg:pl-4"}`}>
          <motion.div
            initial={{ opacity: 0, x: imageRight ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block mb-2">
              {project.subtitle}
            </span>
            <h3
              className="font-display font-black leading-tight tracking-tighter text-text-primary mb-5"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {project.title}
            </h3>
            <p className="text-body-md text-text-secondary leading-[1.8]">
              {project.description}
            </p>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="flex flex-wrap gap-2"
          >
            {project.technologies.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ y: -2, color: "var(--accent)", borderColor: "var(--border-accent)" }}
                transition={{ duration: 0.15 }}
                className="text-[10px] font-mono px-3 py-1 rounded-full bg-bg-surface border border-border text-text-secondary transition-colors duration-fast"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Links */}
          {project.links && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="flex gap-5 pt-1"
            >
              {project.links.github && (
                <MagneticWrap strength={0.3}>
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="code"
                    className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-fast"
                  >
                    <Github size={13} strokeWidth={1.5} />
                    Source
                  </a>
                </MagneticWrap>
              )}
              {project.links.live && (
                <MagneticWrap strength={0.3}>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="open"
                    className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-fast"
                  >
                    <ExternalLink size={13} strokeWidth={1.5} />
                    Live site
                  </a>
                </MagneticWrap>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function Project() {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Mouse spring for floating preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 22, stiffness: 200, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 22, stiffness: 200, mass: 0.5 });

  // Velocity-based tilt on hover preview
  const mouseXVelocity = useVelocity(mouseX);
  const rotate = useTransform(mouseXVelocity, [-3000, 3000], [-13, 13]);
  const rotateSpring = useSpring(rotate, { damping: 14, stiffness: 95 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-section relative border-b border-border overflow-hidden"
    >
      {/* Background section number */}
      <div
        className="section-bg-number absolute -left-6 top-4 select-none pointer-events-none"
        aria-hidden="true"
      >
        03
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-label font-mono text-accent uppercase tracking-[0.2em]">03</span>
              <div className="h-px w-16 bg-accent/30" />
              <span className="text-label font-mono text-text-muted uppercase tracking-[0.15em]">Works</span>
            </div>
            <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-tight text-text-primary tracking-tight">
              Selected Work<span className="text-accent">.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-body-md text-text-secondary max-w-xs leading-relaxed">
              Crafted digital experiences and platforms — built for real impact.
            </p>
          </ScrollReveal>
        </div>

        {/* Project chapters */}
        <div>
          {projects.map((project, i) => (
            <ProjectChapter
              key={project.title}
              project={project}
              index={i}
              onHover={setHoveredIndex}
            />
          ))}
        </div>
      </div>

      {/* ── Floating hover preview card ──────────────────────────────── */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          rotate: rotateSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute top-0 left-0 w-[310px] pointer-events-none z-20 overflow-hidden rounded-2xl border border-border bg-bg-surface shadow-surface-lg hidden lg:block"
        animate={
          hoveredIndex !== null
            ? { scale: 1, opacity: 1 }
            : { scale: 0.72, opacity: 0 }
        }
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
      >
        {/* Slide strip */}
        <div
          className="flex flex-col"
          style={{
            transform: `translateY(-${(hoveredIndex ?? 0) * 100}%)`,
            transition: "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {projects.map((proj) => (
            <div
              key={proj.title}
              className="relative shrink-0 bg-bg-secondary overflow-hidden"
              style={{ height: "190px", width: "310px" }}
            >
              <Image
                src={proj.image}
                alt={proj.title}
                fill
                sizes="310px"
                className="object-cover"
              />
              {/* Caption overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-bg-primary/95 to-transparent">
                <span className="text-[8px] font-mono uppercase tracking-widest text-text-muted block">
                  {proj.type}
                </span>
                <span className="text-xs font-display font-bold text-text-primary">
                  {proj.title}
                </span>
                <p className="text-[9px] text-text-secondary mt-0.5 line-clamp-1">
                  {proj.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
