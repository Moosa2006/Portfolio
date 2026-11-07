const gsap = window.gsap;
const SELECTOR = ".button, .header-register, .sound-seal, .path-card";

/** Buttons drift toward a fine pointer; path cards tilt. Mirrors the original hover physics. */
export function initMagnetic(scope, reduced) {
  if (reduced) return;
  const query = window.matchMedia("(hover: hover) and (pointer: fine)");
  let teardown = () => {};

  const setup = () => {
    teardown();
    if (!query.matches) {
      teardown = () => {};
      return;
    }
    const state = new Map();
    let active = null;
    const release = () => {
      if (!active) return;
      active.moveX(0);
      active.moveY(0);
      active = null;
    };
    const over = (e) => {
      if (e.pointerType !== "mouse" || !(e.target instanceof Element)) return;
      const el = e.target.closest(SELECTOR);
      if (!el || el.matches(':disabled, [aria-disabled="true"]') || el.closest("[inert]") || active?.element === el) return;
      release();
      let entry = state.get(el);
      if (!entry) {
        const card = el.matches(".path-card");
        const saved = {
          translate: el.style.translate,
          rotate: el.style.rotate,
          mx: el.style.getPropertyValue("--mx"),
          my: el.style.getPropertyValue("--my"),
          attribute: el.getAttribute("data-physical"),
        };
        const pos = { x: 0, y: 0 };
        const apply = () => {
          if (card) {
            const d = Math.hypot(pos.x, pos.y);
            el.style.rotate = d < 0.001 ? "none" : `${-pos.y} ${pos.x} 0 ${3 * d}deg`;
          } else el.style.translate = `${7 * pos.x}px ${5 * pos.y}px`;
        };
        el.dataset.physical = card ? "card" : "button";
        entry = {
          element: el,
          card,
          saved,
          moveX: gsap.quickTo(pos, "x", { duration: 0.45, ease: "power3.out", onUpdate: apply }),
          moveY: gsap.quickTo(pos, "y", { duration: 0.45, ease: "power3.out", onUpdate: apply }),
          rect: el.getBoundingClientRect(),
        };
        state.set(el, entry);
      }
      entry.rect = el.getBoundingClientRect();
      active = entry;
    };
    const move = (e) => {
      if (!active || e.pointerType !== "mouse") return;
      const { rect, element, card } = active;
      if (!rect.width || !rect.height) return;
      const x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      const y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
      active.moveX(x);
      active.moveY(y);
      if (card) {
        element.style.setProperty("--mx", `${(x + 1) * 50}%`);
        element.style.setProperty("--my", `${(y + 1) * 50}%`);
      }
    };
    const out = (e) => {
      if (!active || (e.relatedTarget instanceof Node && active.element.contains(e.relatedTarget))) return;
      release();
    };
    const remeasure = () => {
      if (active) active.rect = active.element.getBoundingClientRect();
    };
    const key = (e) => {
      if (e.key === "Tab") release();
    };
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", out, { passive: true });
    document.addEventListener("keydown", key);
    window.addEventListener("blur", release);
    window.addEventListener("scroll", remeasure, { passive: true });
    window.addEventListener("resize", remeasure, { passive: true });
    teardown = () => {
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", out);
      document.removeEventListener("keydown", key);
      window.removeEventListener("blur", release);
      window.removeEventListener("scroll", remeasure);
      window.removeEventListener("resize", remeasure);
      for (const { element, saved, moveX, moveY } of state.values()) {
        moveX.tween.kill();
        moveY.tween.kill();
        element.style.translate = saved.translate;
        element.style.rotate = saved.rotate;
        for (const k of ["mx", "my"]) saved[k] ? element.style.setProperty(`--${k}`, saved[k]) : element.style.removeProperty(`--${k}`);
        saved.attribute === null ? element.removeAttribute("data-physical") : element.setAttribute("data-physical", saved.attribute);
      }
      state.clear();
      active = null;
    };
  };
  setup();
  query.addEventListener("change", setup);
  scope.add(() => {
    query.removeEventListener("change", setup);
    teardown();
  });
}
