"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "../components/ScrollReveal";
import MagneticWrap from "../components/MagneticWrap";

const projects = [
  {
    title: "6thStreet",
    subtitle: "E-commerce Platform — Apparel Group",
    description:
      "Large-scale ScandiPWA e-commerce. New features across business-critical modules, performance optimizations, production debugging, analytics integration. Fast-paced, multi-team environment.",
    technologies: ["React", "ScandiPWA", "Redux", "GraphQL"],
    type: "Professional",
    image: "/project_6thstreet.png",
  },
  {
    title: "ontoRX",
    subtitle: "Dashboard Migration",
    description:
      "Legacy ASP.NET → modern React.js. Clean minimalist design. Dynamic CRUD form system — generates custom forms and fields at runtime.",
    technologies: ["React", "JS", "CSS"],
    type: "Professional",
    image: "/project_ontorx.png",
  },
  {
    title: "Foodie-Site",
    subtitle: "Restaurant Platform",
    description:
      "Dynamic data from Sanity.io CMS, responsive masonry layout, QR code menu integration. Performance-optimized content delivery with smooth loading states.",
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
    subtitle: "Fitness Website",
    description:
      "Semantic HTML & CSS with responsive design, functional chatbot UI, form validations, and dynamic content. Clean, accessible, and performant.",
    technologies: ["HTML", "CSS", "JavaScript"],
    links: {
      github: "https://github.com/raiyanu/chad-gym",
      live: "https://raiyanu.github.io/chad-gym",
    },
    type: "Personal",
    image: "/project_chadgym.png",
  },
];

function ProjectRow({ project, index, setHoveredIndex }) {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="w-full border-b border-border py-10 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative group z-10 transition-colors duration-fast hover:border-accent/40"
      data-cursor-project={project.title}
      data-cursor-category={project.type}
    >
      {/* Left Side: Number + Title */}
      <div className="flex flex-col gap-1.5 max-w-md">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-text-muted">0{index + 1}</span>
          <h3 className="text-3xl md:text-4xl font-display font-semibold text-text-primary group-hover:text-accent transition-colors duration-fast flex items-center gap-2">
            {project.title}
            <ArrowUpRight
              size={24}
              className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-normal"
            />
          </h3>
        </div>
        <span className="text-body-sm text-text-muted pl-6">{project.subtitle}</span>
      </div>

      {/* Middle: Description snippet */}
      <div className="md:max-w-xs text-body-sm text-text-secondary pl-6 md:pl-0 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-fast">
        {project.description}
      </div>

      {/* Right Side: Tech tags & Link symbols */}
      <div className="flex items-center gap-6 pl-6 md:pl-0 w-full md:w-auto justify-between md:justify-end">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 max-w-[150px] justify-end">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono px-2 py-0.5 rounded bg-bg-secondary text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.links && (
          <div className="flex gap-4">
            {project.links.github && (
              <MagneticWrap strength={0.3}>
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="code"
                  className="text-text-secondary hover:text-accent transition-colors p-1"
                  aria-label="View source code"
                >
                  <Github size={18} strokeWidth={1.5} />
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
                  className="text-text-secondary hover:text-accent transition-colors p-1"
                  aria-label="Open live site"
                >
                  <ExternalLink size={18} strokeWidth={1.5} />
                </a>
              </MagneticWrap>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Project() {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Mouse coordinate springs for floating preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 220, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 220, mass: 0.5 });

  // Add mouse velocity tilt effect!
  const mouseXVelocity = useVelocity(mouseX);
  const rotate = useTransform(mouseXVelocity, [-3000, 3000], [-15, 15]);
  const rotateSpring = useSpring(rotate, { damping: 15, stiffness: 100 });

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
      className="py-section relative border-b border-border bg-transparent overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <ScrollReveal>
              <div className="flex items-center gap-4">
                <span className="text-label font-mono text-accent uppercase tracking-[0.2em]">03</span>
                <div className="h-px w-[60px] bg-accent/30" />
                <span className="text-label font-mono text-text-muted uppercase tracking-[0.15em]">Works</span>
              </div>
              <h2 className="text-display-md font-display font-bold text-text-primary mt-4">
                Selected Work<span className="text-accent">.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-body-md text-text-secondary max-w-md">
                A selection of digital experiences and platforms crafted for professional clients and personal experiments.
              </p>
            </ScrollReveal>
          </div>

          {/* Editorial Row list */}
          <div className="flex flex-col border-t border-border mt-8">
            {projects.map((project, i) => (
              <ProjectRow
                key={project.title}
                project={project}
                index={i}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>

          {/* Desktop Floating Preview Image follow */}
          <motion.div
            style={{
              x: springX,
              y: springY,
              rotate: rotateSpring,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="absolute top-0 left-0 w-[320px] h-[200px] pointer-events-none z-20 overflow-hidden rounded-xl border border-border bg-bg-surface shadow-lg hidden md:block"
            animate={hoveredIndex !== null ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
          >
            <div
              className="w-full h-full flex flex-col transition-transform duration-normal ease-out-expo"
              style={{ transform: `translateY(-${(hoveredIndex ?? 0) * 100}%)` }}
            >
              {projects.map((proj) => (
                <div key={proj.title} className="w-full h-full shrink-0 relative bg-bg-secondary overflow-hidden">
                  {proj.image && (
                    <Image
                       src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="320px"
                      className="object-cover transform scale-105"
                      priority
                    />
                  )}
                  {/* Subtle dark vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              ))}
            </div>
          </motion.div>
      </div>
    </section>
  );
}
