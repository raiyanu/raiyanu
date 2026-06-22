"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";

const skillGroups = [
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "HTML5", "CSS3", "Node.js"],
  },
  {
    category: "Frameworks",
    items: ["React.js", "Next.js", "AstroJS", "Express.js", "Redux"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Bootstrap", "Styled Components", "Framer Motion"],
  },
  {
    category: "Tools",
    items: ["Git", "MongoDB", "Pocketbase", "Vite", "Postman", "Sanity.io"],
  },
  {
    category: "Design",
    items: ["Figma", "Adobe XD", "Penpot", "Canva"],
  },
];

const certs = [
  "Tailwind CSS 3 — LinkedIn Learning",
  "MongoDB Essential — LinkedIn Learning",
  "JavaScript Essential — LinkedIn Learning",
  "Express Essentials — LinkedIn Learning",
  "Advanced Node.js — LinkedIn Learning",
  "Postman Essential — LinkedIn Learning",
  "Web Dev Bootcamp — TIET",
];

function SkillRow({ group, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-12 py-6 border-b border-border/30 last:border-b-0 group"
    >
      {/* Category — fixed width label */}
      <span className="text-xs font-mono text-accent uppercase tracking-widest sm:w-32 shrink-0 pt-1">
        0{index + 1} / {group.category}
      </span>

      {/* Skills — flowing text, not pills */}
      <div className="flex flex-wrap gap-x-5 gap-y-3 flex-1">
        {group.items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.08 + 0.15 + i * 0.04 }}
            whileHover={{ x: 6, color: "var(--accent)" }}
            className="text-body-md text-text-secondary transition-all duration-fast relative group/skill font-medium"
            data-cursor={item}
          >
            {item}
            {i < group.items.length - 1 && (
              <span className="text-text-muted/20 ml-5 select-none font-normal">·</span>
            )}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-section relative overflow-hidden border-b border-border/30">
      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-label font-mono text-accent uppercase tracking-[0.2em]">04</span>
            <div className="h-px w-[60px] bg-accent/30" />
            <span className="text-label font-mono text-text-muted uppercase tracking-[0.15em]">Skills</span>
          </div>
        </ScrollReveal>

        {/* Section Title */}
        <ScrollReveal delay={0.1} className="mb-14">
          <h2 className="text-display-md font-display font-black text-text-primary">
            Technical Stack<span className="text-accent">.</span>
          </h2>
        </ScrollReveal>

        {/* Skills Directory */}
        <div className="max-w-3xl lg:ml-[12%] mb-20">
          {skillGroups.map((group, i) => (
            <SkillRow key={group.category} group={group} index={i} />
          ))}
        </div>

        {/* Certifications Block */}
        <div className="max-w-3xl lg:ml-[12%] pt-10 border-t border-border/30">
          <ScrollReveal className="mb-8">
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
              Professional Credentials
            </span>
          </ScrollReveal>

          <div className="flex flex-wrap gap-2.5">
            {certs.map((cert, i) => (
              <motion.span
                key={cert}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, borderColor: "var(--accent)" }}
                className="px-4 py-2 rounded-lg text-body-sm text-text-secondary border border-border bg-bg-surface hover:text-accent transition-all duration-normal"
              >
                {cert}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
