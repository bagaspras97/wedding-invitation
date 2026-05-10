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
          className="relative z-10 mx-auto max-w-[58rem] px-6 text-center"
        >
          <p className="font-display text-[clamp(1.6rem,4.7vw,4.8rem)] leading-[1.02] tracking-[-0.035em] text-ivory drop-shadow-[0_8px_26px_rgba(0,0,0,0.35)]">
            And among His signs is that He created for you spouses from among yourselves, that you may
            find tranquility in them, and He placed between you affection and mercy.
          </p>
          <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.32em] text-ivory/70 md:mt-7 md:text-xs">
            Ar-Rum 30:21
          </p>
        </motion.div>

        <div className="absolute inset-x-0 bottom-8 z-10 px-6 text-center text-ivory md:bottom-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-ivory/85 md:text-xs">
            #foreverTYOurs
          </p>
          <p className="mt-3 text-[9px] uppercase tracking-[0.28em] text-ivory/55 md:text-[10px]">
            Yolla & Pras
          </p>
        </div>
      </div>
    </footer>
  );
}
