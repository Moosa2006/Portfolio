import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import {
  DOORS,
  DOOR_RADIUS as RY,
  FALLS_START,
  ROOM_FLOOR,
  ROOM_LEAVE,
  ROOM_START,
  ROOM_Z,
  doorAngle,
  journey,
  onFrame,
} from "../core/store.js";
import { PlanarReflection, ReflectorMaterial } from "./reflector.js";

// Interactive Three.js 3D Sanctuary & Gateway World for Moosa's Portfolio:
// cedar forest → torii and mossy stairs → lantern-lit shrine → seven-door
// sanctuary → hidden waterfall, driven by the scroll "travel" value.

const ASSETS = {
  cherry: "/models/cherry_blossom.glb",
  cedar: "/models/cedar_tree.glb",
  hdr: "/textures/forest_env.hdr",
  billboard: "/textures/cedar_billboard.png",
  leaf: "/textures/cedar_leaf_rgba.png",
  logo: "/moosa-logo-transparent.webp",
  waterfall: "/art/sacred-waterfall.webp",
  draco: "/vendor/three/addons/libs/draco/",
};

export const TIERS = {
  A: { dpr: 1.5, reflectionSize: 768, bloom: true, petals: 500, atmosphere: 100, billboards: 40, shadows: true },
  B: { dpr: 1.25, reflectionSize: 512, bloom: false, petals: 250, atmosphere: 60, billboards: 28, shadows: true },
  C: { dpr: 1, reflectionSize: 256, bloom: false, petals: 100, atmosphere: 30, billboards: 18, shadows: false },
};

const smoothstep = THREE.MathUtils.smoothstep;
const lcg = (seed) => {
  let s = seed;
  return () => (s = (Math.imul(s, 1664525) + 0x3c6ef35f) >>> 0) / 0x100000000;
};

/* ------------------------------ shared loaders ----------------------------- */

const textureLoader = new THREE.TextureLoader();
const textureCache = new Map();
function texture(url) {
  if (!textureCache.has(url)) textureCache.set(url, textureLoader.load(url));
  return textureCache.get(url);
}
function textureAsync(url) {
  return new Promise((resolve, reject) => {
    const cached = textureCache.get(url);
    if (cached?.image) return resolve(cached);
    const tex = textureLoader.load(url, resolve, undefined, reject);
    textureCache.set(url, tex);
  });
}

let dracoLoader = null;
const gltfCache = new Map();
function loadGLTF(url) {
  if (!gltfCache.has(url)) {
    dracoLoader ??= new DRACOLoader().setDecoderPath(ASSETS.draco);
    const loader = new GLTFLoader().setDRACOLoader(dracoLoader);
    gltfCache.set(url, loader.loadAsync(url));
  }
  return gltfCache.get(url);
}

let hdrPromise = null;
function loadHDR() {
  hdrPromise ??= new HDRLoader().loadAsync(ASSETS.hdr).then((tex) => {
    tex.mapping = THREE.EquirectangularReflectionMapping;
    return tex;
  });
  return hdrPromise;
}

/* --------------------------------- helpers -------------------------------- */

function mesh(geometry, material, opts = {}) {
  const m = new THREE.Mesh(geometry, material);
  if (opts.position) m.position.fromArray(opts.position);
  if (opts.rotation) m.rotation.fromArray(opts.rotation);
  if (opts.scale !== undefined) typeof opts.scale === "number" ? m.scale.setScalar(opts.scale) : m.scale.fromArray(opts.scale);
  m.castShadow = !!opts.cast;
  m.receiveShadow = !!opts.receive;
  if (opts.name) m.name = opts.name;
  return m;
}

function group(opts = {}, ...children) {
  const g = new THREE.Group();
  if (opts.position) g.position.fromArray(opts.position);
  if (opts.rotation) g.rotation.fromArray(opts.rotation);
  if (opts.scale !== undefined) typeof opts.scale === "number" ? g.scale.setScalar(opts.scale) : g.scale.fromArray(opts.scale);
  if (opts.name) g.name = opts.name;
  children.flat().forEach((c) => c && g.add(c));
  return g;
}

const std = (params) => new THREE.MeshStandardMaterial(params);

function pointLight(position, color, intensity, distance, decay = 2) {
  const l = new THREE.PointLight(color, intensity, distance, decay);
  l.position.fromArray(position);
  return l;
}

const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const cyl = (...a) => new THREE.CylinderGeometry(...a);

function mergeNonIndexed(list) {
  const flat = list.map((g) => (g.index ? g.toNonIndexed() : g));
  const merged = mergeGeometries(flat);
  new Set([...flat, ...list]).forEach((g) => g !== merged && g.dispose());
  return merged;
}

/** Terrain height used to seat trees, rocks and the slope beside the stairs. */
function terrainHeight(x, z) {
  const ax = Math.abs(x);
  if (z <= -28) return ax < 12.5 ? 5.4 : 5.6 + Math.max(0, 0.22 * (ax - 12.5)) + Math.min(1.2, ((-z - 28) / 14) * 0.8);
  if (z <= -8) return ((-z - 8) / 20) * 6 + Math.max(0, (ax - 7.5) * 0.12);
  return 0.12 + Math.max(0, (ax - 7.5) * 0.1);
}

const PBR_TEXTURES = (name) => ["diff", "nor_gl", "rough"].map((t) => texture(`/materials/${name}_${t}.webp`));

function pbrMaterial(name, repeat = [1, 1], color = "#ffffff") {
  const [diff, nor, rough] = PBR_TEXTURES(name).map((base) => {
    const t = base.clone();
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
    t.anisotropy = 4;
    t.needsUpdate = true;
    return t;
  });
  diff.colorSpace = THREE.SRGBColorSpace;
  return std({
    map: diff,
    normalMap: nor,
    roughnessMap: rough,
    normalScale: new THREE.Vector2(0.7, 0.7),
    roughness: 0.92,
    color,
  });
}

function canvasTexture(width, height, draw, opts = {}) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  draw(c.getContext("2d"), c);
  const t = new THREE.CanvasTexture(c);
  if (opts.repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(opts.repeat[0], opts.repeat[1]);
  }
  if (opts.srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (opts.anisotropy) t.anisotropy = opts.anisotropy;
  return t;
}

/* --------------------------- the exalted torii gate ------------------------ */

function grainTexture(rgb, seed) {
  return canvasTexture(
    512,
    512,
    (ctx) => {
      const img = ctx.createImageData(512, 512);
      const rnd = lcg(seed);
      const row = Array.from({ length: 512 }, () => rnd());
      for (let y = 0; y < 512; y++)
        for (let x = 0; x < 512; x++) {
          const g =
            (row[(x + Math.round(2.4 * Math.sin((y * Math.PI * 4) / 512) + 1.2 * Math.sin((y * Math.PI * 14) / 512)) + 512) % 512] - 0.5) * 0.14 +
            (rnd() - 0.5) * 0.07;
          const w = 0.035 * Math.sin((x * Math.PI * 10) / 512 + Math.sin((y * Math.PI * 2) / 512));
          const i = (512 * y + x) * 4;
          for (let c = 0; c < 3; c++) img.data[i + c] = rgb[c] * (1 + g + w);
          img.data[i + 3] = 255;
        }
      ctx.putImageData(img, 0, 0);
      for (let k = 0; k < 110; k++) {
        const x = 512 * rnd();
        const y = 512 * rnd();
        ctx.strokeStyle = `rgba(29, 17, 12, ${0.03 + 0.08 * rnd()})`;
        ctx.lineWidth = 0.35 + 0.7 * rnd();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(x - 1, y + 14, x + 1, y + 36, x, y + 48 + 58 * rnd());
        ctx.stroke();
      }
    },
    { srgb: true, anisotropy: 4, repeat: [1, 1] },
  );
}

function kasagi(width, y, thickness, lift, depth) {
  const o = width / 2;
  const s = new THREE.Shape();
  s.moveTo(-o, y + lift);
  s.bezierCurveTo(-(0.64 * o), y + 0.06 * lift, 0.64 * o, y + 0.06 * lift, o, y + lift);
  s.lineTo(o + 0.035, y + lift + thickness);
  s.bezierCurveTo(0.61 * o, y + thickness, -(0.61 * o), y + thickness, -o - 0.035, y + lift + thickness);
  s.closePath();
  return new THREE.ExtrudeGeometry(s, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    steps: 1,
    curveSegments: 40,
  }).translate(0, 0, -depth / 2);
}

function bevelBox(w, h, d) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2, -h / 2);
  s.lineTo(w / 2, -h / 2);
  s.lineTo(w / 2, h / 2);
  s.lineTo(-w / 2, h / 2);
  s.closePath();
  return new THREE.ExtrudeGeometry(s, {
    depth: d,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.018,
    bevelThickness: 0.018,
    steps: 1,
  }).translate(0, 0, -d / 2);
}

function plaqueTexture() {
  return canvasTexture(
    256,
    512,
    (t) => {
      t.fillStyle = "#222322";
      t.fillRect(0, 0, 256, 512);
      t.strokeStyle = "#99825a";
      t.lineWidth = 3;
      t.strokeRect(21, 19, 214, 474);
      t.lineWidth = 1;
      t.strokeRect(28, 26, 200, 460);
      t.strokeStyle = "#c2a773";
      t.lineCap = "square";
      t.lineJoin = "bevel";
      t.lineWidth = 13;
      t.beginPath();
      t.moveTo(74, 387);
      t.lineTo(74, 166);
      t.lineTo(111, 166);
      t.lineTo(111, 248);
      t.lineTo(74, 248);
      t.moveTo(78, 207);
      t.lineTo(108, 207);
      t.moveTo(182, 384);
      t.lineTo(182, 166);
      t.lineTo(145, 166);
      t.lineTo(145, 248);
      t.lineTo(182, 248);
      t.moveTo(148, 207);
      t.lineTo(179, 207);
      t.moveTo(182, 383);
      t.lineTo(161, 393);
      t.stroke();
      t.lineWidth = 3;
      t.beginPath();
      t.arc(128, 90, 29, 0, 2 * Math.PI);
      t.stroke();
      for (let e = 0; e < 12; e++) {
        t.save();
        t.translate(128, 90);
        t.rotate((e / 12) * Math.PI * 2);
        t.beginPath();
        t.ellipse(0, -12, 3.5, 10, 0, 0, 2 * Math.PI);
        t.stroke();
        t.restore();
      }
    },
    { srgb: true, anisotropy: 4 },
  );
}

function buildTorii() {
  const parts = { lacquer: [], wood: [], endgrain: [], stone: [], iron: [], bronze: [], plaque: [] };
  const add = (kind, geo, x = 0, y = 0, z = 0) => {
    geo.translate(x, y, z);
    const g = geo.index ? geo.toNonIndexed() : geo;
    if (g !== geo) geo.dispose();
    if (!g.getAttribute("uv")) g.setAttribute("uv", new THREE.Float32BufferAttribute(Array(2 * g.getAttribute("position").count).fill(0), 2));
    parts[kind].push(g);
  };
  for (const e of [-1, 1]) {
    const m = new THREE.Matrix4().makeRotationZ(0.045 * e);
    m.setPosition(3.7 * e, 3.28, 0);
    const pillar = (kind, geo, y) => {
      geo.translate(0, y, 0).applyMatrix4(m);
      add(kind, geo);
    };
    pillar("lacquer", cyl(0.305, 0.455, 6.56, 48, 4), 0);
    pillar("iron", cyl(0.449, 0.474, 0.86, 48), -2.84);
    pillar("wood", cyl(0.452, 0.452, 0.048, 48), -2.38);
    pillar("bronze", cyl(0.454, 0.454, 0.027, 48), -2.415);
    pillar("iron", cyl(0.334, 0.341, 0.22, 40), 2.89);
    pillar("bronze", cyl(0.342, 0.342, 0.023, 40), 2.765);
    const r = 3.85 * e;
    add("stone", cyl(0.65, 0.74, 0.22, 12), r, 0.05);
    add("stone", cyl(0.55, 0.62, 0.12, 12), r, 0.22);
    add("lacquer", bevelBox(0.94, 0.17, 0.82), 3.56 * e, 6.22);
    add("wood", bevelBox(0.86, 0.1, 0.69), 3.56 * e, 6.34);
    add("lacquer", bevelBox(0.64, 0.2, 0.67), 3.56 * e, 6.07);
    for (const s of [-1, 1]) {
      add("wood", bevelBox(0.14, 0.28, 0.105), 3.63 * e, 4.79, 0.342 * s);
      add("bronze", cyl(0.043, 0.047, 0.046, 8).rotateX(Math.PI / 2), 3.63 * e, 4.79, 0.418 * s);
      for (const a of [-0.16, 0.16]) add("iron", cyl(0.019, 0.019, 0.025, 8).rotateX(Math.PI / 2), 3.83 * e + a, 0.6, 0.455 * s);
    }
  }
  add("lacquer", bevelBox(10.12, 0.33, 0.49), 0, 4.78);
  add("wood", bevelBox(10.2, 0.038, 0.5), 0, 4.595);
  add("lacquer", bevelBox(0.32, 1.47, 0.46), 0, 5.56);
  add("lacquer", kasagi(11.38, 6.24, 0.24, 0.34, 0.72));
  add("wood", kasagi(11.72, 6.52, 0.13, 0.42, 0.88));
  add("wood", kasagi(12.12, 6.65, 0.25, 0.46, 0.97));
  add("bronze", kasagi(12.19, 6.94, 0.018, 0.46, 1.015));
  add("wood", kasagi(12.28, 6.967, 0.095, 0.475, 1.055));
  for (const e of [-1, 1]) {
    add("iron", bevelBox(0.16, 0.31, 0.96).rotateZ(0.25 * e), 5.92 * e, 7.055);
    add("endgrain", bevelBox(0.032, 0.275, 0.39), 5.09 * e, 4.78);
    add("wood", bevelBox(0.075, 0.355, 0.54), 4.94 * e, 4.78);
    for (const s of [-0.49, 0.49]) add("bronze", cyl(0.025, 0.025, 0.028, 8).rotateX(Math.PI / 2), 5.94 * e, 7.1, s);
  }
  add("wood", bevelBox(0.69, 1.08, 0.13), 0, 5.62, 0.325);
  add("bronze", bevelBox(0.62, 1, 0.028), 0, 5.62, 0.418);
  add("plaque", new THREE.PlaneGeometry(0.556, 0.932), 0, 5.62, 0.458);
  for (const e of [-0.276, 0.276]) for (const s of [5.18, 6.06]) add("iron", cyl(0.014, 0.014, 0.017, 8).rotateX(Math.PI / 2), e, s, 0.447);

  const lacquerTex = grainTexture([232, 68, 30], 2641);
  const woodTex = grainTexture([22, 20, 24], 8102);
  const endTex = grainTexture([120, 72, 42], 1407);
  const materials = {
    lacquer: new THREE.MeshPhysicalMaterial({
      map: lacquerTex,
      bumpMap: lacquerTex,
      bumpScale: 0.015,
      roughness: 0.34,
      metalness: 0.08,
      clearcoat: 0.55,
      clearcoatRoughness: 0.22,
      color: "#ea4726",
    }),
    wood: std({ map: woodTex, bumpMap: woodTex, bumpScale: 0.03, roughness: 0.65, metalness: 0.15, color: "#1a191d" }),
    endgrain: std({ map: endTex, roughness: 0.78, color: "#8b4d2b" }),
    stone: std({ color: "#383e3c", roughness: 0.92, flatShading: true }),
    iron: std({ color: "#1a1c1a", metalness: 0.72, roughness: 0.45 }),
    bronze: std({ color: "#e5b85c", metalness: 0.82, roughness: 0.32 }),
    plaque: std({ map: plaqueTexture(), roughness: 0.52, metalness: 0.32 }),
  };
  const g = group({ name: "The Exalted Gate — layered timber and lacquer" });
  for (const [kind, list] of Object.entries(parts)) {
    if (!list.length) continue;
    const merged = mergeGeometries(list, false);
    list.forEach((x) => x.dispose());
    merged.computeBoundingSphere();
    g.add(mesh(merged, materials[kind], { cast: true, receive: true, name: `Torii ${kind}` }));
  }
  return g;
}

function buildToriiCrest() {
  const map = texture(ASSETS.logo);
  map.colorSpace = THREE.SRGBColorSpace;
  return mesh(new THREE.PlaneGeometry(0.9, 0.52), std({ map, roughness: 0.8, transparent: true }), {
    position: [0, 5.62, 0.435],
    scale: [1.35, 1.35, 1],
  });
}

/* ------------------------------ mirror water ------------------------------ */

function buildWater(ctx) {
  const rnd = lcg(42);
  const petals = [];
  for (let t = 0; t < 48; t++) {
    const x = (rnd() - 0.5) * 34;
    const z = 2.8 + 22 * rnd();
    if (Math.abs(x) < 2.6) continue;
    petals.push({ pos: [x, 0.015, z], rot: rnd() * Math.PI * 2, scale: 0.12 + 0.12 * rnd(), color: t % 3 === 0 ? "#ffccd8" : "#f5e4ea" });
  }
  const distortionMap = canvasTexture(
    256,
    256,
    (ctx2) => {
      const img = ctx2.createImageData(256, 256);
      const a = img.data;
      for (let y = 0; y < 256; y++)
        for (let x = 0; x < 256; x++) {
          const s = (x / 256) * Math.PI * 8;
          const r = (y / 256) * Math.PI * 8;
          const o = 0.2 * (0.5 * Math.sin(s) + 0.35 * Math.sin(2.3 * s + 1.5 * r) + 0.15 * Math.sin(3.7 * s - 2.1 * r));
          const n = 0.2 * (0.5 * Math.cos(r) + 0.35 * Math.cos(2.1 * r - 1.2 * s) + 0.15 * Math.cos(3.9 * r + 1.8 * s));
          const l = Math.sqrt(o * o + n * n + 1);
          const i = (256 * y + x) * 4;
          a[i] = Math.floor(((o / l) * 0.5 + 0.5) * 255);
          a[i + 1] = Math.floor(((n / l) * 0.5 + 0.5) * 255);
          a[i + 2] = Math.floor(((1 / l) * 0.5 + 0.5) * 255);
          a[i + 3] = 255;
        }
      ctx2.putImageData(img, 0, 0);
    },
    { repeat: [6, 4] },
  );
  const material = new ReflectorMaterial({
    mirror: 0.96,
    mixStrength: 2.6,
    roughness: 0.01,
    metalness: 0.04,
    color: "#ffffff",
    distortionMap,
    distortion: 0.038,
  });
  const surface = mesh(new THREE.PlaneGeometry(41.4, 24.45), material, {
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 14.275],
    receive: true,
  });
  const reflection = new PlanarReflection(surface, material, TIERS[ctx.tier].reflectionSize);
  ctx.reflection = reflection;

  const petalMesh = new THREE.InstancedMesh(
    new THREE.CircleGeometry(1, 5),
    std({ roughness: 0.6, transparent: true, opacity: 0.88 }),
    petals.length,
  );
  petalMesh.name = "Floating Water Petals";
  const m = new THREE.Matrix4();
  const p = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const sc = new THREE.Vector3();
  const color = new THREE.Color();
  const flat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
  petals.forEach((pt, i) => {
    p.fromArray(pt.pos);
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), pt.rot).premultiply(flat);
    sc.setScalar(pt.scale);
    m.compose(p, q, sc);
    petalMesh.setMatrixAt(i, m);
    petalMesh.setColorAt(i, color.set(pt.color));
  });
  petalMesh.instanceMatrix.needsUpdate = true;
  if (petalMesh.instanceColor) petalMesh.instanceColor.needsUpdate = true;

  ctx.frame.push(({ elapsed }) => {
    distortionMap.offset.x = (0.016 * elapsed) % 1;
    distortionMap.offset.y = (0.011 * elapsed) % 1;
  });

  return group(
    { name: "Tranquil Still Water Mirror Complex" },
    mesh(box(41.4, 1.2, 24.45), std({ color: "#0d181e", roughness: 0.92, metalness: 0.04 }), { position: [0, -0.65, 14.275], receive: true }),
    surface,
    petalMesh,
  );
}

/* --------------------------- cherry blossom trees -------------------------- */

function buildCherryTree(position, scale, rotation) {
  const holder = group({ position, scale, rotation, name: "Flanking Cherry Blossom Tree" });
  loadGLTF(ASSETS.cherry)
    .then(({ scene }) => {
      const tree = scene.clone(true);
      tree.traverse((obj) => {
        if (!obj.isMesh) return;
        const mat = obj.material;
        const name = (mat?.name || obj.name || "").toLowerCase();
        const leafy =
          name.includes("flower") || name.includes("leaf") || name.includes("petal") || name.includes("branch") ||
          mat?.name === "flowers" || mat?.name === "flower_leaf_material";
        obj.castShadow = !leafy;
        obj.receiveShadow = !leafy;
        if (!mat) return;
        if (leafy) {
          mat.transparent = true;
          mat.side = THREE.DoubleSide;
          mat.alphaTest = 0.5;
          mat.depthWrite = true;
          for (const t of [mat.map, mat.alphaMap]) {
            if (!t) continue;
            t.minFilter = THREE.LinearFilter;
            t.generateMipmaps = false;
            t.needsUpdate = true;
          }
          mat.needsUpdate = true;
        } else {
          if (mat.map) mat.map.anisotropy = 4;
          if (mat.normalMap) mat.normalMap.anisotropy = 4;
        }
      });
      holder.add(tree);
      journey.sceneRevision++;
    })
    .catch((err) => console.warn("Cherry blossom model unavailable", err));
  return holder;
}

/* ------------------------ scroll-operated temple doors --------------------- */

const LOGO_CROP = { x: 379 / 2360, y: 230 / 1640, width: 1572 / 2360, height: 1363 / 1640 };

function logoHalf({ side, panelCenter, panelWidth, width = 2.35, y, z, back = false }) {
  const base = texture(ASSETS.logo);
  const t = base.clone();
  const s = back ? -side : side;
  t.offset.set(LOGO_CROP.x + (s === 1 ? LOGO_CROP.width / 2 : 0), LOGO_CROP.y);
  t.repeat.set(LOGO_CROP.width / 2, LOGO_CROP.height);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.needsUpdate = true;
  return mesh(
    new THREE.PlaneGeometry(width / 2, (1363 * width) / 1572),
    std({
      map: t,
      transparent: true,
      opacity: 0.86,
      color: "#e1cfaa",
      roughness: 0.98,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    }),
    { position: [side * (width / 4 + (2 * panelCenter - panelWidth) / 2 - panelCenter), y, z], rotation: [0, back ? Math.PI : 0, 0] },
  );
}

function buildEntrance(ctx) {
  const wood = pbrMaterial("wood_planks_dirt", [1, 1], "#f0c899");
  const rails = [];
  const inlay = [];
  for (const s of [-1.86, 1.86]) {
    rails.push(box(4.22, 0.16, 0.065).translate(0, s, 0.09));
    inlay.push(box(4.22, 0.025, 0.014).translate(0, s, 0.13));
  }
  for (const e of [-1.15, 0, 1.15])
    for (const s of [-1, 1])
      for (const a of [-1, 1])
        inlay.push(box(0.025, 0.36 * Math.SQRT2, 0.025).rotateZ((s * a * Math.PI) / 4).translate(0.95 + 0.18 * s, e + 0.18 * a, 0.092));
  const railGeo = mergeGeometries(rails);
  const inlayGeo = mergeGeometries(inlay);
  [...rails, ...inlay].forEach((g) => g.dispose());

  const railMat = std({ color: "#74462b", roughness: 0.8 });
  const inlayMat = std({ color: "#c5a770", metalness: 0.35, roughness: 0.55 });
  const leaves = [-1, 1].map((r) =>
    group(
      { position: [2.11 * r, 0, 0] },
      mesh(box(4.22, 3.95, 0.14), wood, { cast: true, receive: true }),
      mesh(railGeo, railMat),
      mesh(inlayGeo, inlayMat, { scale: [r, 1, 1] }),
      mesh(box(0.14, 3.95, 0.065), railMat, { position: [2.03 * r, 0, 0.09] }),
      mesh(box(0.025, 3.7, 0.014), inlayMat, { position: [2.02 * r, 0, 0.13] }),
      logoHalf({ side: r, panelCenter: 2.11, panelWidth: 4.22, width: 2.65, y: 0, z: 0.071 }),
      logoHalf({ side: r, panelCenter: 2.11, panelWidth: 4.22, width: 2.65, y: 0, z: -0.071, back: true }),
    ),
  );
  const g = group(
    { position: [0, 2.145, 5.52], name: "Scroll-operated temple entrance" },
    mesh(box(8.68, 0.22, 0.65), wood, { position: [0, -2.085, 0], receive: true }),
    mesh(box(8.68, 0.18, 0.22), std({ color: "#a3432e", roughness: 0.7 }), { position: [0, 2.03, 0], cast: true }),
    leaves,
  );
  ctx.frame.push(() => {
    const s = Math.max(0, Math.min(1, (journey.travel - 0.4) / 0.044999999999999984));
    const a = 2.11 + s * s * (3 - 2 * s) * 4.34;
    leaves[0].position.x = -a;
    leaves[1].position.x = a;
  });
  ctx.interactive.push({ object: g, enabled: () => true, onClick: () => ctx.scrollTo(ROOM_START) });
  return g;
}

/* ------------------------- cedar & vermilion temple ------------------------ */

function roofShape(width, height, depth, y, z) {
  const o = width / 2;
  const s = new THREE.Shape();
  s.moveTo(-o, 0.34);
  s.bezierCurveTo(-(0.75 * o), -0.3, -(0.24 * o), 0.85 * height, 0, height);
  s.bezierCurveTo(0.24 * o, 0.85 * height, 0.75 * o, -0.3, o, 0.34);
  s.lineTo(o, 0.12);
  s.bezierCurveTo(0.75 * o, -0.52, 0.24 * o, 0.85 * height - 0.22, 0, height - 0.22);
  s.bezierCurveTo(-(0.24 * o), 0.85 * height - 0.22, -(0.75 * o), -0.52, -o, 0.12);
  s.closePath();
  return new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 16 }).translate(0, y, z);
}

function buildTemple(ctx) {
  const parts = { wood: [], red: [], gold: [], roof: [], stone: [] };
  const b = (kind, w, h, d, x, y, z) => parts[kind].push(box(w, h, d).translate(x, y, z));
  b("stone", 28, 0.65, 5.4, 0, -0.4, 3.15);
  b("wood", 26, 0.2, 4.2, 0, 0.04, 3.5);
  for (let e = 0; e < 3; e++) {
    b("stone", 10.2 + 0.35 * e, 0.22, 0.6, 0, -0.15 - 0.22 * e, 5.65 + 0.48 * e);
    b("gold", 10.2 + 0.35 * e, 0.025, 0.035, 0, -0.025 - 0.22 * e, 5.96 + 0.48 * e);
  }
  for (const e of [-12, -8.3, -4.5, 4.5, 8.3, 12]) {
    b("red", 0.42, 4.5, 0.42, e, 2.3, 5.1);
    b("stone", 0.65, 0.24, 0.65, e, 0.22, 5.1);
    for (const s of [0.42, 4.2]) b("gold", 0.45, 0.09, 0.45, e, s, 5.1);
    b("wood", 0.8, 0.2, 0.85, e, 4.49, 5.25);
    b("red", 1.18, 0.17, 1.02, e, 4.69, 5.35);
    b("wood", 1.55, 0.13, 1.18, e, 4.85, 5.45);
  }
  b("red", 25.2, 0.28, 0.45, 0, 4.25, 5.1);
  b("gold", 25.2, 0.045, 0.04, 0, 4.42, 5.34);
  for (const e of [-1, 1]) {
    b("wood", 0.28, 4.06, 0.7, 4.27 * e, 2.15, 5.3);
    b("wood", 0.48, 3.5, 0.3, 4.88 * e, 2.15, 4.98);
    const s = 8.5 * e;
    for (const k of [-1, 1]) {
      b("wood", 7, 0.16, 0.2, s, 2.15 + 1.75 * k, 4.93);
      b("wood", 0.14, 3.5, 0.2, s + 3.43 * k, 2.15, 4.93);
    }
    for (let k = -5; k <= 5; k++) b("wood", 0.055, 3.3, 0.12, s + 0.56 * k, 2.15, 5.02);
    for (const y of [1.05, 2.15, 3.25]) b("wood", 6.7, 0.06, 0.12, s, y, 5.02);
    b("red", 7, 0.3, 0.18, s, 0.48, 5.04);
  }
  parts.roof.push(roofShape(28.5, 1.15, 3.1, 5.05, 3.05));
  parts.wood.push(roofShape(28.5, 1.15, 0.15, 4.87, 6.1));
  parts.gold.push(roofShape(28.6, 1.15, 0.045, 5.02, 6.25));
  parts.roof.push(roofShape(10.8, 1.65, 2.4, 5.45, 4.2));
  parts.wood.push(roofShape(10.8, 1.65, 0.14, 5.25, 6.55));
  parts.gold.push(roofShape(10.86, 1.65, 0.05, 5.43, 6.7));
  for (let e = -13; e <= 13; e++) b("wood", 0.11, 0.14, 1.4, e, 4.91, 5.65);
  for (const e of [-5.25, 5.25])
    for (let s = 0; s < 8; s++) {
      const a = (s * Math.PI) / 4;
      b("gold", 0.018, 0.75, 0.018, e + 0.29 * Math.sin(a), 3.2, 5.85 + 0.29 * Math.cos(a));
    }
  const geo = Object.fromEntries(Object.entries(parts).map(([k, list]) => [k, mergeNonIndexed(list)]));

  const lantern = (x) =>
    group(
      { position: [x, 3.2, 5.85] },
      mesh(box(0.035, 0.6, 0.035), std({ color: "#685332" }), { position: [0, 0.66, 0] }),
      mesh(cyl(0.26, 0.3, 0.72, 12), std({ color: "#ffe0a4", emissive: "#ffb553", emissiveIntensity: 0.7, roughness: 0.85 })),
      [-0.4, 0.4].map((y) => mesh(cyl(0.34, 0.34, 0.08, 12), std({ color: "#745635", metalness: 0.3, roughness: 0.6 }), { position: [0, y, 0] })),
      pointLight([0, 0, 0], "#ffd39a", 18, 9, 2),
    );

  const g = group(
    { position: [0, 6.2, -34], name: "Cedar and vermilion temple exterior" },
    mesh(geo.wood, pbrMaterial("wood_planks_dirt", [2, 1], "#e6b581"), { cast: true, receive: true }),
    mesh(geo.red, std({ color: "#a3432e", roughness: 0.67 }), { cast: true, receive: true }),
    mesh(geo.gold, std({ color: "#bca06a", metalness: 0.48, roughness: 0.48 })),
    mesh(geo.roof, std({ color: "#414e50", roughness: 0.75 }), { cast: true, receive: true }),
    mesh(geo.stone, std({ color: "#a5a38e", roughness: 0.94 }), { receive: true }),
    [-8.5, 8.5].map((x) =>
      mesh(new THREE.PlaneGeometry(6.85, 3.45), std({ color: "#ead9b3", emissive: "#ffd39a", emissiveIntensity: 0.38, roughness: 0.95 }), {
        position: [x, 2.15, 4.82],
      }),
    ),
    [-5.25, 5.25].map(lantern),
    pointLight([0, 4.3, 9.2], "#ffe1b6", 65, 15, 2),
    buildEntrance(ctx),
  );
  ctx.frame.push(() => {
    g.visible = journey.travel < 0.52;
  });
  return g;
}

/* ----------------------------- stone lanterns ------------------------------ */

let lanternGeometry = null;
function stoneLantern(position, scale) {
  if (!lanternGeometry) {
    const profile = [
      [0, 1.3], [0.18, 1.25], [0.22, 1.05], [0.48, 0.88], [0.95, 0.68], [1.12, 0.78], [0.98, 0.52], [0.38, 0.54], [0, 0.54],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const parts = [
      cyl(0.82, 0.98, 0.24, 8).translate(0, 0.12, 0),
      cyl(0.26, 0.35, 1.15, 8).translate(0, 0.88, 0),
      box(1.12, 0.2, 1.12).translate(0, 1.5, 0),
      new THREE.LatheGeometry(profile, 24).translate(0, 1.68, 0),
      new THREE.SphereGeometry(0.16, 12, 10).translate(0, 3.08, 0),
    ];
    for (const e of [-1, 1]) for (const s of [-1, 1]) parts.push(box(0.16, 0.68, 0.16).translate(0.4 * e, 1.86, 0.4 * s));
    lanternGeometry = mergeGeometries(parts, false);
    parts.forEach((p) => p.dispose());
  }
  return group(
    { position, scale, name: "Japanese Stone Lantern" },
    mesh(lanternGeometry, std({ color: "#38403d", roughness: 0.9 }), { cast: true, receive: true }),
    mesh(box(0.7, 0.6, 0.7), std({ color: "#ffb042", roughness: 0.3 }), { position: [0, 1.86, 0] }),
    pointLight([0, 1.86, 0], "#ffa638", 3, 7),
  );
}

/* ---------------------------- long mossy stairs ---------------------------- */

let stairTextures = null;
function mossyStoneTextures() {
  if (stairTextures) return stairTextures;
  const mapCanvas = document.createElement("canvas");
  mapCanvas.width = mapCanvas.height = 512;
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = bumpCanvas.height = 512;
  const t = mapCanvas.getContext("2d");
  const a = bumpCanvas.getContext("2d");
  t.fillStyle = "#585e5b";
  t.fillRect(0, 0, 512, 512);
  a.fillStyle = "#808080";
  a.fillRect(0, 0, 512, 512);
  const r = t.getImageData(0, 0, 512, 512);
  const o = r.data;
  const n = a.getImageData(0, 0, 512, 512);
  const i = n.data;
  const rnd = lcg(1337);
  for (let y = 0; y < 512; y++)
    for (let x = 0; x < 512; x++) {
      const s = (512 * y + x) * 4;
      const u = x / 512;
      const v = y / 512;
      const noise = 0.4 * Math.sin(18 * u + 14 * v) + 0.2 * Math.cos(32 * u - 28 * v) + (0.12 * Math.sin(64 * u + 52 * v) + (rnd() - 0.5) * 0.08);
      const moss =
        0.45 * Math.sin(8.2 * u + 1.5 * Math.cos(9.4 * v)) +
        0.45 * Math.cos(7.8 * v + 1.2 * Math.sin(11.2 * u)) +
        0.25 * Math.sin(22 * u + 18 * v) +
        (rnd() - 0.5) * 0.15;
      let d = 88 + 26 * noise;
      let hh = 94 + 26 * noise;
      let uu = 91 + 26 * noise;
      let m = 130 + 45 * noise;
      if (moss > 0.2) {
        const e = Math.min(1, (moss - 0.2) * 2.2);
        const tr = 48 + (rnd() - 0.5) * 8;
        const sg = 74 + 28 * e + (rnd() - 0.5) * 10;
        const ab = 44 + (rnd() - 0.5) * 8;
        d = d * (1 - e) + tr * e;
        hh = hh * (1 - e) + sg * e;
        uu = uu * (1 - e) + ab * e;
        m += 30 * e;
      }
      o[s] = Math.min(255, Math.max(0, d));
      o[s + 1] = Math.min(255, Math.max(0, hh));
      o[s + 2] = Math.min(255, Math.max(0, uu));
      o[s + 3] = 255;
      i[s] = i[s + 1] = i[s + 2] = Math.min(255, Math.max(0, m));
      i[s + 3] = 255;
    }
  t.putImageData(r, 0, 0);
  a.putImageData(n, 0, 0);
  const map = new THREE.CanvasTexture(mapCanvas);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.colorSpace = THREE.SRGBColorSpace;
  const bump = new THREE.CanvasTexture(bumpCanvas);
  bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
  stairTextures = { map, bump };
  return stairTextures;
}

function buildStairs() {
  const { map, bump } = mossyStoneTextures();
  const steps = [];
  const depth = Math.abs(-20) / 32;
  for (let s = 0; s < 32; s++) {
    const z = -8 - (s + 0.5) * depth;
    const y = (s + 0.5) * 0.19375;
    steps.push(box(14.6, 0.19375, 1.1 * depth).translate(0, y, z));
    const nose = cyl(0.045, 0.045, 14.6, 8);
    nose.rotateZ(Math.PI / 2);
    nose.translate(0, y + 0.096875, z + 0.5 * depth);
    steps.push(nose);
  }
  const stepGeo = mergeGeometries(steps);
  steps.forEach((g) => g.dispose());
  const tilt = Math.atan2(6.2, Math.abs(-20));
  const length = Math.hypot(6.2, Math.abs(-20)) + 0.8;
  const walls = [-1, 1].map((s) => box(0.45, 0.24, length).rotateX(tilt).translate(7.6499999999999995 * s, 3.22, -18));
  const wallGeo = mergeGeometries(walls, false);
  walls.forEach((g) => g.dispose());
  return group(
    { name: "Long Mossy Stone Stairs" },
    mesh(stepGeo, std({ map, bumpMap: bump, bumpScale: 0.05, roughness: 0.88 }), { cast: true, receive: true }),
    mesh(wallGeo, std({ map, bumpMap: bump, bumpScale: 0.04, roughness: 0.92, color: "#2f3934" }), { cast: true, receive: true }),
  );
}

/* ---------------- approach water, stepping stones, courtyard -------------- */

let pavingTextures = null;
function pavingTexture() {
  if (pavingTextures) return pavingTextures;
  const mapCanvas = document.createElement("canvas");
  mapCanvas.width = mapCanvas.height = 512;
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = bumpCanvas.height = 512;
  const t = mapCanvas.getContext("2d");
  const a = bumpCanvas.getContext("2d");
  t.fillStyle = "#6b7270";
  t.fillRect(0, 0, 512, 512);
  a.fillStyle = "#808080";
  a.fillRect(0, 0, 512, 512);
  for (let e = 0; e < 4; e++)
    for (let s = 0; s < 4; s++) {
      const x = 128 * s;
      const y = 128 * e;
      const n = ((7 * e + 11 * s) % 5) * 4 - 8;
      t.fillStyle = `rgb(${108 + n}, ${115 + n}, ${112 + n})`;
      t.fillRect(x + 3, y + 3, 122, 122);
      a.fillStyle = `rgb(${135 + n}, ${135 + n}, ${135 + n})`;
      a.fillRect(x + 3, y + 3, 122, 122);
    }
  t.strokeStyle = "#2b302e";
  t.lineWidth = 6;
  a.strokeStyle = "#202020";
  a.lineWidth = 6;
  for (let e = 0; e <= 4; e++) {
    for (const c of [t, a]) {
      c.beginPath();
      c.moveTo(128 * e, 0);
      c.lineTo(128 * e, 512);
      c.stroke();
      c.beginPath();
      c.moveTo(0, 128 * e);
      c.lineTo(512, 128 * e);
      c.stroke();
    }
  }
  const img = t.getImageData(0, 0, 512, 512);
  const d = img.data;
  const rnd = lcg(999);
  for (let e = 0; e < d.length; e += 4) {
    const n = (rnd() - 0.5) * 16;
    d[e] = Math.min(255, Math.max(0, d[e] + n));
    d[e + 1] = Math.min(255, Math.max(0, d[e + 1] + n));
    d[e + 2] = Math.min(255, Math.max(0, d[e + 2] + n));
  }
  t.putImageData(img, 0, 0);
  const map = new THREE.CanvasTexture(mapCanvas);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(6, 6);
  map.colorSpace = THREE.SRGBColorSpace;
  const bump = new THREE.CanvasTexture(bumpCanvas);
  bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
  bump.repeat.set(6, 6);
  pavingTextures = { map, bump };
  return pavingTextures;
}

function buildCourtyard() {
  const { map, bump } = pavingTexture();
  const stones = [];
  for (let t = 24; t >= 2.2; t -= 2.2) {
    const s = Math.round((24 - t) / 2.2);
    const x = 0.32 * Math.sin(0.9 * s);
    const rot = 0.25 * Math.sin(1.7 * s);
    const sc = 1 + 0.1 * Math.sin(2.3 * s);
    stones.push({ pos: [x, 0.04, t], scale: [sc, 1, 0.9 * sc], rot });
  }
  const curbs = [
    box(0.35, 0.16, 10.2).translate(-5.3, 0.08, -3),
    box(0.35, 0.16, 10.2).translate(5.3, 0.08, -3),
    box(3.2, 0.16, 0.35).translate(-3.6, 0.08, 2.1),
    box(3.2, 0.16, 0.35).translate(3.6, 0.08, 2.1),
  ];
  const curbGeo = mergeGeometries(curbs, false);
  curbs.forEach((g) => g.dispose());
  const outer = [
    box(0.6, 0.5, 37).translate(-21, 0.2, 10),
    box(0.6, 0.5, 37).translate(21, 0.2, 10),
    box(15.6, 0.6, 0.6).translate(-13.2, 0.25, -8.1),
    box(15.6, 0.6, 0.6).translate(13.2, 0.25, -8.1),
  ];
  const outerGeo = mergeGeometries(outer, false);
  outer.forEach((g) => g.dispose());
  const stoneTop = std({ color: "#424b48", roughness: 0.3, metalness: 0.15 });
  const ring = new THREE.MeshBasicMaterial({ color: "#d4af37" });
  return group(
    { name: "Approach Water, Stepping Stones & Paved Courtyard" },
    stoneLantern([-3.8, 0.05, 23.5], 0.88),
    stoneLantern([3.8, 0.05, 23.5], 0.88),
    stones.map((s, i) =>
      group(
        { position: s.pos, rotation: [0, s.rot, 0], scale: s.scale },
        mesh(cyl(1.35, 1.5, 0.24, 24), std({ color: i % 2 === 0 ? "#383e3c" : "#2f3533", roughness: 0.45 }), { cast: true, receive: true }),
        mesh(new THREE.CircleGeometry(1.32, 24), stoneTop, { position: [0, 0.125, 0], rotation: [-Math.PI / 2, 0, 0] }),
        i % 4 === 0 && mesh(new THREE.RingGeometry(0.35, 0.39, 16), ring, { position: [0, 0.13, 0], rotation: [-Math.PI / 2, 0, 0.8 * i] }),
      ),
    ),
    mesh(curbGeo, std({ color: "#3a403d", roughness: 0.85 }), { cast: true, receive: true }),
    mesh(outerGeo, std({ color: "#323835", roughness: 0.9 }), { cast: true, receive: true }),
    mesh(box(10.6, 0.34, 10.2), std({ color: "#2d3330", roughness: 0.9 }), { position: [0, -0.18, -3], receive: true }),
    mesh(new THREE.PlaneGeometry(10.4, 10.2), std({ map, bumpMap: bump, bumpScale: 0.03, roughness: 0.78 }), {
      position: [0, 0.025, -3],
      rotation: [-Math.PI / 2, 0, 0],
      receive: true,
    }),
  );
}

/* ------------------------------ snowy terrain ------------------------------ */

let snowTextures = null;
function snowTexture() {
  if (snowTextures) return snowTextures;
  const mapCanvas = document.createElement("canvas");
  mapCanvas.width = mapCanvas.height = 512;
  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = bumpCanvas.height = 512;
  const t = mapCanvas.getContext("2d");
  const a = bumpCanvas.getContext("2d");
  const r = t.createImageData(512, 512);
  const o = r.data;
  const n = a.createImageData(512, 512);
  const i = n.data;
  const rnd = lcg(54321);
  for (let y = 0; y < 512; y++)
    for (let x = 0; x < 512; x++) {
      const s = (512 * y + x) * 4;
      const w =
        0.35 * Math.sin(0.035 * x + 1.5 * Math.cos(0.02 * y)) +
        0.35 * Math.cos(0.04 * y + 1.2 * Math.sin(0.025 * x)) +
        0.15 * Math.sin((x + y) * 0.06);
      const jitter = (rnd() - 0.5) * 14;
      const sparkle = 18 * (rnd() > 0.985);
      const l = (w + 0.85) * 0.55;
      o[s] = Math.min(255, Math.max(220, 242 * l + jitter + sparkle));
      o[s + 1] = Math.min(255, Math.max(228, 248 * l + jitter + sparkle));
      o[s + 2] = Math.min(255, Math.max(235, 255 * l + jitter + sparkle));
      o[s + 3] = 255;
      const m = Math.min(255, Math.max(80, 190 + 55 * w + 0.6 * jitter));
      i[s] = i[s + 1] = i[s + 2] = m;
      i[s + 3] = 255;
    }
  t.putImageData(r, 0, 0);
  a.putImageData(n, 0, 0);
  const map = new THREE.CanvasTexture(mapCanvas);
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(12, 12);
  map.colorSpace = THREE.SRGBColorSpace;
  const bump = new THREE.CanvasTexture(bumpCanvas);
  bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
  bump.repeat.set(12, 12);
  snowTextures = { map, bump };
  return snowTextures;
}

function buildTerrain() {
  const { map, bump } = snowTexture();
  const geo = new THREE.PlaneGeometry(96, 70, 64, 48);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i) - 9;
    pos.setZ(i, z);
    const ax = Math.abs(x);
    let y = terrainHeight(x, z);
    if (ax <= 20.7 && z >= 2.05 && z <= 26.5) y = -0.55;
    else if (ax > 20.7 && ax < 23 && z >= 2.05 && z <= 26.5) {
      const e = (ax - 20.7) / (23 - 20.7);
      y = THREE.MathUtils.lerp(-0.55, 0.12 + Math.max(0, (ax - 7.5) * 0.1), e);
    } else if (ax < 6.8 && z > -8.2 && z < 2.05) y = -0.42;
    else if (ax >= 6.8 && ax < 8.8 && z > -8.2 && z < 2.05) {
      const e = (ax - 6.8) / (8.8 - 6.8);
      y = THREE.MathUtils.lerp(-0.42, 0.12 + Math.max(0, (ax - 7.5) * 0.1), e);
    } else if (ax < 7.5 && z >= -28.2 && z <= -8.2) y = Math.min(y, ((-z - 8) / 20) * 6 - 0.35);
    else if (ax < 12.5 && z <= -28.2) y = 5.3;
    if (ax >= 12.5 && (z < 2.05 || ax > 22)) y += 0.25 * Math.sin(0.2 * x + 0.15 * z) + 0.15 * Math.cos(0.3 * x);
    else if (ax >= 7.5 && z > -28.2 && (z < 2.05 || ax > 22)) y += 0.2 * Math.sin(0.2 * x + 0.15 * z) + 0.12 * Math.cos(0.3 * x);
    pos.setY(i, y);
  }
  geo.computeVertexNormals();
  return mesh(geo, std({ map, bumpMap: bump, bumpScale: 0.08, roughness: 0.78, metalness: 0.04, color: "#f2f7fb" }), { receive: true });
}

function buildTempleComplex(ctx) {
  const exterior = group(
    { name: "Exterior-Entrance-Elements" },
    buildCourtyard(),
    buildCherryTree([-9.6, terrainHeight(-9.6, -4.5) - 0.38, -4.5], 1.25, [0, 0.65, 0]),
    buildCherryTree([9.6, terrainHeight(9.6, -4.5) - 0.38, -4.5], 1.25, [0, -0.55, 0]),
    buildStairs(),
  );
  ctx.frame.push(() => {
    exterior.visible = journey.travel < 0.52;
  });
  return group({ name: "Tranquil Japanese Temple Complex" }, exterior, buildTerrain(), buildTemple(ctx));
}

/* ---------------------------------- mist ---------------------------------- */

const MIST_FRAG = `
  uniform float uTime; varying vec2 vUv;
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
  void main(){
    vec2 p=vUv*vec2(11.,3.);p.x-=uTime*.025;
    float n=noise(p)*.6+noise(p*2.1+uTime*.018)*.3+noise(p*4.2)*.1;
    float edges=sin(vUv.x*3.14159)*pow(sin(vUv.y*3.14159),2.);
    gl_FragColor=vec4(.31,.37,.37,n*edges*.23);
  }
`;
const BASIC_VERT = "varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}";

function buildMist(ctx, position) {
  const uniforms = { uTime: { value: 0 } };
  const m = mesh(
    new THREE.PlaneGeometry(64, 5),
    new THREE.ShaderMaterial({ uniforms, vertexShader: BASIC_VERT, fragmentShader: MIST_FRAG, transparent: true, depthWrite: false }),
    { position, name: "Ground mist" },
  );
  ctx.frame.push(({ elapsed }) => {
    uniforms.uTime.value = elapsed;
  });
  return m;
}

/* ----------------------------- tatami & table ------------------------------ */

function buildTatami() {
  const wood = pbrMaterial("wood_planks_dirt", [1, 1], "#514638");
  const mat = canvasTexture(
    512,
    512,
    (t) => {
      t.fillStyle = "#8e8769";
      t.fillRect(0, 0, 512, 512);
      for (let e = 0; e < 512; e += 3) {
        t.fillStyle = e % 2 ? "#9e9472" : "#736f57";
        t.fillRect(0, e, 512, 1);
        for (let s = (e % 9) * 3; s < 512; s += 19) {
          t.fillStyle = "#6f6b542a";
          t.fillRect(s, e, 1, 3);
        }
      }
      t.strokeStyle = "#3d483b";
      t.lineWidth = 12;
      t.strokeRect(0, 0, 512, 512);
    },
    { srgb: true, anisotropy: 4 },
  );
  const tableParts = [box(2.7, 0.13, 0.8).translate(0, 0.55, 0)];
  for (const x of [-1.1, 1.1]) tableParts.push(box(0.16, 0.5, 0.65).translate(x, 0.25, 0));
  const tableGeo = mergeGeometries(tableParts);
  tableParts.forEach((g) => g.dispose());
  const vase = new THREE.LatheGeometry(
    [[0, 0], [0.28, 0], [0.43, 0.25], [0.4, 0.58], [0.16, 0.87], [0.14, 1], [0.18, 1.02]].map(([x, y]) => new THREE.Vector2(x, y)),
    28,
  );
  const tatamiMat = std({ map: mat, roughness: 0.98 });
  const tiles = [];
  for (const e of [-1, 0, 1])
    for (const s of [-1, 0, 1])
      tiles.push(
        mesh(new THREE.PlaneGeometry(2.04, 2.04), tatamiMat, {
          position: [2.07 * e, 0.012, 2.07 * s],
          rotation: [-Math.PI / 2, 0, (e + s) % 2 ? Math.PI / 2 : 0],
          receive: true,
        }),
      );
  return group(
    { position: [0, 6.39, -39] },
    tiles,
    group(
      { position: [0, 0, -7.1] },
      mesh(tableGeo, wood, { cast: true, receive: true }),
      mesh(vase, std({ color: "#4b5850", roughness: 0.43, metalness: 0.04 }), { position: [0.82, 0.63, 0], scale: 0.6, cast: true }),
      mesh(new THREE.CircleGeometry(0.21, 28), std({ color: "#252c25", roughness: 0.5, side: THREE.DoubleSide }), {
        position: [-0.45, 0.69, 0],
        rotation: [-Math.PI / 2, 0, 0],
      }),
    ),
  );
}

/* ------------------------ the seven-door sanctuary ------------------------ */

const DOOR_SPAN = 2 * RY * Math.tan(Math.PI / DOORS.length);
const WALL_WIDTH = DOOR_SPAN / 2 - 3.7;
const facesEntrance = (i) => Math.cos(doorAngle(i)) < -0.8;

function sweepingRoof(width, depth, y) {
  const s = new THREE.Shape();
  s.moveTo(-width / 2, 0);
  s.bezierCurveTo(-(0.35 * width), -0.15, -(0.13 * width), 2.1, 0, 3.15);
  s.bezierCurveTo(0.13 * width, 2.1, 0.35 * width, -0.15, width / 2, 0);
  s.lineTo(width / 2, -0.22);
  s.bezierCurveTo(0.3 * width, -0.35, 0.1 * width, 1.85, 0, 2.88);
  s.bezierCurveTo(-(0.1 * width), 1.85, -(0.3 * width), -0.35, -width / 2, -0.22);
  s.closePath();
  return new THREE.ExtrudeGeometry(s, {
    depth,
    steps: 1,
    bevelEnabled: true,
    bevelSize: 0.035,
    bevelThickness: 0.035,
    bevelSegments: 2,
    curveSegments: 20,
  }).translate(0, y, -depth / 2);
}

function doorLabel(title, subtitle) {
  return canvasTexture(
    1024,
    256,
    (r) => {
      r.clearRect(0, 0, 1024, 256);
      r.textAlign = "center";
      r.fillStyle = "#f8ebd2";
      r.shadowColor = "rgba(235, 195, 110, 0.75)";
      r.shadowBlur = 18;
      r.font = "bold 64px Cinzel, Georgia, serif";
      r.fillText(title, 512, 108);
      r.shadowBlur = 3;
      r.shadowColor = "rgba(0, 0, 0, 0.65)";
      r.font = '600 22px "Plus Jakarta Sans", sans-serif';
      r.fillStyle = "#caa972";
      r.fillText(subtitle, 512, 168);
    },
    { srgb: true },
  );
}

let latticeGeometry = null;
function buildDoor(ctx, index, timber) {
  if (!latticeGeometry) {
    const bars = [];
    for (let t = 0; t < 5; t++) bars.push(box(0.042, 4.3, 0.05).translate(-1.26 + 0.63 * t, 2.47, 0.11));
    for (let t = 0; t < 9; t++) bars.push(box(3.12, 0.04, 0.05).translate(0, 0.39 + 0.52 * t, 0.11));
    latticeGeometry = mergeNonIndexed(bars);
  }
  const info = DOORS[index];
  const label = doorLabel(info.title, info.subtitle);
  ctx.labels.push({ texture: label, info });
  const paper = std({ color: "#c7b894", roughness: 0.96, emissive: "#72512d", emissiveIntensity: 0.12 });
  const handle = std({ color: "#81734d", metalness: 0.72, roughness: 0.5 });
  const leaves = [-1, 1].map((e) =>
    group(
      { position: [1.72 * e, 0, 0] },
      mesh(box(3.44, 4.65, 0.12), timber, { position: [0, 2.43, 0], cast: true, receive: true }),
      mesh(new THREE.PlaneGeometry(3.13, 4.31), paper, { position: [0, 2.47, 0.072] }),
      mesh(latticeGeometry, timber),
      mesh(latticeGeometry, timber, { rotation: [0, Math.PI, 0] }),
      mesh(new THREE.TorusGeometry(0.065, 0.017, 5, 16), handle, { position: [-(1.38 * e), 1.9, 0.12], rotation: [Math.PI / 2, 0, 0] }),
    ),
  );
  const inner = group(
    { position: [0, 0, -RY] },
    [-1, 1].map((e) => mesh(new THREE.PlaneGeometry(WALL_WIDTH, 5.6), timber, { position: [e * (3.7 + WALL_WIDTH / 2), 2.8, 0], receive: true })),
    mesh(new THREE.PlaneGeometry(7.4, 0.8), timber, { position: [0, 5.2, -0.1], receive: true }),
    info.id !== "contact" ? mesh(new THREE.PlaneGeometry(7.25, 4.65), new THREE.MeshBasicMaterial({ color: "#050807" }), { position: [0, 2.45, -0.17] }) : null,
    leaves,
    mesh(
      new THREE.PlaneGeometry(5.4, 1.35),
      new THREE.MeshBasicMaterial({ map: label, transparent: true, depthWrite: false, toneMapped: false }),
      { position: [0, 5.04, 0.26] },
    ),
    mesh(new THREE.PlaneGeometry(6.9, 2.2), std({ color: "#8e805e", roughness: 0.94 }), { position: [0, 0.02, 1.2], rotation: [-Math.PI / 2, 0, 0] }),
  );
  const outer = group({ rotation: [0, doorAngle(index), 0] }, inner);
  outer.visible = !facesEntrance(index);
  ctx.frame.push(() => {
    outer.visible = !facesEntrance(index) || journey.travel >= 0.48;
    const t = Math.max(
      info.id === "contact" ? smoothstep(journey.travel, ROOM_LEAVE, 0.965) : 0,
      journey.openDoor === index ? journey.doorAmount : 0,
    );
    leaves[0].position.x = -1.72 - 3.8 * t;
    leaves[1].position.x = 1.72 + 3.8 * t;
  });
  ctx.interactive.push({
    object: inner,
    enabled: () => journey.travel > 0.48,
    onClick: () => journey.travel > 0.48 && ctx.onDoor(info.id),
  });
  return outer;
}

function buildRoom(ctx) {
  const timber = pbrMaterial("wood_planks_dirt", [1, 2], "#78604c");
  const rock = pbrMaterial("mossy_rock", [6, 3], "#434b4a");
  const floor = pbrMaterial("wood_planks_dirt", [6, 6], "#b8a588");
  const wood = [];
  const approach = [];
  const stone = [];
  const tiles = [];
  const b = (w, h, d, x, y, z) => box(w, h, d).translate(x, y, z);
  stone.push(b(24, 0.6, 24, 0, -0.42, 0));
  wood.push(b(22, 0.18, 22, 0, -0.02, 0));
  for (const x of [-10, 10]) for (const z of [-10, 10]) wood.push(b(0.6, 6.5, 0.6, x, 3.25, z));
  for (let s = 0; s < DOORS.length; s++) {
    const a = doorAngle(s);
    const pieces = [];
    for (const e of [-3.7, 3.7]) pieces.push(b(0.35, 5.9, 0.45, e, 2.95, -RY));
    pieces.push(b(DOOR_SPAN, 0.33, 0.5, 0, 5.4, -RY));
    pieces.push(b(DOOR_SPAN, 0.18, 0.4, 0, 0.12, -RY));
    pieces.push(b(DOOR_SPAN, 0.18, 0.4, 0, 4.7, -RY));
    for (let e = 0; e < 16; e++) pieces.push(b(0.045, 0.62, 0.13, -3.5 + 0.47 * e, 5, -RY));
    pieces.forEach((p) => (facesEntrance(s) ? approach : wood).push(p.rotateY(a)));
  }
  for (let t = -5; t <= 5; t++) {
    wood.push(b(0.16, 0.24, 23, 2 * t, 5.9, 0));
    wood.push(b(23, 0.24, 0.16, 0, 5.94, 2 * t));
    for (const s of [-1, 1]) wood.push(b(0.18, 0.24, 2.7, 2 * t, 5.55, 11 * s));
  }
  tiles.push(sweepingRoof(27, 26, 5.7));
  tiles.push(sweepingRoof(12, 4, 5.6).translate(0, 0, 12));
  for (let e = -24; e <= 24; e++)
    tiles.push(
      cyl(0.048, 0.048, 25.8, 5)
        .rotateX(Math.PI / 2)
        .translate(0.52 * e, 5.72 + 3.12 * Math.pow(1 - Math.abs(0.52 * e) / 13.5, 1.7), 0),
    );
  wood.push(b(1.1, 0.35, 26.5, 0, 8.88, 0));
  for (let t = -5; t <= 5; t++) wood.push(b(0.12, 1.05, 0.12, 1.75 * t, 0.52, -11));
  wood.push(b(18, 0.14, 0.22, 0, 1.1, -11));
  wood.push(b(18, 0.09, 0.16, 0, 0.35, -11));

  const approachMesh = mesh(mergeNonIndexed(approach), timber, { cast: true, receive: true });
  approachMesh.visible = false;
  ctx.frame.push(() => {
    approachMesh.visible = journey.travel >= 0.48;
  });

  const lanternMat = std({ color: "#edd5a1", emissive: "#ffbd68", emissiveIntensity: 0.65, roughness: 0.8 });
  const ribMat = std({ color: "#8b7047", roughness: 0.8 });
  const cordMat = std({ color: "#161914" });
  const paperLantern = (position) =>
    group(
      { position },
      mesh(new THREE.SphereGeometry(0.43, 20, 12), lanternMat),
      Array.from({ length: 9 }, (_, t) => {
        const y = (t - 4) * 0.085;
        return mesh(new THREE.TorusGeometry(Math.sqrt(0.43 * 0.43 - y * y), 0.006, 4, 32), ribMat, { position: [0, y, 0], rotation: [Math.PI / 2, 0, 0] });
      }),
      mesh(cyl(0.012, 0.012, 1.1, 5), cordMat, { position: [0, 0.7, 0] }),
    );

  return group(
    { position: [0, ROOM_FLOOR, ROOM_Z], name: "The sanctuary with seven labelled destination doors" },
    mesh(mergeNonIndexed(stone), rock, { receive: true }),
    approachMesh,
    mesh(mergeNonIndexed(wood), timber, { cast: true, receive: true }),
    mesh(mergeNonIndexed(tiles), rock, { cast: true, receive: true }),
    mesh(new THREE.CircleGeometry(11, DOORS.length), floor, { position: [0, 0.08, 0], rotation: [-Math.PI / 2, 0, 0], receive: true }),
    DOORS.map((_, i) => buildDoor(ctx, i, timber)),
    mesh(new THREE.PlaneGeometry(20, 20), std({ color: "#342719", side: THREE.DoubleSide, roughness: 0.98 }), {
      position: [0, 5.6, 0],
      rotation: [-Math.PI / 2, 0, 0],
    }),
    [
      [-2.1, 5.4, -2.1],
      [2.1, 5.4, -2.1],
      [-2.1, 5.4, 2.1],
      [2.1, 5.4, 2.1],
    ].map(paperLantern),
    pointLight([0, 3, 0], "#ffc57b", 90, 18),
    pointLight([0, 3, 10], "#ffca8c", 90, 25),
  );
}

/* --------------------------- hidden waterfall ------------------------------ */

const FALLS_TARGET = new THREE.Vector3(0, 12.28, -81);
const WATERFALL_FRAG = `uniform float uTime;varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
void main(){vec2 p=vUv*vec2(19.,3.);p.y+=uTime*1.4;float n=noise(p)*.6+noise(p*3.7)*.3+noise(p*11.)*.1;float edge=smoothstep(0.,.18,vUv.x)*smoothstep(1.,.82,vUv.x);float ends=smoothstep(0.,.09,vUv.y)*smoothstep(1.,.93,vUv.y);gl_FragColor=vec4(mix(vec3(.32,.43,.45),vec3(.8,.88,.83),n),edge*ends*(.15+n*.52));}`;

function coverScale(camera, target, v) {
  const a = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / camera.zoom;
  let r = 0;
  for (const o of [-1, 1])
    for (const n of [-1, 1]) {
      v.set(o * a * camera.aspect, n * a, -1).applyQuaternion(camera.quaternion);
      const i = (target.z - camera.position.z) / v.z;
      if (!Number.isFinite(i) || i <= 0) continue;
      r = Math.max(r, Math.abs(camera.position.x + v.x * i - target.x) / 33, Math.abs(camera.position.y + v.y * i - target.y) / 18.4);
    }
  return Math.max(1, 1.03 * r);
}

function buildWaterfall(ctx) {
  const map = texture(ASSETS.waterfall);
  map.colorSpace = THREE.SRGBColorSpace;
  const uniforms = { uTime: { value: 0 } };
  const inner = group(
    { position: [0, 6, -19] },
    mesh(new THREE.PlaneGeometry(66, 36.8), new THREE.MeshBasicMaterial({ map, color: "#acb8b8", toneMapped: false })),
    mesh(
      new THREE.PlaneGeometry(3.5, 18),
      new THREE.ShaderMaterial({ uniforms, vertexShader: BASIC_VERT, fragmentShader: WATERFALL_FRAG, transparent: true, depthWrite: false }),
      { position: [9.35, -1, 0.2] },
    ),
  );
  const outer = group({ position: [0, 6.28, -62], name: "Hidden waterfall garden" }, inner);
  const v = new THREE.Vector3();
  ctx.frame.push(({ elapsed, camera }) => {
    outer.visible = journey.travel > 0.9;
    if (journey.travel > 0.9) inner.scale.setScalar(coverScale(camera, FALLS_TARGET, v));
    uniforms.uTime.value = elapsed;
  });
  return outer;
}

/* ------------------------------ atmosphere -------------------------------- */

function buildAtmosphere(ctx) {
  const count = TIERS.A.atmosphere;
  const seeds = Array.from({ length: count }, (_, t) => ({
    x: 20 * Math.sin(78.23 * t),
    y: 1 + ((1.37 * t) % 16),
    z: 20 - ((3.17 * t) % 80),
  }));
  const motes = new THREE.InstancedMesh(
    new THREE.SphereGeometry(1, 5, 4),
    new THREE.MeshBasicMaterial({ color: "#d3b675", transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }),
    count,
  );
  motes.frustumCulled = false;
  const dummy = new THREE.Object3D();
  ctx.frame.push(({ elapsed }) => {
    motes.count = TIERS[ctx.tier].atmosphere;
    for (let r = 0; r < motes.count; r++) {
      const e = seeds[r];
      dummy.position.set(e.x + 0.5 * Math.sin(0.18 * elapsed + r), e.y + 0.4 * Math.sin(0.3 * elapsed + r), e.z);
      dummy.scale.setScalar(0.012 + (Math.sin(0.8 * elapsed + r) + 1) * 0.012);
      dummy.updateMatrix();
      motes.setMatrixAt(r, dummy.matrix);
    }
    motes.instanceMatrix.needsUpdate = true;
    motes.visible = journey.travel < 0.5 || journey.travel > 0.94;
  });
  return motes;
}

/* -------------------------------- cedars ---------------------------------- */

function rendererName(gl) {
  try {
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    return String(gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || "");
  } catch {
    return "";
  }
}

function detectHardware(renderer) {
  const ua = navigator.userAgent || "";
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua);
  const coarse = window.matchMedia?.("(pointer: coarse)").matches && window.innerWidth < 1024;
  const isMobile = mobile || coarse;
  let dedicated = false;
  try {
    const name = rendererName(renderer.getContext()).toLowerCase();
    const big = /nvidia|geforce|rtx|gtx|quadro|titan|radeon|rx\s?\d|amd\s|apple\s?m[1-9]\s?(pro|max|ultra)/i.test(name);
    const small = /intel|uhd|iris|hd graphics|mali|adreno|powervr|apple\s?gpu|swiftshader|llvmpipe|software|basic render/i.test(name);
    dedicated = big && !small;
  } catch {}
  const medium = isMobile || !dedicated;
  return { lodLevel: medium ? "Medium" : "High", tessellationEnabled: !medium, sssEnabled: !medium };
}

function cedarInstances() {
  const list = [];
  const rnd = lcg(77);
  const place = (spots, tilt, spread) => {
    for (const t of spots) {
      const rx = (rnd() - 0.5) * tilt;
      const ry = rnd() * Math.PI * 2;
      const rz = (rnd() - 0.5) * tilt;
      const x = t.x + (rnd() - 0.5) * spread;
      const z = t.z + (rnd() - 0.5) * spread;
      list.push({ position: [x, terrainHeight(x, z) - 0.45, z], rotation: [rx, ry, rz], scale: t.s + (tilt === 0.05 ? 0.1 : 0.08) * rnd() });
    }
  };
  place(
    [
      { x: -13.5, z: -9.5, s: 0.72 }, { x: -16.5, z: -15, s: 0.82 }, { x: -14, z: -20.5, s: 0.78 }, { x: -17.5, z: -26, s: 0.85 },
      { x: 13.5, z: -9.5, s: 0.72 }, { x: 16.5, z: -15, s: 0.82 }, { x: 14, z: -20.5, s: 0.78 }, { x: 17.5, z: -26, s: 0.85 },
    ],
    0.04,
    1.2,
  );
  place(
    [
      { x: -18.5, z: -32.5, s: 0.95 }, { x: -22, z: -36, s: 1.15 }, { x: -25.5, z: -40.5, s: 1.22 },
      { x: 18.5, z: -32.5, s: 0.95 }, { x: 22, z: -36, s: 1.15 }, { x: 25.5, z: -40.5, s: 1.22 },
      { x: -21, z: -34, s: 1.2 }, { x: -27, z: -39, s: 1.28 }, { x: 21, z: -34, s: 1.2 }, { x: 27, z: -39, s: 1.28 },
    ],
    0.05,
    0.8,
  );
  place(
    [
      { x: -19, z: -2, s: 0.8 }, { x: -23, z: 6, s: 0.88 }, { x: -26, z: 15, s: 0.92 },
      { x: 19, z: -2, s: 0.8 }, { x: 23, z: 6, s: 0.88 }, { x: 26, z: 15, s: 0.92 },
    ],
    0.04,
    1.5,
  );
  return list;
}

function billboardSpots(count = 40) {
  const out = [];
  const rnd = lcg(108);
  for (let s = 0; s < count; s++) {
    const r = s % 2 === 0 ? -0.45 - (s / count) * 1.9 : 0.45 + (s / count) * 1.9;
    const o = 46 + 22 * rnd();
    const x = Math.sin(r) * o;
    const z = -34 - Math.cos(r) * o;
    const y = 9 + (o - 46) * 0.25 + 3.5 * rnd();
    const w = 13.5 + 2.5 * rnd();
    const h = 29 + 7 * rnd();
    out.push({ id: s, position: [x, y, z], size: [w, h] });
  }
  return out;
}

function buildForest(ctx) {
  const forest = group({ name: "HybridForestBackground" });
  const hardware = ctx.hardware;

  loadHDR()
    .then((tex) => {
      ctx.scene.background = tex;
      ctx.scene.environment = tex;
      ctx.scene.environmentIntensity = 0.88;
      journey.sceneRevision++;
    })
    .catch((err) => console.warn("Forest sky unavailable", err));

  const instances = cedarInstances();
  loadGLTF(ASSETS.cedar)
    .then((gltf) => {
      const nodes = {};
      gltf.scene.traverse((o) => {
        if (o.name && !(o.name in nodes)) nodes[o.name] = o;
      });
      const materials = {};
      gltf.scene.traverse((o) => {
        if (o.isMesh && o.material?.name) materials[o.material.name] = o.material;
      });
      const leafTex = texture(ASSETS.leaf);
      leafTex.colorSpace = THREE.SRGBColorSpace;
      leafTex.generateMipmaps = true;
      leafTex.minFilter = THREE.LinearMipmapLinearFilter;
      Object.values(materials).forEach((m) => {
        m.transparent = true;
        m.alphaTest = 0.5;
      });

      let trunk = null;
      const leaves = [];
      for (const [name, node] of Object.entries(nodes)) {
        if (!node?.isMesh || !node.geometry) continue;
        const mat = node.material;
        const isBark = mat?.name === "CL04_Bark01_su" || name === "MI_LOD1" || name.includes("Bark") || name.includes("Trunk");
        const isLeaf = mat?.name === "CL04_Leaf01_su" || name.includes("MI_LOD1_001") || name.includes("Leaf");
        if (isBark && !trunk) {
          trunk = node.geometry.clone();
          trunk.scale(0.01, 0.01, 0.01);
        } else if (isLeaf) {
          const g = node.geometry.clone();
          g.scale(0.01, 0.01, 0.01);
          const q = node.quaternion;
          if (q && (q.x !== 0 || q.y !== 0 || q.z !== 0 || q.w !== 1)) g.applyQuaternion(q);
          leaves.push(g);
        }
      }
      if (!trunk) trunk = new THREE.CylinderGeometry(0.3, 0.6, 26, 8);
      let leafGeo = leaves.length > 1 ? mergeGeometries(leaves, false) : leaves[0] ?? new THREE.ConeGeometry(3.5, 22, 7);
      if (leaves.length > 1) leaves.forEach((g) => g.dispose());
      trunk.computeBoundingBox();
      if (trunk.boundingBox) {
        const minY = trunk.boundingBox.min.y;
        const seated = Math.abs(minY + 2.986) < 1 || (trunk.boundingBox.max.y > 20 && minY > -6);
        const lift = minY + 3.85 * (seated ? 1 : 0);
        const cx = (trunk.boundingBox.min.x + trunk.boundingBox.max.x) / 2;
        const cz = (trunk.boundingBox.min.z + trunk.boundingBox.max.z) / 2;
        trunk.translate(-cx, -lift, -cz);
        leafGeo.translate(-cx, -lift, -cz);
      }

      const barkSrc = materials.CL04_Bark01_su;
      const bark = barkSrc ? barkSrc.clone() : std({ color: "#382b20", roughness: 0.85 });
      bark.roughness = 0.88;
      bark.metalness = 0.04;
      bark.depthWrite = true;
      if (bark.map) {
        bark.map.generateMipmaps = true;
        bark.map.minFilter = THREE.LinearMipmapLinearFilter;
      }
      const barkUniforms = {
        uCameraDist: { value: 20 },
        uTessMultiplier: { value: 1 },
        uTessellationEnabled: { value: hardware.tessellationEnabled ? 1 : 0 },
        uDisplacementScale: { value: 0.16 },
      };
      bark.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, barkUniforms);
        shader.vertexShader = `uniform float uCameraDist;\nuniform float uTessMultiplier;\nuniform float uTessellationEnabled;\nuniform float uDisplacementScale;\n${shader.vertexShader}`.replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
          #ifdef USE_INSTANCING
            vec4 worldPos = instanceMatrix * vec4(transformed, 1.0);
          #else
            vec4 worldPos = modelMatrix * vec4(transformed, 1.0);
          #endif
          float distToCam = distance(cameraPosition, worldPos.xyz);
          float tessFactor = clamp(1.0 - (distToCam - 1.0) / 4.0, 0.0, 1.0) * uTessellationEnabled;
          float barkWave = sin(worldPos.y * 14.0 + sin(worldPos.x * 8.0) * 1.5);
          float barkRidge = pow(max(0.0, barkWave), 2.2);
          transformed += normal * (barkRidge * uDisplacementScale * tessFactor);`,
        );
      };
      bark.customProgramCacheKey = () => "moosa-cedar-bark";

      const leafSrc = materials.CL04_Leaf01_su;
      const leaf = leafSrc ? leafSrc.clone() : std({ color: "#254231", roughness: 0.65 });
      if (!leaf.map) leaf.map = leafTex;
      leaf.side = THREE.DoubleSide;
      leaf.transparent = true;
      leaf.alphaTest = 0.5;
      leaf.depthWrite = true;
      leaf.depthTest = true;
      leaf.color = new THREE.Color("#38563c");
      leaf.roughness = hardware.sssEnabled ? 0.58 : 0.85;
      leaf.needsUpdate = true;

      const trunks = new THREE.InstancedMesh(trunk, bark, instances.length);
      const crowns = new THREE.InstancedMesh(leafGeo, leaf, instances.length);
      const dummy = new THREE.Object3D();
      instances.forEach((inst, i) => {
        dummy.position.fromArray(inst.position);
        dummy.rotation.fromArray(inst.rotation);
        dummy.scale.setScalar(inst.scale);
        dummy.updateMatrix();
        trunks.setMatrixAt(i, dummy.matrix);
        crowns.setMatrixAt(i, dummy.matrix);
      });
      for (const m of [trunks, crowns]) {
        m.castShadow = true;
        m.receiveShadow = true;
        m.frustumCulled = false;
        m.instanceMatrix.needsUpdate = true;
      }
      forest.add(group({ name: "Cedar-HighFidelity-Forest" }, trunks, crowns));
      ctx.canvas.dataset.cedarModel = "loaded";
      ctx.canvas.dataset.cedarDetail = hardware.lodLevel;
      journey.sceneRevision++;

      let close = false;
      ctx.frame.push(({ camera }) => {
        const c = camera.position;
        let nearest = Infinity;
        for (const inst of instances) {
          const [x, y, z] = inst.position;
          nearest = Math.min(nearest, Math.hypot(c.x - x, c.y - y, c.z - z));
        }
        barkUniforms.uCameraDist.value = nearest;
        const isClose = nearest < 5;
        if (isClose !== close && bark.map) {
          close = isClose;
          bark.map.minFilter = isClose ? THREE.LinearMipmapLinearFilter : THREE.LinearMipmapNearestFilter;
          bark.map.anisotropy = isClose ? 16 : 2;
          bark.map.needsUpdate = true;
        }
      });
    })
    .catch((err) => console.warn("Cedar model unavailable", err));

  const billboardTex = texture(ASSETS.billboard);
  billboardTex.colorSpace = THREE.SRGBColorSpace;
  billboardTex.generateMipmaps = true;
  billboardTex.minFilter = THREE.LinearMipmapLinearFilter;
  const billboardMat = std({
    map: billboardTex,
    transparent: true,
    alphaTest: 0.35,
    roughness: 0.88,
    metalness: 0.05,
    depthWrite: true,
    color: "#d4ded8",
  });
  const spots = billboardSpots(40).slice(0, hardware.lodLevel === "Medium" ? 28 : 40);
  const boards = spots.map((s) => mesh(new THREE.PlaneGeometry(s.size[0], s.size[1]), billboardMat, { position: s.position }));
  forest.add(group({ name: "Forest-Billboards-Wall" }, boards));
  ctx.frame.push(({ camera }) => {
    for (const b of boards) b.quaternion.copy(camera.quaternion);
  });
  return forest;
}

/* ------------------------------ camera rig -------------------------------- */

const ROOM_LOOK = [-Math.sin(doorAngle(0)) * RY, 8.78, ROOM_Z - Math.cos(doorAngle(0)) * RY];
const KEYFRAMES = [
  { p: 0, eye: [1.4, 2.7, 24], look: [0, 4.4, -14] },
  { p: 0.18, eye: [0.2, 2.6, 5], look: [0, 5.4, -17] },
  { p: 0.25, eye: [0, 2.6, -2], look: [0, 5, -22] },
  { p: 0.28, eye: [0, 2.7, -6.5], look: [0, 5.6, -27] },
  { p: 0.4, eye: [0, 7.5, -23], look: [0, 8.8, -37] },
  { p: 0.52, eye: [0, 8.28, -36], look: ROOM_LOOK },
  { p: 0.56, eye: [0, 8.28, -39], look: ROOM_LOOK },
];

function createCameraRig(ctx) {
  const eye = new THREE.Vector3();
  const look = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  return () => {
    const { camera, pointer, size, paused } = ctx;
    const l = journey.travel;
    const portrait = size.width < size.height;
    const fov = portrait ? 58 : 48;
    if (camera.fov !== fov) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
    if (l < ROOM_START) {
      const i = Math.max(0, KEYFRAMES.findIndex((k) => k.p > l) - 1);
      const a = KEYFRAMES[i];
      const b = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)];
      const r = smoothstep(l, a.p, b.p);
      eye.fromArray(a.eye).lerp(tmp.fromArray(b.eye), r);
      look.fromArray(a.look).lerp(tmp.fromArray(b.look), r);
      if (portrait && l < 0.18) eye.z += 9 * (1 - l / 0.18);
    } else if (l < ROOM_LEAVE) {
      const a = journey.roomAngle;
      eye.set(0.32 * Math.sin(a), 8.28, ROOM_Z + 0.32 * Math.cos(a));
      look.set(-Math.sin(a) * RY, 8.78, ROOM_Z - Math.cos(a) * RY);
    } else {
      const e = smoothstep(l, ROOM_LEAVE, 1);
      eye.set(0, 8.28, -39 - 10.6 * e);
      look.set(4 * e, 9.38 + 2 * e, -60 - 15 * e);
    }
    if (!paused && l < 0.18) {
      eye.x += 0.09 * pointer.x;
      eye.y += 0.035 * pointer.y;
    }
    if (journey.doorAmount > 0) {
      const dir = tmp.copy(look).sub(eye).normalize();
      eye.addScaledVector(dir, 1.6 * journey.doorAmount);
    }
    camera.position.copy(eye);
    camera.lookAt(look);
  };
}

/* ------------------------------- the world -------------------------------- */

function initialTier(gl) {
  const name = rendererName(gl);
  const memory = navigator.deviceMemory ?? 8;
  const base =
    (navigator.hardwareConcurrency || 4) <= 2 || memory <= 2
      ? "C"
      : memory <= 4 || window.matchMedia("(pointer: coarse)").matches
        ? "B"
        : "A";
  if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(name) || base === "C") return "C";
  if (/nvidia|geforce|rtx|gtx|quadro|titan|radeon|rx\s?\d|amd\s|apple\s?m[1-9]\s?(pro|max|ultra)/i.test(name) && base === "A") return "A";
  return "B";
}

/**
 * Mounts the immersive world. Returns the `.world` element and a disposer.
 * Throws if WebGL is unavailable so the caller can show the painted fallback.
 */
export function createWorld({ paused = false, onReady, onFailure, onDoor, scrollTo }) {
  const element = document.createElement("div");
  element.className = "world forest-world";
  element.setAttribute("role", "img");
  element.setAttribute(
    "aria-label",
    "A cedar forest, stone stairs through a Torii, and a lantern-lit Japanese shrine with seven labelled destination doors.",
  );
  element.dataset.paused = String(paused);
  const wrap = document.createElement("div");
  wrap.style.cssText = "position: relative; width: 100%; height: 100%; overflow: hidden; pointer-events: auto;";
  const inner = document.createElement("div");
  inner.style.cssText = "width: 100%; height: 100%;";
  wrap.appendChild(inner);
  element.appendChild(wrap);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const canvas = renderer.domElement;
  canvas.dataset.engine = `three.js r${THREE.REVISION}`;
  inner.appendChild(canvas);

  const tier = initialTier(renderer.getContext());
  element.dataset.quality = tier;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#10191c");
  scene.fog = new THREE.FogExp2("#182428", 0.012);
  const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(1.4, 2.7, 24);

  const ctx = {
    tier,
    scene,
    camera,
    canvas,
    paused,
    frame: [],
    interactive: [],
    labels: [],
    pointer: new THREE.Vector2(),
    size: { width: window.innerWidth, height: window.innerHeight },
    reflection: null,
    hardware: detectHardware(renderer),
    onDoor: (id) => onDoor?.(id),
    scrollTo: (p) => scrollTo?.(p),
  };

  const applyTier = () => {
    const t = TIERS[ctx.tier];
    element.dataset.quality = ctx.tier;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, t.dpr));
    if (renderer.shadowMap.enabled !== t.shadows) {
      renderer.shadowMap.enabled = t.shadows;
      scene.traverse((o) => {
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => (m.needsUpdate = true));
      });
    }
    ctx.reflection?.setResolution(t.reflectionSize);
    journey.sceneRevision++;
  };

  // Lights
  scene.add(new THREE.HemisphereLight("#abbec8", "#2b3021", 0.6));
  const sun = new THREE.DirectionalLight("#d4e3ef", 1.5);
  sun.position.set(-14, 30, 8);
  sun.castShadow = TIERS[tier].shadows;
  sun.shadow.mapSize.set(tier === "A" ? 2048 : 1024, tier === "A" ? 2048 : 1024);
  Object.assign(sun.shadow.camera, { left: -35, right: 35, top: 35, bottom: -55, far: 150 });
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.bias = -15e-5;
  sun.shadow.normalBias = 0.03;
  scene.add(sun);
  const rim = new THREE.DirectionalLight("#e5be87", 0.8);
  rim.position.set(16, 12, -12);
  scene.add(rim);
  scene.add(pointLight([-4, 2, 2], "#ffc078", 30, 14));
  scene.add(pointLight([4, 5, -11], "#ffc078", 40, 15));

  // Forest, torii, temple — hidden once inside the sanctuary.
  const outdoors = group(
    {},
    buildForest(ctx),
    buildTempleComplex(ctx),
    group({ position: [0, 0, -5.5] }, buildTorii(), buildToriiCrest()),
    buildMist(ctx, [0, 1, 1]),
  );
  ctx.frame.push(() => {
    outdoors.visible = journey.travel < ROOM_START;
  });
  scene.add(outdoors, buildRoom(ctx), buildTatami(), buildWaterfall(ctx), buildAtmosphere(ctx), buildWater(ctx), buildMist(ctx, [0, 6, -15]));

  // Door labels use the site fonts; redraw them once the fonts are ready.
  Promise.all([document.fonts.load("bold 64px Cinzel"), document.fonts.load('600 22px "Plus Jakarta Sans"')])
    .then(() => {
      for (const { texture: tex, info } of ctx.labels) {
        const fresh = doorLabel(info.title, info.subtitle);
        tex.image = fresh.image;
        tex.needsUpdate = true;
        fresh.dispose();
      }
      journey.sceneRevision++;
    })
    .catch(() => {});

  // Sizing
  const resize = () => {
    ctx.size = { width: window.innerWidth, height: window.innerHeight };
    renderer.setSize(ctx.size.width, ctx.size.height);
    camera.aspect = ctx.size.width / ctx.size.height;
    camera.updateProjectionMatrix();
    journey.sceneRevision++;
  };
  applyTier();
  resize();
  window.addEventListener("resize", resize);

  // Pointer: parallax + raycast interaction with doors and the temple entrance.
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const hitTest = (e) => {
    const rect = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    let best = null;
    for (const item of ctx.interactive) {
      if (!item.enabled() || !isVisible(item.object)) continue;
      const hits = raycaster.intersectObject(item.object, true).filter((h) => isVisible(h.object));
      if (hits.length && (!best || hits[0].distance < best.distance)) best = { distance: hits[0].distance, item };
    }
    return best?.item ?? null;
  };
  const onMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    ctx.pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    if (e.pointerType === "mouse") canvas.style.cursor = hitTest(e) ? "pointer" : "";
  };
  const onClick = (e) => {
    const item = hitTest(e);
    if (item) item.onClick();
  };
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("click", onClick);

  const onLost = (e) => {
    e.preventDefault();
    onFailure?.("WebGL context lost");
  };
  canvas.addEventListener("webglcontextlost", onLost);

  // Optional bloom for top-tier GPUs, matching the original's postprocessing.
  let composer = null;
  if (tier === "A") {
    Promise.all([
      import("three/addons/postprocessing/EffectComposer.js"),
      import("three/addons/postprocessing/RenderPass.js"),
      import("three/addons/postprocessing/UnrealBloomPass.js"),
      import("three/addons/postprocessing/OutputPass.js"),
    ])
      .then(([{ EffectComposer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }]) => {
        if (disposed || ctx.tier !== "A") return;
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(new UnrealBloomPass(new THREE.Vector2(ctx.size.width, ctx.size.height), 0.28, 0.4, 1));
        composer.addPass(new OutputPass());
        composer.setPixelRatio(renderer.getPixelRatio());
        composer.setSize(ctx.size.width, ctx.size.height);
      })
      .catch(() => {});
  }

  // Frame-rate watchdog: step down a quality tier when the scene struggles.
  const perf = { last: performance.now(), frames: 0, samples: [] };
  const monitor = () => {
    perf.frames++;
    const now = performance.now();
    if (now - perf.last < 250) return;
    perf.samples.push((perf.frames * 1000) / (now - perf.last));
    perf.frames = 0;
    perf.last = now;
    if (perf.samples.length < 10) return;
    const low = perf.samples.filter((f) => f < 35).length;
    perf.samples.length = 0;
    if (low >= 8 && ctx.tier !== "C") {
      ctx.tier = ctx.tier === "A" ? "B" : "C";
      composer?.dispose?.();
      composer = null;
      applyTier();
    }
  };

  const cameraRig = createCameraRig(ctx);
  let elapsed = 0;
  let first = true;
  let disposed = false;
  let lastState = "";
  const stop = onFrame((_, dt) => {
    if (disposed || document.hidden || !journey.visible || journey.inVoid) return;
    const state = `${journey.sceneRevision}|${journey.travel}|${journey.doorAmount}|${journey.stage}|${journey.finale}|${journey.roomAngle}`;
    if (paused && !first && state === lastState) return;
    if (!paused && !first) elapsed += Math.min(dt, 50) / 1000;
    lastState = state;
    cameraRig();
    camera.updateMatrixWorld();
    const frameState = { elapsed, camera };
    for (const fn of ctx.frame) fn(frameState);
    ctx.reflection?.render(renderer, scene, camera);
    if (composer) composer.render();
    else renderer.render(scene, camera);
    if (!paused) monitor();
    if (first) {
      first = false;
      onReady?.();
    }
  }, 10);

  function dispose() {
    disposed = true;
    stop();
    window.removeEventListener("resize", resize);
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("click", onClick);
    canvas.removeEventListener("webglcontextlost", onLost);
    composer?.dispose?.();
    ctx.reflection?.dispose();
    scene.traverse((o) => {
      if (o.geometry && o.geometry !== lanternGeometry && o.geometry !== latticeGeometry) o.geometry.dispose?.();
      const mats = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
      for (const m of mats) m.dispose?.();
    });
    renderer.dispose();
    renderer.forceContextLoss?.();
    element.remove();
  }

  return { element, dispose };
}

function isVisible(obj) {
  for (let o = obj; o; o = o.parent) if (!o.visible) return false;
  return true;
}

export { FALLS_START };
