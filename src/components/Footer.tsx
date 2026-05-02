"use client";
import { motion } from "framer-motion";
import { closingQuote, couple } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-ink py-24 text-ivory">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
        >
          <p className="font-display text-2xl italic leading-relaxed text-ivory/90 md:text-3xl">
            &ldquo;{closingQuote.text}&rdquo;
          </p>
          <p className="mt-4 text-xs uppercase tracking-widest2 text-accent">
            {closingQuote.source}
          </p>
        </motion.div>

        <div className="mx-auto my-16 h-px w-24 bg-ivory/20" />

        <p className="font-display text-4xl md:text-5xl">{couple.initials}</p>
        <p className="eyebrow mt-3 text-ivory/60">{couple.hashtag}</p>
        <p className="mt-12 text-xs text-ivory/40">
          © {new Date().getFullYear()} {couple.groom.name} & {couple.bride.name}. Dibuat dengan cinta.
        </p>
      </div>
    </footer>
  );
}
