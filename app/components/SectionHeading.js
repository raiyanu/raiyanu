"use client";
import ScrollReveal from "./ScrollReveal";

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  className = "",
}) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={`mb-12 md:mb-16 max-w-2xl ${alignClasses[align]} ${className}`}>
      {label && (
        <ScrollReveal delay={0}>
          <span className="text-label uppercase tracking-[0.15em] text-accent font-semibold mb-3 block font-mono">
            {label}
          </span>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.1}>
        <h2 className="text-display-md font-display font-bold text-text-primary mb-4">
          {title}
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.2}>
          <p className="text-body-lg text-text-secondary leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.3}>
        <div className="mt-4 flex items-center gap-3" style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
          <div className="h-[2px] w-12 bg-accent rounded-full" />
          <div className="h-[2px] w-6 bg-accent/40 rounded-full" />
          <div className="h-[2px] w-3 bg-accent/20 rounded-full" />
        </div>
      </ScrollReveal>
    </div>
  );
}
