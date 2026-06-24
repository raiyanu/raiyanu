"use client";
import { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-[10px] tabular-nums text-text-muted">
      {time} IST
    </span>
  );
}

const socials = [
  { href: "https://github.com/raiyanu",          icon: Github,   label: "GitHub" },
  { href: "https://linkedin.com/in/c-raiyan",    icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:raiyan.c.me@gmail.com",        icon: Mail,     label: "Email" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-border/30">
      <div className="max-w-content mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Left: copyright + live clock */}
          <div className="flex items-center gap-4 text-text-muted">
            <span className="font-mono text-[10px] uppercase tracking-wider">
              © {year} Raiyan Ahmed
            </span>
            <span className="h-3 w-px bg-border/60" />
            <LiveClock />
          </div>

          {/* Right: social links */}
          <div className="flex items-center gap-1">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                aria-label={social.label}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="p-2.5 rounded-lg text-text-muted hover:text-accent hover:bg-accent-soft transition-colors duration-fast"
              >
                <social.icon size={15} strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
