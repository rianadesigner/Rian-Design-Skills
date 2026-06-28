import * as THREE from "three";

/**
 * Observatory cover — "Living Universe" GPU shader galaxy.
 *
 * Design goals:
 *  • 300k main-disk particles + 22k far stars, all animated on the GPU
 *    (vertex shader). CPU only updates a few uniforms per frame.
 *  • Differential rotation + per-particle gravitational wobble + tangential
 *    drift + vertical breathing → fluid "living" feel, never loops.
 *  • Drag = orbit camera (spherical), wheel = immersive zoom into the core,
 *    mouse-move = subtle parallax on top of orbit.
 *  • Multi-layer overexposed core (3 stacked additive halos).
 *  • Cinematic NASA-style colour grading: warm core → pale silver → cool blue.
 */
export interface MountEffect1Options {
  /** 轻点 canvas（非拖拽）时回调，用于封面点击进入下一页 */
  onTap?: () => void;
}

export function mountEffect1(
  container: HTMLElement,
  options: MountEffect1Options = {},
): () => void {
  const { onTap } = options;
  /* ── Scene & renderer ────────────────────────────────────── */
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x02040a, 0.00068);

  const camera = new THREE.PerspectiveCamera(
    59,
    container.clientWidth / container.clientHeight,
    0.5,
    6000,
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x02040a, 1);
  container.appendChild(renderer.domElement);

  /* ── Soft point sprite (radial bloom) ────────────────────── */
  const makeSprite = (size = 128) => {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.18, "rgba(255,255,255,0.7)");
    g.addColorStop(0.5, "rgba(255,255,255,0.12)");
    g.addColorStop(0.85, "rgba(255,255,255,0.02)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };
  const pointTex = makeSprite(128);
  const haloTex = makeSprite(256);

  /* ═══ Layer 1 — Main galaxy disk (GPU-animated) ═══════════
     3 spiral arms, soft scatter. Differential rotation done in the
     vertex shader with a deliberately tiny angular velocity so arms
     stay crisp for >30min of viewing. */
  const GAL = 300_000;
  const ARMS = 3;
  const MAX_R = 520;

  const gPos = new Float32Array(GAL * 3);
  const gSeed = new Float32Array(GAL * 4); // radius, theta0, _, rand
  const gOff = new Float32Array(GAL * 4); // yOff, scatterR, scatterT, size
  const gCol = new Float32Array(GAL * 3);

  const cCore = new THREE.Color("#fff3d8"); // warm overexposed core
  const cMid = new THREE.Color("#e2e8f3"); // pale silver
  const cEdge = new THREE.Color("#5d8dd8"); // cool blue
  const cWarm = new THREE.Color("#ff9d6c"); // rare warm specks (HII regions)
  const tmpC = new THREE.Color();

  for (let i = 0; i < GAL; i++) {
    // Radius biased toward centre (^2 → core density)
    const rNorm = Math.pow(Math.random(), 1.8);
    const radius = rNorm * MAX_R + 6;

    // Spiral arm seeding
    const arm = i % ARMS;
    const armAngle = (arm / ARMS) * Math.PI * 2;
    const spin = radius * 4 * 0.005;
    const theta = armAngle + spin;

    // Radial / tangential scatter shrinks near the edge, grows mid-disk
    const scatterEnvelope = Math.min(radius * 0.45, (MAX_R - radius) * 0.45);
    const scatterR = (Math.random() - 0.5) * scatterEnvelope;
    const scatterT = (Math.random() - 0.5) * 0.32 * (1 - rNorm * 0.5);

    // Disk thickness — thin in the disk, thicker in core bulge
    const bulge = Math.exp(-radius / 90) * 35;
    const yOff = (Math.random() - 0.5) * (10 + bulge) + (Math.random() - 0.5) * 6;

    const x0 = Math.cos(theta) * radius;
    const z0 = Math.sin(theta) * radius;

    gPos[i * 3] = x0;
    gPos[i * 3 + 1] = yOff;
    gPos[i * 3 + 2] = z0;

    gSeed[i * 4] = radius;
    gSeed[i * 4 + 1] = theta;
    gSeed[i * 4 + 2] = arm;
    gSeed[i * 4 + 3] = Math.random();

    gOff[i * 4] = yOff;
    gOff[i * 4 + 1] = scatterR;
    gOff[i * 4 + 2] = scatterT;
    // 4% of particles are larger bright motes for depth layering
    gOff[i * 4 + 3] = Math.random() < 0.04
      ? 2.8 + Math.random() * 2.0
      : 0.45 + Math.random() * 1.3;

    // Colour: core → silver → blue, rare warm specks
    const dist = Math.sqrt(x0 * x0 + yOff * yOff + z0 * z0);
    if (dist < MAX_R * 0.22) {
      tmpC.lerpColors(cCore, cMid, dist / (MAX_R * 0.22));
    } else {
      tmpC.lerpColors(cMid, cEdge, (dist - MAX_R * 0.22) / (MAX_R * 0.78));
    }
    if (Math.random() < 0.01) tmpC.lerp(cWarm, 0.55);

    gCol[i * 3] = tmpC.r;
    gCol[i * 3 + 1] = tmpC.g;
    gCol[i * 3 + 2] = tmpC.b;
  }

  const galGeo = new THREE.BufferGeometry();
  galGeo.setAttribute("position", new THREE.BufferAttribute(gPos, 3));
  galGeo.setAttribute("aSeed", new THREE.BufferAttribute(gSeed, 4));
  galGeo.setAttribute("aOff", new THREE.BufferAttribute(gOff, 4));
  galGeo.setAttribute("color", new THREE.BufferAttribute(gCol, 3));

  const galMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    uniforms: {
      uTime: { value: 0 },
      uPx: { value: renderer.getPixelRatio() },
      uTex: { value: pointTex },
      uBreath: { value: 0 },
    },
    vertexShader: /* glsl */ `
      attribute vec4 aSeed;
      attribute vec4 aOff;
      varying vec3 vCol;
      varying float vA;
      uniform float uTime;
      uniform float uPx;
      uniform float uBreath;

      void main() {
        float radius = max(aSeed.x, 1.0);
        float theta0 = aSeed.y;
        float rand   = aSeed.w;

        // Differential rotation. ω falls with radius (flat rotation curve
        // is approximated by a soft inverse). Tiny constant keeps arms
        // crisp over very long viewing sessions.
        float omega = 0.0032 / pow(radius * 0.012 + 0.4, 0.85);
        float theta = theta0 + uTime * omega;

        // Gravitational perturbation — slow radial wobble, dampened with R
        float wobble = sin(uTime * 0.42 + rand * 6.2831) *
                       (1.0 - radius / 600.0) * 3.4;

        // Aggregation/dispersion — slow tangential drift along the arm
        float drift = sin(uTime * 0.22 + rand * 11.0) * 0.04;

        float r = max(radius + aOff.y + wobble, 1.0);
        float a = theta + aOff.z + drift;

        // Vertical disk breathing + per-particle phase
        float y = aOff.x +
                  sin(uTime * 0.5 + radius * 0.015 + rand * 6.0) * 1.2 +
                  uBreath * 1.5 * sin(rand * 12.0);

        vec3 pos = vec3(cos(a) * r, y, sin(a) * r);

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;

        float ps = aOff.w * 2.0 * uPx * (410.0 / -mv.z);
        gl_PointSize = clamp(ps, 0.55, 15.0);

        vCol = color;
        vA = clamp(1.0 - radius / 720.0, 0.22, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vCol;
      varying float vA;
      uniform sampler2D uTex;
      void main() {
        vec4 t = texture2D(uTex, gl_PointCoord);
        if (t.a < 0.02) discard;
        gl_FragColor = vec4(vCol, t.a * vA);
      }
    `,
  });

  const galaxy = new THREE.Points(galGeo, galMat);
  galaxy.rotation.x = -0.22;
  scene.add(galaxy);

  /* ═══ Layer 2 — Far star sphere (twinkle) ═════════════════ */
  const STARS = 22_000;
  const sPos = new Float32Array(STARS * 3);
  const sSz = new Float32Array(STARS);
  const sPh = new Float32Array(STARS);
  for (let i = 0; i < STARS; i++) {
    // Uniform on a sphere shell via rejection sampling
    let u: number, v: number, s: number;
    do {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;
      s = u * u + v * v;
    } while (s >= 1 || s === 0);
    const f = 2 * Math.sqrt(1 - s);
    const R = 2200 + Math.random() * 1100;
    sPos[i * 3] = u * f * R;
    sPos[i * 3 + 1] = v * f * R;
    sPos[i * 3 + 2] = (1 - 2 * s) * R;
    sSz[i] = 0.4 + Math.random() * 1.4;
    sPh[i] = Math.random() * 6.2831;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
  starGeo.setAttribute("aSize", new THREE.BufferAttribute(sSz, 1));
  starGeo.setAttribute("aPh", new THREE.BufferAttribute(sPh, 1));

  const starMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPx: { value: renderer.getPixelRatio() },
      uTex: { value: pointTex },
    },
    vertexShader: /* glsl */ `
      attribute float aSize;
      attribute float aPh;
      varying float vTw;
      uniform float uTime;
      uniform float uPx;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uPx * 1.1 * (1500.0 / -mv.z);
        vTw = 0.55 + 0.45 * sin(uTime * 1.4 + aPh);
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vTw;
      uniform sampler2D uTex;
      void main() {
        vec4 t = texture2D(uTex, gl_PointCoord);
        if (t.a < 0.04) discard;
        gl_FragColor = vec4(vec3(1.0) * vTw, t.a * 0.72);
      }
    `,
  });
  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  /* ═══ Layer 3 — Overexposed core (3 stacked billboards) ═══ */
  const makeHalo = (size: number, color: number, opacity: number) => {
    const m = new THREE.MeshBasicMaterial({
      map: haloTex,
      color,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity,
    });
    const g = new THREE.PlaneGeometry(size, size);
    return new THREE.Mesh(g, m);
  };
  const coreInner = makeHalo(220, 0xfff2d8, 0.61);
  const coreMid = makeHalo(310, 0xd9e6ff, 0.32);
  const coreOuter = makeHalo(1400, 0x6f9bd8, 0.14);
  scene.add(coreOuter, coreMid, coreInner);

  /* ═══ Camera orbit — spherical, drag + wheel + parallax ═══ */
  const cam = {
    r: 30,
    rT: 460,
    theta: 0,
    thetaT: 0,
    phi: Math.PI * 0.33,
    phiT: Math.PI * 0.33,
    px: 0,
    py: 0,
    pxT: 0,
    pyT: 0,
  };
  const R_MIN = 50; // wheel deep enough to enter the disk
  const R_MAX = 2400;
  const PHI_MIN = 0.08;
  const PHI_MAX = Math.PI - 0.08;

  let dragging = false;
  let dsx = 0;
  let dsy = 0;
  let dsTheta = 0;
  let dsPhi = 0;
  const dom = renderer.domElement;
  const isMobilePortrait = window.matchMedia("(max-width: 640px) and (orientation: portrait)").matches;
  if (!isMobilePortrait) {
    dom.style.touchAction = "none";
    dom.style.cursor = "grab";
  }

  const onPtrDown = (e: PointerEvent) => {
    dragging = true;
    dsx = e.clientX;
    dsy = e.clientY;
    dsTheta = cam.thetaT;
    dsPhi = cam.phiT;
    dom.setPointerCapture(e.pointerId);
    dom.style.cursor = "grabbing";
  };
  const onPtrMove = (e: PointerEvent) => {
    cam.pxT = (e.clientX / container.clientWidth - 0.5) * 0.35;
    cam.pyT = (e.clientY / container.clientHeight - 0.5) * 0.35;
    if (!dragging) return;
    cam.thetaT = dsTheta - (e.clientX - dsx) * 0.004;
    cam.phiT = Math.max(PHI_MIN, Math.min(PHI_MAX, dsPhi - (e.clientY - dsy) * 0.004));
  };
  const onPtrUp = (e: PointerEvent) => {
    const moved = Math.hypot(e.clientX - dsx, e.clientY - dsy);
    dragging = false;
    try {
      dom.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    dom.style.cursor = "grab";
    if (moved < 8) onTap?.();
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    cam.rT = Math.max(R_MIN, Math.min(R_MAX, cam.rT * Math.exp(e.deltaY * 0.0014)));
  };

  if (!isMobilePortrait) {
    dom.addEventListener("pointerdown", onPtrDown);
    window.addEventListener("pointermove", onPtrMove);
    window.addEventListener("pointerup", onPtrUp);
    dom.addEventListener("wheel", onWheel, { passive: false });
  }

  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    galMat.uniforms.uPx.value = renderer.getPixelRatio();
    starMat.uniforms.uPx.value = renderer.getPixelRatio();
  };
  window.addEventListener("resize", onResize);
  const containerRo = new ResizeObserver(onResize);
  containerRo.observe(container);

  /* ═══ Animation loop ══════════════════════════════════════ */
  const clock = new THREE.Clock();
  let rafId = 0;
  let cancelled = false;

  const tick = () => {
    if (cancelled) return;
    const t = clock.getElapsedTime();

    // Smooth interpolation — slower during intro warp
    const introFactor = t < 3 ? 0.02 : 0.06;
    cam.r += (cam.rT - cam.r) * introFactor;
    cam.theta += (cam.thetaT - cam.theta) * 0.08;
    cam.phi += (cam.phiT - cam.phi) * 0.08;
    cam.px += (cam.pxT - cam.px) * 0.05;
    cam.py += (cam.pyT - cam.py) * 0.05;

    // Idle: auto-drift — fast spin during intro warp, slow after
    const drift = t < 3 ? 0.006 : 0.00025;
    if (!dragging) cam.thetaT += drift;

    // Spherical → cartesian + parallax offset (proportional to radius
    // so parallax stays subtle when zoomed in)
    const sp = Math.sin(cam.phi);
    const cx = cam.r * sp * Math.cos(cam.theta);
    const cy = cam.r * Math.cos(cam.phi);
    const cz = cam.r * sp * Math.sin(cam.theta);
    const pScale = cam.r * 0.052;
    camera.position.set(cx + cam.px * pScale, cy - cam.py * pScale, cz);
    camera.lookAt(0, 0, 0);

    // GPU uniforms
    galMat.uniforms.uTime.value = t;
    galMat.uniforms.uBreath.value = Math.sin(t * 0.22);
    starMat.uniforms.uTime.value = t;

    // Slow whole-galaxy rotation. The shader handles differential
    // rotation; this adds rigid drift so the silhouette is alive
    // without smearing the spiral.
    galaxy.rotation.y = t * 0.015;

    // Core layers always face the camera with subtle breathing
    coreInner.lookAt(camera.position);
    coreMid.lookAt(camera.position);
    coreOuter.lookAt(camera.position);
    coreInner.scale.setScalar(1 + Math.sin(t * 1.6) * 0.06);
    coreMid.scale.setScalar(1 + Math.sin(t * 0.9) * 0.05);
    coreOuter.scale.setScalar(1 + Math.sin(t * 0.5) * 0.04);

    // Far stars drift slightly the other way — adds parallax depth
    starField.rotation.y = -t * 0.0035;
    starField.rotation.x = Math.sin(t * 0.05) * 0.05;

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  };
  tick();

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
    if (!isMobilePortrait) {
      dom.removeEventListener("pointerdown", onPtrDown);
      window.removeEventListener("pointermove", onPtrMove);
      window.removeEventListener("pointerup", onPtrUp);
      dom.removeEventListener("wheel", onWheel);
    }
    window.removeEventListener("resize", onResize);
    containerRo.disconnect();
    galGeo.dispose();
    galMat.dispose();
    starGeo.dispose();
    starMat.dispose();
    coreInner.geometry.dispose();
    (coreInner.material as THREE.Material).dispose();
    coreMid.geometry.dispose();
    (coreMid.material as THREE.Material).dispose();
    coreOuter.geometry.dispose();
    (coreOuter.material as THREE.Material).dispose();
    pointTex.dispose();
    haloTex.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}
