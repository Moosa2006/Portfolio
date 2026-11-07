import { h, fromHTML } from "../core/dom.js";
import { destinationShell } from "../ui/common.js";

export const title = "Interface & Architecture Showcase · Moosa";

const SHOWCASE_ITEMS = [
  {
    title: "Civora — Municipal Issue Resolution & GIS Dashboard",
    category: "Civic & Enterprise Tech",
    edition: "Production Web App",
    alt: "Civora enterprise civic reporting platform UI, real-time map telemetry, and municipal admin panel",
  },
  {
    title: "PRAMAAN — Proof-Backed Credential Verification",
    category: "Verification & Talent",
    edition: "Production Web App",
    alt: "PRAMAAN cryptographic credential verification and tamper-evident audit records",
  },
  {
    title: "DailyTrack — Habit Tracker & Analytics Suite",
    category: "Productivity & Social",
    edition: "Production Web App",
    alt: "DailyTrack real-time habit tracking, sub-50ms WebSocket synchronization, and streak heatmap",
  },
  {
    title: "SkillGap — Role Competency & Tech Talent Engine",
    category: "Career & EdTech",
    edition: "Production Web App",
    alt: "SkillGap AI-powered tech talent analytics and syllabus-to-industry competency mapping",
  },
  {
    title: "BitNBuild International Hackathon Arena",
    category: "Competitive Arena",
    edition: "Thapar University Finale",
    alt: "BitNBuild International Hackathon stage and arena sprint at Thapar University",
  },
  {
    title: "Zinnovatio 4.0 Hackathon Finale Arena",
    category: "Competitive Arena",
    edition: "Chandigarh University",
    alt: "Zinnovatio 4.0 national hackathon grand finale venue at Chandigarh University",
  },
  {
    title: "LeetCode Algorithmic Milestone — 141+ Problems",
    category: "Algorithmic Practice",
    edition: "C++ & Python DSA",
    alt: "LeetCode official stats: 141 problems solved across Easy, Medium (75), and Hard (10)",
  },
  {
    title: "LeetCode Consistency — 143 Active Days & 113 Streak",
    category: "Algorithmic Practice",
    edition: "Problem Solving Rigor",
    alt: "LeetCode verified activity: 143 total active days with a continuous 113-day streak",
  },
  {
    title: "LeetCode Verified Badges — 50 & 100 Days 2026",
    category: "Algorithmic Practice",
    edition: "Platform Honours",
    alt: "LeetCode official badges: 50 Days Badge 2026 and 100 Days Badge 2026",
  },
  {
    title: "GNDEC Ludhiana — Academic & Engineering Hub",
    category: "Campus Leadership",
    edition: "B.Tech IT (8+ GPA)",
    alt: "Guru Nanak Dev Engineering College campus landmark and undergraduate academic foundation",
  },
  {
    title: "LeetCode Profile Dashboard — Moosa_ENG",
    category: "Algorithmic Practice",
    edition: "Live Platform Profile",
    alt: "Official LeetCode profile dashboard showing Moosa_ENG, GNDEC, 100 Days Badge, and submissions",
  },
  {
    title: "Century Club Milestone — 100 Problems Solved",
    category: "Algorithmic Practice",
    edition: "Milestone Record",
    alt: "Celebrating 100 problems solved milestone and 50 Days badge on personal workstation",
  },
  {
    title: "DSA Progress Matrix — 110 Problems Solved",
    category: "Algorithmic Practice",
    edition: "Progress Tracking",
    alt: "DSA progress tracker: 78 Easy, 27 Medium, and 5 Hard algorithmic challenges",
  },
  {
    title: "IBM SkillsBuild — Large Language Models",
    category: "AI & System Engineering",
    edition: "Industry Certification",
    alt: "IBM SkillsBuild certification: Introduction to Large Language Models course module",
  },
  {
    title: "Striver's A2Z DSA — Hashing, Maps & C++ Rigor",
    category: "Algorithmic Practice",
    edition: "Deep Practice Session",
    alt: "Studying time complexity, hashing, and division rules with handwritten C++ algorithm notes",
  },
  {
    title: "TakeUForward DSA Sheet — Binary Search & Arrays",
    category: "Algorithmic Practice",
    edition: "Curriculum Tracker",
    alt: "Mastering TakeUForward A2Z DSA sheet: subintervals, inversions, and binary search",
  },
  {
    title: "Late-Night Problem Solving — 12:53 AM Math Rigor",
    category: "Engineering Discipline",
    edition: "Late-Night Sprint",
    alt: "Solving eigenvalues, characteristic equations, and algorithm analysis late into the night",
  },
  {
    title: "Consistency Heatmap — Active Coding Cadence",
    category: "Algorithmic Practice",
    edition: "Execution Discipline",
    alt: "Close-up of continuous daily submissions heatmap and coding consistency",
  },
  {
    title: "Developer Workstation & Philosophy Wall",
    category: "System Engineering",
    edition: "Engineering Rig",
    alt: "Personal workstation with Socrates philosophy backdrop and development setup",
  },
  {
    title: "Development Environment — Asus Vivobook Workspace",
    category: "System Engineering",
    edition: "Hardware & OS Rig",
    alt: "Dual-monitor developer workspace configured for full-stack engineering and Linux automation",
  },
  {
    title: "Interactive 3D Sanctuary Architecture",
    category: "WebGL & Three.js",
    edition: "Portfolio Systems",
    alt: "Custom Three.js 3D rendering pipeline, procedural shaders, and seven-door portal hub",
  },
];

const PHOTOS = Array.from({ length: 21 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  const item = SHOWCASE_ITEMS[i] || SHOWCASE_ITEMS[0];
  return {
    id: `showcase-${n}`,
    title: item.title,
    category: item.category,
    edition: item.edition,
    image: `/photos/archive/archive-${n}-thumb.webp`,
    fullImage: `/photos/archive/archive-${n}.webp`,
    alt: item.alt,
  };
});

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const wrapDeg = (v) => ((((v + 180) % 360) + 360) % 360) - 180;

// Image that swaps to the festival crest when a photograph fails to load.
function safeImg({ src, alt, style = "", ...rest }) {
  const img = h("img", { ...rest, src, alt });
  if (style) img.style.cssText = style;
  const fail = () => {
    img.src = "/art/forest-stairs.webp";
    img.alt = "Interface showcase image";
    Object.assign(img.style, { objectFit: "cover", background: "#0e141e" });
    img.removeEventListener("error", fail);
  };
  img.addEventListener("error", fail);
  return img;
}

const scroller = () => document.querySelector(".fullscreen-page-scroll");

const SPHERE_CSS = `
    .sphere-root {
      --radius: 560px;
      --circ: calc(var(--radius) * 3.14159);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .sphere-photo-card { transform-style: preserve-3d; }

    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }

    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }

    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 300ms;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2))))
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2))))
                 translateZ(var(--radius));
    }

    .sphere-photo-card {
      position: absolute;
      inset: 8px;
      border-radius: var(--tile-radius, 22px);
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 250ms ease,
                  box-shadow 250ms ease;
      pointer-events: auto;
      transform: translateZ(0);
      background: #0d0816;
      border: 1.2px solid rgba(255, 255, 255, 0.09);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.65);
    }

    .sphere-photo-card:hover {
      border-color: #ffd778;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.85), 0 0 22px rgba(245, 215, 142, 0.6);
      transform: translateZ(12px) scale(1.06);
    }
  `;

const NOISE =
  'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=")';

/* ---------------- Dome photo sphere ---------------- */

function photoSphere(scope, onSelect) {
  const opts = { fit: 0.52, minRadius: 380, maxRadius: 780, blur: "#07030e", maxTilt: 8, sensitivity: 22, segments: 35, dampening: 2, tileRadius: "22px" };

  // Tile layout: 35 columns, alternating rows offset by one, photos never repeating back-to-back.
  const cols = Array.from({ length: opts.segments }, (_, i) => -37 + 2 * i);
  const tiles = cols.flatMap((x, i) => (i % 2 === 0 ? [-4, -2, 0, 2, 4] : [-3, -1, 1, 3, 5]).map((y) => ({ x, y, sizeX: 2, sizeY: 2 })));
  const order = Array.from({ length: tiles.length }, (_, i) => PHOTOS[i % PHOTOS.length]);
  for (let i = 1; i < order.length; i++) {
    if (order[i].id !== order[i - 1].id) continue;
    for (let j = i + 1; j < order.length; j++) {
      if (order[j].id !== order[i].id) {
        [order[i], order[j]] = [order[j], order[i]];
        break;
      }
    }
  }

  const rot = { x: 0, y: 0 };
  let start = { x: 0, y: 0 };
  let origin = null;
  let dragging = false;
  let moved = false;
  let pointerType = "mouse";
  let lastDragEnd = 0;
  let hovering = false;
  let inertiaRaf = 0;
  let idleRaf = 0;
  let samples = [];

  const world = h("div", { className: "sphere photo-sphere-world" });
  const apply = (x, y) => {
    world.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg)`;
  };

  tiles.forEach((t, i) => {
    const photo = order[i];
    const card = h(
      "div",
      {
        className: "sphere-photo-card item__image",
        role: "button",
        tabIndex: 0,
        "aria-label": `View ${photo.title} (${photo.edition})`,
        onClick: () => {
          if (dragging || moved || performance.now() - lastDragEnd < 80) return;
          onSelect(photo);
        },
        onKeydown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(photo);
          }
        },
      },
      safeImg({ src: photo.image, alt: photo.alt, loading: "lazy", draggable: false }),
    );
    world.append(
      h(
        "div",
        {
          className: "sphere-item absolute m-auto",
          "data-offset-x": t.x,
          "data-offset-y": t.y,
          "data-size-x": t.sizeX,
          "data-size-y": t.sizeY,
          style: { "--offset-x": t.x, "--offset-y": t.y, "--item-size-x": t.sizeX, "--item-size-y": t.sizeY, top: "-999px", bottom: "-999px", left: "-999px", right: "-999px" },
        },
        card,
      ),
    );
  });

  const stopInertia = () => {
    cancelAnimationFrame(inertiaRaf);
    inertiaRaf = 0;
  };
  const inertia = (vx, vy) => {
    let sx = 80 * clamp(vx, -1.4, 1.4);
    let sy = 80 * clamp(vy, -1.4, 1.4);
    let frames = 0;
    const d = clamp(opts.dampening ?? 0.6, 0, 1);
    const decay = 0.94 + 0.055 * d;
    const floor = 0.015 - 0.01 * d;
    const maxFrames = Math.round(90 + 270 * d);
    const step = () => {
      sx *= decay;
      sy *= decay;
      if ((Math.abs(sx) < floor && Math.abs(sy) < floor) || ++frames > maxFrames) {
        inertiaRaf = 0;
        return;
      }
      rot.x = clamp(rot.x - sy / 200, -opts.maxTilt, opts.maxTilt);
      rot.y = wrapDeg(rot.y + sx / 200);
      apply(rot.x, rot.y);
      inertiaRaf = requestAnimationFrame(step);
    };
    stopInertia();
    inertiaRaf = requestAnimationFrame(step);
  };

  // Slow idle spin while untouched and not hovered.
  const idle = () => {
    if (!dragging && !inertiaRaf && !hovering) {
      rot.y = wrapDeg(rot.y + 0.05);
      apply(rot.x, rot.y);
    }
    idleRaf = requestAnimationFrame(idle);
  };
  idleRaf = requestAnimationFrame(idle);
  scope.add(() => {
    cancelAnimationFrame(idleRaf);
    stopInertia();
  });

  const viewport = h(
    "main",
    {
      className: "photo-sphere-viewport absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent",
      style: { touchAction: "none", WebkitUserSelect: "none", cursor: "grab" },
      onMouseenter: () => (hovering = true),
      onMouseleave: () => (hovering = false),
    },
    h("div", { className: "stage" }, world),
    h("div", { className: "absolute inset-0 m-auto z-[3] pointer-events-none", style: { backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${opts.blur}) 100%)` } }),
    h("div", {
      className: "absolute inset-0 m-auto z-[3] pointer-events-none",
      style: {
        WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${opts.blur}) 90%)`,
        maskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${opts.blur}) 90%)`,
        backdropFilter: "blur(3px)",
      },
    }),
    h("div", { className: "absolute left-0 right-0 top-0 h-[140px] z-[5] pointer-events-none rotate-180", style: { background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${opts.blur}))` } }),
    h("div", { className: "absolute left-0 right-0 bottom-0 h-[140px] z-[5] pointer-events-none", style: { background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${opts.blur}))` } }),
  );

  scope.on(viewport, "pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    stopInertia();
    pointerType = e.pointerType || "mouse";
    dragging = true;
    moved = false;
    start = { ...rot };
    origin = { x: e.clientX, y: e.clientY };
    samples = [{ x: e.clientX, y: e.clientY, t: e.timeStamp }];
  });
  scope.on(window, "pointermove", (e) => {
    if (!dragging || !origin) return;
    const dx = e.clientX - origin.x;
    const dy = e.clientY - origin.y;
    if (!moved && dx * dx + dy * dy > 16) moved = true;
    rot.x = clamp(start.x - dy / opts.sensitivity, -opts.maxTilt, opts.maxTilt);
    rot.y = start.y + dx / opts.sensitivity;
    apply(rot.x, rot.y);
    samples.push({ x: e.clientX, y: e.clientY, t: e.timeStamp });
    if (samples.length > 6) samples.shift();
  });
  const end = (e) => {
    if (!dragging || !origin) return;
    dragging = false;
    const dx = e.clientX - origin.x;
    const dy = e.clientY - origin.y;
    const tap = dx * dx + dy * dy <= (pointerType === "touch" ? 100 : 36);
    // Release velocity in px/ms, like the gesture library the original uses.
    const first = samples[0];
    const span = Math.max(1, e.timeStamp - first.t);
    let vx = (e.clientX - first.x) / span;
    let vy = (e.clientY - first.y) / span;
    if (!tap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001) {
      vx = (dx / opts.sensitivity) * 0.02;
      vy = (dy / opts.sensitivity) * 0.02;
    }
    if (!tap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) inertia(vx, vy);
    origin = null;
    if (moved) lastDragEnd = performance.now();
    if (!tap) setTimeout(() => (moved = false), 120);
    else moved = false;
  };
  scope.on(window, "pointerup", end);
  scope.on(window, "pointercancel", end);

  const root = h(
    "div",
    { className: "sphere-root relative w-full h-full", style: { "--segments-x": opts.segments, "--segments-y": opts.segments, "--overlay-blur-color": opts.blur, "--tile-radius": opts.tileRadius } },
    viewport,
  );
  const ro = new ResizeObserver(([entry]) => {
    const w = Math.max(1, entry.contentRect.width);
    const hh = Math.max(1, entry.contentRect.height);
    const basis = w / hh >= 1.3 ? w : Math.min(w, hh);
    const radius = Math.round(clamp(Math.min(basis * opts.fit, 1.35 * hh), opts.minRadius, opts.maxRadius));
    root.style.setProperty("--radius", `${radius}px`);
    root.style.setProperty("--overlay-blur-color", opts.blur);
    root.style.setProperty("--tile-radius", opts.tileRadius);
    apply(rot.x, rot.y);
  });
  ro.observe(root);
  scope.add(() => ro.disconnect());
  apply(rot.x, rot.y);

  const toCylinder = () => document.getElementById("cylinder-section")?.scrollIntoView({ behavior: "smooth" });

  return h(
    "section",
    { id: "sphere-section", className: "photo-sphere-section relative w-full h-screen min-h-[700px] overflow-hidden select-none", "aria-label": "3D Interactive Dome Photo Gallery" },
    h("div", { className: "absolute inset-0 opacity-10 pointer-events-none z-[1]", style: { backgroundImage: NOISE } }),
    h("div", { className: "absolute inset-0 pointer-events-none z-0", style: { background: "radial-gradient(circle at 50% 50%, rgba(68, 20, 110, 0.35) 0%, rgba(20, 7, 36, 0.22) 48%, #07030e 85%)" } }),
    h(
      "div",
      {
        className: "absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none select-none",
        style: { width: "90%", maxWidth: "700px" },
      },
      h(
        "div",
        {
          style: {
            display: "inline-block",
            padding: "4px 14px",
            borderRadius: "999px",
            background: "rgba(201, 154, 58, 0.15)",
            border: "1px solid rgba(201, 154, 58, 0.4)",
            color: "#f5d78e",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "8px",
          },
        },
        "INTERFACE & ARCHITECTURE SHOWCASE",
      ),
      h("h1", { style: { fontSize: "clamp(20px, 3.5vw, 30px)", color: "#efe4cd", fontWeight: "700", margin: "0 0 6px" } }, "Interactive Dome Showcase"),
      h("p", { style: { fontSize: "13px", color: "rgba(239, 228, 205, 0.75)", margin: "0" } }, "Drag to rotate the 3D sphere · Click any panel to view high-resolution interface screens"),
    ),
    root,
    h(
      "div",
      {
        className: "sphere-explore-more absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer transition-transform hover:translate-y-1",
        role: "button",
        tabIndex: 0,
        "aria-label": "Scroll down to panorama cylinder",
        onClick: toCylinder,
        onKeydown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toCylinder();
          }
        },
      },
      h("span", { className: "text-xs font-mono tracking-widest text-[#f5efe6]/75 uppercase" }, "EXPLORE MORE"),
      fromHTML('<svg class="w-5 h-5 animate-bounce text-[#ffd778]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>'),
    ),
  );
}

/* ---------------- Cylinder panorama ---------------- */

function photoCylinder(scope, onSelect) {
  const panels = Array.from({ length: 20 }, (_, i) => ({ index: i, photo: PHOTOS[i % PHOTOS.length] }));
  const step = 360 / panels.length;
  let size = { w: 165, h: 260 };
  let current = 0;
  let target = 0;
  let velocity = 0;
  let down = false;
  let dragging = false;
  let scrolling = false;
  let startPt = { x: 0, y: 0 };
  let lastX = 0;
  let travelled = 0;
  let raf = 0;

  const ring = h("div", { className: "photo-cylinder-ring" });
  const nodes = panels.map(({ index, photo }) => {
    const el = h(
      "div",
      {
        className: "cylinder-photo-panel ",
        role: "button",
        tabIndex: 0,
        "aria-label": `Preview ${photo.title} (${photo.edition})`,
        onMouseenter: () => el.classList.add("panel-hovered"),
        onMouseleave: () => el.classList.remove("panel-hovered"),
        onClick: (e) => {
          e.stopPropagation();
          if (!(travelled > 8)) onSelect(photo);
        },
        onKeydown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(photo);
          }
        },
      },
      h(
        "div",
        { className: "cylinder-panel-media" },
        safeImg({ src: photo.image, alt: photo.alt, loading: "lazy", draggable: false }),
        h("div", { className: "cylinder-panel-meta" }, h("span", { className: "cylinder-panel-edition" }, photo.edition), h("span", { className: "cylinder-panel-title" }, photo.title)),
      ),
    );
    ring.append(el);
    return { el, index };
  });

  const layout = () => {
    const w = innerWidth;
    size = w < 480 ? { w: 125, h: 190 } : w < 768 ? { w: 140, h: 220 } : w < 1100 ? { w: 155, h: 245 } : { w: 168, h: 265 };
    const radius = Math.round(size.w / 2 / Math.tan((step / 2) * (Math.PI / 180))) + 12;
    for (const { el, index } of nodes) {
      Object.assign(el.style, {
        width: `${size.w}px`,
        height: `${size.h}px`,
        marginLeft: `-${size.w / 2}px`,
        marginTop: `-${size.h / 2}px`,
        transform: `rotateY(${index * step}deg) translateZ(${radius}px)`,
      });
    }
  };
  layout();
  scope.on(window, "resize", layout);

  const tick = () => {
    if (!dragging && Math.abs(velocity) > 0.01) {
      target += velocity;
      velocity *= 0.94;
    }
    current += (target - current) * 0.12;
    ring.style.transform = `rotateY(${current}deg)`;
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  scope.add(() => cancelAnimationFrame(raf));

  const release = () => {
    down = dragging = scrolling = false;
  };
  scope.on(window, "pointerup", release);
  scope.on(window, "pointercancel", release);

  const viewport = h(
    "div",
    {
      className: "photo-cylinder-viewport",
      onPointerdown: (e) => {
        if (e.button !== 0 && e.pointerType === "mouse") return;
        down = true;
        dragging = scrolling = false;
        travelled = 0;
        startPt = { x: e.clientX, y: e.clientY };
        lastX = e.clientX;
        velocity = 0;
      },
      onPointermove: (e) => {
        if (!down || scrolling) return;
        const dx = e.clientX - startPt.x;
        const dy = e.clientY - startPt.y;
        if (e.pointerType === "touch" && !dragging && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) {
          scrolling = true;
          down = false;
          return;
        }
        if (!dragging) {
          if (!(Math.hypot(dx, dy) > 6)) return;
          dragging = true;
        }
        const delta = e.clientX - lastX;
        travelled += Math.abs(delta);
        const r = 0.28 * delta;
        target += r;
        current += r;
        velocity = 0.65 * r;
        lastX = e.clientX;
      },
      onPointerup: release,
      onPointercancel: release,
    },
    ring,
  );

  return h(
    "section",
    { id: "cylinder-section", className: "photo-cylinder-section", "aria-label": "3D Cylinder Photo Panorama" },
    h(
      "div",
      { className: "cylinder-instruction-header" },
      h("p", { className: "cylinder-instruction-title" }, "Interface & Architecture Panorama"),
      h("p", { className: "cylinder-instruction-subtitle" }, "(drag to spin the carousel · click any card to inspect in high resolution)"),
    ),
    viewport,
  );
}

/* ---------------- Lightbox ---------------- */

function lightbox(scope) {
  let el = null;
  let current = -1;
  let prevOverflow = "";
  const close = () => {
    if (!el) return;
    el.remove();
    el = null;
    current = -1;
    document.body.style.overflow = prevOverflow;
    window.removeEventListener("keydown", onKey);
  };
  const show = (index) => {
    current = (index + PHOTOS.length) % PHOTOS.length;
    const photo = PHOTOS[current];
    const stop = (fn) => (e) => {
      e.stopPropagation();
      fn();
    };
    const next = h(
      "div",
      { className: "gc-lightbox-backdrop pure-image-mode", role: "dialog", "aria-modal": "true", "aria-label": photo.title, onClick: close },
      h("button", { className: "gc-lightbox-floating-close", "aria-label": "Close preview", title: "Close", onClick: stop(close) }, "✕"),
      h("button", { className: "gc-lightbox-floating-nav prev", "aria-label": "Previous photograph", title: "Previous", onClick: stop(() => show(current - 1)) }, "‹"),
      h("div", { className: "gc-lightbox-image-container", onClick: close }, safeImg({ src: photo.fullImage || photo.image, alt: photo.alt, loading: "eager", draggable: false, className: "gc-lightbox-pure-img" })),
      h("button", { className: "gc-lightbox-floating-nav next", "aria-label": "Next photograph", title: "Next", onClick: stop(() => show(current + 1)) }, "›"),
    );
    if (el) el.replaceWith(next);
    else {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
      document.body.append(next);
    }
    el = next;
  };
  function onKey(e) {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  }
  scope.add(close);
  return (photo) => show(PHOTOS.findIndex((p) => p.id === photo.id));
}

/* ---------------- Side scrollbar ---------------- */

function sideScrollbar(scope) {
  let dragging = false;
  const sphereNode = h(
    "button",
    {
      type: "button",
      className: "scroller-section-node active",
      title: "Scroll to Photo Sphere",
      "aria-label": "Scroll to 3D Photo Sphere",
      onClick: (e) => {
        e.stopPropagation();
        scroller()?.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    h("span", { className: "scroller-node-dot" }),
    h("span", { className: "scroller-node-label" }, "3D DOME"),
  );
  const panoramaNode = h(
    "button",
    {
      type: "button",
      className: "scroller-section-node ",
      title: "Scroll to Photo Cylinder",
      "aria-label": "Scroll to 3D Photo Cylinder",
      onClick: (e) => {
        e.stopPropagation();
        document.getElementById("cylinder-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    },
    h("span", { className: "scroller-node-dot" }),
    h("span", { className: "scroller-node-label" }, "CAROUSEL"),
  );
  const thumb = h("div", { className: "scroller-thumb", style: { top: "0%" } }, h("div", { className: "scroller-thumb-handle" }));
  const seek = (clientY) => {
    const r = track.getBoundingClientRect();
    const p = clamp((clientY - r.top) / r.height, 0, 1);
    const s = scroller();
    if (s) s.scrollTop = p * (s.scrollHeight - s.clientHeight);
  };
  const stopDrag = (e) => {
    dragging = false;
    aside.classList.remove("dragging");
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };
  const track = h(
    "div",
    {
      className: "scroller-track",
      onPointerdown: (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragging = true;
        aside.classList.add("dragging");
        e.currentTarget.setPointerCapture(e.pointerId);
        seek(e.clientY);
      },
      onPointermove: (e) => {
        if (!dragging) return;
        e.preventDefault();
        e.stopPropagation();
        seek(e.clientY);
      },
      onPointerup: stopDrag,
      onPointercancel: stopDrag,
    },
    h("div", { className: "scroller-track-line" }),
    thumb,
  );
  const aside = h("aside", { className: "gallery-side-scrollbar ", "aria-label": "Gallery page mobile navigation scrollbar" }, sphereNode, track, panoramaNode);

  const sync = () => {
    const s = scroller();
    if (!s) return;
    const max = s.scrollHeight - s.clientHeight;
    const p = max <= 0 ? 0 : clamp(s.scrollTop / max, 0, 1);
    thumb.style.top = `${100 * p}%`;
    sphereNode.classList.toggle("active", p < 0.4);
    panoramaNode.classList.toggle("active", p >= 0.4);
  };
  requestAnimationFrame(() => {
    const s = scroller();
    if (!s) return;
    sync();
    scope.on(s, "scroll", sync, { passive: true });
    scope.on(window, "resize", sync);
  });
  return aside;
}

export default function gallery({ scope, path }) {
  const open = lightbox(scope);
  const content = h(
    "div",
    { className: "gallery-experience-container" },
    sideScrollbar(scope),
    h("style", { html: SPHERE_CSS }),
    photoSphere(scope, open),
    photoCylinder(scope, open),
  );
  return destinationShell(scope, { pathname: path, mainClass: "fullscreen-page-overlay destination-page destination-page-gallery", content });
}
