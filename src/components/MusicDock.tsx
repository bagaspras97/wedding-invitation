"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const audioSrc = "/audio/wedding-song.mp3";

export default function MusicDock() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlaybackIssue, setHasPlaybackIssue] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const reduceMotion = useReducedMotion();

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0.42;
      await audio.play();
      setHasPlaybackIssue(false);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setHasPlaybackIssue(true);
    }
  };

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.42;

    const syncPaused = () => setIsPlaying(false);
    const syncPlaying = () => {
      setHasPlaybackIssue(false);
      setIsPlaying(true);
    };
    const startFromCover = () => {
      void playMusic();
    };

    audio.addEventListener("playing", syncPlaying);
    audio.addEventListener("pause", syncPaused);
    audio.addEventListener("ended", syncPaused);
    window.addEventListener("invitation:open", startFromCover);

    return () => {
      audio.removeEventListener("playing", syncPlaying);
      audio.removeEventListener("pause", syncPaused);
      audio.removeEventListener("ended", syncPaused);
      window.removeEventListener("invitation:open", startFromCover);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.72, delay: 0.35, ease }}
      className="fixed bottom-[5.6rem] right-5 z-[60] md:bottom-8 md:left-8 md:right-auto"
    >
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />
      <div className="flex items-center gap-1.5 rounded-full border border-white/35 bg-ivory/20 p-1.5 text-ink shadow-[0_22px_70px_-44px_rgba(43,38,32,0.72)] backdrop-blur-xl md:bg-ivory/76 md:pr-3">
        <motion.button
          type="button"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          aria-pressed={isPlaying}
          title={hasPlaybackIssue ? "Tap to play music" : isPlaying ? "Pause music" : "Play music"}
          onClick={() => {
            if (isPlaying) {
              pauseMusic();
              return;
            }

            void playMusic();
          }}
          whileTap={{ scale: 0.96 }}
          className="grid size-12 place-items-center rounded-full bg-ink text-ivory shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-accent/45 md:size-11"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isPlaying ? "pause" : "play"}
              initial={{ opacity: 0, scale: 0.78, rotate: isPlaying ? -8 : 8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.78, rotate: isPlaying ? 8 : -8 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.22, ease }}
              className="grid place-items-center"
            >
              {isPlaying ? <Pause size={17} strokeWidth={1.8} /> : <Play size={17} strokeWidth={1.8} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <Equalizer active={isPlaying} reduceMotion={Boolean(reduceMotion)} />
      </div>
    </motion.div>
  );
}

function Equalizer({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  const bars = [14, 22, 18] as const;

  return (
    <div className="hidden h-7 items-end gap-1 px-1.5 md:flex" aria-hidden="true">
      {bars.map((height, index) => (
        <motion.span
          key={height}
          animate={
            active && !reduceMotion
              ? { height: [8, height, 10], opacity: [0.46, 1, 0.58] }
              : { height: 8, opacity: 0.42 }
          }
          transition={{
            duration: 0.8 + index * 0.12,
            repeat: active && !reduceMotion ? Infinity : 0,
            ease: "easeInOut",
            delay: index * 0.08,
          }}
          className="w-1 rounded-full bg-accent"
        />
      ))}
    </div>
  );
}
