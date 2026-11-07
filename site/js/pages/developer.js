import { h, fromHTML, prefersReducedMotion } from "../core/dom.js";
import { festivalNavbar, siteFooter } from "../ui/common.js";
import { lucide } from "../ui/icons.js";

export const title = "Developer Profile · Moosa";

const gsap = typeof window !== "undefined" ? window.gsap : undefined;
const EASE = "expo.out";

const DEVELOPERS = [
  {
    id: "moosa",
    name: "Moosa",
    role: "Full-Stack Software Developer",
    institution: "Guru Nanak Dev Engineering College, Ludhiana",
    index: 1,
    email: "moosarajput2006@gmail.com",
    github: "https://github.com/Moosa2006",
    linkedin: "https://www.linkedin.com/in/moosa2006/",
    leetcode: "https://leetcode.com/u/Moosa_ENG/",
    category: "leads",
  },
];

const GITHUB_PATH =
  "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z";
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.222 0h.003z";
const brandIcon = (d, size) => fromHTML(`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"></path></svg>`);

const KAMON = fromHTML.bind(
  null,
  `<svg width="20" height="20" viewBox="0 0 100 100" fill="none" class="jp-card-kamon" aria-hidden="true"><circle cx="50" cy="50" r="46" stroke="#C49A45" stroke-width="1.5" opacity="0.85"></circle><circle cx="50" cy="50" r="41" stroke="#C49A45" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.65"></circle>${[0, 72, 144, 216, 288]
    .map((r) => `<path d="M50 48C30 32 34 14 46 19L50 24 54 19C66 14 70 32 50 48Z" fill="#C49A45" opacity="0.9" transform="rotate(${r} 50 50)"></path>`)
    .join("")}<circle cx="50" cy="50" r="6" fill="#C49A45"></circle></svg>`,
);
const ENSO = fromHTML.bind(
  null,
  `<svg viewBox="0 0 280 280" class="jp-card-enso-svg" fill="none" aria-hidden="true"><defs><radialGradient id="ensoGlow" cx="50%" cy="50%" r="50%"><stop offset="50%" stop-color="#C62920" stop-opacity="0.32"></stop><stop offset="100%" stop-color="#C62920" stop-opacity="0"></stop></radialGradient></defs><circle cx="140" cy="140" r="120" fill="url(#ensoGlow)"></circle><path d="M 140 24 C 204 24, 256 76, 256 140 C 256 204, 204 256, 140 256 C 76 256, 24 204, 24 140 C 24 84, 65 35, 122 25" stroke="#C62920" stroke-width="19" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"></path><path d="M 136 30 C 194 32, 246 80, 246 140 C 246 200, 196 246, 140 246 C 84 246, 34 200, 34 140 C 34 90, 72 46, 116 34" stroke="#E8D9B5" stroke-width="2.2" stroke-linecap="round" opacity="0.3" stroke-dasharray="55 30 110 40"></path></svg>`,
);
const RED_STROKE = fromHTML.bind(
  null,
  `<svg viewBox="0 0 160 10" class="jp-card-red-stroke-svg" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M 4 6 C 25 3, 55 4.5, 80 5.5 C 110 6.5, 140 3.8, 156 5.5 C 142 8, 105 8.8, 75 8 C 48 7.2, 18 8.8, 4 6 Z" fill="#C62920" opacity="0.95"></path></svg>`,
);

function developerCard(scope, d) {
  const socials = [
    d.email && { href: `mailto:${d.email}`, label: "Email", icon: lucide("mail", "", 14, { "stroke-width": 2 }) },
    d.github && { href: d.github, label: "GitHub", icon: brandIcon(GITHUB_PATH, 14) },
    d.linkedin && { href: d.linkedin, label: "LinkedIn", icon: brandIcon(LINKEDIN_PATH, 13) },
    d.leetcode && { href: d.leetcode, label: "LeetCode", icon: lucide("code", "w-4 h-4") },
  ].filter(Boolean);

  const bgImg = h("img", { src: "/locus_japanese_card_bg.jpg", alt: "", className: "jp-card-bg-img" });
  const enso = h("div", { className: "jp-card-enso-layer" }, ENSO());
  const photo = h(
    "div",
    { className: "jp-card-photo-wrapper", style: { display: "flex", alignItems: "center", justifyContent: "center" } },
    h(
      "div",
      {
        className: "jp-card-photo-frame",
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, rgba(201, 154, 58, 0.25) 0%, rgba(16, 39, 52, 0.95) 100%)",
        },
      },
      h("span", { style: { fontSize: "56px", color: "#f5d78e", filter: "drop-shadow(0 0 16px rgba(201, 154, 58, 0.6))" } }, "⛩"),
    ),
  );
  const body = h(
    "div",
    { className: "jp-card-body", style: { maxWidth: "420px", margin: "0 auto" } },
    h("div", { className: "jp-card-bg-layer", "aria-hidden": "true" }, bgImg, h("div", { className: "jp-card-bg-scrim" })),
    h("div", { className: "jp-card-frame-border", "aria-hidden": "true" }),
    ["tl", "tr", "bl", "br"].map((c) => h("div", { className: `jp-card-corner jp-card-corner--${c}`, "aria-hidden": "true" })),
    h(
      "header",
      { className: "jp-card-header" },
      h(
        "div",
        { className: "jp-card-brand" },
        h("span", { className: "jp-card-brand-kanji", "aria-hidden": "true" }, "創"),
        h("div", { className: "jp-card-brand-labels" }, h("span", { className: "jp-card-brand-title" }, "MOOSA")),
      ),
      h("div", { className: "jp-card-num-box" }, h("span", { className: "jp-card-num-prefix" }, "№"), h("span", { className: "jp-card-num-val" }, "01")),
    ),
    h(
      "div",
      { className: "jp-card-header-divider", "aria-hidden": "true" },
      h("span", { className: "jp-card-divider-half" }),
      h("span", { className: "jp-card-divider-diamond" }, "◆"),
      h("span", { className: "jp-card-divider-half" }),
    ),
    h(
      "div",
      { className: "jp-card-portrait-stage" },
      enso,
      h("div", { className: "jp-card-hanko-seal", title: "Moosa Certified", "aria-hidden": "true" }, h("span", null, "匠")),
      photo,
    ),
    h(
      "footer",
      { className: "jp-card-info" },
      h("div", { className: "jp-card-role-box" }, h("span", { className: "jp-card-role-tag" }, d.role)),
      h("h3", { className: "jp-card-name" }, d.name),
      h("p", { style: { margin: "4px 0 0", fontSize: "12px", color: "rgba(239, 228, 205, 0.7)", textAlign: "center" } }, d.institution),
      h("div", { className: "jp-card-brushstroke-wrap", "aria-hidden": "true" }, RED_STROKE()),
      h(
        "div",
        { className: "jp-card-footer-bar" },
        h("div", { className: "jp-card-emblem-wrap", title: "Developer Emblem" }, KAMON()),
        socials.length > 0 &&
          h(
            "div",
            { className: "jp-card-socials", "aria-label": "Contact channels" },
            socials.map((s) => {
              const mail = s.href.startsWith("mailto:");
              return h(
                "a",
                {
                  href: s.href,
                  target: mail ? undefined : "_blank",
                  rel: mail ? undefined : "noopener noreferrer",
                  className: "jp-card-social-link",
                  "aria-label": `${s.label} of ${d.name}`,
                  onClick: (e) => e.stopPropagation(),
                },
                s.icon,
              );
            }),
          ),
      ),
    ),
  );

  const card = h(
    "article",
    { className: "jp-card-container", tabIndex: 0, role: "region", "aria-label": `Developer profile card for ${d.name}` },
    body,
  );

  const setHover = (on) => {
    const dur = prefersReducedMotion() ? 0 : 1;
    if (gsap && typeof gsap.to === "function") {
      gsap.to(body, { y: on ? -12 : 0, duration: 0.55 * dur, ease: EASE, overwrite: "auto" });
      gsap.to(bgImg, { scale: on ? 1.03 : 1, duration: 0.5 * dur, ease: EASE, overwrite: "auto" });
      gsap.to(enso, { scale: on ? 1.05 : 1, rotate: on ? 2 : 0, duration: 0.5 * dur, ease: EASE, overwrite: "auto" });
      gsap.to(photo, { y: on ? -5 : 0, duration: 0.55 * dur, ease: EASE, overwrite: "auto" });
    }
  };
  scope.on(card, "mouseenter", () => setHover(true));
  scope.on(card, "mouseleave", () => setHover(false));
  scope.on(card, "focus", () => setHover(true));
  scope.on(card, "blur", () => setHover(false));
  scope.add(() => gsap && typeof gsap.killTweensOf === "function" && gsap.killTweensOf([body, bgImg, enso, photo]));
  return card;
}

export default function developer({ scope, path }) {
  return h(
    "main",
    { className: "fullscreen-page-overlay dev-page-root" },
    h("div", { className: "fullscreen-page-ambience", "aria-hidden": "true" }),
    h("div", { className: "dev-ambient-glow dev-ambient-glow--top", "aria-hidden": "true" }),
    h("div", { className: "dev-ambient-glow dev-ambient-glow--bottom", "aria-hidden": "true" }),
    h("span", { className: "dev-page-watermark", "aria-hidden": "true" }, "匠"),
    h("div", { className: "dev-page-rail dev-page-rail--left", "aria-hidden": "true" }),
    h("div", { className: "dev-page-rail dev-page-rail--right", "aria-hidden": "true" }),
    festivalNavbar(scope, path),
    h(
      "section",
      { className: "fullscreen-page-scroll" },
      h(
        "div",
        { className: "dev-page-container", style: { padding: "60px 20px" } },
        h(
          "header",
          { className: "dev-page-hero", style: { textAlign: "center", marginBottom: "40px" } },
          h("div", { style: { color: "#c99a3a", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" } }, "EXECUTIVE PROFILE"),
          h("h1", { className: "dev-page-title pt-2", style: { fontSize: "36px", color: "#efe4cd", margin: "0 0 10px" } }, "Moosa · ", h("em", { style: { color: "#c99a3a", fontStyle: "normal" } }, "Full-Stack Developer")),
          h("p", { style: { fontSize: "15px", color: "rgba(239, 228, 205, 0.75)", maxWidth: "600px", margin: "0 auto" } }, "Information Technology undergraduate at GNDEC Ludhiana · LeetCode 150+ DSA Practitioner · National & International Hackathon Finalist"),
        ),
        h(
          "div",
          { className: "dev-page-grid-wrapper", style: { display: "flex", justifyContent: "center" } },
          DEVELOPERS.map((d) => developerCard(scope, d)),
        ),
      ),
      siteFooter(),
    ),
  );
}
