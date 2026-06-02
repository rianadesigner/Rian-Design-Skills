import * as THREE from "three";

/**
 * Observatory cover effect 2 — continuous "Living Universe" galaxy fluid.
 *
 * Saved version:
 *  • Dense GPU particle field + far stars, all animated on the GPU.
 *  • Continuous density disk, no hard spiral arms. Differential rotation,
 *    curl turbulence, aggregation/dispersion and breathing.
 *  • Drag = orbit camera + field bend, wheel = immersive zoom into the core,
 *    mouse-move = subtle parallax on top of orbit.
 */
export function mountEffect2(container: HTMLElement): () => void {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x02040a, 0.00085);

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.5,
    6000,
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x02040a, 1);
  container.appendChild(renderer.domElement);

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

  const GAL = 720_000;
  const MAX_R = 720;

  const gPos = new Float32Array(GAL * 3);
  const gSeed = new Float32Array(GAL * 4);
  const gOff = new Float32Array(GAL * 4);
  const gCol = new Float32Array(GAL * 3);

  const cCore = new THREE.Color("#fff3d8");
  const cMid = new THREE.Color("#e2e8f3");
  const cEdge = new THREE.Color("#5d8dd8");
  const cWarm = new THREE.Color("#ff9d6c");
  const tmpC = new THREE.Color();

  const clumps: [number, number, number, number][] = [
    [0.35, 190, 180, 0.16],
    [1.45, 310, 210, 0.13],
    [2.7, 250, 190, 0.14],
    [3.85, 390, 220, 0.11],
    [5.05, 290, 210, 0.12],
    [5.9, 520, 180, 0.08],
  ];
  const clumpTotal = clumps.reduce((sum, c) => sum + c[3], 0);

  for (let i = 0; i < GAL; i++) {
    const rand = Math.random();
    let rNorm = Math.pow(Math.random(), 1.95);
    let radius = rNorm * MAX_R + 4;
    let theta = Math.random() * Math.PI * 2;

    if (Math.random() < 0.42) {
      let pick = Math.random() * clumpTotal;
      let clump = clumps[0];
      for (const c of clumps) {
        pick -= c[3];
        if (pick <= 0) {
          clump = c;
          break;
        }
      }
      theta = clump[0] + (Math.random() - 0.5) * 1.35;
      radius = Math.max(8, Math.min(MAX_R, clump[1] + (Math.random() - 0.5) * clump[2]));
      rNorm = radius / MAX_R;
    }

    theta += radius * 0.0028 + Math.sin(radius * 0.018 + rand * 6.2831) * 0.32;

    const scatterEnvelope = Math.min(radius * 0.5, (MAX_R - radius) * 0.42 + 35);
    const scatterR = (Math.random() - 0.5) * scatterEnvelope;
    const scatterT = (Math.random() - 0.5) * 0.55 * (1 - rNorm * 0.55);

    const bulge = Math.exp(-radius / 110) * 48;
    const yOff = (Math.random() - 0.5) * (12 + bulge) + (Math.random() - 0.5) * 8;

    const x0 = Math.cos(theta + scatterT) * (radius + scatterR);
    const z0 = Math.sin(theta + scatterT) * (radius + scatterR);

    gPos[i * 3] = x0;
    gPos[i * 3 + 1] = yOff;
    gPos[i * 3 + 2] = z0;

    gSeed[i * 4] = radius;
    gSeed[i * 4 + 1] = theta;
    gSeed[i * 4 + 2] = Math.random() * 2 - 1;
    gSeed[i * 4 + 3] = rand;

    gOff[i * 4] = yOff;
    gOff[i * 4 + 1] = scatterR;
    gOff[i * 4 + 2] = scatterT;
    gOff[i * 4 + 3] = Math.random() < 0.035
      ? 2.3 + Math.random() * 2.2
      : 0.35 + Math.random() * 1.05;

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
      uBend: { value: 0 },
    },
    vertexShader: /* glsl */ `
      attribute vec4 aSeed;
      attribute vec4 aOff;
      varying vec3 vCol;
      varying float vA;
      uniform float uTime;
      uniform float uPx;
      uniform float uBreath;
      uniform float uBend;

      float hash(vec3 p) {
        return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
      }
      float vnoise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n000 = hash(i);
        float n100 = hash(i + vec3(1.0, 0.0, 0.0));
        float n010 = hash(i + vec3(0.0, 1.0, 0.0));
        float n110 = hash(i + vec3(1.0, 1.0, 0.0));
        float n001 = hash(i + vec3(0.0, 0.0, 1.0));
        float n101 = hash(i + vec3(1.0, 0.0, 1.0));
        float n011 = hash(i + vec3(0.0, 1.0, 1.0));
        float n111 = hash(i + vec3(1.0, 1.0, 1.0));
        float nx00 = mix(n000, n100, f.x);
        float nx10 = mix(n010, n110, f.x);
        float nx01 = mix(n001, n101, f.x);
        float nx11 = mix(n011, n111, f.x);
        float nxy0 = mix(nx00, nx10, f.y);
        float nxy1 = mix(nx01, nx11, f.y);
        return mix(nxy0, nxy1, f.z);
      }

      void main() {
        float radius = max(aSeed.x, 1.0);
        float theta0 = aSeed.y;
        float stream = aSeed.z;
        float rand = aSeed.w;

        float omega = 0.0024 / pow(radius * 0.01 + 0.6, 0.72);
        float theta = theta0 + uTime * omega;

        float inward = 1.0 - smoothstep(120.0, 680.0, radius);
        float aggregate = sin(uTime * 0.18 + rand * 8.0) * (3.0 + inward * 6.0);
        float wobble = sin(uTime * 0.35 + rand * 6.2831 + stream * 2.0) *
                       (1.0 - radius / 760.0) * 5.5;

        float r = max(radius + aOff.y * 0.35 + wobble + aggregate, 1.0);
        float a = theta +
                  aOff.z * 0.55 +
                  sin(uTime * 0.16 + radius * 0.008 + rand * 9.0) * 0.05;

        vec3 pos = vec3(cos(a) * r, aOff.x, sin(a) * r);

        vec3 q = pos * 0.0045 + vec3(rand * 9.0, stream * 3.0, uTime * 0.045);
        float n1 = vnoise(q + vec3(0.0, 9.1, 2.3)) - 0.5;
        float n2 = vnoise(q + vec3(7.7, 0.0, 5.4)) - 0.5;
        float n3 = vnoise(q + vec3(1.9, 4.2, 0.0)) - 0.5;
        pos += vec3(n1, n2 * 0.38, n3) * (5.0 + inward * 10.0);

        float bend = uBend * (pos.y / 180.0 + 0.18);
        float bc = cos(bend);
        float bs = sin(bend);
        pos = vec3(pos.x * bc + pos.z * bs, pos.y, -pos.x * bs + pos.z * bc);

        pos.y += sin(uTime * 0.48 + radius * 0.014 + rand * 6.0) * 1.35 +
                 uBreath * 2.0 * sin(rand * 12.0);

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;

        float ps = aOff.w * 1.65 * uPx * (350.0 / -mv.z);
        gl_PointSize = clamp(ps, 0.42, 13.0);

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
  galaxy.rotation.x = -0.16;
  scene.add(galaxy);

  const STARS = 22_000;
  const sPos = new Float32Array(STARS * 3);
  const sSz = new Float32Array(STARS);
  const sPh = new Float32Array(STARS);
  for (let i = 0; i < STARS; i++) {
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
  const coreInner = makeHalo(220, 0xfff2d8, 0.85);
  const coreMid = makeHalo(620, 0xd9e6ff, 0.32);
  const coreOuter = makeHalo(1400, 0x6f9bd8, 0.14);
  scene.add(coreOuter, coreMid, coreInner);

  const cam = {
    r: 700,
    rT: 700,
    theta: 0,
    thetaT: 0,
    phi: Math.PI * 0.34,
    phiT: Math.PI * 0.34,
    px: 0,
    py: 0,
    pxT: 0,
    pyT: 0,
    bend: 0,
    bendT: 0,
  };
  const R_MIN = 50;
  const R_MAX = 2400;
  const PHI_MIN = 0.08;
  const PHI_MAX = Math.PI - 0.08;

  let dragging = false;
  let dsx = 0;
  let dsy = 0;
  let dsTheta = 0;
  let dsPhi = 0;
  const dom = renderer.domElement;
  dom.style.touchAction = "none";
  dom.style.cursor = "grab";

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
    cam.pxT = (e.clientX / window.innerWidth - 0.5) * 0.35;
    cam.pyT = (e.clientY / window.innerHeight - 0.5) * 0.35;
    if (!dragging) return;
    const dx = e.clientX - dsx;
    const dy = e.clientY - dsy;
    cam.thetaT = dsTheta - dx * 0.004;
    cam.phiT = Math.max(PHI_MIN, Math.min(PHI_MAX, dsPhi - dy * 0.004));
    cam.bendT = Math.max(-0.55, Math.min(0.55, dx * 0.0014));
  };
  const onPtrUp = (e: PointerEvent) => {
    dragging = false;
    try {
      dom.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    dom.style.cursor = "grab";
    cam.bendT = 0;
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    cam.rT = Math.max(R_MIN, Math.min(R_MAX, cam.rT * Math.exp(e.deltaY * 0.0014)));
  };

  dom.addEventListener("pointerdown", onPtrDown);
  window.addEventListener("pointermove", onPtrMove);
  window.addEventListener("pointerup", onPtrUp);
  dom.addEventListener("wheel", onWheel, { passive: false });

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    galMat.uniforms.uPx.value = renderer.getPixelRatio();
    starMat.uniforms.uPx.value = renderer.getPixelRatio();
  };
  window.addEventListener("resize", onResize);

  const clock = new THREE.Clock();
  let rafId = 0;
  let cancelled = false;

  const tick = () => {
    if (cancelled) return;
    const t = clock.getElapsedTime();

    cam.r += (cam.rT - cam.r) * 0.06;
    cam.theta += (cam.thetaT - cam.theta) * 0.08;
    cam.phi += (cam.phiT - cam.phi) * 0.08;
    cam.px += (cam.pxT - cam.px) * 0.05;
    cam.py += (cam.pyT - cam.py) * 0.05;
    cam.bend += (cam.bendT - cam.bend) * 0.06;

    if (!dragging) cam.thetaT += 0.00025;

    const sp = Math.sin(cam.phi);
    const cx = cam.r * sp * Math.cos(cam.theta);
    const cy = cam.r * Math.cos(cam.phi);
    const cz = cam.r * sp * Math.sin(cam.theta);
    const pScale = cam.r * 0.045;
    camera.position.set(cx + cam.px * pScale, cy - cam.py * pScale, cz);
    camera.lookAt(0, 0, 0);

    galMat.uniforms.uTime.value = t;
    galMat.uniforms.uBreath.value = Math.sin(t * 0.22);
    galMat.uniforms.uBend.value = cam.bend;
    starMat.uniforms.uTime.value = t;

    galaxy.rotation.y = t * 0.012;

    coreInner.lookAt(camera.position);
    coreMid.lookAt(camera.position);
    coreOuter.lookAt(camera.position);
    coreInner.scale.setScalar(1 + Math.sin(t * 1.6) * 0.06);
    coreMid.scale.setScalar(1 + Math.sin(t * 0.9) * 0.05);
    coreOuter.scale.setScalar(1 + Math.sin(t * 0.5) * 0.04);

    starField.rotation.y = -t * 0.0035;
    starField.rotation.x = Math.sin(t * 0.05) * 0.05;

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(tick);
  };
  tick();

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
    dom.removeEventListener("pointerdown", onPtrDown);
    window.removeEventListener("pointermove", onPtrMove);
    window.removeEventListener("pointerup", onPtrUp);
    dom.removeEventListener("wheel", onWheel);
    window.removeEventListener("resize", onResize);
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
