"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const introText = "you're cordially invited to celebrate the story of...";

export default function InvitationIntro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 42%"],
  });
  const words = introText.split(" ");

  return (
    <section ref={ref} className="bg-ivory px-6 py-28 md:py-44">
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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
                  progress={scrollYProgress}
                />
              ))}
              {wordIndex < words.length - 1 && (
                <span className="inline-block w-[0.16em] md:w-[0.13em]" aria-hidden="true" />
              )}
            </span>
          );
        })}
      </motion.h2>
    </section>
  );
}

function IntroChar({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = Math.min(1, start + 0.16);
  const color = useTransform(progress, [start, end], ["#a8a39b", "#2b2620"]);

  return (
    <motion.span style={{ color }} className="inline-block">
      {char}
    </motion.span>
  );
}
