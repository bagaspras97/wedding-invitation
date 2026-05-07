"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "center" | "start";
  size?: "default" | "lg";
  descriptionMaxWidth?: string;
  descriptionSize?: "default" | "compact";
  className?: string;
};

const titleSizeMap = {
  default: "text-[clamp(4rem,9vw,8.2rem)] tracking-[-0.065em]",
  lg: "text-[clamp(4.5rem,10vw,8.5rem)] tracking-[-0.06em]",
};

const descriptionSizeMap = {
  default: "text-base md:text-lg",
  compact: "text-sm md:text-base",
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  size = "default",
  descriptionMaxWidth = "max-w-2xl",
  descriptionSize = "default",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`${isCenter ? "text-center" : ""} ${className}`.trim()}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`mt-5 font-display ${titleSizeMap[size]} font-light leading-[0.86] text-ink`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 ${isCenter ? "mx-auto" : ""} ${descriptionMaxWidth} ${descriptionSizeMap[descriptionSize]} leading-relaxed text-stone`.trim()}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
