"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { giftAccounts, giftIntro } from "@/lib/content";
import SectionHeading from "./SectionHeading";

export default function LoveGift() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyAccount = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2200);
  };

  return (
    <section id="gift" className="overflow-hidden bg-ivory px-6 py-24 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.95fr_1.05fr] md:items-start md:gap-20">
        <SectionHeading
          align="start"
          eyebrow="Love & Gift"
          title="love gift"
          description={giftIntro.body}
          descriptionMaxWidth="max-w-md"
          className="md:sticky md:top-32"
        />

        <motion.div
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="border-y border-ink/12"
        >
          {giftAccounts.map((account, index) => (
            <article
              key={account.number}
              className={`group py-8 md:py-10 ${index > 0 ? "border-t border-ink/12" : ""}`}
            >
              <div className="grid gap-6 md:grid-cols-[0.72fr_1fr] md:items-end md:gap-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-stone">
                    {account.type}
                  </p>
                  <p className="mt-4 font-display text-[clamp(2rem,4.6vw,4.5rem)] leading-none tracking-[-0.055em] text-ink">
                    {account.provider}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="font-body text-[clamp(1.7rem,3.6vw,3.25rem)] leading-none tracking-[-0.04em] text-ink">
                    {account.displayNumber ?? account.number}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-stone md:text-base">
                    a/n {account.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => copyAccount(account.number)}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/14 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-ink transition duration-500 hover:border-ink hover:bg-ink hover:text-ivory active:scale-[0.98]"
                  >
                    {copied === account.number ? (
                      <Check size={14} strokeWidth={1.8} />
                    ) : (
                      <Copy size={14} strokeWidth={1.8} />
                    )}
                    {copied === account.number ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {copied && (
          <div className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-3rem)] max-w-xs -translate-x-1/2 md:bottom-8 md:left-auto md:right-8 md:w-auto md:max-w-none md:translate-x-0">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center gap-3 rounded-full bg-ink px-5 py-3 text-center text-sm text-ivory shadow-[0_24px_80px_-40px_rgba(43,38,32,0.9)] md:px-6"
            >
              <Check size={16} className="shrink-0 text-accent" />
              Number copied.
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
