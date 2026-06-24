"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";
import { ArrowUpRight } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const experiences = [
  {
    role: "Software Engineer",
    company: "Colan Infotech",
    period: "Nov 2024 – Present",
    detail:
      "Lead front-end engineering for high-performance React applications. Translate design concepts into interactive, production-grade web systems across multiple enterprise clients.",
    projects: [
      {
        name: "6thStreet E-commerce",
        period: "Apr 2025 – Present",
        text: "ScandiPWA e-commerce platform by Apparel Group — refactored core modules, optimized bundle delivery, and resolved complex analytics integrations in a high-traffic multi-team environment.",
        image: "/project_6thstreet.png",
        tech: ["React", "ScandiPWA", "Redux", "GraphQL"],
      },
      {
        name: "ontoRX Dashboard",
        period: "Apr – Jun 2025",
        text: "Migrated legacy ASP.NET dashboard to unified React.js architecture. Built a metadata-driven CRUD form engine that generates dynamic fields at runtime.",
        image: "/project_ontorx.png",
        tech: ["React.js", "JavaScript", "CSS"],
      },
    ],
  },
  {
    role: "Full Stack Intern",
    company: "Aspira Systems",
    period: "Oct 2023 – Sep 2024",
    detail:
      "Worked across modern JavaScript platforms, implementing state management architectures and cross-browser performance optimizations for client-facing applications.",
    projects: [],
  },
];

/* ─── Project Feature Card ───────────────────────────────────────────────── */

function ProjectFeatureCard({ project, delay, isParentVisible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isParentVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-border bg-bg-surface hover:border-accent/30 transition-all duration-normal"
      data-cursor="Project"
    >
      {/* Screenshot */}
      <div className="relative w-full aspect-video overflow-hidden bg-bg-secondary">
        <motion.div
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/80 via-bg-surface/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[8px] font-mono uppercase tracking-widest text-text-muted block mb-1">
              {project.period}
            </span>
            <h4 className="font-display font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-fast">
              {project.name}
            </h4>
          </div>
          <motion.div
            animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={18} className="text-accent shrink-0 mt-1" />
          </motion.div>
        </div>

        <p className="text-body-sm text-text-secondary leading-relaxed">{project.text}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-bg-secondary text-text-secondary border border-border/50"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Role Block ─────────────────────────────────────────────────────────── */

function RoleBlock({ exp, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.08 });
  const [headerHovered, setHeaderHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-border/30 py-12 md:py-16 last:border-b-0"
    >
      {/* Role header */}
      <div
        className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-8 border-b border-border/20"
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
      >
        {/* Animated accent underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: headerHovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "100%" }}
        />

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent">
            {exp.company}
          </span>
          <h3 className="font-display font-black text-[clamp(1.75rem,3.5vw,2.6rem)] leading-tight text-text-primary">
            {exp.role}
          </h3>
        </div>

        <span className="font-mono text-xs text-text-muted shrink-0">{exp.period}</span>
      </div>

      <p className="text-body-md text-text-secondary leading-[1.8] max-w-xl mb-10">
        {exp.detail}
      </p>

      {/* Project cards */}
      {exp.projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {exp.projects.map((proj, pi) => (
            <ProjectFeatureCard
              key={proj.name}
              project={proj}
              delay={index * 0.12 + 0.25 + pi * 0.1}
              isParentVisible={isInView}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-section relative overflow-hidden border-b border-border/30"
    >
      {/* Background section number */}
      <div
        className="section-bg-number absolute -right-6 top-4 select-none pointer-events-none"
        aria-hidden="true"
      >
        02
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20 relative">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-14">
            <span className="text-label font-mono text-accent uppercase tracking-[0.2em]">02</span>
            <div className="h-px w-16 bg-accent/30" />
            <span className="text-label font-mono text-text-muted uppercase tracking-[0.15em]">Experience</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mb-14">
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-tight text-text-primary tracking-tight">
            How I solve<br />problems<span className="text-accent">.</span>
          </h2>
        </ScrollReveal>

        {/* Role blocks */}
        <div>
          {experiences.map((exp, i) => (
            <RoleBlock key={exp.company} exp={exp} index={i} />
          ))}
        </div>

        {/* Education */}
        <div className="mt-12 pt-10 border-t border-border/30">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              <div className="md:w-48 shrink-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent block mb-1">
                  Education
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border/20 pb-3">
                  <h4 className="text-body-lg font-semibold text-text-primary">
                    B.Sc. Computer Science
                  </h4>
                  <span className="font-mono text-xs text-text-muted">2021 – 2024</span>
                </div>
                <p className="text-body-sm text-text-secondary">
                  Mazharul Uloom College, Ambur, Tamil Nadu. Strong foundation in
                  software algorithms, data structures, and computation theory.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
