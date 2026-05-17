"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

const ease = [0.22, 1, 0.36, 1] as const;

function readGuestName() {
  if (typeof window === "undefined") return "Our Beloved Guest";

  const params = new URLSearchParams(window.location.search);
  const value = params.get("to") || params.get("guest");
  const pathGuest = window.location.pathname.split("/").filter(Boolean)[0];
  const decodedPathGuest = pathGuest ? decodeURIComponent(pathGuest).replace(/-/g, " ").trim() : "";

  return value?.trim() || decodedPathGuest || "Our Beloved Guest";
}

export default function InvitationCover() {
  const [visible, setVisible] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [guestName, setGuestName] = useState("Our Beloved Guest");
  const reduceMotion = useHydratedReducedMotion();
  const openToTopRef = useRef(false);

  useEffect(() => {
    setGuestName(readGuestName());
  }, []);

  useEffect(() => {
    if (!visible) return;

    const root = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const previousRootOverflow = root.style.overflow;
    const previousRootOverscroll = root.style.overscrollBehavior;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyOverscroll = body.style.overscrollBehavior;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousTouchAction = body.style.touchAction;

    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    body.style.overscrollBehavior = "none";

    return () => {
      root.style.overflow = previousRootOverflow;
      root.style.overscrollBehavior = previousRootOverscroll;
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousBodyOverscroll;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      body.style.touchAction = previousTouchAction;

      window.requestAnimationFrame(() => {
        if (openToTopRef.current) {
          document.getElementById("top")?.scrollIntoView({ block: "start" });
          window.scrollTo({ top: 0, behavior: "auto" });
          return;
        }

        window.scrollTo({ top: scrollY, behavior: "auto" });
      });
    };
  }, [visible]);

  const displayGuest = useMemo(() => guestName.replace(/\s+/g, " ").trim(), [guestName]);

  const openInvitation = () => {
    openToTopRef.current = true;
    window.dispatchEvent(new Event("invitation:open"));
    setIsOpening(true);
    window.setTimeout(() => setVisible(false), reduceMotion ? 0 : 180);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={isOpening ? { opacity: 0.98 } : { opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.72, ease }}
          className="fixed inset-0 z-[80] overflow-hidden bg-[#f7f3ec] text-ink"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={
              isOpening
                ? { opacity: 0, y: reduceMotion ? 0 : -18, scale: reduceMotion ? 1 : 0.985 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, y: reduceMotion ? 0 : -18, scale: reduceMotion ? 1 : 0.985 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.9, ease }}
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
                  Tyo
                </span>
              </h1>
              <p className="mt-4 text-[0.66rem] uppercase tracking-[0.26em] text-stone md:mt-8 md:text-[0.78rem]">
                6 Juni 2026
              </p>
              <motion.button
                type="button"
                onClick={openInvitation}
                disabled={isOpening}
                whileTap={{ scale: 0.98 }}
                animate={isOpening ? { scale: reduceMotion ? 1 : 0.96, opacity: 0.82 } : { scale: 1, opacity: 1 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.35, ease }}
                className="mt-5 rounded-full bg-ink px-7 py-3.5 text-[0.64rem] font-medium uppercase tracking-[0.23em] text-ivory shadow-[0_22px_56px_-34px_rgba(43,38,32,0.72)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015] disabled:cursor-default md:mt-10 md:px-10 md:py-4 md:text-[0.68rem]"
              >
                Open Invitation
              </motion.button>
            </div>

            <div className="relative min-h-0 flex-1 md:w-[64%] lg:w-[65%]">
              <motion.div
                initial={{ y: 18, scale: 0.98 }}
                animate={isOpening ? { y: reduceMotion ? 0 : 28, scale: reduceMotion ? 1 : 0.985 } : { y: 0, scale: 1 }}
                exit={{ y: reduceMotion ? 0 : 28, scale: reduceMotion ? 1 : 0.985 }}
                transition={{ duration: reduceMotion ? 0.01 : 1, delay: isOpening ? 0 : 0.08, ease }}
                className="relative h-full min-h-[38dvh] overflow-hidden rounded-[1.65rem] bg-[#17130f] shadow-[0_32px_88px_-58px_rgba(43,38,32,0.62)] md:rounded-[2rem]"
              >
                <img
                  src="/images/chapter3-story2.jpg"
                  alt=""
                  className="h-full w-full object-cover opacity-90"
                  style={{
                    filter: "brightness(1.08) sepia(0.18) saturate(0.88) contrast(0.96)",
                    objectPosition: "50% 34%",
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_20%,rgba(251,248,243,0.1),transparent_34%),linear-gradient(180deg,rgba(18,14,10,0)_0%,rgba(18,14,10,0.05)_44%,rgba(18,14,10,0.42)_100%)]" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
