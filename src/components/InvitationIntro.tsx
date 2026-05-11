"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

const introText = "you're cordially invited to celebrate the story of...";
const coupleDetails = [
  {
    name: "Yolla Lisandra, S.Pd., Gr.",
    family: "First daughter of Mr. Suprapto and Mrs. Herliana Kusuma Atmaja",
  },
  {
    name: "Prasetyo Laksono, S.Kom.",
    family: "First son of (Alm) Mr. Prayogo and Mrs. Siti Suparnidjah",
  },
];

export default function InvitationIntro() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 76%", "end 38%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.3,
  });
  const y = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [18, -10]);
  const opacity = useTransform(progress, [0, 0.16, 1], [0.72, 1, 1]);
  const scale = useTransform(progress, [0, 1], reduceMotion ? [1, 1] : [0.985, 1]);
  const textRevealProgress = useTransform(progress, [0, 0.46], [0, 1]);
  const words = introText.split(" ");

  return (
    <section
      ref={ref}
      className="relative z-10 bg-ivory px-6 pb-28 pt-24 md:mt-0 md:pb-44 md:pt-36"
    >
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ y, opacity, scale }}
        className="mx-auto max-w-[94vw] text-center font-display text-[clamp(2.55rem,8vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.035em] md:max-w-none md:whitespace-nowrap md:text-[clamp(2.75rem,4.35vw,5.45rem)] md:leading-[0.9] md:tracking-[-0.045em]"
      >
        {words.map((word, wordIndex) => {
          const previousLength = words
            .slice(0, wordIndex)
            .reduce((count, item) => count + item.length, 0);

          return (
            <span key={word} className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, charIndex) => (
                <IntroChar
                  key={`${word}-${char}-${charIndex}`}
                  char={char}
                  index={previousLength + charIndex}
                  total={introText.replaceAll(" ", "").length}
                  progress={textRevealProgress}
                  reduceMotion={reduceMotion}
                />
              ))}
              {wordIndex < words.length - 1 && (
                <span className="inline-block w-[0.16em] md:w-[0.13em]" aria-hidden="true" />
              )}
            </span>
          );
        })}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-14 grid max-w-5xl gap-8 border-y border-ink/10 py-9 text-center md:mt-18 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 md:py-11"
      >
        {coupleDetails.map((person, index) => (
          <div key={person.name} className="contents">
            {index === 1 ? (
              <div
                aria-hidden="true"
                className="mx-auto -my-2 grid size-16 place-items-center rounded-full border border-ink/10 bg-ivory font-display text-5xl font-light italic leading-none text-stone md:my-0 md:size-20 md:text-6xl"
              >
                &
              </div>
            ) : null}
            <article className="px-2">
              <h3 className="font-display text-[clamp(2.05rem,8vw,3.35rem)] font-light italic leading-[0.95] text-ink md:text-[clamp(2.25rem,3.7vw,4rem)]">
                {person.name}
              </h3>
              <p className="mx-auto mt-4 max-w-[22rem] text-[0.72rem] uppercase leading-[1.7] tracking-[0.15em] text-stone md:text-[0.78rem]">
                {person.family}
              </p>
            </article>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function IntroChar({
  char,
  index,
  total,
  progress,
  reduceMotion,
}: {
  char: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean | null;
}) {
  const start = index / total;
  const end = Math.min(1, start + 0.16);
  const color = useTransform(progress, [start, end], reduceMotion ? ["#2b2620", "#2b2620"] : ["#aaa49b", "#2b2620"]);
  const y = useTransform(progress, [start, end], reduceMotion ? [0, 0] : [6, 0]);

  return (
    <motion.span style={{ color, y }} className="inline-block will-change-transform">
      {char}
    </motion.span>
  );
}
