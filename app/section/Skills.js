"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import ParallaxMarquee from "../components/ParallaxMarquee";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const tools = [
  "React.js", "Next.js", "JavaScript ES6+", "TypeScript", "Redux",
  "Framer Motion", "GSAP", "Tailwind CSS", "Node.js", "MongoDB",
  "GraphQL", "Figma", "Git", "Vite", "Sanity.io",
  "CSS3", "HTML5", "Express.js", "Pocketbase", "Postman",
];

const philosophyStatements = [
  {
    statement: "Performance is a feature.",
    detail: "Every millisecond matters. Optimize ruthlessly — users feel it even when they don't notice it.",
  },
  {
    statement: "Design systems matter.",
    detail: "Consistency scales. Chaos doesn't. A solid token system is worth a thousand one-off fixes.",
  },
  {
    statement: "Every pixel has intent.",
    detail: "Purposeful design always trumps decoration. If it doesn't serve the user, it doesn't belong.",
  },
  {
    statement: "Ship fast. Refine always.",
    detail: "The best code is the code that ships and improves. Perfection is the enemy of done.",
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

/* ─── Philosophy Card ────────────────────────────────────────────────────── */

function PhilosophyCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-7 rounded-2xl border border-border bg-bg-surface hover:border-accent/40 transition-all duration-normal overflow-hidden group"
      data-cursor="Method"
    >
      {/* Glow layer */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 30% 30%, var(--accent-soft) 0%, transparent 70%)" }}
      />

      {/* Corner accent tick */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.25 }}
        className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-accent"
      />

      <p
        className="font-display font-black text-lg md:text-xl text-text-primary mb-3 group-hover:text-accent transition-colors duration-normal leading-tight relative"
      >
        &ldquo;{item.statement}&rdquo;
      </p>
      <p className="text-body-sm text-text-muted leading-relaxed relative">{item.detail}</p>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-section relative overflow-hidden border-b border-border/30"
    >
      {/* Background section number */}
      <div
        className="section-bg-number absolute -right-6 top-4 select-none pointer-events-none"
        aria-hidden="true"
      >
        04
      </div>

      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20 relative">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-14">
            <span className="text-label font-mono text-accent uppercase tracking-[0.2em]">04</span>
            <div className="h-px w-16 bg-accent/30" />
            <span className="text-label font-mono text-text-muted uppercase tracking-[0.15em]">Method</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mb-16">
          <h2 className="font-display font-black text-[clamp(2rem,5vw,3.5rem)] leading-tight text-text-primary tracking-tight">
            The way<br />I work<span className="text-accent">.</span>
          </h2>
        </ScrollReveal>
      </div>

      {/* Full-width tool marquee */}
      <ScrollReveal delay={0.15}>
        <div className="border-y border-border/30 py-4 mb-16">
          <ParallaxMarquee items={tools} speed={40} />
        </div>
      </ScrollReveal>

      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20">
        {/* Philosophy grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {philosophyStatements.map((item, i) => (
            <PhilosophyCard key={item.statement} item={item} index={i} />
          ))}
        </div>

        {/* Certifications */}
        <div className="border-t border-border/30 pt-12">
          <ScrollReveal className="mb-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                Professional Credentials
              </span>
              <div className="h-px flex-1 bg-border/50 max-w-[120px]" />
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap gap-2.5">
            {certs.map((cert, i) => (
              <motion.span
                key={cert}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, borderColor: "var(--border-accent)", color: "var(--accent)" }}
                className="px-4 py-2 rounded-xl text-body-sm text-text-secondary border border-border bg-bg-surface hover:shadow-surface transition-all duration-normal"
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
