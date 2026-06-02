"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ── Galaxy Parameters ─────────────────────────────────────── */
const P = {
  count: 250_000,
  radius: 25,
  branches: 4,
  spin: 1.5,
  randomness: 0.8,
  randomnessPower: 3.5,
  coreColor: "#ffebd1",
  midColor: "#ff5e00",
  outerColor: "#3a0088",
  rimColor: "#002266",
} as const;

/* ── GLSL Shaders ───────────────────────────────────────────── */
const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uSize;

  attribute float aScale;
  attribute vec3  aRandomness;
  attribute float aDistance;

  varying vec3  vColor;
  varying float vDistance;

  void main() {
    vec3  pos    = position;
    float angle  = atan(pos.x, pos.z);
    float radius = length(pos.xz);

    float rotationSpeed = 0.05 / (radius + 0.1);
    float timeOffset    = uTime * rotationSpeed;

    float ripple = sin(radius * 1.5 - uTime * 2.0) * 0.15;
    ripple *= smoothstep(0.0, 5.0, radius) * smoothstep(25.0, 20.0, radius);

    float zOscillation = sin(angle * 3.0 + uTime) * 0.2 * (radius / 25.0);

    float finalAngle = angle + timeOffset;
    pos.x = cos(finalAngle) * radius + aRandomness.x;
    pos.y = pos.y + ripple + zOscillation + aRandomness.y;
    pos.z = sin(finalAngle) * radius + aRandomness.z;

    vec4 modelPosition    = modelMatrix      * vec4(pos, 1.0);
    vec4 viewPosition     = viewMatrix       * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    float pulse = 1.0 + sin(uTime * 3.0 + aRandomness.x * 10.0) * 0.2;
    gl_PointSize = uSize * aScale * pulse * (1.0 / -viewPosition.z);
    gl_PointSize = min(gl_PointSize, 15.0);

    vColor    = color;
    vDistance = radius;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3  vColor;
  varying float vDistance;

  void main() {
    float distToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distToCenter - 0.1;
    strength = clamp(strength, 0.0, 1.0);

    float twinkle = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    strength *= 0.8 + 0.2 * twinkle;

    gl_FragColor  = vec4(vColor, strength);
    gl_FragColor.rgb += vec3(0.01, 0.01, 0.02);
  }
`;

/* ── Component ─────────────────────────────────────────────── */
export function SiteCover() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coordXRef   = useRef<HTMLSpanElement>(null);
  const coordYRef   = useRef<HTMLSpanElement>(null);
  const zoomRef     = useRef<HTMLSpanElement>(null);
  const loaderRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020205);
    scene.fog = new THREE.FogExp2(0x020205, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 15, 25);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    /* ── Galaxy geometry ── */
    const geo = new THREE.BufferGeometry();
    const n   = P.count;

    const positions  = new Float32Array(n * 3);
    const colors     = new Float32Array(n * 3);
    const scales     = new Float32Array(n);
    const randomness = new Float32Array(n * 3);
    const distances  = new Float32Array(n);

    const cCore  = new THREE.Color(P.coreColor);
    const cMid   = new THREE.Color(P.midColor);
    const cOuter = new THREE.Color(P.outerColor);
    const cRim   = new THREE.Color(P.rimColor);

    for (let i = 0; i < n; i++) {
      const i3 = i * 3;

      let radius =
        Math.random() > 0.6
          ? Math.pow(Math.random(), 3) * (P.radius * 0.2)
          : Math.pow(Math.random(), 1.5) * P.radius;

      const spinAngle  = radius * P.spin;
      const branchAngle = ((i % P.branches) / P.branches) * Math.PI * 2;

      positions[i3]     = Math.cos(branchAngle + spinAngle) * radius;
      const bulge       = Math.exp(-radius * 0.5) * 3.0;
      positions[i3 + 1] = (Math.random() - 0.5) * (bulge + 0.5);
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

      const rnd = (scale: number) =>
        Math.pow(Math.random(), P.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        P.randomness *
        scale;
      randomness[i3]     = rnd(radius);
      randomness[i3 + 1] = rnd(radius * 0.5);
      randomness[i3 + 2] = rnd(radius);

      const t   = radius / P.radius;
      const mix = cCore.clone();
      if (t < 0.15)     mix.lerp(cMid, t / 0.15);
      else if (t < 0.6) mix.copy(cMid).lerp(cOuter, (t - 0.15) / 0.45);
      else              mix.copy(cOuter).lerp(cRim, (t - 0.6) / 0.4);

      colors[i3]     = mix.r;
      colors[i3 + 1] = mix.g;
      colors[i3 + 2] = mix.b;

      scales[i]    = Math.random() * 0.5 + 0.5;
      distances[i] = radius;
    }

    geo.setAttribute("position",   new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",      new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("aScale",     new THREE.BufferAttribute(scales, 1));
    geo.setAttribute("aRandomness",new THREE.BufferAttribute(randomness, 3));
    geo.setAttribute("aDistance",  new THREE.BufferAttribute(distances, 1));

    const mat = new THREE.ShaderMaterial({
      depthWrite:    false,
      blending:      THREE.AdditiveBlending,
      vertexColors:  true,
      transparent:   true,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 25.0 * renderer.getPixelRatio() },
      },
      vertexShader:   VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });

    const points = new THREE.Points(geo, mat);
    points.rotation.x = Math.PI * 0.15;
    points.rotation.z = Math.PI * 0.05;
    scene.add(points);

    /* ── Interaction state ── */
    const target  = { rotX: points.rotation.x, rotY: points.rotation.y, camZ: 30, camY: 12 };
    const current = { rotX: points.rotation.x, rotY: points.rotation.y, camZ: camera.position.z, camY: camera.position.y };
    let isDragging = false;
    let prevMouse  = { x: 0, y: 0 };
    let mouseNDC   = { x: 0, y: 0 };

    const onMouseDown = () => { isDragging = true; };
    const onMouseUp   = () => { isDragging = false; };

    const onMouseMove = (e: MouseEvent) => {
      mouseNDC.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (isDragging) {
        target.rotY += (e.clientX - prevMouse.x) * 0.005;
        target.rotX += (e.clientY - prevMouse.y) * 0.005;
        target.rotX  = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, target.rotX));
      }
      prevMouse = { x: e.clientX, y: e.clientY };

      if (coordXRef.current) coordXRef.current.innerText = target.rotY.toFixed(3);
      if (coordYRef.current) coordYRef.current.innerText = target.rotX.toFixed(3);
    };

    const onWheel = (e: WheelEvent) => {
      const speed = 0.02 * target.camZ;
      target.camZ = Math.max(2, Math.min(60, target.camZ + e.deltaY * 0.01 * speed));
      target.camY = target.camZ * 0.4;
      const pct = (60 - target.camZ) / 58;
      if (zoomRef.current) zoomRef.current.innerText = pct.toFixed(2);
    };

    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      target.rotY += (e.touches[0].clientX - prevMouse.x) * 0.008;
      target.rotX += (e.touches[0].clientY - prevMouse.y) * 0.008;
      target.rotX  = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, target.rotX));
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => { isDragging = false; };

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      mat.uniforms.uSize.value = 25.0 * renderer.getPixelRatio();
    };

    window.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mouseup",    onMouseUp);
    window.addEventListener("mouseleave", onMouseUp);
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("wheel",      onWheel,      { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    window.addEventListener("touchend",   onTouchEnd);
    window.addEventListener("resize",     onResize);

    /* ── Animation loop ── */
    const clock  = new THREE.Clock();
    let rafId    = 0;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const elapsed = clock.getElapsedTime();
      mat.uniforms.uTime.value = elapsed;

      target.rotY += 0.0005;

      const lf = 0.05;
      current.rotX += (target.rotX + -mouseNDC.y * 0.05 - current.rotX) * lf;
      current.rotY += (target.rotY +  mouseNDC.x * 0.05 - current.rotY) * lf;
      current.camZ += (target.camZ - current.camZ) * 0.08;
      current.camY += (target.camY - current.camY) * 0.08;

      points.rotation.x = current.rotX;
      points.rotation.y = current.rotY;

      camera.position.x = Math.sin(current.rotY * 0.1) * current.camZ * 0.1;
      camera.position.y = current.camY;
      camera.position.z = current.camZ;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    /* ── Loader fade-out ── */
    const loaderTimer = window.setTimeout(() => {
      const el = loaderRef.current;
      if (el) {
        el.classList.add("galaxy-loader--hidden");
        window.setTimeout(() => el.remove(), 1500);
      }
    }, 1000);

    tick();

    /* ── Cleanup ── */
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(loaderTimer);

      window.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mouseup",    onMouseUp);
      window.removeEventListener("mouseleave", onMouseUp);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("resize",     onResize);

      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="galaxy-cover relative w-full overflow-hidden" style={{ height: "100svh" }}>
      {/* Three.js canvas mount point */}
      <div ref={containerRef} className="absolute inset-0 z-[1]" />

      {/* Scanlines */}
      <div className="galaxy-scanlines" aria-hidden />

      {/* Center crosshair */}
      <div className="galaxy-crosshair" aria-hidden />

      {/* ── UI: top-left ── */}
      <div className="galaxy-ui galaxy-ui--tl flex flex-col gap-2">
        <div>SYS: NGC-4594 VISUALIZATION</div>
        <div>
          STATUS:{" "}
          <span className="galaxy-data-value text-green-400">NOMINAL</span>
        </div>
        <div className="mt-2 h-px w-12 bg-white/20" />
      </div>

      {/* ── UI: bottom-left ── */}
      <div className="galaxy-ui galaxy-ui--bl flex flex-col gap-2">
        <div className="flex items-center">
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500" />
          GRAV_WAVE_DETECT: ACTIVE
        </div>
        <div>
          PARTICLE_COUNT:{" "}
          <span className="galaxy-data-value">250,000</span>
        </div>
      </div>

      {/* ── UI: bottom-right ── */}
      <div className="galaxy-ui galaxy-ui--br flex flex-col gap-2">
        <div>
          COORD_X:{" "}
          <span ref={coordXRef} className="galaxy-data-value">0.000</span>
        </div>
        <div>
          COORD_Y:{" "}
          <span ref={coordYRef} className="galaxy-data-value">0.000</span>
        </div>
        <div>
          ZOOM_LVL:{" "}
          <span ref={zoomRef} className="galaxy-data-value">1.00</span>
        </div>
      </div>

      {/* Scroll-down hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none"
        aria-hidden
      >
        <span className="text-[9px] tracking-[3px] text-white/25 uppercase">
          Scroll
        </span>
        <div className="animate-site-cover-scrollline h-8 w-px bg-white/20" />
      </div>

      {/* Loader overlay */}
      <div ref={loaderRef} className="galaxy-loader">
        INITIALIZING SENSOR ARRAY...
      </div>
    </section>
  );
}
