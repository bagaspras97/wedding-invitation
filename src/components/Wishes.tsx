"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { wishes } from "@/lib/content";
import Field from "./Field";
import SectionHeading from "./SectionHeading";

type WishItem = {
  id: string;
  name: string;
  relation?: string;
  message: string;
  created_at?: string;
};

const fallbackWishes: WishItem[] = wishes.map((wish, index) => ({
  id: `sample-${index}`,
  ...wish,
}));

const formatWishDate = (value?: string) => {
  if (!value) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
};

export default function Wishes() {
  const reduceMotion = useReducedMotion();
  const [items, setItems] = useState<WishItem[]>(fallbackWishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleWishes = items.slice(0, 4);

  useEffect(() => {
    let isMounted = true;

    const loadWishes = async () => {
      try {
        const response = await fetch("/api/wishes", { cache: "no-store" });
        const result = (await response.json().catch(() => ({}))) as {
          wishes?: WishItem[];
          error?: string;
        };

        if (!response.ok) {
          throw new Error(result.error || "Unable to load wishes.");
        }

        if (isMounted) {
          setItems(result.wishes ?? []);
        }
      } catch {
        if (isMounted) {
          setItems(fallbackWishes);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadWishes();

    return () => {
      isMounted = false;
    };
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setError("Please write your name and message.");
      setSuccess("");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, message: trimmedMessage }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        wish?: WishItem;
        error?: string;
      };

      if (!response.ok || !result.wish) {
        throw new Error(result.error || "Unable to send your wish right now.");
      }

      setItems((current) => [result.wish as WishItem, ...current.filter((wish) => !wish.id.startsWith("sample-"))]);
      setName("");
      setMessage("");
      setSuccess("Your wish has been added.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send your wish right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="ucapan" className="overflow-hidden bg-ivory px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Guest Notes"
          title="wishes and prayers"
          description="Leave a warm note for Yolla and Pras as they begin this new chapter."
          className="mx-auto max-w-4xl"
        />

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <motion.form
            onSubmit={onSubmit}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="md:sticky md:top-32"
          >
            <div className="border-y border-ink/12 py-8">
              <div className="space-y-6">
                <Field label="Name">
                  <input
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Write your name"
                    className="w-full rounded-none border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-stone/45 focus:border-ink"
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    placeholder="Write your best wishes for the couple"
                    className="w-full resize-none rounded-none border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-base leading-relaxed text-ink outline-none transition-colors placeholder:text-stone/45 focus:border-ink"
                  />
                </Field>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={reduceMotion || isSubmitting ? undefined : { scale: 1.012, y: -1 }}
                whileTap={reduceMotion || isSubmitting ? undefined : { scale: 0.985 }}
                className="mt-8 w-full rounded-full bg-ink px-6 py-4 text-xs font-medium uppercase tracking-[0.24em] text-ivory shadow-[0_18px_48px_-32px_rgba(43,38,32,0.75)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.01] active:scale-[0.99] disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100"
              >
                {isSubmitting ? "Sending..." : "Send Wishes"}
              </motion.button>

              {(error || success) && (
                <p
                  className={`mt-4 text-center text-xs leading-relaxed ${
                    error ? "text-red-800" : "text-stone"
                  }`}
                >
                  {error || success}
                </p>
              )}
            </div>
          </motion.form>

          <div className="border-t border-ink/12">
            {!isLoading && items.length === 0 && (
              <div className="border-b border-ink/12 py-10">
                <p className="text-lg leading-relaxed text-stone">
                  Be the first to leave a wish for Yolla and Pras.
                </p>
              </div>
            )}

            {visibleWishes.map((wish, index) => (
              <motion.article
                key={wish.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.68, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group border-b border-ink/12 py-6 transition-colors duration-500 hover:border-ink/22 md:py-8"
              >
                <div className="grid gap-5 md:grid-cols-[0.42fr_1fr] md:gap-10">
                  <div>
                    <p className="font-display text-[clamp(1.5rem,2.4vw,2.45rem)] leading-none tracking-[-0.04em] text-ink">
                      {wish.name}
                    </p>
                    {formatWishDate(wish.created_at) && (
                      <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-stone/60">
                        {formatWishDate(wish.created_at)}
                      </p>
                    )}
                    {wish.relation && (
                      <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-stone/70">
                        {wish.relation}
                      </p>
                    )}
                  </div>
                  <p className="text-[clamp(0.98rem,1.55vw,1.18rem)] leading-[1.55] text-stone">
                    {wish.message}
                  </p>
                </div>
              </motion.article>
            ))}

            {items.length > visibleWishes.length && (
              <div className="pt-7 text-center md:text-left">
                <motion.button
                  type="button"
                  onClick={() => setShowAll(true)}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink/14 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-ink transition duration-500 hover:border-ink hover:bg-ink hover:text-ivory active:scale-[0.98]"
                >
                  View all wishes
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAll && (
          <motion.div
            className="fixed inset-0 z-[70] bg-ink/42 px-4 py-5 backdrop-blur-sm md:px-8 md:py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.25 }}
            onClick={() => setShowAll(false)}
          >
            <motion.div
              className="mx-auto flex h-full max-w-4xl flex-col overflow-hidden rounded-[1.75rem] bg-ivory shadow-[0_30px_120px_-50px_rgba(43,38,32,0.85)]"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.985 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-ink/12 px-6 py-5 md:px-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-stone">Guest Notes</p>
                  <p className="mt-2 font-display text-3xl leading-none tracking-[-0.04em] text-ink md:text-4xl">
                    all wishes
                  </p>
                </div>
                <motion.button
                  type="button"
                  onClick={() => setShowAll(false)}
                  whileHover={reduceMotion ? undefined : { rotate: 4, scale: 1.04 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                  className="grid size-11 place-items-center rounded-full border border-ink/12 text-ink transition duration-300 hover:border-ink hover:bg-ink hover:text-ivory"
                  aria-label="Close wishes"
                >
                  <X size={18} strokeWidth={1.7} />
                </motion.button>
              </div>

              <div className="overflow-y-auto px-6 md:px-8">
                {items.map((wish) => (
                  <article key={wish.id} className="border-b border-ink/10 py-6">
                    <div className="grid gap-3 md:grid-cols-[0.34fr_1fr] md:gap-8">
                      <div>
                        <p className="font-display text-[clamp(1.45rem,2.5vw,2.4rem)] leading-none tracking-[-0.04em] text-ink">
                          {wish.name}
                        </p>
                        {formatWishDate(wish.created_at) && (
                          <p className="mt-2 text-[9px] uppercase tracking-[0.24em] text-stone/60">
                            {formatWishDate(wish.created_at)}
                          </p>
                        )}
                        {wish.relation && (
                          <p className="mt-2 text-[9px] uppercase tracking-[0.28em] text-stone/70">
                            {wish.relation}
                          </p>
                        )}
                      </div>
                      <p className="text-[0.98rem] leading-[1.6] text-stone md:text-[1.06rem]">
                        {wish.message}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
