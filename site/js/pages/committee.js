import { h } from "../core/dom.js";
import { destinationShell } from "../ui/common.js";
import { lucide } from "../ui/icons.js";
import { COMMITTEES, MEMBERS } from "../lib/committees.js";

export const title = "Leadership, Honours & Algorithmic Milestones · Moosa";

function emberCanvas(scope) {
  const canvas = h("canvas", { className: "comm-particles-canvas", "aria-hidden": "true" });
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  let w = (canvas.width = innerWidth);
  let hgt = (canvas.height = innerHeight);
  scope.on(window, "resize", () => {
    w = canvas.width = innerWidth;
    hgt = canvas.height = innerHeight;
  });
  const embers = Array.from({ length: Math.min(innerWidth < 768 ? 20 : 40, 45) }, () => ({
    x: Math.random() * w,
    y: Math.random() * hgt,
    size: 2.5 * Math.random() + 0.8,
    speedX: (Math.random() - 0.5) * 0.45,
    speedY: -(0.65 * Math.random()) - 0.2,
    opacity: 0.55 * Math.random() + 0.15,
    color: Math.random() > 0.65 ? "rgba(232, 198, 106, " : "rgba(167, 13, 22, ",
  }));
  let raf = 0;
  const draw = () => {
    ctx.clearRect(0, 0, w, hgt);
    for (const p of embers) {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.y < -10) p.y = hgt + 10;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color === "rgba(232, 198, 106, " ? "#c99a3a" : "#d81e28";
      ctx.fill();
    }
    raf = requestAnimationFrame(draw);
  };
  draw();
  scope.add(() => cancelAnimationFrame(raf));
  return canvas;
}

function memberCard(m) {
  const isLeetCode = !!m.link;
  const avatarRing = h(
    "div",
    {
      className: "comm-card-photo-avatar-ring",
      style: {
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isLeetCode ? "rgba(112, 165, 255, 0.15)" : "rgba(201, 154, 58, 0.18)",
        border: isLeetCode ? "1px solid rgba(112, 165, 255, 0.45)" : "1px solid rgba(201, 154, 58, 0.5)",
        color: isLeetCode ? "#96ccff" : "#f5d78e",
        fontSize: "20px",
        fontWeight: "700",
        marginRight: "18px",
        flexShrink: "0",
      },
    },
    isLeetCode ? "⚡" : "⛩",
  );

  return h(
    "article",
    {
      className: "comm-card-simple",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "24px 28px",
        borderRadius: "12px",
        background: "rgba(16, 39, 52, 0.8)",
        border: "1px solid rgba(201, 154, 58, 0.3)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
      },
    },
    h(
      "div",
      { style: { display: "flex", alignItems: "center" } },
      avatarRing,
      h(
        "div",
        null,
        h(
          "div",
          {
            style: {
              display: "inline-block",
              padding: "2px 8px",
              borderRadius: "4px",
              background: "rgba(201, 154, 58, 0.15)",
              color: "#f5d78e",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "4px",
            },
          },
          m.tag || "HONOUR",
        ),
        h("h3", { className: "comm-card-simple-name", style: { margin: "0 0 2px", fontSize: "18px", color: "#efe4cd" } }, m.name),
        h("span", { className: "comm-card-simple-role", style: { fontSize: "13px", color: "#c99a3a", fontWeight: "600" } }, m.role),
      ),
    ),
    h("p", { style: { margin: "0", fontSize: "14px", lineHeight: "1.6", color: "rgba(239, 228, 205, 0.82)" } }, m.details),
    m.link &&
      h(
        "div",
        { style: { marginTop: "6px" } },
        h(
          "a",
          {
            href: m.link,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "button button-gold",
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              fontSize: "11px",
              fontWeight: "700",
            },
          },
          h("span", null, "Open LeetCode Profile (150+ Solved) ↗"),
          lucide("external-link", "w-3.5 h-3.5"),
        ),
      ),
  );
}

export default function committee({ scope, path }) {
  let active = COMMITTEES[0]?.id || "itian-club";
  let highlightTimer = 0;
  scope.add(() => clearTimeout(highlightTimer));

  const tabs = new Map();
  const sections = new Map();
  const setActive = (id) => {
    active = id;
    for (const [key, tab] of tabs) {
      tab.classList.toggle("is-active", key === id);
      tab.setAttribute("aria-pressed", String(key === id));
    }
  };

  const navScroll = h(
    "div",
    { className: "comm-sticky-nav-scroll" },
    COMMITTEES.map((c) => {
      const tab = h(
        "button",
        {
          type: "button",
          className: `comm-nav-tab ${active === c.id ? "is-active" : ""}`,
          "aria-pressed": String(active === c.id),
          onClick: () => {
            setActive(c.id);
            const target = document.getElementById(c.id);
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
              history.replaceState(history.state, "", `#${c.id}`);
            }
          },
        },
        h("span", null, c.title),
      );
      tabs.set(c.id, tab);
      return tab;
    }),
  );
  const scrollTabs = (dir) => navScroll.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });

  const directory = h(
    "main",
    { className: "comm-container", id: "directory-content" },
    COMMITTEES.map((c) => {
      const section = h(
        "section",
        { id: c.id, className: "comm-section", "aria-labelledby": `heading-${c.id}` },
        h(
          "div",
          { className: "comm-section-header" },
          h("div", { className: "comm-section-title-wrap" }, h("div", null, h("span", { className: "comm-section-eyebrow" }, c.tag), h("h2", { id: `heading-${c.id}`, className: "comm-section-h2" }, c.title))),
          h("div", { className: "comm-section-meta" }, h("p", { className: "m-0 text-xs text-[#efe4cd]/60" }, c.subtitle)),
        ),
        h("div", { className: "comm-members-grid" }, MEMBERS.filter((m) => m.committeeId === c.id).map(memberCard)),
      );
      sections.set(c.id, section);
      return section;
    }),
  );

  // Deep links (e.g. from the map) highlight their section for three seconds.
  const fromHash = () => {
    const id = decodeURIComponent(location.hash.replace("#", ""));
    const target = id && sections.get(id);
    if (!target) return;
    setActive(id);
    for (const s of sections.values()) s.classList.toggle("is-highlighted", s === target);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    clearTimeout(highlightTimer);
    highlightTimer = setTimeout(() => target.classList.remove("is-highlighted"), 3e3);
  };
  const initial = setTimeout(fromHash, 100);
  scope.add(() => clearTimeout(initial));
  scope.on(window, "hashchange", fromHash);

  const content = h(
    "div",
    { className: "committee-root" },
    h("div", { className: "comm-ambience", "aria-hidden": "true" }, h("div", { className: "comm-ink-wash" })),
    emberCanvas(scope),
    h(
      "div",
      { className: "comm-container" },
      h(
        "header",
        { className: "comm-hero" },
        h("div", { className: "comm-badge" }, h("span", { className: "comm-badge-dot" }), h("span", { className: "comm-badge-text" }, "MOOSA · LEADERSHIP & HONOURS DIRECTORY")),
        h("h1", { className: "comm-main-title" }, "Leadership, Honours & ", h("span", { className: "comm-gold-text" }, "Algorithmic Milestones")),
        h("p", { className: "comm-subtitle" }, "Detailed directory of departmental leadership at Guru Nanak Dev Engineering College, 150+ solved LeetCode algorithmic milestones, and competitive podium finishes."),
      ),
      h(
        "div",
        { className: "comm-map-callout" },
        h(
          "div",
          { className: "comm-map-callout-left" },
          h("div", { className: "comm-map-callout-icon" }, lucide("compass", "w-5 h-5")),
          h(
            "div",
            { className: "comm-map-callout-text" },
            h("h4", null, "Explore The Illustrated Sanctuary Landmark Map"),
            h("p", null, "Experience the illuminated Japanese village map and examine every milestone landmark."),
          ),
        ),
        h("a", { href: "/leadership", className: "comm-map-callout-btn" }, h("span", null, "Open Landmark Map"), lucide("arrow-up-right", "w-3.5 h-3.5")),
      ),
    ),
    h(
      "nav",
      { className: "comm-sticky-nav-wrap", "aria-label": "Committees Navigation" },
      h(
        "div",
        { className: "comm-sticky-nav-container" },
        h("button", { type: "button", className: "comm-nav-arrow-btn comm-nav-arrow-left", "aria-label": "Scroll committees left", onClick: () => scrollTabs("left") }, lucide("chevron-left", "w-4 h-4")),
        navScroll,
        h("button", { type: "button", className: "comm-nav-arrow-btn comm-nav-arrow-right", "aria-label": "Scroll committees right", onClick: () => scrollTabs("right") }, lucide("chevron-right", "w-4 h-4")),
      ),
    ),
    directory,
  );

  return destinationShell(scope, { pathname: path, mainClass: "fullscreen-page-overlay destination-page destination-page-committee", content });
}
