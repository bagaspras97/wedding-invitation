"use client";
import { motion } from "framer-motion";
import { story } from "@/lib/content";

export default function Story() {
  return (
    <section id="cerita" className="bg-ivory py-28 md:py-36">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow">Cerita Kami</p>
          <h2 className="h-display mt-4 text-4xl md:text-5xl">
            Perjalanan dua hati menjadi satu
          </h2>
          <p className="mt-6 text-stone">
            Setiap kisah cinta adalah istimewa, namun kisah kami adalah favorit kami.
          </p>
        </motion.div>

        <div className="mt-20 space-y-28 md:space-y-36">
          {story.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={s.chapter}
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
                  reverse ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="aspect-[4/5] w-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: reverse ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="eyebrow">Bab {String(i + 1).padStart(2, "0")} · {s.chapter}</p>
                  <h3 className="h-display mt-4 text-3xl md:text-4xl">{s.title}</h3>
                  <p className="mt-6 leading-relaxed text-stone">{s.body}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
