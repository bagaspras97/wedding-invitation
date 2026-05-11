"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { couple, heroCollage, heroImage, weddingDate } from "@/lib/content";

const fmt = (d: Date) =>
  d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });

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
  return (
    <section id="top" className="relative min-h-[100svh] bg-[#ece7df]">
      <div className="relative flex min-h-[100svh] flex-col px-3 pb-3 pt-[4.9rem]">
        <motion.div
          style={{
            borderRadius: 24,
          }}
          className="relative mx-auto h-[calc(100svh-5.65rem)] min-h-[30rem] w-full max-w-[30rem] overflow-hidden shadow-[0_26px_90px_-54px_rgba(43,38,32,0.5)]"
        >
          <motion.img
            src={heroImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[50%_48%]"
            style={{ filter: "brightness(1.28) sepia(0.2) saturate(0.9) contrast(0.96)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 52% 24%, rgba(255,246,226,0.24), transparent 34%), linear-gradient(180deg, rgba(251,248,243,0.06) 0%, rgba(63,52,40,0.08) 52%, rgba(43,38,32,0.52) 100%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 px-7 pb-6 text-ivory"
          >
            <p className="mb-1 text-[10px] uppercase tracking-widest2 text-ivory/75">
              {fmt(weddingDate)}
            </p>
            <h1 className="font-display text-[clamp(2.45rem,10vw,3.25rem)] font-light italic leading-[0.92] drop-shadow-[0_8px_28px_rgba(43,38,32,0.24)]">
              {couple.heroNames}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="absolute bottom-6 right-6 flex items-center gap-2 text-ivory/60"
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
    ["blur(0px)", "blur(0px)", "blur(0px)"]
  );

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
            style={{ filter: "brightness(1.44) sepia(0.16) saturate(0.92) contrast(0.94)" }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 28%, rgba(255,246,226,0.2), transparent 34%), linear-gradient(180deg, rgba(251,248,243,0.05) 0%, rgba(43,38,32,0.04) 48%, rgba(43,38,32,0.26) 100%)",
            }}
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
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.86) sepia(0.18) saturate(0.78) contrast(0.96)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(43,38,32,0.08) 0%, rgba(43,38,32,0.16) 100%)",
        }}
      />
    </motion.div>
  );
}
