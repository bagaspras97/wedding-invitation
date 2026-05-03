"use client";

import { motion } from "framer-motion";
import { wishes } from "@/lib/content";

export default function Wishes() {
  return (
    <section id="ucapan" className="overflow-hidden bg-ivory px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="font-display text-[clamp(2.8rem,8vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-ink">
            ucapan dan doa
          </p>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
            Titipkan pesan hangat untuk perjalanan baru Yolla dan Pras.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <motion.form
            onSubmit={(event) => event.preventDefault()}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="md:sticky md:top-32"
          >
            <div className="border-y border-ink/12 py-8">
              <div className="space-y-6">
                <label className="block">
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-stone">
                    Nama
                  </span>
                  <input
                    type="text"
                    placeholder="Tulis nama Anda"
                    className="w-full rounded-none border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-stone/45 focus:border-ink"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-stone">
                    Ucapan
                  </span>
                  <textarea
                    rows={5}
                    placeholder="Tulis doa terbaik untuk kedua mempelai"
                    className="w-full resize-none rounded-none border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-base leading-relaxed text-ink outline-none transition-colors placeholder:text-stone/45 focus:border-ink"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-ink px-6 py-4 text-xs font-medium uppercase tracking-[0.24em] text-ivory shadow-[0_18px_48px_-32px_rgba(43,38,32,0.75)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.01] active:scale-[0.99]"
              >
                Kirim Ucapan
              </button>

              <p className="mt-4 text-center text-xs leading-relaxed text-stone/70">
                Form ini masih tampilan UI. Penyimpanan ucapan akan dihubungkan saat integrasi database.
              </p>
            </div>
          </motion.form>

          <div className="border-t border-ink/12">
            {wishes.map((wish, index) => (
              <motion.article
                key={wish.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group border-b border-ink/12 py-8 md:py-10"
              >
                <div className="grid gap-5 md:grid-cols-[0.42fr_1fr] md:gap-10">
                  <div>
                    <p className="font-display text-[clamp(1.7rem,3vw,3rem)] leading-none tracking-[-0.04em] text-ink">
                      {wish.name}
                    </p>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-stone/70">
                      {wish.relation}
                    </p>
                  </div>
                  <p className="text-[clamp(1.05rem,2vw,1.45rem)] leading-[1.55] text-stone">
                    {wish.message}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
