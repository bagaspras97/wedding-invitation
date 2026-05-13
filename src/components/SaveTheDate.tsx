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

const shortDate = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(d);

const springIn = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

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
      <div className="sticky top-0 min-h-[100dvh] overflow-hidden bg-ivory">
        <motion.div
          style={{ opacity: dateOpacity, y: dateY, scale: dateScale }}
          className="absolute inset-0 z-10 flex items-center px-5 py-8 md:px-10 md:py-14"
        >
          <div className="mx-auto w-full max-w-[1180px]">
            <div>
              <motion.p
                variants={springIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="eyebrow text-center"
              >
                Save The Date
              </motion.p>

              <motion.h2
                variants={springIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 whitespace-nowrap text-center font-display text-[clamp(2.35rem,8vw,6.35rem)] font-light leading-none tracking-[-0.06em] text-ink md:mt-5"
              >
                {fmtWeekday(weddingDate)}, {fmtDateLine(weddingDate)}
              </motion.h2>

              <motion.div
                variants={springIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.95, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className="relative mt-7 overflow-hidden rounded-[1.1rem] border border-ink/10 bg-[#f8f2e8]/80 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_24px_60px_-42px_rgba(43,38,32,0.42)] md:mt-8 md:rounded-[1.35rem] md:px-7 md:py-6"
              >
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                  initial={{ x: "-130%" }}
                  animate={reduceMotion ? { x: "-130%" } : { x: ["-130%", "330%"] }}
                  transition={{ duration: 5.8, repeat: Infinity, repeatDelay: 2.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-dashed border-ink/18 pb-3 md:mb-5 md:pb-4">
                  <p className="flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.28em] text-stone md:text-[11px]">
                    <motion.span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: [0.55, 1, 0.55], scale: [1, 1.55, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <span>Countdown</span>
                  </p>
                  <p className="hidden text-[10px] uppercase tracking-[0.24em] text-stone/80 sm:block">
                    To the wedding day
                  </p>
                </div>
                <Countdown target={weddingDate} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-8"
              >
                {events.map((event, index) => (
                  <motion.article
                    key={event.title}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    className="border-t border-dashed border-ink/35 pt-4 md:pt-5"
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.34 + index * 0.1 }}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-[clamp(1.55rem,3.2vw,2.45rem)] font-light italic leading-none tracking-[-0.035em] text-ink">
                        {event.title}
                      </h3>
                      <span className="font-display text-2xl font-light leading-none text-accent/80 md:text-3xl">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-1.5 text-sm leading-relaxed text-ink/76 md:text-base">
                      {/* <p>{shortDate(event.date)}</p> */}
                      <p>{event.time}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
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
