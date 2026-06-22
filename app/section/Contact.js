"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, ArrowUpRight, Send } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import MagneticWrap from "../components/MagneticWrap";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "raiyan.c.me@gmail.com",
    href: "mailto:raiyan.c.me@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 73396 77034",
    href: "tel:+917339677034",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "c-raiyan",
    href: "https://linkedin.com/in/c-raiyan",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "raiyanu",
    href: "https://github.com/raiyanu",
  },
];

/* ─── Text Scramble Hook ─────────────────────────────────────────────────── */

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

function useTextScramble(text) {
  const [displayed, setDisplayed] = useState(text);
  const frameRef = useRef(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIterations = text.length * 3;

    const animate = () => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "'") return char;
            if (i < Math.floor(iteration / 3)) return text[i];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration < maxIterations) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayed(text);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [text]);

  const reset = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDisplayed(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { displayed, scramble, reset };
}

/* ─── Scramble Line Component ────────────────────────────────────────────── */

function ScrambleLine({ text, className }) {
  const { displayed, scramble, reset } = useTextScramble(text);

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {displayed}
    </span>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#080706" }}
    >
      {/* Dot grid background texture */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #f0e9dc 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* Ambient accent glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(181, 150, 109, 0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Huge background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-black leading-none tracking-tighter whitespace-nowrap"
          style={{
            fontSize: "clamp(10rem, 28vw, 36rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(240, 233, 220, 0.035)",
          }}
        >
          CONTACT
        </span>
      </div>

      <div
        className="relative z-10 max-w-content mx-auto px-6 md:px-12 lg:px-20"
        style={{ paddingTop: "clamp(6rem, 14vw, 12rem)", paddingBottom: "clamp(6rem, 14vw, 12rem)" }}
      >
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-accent uppercase tracking-[0.2em]">05</span>
            <div className="h-px w-16" style={{ backgroundColor: "rgba(196, 166, 119, 0.4)" }} />
            <span className="font-mono text-xs uppercase tracking-[0.15em]" style={{ color: "#6b6357" }}>
              Contact
            </span>
          </div>
        </ScrollReveal>

        {/* Main headline with scramble */}
        <div className="mb-14">
          <ScrollReveal delay={0.1}>
            <h2
              className="font-display font-black leading-[0.9] tracking-tighter mb-6"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 6rem)",
                color: "#f0e9dc",
              }}
            >
              <ScrambleLine
                text="LET'S BUILD"
                className="block hover:cursor-default"
              />
              <ScrambleLine
                text="SOMETHING."
                className="block hover:cursor-default"
                // Inline style to set accent color for this line
              />
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <p className="text-body-lg leading-relaxed max-w-md" style={{ color: "#6b6357" }}>
              Open to full-time engineering roles, freelance collaborations, and
              conversations about creative web technology.
            </p>
          </ScrollReveal>
        </div>

        {/* Primary CTA */}
        <ScrollReveal delay={0.32} className="w-fit">
          <MagneticWrap strength={0.2} style={{ width: "fit-content" }}>
            <a
              href="mailto:raiyan.c.me@gmail.com"
              data-cursor="SAY HI"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-[11px] tracking-widest uppercase overflow-hidden transition-all duration-normal"
              style={{
                border: "1px solid rgba(240, 233, 220, 0.18)",
                color: "#f0e9dc",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0e9dc";
                e.currentTarget.style.color = "#080706";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#f0e9dc";
              }}
            >
              <Send
                size={13}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-fast"
              />
              <span>Say Hello</span>
            </a>
          </MagneticWrap>
        </ScrollReveal>

        {/* Contact link cards */}
        <ScrollReveal delay={0.42}>
          <div
            className="mt-20 pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            style={{ borderTop: "1px solid rgba(240, 233, 220, 0.08)" }}
          >
            {contactLinks.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                data-cursor={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.08 + i * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col gap-3 p-4 rounded-xl transition-all duration-normal"
                style={{
                  border: "1px solid rgba(240, 233, 220, 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(196, 166, 119, 0.3)";
                  e.currentTarget.style.backgroundColor = "rgba(240, 233, 220, 0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(240, 233, 220, 0.08)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div className="flex items-center justify-between">
                  <item.icon
                    size={16}
                    strokeWidth={1.5}
                    style={{ color: "#6b6357", transition: "color 0.15s" }}
                    className="group-hover:!text-[#c4a677] transition-colors duration-fast"
                  />
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-fast"
                    style={{ color: "#c4a677" }}
                  />
                </div>
                <div>
                  <span
                    className="block text-[8px] font-mono uppercase tracking-widest mb-1"
                    style={{ color: "#6b6357" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm font-medium group-hover:!text-[#c4a677] transition-colors duration-fast"
                    style={{ color: "#f0e9dc" }}
                  >
                    {item.value}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Location strip */}
          <div
            className="flex items-center gap-3 mt-8 font-mono text-[10px]"
            style={{ color: "#6b6357" }}
          >
            <MapPin size={12} strokeWidth={1.5} />
            <span>Pernambut, Tamil Nadu, India · IST (UTC +5:30)</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
