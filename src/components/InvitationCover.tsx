"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

function readGuestName() {
  if (typeof window === "undefined") return "Our Beloved Guest";

  const params = new URLSearchParams(window.location.search);
  const value = params.get("to") || params.get("guest");

  return value?.trim() || "Our Beloved Guest";
}

export default function InvitationCover() {
  const [visible, setVisible] = useState(true);
  const [guestName, setGuestName] = useState("Our Beloved Guest");

  useEffect(() => {
    setGuestName(readGuestName());
  }, []);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [visible]);

  const displayGuest = useMemo(() => guestName.replace(/\s+/g, " ").trim(), [guestName]);

  const openInvitation = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease }}
          className="fixed inset-0 z-[80] overflow-hidden bg-[#f7f3ec] text-ink"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.985 }}
            transition={{ duration: 0.9, ease }}
            className="mx-auto flex h-[100dvh] w-full max-w-[520px] flex-col px-4 py-5 md:max-w-none md:flex-row md:gap-10 md:px-9 md:py-9 lg:gap-14 lg:px-12"
          >
            <div className="flex shrink-0 flex-col items-center justify-center px-5 pb-4 pt-4 text-center md:w-[36%] md:items-start md:px-4 md:pb-0 md:pt-0 md:text-left lg:w-[35%] lg:px-8">
              <p className="text-[0.63rem] uppercase tracking-[0.3em] text-stone md:text-[0.72rem]">
                Dear {displayGuest}
              </p>
              <h1 className="mt-5 flex flex-col items-center font-display font-light italic leading-[0.82] md:mt-8 md:items-start">
                <span className="text-[clamp(3.25rem,14vw,4.75rem)] md:text-[clamp(5.8rem,8.6vw,9.2rem)]">
                  Yolla
                </span>
                <span className="-my-0.5 text-[clamp(1.65rem,6vw,2.15rem)] leading-none text-stone md:my-0 md:text-[clamp(2.3rem,3.2vw,3.7rem)]">
                  &
                </span>
                <span className="text-[clamp(3.25rem,14vw,4.75rem)] md:text-[clamp(5.8rem,8.6vw,9.2rem)]">
                  Pras
                </span>
              </h1>
              <p className="mt-4 text-[0.66rem] uppercase tracking-[0.26em] text-stone md:mt-8 md:text-[0.78rem]">
                6 Juni 2026
              </p>
              <motion.button
                type="button"
                onClick={openInvitation}
                whileTap={{ scale: 0.98 }}
                className="mt-5 rounded-full bg-ink px-7 py-3.5 text-[0.64rem] font-medium uppercase tracking-[0.23em] text-ivory shadow-[0_22px_56px_-34px_rgba(43,38,32,0.72)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015] md:mt-10 md:px-10 md:py-4 md:text-[0.68rem]"
              >
                Open Invitation
              </motion.button>
            </div>

            <div className="relative min-h-0 flex-1 md:w-[64%] lg:w-[65%]">
              <motion.div
                initial={{ y: 18, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 28, scale: 0.98 }}
                transition={{ duration: 1, delay: 0.08, ease }}
                className="relative h-full min-h-[38dvh] overflow-hidden rounded-[1.65rem] bg-[#17130f] shadow-[0_32px_88px_-58px_rgba(43,38,32,0.62)] md:rounded-[2rem]"
              >
                <img
                  src="/images/chapter3-story2.jpg"
                  alt=""
                  className="h-full w-full object-cover opacity-82"
                  style={{
                    filter: "brightness(0.92) sepia(0.2) saturate(0.84)",
                    objectPosition: "50% 34%",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_20%,rgba(251,248,243,0.08),transparent_34%),linear-gradient(180deg,rgba(18,14,10,0)_0%,rgba(18,14,10,0.08)_44%,rgba(18,14,10,0.55)_100%)]" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
