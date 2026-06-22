"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer";

const techStack = [
  "React.js", "Next.js", "JavaScript", "Redux",
  "Node.js", "MongoDB", "Tailwind", "Figma",
];

function RotatingBadge() {
  return (
    <div className="absolute -right-6 -top-6 w-24 h-24 md:w-28 md:h-28 pointer-events-none z-20">
      <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin-slow_16s_linear_infinite]">
        <defs>
          <path
            id="circlePath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          />
        </defs>
        <text className="text-[9.5px] uppercase tracking-[0.32em] fill-text-muted/65 font-mono">
          <textPath xlinkHref="#circlePath">
            Frontend • Developer • Creative •{" "}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
      </div>
    </div>
  );
}

export default function About() {
  const photoRef = useRef(null);
  const isPhotoInView = useInView(photoRef, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-section relative overflow-hidden border-b border-border/30">
      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label — positioned uniquely */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-label font-mono text-accent uppercase tracking-[0.2em]">01</span>
            <div className="h-px w-[60px] bg-accent/30" />
            <span className="text-label font-mono text-text-muted uppercase tracking-[0.15em]">Profile</span>
          </div>
        </ScrollReveal>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Photo Frame with offsets */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start relative">
            <motion.div
              ref={photoRef}
              initial={{ opacity: 0, y: 50, rotate: -2 }}
              animate={isPhotoInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              data-cursor="HELLO 👋"
            >
              {/* Photo wrapper */}
              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-lg overflow-hidden border border-border shadow-md bg-bg-secondary">
                <Image
                  src="/person.jpg"
                  alt="Raiyan Ahmed"
                  fill
                  className="object-cover transition-transform duration-slow hover:scale-105"
                  sizes="(max-width: 768px) 256px, 288px"
                  priority
                />
                <div className="absolute inset-0 bg-accent/0 hover:bg-accent/5 transition-colors duration-normal" />
              </div>

              {/* Behind offset card */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-lg border border-accent/15 -z-10" />

              {/* Rotating circular badge */}
              <RotatingBadge />
            </motion.div>
          </div>

          {/* Right Column: Bio details */}
          <div className="lg:col-span-7 space-y-8 lg:pt-4">
            <div className="space-y-4">
              <ScrollReveal delay={0.1}>
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                  Biography / Vision
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <h2 className="text-display-md font-display font-black leading-[1.05] text-text-primary">
                  Not just another developer<span className="text-accent">.</span>
                </h2>
              </ScrollReveal>
            </div>

            <div className="space-y-6">
              <ScrollReveal delay={0.25}>
                <p className="text-body-lg text-text-secondary leading-[1.8] font-normal">
                  I am someone who believes that user interfaces should feel <em className="text-text-primary not-italic font-bold">effortless</em>. Having shipped production code across dynamic e-commerce modules and massive legacy refactors, I know that visual details and motion shape the overall brand experience.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.35}>
                <p className="text-body-md text-text-secondary leading-[1.8] font-normal">
                  Based in Pernambut, Tamil Nadu, I graduated with a B.Sc. in Computer Science. Fluent in English, Tamil, and Urdu. I bridge the gap between design vision and technical execution.
                </p>
              </ScrollReveal>
            </div>

            {/* Daily Drivers */}
            <ScrollReveal delay={0.45}>
              <div className="pt-6 border-t border-border/30">
                <span className="block font-mono text-[9px] uppercase tracking-widest text-text-muted mb-4">
                  Daily Stack
                </span>
                <StaggerContainer className="flex flex-wrap gap-2.5" stagger={0.06} delayStart={0.5}>
                  {techStack.map((tech) => (
                    <StaggerItem key={tech}>
                      <motion.span
                        whileHover={{ y: -3, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 450, damping: 12 }}
                        className="px-4 py-1.5 rounded-full text-xs font-mono bg-bg-surface border border-border text-text-secondary hover:text-accent hover:border-accent/40 transition-colors duration-fast inline-block"
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
