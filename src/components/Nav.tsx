"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { couple, mobileMenuLinks, navLinks } from "@/lib/content";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const threshold = useRef(50);

  useEffect(() => {
    // Transisi sangat awal — 5% viewport height — sesuai referensi
    threshold.current = window.innerHeight * 0.05;
    setScrolled(window.scrollY > threshold.current);
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      threshold.current = window.innerHeight * 0.05;
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > threshold.current);
  });

  const isPill = scrolled || isMobile;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <motion.nav
        initial={false}
        animate={isPill ? {
          width: "min(920px, 92vw)",
          marginTop: 14,
          backgroundColor: "rgba(251,248,243,0.95)",
          borderRadius: 999,
          paddingLeft: isMobile ? 22 : 28,
          paddingRight: 10,
          paddingTop: isMobile ? 8 : 10,
          paddingBottom: isMobile ? 8 : 10,
          boxShadow: "0 6px 28px -6px rgba(0,0,0,0.12)",
        } : {
          width: "100%",
          marginTop: 0,
          backgroundColor: "rgba(0,0,0,0)",
          borderRadius: 0,
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 22,
          paddingBottom: 22,
          boxShadow: "none",
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex items-center justify-between"
        style={{ backdropFilter: isPill ? "blur(14px)" : "none" }}
      >
        {/* Logo — saat belum scroll: ivory; setelah scroll: ink */}
        <motion.a
          href="#top"
          animate={{ color: isPill ? "#2b2620" : "#fbf8f3" }}
          transition={{ duration: 0.4 }}
          className="font-display text-xl tracking-wide md:text-xl"
        >
          {couple.initials}
        </motion.a>

        {/* Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <motion.a
                href={l.href}
                animate={{ color: isPill ? "#2b2620" : "#fbf8f3" }}
                transition={{ duration: 0.4 }}
                className="text-xs uppercase tracking-widest2 transition-opacity hover:opacity-60"
              >
                {l.label}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* Submit RSVP button */}
        <motion.a
          href="#rsvp"
          animate={isPill
            ? { backgroundColor: "#2b2620", color: "#fbf8f3" }
            : { backgroundColor: "#fbf8f3", color: "#2b2620" }
          }
          transition={{ duration: 0.4 }}
          className="rounded-full px-5 py-2.5 text-xs font-medium md:inline-block md:uppercase md:tracking-widest2"
        >
          Submit RSVP
        </motion.a>

        {/* Mobile burger */}
        <motion.button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          animate={{ color: isPill ? "#2b2620" : "#fbf8f3" }}
          transition={{ duration: 0.4 }}
          className="md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </motion.nav>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto absolute right-6 top-[4.6rem] flex w-44 flex-col items-end gap-1 rounded-2xl bg-ivory/95 p-5 text-right shadow-xl backdrop-blur md:hidden"
        >
          {mobileMenuLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}
                className="block py-2 text-sm text-ink transition hover:text-accent">
                {l.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
