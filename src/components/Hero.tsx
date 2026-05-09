"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { couple, heroCollage, heroImage, weddingDate } from "@/lib/content";

const fmt = (d: Date) =>
  d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

function useVP() {
  const [vp, setVp] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return vp;
}

export default function Hero() {
  return (
    <>
      <div className="md:hidden">
        <MobileHero />
      </div>

      <div className="hidden md:block">
        <DesktopHero />
      </div>
    </>
  );
}

function MobileHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 0.62, 1], [1, 1, 0.94]);
  const imageFilter = useTransform(
    scrollYProgress,
    [0, 0.66, 1],
    [
      "brightness(1.18) sepia(0.24) saturate(0.86) contrast(0.96) blur(0px)",
      "brightness(1.18) sepia(0.24) saturate(0.86) contrast(0.96) blur(0px)",
      "brightness(1.28) sepia(0.18) saturate(0.78) contrast(0.92) blur(5px)",
    ]
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.56, 0.86], [1, 1, 0]);
  const veilOpacity = useTransform(scrollYProgress, [0.58, 1], [0, 0.92]);

  return (
    <section ref={ref} id="top" className="relative h-[122dvh] bg-[#ece7df]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div
          style={{
            scale: imageScale,
            top: "4.8rem",
            left: "0.75rem",
            right: "0.75rem",
            bottom: "0.75rem",
            borderRadius: 24,
          }}
          className="absolute overflow-hidden shadow-[0_26px_90px_-54px_rgba(43,38,32,0.5)] will-change-transform"
        >
          <motion.img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: imageFilter }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 52% 24%, rgba(255,246,226,0.22), transparent 34%), linear-gradient(180deg, rgba(251,248,243,0.05) 0%, rgba(63,52,40,0.12) 52%, rgba(43,38,32,0.68) 100%)",
            }}
          />
          <motion.div
            aria-hidden="true"
            style={{ opacity: veilOpacity }}
            className="pointer-events-none absolute inset-0 bg-ivory"
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ opacity: contentOpacity }}
            transition={{ duration: 1.15, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 px-7 pb-8 text-ivory"
          >
            <p className="mb-1 text-[10px] uppercase tracking-widest2 text-ivory/75">
              {fmt(weddingDate)}
            </p>
            <h1 className="font-display text-[12vw] font-light italic leading-[0.94] drop-shadow-[0_8px_28px_rgba(43,38,32,0.24)]">
              {couple.heroNames}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ opacity: contentOpacity }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="absolute bottom-7 right-6 flex items-center gap-2 text-ivory/60"
          >
            <span className="text-[8px] uppercase tracking-[0.28em]">Scroll</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: [0.33, 1, 0.68, 1] }}
              className="block h-3 w-px bg-current"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function DesktopHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const { w, h } = useVP();

  const cardW = useTransform(scrollYProgress, [0, 0.44], ["100%", "38vw"]);
  const cardH = useTransform(scrollYProgress, [0, 0.44], ["100%", "82vh"]);
  const cardR = useTransform(scrollYProgress, [0, 0.44], [0, 28]);
  const titleOp = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const hintOp = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const cardExitScale = useTransform(scrollYProgress, [0, 0.68, 1], [1, 1, 0.94]);
  const cardExitFilter = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    ["blur(0px)", "blur(0px)", "blur(5px)"]
  );
  const veilOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 0.92]);

  return (
    <section ref={ref} className="relative h-[230vh] bg-[#ece7df]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#ece7df]">
        {w > 0 &&
          heroCollage.map((item, i) => (
            <CollagePhoto key={i} progress={scrollYProgress} item={item} vw={w} vh={h} />
          ))}

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
            scale: cardExitScale,
            filter: cardExitFilter,
          }}
          className="overflow-hidden shadow-[0_28px_110px_-60px_rgba(43,38,32,0.58)]"
        >
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "brightness(1.16) sepia(0.22) saturate(0.86) contrast(0.96)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 28%, rgba(255,246,226,0.18), transparent 34%), linear-gradient(180deg, rgba(251,248,243,0.03) 0%, rgba(43,38,32,0.10) 48%, rgba(43,38,32,0.58) 100%)",
              }}
          />
          <motion.div
            aria-hidden="true"
            style={{ opacity: veilOpacity }}
            className="pointer-events-none absolute inset-0 bg-ivory"
          />

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

        <motion.div
          style={{ opacity: hintOp }}
          className="pointer-events-none absolute bottom-8 right-8 z-30 flex items-center gap-2 text-ivory/75"
        >
          <span className="text-[10px] uppercase tracking-widest2">Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.33, 1, 0.68, 1] }}
            className="block h-3 w-px bg-current"
          />
        </motion.div>
      </div>
    </section>
  );
}

function CollagePhoto({
  progress,
  item,
  vw,
  vh,
}: {
  progress: MotionValue<number>;
  item: (typeof heroCollage)[number];
  vw: number;
  vh: number;
}) {
  const enter = 0.05 + item.delay;
  const land = 0.42;
  const x = useTransform(progress, [enter, land], [item.fromXf * vw, item.finalXf * vw]);
  const opacity = useTransform(progress, [enter, enter + 0.06], [0, 1]);
  const scale = useTransform(progress, [enter, land], [0.96, 1]);

  return (
    <motion.div
      style={{
        x,
        y: item.yf * vh,
        opacity,
        scale,
        rotate: item.rotate,
        width: item.wf * vw,
        aspectRatio: item.aspect,
        position: "absolute",
        left: "50%",
        top: "50%",
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 10,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 20px 70px -34px rgba(43,38,32,0.34)",
      }}
    >
      <img
        src={item.src}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </motion.div>
  );
}
