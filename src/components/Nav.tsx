"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { couple, mobileMenuLinks, navLinks } from "@/lib/content";

const springEase = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const threshold = useRef(50);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      threshold.current = window.innerHeight * 0.05;
      setScrolled(window.scrollY > threshold.current);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > threshold.current);
  });

  const isPill = scrolled || isMobile;
  const ink = isPill ? "#2b2620" : "#fbf8f3";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <motion.nav
        initial={false}
        animate={
          isPill
            ? {
                width: "min(920px, 92vw)",
                marginTop: 14,
                backgroundColor: "rgba(251,248,243,0.96)",
                borderRadius: 999,
                paddingLeft: isMobile ? 22 : 28,
                paddingRight: isMobile ? 14 : 10,
                paddingTop: isMobile ? 8 : 10,
                paddingBottom: isMobile ? 8 : 10,
                boxShadow: "0 18px 70px -42px rgba(43,38,32,0.5)",
              }
            : {
                width: "100%",
                marginTop: 0,
                backgroundColor: "rgba(0,0,0,0)",
                borderRadius: 0,
                paddingLeft: 32,
                paddingRight: 32,
                paddingTop: 22,
                paddingBottom: 22,
                boxShadow: "none",
              }
        }
        transition={{ duration: 0.72, ease: springEase }}
        className="pointer-events-auto flex items-center justify-between ring-1 ring-black/[0.03]"
        style={{ backdropFilter: isPill ? "blur(16px)" : "none" }}
      >
        <motion.a
          href="#top"
          animate={{ color: ink }}
          transition={{ duration: 0.45, ease: springEase }}
          className="font-display text-xl tracking-wide"
          onClick={() => setOpen(false)}
        >
          {couple.initials}
        </motion.a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <motion.a
                href={l.href}
                animate={{ color: ink }}
                transition={{ duration: 0.45, ease: springEase }}
                className="text-xs uppercase tracking-widest2 opacity-90 transition-opacity duration-500 hover:opacity-55"
              >
                {l.label}
              </motion.a>
            </li>
          ))}
        </ul>

        <motion.a
          href="#rsvp"
          whileTap={{ scale: 0.98 }}
          animate={
            isPill
              ? { backgroundColor: "#2b2620", color: "#fbf8f3" }
              : { backgroundColor: "#fbf8f3", color: "#2b2620" }
          }
          transition={{ duration: 0.45, ease: springEase }}
          className="rounded-full px-5 py-2.5 text-xs font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015] md:inline-block md:uppercase md:tracking-widest2"
          onClick={() => setOpen(false)}
        >
          Submit RSVP
        </motion.a>

        <motion.button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          animate={{ color: ink }}
          transition={{ duration: 0.45, ease: springEase }}
          className="relative flex h-8 w-8 items-center justify-center md:hidden"
        >
          <motion.span
            className="absolute h-px w-5 bg-current"
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            transition={{ duration: 0.45, ease: springEase }}
          />
          <motion.span
            className="absolute h-px w-5 bg-current"
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            transition={{ duration: 0.45, ease: springEase }}
          />
        </motion.button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.42, ease: springEase }}
            className="pointer-events-auto absolute right-6 top-[4.6rem] flex w-44 flex-col items-end gap-1 rounded-[1.35rem] border border-[#2b2620]/[0.06] bg-[#fbf8f3] p-5 text-right shadow-[0_24px_70px_-42px_rgba(43,38,32,0.55),inset_0_1px_0_rgba(255,255,255,0.68)] md:hidden"
          >
            {mobileMenuLinks.map((l, index) => (
              <motion.li
                key={l.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 + index * 0.05, ease: springEase }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-[#2b2620]/85 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#2b2620]"
                >
                  {l.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
