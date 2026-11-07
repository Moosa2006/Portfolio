import { h, fromHTML, Scope } from "../core/dom.js";
import { getSoundState, subscribeSound, toggleSound } from "../core/sound.js";

export function arrowIcon(diagonal = false) {
  return h(
    "svg",
    { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
    h("path", {
      d: diagonal ? "M5 19 19 5M5 5h14v14" : "M3 12h17m-6-6 6 6-6 6",
      stroke: "currentColor",
      "stroke-width": "1.3",
    }),
  );
}

export function destinationHero(kicker, title, subtitle) {
  return h(
    "header",
    { className: "dest-hero" },
    h("span", { className: "dest-kicker" }, kicker),
    h("h1", { className: "dest-title" }, title),
    subtitle ? h("p", { className: "dest-subtitle" }, subtitle) : null,
  );
}

export const DRAGON_SVG = `<svg class="ink-dragon CLASS" viewBox="0 0 1000 820" fill="none" aria-hidden="true"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path class="dragon-spine" pathLength="1" d="M790 240C810 375 595 402 465 325S235 315 264 455 615 466 641 579 460 733 299 646 144 615 69 734" stroke-width="49"></path><path d="M786 257C794 376 592 384 467 310S215 303 246 461 600 480 622 581 452 708 301 630 140 602 69 734" stroke-width="3" opacity=".6"></path><path d="M783 286l-24-22 1 39-29-18 3 38-37-17 11 35-39-12 18 30-44-6 23 27-44-8 23 29-46-14 14 29-42-18 10 31-36-29-2 32-34-28-3 29-33-27-8 32-26-18-14 34-19-12-19 33-12-5-12 35 13 1-5 30 18-7 10 32 18-16 17 30 20-22 23 24 16-25 32 19 11-28 30 24 18-23 27 27 17-23 33 29 12-18 35 28 8-14 25 29" stroke-width="8"></path><path d="M745 351q-25 32 15 77l42 15m-42-15 12 30m-12-30-18 24M332 329q-32-30-64-14l-32-26m32 26-39 8m39-8-12 29M566 516q31-30 64-7l32-17m-32 17 28 16m-28-16 5 30M374 670q-32 22-19 50l-31 23m31-23 9 34m-9-34 26 17" stroke-width="9"></path><path d="M98 703q-34 12-54 54 32-15 44-18" fill="currentColor" stroke-width="3"></path><g transform="translate(705 114) rotate(-12 75 110)"><path d="M57 164 36 148 45 126 20 113 44 101 25 78 53 81 42 53 71 66 72 37 92 62 112 42 117 74 148 62 141 93 169 91 151 115 155 141 126 158 109 185 79 173Z" fill="currentColor" stroke-width="6"></path><path d="M71 77 46 33 56 8M48 37 26 29M119 78 139 32 129 11M139 34 165 20" stroke-width="9"></path><path d="M68 101q20-14 40 2l31 24 30 4-3 27-43 6-28 21-30-24 8-22-19-20Z" fill="var(--dragon-paper, #e5dbc5)" stroke-width="5"></path><path d="m103 119 21 4-11 10Z" fill="currentColor" stroke-width="2"></path><path d="m143 146 17 1M97 160q20 15 42-4M129 163l-2 10m-13-7-3 13M64 107Q7 78 6 119T-42 151M110 157q12 52 57 25t78 3" stroke-width="4"></path></g><g stroke-width="2" opacity=".65"><path d="m759 313 19 14m-44 5 16 17m-45-6 15 20m-49-6 11 21m-47-13 7 23m-43-20 2 25m-39-24-3 23m-34-32-9 24m-28-37-12 25m-23-34-17 24M320 334l-8 30m-23-7-14 25m-9 0-22 11m7 15-21 15m25 9-17 21m27 0-11 25m31-6-8 29m34-19-2 27m37-22-4 28m37-22-3 26m39-23-4 29m38-25-1 30m38-21-5 29m37-17-9 26m34-7-12 24m27 6-19 20M605 628l16 17m-40-2 10 21m-44-4 5 24m-44-12-1 25m-36-18-9 22m-28-25-13 24m-25-29-15 24m-23-31-17 26"></path></g></g></svg>`;

export function dragon(className = "") {
  return fromHTML(DRAGON_SVG.replace("CLASS", className)).firstElementChild;
}

/** The "SOUND ON/OFF" seal; stays in sync with the global sound state. */
export function soundControl(scope, className = "") {
  const bars = h("span", { className: "sound-bars", "aria-hidden": "true" }, h("i"), h("i"), h("i"), h("i"));
  const label = h("span");
  const button = h("button", { type: "button" }, bars, label);
  const wrap = h("div", { className: "sound-control" }, button);
  let error = null;
  const sync = ({ enabled, status }) => {
    button.className = `sound-seal ${status === "playing" ? "is-playing" : ""} ${className}`;
    button.setAttribute("aria-pressed", String(enabled));
    button.setAttribute(
      "aria-label",
      status === "loading" ? "Cancel sound loading" : enabled ? "Mute sound" : "Enable sound",
    );
    button.setAttribute("aria-busy", String(status === "loading"));
    label.textContent = status === "loading" ? "LOADING SOUND" : `SOUND ${enabled ? "ON" : "OFF"}`;
    if (status === "error" && !error) {
      error = h("p", { className: "audio-error", role: "status" }, "Sound could not start. Tap to retry.");
      wrap.appendChild(error);
    } else if (status !== "error" && error) {
      error.remove();
      error = null;
    }
  };
  button.addEventListener("click", () => toggleSound());
  sync(getSoundState());
  scope.add(subscribeSound(sync));
  return wrap;
}

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/journey", label: "Journey" },
  { href: "/skills", label: "Skills" },
  { href: "/leadership", label: "Achievements" },
  { href: "/about", label: "About Me" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

function isNavActive(linkHref, pathname) {
  if (pathname === linkHref) return true;
  if (linkHref === "/projects" && (pathname.startsWith("/projects") || pathname.startsWith("/events"))) return true;
  if (linkHref === "/skills" && pathname === "/sponsors") return true;
  if (linkHref === "/journey" && (pathname === "/calendar" || pathname === "/schedule")) return true;
  if (linkHref === "/leadership" && (pathname.startsWith("/leadership") || pathname.startsWith("/committee") || pathname.startsWith("/committees"))) return true;
  if (linkHref === "/about" && (pathname === "/developer" || pathname === "/developers")) return true;
  return false;
}

/** The fixed portfolio navbar shown on every destination page. */
export function festivalNavbar(scope, pathname) {
  const header = h("header", { className: "site-header festival-page-navbar" });
  header.append(
    h(
      "a",
      { className: "brand", href: "/", "aria-label": "Moosa, back to Sanctuary" },
      h(
        "span",
        {
          className: "official-logo-crest",
          style: {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            border: "1px solid rgba(201, 154, 58, 0.5)",
            background: "rgba(201, 154, 58, 0.15)",
            color: "#e8c66a",
            fontSize: "16px",
          },
          "aria-hidden": "true",
        },
        "⛩",
      ),
      h("span", null, "MOOSA", h("small", null, "MOOSA · FULL-STACK & SYSTEMS DEVELOPER")),
    ),
    h(
      "nav",
      { className: "desktop-nav", "aria-label": "Main navigation" },
      NAV_LINKS.map((link) => {
        const active = isNavActive(link.href, pathname);
        return h(
          "a",
          {
            href: link.href,
            className: active ? "is-active" : "",
            style: active ? { color: "#f5d78e", borderColor: "#c99a3a" } : undefined,
          },
          link.label,
        );
      }),
    ),
    h(
      "div",
      { className: "header-actions", style: { display: "flex", alignItems: "center", gap: "14px" } },
      soundControl(scope, "navbar-sound-btn"),
      h(
        "a",
        {
          href: "/",
          className: "button",
          style: {
            minHeight: "40px",
            padding: "8px 16px",
            fontSize: "9px",
            gap: "8px",
            borderColor: "rgba(212, 175, 100, 0.4)",
            color: "#dfceb1",
          },
          "aria-label": "Return to 3D Sanctuary",
        },
        h("span", null, "⛩ Sanctuary"),
      ),
      h(
        "a",
        {
          href: "/contact",
          className: "button button-gold",
          style: { minHeight: "40px", padding: "8px 20px", fontSize: "9px", gap: "8px", fontWeight: "600" },
          "aria-label": "Contact & Connect",
        },
        h("span", null, "Connect"),
        " ",
        arrowIcon(true),
      ),
    ),
  );

  const toggle = h("button", {
    className: "menu-toggle",
    "aria-controls": "mobile-nav",
  });
  let menu = null;
  let menuScope = null;
  const setOpen = (open) => {
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close −" : "Menu +";
    if (open && !menu) {
      menuScope = new Scope();
      const close = () => setOpen(false);
      menu = h(
        "nav",
        { className: "mobile-nav", id: "mobile-nav", "aria-label": "Mobile navigation", style: { display: "flex" } },
        h("div", { className: "mobile-nav-sound" }, soundControl(menuScope, "navbar-sound-btn")),
        NAV_LINKS.map((link, i) =>
          h("a", { href: link.href, onClick: close }, h("span", null, `0${i + 1}`), link.label, arrowIcon(true)),
        ),
        h(
          "a",
          {
            href: "/",
            onClick: close,
            style: {
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 0",
              color: "#d4a964",
              borderBottom: "1px solid rgba(201, 154, 58, 0.2)",
            },
          },
          h("span", null, "⛩"),
          " Return to Sanctuary",
        ),
        h("a", { href: "/contact", className: "button button-gold", onClick: close, style: { marginTop: "18px" } }, "Get in Touch", " ", arrowIcon(true)),
      );
      header.appendChild(menu);
    } else if (!open && menu) {
      menuScope.dispose();
      menu.remove();
      menu = null;
    }
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  setOpen(false);
  header.appendChild(toggle);
  scope.add(() => setOpen(false));
  return header;
}

export function siteFooter(style = "margin-top:auto") {
  return h(
    "footer",
    { className: "site-footer", style },
    h("a", { className: "footer-brand", href: "/" }, "MOOSA ", h("span", null, "PORTFOLIO")),
    h("p", null, "Crafting immersive digital experiences. Built with passion & precision."),
    h(
      "div",
      null,
      h("a", { href: "/projects" }, "Projects"),
      h("a", { href: "/journey" }, "Journey"),
      h("a", { href: "/skills" }, "Skills"),
      h("a", { href: "/leadership" }, "Achievements"),
      h("a", { href: "/about" }, "About Me"),
      h("a", { href: "/gallery" }, "Gallery"),
      h("a", { href: "/contact" }, "Contact"),
    ),
    h(
      "div",
      { className: "footer-bottom" },
      h("span", null, "© 2026 MOOSA · ALL RIGHTS RESERVED"),
      h("a", { href: "/" }, "Back to top ↑"),
    ),
  );
}

/** Shell shared by the fullscreen destination pages (about, contact, sponsors, ...). */
export function destinationShell(scope, { pathname, mainClass, content, before = [] }) {
  return h(
    "main",
    { className: mainClass },
    h("div", { className: "fullscreen-page-ambience", "aria-hidden": "true" }),
    before,
    festivalNavbar(scope, pathname),
    h("section", { className: "fullscreen-page-scroll" }, content, siteFooter()),
  );
}
