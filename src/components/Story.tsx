"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
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

const chapterRanges = story.reduce<{ start: number; end: number }[]>((ranges, chapter) => {
  const start = ranges.length === 0 ? 0 : ranges[ranges.length - 1].end + 1;
  const end = start + chapter.moments.length - 1;
  ranges.push({ start, end });
  return ranges;
}, []);

function momentAnchor(index: number, total: number) {
  return total <= 1 ? 0 : index / (total - 1);
}

function momentTiming(index: number, total: number) {
  const span = total <= 1 ? 1 : 1 / (total - 1);
  const anchor = momentAnchor(index, total);
  const enter = Math.max(0, anchor - span * 0.38);
  const arrive = Math.max(0, anchor - span * 0.08);
  const active = anchor;
  const hold = Math.min(1, anchor + span * 0.34);
  const exit = index === total - 1 ? 1 : Math.min(1, anchor + span * 0.58);
  return { span, anchor, enter, arrive, active, hold, exit };
}

function chapterTiming(index: number) {
  const total = storyMoments.length;
  const range = chapterRanges[index];
  const nextRange = chapterRanges[index + 1];
  const span = total <= 1 ? 1 : 1 / (total - 1);
  const start = momentAnchor(range.start, total);
  const enter = index === 0 ? 0 : Math.max(0, start - span * 0.42);
  const arrive = index === 0 ? span * 0.01 : Math.max(0, start - span * 0.12);
  const exitStart = nextRange ? Math.max(0, momentAnchor(nextRange.start, total) - span * 0.2) : 1;
  const exitEnd = nextRange ? Math.max(0, momentAnchor(nextRange.start, total) + span * 0.14) : 1;
  return { enter, arrive, exitStart, exitEnd };
}

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 135,
    damping: 34,
    mass: 0.34,
  });

  return (
    <section
      id="cerita"
      ref={ref}
      className="relative bg-ivory md:h-[520vh]"
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
            {story.map((item, index) => (
              <ChapterCopy
                key={item.chapter}
                item={item}
                index={index}
                progress={smoothProgress}
                reduceMotion={reduceMotion}
              />
            ))}

            {storyMoments.map((item, index) => (
              <StoryPhoto
                key={`${item.chapter}-${item.momentIndex}`}
                item={item}
                index={index}
                progress={smoothProgress}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="h-[610vh] md:hidden">
        <MobileStory progress={smoothProgress} reduceMotion={reduceMotion} />
      </div>
    </section>
  );
}

function ChapterCopy({
  item,
  index,
  progress,
  reduceMotion,
}: {
  item: StoryItem;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const { enter, arrive, exitStart, exitEnd } = chapterTiming(index);
  const isLast = index === story.length - 1;
  const opacity = useTransform(
    progress,
    isLast
      ? [enter, arrive, 1]
      : [enter, arrive, exitStart, exitEnd],
    isLast
      ? [0, 1, 1]
      : [index === 0 ? 1 : 0, 1, 1, 0]
  );
  const x = useTransform(
    progress,
    isLast
      ? [enter, arrive, 1]
      : [enter, arrive, exitStart, exitEnd],
    isLast
      ? [index % 2 ? 24 : -24, 0, 0]
      : [index % 2 ? 24 : -24, 0, 0, index % 2 ? -24 : 24]
  );

  return (
    <motion.article
      style={{ opacity, x: reduceMotion ? 0 : x }}
      className={`absolute top-[43vh] max-w-[330px] ${
        index % 2 === 0
          ? "left-[calc(50%-535px)] text-right"
          : "left-[calc(50%+210px)] text-left"
      }`}
    >
      <p className="text-xl font-semibold leading-tight tracking-[-0.02em] text-ink xl:text-2xl">
        {item.chapterLabel}
      </p>
      <p className="mt-4 text-balance text-base leading-[1.72] text-stone xl:text-lg">
        {item.body}
      </p>
    </motion.article>
  );
}

function StoryPhoto({
  item,
  index,
  progress,
  reduceMotion,
}: {
  item: StoryMoment;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const total = storyMoments.length;
  const { enter, arrive, active, hold, exit } = momentTiming(index, total);
  const stackedY = index * 13;
  const waitingY = index === 0 ? stackedY : 380 + (index - 1) * 34;
  const y = useTransform(
    progress,
    index === 0
      ? [0, hold, exit]
      : [enter, arrive, active, hold, exit],
    index === 0
      ? [stackedY, stackedY, stackedY + 8]
        : [waitingY, 170, stackedY, stackedY, stackedY + 8]
  );
  const rotate = useTransform(
    progress,
    index === 0
      ? [0, active, exit]
      : [enter, arrive, active, exit],
    index === 0
      ? [1.2, 1.2, 1.6]
      : [index % 2 ? 2.2 : -2.2, index % 2 ? 0.4 : -0.4, index % 2 ? -1.1 : 1.1, index % 2 ? -1.5 : 1.5]
  );
  const scale = useTransform(
    progress,
    index === 0
      ? [0, hold, exit]
      : [enter, arrive, active, hold, exit],
    index === 0
      ? [1.035, 1.025, 0.99]
      : [0.94, 0.985, 1.035, 1.02, 0.99]
  );
  const opacity = 1;

  return (
    <div
      className="group absolute left-1/2 top-[57vh] w-[min(23vw,390px)] -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: 20 + index }}
    >
      <motion.figure
        style={{
          y: reduceMotion ? 0 : y,
          rotate: reduceMotion ? 0 : rotate,
          scale: reduceMotion ? 1 : scale,
          opacity,
        }}
        className="rounded-[10px] border border-ink/10 bg-[#f8f4eb] p-3 pb-5 shadow-[0_30px_74px_-38px_rgba(43,38,32,0.5)] will-change-transform"
      >
        <motion.div
          whileHover={reduceMotion ? undefined : { scale: 1.045 }}
          whileTap={reduceMotion ? undefined : { scale: 1.025 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="origin-center will-change-transform"
        >
          <img
            src={item.image}
            alt={item.caption || item.chapterLabel}
            className="aspect-[16/10] w-full rounded-[4px] object-cover"
          />
          {item.caption && (
            <figcaption className="mt-4 text-center text-sm leading-tight text-stone xl:text-base">
              {item.caption}
            </figcaption>
          )}
        </motion.div>
      </motion.figure>
    </div>
  );
}

function MobileStory({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  return (
    <div className="sticky top-0 h-screen overflow-hidden md:hidden">
      <div className="relative h-full px-6 pt-[9vh]">
        <h2 className="h-display text-center text-[18vw] leading-none tracking-[-0.04em] text-ink">
          our story
        </h2>

        <div className="relative mx-auto mt-7 h-[34vh] max-w-[680px]">
          {story.map((item, index) => (
            <MobileChapterCopy
              key={item.chapter}
              item={item}
              index={index}
              progress={progress}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 top-[clamp(24.25rem,45.5vh,28rem)] h-[40vh]">
          {storyMoments.map((item, index) => (
            <MobileStoryPhoto
              key={`${item.chapter}-${item.momentIndex}`}
              item={item}
              index={index}
              progress={progress}
              reduceMotion={reduceMotion}
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
  reduceMotion,
}: {
  item: StoryItem;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const total = storyMoments.length;
  const span = total <= 1 ? 1 : 1 / (total - 1);
  const { enter, arrive, exitStart, exitEnd } = chapterTiming(index);
  const isLast = index === story.length - 1;
  const opacity = useTransform(
    progress,
    isLast
      ? [Math.max(0, enter - span * 0.04), arrive, 1]
      : [Math.max(0, enter - span * 0.04), arrive, exitStart, exitEnd],
    isLast
      ? [0, 1, 1]
      : [index === 0 ? 1 : 0, 1, 1, 0]
  );

  return (
    <motion.article
      style={{ opacity }}
      className="absolute inset-0 text-center"
    >
      <p className="text-[clamp(1.28rem,4.55vw,1.85rem)] font-semibold leading-tight tracking-[-0.025em] text-ink">
        {item.chapterLabel}
      </p>
      <p className="mx-auto mt-4 max-w-[620px] text-[clamp(0.9rem,3.35vw,1.28rem)] leading-[1.48] text-stone">
        {item.body}
      </p>
    </motion.article>
  );
}

function MobileStoryPhoto({
  item,
  index,
  progress,
  reduceMotion,
}: {
  item: StoryMoment;
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
}) {
  const total = storyMoments.length;
  const previousAnchor = momentAnchor(index - 1, total);
  const { enter, arrive, active, hold, exit } = momentTiming(index, total);
  const stackedY = index * 12;
  const waitingY = index === 0 ? stackedY : 405;
  const lastMomentStart = momentAnchor(total - 1, total);
  const outroStart = Math.min(1, lastMomentStart + (total <= 1 ? 0.12 : (1 / (total - 1)) * 0.36));

  const y = useTransform(
    progress,
    index === 0
      ? [0, hold, exit, outroStart, 1]
      : [enter, arrive, active, hold, exit, outroStart, 1],
    index === 0
      ? [stackedY, stackedY, stackedY + 6, stackedY + 6, -34]
      : [waitingY, 64, stackedY, stackedY, stackedY + 6, stackedY + 6, -34]
  );
  const rotate = useTransform(
    progress,
    index === 0
      ? [0, active, exit]
      : [enter, arrive, active, exit],
    index === 0
      ? [-1.2, -1.2, -1.6]
      : [index % 2 ? 1.8 : -1.8, index % 2 ? 0.35 : -0.35, index % 2 ? -1 : 1, index % 2 ? -1.4 : 1.4]
  );
  const scale = useTransform(
    progress,
    index === 0
      ? [0, hold, exit]
      : [enter, arrive, active, hold, exit],
    index === 0
      ? [1.025, 1.02, 0.99]
      : [0.94, 0.98, 1.025, 1.015, 0.99]
  );
  const opacityInput =
    index === 0
      ? [0, 1]
      : index === 1
        ? [0, enter, arrive, 1]
        : [0, previousAnchor, enter, arrive, 1];
  const opacityOutput =
    index === 0
      ? [1, 1]
      : index === 1
        ? [0.82, 0.82, 1, 1]
        : [0, 0, 0.82, 1, 1];
  const opacity = useTransform(progress, opacityInput, opacityOutput);

  return (
    <div
      className="group absolute left-1/2 top-0 w-[78vw] max-w-[520px] -translate-x-1/2"
      style={{ zIndex: 20 + index }}
    >
      <motion.figure
        style={{
          y: reduceMotion ? 0 : y,
          rotate: reduceMotion ? 0 : rotate,
          scale: reduceMotion ? 1 : scale,
          opacity,
        }}
        className="rounded-[10px] border border-ink/10 bg-[#f8f4eb] p-3 pb-5 shadow-[0_28px_66px_-36px_rgba(43,38,32,0.46)] will-change-transform"
      >
        <img
          src={item.image}
          alt={item.caption || item.chapterLabel}
          className="aspect-[16/10] w-full rounded-[4px] object-cover"
        />
        {item.caption && (
          <figcaption className="mt-4 text-center text-[clamp(0.9rem,3.35vw,1.25rem)] leading-tight text-stone">
            {item.caption}
          </figcaption>
        )}
      </motion.figure>
    </div>
  );
}
