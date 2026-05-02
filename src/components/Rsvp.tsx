"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

type FormState = {
  name: string;
  guests: string;
  attendance: "hadir" | "tidak" | "";
  message: string;
};

const empty: FormState = { name: "", guests: "1", attendance: "", message: "" };

export default function Rsvp() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Nama wajib diisi";
    if (!form.attendance) next.attendance = "Pilih kehadiran";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
      setForm(empty);
      setTimeout(() => setSubmitted(false), 4500);
    }
  };

  return (
    <section id="rsvp" className="bg-cream py-28 md:py-36">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="eyebrow">Konfirmasi Kehadiran</p>
          <h2 className="h-display mt-4 text-4xl md:text-5xl">RSVP</h2>
          <p className="mt-6 text-stone">
            Kehadiran Anda adalah hadiah terindah bagi kami. Mohon konfirmasi sebelum hari H.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mx-auto mt-14 max-w-xl space-y-6"
        >
          <Field label="Nama Lengkap" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="input"
              placeholder="Masukkan nama Anda"
            />
          </Field>

          <Field label="Jumlah Tamu">
            <select
              value={form.guests}
              onChange={(e) => update("guests", e.target.value)}
              className="input"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} orang
                </option>
              ))}
            </select>
          </Field>

          <Field label="Kehadiran" error={errors.attendance}>
            <div className="grid grid-cols-2 gap-3">
              {(["hadir", "tidak"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => update("attendance", v)}
                  className={`border px-4 py-3 text-sm uppercase tracking-widest2 transition ${
                    form.attendance === v
                      ? "border-accent bg-accent/10 text-ink"
                      : "border-ink/20 text-stone hover:border-accent"
                  }`}
                >
                  {v === "hadir" ? "Akan Hadir" : "Berhalangan"}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Ucapan & Doa">
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              rows={4}
              className="input resize-none"
              placeholder="Tuliskan ucapan dan doa Anda untuk kami"
            />
          </Field>

          <div className="pt-4 text-center">
            <button
              type="submit"
              className="rounded-full bg-ink px-10 py-3 text-xs uppercase tracking-widest2 text-ivory transition hover:bg-accent"
            >
              Kirim Konfirmasi
            </button>
          </div>
        </motion.form>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm text-ivory shadow-lg"
          >
            <Check size={16} className="text-accent" />
            Terima kasih! Konfirmasi Anda telah kami terima.
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: #fbf8f3;
          border: 1px solid rgba(43, 38, 32, 0.15);
          padding: 0.875rem 1rem;
          color: #2b2620;
          font-family: var(--font-body);
          font-size: 0.95rem;
          transition: border-color 0.2s;
          outline: none;
        }
        :global(.input:focus) {
          border-color: #b89968;
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-700">{error}</span>}
    </label>
  );
}
