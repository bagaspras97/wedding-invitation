"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";

const labels: Record<string, string> = {
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
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
    <div className="mx-auto grid max-w-[700px] grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start justify-center gap-x-2 sm:gap-x-3 md:gap-x-5">
      {items.map(({ key, value }, index) => (
        <div key={key} className="contents">
          <div className="flex min-w-0 flex-col items-center">
            <div className="relative h-11 w-full overflow-hidden md:h-16">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={value}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center font-display text-[clamp(2rem,5.4vw,4rem)] leading-none text-ink"
                >
                  {String(value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="mt-1.5 text-[8px] uppercase tracking-[0.24em] text-stone sm:text-[9px] md:text-[11px] md:tracking-[0.3em]">
              {labels[key]}
            </span>
          </div>
          {index < items.length - 1 && (
            <span className="pt-[0.38rem] text-center font-display text-[clamp(1.45rem,3.8vw,2.65rem)] leading-none text-stone/35 md:pt-[0.56rem]">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
