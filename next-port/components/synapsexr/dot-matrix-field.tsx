"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type DotMatrixFieldProps = {
  className?: string;
};

export function DotMatrixField({ className }: DotMatrixFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setUseFallback(true);
      return;
    }

    let cancelled = false;
    let raf = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let points: THREE.Points | null = null;
    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.NoToneMapping;
      mount.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        55,
        mount.clientWidth / Math.max(mount.clientHeight, 1),
        0.1,
        100,
      );
      camera.position.z = 14;

      const vertexShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        void main() {
          vec3 pos = position;
          float wave = sin(uTime * 0.35 + pos.x * 2.5 + pos.y * 1.8) * 0.045;
          pos.z += wave;
          pos.xy += uMouse * (0.055 + wave * 0.35);
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          float pulse = 0.82 + 0.38 * sin(uTime * 0.52 + length(pos.xy) * 1.15);
          gl_PointSize = pulse * 3.4 * (280.0 / -mvPosition.z);
        }
      `;

      const fragmentShader = `
        uniform float uTime;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float edge = 1.0 - smoothstep(0.16, 0.48, d);
          float breathe = 0.48 + 0.52 * sin(uTime * 0.48);
          vec3 col = vec3(0.17, 0.94, 0.55);
          float alpha = edge * breathe * 0.62;
          gl_FragColor = vec4(col, alpha);
        }
      `;

      const cols = 64;
      const rows = 42;
      const gap = 0.24;
      const positions = new Float32Array(cols * rows * 3);
      let p = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          positions[p++] =
            (x - cols * 0.5) * gap + (Math.random() - 0.5) * 0.04;
          positions[p++] =
            (y - rows * 0.5) * gap + (Math.random() - 0.5) * 0.04;
          positions[p++] = (Math.random() - 0.5) * 0.18;
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      points = new THREE.Points(geo, material);
      scene.add(points);

      const onResize = () => {
        if (!renderer || !camera || !mount) return;
        const w = mount.clientWidth;
        const h = Math.max(mount.clientHeight, 1);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      const onMove = (e: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetMouse.set(nx * 0.22, ny * 0.22);
      };

      window.addEventListener("resize", onResize);
      mount.addEventListener("pointermove", onMove);

      const animate = () => {
        if (cancelled) return;
        raf = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        if (material) {
          material.uniforms.uTime.value = t;
          mouse.lerp(targetMouse, 0.045);
          material.uniforms.uMouse.value.copy(mouse);
        }
        if (points) {
          points.rotation.z = t * 0.016;
        }
        renderer!.render(scene!, camera!);
      };

      animate();

      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        mount.removeEventListener("pointermove", onMove);
        geo.dispose();
        material?.dispose();
        renderer?.dispose();
        if (renderer?.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    } catch {
      setUseFallback(true);
      return;
    }
  }, []);

  if (useFallback) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 85% 55% at 50% 38%, rgba(46, 234, 140, 0.07), transparent 55%), linear-gradient(180deg, #030304 0%, #060607 100%)",
        }}
      />
    );
  }

  return (
    <div ref={mountRef} className={className} aria-hidden role="presentation" />
  );
}
