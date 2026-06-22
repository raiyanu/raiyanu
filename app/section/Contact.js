"use client";
import { Mail, Phone, MapPin, Linkedin, Github, ArrowUpRight, Send } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import MagneticWrap from "../components/MagneticWrap";
import { motion } from "framer-motion";

const contactItems = [
  { icon: Mail, label: "Email", value: "raiyan.c.me@gmail.com", href: "mailto:raiyan.c.me@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 73396 77034", href: "tel:+917339677034" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/c-raiyan", href: "https://linkedin.com/in/c-raiyan" },
  { icon: Github, label: "GitHub", value: "github.com/raiyanu", href: "https://github.com/raiyanu" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-section relative overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20">
        {/* Section label */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-label font-mono text-accent uppercase tracking-[0.2em]">05</span>
            <div className="h-px w-[60px] bg-accent/30" />
            <span className="text-label font-mono text-text-muted uppercase tracking-[0.15em]">Contact</span>
          </div>
        </ScrollReveal>

        {/* Editorial Split Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal delay={0.1}>
              <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                Collaborate / Inquire
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h2 className="text-display-md font-display font-black leading-[1.05] text-text-primary">
                Got a project?<br />
                <span className="text-gradient">Let&apos;s build</span>.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-body-lg text-text-secondary leading-relaxed max-w-md">
                I am always open to full-time engineering roles, freelance collaborations, or discussing creative web technology concepts.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.35} className="pt-4">
              <MagneticWrap strength={0.2}>
                <a
                  href="mailto:raiyan.c.me@gmail.com"
                  data-cursor="SAY HI"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-text-primary text-text-inverse font-medium text-xs tracking-wider uppercase hover:shadow-md transition-all duration-normal overflow-hidden"
                >
                  <Send size={13} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-fast" />
                  <span className="relative z-10">Drop Me A Line</span>
                  <div className="absolute inset-0 bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-slow ease-out-expo" />
                </a>
              </MagneticWrap>
            </ScrollReveal>
          </div>

          {/* Right Column: Details Stack */}
          <div className="lg:col-span-6 lg:pl-8">
            <ScrollReveal delay={0.2}>
              <div className="border-t border-border/30">
                {contactItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    data-cursor={item.label}
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-center justify-between py-6 border-b border-border/30 hover:border-accent/30 transition-all duration-fast"
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                        {item.label}
                      </span>
                      <span className="text-body-md font-medium text-text-primary group-hover:text-accent transition-colors duration-fast truncate">
                        {item.value}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-fast opacity-50 group-hover:opacity-100"
                    />
                  </motion.a>
                ))}

                {/* Location — non-interactive row */}
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 py-6"
                >
                  <MapPin size={18} strokeWidth={1.5} className="text-text-muted shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                      Location
                    </span>
                    <span className="text-body-sm font-medium text-text-primary">
                      Pernambut, Tamil Nadu, India
                    </span>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
