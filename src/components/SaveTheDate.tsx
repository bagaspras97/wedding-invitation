"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { events, venueImage, weddingDate } from "@/lib/content";
import Countdown from "./Countdown";

const fmtFull = (d: Date) =>
  d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(1.9rem,4.3vw,3.65rem)] font-semibold leading-none tracking-[-0.035em] text-ink"
          >
            so please join us...
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="h-display mt-10 text-[clamp(3.65rem,12vw,10.6rem)] leading-[0.9] tracking-[-0.055em] text-ink md:mt-14"
          >
            {fmtFull(weddingDate)}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 w-full md:mt-12"
          >
            <Countdown target={weddingDate} />
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: imageOpacity, y: imageY, scale: imageScale }}
          className="absolute inset-x-0 bottom-0 z-20 mx-auto h-[84vh] max-w-[1500px] px-4 pb-8 md:h-[88vh] md:px-10"
        >
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-[#efe8dc] shadow-[0_30px_120px_-70px_rgba(43,38,32,0.55)] ring-1 ring-ink/10 md:rounded-[2.4rem]">
            <img
              src={venueImage}
              alt=""
              className="h-full w-full object-cover"
              style={{ filter: "brightness(1.08) sepia(0.08) saturate(0.9) contrast(0.94)" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ivory/10 via-transparent to-[#2b2620]/45" />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-8 text-center text-ivory md:px-10 md:pb-12">
              <p className="font-display text-[clamp(2.1rem,5vw,4.6rem)] leading-none tracking-[-0.045em]">
                {venue.venue}
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-ivory/82 md:text-base">
                {venue.address}
              </p>
              <a
                href={venue.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex rounded-full bg-ivory px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-ink shadow-[0_18px_40px_-28px_rgba(0,0,0,0.65)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015]"
              >
                Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
