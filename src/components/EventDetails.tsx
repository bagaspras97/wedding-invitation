"use client";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar } from "lucide-react";
import { events } from "@/lib/content";

const fmtDate = (d: Date) =>
  d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

export default function EventDetails() {
  return (
    <section id="acara" className="bg-cream py-28 md:py-36">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow">Detail Acara</p>
          <h2 className="h-display mt-4 text-4xl md:text-5xl">Rangkaian Acara</h2>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {events.map((e, i) => (
            <motion.article
              key={e.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="border border-ink/10 bg-ivory p-10 text-center"
            >
              <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="h-display mt-3 text-3xl md:text-4xl">{e.title}</h3>
              <div className="mx-auto my-6 h-px w-12 bg-accent/60" />
              <ul className="space-y-3 text-sm text-stone">
                <li className="flex items-center justify-center gap-2">
                  <Calendar size={14} className="text-accent" /> {fmtDate(e.date)}
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Clock size={14} className="text-accent" /> {e.time}
                </li>
                <li className="flex items-center justify-center gap-2">
                  <MapPin size={14} className="text-accent" /> {e.venue}
                </li>
              </ul>
              <p className="mt-4 text-xs text-stone/80">{e.address}</p>
              <a
                href={e.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full border border-ink/20 px-6 py-2 text-xs uppercase tracking-widest2 text-ink transition hover:border-accent hover:text-accent"
              >
                Lihat Lokasi
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
