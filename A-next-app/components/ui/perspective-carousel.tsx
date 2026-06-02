"use client";

import { useEffect, useState } from "react";
import "./perspective-carousel.css";

interface PerspectiveCarouselProps {
  images: string[];
  interval?: number;
}

export function PerspectiveCarousel({ images, interval = 3000 }: PerspectiveCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(images.length / 2));

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > images.length / 2) offset -= images.length;
    if (offset < -images.length / 2) offset += images.length;
    return offset;
  };

  return (
    <div className="carousel-section">
      <div className="carousel-stage">
        {images.map((src, index) => {
          const offset = getOffset(index);
          const absOffset = Math.abs(offset);

          if (absOffset > 3) return null;

          return (
            <div
              key={src}
              className="carousel-card"
              style={{
                transform: `
                  translate(-50%, -50%)
                  translateX(${offset * 260}px)
                  translateZ(${-absOffset * 80}px)
                  rotateY(${offset * -18}deg)
                  scale(${1 - absOffset * 0.08})
                `,
                opacity: 1 - absOffset * 0.18,
                zIndex: 10 - absOffset,
              }}
              onClick={() => setActiveIndex(index)}
            >
              <img src={src} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
