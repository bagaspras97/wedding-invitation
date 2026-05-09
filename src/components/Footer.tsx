"use client";

import Image from "next/image";
import { motion } from "framer-motion";
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <Image
          src="/images/chapter3-story2.jpg"
          alt="Yolla and Pras closing portrait"
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,38,32,0.26),rgba(20,17,14,0.7))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_52%)]" />

        <motion.div
          initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-[46rem] px-6 text-center"
        >
          <p className="font-display text-[clamp(3.1rem,9vw,7.6rem)] leading-[0.88] tracking-[-0.035em] text-ivory drop-shadow-[0_8px_26px_rgba(0,0,0,0.35)]">
            you&rsquo;re my favorite person to do anything with for the rest of my life.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
