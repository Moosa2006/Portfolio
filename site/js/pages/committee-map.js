import { h, prefersReducedMotion } from "../core/dom.js";
import { navigate } from "../core/nav.js";
import { destinationShell } from "../ui/common.js";
import { lucide } from "../ui/icons.js";
import { LANDMARKS } from "../lib/committees.js";

export const title = "Leadership & Milestones · Moosa";

const mark = (l) => l.kanjiMark || l.title.charAt(0);

function petalCanvas(scope) {
  if (prefersReducedMotion()) return null;
  const canvas = h("canvas", { className: "comm-map-particles-canvas", "aria-hidden": "true" });
  let raf = 0;
  requestAnimationFrame(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx || !canvas.isConnected) return;
    let w = (canvas.width = canvas.parentElement?.clientWidth || innerWidth);
    let hgt = (canvas.height = canvas.parentElement?.clientHeight || innerHeight);
    const resize = () => {
      w = canvas.width = canvas.parentElement?.clientWidth || innerWidth;
      hgt = canvas.height = canvas.parentElement?.clientHeight || innerHeight;
    };
    scope.on(window, "resize", resize);
    const petals = Array.from({ length: innerWidth <= 768 ? 24 : 65 }, () => ({
      x: Math.random() * w,
      y: Math.random() * hgt,
      size: 3.8 * Math.random() + 1.8,
      speedX: 1.3 * Math.random() + 0.4,
      speedY: 0.9 * Math.random() + 0.3,
      oscillation: Math.random() * Math.PI * 2,
      oscSpeed: 0.03 * Math.random() + 0.015,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      opacity: 0.55 * Math.random() + 0.3,
      type: Math.random() > 0.65 ? "gold" : Math.random() > 0.3 ? "sakura" : "crimson",
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, hgt);
      for (const p of petals) {
        p.oscillation += p.oscSpeed;
        p.x += p.speedX + 0.6 * Math.sin(p.oscillation);
        p.y += p.speedY + 0.3 * Math.cos(p.oscillation);
        p.rotation += p.rotSpeed;
        if (p.x > w + 25) p.x = -25;
        if (p.y > hgt + 25) p.y = -25;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        ctx.moveTo(0, -(1.8 * p.size));
        ctx.bezierCurveTo(1.4 * p.size, -p.size, 1.4 * p.size, p.size, 0, 1.6 * p.size);
        ctx.bezierCurveTo(-(1.4 * p.size), p.size, -(1.4 * p.size), -p.size, 0, -(1.8 * p.size));
        if (p.type === "gold") {
          ctx.fillStyle = `rgba(232, 198, 106, ${p.opacity})`;
          ctx.shadowColor = "#c99a3a";
        } else if (p.type === "crimson") {
          ctx.fillStyle = `rgba(167, 13, 22, ${p.opacity})`;
          ctx.shadowColor = "#a70d16";
        } else {
          ctx.fillStyle = `rgba(235, 120, 160, ${p.opacity})`;
          ctx.shadowColor = "#e878a0";
        }
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
  });
  scope.add(() => cancelAnimationFrame(raf));
  return canvas;
}

export default function committeeMap({ scope, path }) {
  const state = { selected: LANDMARKS[0], hovered: null, targeted: null, cursor: null, inside: false, mobile: innerWidth <= 900, mode: "focus", zoom: 1 };
  let pendingNav = 0;
  scope.add(() => clearTimeout(pendingNav));

  const select = (l) => {
    state.selected = l;
    state.mode = "focus";
    update();
  };

  /* ---- map stage ---- */
  const nodes = LANDMARKS.map((l) => {
    const pulse = h("span", { className: "comm-beacon-pulse", style: { borderColor: l.emblemColor } });
    const kanji = h("span", { className: "comm-beacon-kanji" }, mark(l));
    const beacon = h("div", { className: "comm-landmark-beacon" }, pulse, kanji);
    const label = h("div", { className: "comm-landmark-label" }, h("span", { className: "comm-label-tag" }, l.tag), h("span", { className: "comm-label-title" }, l.title));
    const button = h(
      "button",
      {
        type: "button",
        className: "comm-landmark-node",
        style: { left: `${l.pinX}%`, top: `${l.pinY}%` },
        "aria-label": `Select ${l.title} - ${l.buildingName || ""}`,
        onClick: () => {
          if (l.link) {
            window.open(l.link, "_blank", "noreferrer");
            return;
          }
          if (state.mobile) {
            if (state.selected.id === l.id) navigate(`/leadership/directory#${l.id}`);
            else select(l);
          } else {
            state.selected = l;
            update();
            clearTimeout(pendingNav);
            pendingNav = setTimeout(() => navigate(`/leadership/directory#${l.id}`), 240);
          }
        },
        onFocus: () => {
          if (state.mobile) return;
          state.targeted = state.hovered = l;
          update();
        },
        onBlur: () => {
          if (state.mobile) return;
          state.targeted = state.hovered = null;
          update();
        },
      },
      beacon,
      label,
    );
    return { l, button, beacon, kanji, label };
  });

  const surface = h(
    "div",
    { className: "comm-map-viewport-surface", style: { transformOrigin: "0 0", transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)" } },
    h("img", { src: "/images/ancient_japan_committee_map.jpg", alt: "Ancient Japanese Illustrated Committee Map", className: "comm-map-backdrop-img" }),
    h("div", { className: "comm-map-color-grade" }),
    petalCanvas(scope),
    nodes.map((n) => n.button),
  );

  const lockLabel = h("div", { className: "comm-crosshair-lock-label" }, h("span", null));
  const crosshair = h("div", { className: "comm-game-crosshair comm-desktop-only" }, h("div", { className: "comm-crosshair-reticle" }, h("span", { className: "comm-crosshair-dot" })), lockLabel);

  const hudCount = h("span", null);
  const modeBtn = h("button", {
    type: "button",
    className: "comm-mobile-hud-btn",
    onClick: () => {
      if (state.mode === "focus") state.zoom = 1;
      state.mode = state.mode === "focus" ? "overview" : "focus";
      update();
    },
  });
  const zoomIn = h(
    "button",
    { type: "button", className: "comm-mobile-hud-btn icon-only", "aria-label": "Zoom In", onClick: () => ((state.zoom = Math.min(2.4, +(state.zoom + 0.3).toFixed(1))), update()) },
    lucide("zoom-in", "w-3.5 h-3.5"),
  );
  const zoomOut = h(
    "button",
    { type: "button", className: "comm-mobile-hud-btn icon-only", "aria-label": "Zoom Out", onClick: () => ((state.zoom = Math.max(1, +(state.zoom - 0.3).toFixed(1))), update()) },
    lucide("zoom-out", "w-3.5 h-3.5"),
  );
  const targetDot = h("span", { className: "comm-mobile-target-dot" });
  const targetName = h("span", { className: "comm-mobile-target-name" });
  const mobileHud = h(
    "div",
    { className: "comm-mobile-only" },
    h("div", { className: "comm-mobile-hud-badge" }, lucide("compass", "w-3.5 h-3.5 text-[#c99a3a] animate-pulse"), hudCount),
    h("div", { className: "comm-mobile-hud-controls" }, modeBtn, zoomIn, zoomOut),
    h(
      "div",
      { className: "comm-mobile-target-strip" },
      h("div", { className: "comm-mobile-target-left" }, targetDot, targetName),
      h("span", { className: "comm-mobile-target-action" }, "Tap card to explore"),
    ),
  );

  const inspStamp = h("div", { className: "comm-inspector-kanji-stamp" });
  const inspTitle = h("h4");
  const inspSub = h("p");
  const inspAction = h("a", { className: "comm-inspector-action" }, h("span", null, "Examine Guild"), lucide("chevron-right", "w-4 h-4"));
  const inspector = h(
    "div",
    { className: "comm-map-inspector-bar comm-desktop-only" },
    h("div", { className: "comm-inspector-left" }, inspStamp, h("div", { className: "comm-inspector-meta" }, inspTitle, inspSub)),
    inspAction,
  );

  const card = h("div", { className: "comm-map-canvas-card" }, surface, crosshair, mobileHud, inspector);
  scope.on(card, "mousemove", (e) => {
    if (state.mobile) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    let best = Infinity;
    let hit = null;
    for (const l of LANDMARKS) {
      const d = Math.hypot(x - (l.pinX / 100) * r.width, y - (l.pinY / 100) * r.height);
      if (d < 62 && d < best) {
        best = d;
        hit = l;
      }
    }
    state.cursor = hit ? { x: (hit.pinX / 100) * r.width, y: (hit.pinY / 100) * r.height } : { x, y };
    state.targeted = state.hovered = hit;
    update();
  });
  scope.on(card, "mouseenter", () => {
    if (state.mobile) return;
    state.inside = true;
    update();
  });
  scope.on(card, "mouseleave", () => {
    if (state.mobile) return;
    state.inside = false;
    state.cursor = state.targeted = state.hovered = null;
    update();
  });

  /* ---- mobile dock ---- */
  const pills = LANDMARKS.map((l) => {
    const kanji = h("span", { className: "comm-mobile-pill-kanji" }, mark(l));
    const btn = h("button", { type: "button", className: "comm-mobile-pill-btn", onClick: () => select(l) }, kanji, h("span", { className: "comm-mobile-pill-title" }, l.title));
    return { l, btn, kanji };
  });
  const pillsRow = h("div", { className: "comm-mobile-pills-row no-scrollbar" }, pills.map((p) => p.btn));
  const decreeSeal = h("div", { className: "comm-decree-seal" }, h("span"));
  const decreeTag = h("span", { className: "comm-decree-tag" });
  const decreeBuilding = h("span", { className: "comm-decree-building" });
  const decreeTitle = h("h3", { className: "comm-decree-title" });
  const decreeSub = h("p", { className: "comm-decree-sub" });
  const stepCount = h("span", { className: "comm-decree-step-count" });
  const dispatch = h("a", { className: "comm-decree-dispatch-btn" }, h("span", null, "Explore Guild"), lucide("arrow-up-right", "w-4 h-4"));
  const step = (d) => select(LANDMARKS[(LANDMARKS.indexOf(state.selected) + d + LANDMARKS.length) % LANDMARKS.length]);
  const decree = h(
    "div",
    { className: "comm-mobile-decree-card" },
    h(
      "div",
      { className: "comm-decree-header" },
      decreeSeal,
      h("div", { className: "comm-decree-meta" }, h("div", { className: "comm-decree-tag-row" }, decreeTag, decreeBuilding), decreeTitle, decreeSub),
    ),
    h(
      "div",
      { className: "comm-decree-actions" },
      h(
        "div",
        { className: "comm-decree-nav-btns" },
        h("button", { type: "button", className: "comm-decree-nav-btn", "aria-label": "Previous Guild", onClick: () => step(-1) }, lucide("chevron-left", "w-4 h-4")),
        stepCount,
        h("button", { type: "button", className: "comm-decree-nav-btn", "aria-label": "Next Guild", onClick: () => step(1) }, lucide("chevron-right", "w-4 h-4")),
      ),
      dispatch,
    ),
  );
  const dock = h("div", { className: "comm-mobile-only comm-mobile-chronicle-dock" }, pillsRow, decree);

  /* ---- landmark directory ---- */
  const guide = h(
    "section",
    { className: "comm-map-grid-guide", "aria-label": "Committee Guild Landmarks" },
    h("div", { className: "comm-guide-header" }, h("span", { className: "comm-guide-eyebrow" }, "THE 4 SANCTUARY MILESTONES"), h("h2", { className: "comm-guide-title" }, "Directory of Leadership & Milestones")),
    h(
      "div",
      { className: "comm-landmarks-cards-grid" },
      LANDMARKS.map((l) =>
        h(
          "a",
          {
            href: l.link || `/leadership/directory#${l.id}`,
            target: l.link ? "_blank" : undefined,
            rel: l.link ? "noopener noreferrer" : undefined,
            className: "comm-landmark-card-link",
            onMouseenter: () => {
              if (!state.mobile) ((state.hovered = l), update());
            },
            onMouseleave: () => {
              if (!state.mobile) ((state.hovered = null), update());
            },
            onClick: () => {
              if (state.mobile && !l.link) select(l);
            },
          },
          h("div", { className: "comm-card-link-top" }, h("span", { className: "comm-card-link-kanji", style: { color: l.emblemColor } }, mark(l)), h("span", { className: "comm-card-link-tag" }, l.tag)),
          h("h3", { className: "comm-card-link-title" }, l.title),
          h("p", { className: "comm-card-link-sub" }, l.subtitle),
          h("div", { className: "comm-card-link-footer" }, h("span", null, l.link ? "Open LeetCode Profile ↗" : "Dispatch to section"), lucide(l.link ? "external-link" : "arrow-up-right", "w-3.5 h-3.5")),
        ),
      ),
    ),
  );

  let lastSelected = null;
  function update() {
    const { selected: t, mobile } = state;
    const idx = LANDMARKS.indexOf(t);

    if (mobile) {
      if (state.mode === "overview") surface.style.transform = `translate(0%, 0%) scale(${state.zoom})`;
      else {
        const x = Math.max(-82, Math.min(0, 50 - (t.pinX / 100) * 182));
        const y = Math.max(-82, Math.min(0, 50 - (t.pinY / 100) * 182));
        surface.style.transform = `translate(${x.toFixed(2)}%, ${y.toFixed(2)}%) scale(1.82)`;
      }
    } else surface.style.transform = "";

    for (const n of nodes) {
      const sel = t.id === n.l.id;
      const tgt = state.targeted?.id === n.l.id || state.hovered?.id === n.l.id;
      const act = mobile && sel;
      n.button.className = `comm-landmark-node ${sel ? "is-selected" : ""} ${tgt ? "is-targeted" : ""} ${act ? "is-mobile-active" : ""}`;
      n.beacon.style.borderColor = n.l.emblemColor;
      n.beacon.style.boxShadow = tgt || act ? `0 0 28px ${n.l.emblemColor}, inset 0 0 14px rgba(255, 255, 255, 0.5)` : `0 0 14px ${n.l.emblemColor}66`;
      n.kanji.style.color = tgt || act ? "#fff" : n.l.emblemColor;
      n.label.className = `comm-landmark-label ${act ? "is-mobile-visible" : ""}`;
    }

    const showCross = state.inside && state.cursor && !mobile;
    if (!showCross) crosshair.remove();
    else {
      if (!crosshair.isConnected) surface.after(crosshair);
      crosshair.className = `comm-game-crosshair comm-desktop-only ${state.targeted ? "is-locked" : ""}`;
      crosshair.style.left = `${state.cursor.x}px`;
      crosshair.style.top = `${state.cursor.y}px`;
      if (!state.targeted) lockLabel.remove();
      else {
        if (!lockLabel.isConnected) crosshair.append(lockLabel);
        lockLabel.firstChild.textContent = `TARGET LOCKED: ${state.targeted.title.toUpperCase()}`;
      }
    }

    hudCount.textContent = `MILESTONE ${String(idx + 1).padStart(2, "0")} / 04`;
    const focus = state.mode === "focus";
    modeBtn.className = `comm-mobile-hud-btn ${focus ? "is-active" : ""}`;
    modeBtn.title = focus ? "View Full Map" : "Focus on Active Guild";
    modeBtn.replaceChildren(
      ...(focus
        ? [lucide("crosshair", "w-3.5 h-3.5 text-[#c99a3a]"), h("span", null, "Focus")]
        : [lucide("layers", "w-3.5 h-3.5 text-[#efe4cd]"), h("span", null, "Full Map")]),
    );
    zoomIn.style.display = zoomOut.style.display = focus ? "none" : "";
    targetDot.style.backgroundColor = t.emblemColor;
    targetName.textContent = t.buildingName || t.title;

    const L = state.targeted || state.hovered || t;
    inspStamp.style.borderColor = inspStamp.style.color = L.emblemColor;
    inspStamp.textContent = mark(L);
    inspTitle.textContent = L.title;
    inspSub.textContent = L.subtitle;
    inspAction.href = L.link || `/leadership/directory#${L.id}`;
    inspAction.target = L.link ? "_blank" : "";
    inspAction.rel = L.link ? "noopener noreferrer" : "";
    inspAction.querySelector("span").textContent = L.link ? "Open LeetCode ↗" : "Examine Milestone";

    for (const p of pills) {
      const on = t.id === p.l.id;
      p.btn.dataset.active = String(on);
      p.btn.className = `comm-mobile-pill-btn ${on ? "is-active" : ""}`;
      p.btn.style.borderColor = on ? p.l.emblemColor : "";
      p.kanji.style.color = on ? p.l.emblemColor : "";
    }
    decree.style.borderColor = `${t.emblemColor}66`;
    Object.assign(decreeSeal.style, { borderColor: t.emblemColor, color: t.emblemColor, boxShadow: `0 0 16px ${t.emblemColor}40` });
    decreeSeal.firstChild.textContent = mark(t);
    decreeTag.style.color = t.emblemColor;
    decreeTag.textContent = t.tag;
    decreeBuilding.style.display = t.buildingName ? "" : "none";
    decreeBuilding.textContent = `• ${t.buildingName || ""}`;
    decreeTitle.textContent = t.title;
    decreeSub.textContent = t.subtitle;
    stepCount.textContent = `${idx + 1} / ${LANDMARKS.length}`;
    dispatch.href = t.link || `/leadership/directory#${t.id}`;
    dispatch.target = t.link ? "_blank" : "";
    dispatch.rel = t.link ? "noopener noreferrer" : "";
    dispatch.querySelector("span").textContent = t.link ? "Open LeetCode ↗" : "Explore Milestone";
    dispatch.style.background = `linear-gradient(135deg, ${t.emblemColor} 0%, #a87d27 100%)`;

    if (lastSelected !== t.id) {
      lastSelected = t.id;
      pillsRow.querySelector('[data-active="true"]')?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }

  scope.on(window, "resize", () => {
    const m = innerWidth <= 900;
    if (m !== state.mobile) {
      state.mobile = m;
      update();
    }
  });
  update();
  lastSelected = null;

  const content = h(
    "div",
    { className: "comm-map-page" },
    h("div", { className: "comm-map-ambience", "aria-hidden": "true" }, h("div", { className: "comm-map-mist" }), h("div", { className: "comm-map-vignette" })),
    h(
      "header",
      { className: "comm-map-header" },
      h("div", { className: "comm-map-badge" }, h("span", { className: "w-1.5 h-1.5 rounded-full bg-[#c99a3a]" }), h("span", { className: "comm-map-badge-text" }, "MOOSA · LEADERSHIP, HONOURS & MILESTONES")),
      h("h1", { className: "comm-map-title" }, "Leadership, Honours & ", h("span", { className: "comm-map-title-gold" }, "Algorithmic Milestones")),
      h(
        "p",
        { className: "comm-map-subtitle" },
        "Explore Moosa's departmental leadership at Guru Nanak Dev Engineering College, 150+ solved LeetCode algorithmic milestones, and competitive podium finishes across the interactive sanctuary map.",
      ),
      h(
        "div",
        { className: "comm-map-quick-actions" },
        h("a", { href: "/leadership/directory", className: "comm-map-btn-direct" }, h("span", null, "View Unified Directory"), lucide("arrow-up-right", "w-3.5 h-3.5")),
        h("span", { className: "text-xs text-[#efe4cd]/50 font-mono" }, "4 Sanctuary Milestones Active"),
      ),
    ),
    h("div", { className: "comm-map-stage-outer" }, card, dock),
    guide,
  );

  return destinationShell(scope, { pathname: path, mainClass: "fullscreen-page-overlay destination-page", content });
}
