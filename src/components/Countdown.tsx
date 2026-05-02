"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";

const labels: Record<string, string> = {
  days: "Hari",
  hours: "Jam",
  minutes: "Menit",
  seconds: "Detik",
};

export default function Countdown({ target }: { target: Date }) {
  const c = useCountdown(target);
  const items = [
    { key: "days", value: c.days },
    { key: "hours", value: c.hours },
    { key: "minutes", value: c.minutes },
    { key: "seconds", value: c.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-6">
      {items.map(({ key, value }) => (
        <div
          key={key}
          className="flex flex-col items-center border border-ink/10 bg-ivory/60 px-2 py-5 backdrop-blur md:py-7"
        >
          <div className="relative h-12 w-full overflow-hidden md:h-16">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={value}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center font-display text-4xl text-ink md:text-5xl"
              >
                {String(value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="mt-2 text-[10px] uppercase tracking-widest2 text-stone md:text-xs">
            {labels[key]}
          </span>
        </div>
      ))}
    </div>
  );
}
