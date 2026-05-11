"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { events, venueImage, weddingDate } from "@/lib/content";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";
import Countdown from "./Countdown";

const fmtWeekday = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "Asia/Jakarta",
  });

const fmtDateLine = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  })
    .format(d)
    .replace(",", "");

export default function SaveTheDate() {
  const venue = events[0];
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 32,
    mass: 0.34,
  });

  const dateOpacity = useTransform(progress, [0, 0.5, 0.7], reduceMotion ? [1, 1, 1] : [1, 1, 0]);
  const dateY = useTransform(progress, [0, 0.5, 0.7], reduceMotion ? [0, 0, 0] : [0, 0, -34]);
  const dateScale = useTransform(progress, [0, 0.5, 0.7], reduceMotion ? [1, 1, 1] : [1, 1, 0.975]);
  const imageOpacity = useTransform(progress, [0.56, 0.72], reduceMotion ? [1, 1] : [0, 1]);
  const imageY = useTransform(progress, [0.54, 0.8], reduceMotion ? [0, 0] : [76, 0]);
  const imageScale = useTransform(progress, [0.54, 0.8], reduceMotion ? [1, 1] : [0.955, 1]);
  const imageInnerY = useTransform(progress, [0.6, 1], reduceMotion ? [0, 0] : [18, -10]);
  const detailsY = useTransform(progress, [0.66, 0.84], reduceMotion ? [0, 0] : [18, 0]);
  const detailsOpacity = useTransform(progress, [0.66, 0.8], reduceMotion ? [1, 1] : [0, 1]);

  return (
    <section ref={ref} className="relative h-[235vh] bg-ivory">
      <span id="google-maps" aria-hidden="true" className="absolute top-[130vh]" />
      <div className="sticky top-0 h-screen overflow-hidden bg-ivory">
        <motion.div
          style={{ opacity: dateOpacity, y: dateY, scale: dateScale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-12 pt-16 text-center md:pb-6 md:pt-24"
        >
          <div className="-translate-y-7 md:translate-y-0">
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
              className="mt-4 font-display text-[clamp(1.65rem,4vw,3.3rem)] font-light leading-none tracking-[-0.035em] text-ink md:mt-5"
            >
              so please join us...
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="h-display mt-8 flex flex-col text-[clamp(3.05rem,10vw,8.6rem)] leading-[0.92] tracking-[-0.055em] text-ink md:mt-12"
            >
              <span>{fmtWeekday(weddingDate)},</span>
              <span>{fmtDateLine(weddingDate)}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 w-full md:mt-11"
            >
              <Countdown target={weddingDate} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: imageOpacity, y: imageY, scale: imageScale }}
          className="absolute inset-x-0 bottom-0 z-20 mx-auto flex h-[90vh] max-w-[1420px] flex-col px-5 pb-6 md:h-[88vh] md:px-10 md:pb-9"
        >
          <figure className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.35rem] border border-ink/10 bg-[#f7f3eb] md:rounded-[1.65rem]">
            <div className="flex min-h-0 flex-1 flex-col justify-center px-4 py-5 md:px-5 md:py-6">
              <p className="eyebrow mb-4 text-center md:mb-5">Venue</p>
              <motion.div style={{ y: imageInnerY }} className="min-h-0 will-change-transform">
                <img
                  src={venueImage}
                  alt={venue.venue}
                  className="mx-auto h-auto max-h-[34vh] w-full rounded-[0.8rem] object-contain md:max-h-[54vh] md:rounded-[1rem]"
                  style={{ filter: "brightness(1.04) sepia(0.04) saturate(0.92) contrast(0.96)" }}
                />
              </motion.div>
              <motion.figcaption
                style={{ opacity: detailsOpacity, y: detailsY }}
                className="mt-5 px-1 text-center will-change-transform md:mt-7 md:px-5"
              >
                <p className="font-display text-[clamp(1.35rem,3.2vw,3.3rem)] leading-none tracking-[-0.04em] text-ink">
                  {venue.venue}
                </p>
                <p className="mx-auto mt-2 max-w-3xl text-xs leading-relaxed text-stone md:mt-3 md:text-base">
                  {venue.address}
                </p>
                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-[0.55rem] bg-ink px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.24em] text-ivory transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[0.985] md:mt-5 md:px-6 md:py-3 md:text-[11px]"
                >
                  Google Maps
                </a>
              </motion.figcaption>
            </div>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
