"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Full-bleed light-streak tunnel — matches standalone NeuroSync clone (additive lines). */
export function TunnelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    let rafId = 0;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let lines: THREE.LineSegments | null = null;
    const clock = new THREE.Clock();
    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;

    const vert = /* glsl */ `
      uniform float uTime;
      attribute vec3 aColor;
      attribute float aAlpha;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        float camDist = -mvPos.z;
        float nearFade = smoothstep(0.0, 7.0, camDist);
        float farFade = 1.0 - smoothstep(55.0, 90.0, camDist);
        float pulse = 0.82 + 0.18 * sin(uTime * 0.45 + position.x * 0.3 + position.y * 0.5);
        vAlpha = nearFade * farFade * aAlpha * pulse;
        vColor = aColor;
        gl_Position = projectionMatrix * mvPos;
      }
    `;

    const frag = /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(vColor, vAlpha);
      }
    `;

    function init(canvas: HTMLCanvasElement) {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x040303, 1);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 140);
      camera.position.set(0, 0.6, 6.5);
      camera.lookAt(0, -0.4, -25);

      const ZFAR = -92;
      const ZNEAR = 4.5;
      const SEGS = 16;
      const posArr: number[] = [];
      const colArr: number[] = [];
      const alpArr: number[] = [];

      function pushStreak(x: number, y: number, warm: boolean, alpha: number) {
        const r = warm ? 0.96 : 0.82;
        const g = warm ? 0.55 : 0.88;
        const b = warm ? 0.2 : 1.0;
        for (let s = 0; s < SEGS; s++) {
          const t0 = s / SEGS;
          const t1 = (s + 1) / SEGS;
          const z0 = ZFAR + t0 * (ZNEAR - ZFAR);
          const z1 = ZFAR + t1 * (ZNEAR - ZFAR);
          posArr.push(x, y, z0, x, y, z1);
          colArr.push(r, g, b, r, g, b);
          alpArr.push(alpha, alpha);
        }
      }

      const rand = () => Math.random();

      for (let i = 0; i < 28; i++) {
        const x = -9 + (i / 27) * 18 + (rand() - 0.5) * 0.4;
        pushStreak(x, -4.3 + (rand() - 0.5) * 0.25, rand() > 0.25, 0.5 + rand() * 0.5);
      }
      for (let i = 0; i < 22; i++) {
        const x = -9 + (i / 21) * 18 + (rand() - 0.5) * 0.4;
        pushStreak(x, 5.2 + (rand() - 0.5) * 0.25, rand() > 0.4, 0.35 + rand() * 0.45);
      }
      for (let i = 0; i < 18; i++) {
        const y = -4 + (i / 17) * 8.5 + (rand() - 0.5) * 0.3;
        pushStreak(-8.5 + (rand() - 0.5) * 0.3, y, true, 0.55 + rand() * 0.45);
      }
      for (let i = 0; i < 18; i++) {
        const y = -4 + (i / 17) * 8.5 + (rand() - 0.5) * 0.3;
        pushStreak(8.5 + (rand() - 0.5) * 0.3, y, rand() > 0.4, 0.5 + rand() * 0.5);
      }
      for (let i = 0; i < 60; i++) {
        const x = (rand() - 0.5) * 15;
        const y = (rand() - 0.5) * 7.5;
        pushStreak(x, y, rand() > 0.3, 0.1 + rand() * 0.25);
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(posArr, 3));
      geo.setAttribute("aColor", new THREE.Float32BufferAttribute(colArr, 3));
      geo.setAttribute("aAlpha", new THREE.Float32BufferAttribute(alpArr, 1));

      const mat = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms: { uTime: { value: 0 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      lines = new THREE.LineSegments(geo, mat);
      scene.add(lines);
    }

    function tick() {
      rafId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      if (lines) {
        (lines.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
      }
      smoothX += (mouseX - smoothX) * 0.028;
      smoothY += (mouseY - smoothY) * 0.028;
      camera.position.x = smoothX * 0.5 + Math.sin(t * 0.11) * 0.08;
      camera.position.y = 0.6 + smoothY * 0.3 + Math.sin(t * 0.07) * 0.06;
      camera.lookAt(0, -0.4, -25);
      renderer.render(scene, camera);
    }

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }

    try {
      init(el);
      tick();
      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    } catch (err) {
      console.warn("TunnelCanvas WebGL init failed:", err);
      return undefined;
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      if (lines) {
        lines.geometry.dispose();
        (lines.material as THREE.Material).dispose();
      }
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ filter: "blur(1px)" }}
      aria-hidden
    />
  );
}
