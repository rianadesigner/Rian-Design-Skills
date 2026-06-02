import { useEffect, useRef } from "react";

import "./CosmicNebulaVisualization.css";

export interface CosmicNebulaVisualizationProps {
  /** 底部叠字标题，默认「信号与系统」 */
  title?: string;
}

/**
 * Canvas 星云粒子动画，逻辑与提供的 HTML 设计稿逐行对齐。
 */
export function CosmicNebulaVisualization({
  title = "信号与系统",
}: CosmicNebulaVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    const PARTICLE_COUNT = 2500;
    let time = 0;
    let rafId = 0;
    let cancelled = false;

    const particles: Particle[] = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cx = width / 2;
      cy = height / 2;
    }

    class Particle {
      angle!: number;
      radius!: number;
      baseSpeed!: number;
      speed!: number;
      baseSize!: number;
      color!: string;
      glowSize!: number;

      constructor() {
        this.init();

        this.angle = Math.random() * Math.PI * 2;
      }

      init() {
        const distanceBias = Math.pow(Math.random(), 2.5);
        this.radius = distanceBias * (width * 0.7);

        this.angle = Math.random() * Math.PI * 2;

        this.baseSpeed = (Math.random() * 0.0015 + 0.0005) * (1000 / (this.radius + 100));
        this.speed = this.baseSpeed;

        if (Math.random() > 0.4) {
          const bands = 6;
          const bandWidth = (width * 0.5) / bands;
          const bandIndex = Math.floor(Math.random() * bands);

          this.radius = bandIndex * bandWidth + (Math.random() - 0.5) * (bandWidth * 0.5);
        }

        this.baseSize = Math.random() * 1.2 + 0.2;
        if (Math.random() > 0.98) {
          this.baseSize *= 3;
        }

        const colorType = Math.random();
        let r: number;
        let g: number;
        let b: number;
        if (colorType < 0.6) {
          r = 255;
          g = 255;
          b = 255;
        } else if (colorType < 0.9) {
          r = 200;
          g = 220;
          b = 255;
        } else {
          r = 255;
          g = 240;
          b = 220;
        }

        const alpha = Math.random() * 0.6 + 0.4;
        this.color = `rgba(${r}, ${g}, ${b}, ${alpha})`;

        this.glowSize = this.baseSize * 4;
      }

      update() {
        this.angle += this.speed;
      }

      draw() {
        const twist = this.radius * 0.003;
        const a = this.angle + twist;

        const x = Math.cos(a) * this.radius;
        const z = Math.sin(a) * this.radius;

        const warpAmplitude = this.radius * 0.35;
        const warp = Math.sin(this.angle * 2) * warpAmplitude;

        const tilt = 0.2;
        const y = z * tilt + warp;

        const drawX = cx + x;
        const drawY = cy + y;

        let scale = 1 + z * 0.001;
        if (scale < 0.1) scale = 0.1;

        const finalSize = this.baseSize * scale;

        if (drawX > 0 && drawX < width && drawY > 0 && drawY < height) {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(drawX, drawY, finalSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function drawCentralGlow() {
      const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150);
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      coreGradient.addColorStop(0.2, "rgba(230, 240, 255, 0.8)");
      coreGradient.addColorStop(0.5, "rgba(150, 180, 255, 0.3)");
      coreGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = coreGradient;
      ctx.fillRect(cx - 200, cy - 200, 400, 400);

      ctx.save();

      const squashRatio = 0.15;
      ctx.scale(1, squashRatio);

      const flareWidth = width * 0.8;
      const flareGradient = ctx.createRadialGradient(
        cx,
        cy / squashRatio,
        0,
        cx,
        cy / squashRatio,
        flareWidth
      );
      flareGradient.addColorStop(0, "rgba(200, 220, 255, 0.5)");
      flareGradient.addColorStop(0.4, "rgba(100, 150, 255, 0.1)");
      flareGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = flareGradient;
      ctx.fillRect(cx - flareWidth, cy / squashRatio - flareWidth, flareWidth * 2, flareWidth * 2);
      ctx.restore();
    }

    function drawEtherealRays() {
      ctx.save();
      ctx.translate(cx, cy);

      const numRays = 8;
      const rayLength = width * 0.6;

      ctx.rotate(time * 0.05);

      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2;

        ctx.rotate(angle);

        const grad = ctx.createLinearGradient(0, 0, rayLength, 0);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.03)");
        grad.addColorStop(0.5, "rgba(150, 200, 255, 0.01)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();

        ctx.moveTo(0, -10);
        ctx.lineTo(rayLength, 0);
        ctx.moveTo(0, 10);
        ctx.lineTo(rayLength, 0);
        ctx.fill();

        ctx.rotate(-angle);
      }
      ctx.restore();
    }

    function animate() {
      if (cancelled) return;
      time += 0.01;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(5, 8, 18, 0.25)";
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      drawCentralGlow();
      drawEtherealRays();

      for (let i = 0; i < particles.length; i++) {
        particles[i]!.update();
        particles[i]!.draw();
      }

      rafId = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    resize();

    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="cosmic-nebula-root">
      <canvas ref={canvasRef} id="nebulaCanvas" aria-hidden="true" />
      <div className="title-overlay">
        <h1 className="glow-text">{title}</h1>
      </div>
    </div>
  );
}
