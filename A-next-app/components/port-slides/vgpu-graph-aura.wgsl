struct Params {
  resolution: vec2f,
  time: f32,
  intensity: f32,
}

@group(0) @binding(0) var<uniform> params: Params;

fn rotate2(point: vec2f, angle: f32) -> vec2f {
  let cosine = cos(angle);
  let sine = sin(angle);
  return vec2f(
    cosine * point.x - sine * point.y,
    sine * point.x + cosine * point.y,
  );
}

fn hash21(point: vec2f) -> f32 {
  let shifted = fract(point * vec2f(123.34, 456.21));
  let folded = shifted + dot(shifted, shifted + 45.32);
  return fract(folded.x * folded.y);
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let safeResolution = max(params.resolution, vec2f(1.0));
  let aspect = safeResolution.x / safeResolution.y;
  let time = params.time;

  var point = uv - vec2f(0.5);
  point.x *= aspect;
  point.y *= -1.0;

  let radius = length(point);
  let sphereRadius = 0.455;
  let sphereMask = 1.0 - smoothstep(sphereRadius - 0.018, sphereRadius + 0.012, radius);
  let innerVolume = exp(-radius * radius * 10.5) * sphereMask;
  let outerHalo = exp(-max(radius - sphereRadius, 0.0) * 12.0)
    * (1.0 - smoothstep(0.20, 0.67, radius));
  let rim = exp(-abs(radius - sphereRadius) * 68.0);

  let surfaceDepth = sqrt(max(sphereRadius * sphereRadius - radius * radius, 0.0)) / sphereRadius;
  let latitude = point.y + sin(point.x * 8.5 + time * 0.22) * 0.013;
  let ribbonFade = sphereMask * smoothstep(0.02, 0.62, surfaceDepth);
  let violetRibbon = exp(-abs(latitude + 0.018) * 56.0) * ribbonFade;
  let cyanRibbon = exp(-abs(latitude - 0.002) * 62.0) * ribbonFade;
  let roseRibbon = exp(-abs(latitude - 0.023) * 58.0) * ribbonFade;

  let orbitPoint = rotate2(point, -0.17 + sin(time * 0.11) * 0.018);
  let orbitRadius = length(vec2f(orbitPoint.x, orbitPoint.y * 2.7));
  let orbitLine = exp(-abs(orbitRadius - 0.548) * 82.0);
  let orbitArc = orbitLine * (0.35 + 0.65 * smoothstep(-0.32, 0.32, orbitPoint.x));

  let beamPointA = rotate2(point, 0.56);
  let beamPointB = rotate2(point, -0.69);
  let beamA = exp(-abs(beamPointA.y) * 48.0)
    * smoothstep(0.12, 0.31, abs(beamPointA.x))
    * (1.0 - smoothstep(0.34, 0.72, abs(beamPointA.x)));
  let beamB = exp(-abs(beamPointB.y) * 58.0)
    * smoothstep(0.18, 0.36, abs(beamPointB.x))
    * (1.0 - smoothstep(0.40, 0.76, abs(beamPointB.x)));

  let cellScale = 34.0;
  let cell = floor((point + vec2f(1.0)) * cellScale);
  let localPoint = fract((point + vec2f(1.0)) * cellScale) - vec2f(0.5);
  let sparkSeed = hash21(cell);
  let spark = (1.0 - smoothstep(0.025, 0.075, length(localPoint)))
    * step(0.955, sparkSeed)
    * (1.0 - smoothstep(0.20, 0.60, radius));
  let sparkPulse = 0.72 + 0.28 * sin(time * 0.75 + sparkSeed * 18.0);

  let shadowPoint = vec2f(point.x / 0.39, (point.y + 0.49) / 0.058);
  let shadow = exp(-dot(shadowPoint, shadowPoint)) * 0.075;

  let violet = vec3f(0.34, 0.28, 0.94);
  let cyan = vec3f(0.16, 0.67, 0.98);
  let rose = vec3f(0.88, 0.34, 0.78);
  let neutral = vec3f(0.40, 0.42, 0.54);

  let rimAlpha = rim * 0.095;
  let volumeAlpha = innerVolume * 0.028 + outerHalo * 0.026;
  let violetAlpha = violetRibbon * 0.13;
  let cyanAlpha = cyanRibbon * 0.105;
  let roseAlpha = roseRibbon * 0.075;
  let orbitAlpha = orbitArc * 0.105;
  let beamAAlpha = beamA * 0.052;
  let beamBAlpha = beamB * 0.036;
  let sparkAlpha = spark * sparkPulse * 0.11;

  let premultiplied =
      neutral * (volumeAlpha + rimAlpha)
    + violet * (violetAlpha + orbitAlpha + beamAAlpha)
    + cyan * (cyanAlpha + beamBAlpha + sparkAlpha)
    + rose * roseAlpha
    + vec3f(0.13, 0.14, 0.17) * shadow;
  let alpha = clamp(
    volumeAlpha
      + rimAlpha
      + violetAlpha
      + cyanAlpha
      + roseAlpha
      + orbitAlpha
      + beamAAlpha
      + beamBAlpha
      + sparkAlpha
      + shadow,
    0.0,
    0.46,
  );

  return vec4f(premultiplied * params.intensity, alpha * params.intensity);
}
