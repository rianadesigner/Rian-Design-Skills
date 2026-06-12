import * as THREE from "three";

/**
 * Observatory cover effect 3 — clear living galaxy, low haze.
 *
 * Saved version:
 *  • Clearer 3D galaxy structure with sharper star points and less fog/bloom.
 *  • One million GPU particles in a continuous disk, avoiding obvious forked arms.
 *  • Differential rotation, gravitational wobble, aggregation/dispersion, and
 *    star-dust breathing for a living-universe feel.
 *  • Drag = orbit camera, wheel = immersive zoom, mouse movement = depth parallax.
 */
export function mountEffect3(container: HTMLElement): () => void {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x02040a, 0.00038);

  const camera = new THREE.PerspectiveCamera(
    56,
    window.innerWidth / window.innerHeight,
    0.5,
    7000,
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x02040a, 1);
  container.appendChild(renderer.domElement);

  const makeSharpSprite = (size = 64) => {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.12, "rgba(255,255,255,0.82)");
    g.addColorStop(0.32, "rgba(255,255,255,0.2)");
    g.addColorStop(0.68, "rgba(255,255,255,0.035)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };

  const pointTex = makeSharpSprite(64);
  const haloTex = makeSharpSprite(192);

  const GAL = 1_050_000;
  const MAX_R = 760;

  const gPos = new Float32Array(GAL * 3);
  const gSeed = new Float32Array(GAL * 4); // radius, theta0, flowLane, rand
  const gOff = new Float32Array(GAL * 4); // yOff, radialJitter, angularJitter, size
  const gCol = new Float32Array(GAL * 3);

  const cCore = new THREE.Color("#fff7e6");
  const cMid = new THREE.Color("#dfe8f5");
  const cEdge = new THREE.Color("#78a9ee");
  const cDeep = new THREE.Color("#3f67b4");
  const cWarm = new THREE.Color("#ffb36b");
  const tmp = new THREE.Color();

  for (let i = 0; i < GAL; i++) {
    const rand = Math.random();
    const radiusNorm = Math.pow(Math.random(), 1.78);
    const radius = radiusNorm * MAX_R + 5;

    // Continuous disk: random angular field with broad density waves, not lanes.
    let theta = Math.random() * Math.PI * 2;
    const flowLane =
      Math.sin(theta * 2.15 + radius * 0.008) * 0.45 +
      Math.sin(theta * 3.7 - radius * 0.005 + rand * 1.7) * 0.28;

    // Clear galaxy curvature without hard branch separation.
    theta += radius * 0.0042 + flowLane * 0.32;

    const coreBulge = Math.exp(-radius / 105);
    const diskThickness = 5 + coreBulge * 44 + radiusNorm * 5;
    const radialJitter = (Math.random() - 0.5) * Math.min(radius * 0.18, 95);
    const angularJitter = (Math.random() - 0.5) * (0.17 + (1 - radiusNorm) * 0.12);

    const r = radius + radialJitter;
    const x = Math.cos(theta + angularJitter) * r;
    const z = Math.sin(theta + angularJitter) * r;
    const y = (Math.random() - 0.5) * diskThickness + (Math.random() - 0.5) * 3;

    gPos[i * 3] = x;
    gPos[i * 3 + 1] = y;
    gPos[i * 3 + 2] = z;

    gSeed[i * 4] = radius;
    gSeed[i * 4 + 1] = theta;
    gSeed[i * 4 + 2] = flowLane;
    gSeed[i * 4 + 3] = rand;

    gOff[i * 4] = y;
    gOff[i * 4 + 1] = radialJitter;
    gOff[i * 4 + 2] = angularJitter;
    gOff[i * 4 + 3] = Math.random() < 0.025
      ? 2.1 + Math.random() * 1.9
      : 0.28 + Math.random() * 0.9;

    const dist = Math.sqrt(x * x + y * y + z * z);
    if (dist < MAX_R * 0.16) {
      tmp.lerpColors(cCore, cMid, dist / (MAX_R * 0.16));
    } else if (dist < MAX_R * 0.72) {
      tmp.lerpColors(cMid, cEdge, (dist - MAX_R * 0.16) / (MAX_R * 0.56));
    } else {
      tmp.lerpColors(cEdge, cDeep, (dist - MAX_R * 0.72) / (MAX_R * 0.28));
    }
    if (Math.random() < 0.006) tmp.lerp(cWarm, 0.45);

    gCol[i * 3] = tmp.r;
    gCol[i * 3 + 1] = tmp.g;
    gCol[i * 3 + 2] = tmp.b;
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
        float flowLane = aSeed.z;
        float rand = aSeed.w;

        // Differential rotation: slow enough to preserve a readable galaxy.
        float omega = 0.0028 / pow(radius * 0.0105 + 0.55, 0.78);
        float theta = theta0 + uTime * omega;

        // Subtle gravitational wobble and local aggregation/dispersion.
        float inner = 1.0 - smoothstep(80.0, 690.0, radius);
        float gravity = sin(uTime * 0.36 + rand * 6.2831 + flowLane) *
                        (2.0 + inner * 5.5);
        float gathering = sin(uTime * 0.16 + rand * 11.0) * (1.6 + inner * 4.2);

        float r = max(radius + aOff.y * 0.32 + gravity + gathering, 1.0);
        float a = theta +
                  aOff.z * 0.55 +
                  sin(uTime * 0.2 + radius * 0.009 + rand * 8.0) * 0.025;

        float y = aOff.x +
                  sin(uTime * 0.46 + radius * 0.013 + rand * 6.0) * 0.9 +
                  uBreath * 1.3 * sin(rand * 12.0);

        vec3 pos = vec3(cos(a) * r, y, sin(a) * r);

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;

        float ps = aOff.w * 1.35 * uPx * (380.0 / -mv.z);
        gl_PointSize = clamp(ps, 0.35, 11.0);

        vCol = color;
        vA = clamp(1.0 - radius / 900.0, 0.26, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vCol;
      varying float vA;
      uniform sampler2D uTex;
      void main() {
        vec4 t = texture2D(uTex, gl_PointCoord);
        if (t.a < 0.035) discard;
        gl_FragColor = vec4(vCol, t.a * vA * 0.95);
      }
    `,
  });

  const galaxy = new THREE.Points(galGeo, galMat);
  galaxy.rotation.x = -0.18;
  galaxy.rotation.z = 0.035;
  scene.add(galaxy);

  const MICRO_CLUSTERS = 42;
  const cPos = new Float32Array(MICRO_CLUSTERS * 3);
  const cSize = new Float32Array(MICRO_CLUSTERS);
  const cPhase = new Float32Array(MICRO_CLUSTERS);
  for (let i = 0; i < MICRO_CLUSTERS; i++) {
    const r = 120 + Math.random() * 610;
    const a = Math.random() * Math.PI * 2 + r * 0.004;
    cPos[i * 3] = Math.cos(a) * r;
    cPos[i * 3 + 1] = (Math.random() - 0.5) * 34;
    cPos[i * 3 + 2] = Math.sin(a) * r;
    cSize[i] = 4 + Math.random() * 7;
    cPhase[i] = Math.random() * Math.PI * 2;
  }
  const clusterGeo = new THREE.BufferGeometry();
  clusterGeo.setAttribute("position", new THREE.BufferAttribute(cPos, 3));
  clusterGeo.setAttribute("aSize", new THREE.BufferAttribute(cSize, 1));
  clusterGeo.setAttribute("aPhase", new THREE.BufferAttribute(cPhase, 1));
  const clusterMat = new THREE.ShaderMaterial({
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
      attribute float aPhase;
      varying float vA;
      uniform float uTime;
      uniform float uPx;
      void main() {
        vec3 p = position;
        p.y += sin(uTime * 0.7 + aPhase) * 2.0;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = clamp(aSize * uPx * (420.0 / -mv.z), 1.0, 20.0);
        vA = 0.45 + 0.25 * sin(uTime * 0.8 + aPhase);
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vA;
      uniform sampler2D uTex;
      void main() {
        vec4 t = texture2D(uTex, gl_PointCoord);
        if (t.a < 0.035) discard;
        gl_FragColor = vec4(vec3(0.86, 0.92, 1.0), t.a * vA);
      }
    `,
  });
  const clusters = new THREE.Points(clusterGeo, clusterMat);
  clusters.rotation.x = galaxy.rotation.x;
  clusters.rotation.z = galaxy.rotation.z;
  scene.add(clusters);

  const STARS = 28_000;
  const sPos = new Float32Array(STARS * 3);
  const sSize = new Float32Array(STARS);
  const sPhase = new Float32Array(STARS);
  for (let i = 0; i < STARS; i++) {
    let u: number, v: number, s: number;
    do {
      u = Math.random() * 2 - 1;
      v = Math.random() * 2 - 1;
      s = u * u + v * v;
    } while (s >= 1 || s === 0);
    const f = 2 * Math.sqrt(1 - s);
    const R = 2300 + Math.random() * 1300;
    sPos[i * 3] = u * f * R;
    sPos[i * 3 + 1] = v * f * R;
    sPos[i * 3 + 2] = (1 - 2 * s) * R;
    sSize[i] = 0.35 + Math.random() * 1.15;
    sPhase[i] = Math.random() * Math.PI * 2;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
  starGeo.setAttribute("aSize", new THREE.BufferAttribute(sSize, 1));
  starGeo.setAttribute("aPhase", new THREE.BufferAttribute(sPhase, 1));
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
      attribute float aPhase;
      varying float vTw;
      uniform float uTime;
      uniform float uPx;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uPx * (1500.0 / -mv.z);
        vTw = 0.6 + 0.4 * sin(uTime * 1.25 + aPhase);
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vTw;
      uniform sampler2D uTex;
      void main() {
        vec4 t = texture2D(uTex, gl_PointCoord);
        if (t.a < 0.045) discard;
        gl_FragColor = vec4(vec3(1.0) * vTw, t.a * 0.72);
      }
    `,
  });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  const makeHalo = (size: number, color: number, opacity: number) => {
    const m = new THREE.MeshBasicMaterial({
      map: haloTex,
      color,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity,
    });
    return new THREE.Mesh(new THREE.PlaneGeometry(size, size), m);
  };
  const coreInner = makeHalo(120, 0xfff5dc, 0.59);
  const coreMid = makeHalo(150, 0xdfeaff, 0.22);
  const coreOuter = makeHalo(640, 0x78a9ee, 0.07);
  scene.add(coreOuter, coreMid, coreInner);

  const cam = {
    r: 820,
    rT: 820,
    theta: 0,
    thetaT: 0,
    phi: Math.PI * 0.33,
    phiT: Math.PI * 0.33,
    px: 0,
    py: 0,
    pxT: 0,
    pyT: 0,
  };
  const R_MIN = 45;
  const R_MAX = 2600;
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
    cam.pxT = (e.clientX / window.innerWidth - 0.5) * 0.34;
    cam.pyT = (e.clientY / window.innerHeight - 0.5) * 0.34;
    if (!dragging) return;
    cam.thetaT = dsTheta - (e.clientX - dsx) * 0.004;
    cam.phiT = Math.max(PHI_MIN, Math.min(PHI_MAX, dsPhi - (e.clientY - dsy) * 0.004));
  };
  const onPtrUp = (e: PointerEvent) => {
    dragging = false;
    try {
      dom.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    dom.style.cursor = "grab";
  };
  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    cam.rT = Math.max(R_MIN, Math.min(R_MAX, cam.rT * Math.exp(e.deltaY * 0.00135)));
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
    clusterMat.uniforms.uPx.value = renderer.getPixelRatio();
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

    if (!dragging) cam.thetaT += 0.00022;

    const sp = Math.sin(cam.phi);
    const cx = cam.r * sp * Math.cos(cam.theta);
    const cy = cam.r * Math.cos(cam.phi);
    const cz = cam.r * sp * Math.sin(cam.theta);
    const pScale = cam.r * 0.04;
    camera.position.set(cx + cam.px * pScale, cy - cam.py * pScale, cz);
    camera.lookAt(0, 0, 0);

    galMat.uniforms.uTime.value = t;
    galMat.uniforms.uBreath.value = Math.sin(t * 0.24);
    clusterMat.uniforms.uTime.value = t;
    starMat.uniforms.uTime.value = t;

    galaxy.rotation.y = t * 0.0125;
    clusters.rotation.y = galaxy.rotation.y;

    coreInner.lookAt(camera.position);
    coreMid.lookAt(camera.position);
    coreOuter.lookAt(camera.position);
    coreInner.scale.setScalar(1 + Math.sin(t * 1.5) * 0.045);
    coreMid.scale.setScalar(1 + Math.sin(t * 0.8) * 0.035);
    coreOuter.scale.setScalar(1 + Math.sin(t * 0.45) * 0.025);

    stars.rotation.y = -t * 0.0028;
    stars.rotation.x = Math.sin(t * 0.045) * 0.035;

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
    clusterGeo.dispose();
    clusterMat.dispose();
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
