"use client";

import { motion } from "framer-motion";

const lines = [
  "The vision for the day is simple:",
  "all of our most beloved people in one place that happens to have",
  "a sun-drenched garden, warm smiles, and a joyful celebration from morning to noon.",
];

export default function CelebrationVision() {
  return (
    <section className="overflow-hidden bg-ivory px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl border-y border-ink/10 py-12 text-center md:py-18">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          The Day
        </motion.p>

        <div className="mt-7 space-y-1 md:mt-9">
          {lines.map((line, index) => (
            <motion.p
              key={line}
              initial={{ y: 26, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{
                duration: 0.85,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-display mx-auto max-w-5xl text-balance text-[clamp(2rem,4.25vw,4.65rem)] leading-[1.02] tracking-[-0.05em] text-ink"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
