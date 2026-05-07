"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { events, venueImage, weddingDate } from "@/lib/content";
import Countdown from "./Countdown";

const fmtWeekday = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
  });

const fmtDateLine = (d: Date) =>
  `${d.toLocaleDateString("en-US", { month: "long" })} ${d.getDate()} ${d.getFullYear()}`;

export default function SaveTheDate() {
  const venue = events[0];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    mass: 0.22,
  });

  const dateOpacity = useTransform(progress, [0, 0.52, 0.74], [1, 1, 0]);
  const dateY = useTransform(progress, [0, 0.52, 0.74], [0, 0, -44]);
  const dateScale = useTransform(progress, [0, 0.52, 0.74], [1, 1, 0.96]);
  const imageOpacity = useTransform(progress, [0.48, 0.66], [0, 1]);
  const imageY = useTransform(progress, [0.48, 0.76], [90, 0]);
  const imageScale = useTransform(progress, [0.48, 0.76], [0.92, 1]);

  return (
    <section ref={ref} className="relative h-[230vh] bg-ivory">
      <div className="sticky top-0 h-screen overflow-hidden bg-ivory">
        <motion.div
          style={{ opacity: dateOpacity, y: dateY, scale: dateScale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-10 pt-20 text-center md:pb-6 md:pt-24"
        >
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            Save The Date
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(1.9rem,4.3vw,3.65rem)] font-light leading-none tracking-[-0.035em] text-ink"
          >
            so please join us...
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="h-display mt-10 flex flex-col text-[clamp(3.4rem,11vw,9.3rem)] leading-[0.9] tracking-[-0.055em] text-ink md:mt-14"
          >
            <span>{fmtWeekday(weddingDate)},</span>
            <span>{fmtDateLine(weddingDate)}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 w-full md:mt-12"
          >
            <Countdown target={weddingDate} />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: imageOpacity, y: imageY, scale: imageScale }}
          className="absolute inset-x-0 bottom-0 z-20 mx-auto flex h-[86vh] max-w-[1420px] flex-col px-5 pb-7 md:h-[88vh] md:px-10 md:pb-9"
        >
          <figure className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.35rem] border border-ink/10 bg-[#f7f3eb] md:rounded-[1.65rem]">
            <div className="min-h-0 flex-1 p-3 md:p-5">
              <img
                src={venueImage}
                alt={venue.venue}
                className="h-full w-full rounded-[0.8rem] object-contain md:rounded-[1rem]"
                style={{ filter: "brightness(1.04) sepia(0.04) saturate(0.92) contrast(0.96)" }}
              />
            </div>
            <figcaption className="border-t border-ink/10 px-6 py-5 text-center md:px-10 md:py-6">
              <p className="font-display text-[clamp(1.65rem,3.6vw,3.3rem)] leading-none tracking-[-0.04em] text-ink">
                {venue.venue}
              </p>
              <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-stone md:text-base">
                {venue.address}
              </p>
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-[0.55rem] bg-ink px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-ivory transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[0.985]"
              >
                Google Maps
              </a>
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
