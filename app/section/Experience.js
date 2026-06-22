"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "../components/ScrollReveal";

const experiences = [
  {
    role: "Software Engineer",
    company: "Colan Infotech",
    period: "Nov 2024 – Present",
    detail: "Lead front-end engineering for high-performance React applications, translating core design concepts into interactive web systems.",
    projects: [
      {
        name: "6thStreet E-commerce",
        period: "Apr 2025 – Present",
        text: "ScandiPWA e-commerce architecture by Apparel Group — refactored core modules, optimized bundle delivery, and resolved complex analytical setups in a high-traffic production environment.",
      },
      {
        name: "ontoRX Dashboard",
        period: "Apr – Jun 2025",
        text: "Migrated legacy dashboards to unified React.js layouts. Created a custom metadata-driven CRUD form engine that generates dynamic fields at runtime.",
      },
    ],
  },
  {
    role: "Full Stack Intern",
    company: "Aspira Systems",
    period: "Oct 2023 – Sep 2024",
    detail: "Focused on modern JavaScript platforms, state management architectures, and cross-browser performance optimizations.",
    projects: [],
  },
];

function TimelineCard({ exp, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-8 md:gap-16 border-b border-border/30 py-10 md:py-14 last:border-b-0"
    >
      {/* Left side: Date Period (editorial look) */}
      <div className="w-24 md:w-36 shrink-0 pt-1 font-mono text-[10px] text-text-muted uppercase tracking-widest">
        {exp.period}
      </div>

      {/* Right side: Role details & Project cards */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">
            {exp.company}
          </span>
          <h3 className="text-xl md:text-2xl font-display font-semibold text-text-primary">
            {exp.role}
          </h3>
        </div>

        <p className="text-body-md text-text-secondary leading-relaxed max-w-xl">
          {exp.detail}
        </p>

        {exp.projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {exp.projects.map((proj, pi) => (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: index * 0.15 + 0.3 + pi * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-5 rounded-lg border border-border bg-bg-surface hover:border-accent/30 hover:shadow-sm transition-all duration-normal"
                data-cursor="Project"
              >
                <div className="flex flex-col gap-1.5 mb-3">
                  <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">
                    {proj.period}
                  </span>
                  <h4 className="text-body-sm font-bold text-text-primary group-hover:text-accent">
                    {proj.name}
                  </h4>
                </div>
                <p className="text-body-sm text-text-secondary leading-relaxed">
                  {proj.text}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-section relative overflow-hidden border-b border-border/30">
      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-label font-mono text-accent uppercase tracking-[0.2em]">02</span>
            <div className="h-px w-[60px] bg-accent/30" />
            <span className="text-label font-mono text-text-muted uppercase tracking-[0.15em]">Log</span>
          </div>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal delay={0.1}>
          <h2 className="text-display-md font-display font-black text-text-primary mb-12">
            Work Experience<span className="text-accent">.</span>
          </h2>
        </ScrollReveal>

        {/* Timeline Log */}
        <div className="max-w-3xl lg:ml-[12%]">
          {experiences.map((exp, i) => (
            <TimelineCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>

        {/* Education Sub-block */}
        <div className="mt-16 pt-10 border-t border-border/30 max-w-3xl lg:ml-[12%] flex flex-col md:flex-row gap-6 md:gap-16">
          <ScrollReveal className="w-24 md:w-36 shrink-0">
            <span className="text-label font-mono text-accent uppercase tracking-[0.15em]">
              Education
            </span>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1} className="flex-1 flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-border/10 pb-4">
              <h4 className="text-body-lg font-semibold text-text-primary">
                B.Sc. Computer Science
              </h4>
              <span className="font-mono text-xs text-text-muted">2021 – 2024</span>
            </div>
            <p className="text-body-sm text-text-secondary">
              Mazharul Uloom College, Ambur. Graduated with a robust core in software algorithms and computation.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
