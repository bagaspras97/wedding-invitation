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
    <div className="mx-auto grid max-w-[660px] grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-2 md:gap-5">
      {items.map(({ key, value }, index) => (
        <div key={key} className="contents">
          <div className="flex min-w-0 flex-col items-center">
            <div className="relative h-12 w-full overflow-hidden md:h-16">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={value}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center font-display text-[clamp(2.15rem,5.8vw,4.05rem)] leading-none text-ink"
                >
                  {String(value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="mt-1.5 text-[9px] uppercase tracking-[0.3em] text-stone md:text-[11px]">
              {labels[key]}
            </span>
          </div>
          {index < items.length - 1 && (
            <span className="pt-0.5 font-display text-[clamp(1.95rem,5vw,3.65rem)] leading-none text-stone/35 md:pt-1">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
