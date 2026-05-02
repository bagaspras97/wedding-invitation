"use client";
import { useEffect, useState } from "react";

export type Countdown = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: Date): Countdown {
  const ms = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms / 3_600_000) % 24);
  const minutes = Math.floor((ms / 60_000) % 60);
  const seconds = Math.floor((ms / 1_000) % 60);
  return { days, hours, minutes, seconds };
}

const zero: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function useCountdown(target: Date): Countdown {
  // Inisialisasi null agar SSR dan client render nilai yang sama (0),
  // lalu set nilai nyata setelah mount untuk menghindari hydration mismatch.
  const [value, setValue] = useState<Countdown>(zero);
  useEffect(() => {
    setValue(diff(target));
    const id = setInterval(() => setValue(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return value;
}
