"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { ObservatoryCover } from "../observatory-cover";
import SlidePage0 from "./slide-page0";
import SlidePage1 from "./slide-page1";
import SlidePage2 from "./slide-page2";
import SlidePage3 from "./slide-page3";
import SlidePage4 from "./slide-page4";
import SlidePage5 from "./slide-page5";
import SlidePage6 from "./slide-page6";
import SlidePage7 from "./slide-page7";
import SlidePage8 from "./slide-page8";
import SlidePage9 from "./slide-page9";
import SlidePage10 from "./slide-page10";
import SlidePage11 from "./slide-page11";
import SlidePage12 from "./slide-page12";
import SlidePage13 from "./slide-page13";
import SlidePage14 from "./slide-page14";
import SlidePage15 from "./slide-page15";
import SlidePage16 from "./slide-page16";
import SlidePage17 from "./slide-page17";
import SlidePage18 from "./slide-page18";
import SlidePage19 from "./slide-page19";
import SlidePage20 from "./slide-page20";
import SlidePage21 from "./slide-page21";
import SlidePage22 from "./slide-page22";
import SlidePage23 from "./slide-page23";
import SlidePage24 from "./slide-page24";
import SlidePage25 from "./slide-page25";
import SlidePage26 from "./slide-page26";

const slideComponents = [ObservatoryCover, /* SlidePage0, */ SlidePage1, SlidePage2, SlidePage3, SlidePage4, SlidePage5, SlidePage6, SlidePage7, SlidePage8, SlidePage9, SlidePage10, SlidePage11, SlidePage12, SlidePage13, SlidePage14, SlidePage15, SlidePage16, SlidePage17, SlidePage18, SlidePage19, SlidePage20, SlidePage21, SlidePage22, SlidePage23, SlidePage24, SlidePage25, SlidePage26];
const slideIds = ["cover", /* "page0", */ "page1", "page2", "page3", "page4", "page5", "page6", "page7", "page8", "page9", "page10", "page11", "page12", "page13", "page14", "page15", "page16", "page17", "page18", "page19", "page20", "page21", "page22", "page23", "page24", "page25", "page26"];

const SWIPE_THRESHOLD = 100;
const SWIPE_VELOCITY = 500;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0.5,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0.5,
  }),
};

export default function SlideContainer() {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = useCallback(
    (newDirection: number) => {
      const next = current + newDirection;
      if (next < 0 || next >= slideComponents.length) return;
      setCurrent([next, newDirection]);
    },
    [current],
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_THRESHOLD || velocity.x < -SWIPE_VELOCITY) {
      paginate(1);
    } else if (offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY) {
      paginate(-1);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [paginate]);

  const handleEnter = useCallback(() => {
    setCurrent([1, 1]);
  }, []);

  const Slide = slideComponents[current];
  const slideProps = current === 0 ? { onEnter: handleEnter } : {};

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={slideIds[current]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
        >
          <Slide {...slideProps} />
        </motion.div>
      </AnimatePresence>

      {/* Arrow hints — hidden on cover */}
      {current > 1 && (
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-opacity hover:bg-white/40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      {current > 0 && current < slideComponents.length - 1 && (
        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-opacity hover:bg-white/40"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
