import * as THREE from 'three';

/**
 * The Party Tunnel: a real time 3D scene.
 *  - glitter particles that assemble into the SpinPix wordmark, then burst as you fly in
 *  - a neon corridor of hoops with drifting glitter and disco light specks
 *  - glass panels, each showing a photo or looping video, all run through one colour grade,
 *    with a glitch flicker as each one comes into focus
 * Driven by setProgress(0..1) from the page scroll.
 */

export type PanelInput = { image: string; video?: string; imagePos?: [number, number] };
export type SceneOptions = { mobile: boolean; logo: string; onFocus: (index: number) => void };

export const GAP = 7; // distance between panels
const START = 9; // camera start z (logo sits at z = 0)
const FIRST = -8; // first panel z
const NEON = [0xff2e93, 0x2f7bff, 0x8b3dff, 0x4de1ff];

const panelVert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
// cover-crop the media, round the corners, glow the edge, grade everything into the brand palette,
// add grain, and glitch (RGB split + slice offsets) while uGlitch > 0
const panelFrag = /* glsl */ `
  uniform sampler2D uMap; uniform vec2 uScale; uniform vec2 uOffset;
  uniform float uOpacity; uniform float uGlitch; uniform float uTime; uniform float uFocus; uniform vec3 uEdge;
  uniform vec2 uSize;
  varying vec2 vUv;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float box(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
  void main() {
    vec2 uv = vUv;
    float slice = step(0.6, hash(vec2(floor(uv.y * 18.0), floor(uTime * 14.0))));
    uv.x += (hash(vec2(floor(uv.y * 18.0), floor(uTime * 9.0))) - 0.5) * 0.12 * uGlitch * slice;
    vec2 m = uv * uScale + uOffset;
    float split = 0.012 * uGlitch;
    vec3 col = vec3(texture2D(uMap, m + vec2(split, 0.0)).r, texture2D(uMap, m).g, texture2D(uMap, m - vec2(split, 0.0)).b);
    // brand grade: crush blacks to violet, push highlights warm pink, add contrast
    float l = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 shadow = vec3(0.10, 0.04, 0.22), high = vec3(1.0, 0.86, 0.95);
    col = mix(col, mix(shadow, high, l), 0.28);
    col = (col - 0.5) * 1.12 + 0.5;
    col *= mix(0.55, 1.0, uFocus);
    col += (hash(vUv * 900.0 + uTime) - 0.5) * 0.06;
    // rounded corners and a neon edge
    vec2 p = (vUv - 0.5) * uSize;
    float d = box(p, uSize * 0.5, 0.18);
    float inside = 1.0 - smoothstep(-0.01, 0.01, d);
    float edge = exp(-abs(d) * 22.0) * (0.35 + 0.65 * uFocus);
    vec3 outCol = col * inside + uEdge * edge * 1.4;
    float a = max(inside, edge) * uOpacity;
    gl_FragColor = vec4(outCol, a);
  }
`;

function makeDotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(255,255,255,0.8)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

async function sampleLogo(src: string, max: number) {
  const img = await new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => res(i); i.onerror = rej; i.src = src; });
  const w = 260, h = Math.round((img.naturalHeight / img.naturalWidth) * w);
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  g.drawImage(img, 0, 0, w, h);
  const d = g.getImageData(0, 0, w, h).data;
  const pts: { x: number; y: number; r: number; g: number; b: number }[] = [];
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const k = (y * w + x) * 4;
    const lum = 0.299 * d[k] + 0.587 * d[k + 1] + 0.114 * d[k + 2];
    if (lum > 70) pts.push({ x, y, r: d[k] / 255, g: d[k + 1] / 255, b: d[k + 2] / 255 });
  }
  // thin out evenly to the budget
  const step = Math.max(1, pts.length / max);
  const out: typeof pts = [];
  for (let i = 0; i < pts.length; i += step) out.push(pts[Math.floor(i)]);
  return { pts: out, w, h };
}

export function createTunnel(canvas: HTMLCanvasElement, panels: PanelInput[], opts: SceneOptions) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !opts.mobile, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, opts.mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x07050c, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x07050c, 0.045);
  const camera = new THREE.PerspectiveCamera(opts.mobile ? 68 : 55, 1, 0.1, 200);
  camera.position.set(0, 0, START);

  const dot = makeDotTexture();
  const loader = new THREE.TextureLoader();
  const disposables: { dispose: () => void }[] = [dot];
  const end = FIRST - (panels.length - 1) * GAP;

  /* ---------- glitter that becomes the logo ---------- */
  let logoPoints: THREE.Points | null = null;
  let logoFrom: Float32Array, logoTo: Float32Array;
  sampleLogo(opts.logo, opts.mobile ? 2600 : 5200).then(({ pts, w, h }) => {
    const n = pts.length;
    const width = opts.mobile ? 6.4 : 9;
    const scale = width / w;
    logoFrom = new Float32Array(n * 3); logoTo = new Float32Array(n * 3);
    const colors = new Float32Array(n * 3);
    pts.forEach((p, i) => {
      logoTo[i * 3] = (p.x - w / 2) * scale;
      logoTo[i * 3 + 1] = (h / 2 - p.y) * scale + 0.4;
      logoTo[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
      const r = 6 + Math.random() * 14, a = Math.random() * Math.PI * 2, z = (Math.random() - 0.5) * 16;
      logoFrom[i * 3] = Math.cos(a) * r; logoFrom[i * 3 + 1] = Math.sin(a) * r * 0.7; logoFrom[i * 3 + 2] = z;
      colors[i * 3] = p.r * 0.95; colors[i * 3 + 1] = p.g * 0.95; colors[i * 3 + 2] = p.b * 0.95; // additive, so keep below 1 to hold the colour
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(logoFrom.slice(), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({ size: opts.mobile ? 0.085 : 0.07, map: dot, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    logoPoints = new THREE.Points(geo, mat);
    scene.add(logoPoints);
    disposables.push(geo, mat);
  }).catch(() => { /* logo is decoration; the tunnel still works without it */ });

  /* ---------- glitter drifting along the whole corridor ---------- */
  const dustN = opts.mobile ? 900 : 2200;
  const dustPos = new Float32Array(dustN * 3), dustCol = new Float32Array(dustN * 3);
  const palette = [new THREE.Color(0xff2e93), new THREE.Color(0x2f7bff), new THREE.Color(0x8b3dff), new THREE.Color(0xffd27a), new THREE.Color(0xffffff)];
  for (let i = 0; i < dustN; i++) {
    const r = 2.5 + Math.random() * 7, a = Math.random() * Math.PI * 2;
    dustPos[i * 3] = Math.cos(a) * r; dustPos[i * 3 + 1] = Math.sin(a) * r * 0.65;
    dustPos[i * 3 + 2] = START - Math.random() * (START - end + 14);
    const c = palette[Math.floor(Math.random() * palette.length)];
    dustCol[i * 3] = c.r; dustCol[i * 3 + 1] = c.g; dustCol[i * 3 + 2] = c.b;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  dustGeo.setAttribute('color', new THREE.BufferAttribute(dustCol, 3));
  const dustMat = new THREE.PointsMaterial({ size: 0.07, map: dot, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);
  disposables.push(dustGeo, dustMat);

  /* ---------- neon hoops make the corridor ---------- */
  const hoops: THREE.Mesh[] = [];
  for (let z = FIRST + GAP / 2, i = 0; z > end - GAP; z -= GAP / 2, i++) {
    const geo = new THREE.TorusGeometry(opts.mobile ? 4.2 : 5.6, 0.018, 8, 96);
    const mat = new THREE.MeshBasicMaterial({ color: NEON[i % NEON.length], transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
    const m = new THREE.Mesh(geo, mat);
    m.scale.y = 0.62; m.position.z = z; m.rotation.z = (i % 2 ? 1 : -1) * 0.08;
    scene.add(m); hoops.push(m); disposables.push(geo, mat);
  }
  // a glossy floor line to anchor the space
  const floorGeo = new THREE.PlaneGeometry(14, START - end + 30, 1, 1);
  const floorMat = new THREE.MeshBasicMaterial({ color: 0x1a0d33, transparent: true, opacity: 0.55 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, -3.4, (START + end) / 2 - 8);
  scene.add(floor); disposables.push(floorGeo, floorMat);

  /* ---------- the panels ---------- */
  // portrait panels, like phone screens or photo strips (the Veo clips and the photos are 9:16)
  const PH = opts.mobile ? 3.7 : 4.3, PW = PH * 9 / 16;
  type P = { mesh: THREE.Mesh; mat: THREE.ShaderMaterial; z: number; video?: HTMLVideoElement; glitchT: number };
  const ps: P[] = panels.map((pn, i) => {
    const geo = new THREE.PlaneGeometry(PW, PH);
    const mat = new THREE.ShaderMaterial({
      vertexShader: panelVert, fragmentShader: panelFrag, transparent: true, depthWrite: false,
      uniforms: {
        uMap: { value: null }, uScale: { value: new THREE.Vector2(1, 1) }, uOffset: { value: new THREE.Vector2(0, 0) },
        uOpacity: { value: 0 }, uGlitch: { value: 0 }, uTime: { value: 0 }, uFocus: { value: 0 },
        uEdge: { value: new THREE.Color(NEON[i % NEON.length]) }, uSize: { value: new THREE.Vector2(PW, PH) },
      },
    });
    const mesh = new THREE.Mesh(geo, mat);
    const side = opts.mobile ? 0 : (i % 2 ? 1 : -1);
    const z = FIRST - i * GAP;
    mesh.position.set(side * 1.7, opts.mobile ? 0.45 : 0.25, z);
    mesh.rotation.y = -side * 0.28;
    mesh.userData.index = i;
    scene.add(mesh);
    disposables.push(geo, mat);

    const fit = (w: number, h: number) => {
      // cover crop to the panel shape around the focus point
      const want = PW / PH, have = w / h;
      const [fx, fy] = pn.imagePos ?? [0.5, 0.5];
      if (have > want) { const s = want / have; mat.uniforms.uScale.value.set(s, 1); mat.uniforms.uOffset.value.set(Math.min(1 - s, Math.max(0, fx - s / 2)), 0); }
      else { const s = have / want; mat.uniforms.uScale.value.set(1, s); mat.uniforms.uOffset.value.set(0, Math.min(1 - s, Math.max(0, (1 - fy) - s / 2))); }
    };
    loader.load(pn.image, (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      if (!mat.uniforms.uMap.value) { mat.uniforms.uMap.value = t; fit(t.image.width, t.image.height); }
      disposables.push(t);
    });
    const p: P = { mesh, mat, z, glitchT: 0 };
    if (pn.video) {
      const v = document.createElement('video');
      v.src = pn.video; v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'none'; v.crossOrigin = 'anonymous';
      v.addEventListener('loadeddata', () => {
        const vt = new THREE.VideoTexture(v);
        vt.colorSpace = THREE.SRGBColorSpace;
        mat.uniforms.uMap.value = vt; fit(v.videoWidth, v.videoHeight);
        disposables.push(vt);
      }, { once: true });
      p.video = v;
    }
    return p;
  });

  /* ---------- state, input, loop ---------- */
  let target = 0, progress = 0, focused = -1, running = false, raf = 0;
  const mouse = new THREE.Vector2(), look = new THREE.Vector2();
  const clock = new THREE.Clock();
  const smooth = (e0: number, e1: number, x: number) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };

  const camZ = (p: number) => START + (end - 3 - START) * smooth(0.1, 1, p);

  const frame = () => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, clock.getDelta());
    const t = clock.elapsedTime;
    progress += (target - progress) * Math.min(1, dt * 6);
    const z = camZ(progress);
    look.lerp(mouse, Math.min(1, dt * 3));
    camera.position.set(look.x * 0.6 + Math.sin(t * 0.3) * 0.08, look.y * 0.35 + Math.cos(t * 0.27) * 0.06, z);
    camera.lookAt(look.x * 1.2, look.y * 0.6, z - 10);

    // logo: assemble 0 to 0.06, hold, burst outwards as the camera moves in
    if (logoPoints && logoFrom) {
      const pos = logoPoints.geometry.attributes.position as THREE.BufferAttribute;
      const a = smooth(0, 0.065, progress), b = smooth(0.1, 0.2, progress);
      const arr = pos.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        const tw = Math.sin(t * 2 + i) * 0.02;
        const x = logoFrom[i] + (logoTo[i] - logoFrom[i]) * a, y = logoFrom[i + 1] + (logoTo[i + 1] - logoFrom[i + 1]) * a;
        arr[i] = x * (1 + b * 2.4) + tw; arr[i + 1] = y * (1 + b * 2.4) + tw; arr[i + 2] = logoTo[i + 2] * a + logoFrom[i + 2] * (1 - a) + b * 6;
      }
      pos.needsUpdate = true;
      (logoPoints.material as THREE.PointsMaterial).opacity = 1 - b;
      logoPoints.visible = b < 1;
    }

    dust.rotation.z = t * 0.02;
    hoops.forEach((h, i) => { h.rotation.z += dt * 0.05 * (i % 2 ? 1 : -1); (h.material as THREE.MeshBasicMaterial).opacity = 0.35 + 0.25 * Math.sin(t * 1.5 + i); });

    let best = -1, bestD = 1e9;
    ps.forEach((p, i) => {
      const d = z - p.z; // distance in front of camera
      const near = Math.max(0, 1 - Math.abs(d - 5) / 7);
      // panels stay hidden behind the logo until you fly in
      // fade out before the camera reaches a panel, so you never fly through it
      p.mat.uniforms.uOpacity.value = Math.min(1, Math.max(0, (d - 1.2) / 2.2)) * Math.min(1, Math.max(0, (30 - d) / 10)) * smooth(0.09, 0.15, progress);
      p.mat.uniforms.uFocus.value = near;
      p.mat.uniforms.uTime.value = t;
      p.glitchT = Math.max(0, p.glitchT - dt * 2.2);
      p.mat.uniforms.uGlitch.value = p.glitchT;
      p.mesh.position.y += (Math.sin(t * 0.8 + i) * 0.0015);
      if (d > 0 && Math.abs(d - 5) < bestD) { bestD = Math.abs(d - 5); best = i; }
      if (p.video) { const want = d > -2 && d < 22; if (want && p.video.paused) p.video.play().catch(() => {}); if (!want && !p.video.paused) p.video.pause(); }
    });
    if (bestD > 4) best = -1;
    if (best !== focused) {
      focused = best;
      if (best >= 0) ps[best].glitchT = 1;
      opts.onFocus(best);
    }
    renderer.render(scene, camera);
  };

  const raycaster = new THREE.Raycaster();
  return {
    setProgress(p: number) { target = p; },
    setPointer(x: number, y: number) { mouse.set(x, y); },
    /** index of the panel under a click, or -1 */
    pick(x: number, y: number) {
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
      const hit = raycaster.intersectObjects(ps.map((p) => p.mesh))[0];
      return hit && (hit.object as THREE.Mesh).userData.index >= 0 && ps[(hit.object as THREE.Mesh).userData.index].mat.uniforms.uOpacity.value > 0.5
        ? (hit.object as THREE.Mesh).userData.index as number : -1;
    },
    /** scroll progress at which panel i is in focus */
    progressFor(i: number) {
      const want = FIRST - i * GAP + 5; // camera z
      let lo = 0, hi = 1;
      for (let k = 0; k < 30; k++) { const mid = (lo + hi) / 2; if (camZ(mid) > want) lo = mid; else hi = mid; }
      return (lo + hi) / 2;
    },
    resize(w: number, h: number) { renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); },
    start() { if (!running) { running = true; clock.getDelta(); frame(); } },
    stop() { running = false; cancelAnimationFrame(raf); ps.forEach((p) => p.video?.pause()); },
    dispose() {
      this.stop();
      ps.forEach((p) => { if (p.video) { p.video.removeAttribute('src'); p.video.load(); } });
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
