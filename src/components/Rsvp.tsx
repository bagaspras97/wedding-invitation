"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";
import Field from "./Field";
import SectionHeading from "./SectionHeading";

type FormState = {
  name: string;
  guests: string;
  attendance: "attending" | "declined" | "";
};

const empty: FormState = { name: "", guests: "1", attendance: "" };

export default function Rsvp() {
  const reduceMotion = useHydratedReducedMotion();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const submitNotice = "RSVP sudah ditutup. Terima kasih untuk semua konfirmasi yang sudah masuk.";

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
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
            onSubmit={(event) => event.preventDefault()}
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.78, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="border-y border-ink/12 py-10 md:py-12"
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.62, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-5 md:grid-cols-2"
            >
              <Field label="Full Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  disabled
                  className="input"
                  placeholder="Your name"
                />
              </Field>

              <Field label="Number of Guests">
                <select
                  value={form.guests}
                  onChange={(event) => update("guests", event.target.value)}
                  disabled
                  className="input"
                >
                  {[1, 2, 3, 4].map((guests) => (
                    <option key={guests} value={guests}>
                      {guests} {guests === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </Field>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.62, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
            <Field label="Attendance" error={errors.attendance} className="mt-6">
              <div className="grid grid-cols-2 gap-3">
                {(["attending", "declined"] as const).map((attendance) => (
                  <motion.button
                    key={attendance}
                    type="button"
                    onClick={() => update("attendance", attendance)}
                    disabled
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                    className={`min-h-12 rounded-full border px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] transition duration-300 active:scale-[0.98] ${
                      form.attendance === attendance
                        ? "border-ink bg-ink text-ivory shadow-[0_16px_38px_-28px_rgba(43,38,32,0.75)]"
                        : "border-ink/14 bg-cream/55 text-stone"
                    }`}
                  >
                    {attendance === "attending" ? "Attending" : "Unable to Attend"}
                  </motion.button>
                ))}
              </div>
            </Field>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.62, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex justify-center md:justify-end"
            >
              <motion.button
                type="submit"
                disabled
                className="rounded-full bg-ink px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-ivory shadow-[0_18px_48px_-32px_rgba(43,38,32,0.75)] transition duration-500 hover:scale-[1.01] hover:bg-accent active:scale-[0.99] disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100"
              >
                RSVP Closed
              </motion.button>
            </motion.div>

            <p className="mt-5 text-center text-sm leading-relaxed text-stone md:text-right">
              {submitNotice}
            </p>
          </motion.form>
        </div>
      </div>

      {/* <div className="pointer-events-none mx-auto mt-16 h-px max-w-5xl bg-gradient-to-r from-transparent via-ink/10 to-transparent md:mt-24" /> */}

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
