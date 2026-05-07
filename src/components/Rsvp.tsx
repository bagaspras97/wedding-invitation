"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import Field from "./Field";
import SectionHeading from "./SectionHeading";

type FormState = {
  name: string;
  guests: string;
  attendance: "attending" | "declined" | "";
  message: string;
};

const empty: FormState = { name: "", guests: "1", attendance: "", message: "" };

export default function Rsvp() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const nextErrors: typeof errors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name";
    if (!form.attendance) nextErrors.attendance = "Please choose your attendance";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);
    setForm(empty);
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <section id="rsvp" className="overflow-hidden bg-ivory px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Attendance"
          title="rsvp"
          description="Please confirm your attendance so we can prepare a seat with care."
          size="lg"
          descriptionMaxWidth="max-w-xl"
          descriptionSize="compact"
          className="mx-auto max-w-3xl"
        />

        <div className="mx-auto mt-12 max-w-3xl md:mt-16">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="border-y border-ink/12 py-10 md:py-12"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  className="input"
                  placeholder="Your name"
                />
              </Field>

              <Field label="Number of Guests">
                <select
                  value={form.guests}
                  onChange={(event) => update("guests", event.target.value)}
                  className="input"
                >
                  {[1, 2, 3, 4].map((guests) => (
                    <option key={guests} value={guests}>
                      {guests} {guests === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Attendance" error={errors.attendance} className="mt-6">
              <div className="grid grid-cols-2 gap-3">
                {(["attending", "declined"] as const).map((attendance) => (
                  <button
                    key={attendance}
                    type="button"
                    onClick={() => update("attendance", attendance)}
                    className={`min-h-12 rounded-full border px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] transition duration-300 active:scale-[0.98] ${
                      form.attendance === attendance
                        ? "border-ink bg-ink text-ivory shadow-[0_16px_38px_-28px_rgba(43,38,32,0.75)]"
                        : "border-ink/14 bg-cream/55 text-stone hover:border-accent hover:text-ink"
                    }`}
                  >
                    {attendance === "attending" ? "Attending" : "Unable to Attend"}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Wishes & Prayers" className="mt-6">
              <textarea
                value={form.message}
                onChange={(event) => update("message", event.target.value)}
                rows={5}
                className="input resize-none"
                placeholder="Write a short wish for us"
              />
            </Field>

            <div className="mt-8 flex justify-center md:justify-end">
              <button
                type="submit"
                className="rounded-full bg-ink px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-ivory shadow-[0_18px_48px_-32px_rgba(43,38,32,0.75)] transition duration-500 hover:scale-[1.01] hover:bg-accent active:scale-[0.99]"
              >
                Send RSVP
              </button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* <div className="pointer-events-none mx-auto mt-16 h-px max-w-5xl bg-gradient-to-r from-transparent via-ink/10 to-transparent md:mt-24" /> */}

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm text-ivory shadow-[0_24px_80px_-40px_rgba(43,38,32,0.9)] md:w-auto md:px-6"
          >
            <Check size={16} className="shrink-0 text-accent" />
            Your RSVP has been received.
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          min-height: 3.25rem;
          border: 0;
          border-bottom: 1px solid rgba(43, 38, 32, 0.16);
          border-radius: 0;
          background: transparent;
          padding: 0.75rem 0;
          color: #2b2620;
          font-family: var(--font-body);
          font-size: 1rem;
          line-height: 1.5;
          transition: border-color 0.28s ease, color 0.28s ease;
          outline: none;
        }
        :global(.input:focus) {
          border-color: #2b2620;
        }
        :global(.input::placeholder) {
          color: rgba(138, 126, 110, 0.52);
        }
        :global(select.input) {
          cursor: pointer;
        }
      `}</style>
    </section>
  );
}
