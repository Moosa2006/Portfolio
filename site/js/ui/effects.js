import { h } from "../core/dom.js";

/** Katana slash + ink particles on every click (the home sanctuary only). */
export function initClickFx(scope) {
  const layer = h("div", { className: "click-fx-layer", "aria-hidden": "true" });
  const slashes = [];
  let particles = [];
  let raf = 0;

  const animate = () => {
    particles = particles.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18;
      p.opacity -= 0.035;
      if (p.opacity <= 0) {
        p.el.remove();
        return false;
      }
      p.el.style.left = `${p.x}px`;
      p.el.style.top = `${p.y}px`;
      p.el.style.opacity = String(p.opacity);
      return true;
    });
    raf = particles.length ? requestAnimationFrame(animate) : 0;
  };

  const onClick = (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.closest(".experience-controls") || target.closest(".preloader")) return;
    const x = e.clientX;
    const y = e.clientY;
    const angle = -35 + (20 * Math.random() - 10);
    const slash = h(
      "div",
      { className: "click-katana-slash", style: { left: `${x}px`, top: `${y}px`, transform: `translate(-50%, -50%) rotate(${angle}deg)` } },
      h("span", { className: "slash-glow" }),
      h("span", { className: "slash-core" }),
    );
    layer.prepend(slash);
    slashes.push(slash);
    while (slashes.length > 4) slashes.shift().remove();
    setTimeout(() => {
      slash.remove();
      const i = slashes.indexOf(slash);
      if (i >= 0) slashes.splice(i, 1);
    }, 280);

    for (let i = 0; i < 12; i++) {
      const a = Math.random() * Math.PI * 2;
      const speed = 2 + 5 * Math.random();
      const gold = Math.random() > 0.4;
      const size = gold ? 3 + 3 * Math.random() : 4 + 6 * Math.random();
      const color = gold ? "#e8c66a" : "#a70d16";
      const el = h("span", {
        className: "click-ink-particle",
        style: { left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size}px`, backgroundColor: color, opacity: "1", boxShadow: `0 0 6px ${color}` },
      });
      layer.appendChild(el);
      particles.push({ el, x, y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, opacity: 1 });
    }
    while (particles.length > 36) particles.shift().el.remove();
    if (!raf) raf = requestAnimationFrame(animate);
  };
  scope.on(window, "click", onClick);
  scope.add(() => cancelAnimationFrame(raf));
  return layer;
}

const HOVERABLE = 'button, a, [role="button"], input, .sensu-blade, .makimono-tab-btn, .chōchin-lantern';

/** Brush-tip cursor with an ensō ring and a fading ink trail (fine pointers only). */
export function initInkCursor(scope) {
  if (window.matchMedia("(hover: none)").matches) return null;
  const main = h(
    "div",
    { className: "ink-cursor-main ", style: { transform: "translate3d(-100px, -100px, 0)" } },
    h("div", { className: "cursor-brush-core" }),
    h("div", { className: "cursor-enso-ring" }),
  );
  const container = h("div", { className: "ink-cursor-container", "aria-hidden": "true" }, main);
  let trail = [];
  let lastX = 0;
  let lastY = 0;
  let hover = false;
  let down = false;
  const setClass = () => {
    main.className = `ink-cursor-main ${hover ? "is-hover" : ""} ${down ? "is-click" : ""}`;
  };
  const onMove = (e) => {
    const { clientX: x, clientY: y } = e;
    main.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    const dist = Math.hypot(x - lastX, y - lastY);
    if (dist > 12) {
      lastX = x;
      lastY = y;
      const size = Math.min(8, 2.5 + 0.08 * dist);
      const el = h("span", {
        className: "ink-trail-dot",
        style: { left: `${x}px`, top: `${y}px`, width: `${size}px`, height: `${size}px`, opacity: "0.65" },
      });
      container.insertBefore(el, main);
      trail.push({ el, size, opacity: 0.65 });
      while (trail.length > 15) trail.shift().el.remove();
    }
    const over = !!(e.target instanceof Element && e.target.closest(HOVERABLE));
    if (over !== hover) {
      hover = over;
      setClass();
    }
  };
  const fade = setInterval(() => {
    if (!trail.length) return;
    trail = trail.filter((t) => {
      t.opacity -= 0.08;
      t.size *= 0.95;
      if (t.opacity <= 0) {
        t.el.remove();
        return false;
      }
      t.el.style.opacity = String(t.opacity);
      t.el.style.width = t.el.style.height = `${t.size}px`;
      return true;
    });
  }, 40);
  scope.on(window, "mousemove", onMove);
  scope.on(window, "mousedown", () => {
    down = true;
    setClass();
  });
  scope.on(window, "mouseup", () => {
    down = false;
    setClass();
  });
  scope.add(() => clearInterval(fade));
  return container;
}
