"use client";

import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { story } from "@/lib/content";

type StoryItem = (typeof story)[number];
type StoryMoment = StoryItem["moments"][number] & {
  chapter: string;
  chapterLabel: string;
  title: string;
  chapterIndex: number;
  momentIndex: number;
};

const storyMoments: StoryMoment[] = story.flatMap((chapter, chapterIndex) =>
  chapter.moments.map((moment, momentIndex) => ({
    ...moment,
    chapter: chapter.chapter,
    chapterLabel: chapter.chapterLabel,
    title: chapter.title,
    chapterIndex,
    momentIndex,
  }))
);

function chapterStart(index: number, total: number) {
  const step = 1 / total;
  return index === 0 ? 0 : Math.max(0, (index - 0.72) * step);
}

function chapterTiming(index: number, total: number) {
  const step = 1 / total;
  const start = chapterStart(index, total);
  const nextStart = index === total - 1 ? 1 : chapterStart(index + 1, total);
  const intro = Math.min(1, start + step * 0.12);
  const outro = Math.max(intro, nextStart + step * 0.08);
  const end = index === total - 1 ? 1 : Math.min(1, nextStart + step * 0.22);
  return { start, intro, outro, end };
}

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 38,
    mass: 0.18,
  });

  return (
    <section
      id="cerita"
      ref={ref}
      className="relative bg-ivory md:h-[430vh]"
    >
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <div className="container-narrow relative h-full">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: "-50%" }}
            className="h-display pointer-events-none absolute left-1/2 top-[14vh] z-0 w-max text-[10vw] leading-none text-ink xl:text-[9.8vw]"
          >
            our story
          </motion.h2>

          <div className="relative z-10 h-full">
            {storyMoments.map((item, index) => (
              <ChapterCopy
                key={`${item.chapter}-${item.momentIndex}`}
                item={item}
                index={index}
                progress={smoothProgress}
              />
            ))}

            {storyMoments.map((item, index) => (
              <StoryPhoto
                key={`${item.chapter}-${item.momentIndex}`}
                item={item}
                index={index}
                progress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="h-[560vh] md:hidden">
        <MobileStory progress={smoothProgress} />
      </div>
    </section>
  );
}

function ChapterCopy({
  item,
  index,
  progress,
}: {
  item: StoryMoment;
  index: number;
  progress: MotionValue<number>;
}) {
  const total = storyMoments.length;
  const step = 1 / total;
  const { start, intro, outro, end } = chapterTiming(index, total);
  const isLast = index === total - 1;
  const opacity = useTransform(
    progress,
    isLast
      ? [Math.max(0, start - 0.01), intro, 1]
      : [Math.max(0, start - 0.01), intro, outro, end],
    isLast
      ? [0, 1, 1]
      : [index === 0 ? 1 : 0, 1, 1, 0]
  );
  const x = useTransform(
    progress,
    isLast
      ? [Math.max(0, start - 0.01), intro, 1]
      : [Math.max(0, start - 0.01), intro, outro, end],
    isLast
      ? [index % 2 ? 24 : -24, 0, 0]
      : [index % 2 ? 24 : -24, 0, 0, index % 2 ? -24 : 24]
  );

  return (
    <motion.article
      style={{ opacity, x }}
      className={`absolute top-[43vh] max-w-[330px] ${
        index % 2 === 0
          ? "left-[calc(50%-535px)] text-right"
          : "left-[calc(50%+210px)] text-left"
      }`}
    >
      <p className="text-xl font-bold leading-tight text-ink xl:text-2xl">
        {item.chapterLabel}
      </p>
      <p className="mt-4 text-balance text-base leading-relaxed text-stone xl:text-lg">
        {item.body}
      </p>
    </motion.article>
  );
}

function StoryPhoto({
  item,
  index,
  progress,
}: {
  item: StoryMoment;
  index: number;
  progress: MotionValue<number>;
}) {
  const total = storyMoments.length;
  const step = 1 / total;
  const startFor = (i: number) => chapterStart(i, total);
  const start = startFor(index);
  const previousStart = startFor(index - 1);
  const preEnter = Math.max(0, start - step * 0.1);
  const approach = Math.min(1, start + step * 0.2);
  const arrive = Math.min(1, start + step * 0.34);
  const isLast = index === total - 1;
  const hold = isLast ? 0.9 : Math.min(1, start + step * 0.6);
  const leave = isLast ? 1 : Math.min(1, start + step * 0.78);
  const stackedY = index * 14;
  const waitingY = index === 0 ? stackedY : 300 + (index - 1) * 36;
  const y = useTransform(
    progress,
    index === 0
      ? [0, hold, leave]
      : [preEnter, start, approach, arrive, hold, leave],
    index === 0
      ? [stackedY, stackedY, stackedY + 10]
      : [waitingY, 172, 34, stackedY, stackedY, stackedY + 10]
  );
  const rotate = useTransform(
    progress,
    index === 0
      ? [0, arrive, leave]
      : [preEnter, start, approach, arrive, leave],
    index === 0
      ? [1.2, 1.2, 1.7]
      : [index % 2 ? 3 : -3, index % 2 ? 1.2 : -1.2, index % 2 ? -0.4 : 0.4, index % 2 ? -1.2 : 1.2, index % 2 ? -1.7 : 1.7]
  );
  const scale = useTransform(
    progress,
    index === 0
      ? [0, arrive, leave]
      : [preEnter, start, approach, arrive, leave],
    index === 0
      ? [1, 1, 0.985]
      : [0.95, 0.985, 1, 1, 0.985]
  );
  const opacityInput =
    index === 0
      ? [0, 1]
      : index === 1
        ? [0, preEnter, start, 1]
        : [0, previousStart, preEnter, start, 1];
  const opacityOutput =
    index === 0
      ? [1, 1]
      : index === 1
        ? [0.82, 0.82, 1, 1]
        : [0, 0, 0.82, 1, 1];
  const opacity = useTransform(progress, opacityInput, opacityOutput);

  return (
    <div
      className="absolute left-1/2 top-[57vh] w-[min(24vw,400px)] -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: 20 + index }}
    >
      <motion.figure
        style={{ y, rotate, scale, opacity }}
        className="rounded-[10px] border border-ink/10 bg-[#f8f4eb] p-3 pb-5 shadow-[0_22px_54px_-30px_rgba(43,38,32,0.5)]"
      >
        <img
          src={item.image}
          alt={item.caption}
          className="aspect-[16/10] w-full rounded-[4px] object-cover"
        />
        <figcaption className="mt-4 text-center text-sm text-stone xl:text-base">
          {item.caption}
        </figcaption>
      </motion.figure>
    </div>
  );
}

function MobileStory({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="sticky top-0 h-screen overflow-hidden md:hidden">
      <div className="relative h-full px-6 pt-[10vh]">
        <h2 className="h-display text-center text-[19vw] leading-none text-ink">
          our story
        </h2>

        <div className="relative mx-auto mt-8 h-[32vh] max-w-[680px]">
          {storyMoments.map((item, index) => (
            <MobileChapterCopy
              key={`${item.chapter}-${item.momentIndex}`}
              item={item}
              index={index}
              progress={progress}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 top-[48vh] h-[38vh]">
          {storyMoments.map((item, index) => (
            <MobileStoryPhoto
              key={`${item.chapter}-${item.momentIndex}`}
              item={item}
              index={index}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileChapterCopy({
  item,
  index,
  progress,
}: {
  item: StoryMoment;
  index: number;
  progress: MotionValue<number>;
}) {
  const total = storyMoments.length;
  const step = 1 / total;
  const { start, intro, outro, end } = chapterTiming(index, total);
  const isLast = index === total - 1;
  const opacity = useTransform(
    progress,
    isLast
      ? [Math.max(0, start - step * 0.08), intro, 1]
      : [Math.max(0, start - step * 0.08), intro, outro, end],
    isLast
      ? [0, 1, 1]
      : [index === 0 ? 1 : 0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    isLast
      ? [Math.max(0, start - step * 0.08), intro, 1]
      : [Math.max(0, start - step * 0.08), intro, end],
    isLast
      ? [16, 0, 0]
      : [16, 0, -18]
  );

  return (
    <motion.article
      style={{ opacity, y }}
      className="absolute inset-0 text-center"
    >
      <p className="text-[clamp(1.5rem,5.4vw,2.1rem)] font-bold leading-tight text-ink">
        {item.chapterLabel}
      </p>
      <p className="mx-auto mt-4 max-w-[620px] text-[clamp(1rem,4.15vw,1.55rem)] leading-[1.38] text-stone">
        {item.body}
      </p>
    </motion.article>
  );
}

function MobileStoryPhoto({
  item,
  index,
  progress,
}: {
  item: StoryMoment;
  index: number;
  progress: MotionValue<number>;
}) {
  const total = storyMoments.length;
  const step = 1 / total;
  const startFor = (i: number) => chapterStart(i, total);
  const start = startFor(index);
  const previousStart = startFor(index - 1);
  const preEnter = Math.max(0, start - step * 0.1);
  const approach = Math.min(1, start + step * 0.2);
  const arrive = Math.min(1, start + step * 0.34);
  const hold = Math.min(1, start + step * 0.6);
  const leave = Math.min(1, start + step * 0.78);
  const stackedY = index * 12;
  const waitingY = index === 0 ? stackedY : 238;

  const y = useTransform(
    progress,
    index === 0
      ? [0, hold, leave]
      : [preEnter, start, approach, arrive, hold, leave],
    index === 0
      ? [stackedY, stackedY, stackedY + 8]
      : [waitingY, 148, 32, stackedY, stackedY, stackedY + 8]
  );
  const rotate = useTransform(
    progress,
    index === 0
      ? [0, arrive, leave]
      : [preEnter, start, approach, arrive, leave],
    index === 0
      ? [-1.4, -1.4, -1.8]
      : [index % 2 ? 2.2 : -2.2, index % 2 ? 1 : -1, index % 2 ? -0.4 : 0.4, index % 2 ? -1.2 : 1.2, index % 2 ? -1.7 : 1.7]
  );
  const scale = useTransform(
    progress,
    index === 0
      ? [0, arrive, leave]
      : [preEnter, start, approach, arrive, leave],
    index === 0
      ? [1, 1, 0.985]
      : [0.96, 0.985, 1, 1, 0.985]
  );
  const opacityInput =
    index === 0
      ? [0, 1]
      : index === 1
        ? [0, preEnter, start, 1]
        : [0, previousStart, preEnter, start, 1];
  const opacityOutput =
    index === 0
      ? [1, 1]
      : index === 1
        ? [0.82, 0.82, 1, 1]
        : [0, 0, 0.82, 1, 1];
  const opacity = useTransform(progress, opacityInput, opacityOutput);

  return (
    <div
      className="absolute left-1/2 top-0 w-[62vw] max-w-[460px] -translate-x-1/2"
      style={{ zIndex: 20 + index }}
    >
      <motion.figure
        style={{ y, rotate, scale, opacity }}
        className="rounded-[10px] border border-ink/10 bg-[#f8f4eb] p-3 pb-6 shadow-[0_22px_56px_-30px_rgba(43,38,32,0.52)]"
      >
        <img
          src={item.image}
          alt={item.caption}
          className="aspect-[16/10] w-full rounded-[4px] object-cover"
        />
        <figcaption className="mt-4 text-center text-[clamp(0.95rem,3.5vw,1.35rem)] text-stone">
          {item.caption}
        </figcaption>
      </motion.figure>
    </div>
  );
}
