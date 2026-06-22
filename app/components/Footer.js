"use client";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-body-sm text-text-muted">
              <span>© {currentYear} Raiyan Ahmed.</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:flex items-center gap-1">
                Built with <Heart size={12} className="text-accent" /> using Next.js
              </span>
            </div>

            <div className="flex items-center gap-1">
              {[
                { href: "https://github.com/raiyanu", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com/in/c-raiyan", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:raiyan.c.me@gmail.com", icon: Mail, label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="p-2.5 rounded-lg text-text-muted hover:text-accent hover:bg-accent-soft transition-all duration-fast"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
