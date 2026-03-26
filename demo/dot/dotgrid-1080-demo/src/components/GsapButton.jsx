import { useMemo, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

import './GsapButton.css';

export default function GsapButton({
  label = 'Hover / Click',
  onClick,
}) {
  const btnRef = useRef(null);
  const shineRef = useRef(null);
  const rippleRef = useRef(null);
  const labelRef = useRef(null);

  const id = useMemo(() => Math.random().toString(36).slice(2), []);

  const playShine = useCallback(() => {
    const btn = btnRef.current;
    const shine = shineRef.current;
    if (!btn || !shine) return;

    // One-shot shine sweep (no infinite repeat -> less CPU).
    gsap.killTweensOf(shine);
    gsap.set(shine, { xPercent: -140, opacity: 1 });
    gsap.to(shine, {
      xPercent: 140,
      duration: 0.7,
      ease: 'power2.out',
      onComplete: () => gsap.set(shine, { opacity: 0 }),
    });
  }, []);

  const onEnter = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.killTweensOf(btn);
    gsap.to(btn, { scale: 1.04, duration: 0.22, ease: 'power2.out' });
    playShine();
  }, [playShine]);

  const onLeave = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    gsap.killTweensOf(btn);
    gsap.to(btn, { scale: 1, duration: 0.18, ease: 'power2.out' });
    const shine = shineRef.current;
    if (shine) gsap.killTweensOf(shine);
  }, []);

  const onPress = useCallback(
    (e) => {
      const btn = btnRef.current;
      const ripple = rippleRef.current;
      const labelEl = labelRef.current;
      if (!btn || !ripple) return;

      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rippleRect = ripple.getBoundingClientRect();
      const size = rippleRect.width || 160;

      gsap.killTweensOf(ripple);
      gsap.set(ripple, {
        left: x - size / 2,
        top: y - size / 2,
        opacity: 1,
        scale: 0.2,
      });
      gsap.to(ripple, {
        scale: 1.45,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.out',
      });

      if (labelEl) {
        gsap.killTweensOf(labelEl);
        gsap.to(labelEl, { y: -2, duration: 0.08, ease: 'power1.out' });
        gsap.to(labelEl, {
          y: 0,
          duration: 0.18,
          delay: 0.06,
          ease: 'power2.out',
        });
      }

      onClick?.(e);
    },
    [onClick]
  );

  return (
    <button
      type="button"
      className="gsapBtn"
      ref={btnRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onPress}
      aria-label={label}
      data-gsap-id={id}
    >
      <span className="gsapBtn__shine" ref={shineRef} />
      <span className="gsapBtn__ripple" ref={rippleRef} />
      <span className="gsapBtn__label" ref={labelRef}>
        {label}
      </span>
    </button>
  );
}

