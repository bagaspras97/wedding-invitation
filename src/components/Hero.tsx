"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { couple, heroImage, heroCollage, weddingDate } from "@/lib/content";

const fmt = (d: Date) =>
  d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

function useVP() {
  const [vp, setVp] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const upd = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);
  return vp;
}

export default function Hero() {
  return (
    <>
      {/* ── Mobile: card statis, sesuai referensi ── */}
      <div className="md:hidden">
        <MobileHero />
      </div>

      {/* ── Desktop: animasi scroll ── */}
      <div className="hidden md:block">
        <DesktopHero />
      </div>
    </>
  );
}

// ─── Mobile Hero ──────────────────────────────────────────────────────────────
function MobileHero() {
  return (
    <section
      id="top"
      className="bg-[#ece7df]"
      style={{ height: "100svh", position: "relative", overflow: "hidden", width: "100%" }}
    >
      {/* Card — inset absolut dari tepi section, jauh lebih reliable dari flex */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: "4.8rem",
          left: "0.75rem",
          right: "0.75rem",
          bottom: "0.75rem",
          borderRadius: 24,
        }}
      >
        {/* CSS filter: cerahkan + sepia hangat + sedikit desaturasi agar match tema cream */}
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(1.25) sepia(0.30) saturate(0.80)" }}
        />
        {/* Warm tone overlay — screen blend menambah kehangatan ke area gelap */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(210,185,150,0.18)", mixBlendMode: "screen" }}
        />
        {/* Gradient bawah pakai ink (cokelat hangat) bukan hitam murni */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2b2620]/75" />

        {/* Nama */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="absolute bottom-0 left-0 right-0 px-7 pb-8"
        >
          <p className="mb-1 text-[10px] uppercase tracking-widest2 text-ivory/75">
            {fmt(weddingDate)}
          </p>
          <h1 className="font-display text-[14vw] font-light italic leading-none text-ivory">
            {couple.heroNames}
          </h1>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-7 right-6 flex items-center gap-2 text-ivory/70"
        >
          <span className="text-[9px] uppercase tracking-widest2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={13} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Desktop Hero ─────────────────────────────────────────────────────────────
function DesktopHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { w, h } = useVP();

  const cardW = useTransform(scrollYProgress, [0, 0.50], ["100%", "38vw"]);
  const cardH = useTransform(scrollYProgress, [0, 0.50], ["100%", "82vh"]);
  const cardR = useTransform(scrollYProgress, [0, 0.50], [0, 28]);
  const titleOp = useTransform(scrollYProgress, [0, 0.20], [1, 0]);
  const hintOp  = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh] bg-[#ece7df]">
      <div className="sticky top-0 h-screen bg-[#ece7df]">
        {/* Foto collage */}
        {w > 0 && heroCollage.map((item, i) => (
          <CollagePhoto key={i} progress={scrollYProgress} item={item} vw={w} vh={h} />
        ))}

        {/* Card utama */}
        <motion.div
          style={{
            width: cardW,
            height: cardH,
            borderRadius: cardR,
            position: "absolute",
            left: "50%",
            top: "50%",
            translateX: "-50%",
            translateY: "-50%",
            zIndex: 20,
          }}
          className="overflow-hidden"
        >
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "brightness(1.25) sepia(0.30) saturate(0.80)" }}
          />
          {/* Warm tone overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(210,185,150,0.18)", mixBlendMode: "screen" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2b2620]/60" />

          <motion.div
            style={{ opacity: titleOp }}
            className="absolute inset-0 flex flex-col items-end justify-end px-10 pb-14 text-ivory"
          >
            <p className="mb-2 text-[10px] uppercase tracking-widest2 text-ivory/80">
              {fmt(weddingDate)}
            </p>
            <h1 className="font-display text-right text-[10vw] font-light italic leading-none md:text-[8vw]">
              {couple.heroNames}
            </h1>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOp }}
          className="pointer-events-none absolute bottom-8 right-8 z-30 flex items-center gap-2 text-ivory/80"
        >
          <span className="text-[10px] uppercase tracking-widest2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Foto collage (desktop only) ─────────────────────────────────────────────
function CollagePhoto({
  progress, item, vw, vh,
}: {
  progress: MotionValue<number>;
  item: (typeof heroCollage)[number];
  vw: number;
  vh: number;
}) {
  const enter = 0.05 + item.delay;
  const land  = 0.55;
  const x       = useTransform(progress, [enter, land], [item.fromXf * vw, item.finalXf * vw]);
  const opacity = useTransform(progress, [enter, enter + 0.06], [0, 1]);

  return (
    <motion.div
      style={{
        x, y: item.yf * vh, opacity, rotate: item.rotate,
        width: item.wf * vw, aspectRatio: item.aspect,
        position: "absolute", left: "50%", top: "50%",
        translateX: "-50%", translateY: "-50%",
        zIndex: 10, borderRadius: 16, overflow: "hidden",
        boxShadow: "0 8px 32px -6px rgba(0,0,0,0.18)",
      }}
    >
      <img src={item.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </motion.div>
  );
}
