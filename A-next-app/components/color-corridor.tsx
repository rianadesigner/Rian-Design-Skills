"use client";

import { useEffect, useRef, useState } from "react";

const corridorImages = [
  "/corridor-images/0b2fb36f46e4792dd533c839fb40522d.jpg",
  "/corridor-images/4f1a66a9d95d83315887af71c8b8a2e7.jpg",
  "/corridor-images/8a91003ccd3e6116166c89ec314723b1.jpg",
  "/corridor-images/8c39242f2a8e172655ca7a6d7bce9c36.jpg",
  "/corridor-images/9f1b931cc3271db0b405b2f329d7e89f.jpg",
  "/corridor-images/39c46d9254d411ac6e4db84d47b3f5cb.jpg",
  "/corridor-images/39f74daf93c80c42b3dcc50e7db12e5e.jpg",
  "/corridor-images/974cd7f19d214d6febc761ea4aebccc5.jpg",
  "/corridor-images/ab3d8e3a5bdfb4071ec572f1d5a29479.jpg",
  "/corridor-images/e51aa87e017e93815a46fe648577a039.jpg",
  "/corridor-images/f533654872a9ad43464cf63eacc68df6.jpg",
];

const sharedCardImagePool = [
  "/corridor-images/0b2fb36f46e4792dd533c839fb40522d.jpg",
  "/corridor-images/8c39242f2a8e172655ca7a6d7bce9c36.jpg",
  "/corridor-images/f9f81e59b9371e45f8b751a279ef73d6.jpg",
  "/corridor-images/39f74daf93c80c42b3dcc50e7db12e5e.jpg",
  "/corridor-images/39c46d9254d411ac6e4db84d47b3f5cb.jpg",
  "/corridor-images/e51aa87e017e93815a46fe648577a039.jpg",
  "/corridor-images/d92d71dd4135e4ee57afdd3fd6bcc35a.jpg",
];

const placeholderCards = [
  { color: "#ef5d45", x: -508, y: 28, rotation: -20 },
  { color: "#5977d9", x: -339, y: 6, rotation: -13.33 },
  { color: "#f2c84b", x: -169, y: -5, rotation: -6.67 },
  { color: "#f08bae", x: 0, y: -10, rotation: 0 },
  { color: "#8b55b5", x: 169, y: -5, rotation: 6.67 },
  { color: "#f06d35", x: 339, y: 6, rotation: 13.33 },
  { color: "#57ad82", x: 508, y: 28, rotation: 20 },
];

const marketplaceCards = [
  { x: 80, y: 20, rotation: -12 },
  { x: 230, y: 75, rotation: -8 },
  { x: 380, y: 130, rotation: -4 },
  { x: 530, y: 185, rotation: 1 },
  { x: 680, y: 240, rotation: 6 },
  { x: 830, y: 295, rotation: 11 },
  {
    x: "calc(50vw + 24px)",
    y: "38vh",
    rotation: 16,
  },
];

const SLOT_TRAVEL = [0, 0.06, 0.145, 0.255, 0.375, 0.485, 0.585];
const SLOT_SCALE_RATIO = [0.1, 0.16, 0.27, 0.43, 0.68, 1, 1.35];
const SLOT_ROTATION = [12, 16, 21, 27, 33, 39, 45];
const TRACK_SPACING = 0.9;
const CENTER_GAP = 0;
const BIRTH_GROWTH_SLOTS = 1;
const PRE_PUSH_START_SLOT = 0.55;
const PRE_PUSH_END_SLOT = 1.85;

const BAR_START = 180;
const BAR_END = 900;
const IMAGE_REVEAL_PROGRESS = 0.8;
const IMAGE_START =
  BAR_START +
  (BAR_END - BAR_START) *
    (1 - Math.cbrt(1 - IMAGE_REVEAL_PROGRESS));
const FILL_DURATION = 1000;
const FILLED_STREAM_POSITION = 6;
const STEADY_SPEED = 1.25 * (2 / 3);
const INITIAL_SPEED =
  (2 * FILLED_STREAM_POSITION) / (FILL_DURATION / 1000) - STEADY_SPEED;
const DECELERATION =
  (STEADY_SPEED - INITIAL_SPEED) / (FILL_DURATION / 1000);
const STREAM_PAIR_COUNT = 32;
const MAX_VISIBLE_SLOT = 5.25;

const streamPairs = Array.from({ length: STREAM_PAIR_COUNT }, (_, index) => ({
  generation: index,
}));

const getRandomizedImage = (cardIndex: number, replayKey: number) => {
  const strides = [2, 3, 5, 7, 8, 10];
  const stride = strides[replayKey % strides.length];
  const offset = (replayKey * 5 + 7) % corridorImages.length;
  return corridorImages[(cardIndex * stride + offset) % corridorImages.length];
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const easeInOut = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

const easeOut = (value: number) => 1 - Math.pow(1 - clamp(value), 3);

const easeIntoLinearMotion = (value: number) => {
  const t = clamp(value);
  return t * t * (2 - t);
};

const interpolateSlot = (values: number[], slot: number) => {
  const last = values.length - 1;

  if (slot >= last) {
    const step = values[last] - values[last - 1];
    return values[last] + step * (slot - last);
  }

  const lower = Math.max(Math.floor(slot), 0);
  const upper = Math.min(lower + 1, last);
  const mix = slot - lower;
  const mixSquared = mix * mix;
  const mixCubed = mixSquared * mix;

  const getSlope = (index: number) => {
    if (index === 0) return values[1] - values[0];
    if (index === last) return values[last] - values[last - 1];

    const before = values[index] - values[index - 1];
    const after = values[index + 1] - values[index];
    if (before === 0 || after === 0 || before * after < 0) return 0;
    return (2 * before * after) / (before + after);
  };

  const lowerSlope = getSlope(lower);
  const upperSlope = getSlope(upper);
  const lowerWeight = 2 * mixCubed - 3 * mixSquared + 1;
  const lowerSlopeWeight = mixCubed - 2 * mixSquared + mix;
  const upperWeight = -2 * mixCubed + 3 * mixSquared;
  const upperSlopeWeight = mixCubed - mixSquared;

  return (
    lowerWeight * values[lower] +
    lowerSlopeWeight * lowerSlope +
    upperWeight * values[upper] +
    upperSlopeWeight * upperSlope
  );
};

const getStreamPosition = (elapsed: number) => {
  const motionElapsed = Math.max(elapsed - IMAGE_START, 0) / 1000;
  const fillSeconds = FILL_DURATION / 1000;

  if (motionElapsed <= fillSeconds) {
    return (
      INITIAL_SPEED * motionElapsed +
      0.5 * DECELERATION * motionElapsed * motionElapsed
    );
  }

  return (
    FILLED_STREAM_POSITION +
    (motionElapsed - fillSeconds) * STEADY_SPEED
  );
};

export function ColorCorridor() {
  const pageScrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [firstSceneVersion, setFirstSceneVersion] = useState(0);
  const [secondSceneVersion, setSecondSceneVersion] = useState(0);
  const [secondSceneClosing, setSecondSceneClosing] = useState(false);
  const [thirdSceneVersion, setThirdSceneVersion] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [fourthScale, setFourthScale] = useState(2.4);
  const sharedCardImages = sharedCardImagePool;
  const [sharedCardPhase, setSharedCardPhase] = useState<
    | "hidden"
    | "fading-out"
    | "second-enter"
    | "closing"
    | "holding"
    | "third-expand"
    | "third-return"
    | "third-closing"
    | "fourth-expand"
    | "fourth-closing"
  >("hidden");

  useEffect(() => {
    const updateFourthScale = () => {
      setFourthScale((window.innerHeight * 0.8) / 360);
    };

    updateFourthScale();
    window.addEventListener("resize", updateFourthScale);
    return () => window.removeEventListener("resize", updateFourthScale);
  }, []);

  useEffect(() => {
    const scroller = pageScrollRef.current;
    if (!scroller) return;

    let unlockTimer = 0;
    let collapseTimer = 0;
    let fourthTimer = 0;
    let wheelGestureTimer = 0;
    let wheelGestureActive = false;
    let previousScrollTop = scroller.scrollTop;
    let observedPage = Math.round(previousScrollTop / scroller.clientHeight);
    let targetPage = observedPage;
    let arrivalAction: (() => void) | null = null;
    let backwardTransition = false;

    const finishPageArrival = () => {
      if (backwardTransition) {
        backwardTransition = false;
        setActivePage(targetPage);
      }
      if (!arrivalAction) return;
      const action = arrivalAction;
      arrivalAction = null;
      action();
    };

    const handleScroll = () => {
      const scrollTop = scroller.scrollTop;
      const movingDown = scrollTop >= previousScrollTop;
      const rawPage = scrollTop / scroller.clientHeight;
      const page = clamp(
        movingDown ? Math.ceil(rawPage - 0.001) : Math.floor(rawPage + 0.001),
        0,
        3,
      );
      previousScrollTop = scrollTop;

      if (page !== observedPage) {
        observedPage = page;
        if (!backwardTransition) {
          setActivePage(page);
          if (page === 0) setSharedCardPhase("hidden");
        }
      }

      if (Math.abs(rawPage - targetPage) < 0.002) {
        finishPageArrival();
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY === 0) return;
      event.preventDefault();

      window.clearTimeout(wheelGestureTimer);
      wheelGestureTimer = window.setTimeout(() => {
        wheelGestureActive = false;
      }, 240);

      if (wheelGestureActive) return;
      wheelGestureActive = true;

      const currentPage = targetPage;
      const nextPage = clamp(currentPage + (event.deltaY > 0 ? 1 : -1), 0, 3);
      if (nextPage === currentPage) return;
      const movingBackward = nextPage < currentPage;
      backwardTransition = movingBackward;
      targetPage = nextPage;
      arrivalAction = null;
      window.clearTimeout(unlockTimer);
      window.clearTimeout(collapseTimer);
      window.clearTimeout(fourthTimer);
      if (!movingBackward) setActivePage(nextPage);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (movingBackward) {
        setSecondSceneClosing(false);
        setSharedCardPhase("fading-out");

        if (nextPage === 0) {
          arrivalAction = () => {
            setFirstSceneVersion((version) => version + 1);
          };
        } else if (nextPage === 1) {
          arrivalAction = () => {
            setSecondSceneVersion((version) => version + 1);
            setSharedCardPhase("second-enter");
          };
        } else {
          arrivalAction = () => {
            setThirdSceneVersion((version) => version + 1);
            setSharedCardPhase("third-return");
          };
        }

        scroller.scrollTo({
          top: nextPage * scroller.clientHeight,
          behavior: reduceMotion ? "auto" : "smooth",
        });
        unlockTimer = window.setTimeout(
          finishPageArrival,
          reduceMotion ? 100 : 2200,
        );
        return;
      }

      if (currentPage === 1 && nextPage === 2) {
        const collapseDuration = reduceMotion ? 0 : 1000;

        setSecondSceneClosing(true);
        setSharedCardPhase("closing");

        scroller.scrollTo({
          top: nextPage * scroller.clientHeight,
          behavior: reduceMotion ? "auto" : "smooth",
        });
        collapseTimer = window.setTimeout(() => {
          setThirdSceneVersion((version) => version + 1);
          setSharedCardPhase("third-expand");
        }, collapseDuration);
        return;
      }

      if (currentPage === 2 && nextPage === 3) {
        const collapseDuration = reduceMotion ? 0 : 1000;

        setSharedCardPhase("third-closing");
        scroller.scrollTo({
          top: nextPage * scroller.clientHeight,
          behavior: reduceMotion ? "auto" : "smooth",
        });
        fourthTimer = window.setTimeout(() => {
          setSharedCardPhase("fourth-expand");
        }, collapseDuration);
        return;
      }

      if (nextPage === 0) {
        setSharedCardPhase("hidden");
        setFirstSceneVersion((version) => version + 1);
      } else if (nextPage === 1) {
        setSecondSceneClosing(false);
        setSecondSceneVersion((version) => version + 1);
        setSharedCardPhase("second-enter");
      } else if (nextPage === 2) {
        setSharedCardPhase("third-expand");
        setThirdSceneVersion((version) => version + 1);
      } else {
        setSharedCardPhase("fourth-expand");
      }

      scroller.scrollTo({
        top: nextPage * scroller.clientHeight,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(unlockTimer);
      window.clearTimeout(collapseTimer);
      window.clearTimeout(fourthTimer);
      window.clearTimeout(wheelGestureTimer);
      scroller.classList.remove("is-transition-locked");
      scroller.removeEventListener("wheel", handleWheel);
      scroller.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const aperture = apertureRef.current;
    if (!stage || !aperture) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const startedAt = performance.now();
    let frame = 0;

    const render = (now: number) => {
      const elapsed = reduceMotion
        ? BAR_END + FILL_DURATION + 900
        : now - startedAt;
      const width = stage.clientWidth;
      const baseCardWidth = cardRefs.current[0]?.offsetWidth ?? width * 0.125;
      const baseCardHeight = (baseCardWidth * 4) / 3;
      const outerScale = (window.innerHeight * 0.8) / baseCardHeight;
      const centerScaleRatio =
        aperture.offsetHeight / (baseCardHeight * outerScale);
      const scaleRatios = [centerScaleRatio, ...SLOT_SCALE_RATIO.slice(1)];
      const prePushDistance =
        baseCardWidth * centerScaleRatio * outerScale;
      const streamPosition = getStreamPosition(elapsed);
      const imagesStarted = elapsed >= IMAGE_START;
      const barProgress = easeOut(
        (elapsed - BAR_START) / (BAR_END - BAR_START),
      );

      aperture.style.setProperty("--open", barProgress.toFixed(4));
      aperture.style.opacity = "1";

      streamPairs.forEach((pair) => {
        const pairIndex = pair.generation;
        const rawStreamAge = streamPosition - pair.generation;
        const streamAge =
          rawStreamAge >= 0 ? rawStreamAge % STREAM_PAIR_COUNT : rawStreamAge;
        const prePushDuration = PRE_PUSH_END_SLOT - PRE_PUSH_START_SLOT;
        const prePushProgress = easeIntoLinearMotion(
          (streamAge - PRE_PUSH_START_SLOT) / prePushDuration,
        );
        const birthProgress = easeInOut(streamAge / BIRTH_GROWTH_SLOTS);
        const slot = Math.max(streamAge - PRE_PUSH_END_SLOT, 0);
        const birthScale = 0.2 + birthProgress * 0.8;

        const scale = interpolateSlot(scaleRatios, slot) * outerScale;
        const rotationSlot =
          clamp(slot / MAX_VISIBLE_SLOT) * (SLOT_ROTATION.length - 1);
        const rotation = interpolateSlot(SLOT_ROTATION, rotationSlot);
        const x =
          CENTER_GAP / 2 +
          prePushDistance * prePushProgress +
          interpolateSlot(SLOT_TRAVEL, slot) * width * TRACK_SPACING;
        const visible =
          imagesStarted && streamAge >= 0 && slot <= MAX_VISIBLE_SLOT ? 1 : 0;

        const leftCard = cardRefs.current[pairIndex * 2];
        const rightCard = cardRefs.current[pairIndex * 2 + 1];

        [leftCard, rightCard].forEach((card, sideIndex) => {
          if (!card) return;
          const direction = sideIndex === 0 ? -1 : 1;
          card.style.setProperty("--x", `${direction * x}px`);
          card.style.setProperty("--scale", scale.toFixed(4));
          card.style.setProperty(
            "--rotate",
            `${direction * -rotation}deg`,
          );
          card.style.setProperty("--birth", birthScale.toFixed(4));
          card.style.opacity = visible.toFixed(4);
          card.style.zIndex = String(20 + Math.round(clamp(slot, 0, 8) * 10));
        });
      });

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [firstSceneVersion]);

  return (
    <div className="color-corridor-preview">
      <div
        className={`shared-card-stage is-${activePage === 0 ? "hidden" : sharedCardPhase}`}
        key={`shared-cards-${secondSceneVersion}`}
        style={{ "--fourth-scale": fourthScale } as React.CSSProperties}
        aria-hidden="true"
      >
        {placeholderCards.map((card, index) => {
          const thirdCard = marketplaceCards[index];
          const image = sharedCardImages[index];

          return (
            <span
              className="placeholder-card shared-card"
              key={`${card.color}-${index}`}
              style={
                {
                  "--card-color": card.color,
                  backgroundImage: `url("${image}")`,
                  "--card-x":
                    typeof card.x === "number" ? `${card.x}px` : card.x,
                  "--card-y":
                    typeof card.y === "number" ? `${card.y}px` : card.y,
                  "--card-rotation": `${card.rotation}deg`,
                  "--third-x":
                    typeof thirdCard.x === "number"
                      ? `${thirdCard.x}px`
                      : thirdCard.x,
                  "--third-y":
                    typeof thirdCard.y === "number"
                      ? `${thirdCard.y}px`
                      : thirdCard.y,
                  "--third-rotation": `${thirdCard.rotation}deg`,
                  "--card-delay": `${index * 0.055}s`,
                  "--card-order": index,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>

      <div className="page-scroll" ref={pageScrollRef}>
      <main className="hero-shell">
        <section className="hero-copy" aria-labelledby="hero-title">
          <p className="eyebrow">
            Show your brilliance to the fullest
          </p>
          <h1 id="hero-title">
            Discovering that art makes
            <br />
            life more creative
          </h1>
        </section>

        <div
          className="corridor"
          ref={stageRef}
          aria-label="Images appearing in pairs and expanding out from the center"
        >
          <div className="corridor-glow" aria-hidden="true" />
          <div
            className="center-aperture"
            ref={apertureRef}
            aria-hidden="true"
          />

          {streamPairs.flatMap((pair, pairIndex) =>
            ([0, 1] as const).map((sideIndex) => {
              const cardIndex = pairIndex * 2 + sideIndex;
              const image = getRandomizedImage(cardIndex, 0);
              return (
                <div
                  className="color-card"
                  key={`${pair.generation}-${sideIndex}`}
                  ref={(node) => {
                    cardRefs.current[cardIndex] = node;
                  }}
                  style={
                    {
                      backgroundImage: `url("${image}")`,
                      "--base-shift": sideIndex === 0 ? "-100%" : "0%",
                      "--origin-x": sideIndex === 0 ? "100%" : "0%",
                    } as React.CSSProperties
                  }
                  aria-hidden="true"
                />
              );
            }),
          )}
        </div>

        <section className="hero-footnote" aria-label="Introduction">
          <p>
            Strive to discover the beauty in life, and make life more creative
            and meaningful
          </p>
          <span>Scroll down to see more</span>
        </section>
      </main>

      <section
        id="display"
        className={`motion-screen display-screen${activePage === 1 ? " is-active" : ""}${secondSceneClosing ? " is-closing" : ""}`}
        key={`display-${secondSceneVersion}`}
        aria-labelledby="display-title"
      >
        <div className="display-heading">
          <p>Showcase the wonderful moments.</p>
          <h2 id="display-title">
            Every wonderful moment of your praise.
          </h2>
        </div>

        <div className="display-caption">
          <p>Keep scrolling down to see more exciting content</p>
        </div>
      </section>

      <section
        id="marketplace"
        className={`motion-screen marketplace-screen${activePage === 2 && (sharedCardPhase === "third-expand" || sharedCardPhase === "third-return" || sharedCardPhase === "fading-out") ? " is-active" : ""}${activePage === 2 && sharedCardPhase === "third-closing" ? " is-closing" : ""}`}
        key={`marketplace-${thirdSceneVersion}`}
        aria-labelledby="marketplace-title"
      >
        <div className="marketplace-copy">
          <h2 id="marketplace-title">
            Your talent deserves to be recognized by others.
          </h2>
          <p className="marketplace-description">
            Please fully exhibit your unique beauty in life and be yourself to
            the fullest.
          </p>
          <span className="marketplace-action">Let&apos;s go</span>
        </div>

      </section>
      <section
        id="featured-moment"
        className={`motion-screen featured-screen${activePage === 3 && (sharedCardPhase === "fourth-expand" || sharedCardPhase === "fading-out") ? " is-active" : ""}`}
        aria-labelledby="featured-title"
      >
        <div className="featured-copy">
          <h2 id="featured-title">
            The moment you look forward to
          </h2>
          <p className="marketplace-description">
            The moment you should look forward to most
          </p>
          <span className="marketplace-action">Start exploring</span>
        </div>
      </section>
      </div>
    </div>
  );
}
