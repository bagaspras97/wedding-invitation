"use client";
import { motion } from "framer-motion";
import { venueImage, weddingDate } from "@/lib/content";
import Countdown from "./Countdown";

const fmtFull = (d: Date) =>
  d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function SaveTheDate() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={venueImage} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ivory/85" />
      </div>
      <div className="container-narrow py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow">Save the Date</p>
          <h2 className="h-display mt-4 text-4xl md:text-5xl">{fmtFull(weddingDate)}</h2>
          <p className="mt-4 text-stone">Menghitung mundur menuju hari bahagia</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          <Countdown target={weddingDate} />
        </motion.div>
      </div>
    </section>
  );
}
