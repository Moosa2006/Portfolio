import { h, prefersReducedMotion } from "../core/dom.js";
import { DESTINATIONS, openExplore } from "../core/nav.js";


const gsap = window.gsap;

/* ---------------- Imperial passage (sliding painted doors) ---------------- */

let passage = null;
let passageTitle = null;
let passageStatus = null;
let passageReturn = null;
let timeline = null;

function door(side) {
  return h(
    "div",
    { className: `passage-door passage-door-${side}`, "aria-hidden": "true" },
    h(
      "div",
      { className: "passage-painting" },
      h("span", { className: "passage-sun" }),
      h("div", { className: "passage-cloud passage-cloud-one" }),
      h("div", { className: "passage-cloud passage-cloud-two" }),
      h("img", { className: "ink-dragon", src: PASSAGE_DRAGON, alt: "", width: 1000, height: 820, decoding: "async", draggable: false }),
      h("span", { className: "passage-inscription" }, "SOFTWARE", h("br"), "ENGINEER"),
      h("span", { className: "passage-stamp" }, "MOOSA"),
      h("div", { className: "passage-petals" }, [0, 1, 2, 3, 4].map(() => h("i"))),
    ),
    h("span", { className: "passage-handle" }),
  );
}

const PASSAGE_DRAGON = "/art/passage-dragon.webp";

export function createPassage() {
  const preload = new Image();
  preload.src = PASSAGE_DRAGON;
  preload.decode?.().catch(() => {});
  passageTitle = h("strong", null, "The sanctuary");
  passageStatus = h("span", { className: "passage-status" }, "Unfolding your next chapter…");
  passage = h(
    "div",
    {
      className: "imperial-passage",
      "data-phase": "idle",
      "aria-hidden": "true",
      tabIndex: -1,
      onKeydown: (e) => {
        const phase = passage.dataset.phase;
        if (phase !== "idle" && phase !== "delayed" && e.key === "Tab") e.preventDefault();
      },
    },
    door("left"),
    door("right"),
    h(
      "div",
      { className: "passage-seal", role: "status", "aria-live": "polite" },
      h("span", { className: "passage-kicker" }, "MOOSA · SOFTWARE ENGINEER PORTFOLIO"),
      passageTitle,
      passageStatus,
    ),
  );
  return passage;
}

function setPhase(phase) {
  passage.dataset.phase = phase;
  passage.setAttribute("aria-hidden", String(phase === "idle"));
  passageStatus.textContent =
    phase === "delayed" ? "Taking a little longer than expected…" : "Unfolding your next chapter…";
  if (phase === "delayed" && !passageReturn) {
    passageReturn = h("button", { type: "button", onClick: () => hidePassage() }, "Return to the page");
    passage.querySelector(".passage-seal").appendChild(passageReturn);
  } else if (phase !== "delayed" && passageReturn) {
    passageReturn.remove();
    passageReturn = null;
  }
}

export function passagePhase() {
  return passage?.dataset.phase ?? "idle";
}

export function closePassage(title) {
  const reduced = prefersReducedMotion();
  passageTitle.textContent = title;
  setPhase("closing");
  timeline?.kill();
  gsap.set(passage, { visibility: "visible", pointerEvents: "auto" });
  passage.focus({ preventScroll: true });
  return new Promise((resolve) => {
    timeline = gsap
      .timeline()
      .fromTo(
        passage.querySelector(".passage-door-left"),
        { x: 0, xPercent: -102 },
        { x: 0, xPercent: 0, duration: reduced ? 0.12 : 0.48, ease: "power3.inOut" },
        0,
      )
      .fromTo(
        passage.querySelector(".passage-door-right"),
        { x: 0, xPercent: 102 },
        { x: 0, xPercent: 0, duration: reduced ? 0.12 : 0.48, ease: "power3.inOut" },
        0,
      )
      .fromTo(
        passage.querySelector(".passage-seal"),
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: reduced ? 0.08 : 0.18 },
        "-=.1",
      )
      .call(() => {
        passage.focus({ preventScroll: true });
        setPhase("loading");
        resolve();
      });
  });
}

export function markPassageDelayed() {
  if (passagePhase() === "loading") setPhase("delayed");
}

export function openPassage() {
  const reduced = prefersReducedMotion();
  setPhase("opening");
  timeline?.kill();
  return new Promise((resolve) => {
    timeline = gsap
      .timeline({
        onComplete: () => {
          gsap.set(passage, { visibility: "hidden", pointerEvents: "none" });
          setPhase("idle");
          resolve();
        },
      })
      .to(passage.querySelector(".passage-seal"), { opacity: 0, duration: 0.12 })
      .to(
        passage.querySelector(".passage-door-left"),
        { xPercent: -102, duration: reduced ? 0.12 : 0.65, ease: "power3.inOut" },
        "-=.06",
      )
      .to(
        passage.querySelector(".passage-door-right"),
        { xPercent: 102, duration: reduced ? 0.12 : 0.65, ease: "power3.inOut" },
        "<",
      );
  });
}

function hidePassage() {
  timeline?.kill();
  gsap.set(passage, { visibility: "hidden", pointerEvents: "none" });
  setPhase("idle");
  window.dispatchEvent(new Event("moosa:passage-reset"));
}

/* ---------------- Directory dialog + home shortcuts ---------------- */

let dialog = null;

export function createShortcuts() {
  const explore = h(
    "button",
    {
      className: "explore-crest",
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": "false",
      onClick: openExplore,
    },
    h("span", { className: "explore-symbol", "aria-hidden": "true" }, "✦"),
    " Explore Portfolio",
  );
  const nav = h(
    "nav",
    { className: "sanctuary-shortcuts", "aria-label": "Quick portfolio navigation" },
    h("a", { className: "shortcut-events", href: "/projects" }, "Projects ", h("span", { "aria-hidden": "true" }, "↗")),
    explore,
  );
  nav._explore = explore;
  return nav;
}

export function initDirectory({ getPath, shortcuts }) {
  let returnFocus = null;
  const close = () => {
    if (!dialog) return;
    const d = dialog;
    dialog = null;
    d.close();
    d.remove();
    shortcuts._explore.setAttribute("aria-expanded", "false");
    returnFocus?.focus?.({ preventScroll: true });
  };
  const open = () => {
    if (dialog) return;
    returnFocus = document.activeElement;
    const path = getPath();
    dialog = h(
      "dialog",
      {
        className: "destination-directory",
        "aria-labelledby": "directory-title",
        "data-lenis-prevent": "true",
        onCancel: (e) => {
          e.preventDefault();
          close();
        },
        onClick: (e) => {
          if (e.target === e.currentTarget) close();
        },
      },
      h(
        "div",
        { className: "directory-inner" },
        h("button", { className: "directory-close", type: "button", onClick: close, "aria-label": "Close destination menu" }, "×"),
        h("span", { className: "directory-kicker" }, "THE IMPERIAL DIRECTORY"),
        h("h2", { id: "directory-title" }, "Choose your ", h("em", null, "destination.")),
        h("p", null, "Go straight to what brings you here. The sanctuary will be waiting."),
        h(
          "nav",
          { className: "directory-grid", "aria-label": "Portfolio destinations" },
          DESTINATIONS.map((d) =>
            h(
              "a",
              { href: d.href, "aria-current": path === d.href ? "page" : undefined },
              h("span", { className: "directory-number" }, d.mark),
              h("span", null, h("strong", null, d.title), h("small", null, d.detail)),
              h("span", { "aria-hidden": "true" }, "↗"),
            ),
          ),
        ),
        h(
          "div",
          { className: "directory-footer" },
          h("a", { href: "/contact" }, "Get in touch / Connect ↗"),
          h("button", { type: "button", onClick: close }, "Continue exploring"),
        ),
      ),
    );
    shortcuts.after(dialog);
    dialog.showModal();
    shortcuts._explore.setAttribute("aria-expanded", "true");
  };
  window.addEventListener("moosa:explore", open);
  window.addEventListener("moosa:navigating", close);
  return { close };
}

/* ---------------- Feedback prompt (events / schedule pages) ---------------- */

export function initFeedbackPrompt() {
  let el = null;
  let timer = 0;
  const dismiss = () => {
    el?.remove();
    el = null;
    try {
      sessionStorage.setItem("moosa_inquiry_dismissed", "true");
      localStorage.setItem("moosa_inquiry_snooze_until", String(Date.now() + 2592e5));
    } catch {}
  };
  const icon = (d, cls) =>
    h(
      "svg",
      { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", class: cls, "aria-hidden": "true" },
      ...d.map((p) => h("path", { d: p })),
    );
  const build = () =>
    h(
      "aside",
      {
        "aria-label": "Feedback prompt",
        className:
          "fixed bottom-4 right-4 z-40 max-w-[340px] w-[calc(100vw-2rem)] rounded-2xl bg-[#0d131f]/95 border border-[#c99a3a]/40 shadow-2xl backdrop-blur-md p-3.5 sm:p-4 text-[#efe4cd] animate-slide-up flex items-start gap-3",
      },
      h(
        "div",
        { className: "w-9 h-9 rounded-xl bg-[#c99a3a]/15 border border-[#c99a3a]/30 flex items-center justify-center text-[#e8c66a] shrink-0 mt-0.5" },
        icon(["M7.9 20A9 9 0 1 0 4 16.1L2 22Z", "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", "M12 17h.01"], "lucide w-5 h-5"),
      ),
      h(
        "div",
        { className: "flex-1 min-w-0 space-y-1" },
        h(
          "div",
          { className: "flex items-center justify-between" },
          h("p", { className: "font-serif text-xs font-semibold text-[#efe4cd]" }, "Have a question or feedback?"),
          h(
            "button",
            { type: "button", onClick: dismiss, "aria-label": "Dismiss feedback prompt", className: "text-[#829b91] hover:text-[#efe4cd] transition p-0.5 rounded cursor-pointer" },
            icon(["M18 6 6 18", "m6 6 12 12"], "lucide w-3.5 h-3.5"),
          ),
        ),
        h("p", { className: "text-[11px] text-[#829b91] font-serif leading-tight" }, "Let us know if you need assistance or want to share your thoughts."),
        h(
          "div",
          { className: "pt-1.5 flex items-center justify-between" },
          h(
            "a",
            { href: "/contact", onClick: dismiss, className: "inline-flex items-center gap-1 text-[11px] font-serif font-bold text-[#e8c66a] hover:underline" },
            h("span", null, "Open Contact"),
            icon(["M5 12h14", "m12 5 7 7-7 7"], "lucide w-3 h-3 text-[#c99a3a]"),
          ),
          h("button", { type: "button", onClick: dismiss, className: "text-[10px] text-[#829b91] hover:text-slate-300 font-serif cursor-pointer" }, "Not now"),
        ),
      ),
    );

  return function update(path) {
    clearTimeout(timer);
    const eligible = path.startsWith("/projects") || path.startsWith("/events") || path.startsWith("/journey") || path.startsWith("/schedule");
    if (!eligible) {
      el?.remove();
      el = null;
      return;
    }
    let snoozed = false;
    try {
      snoozed =
        sessionStorage.getItem("moosa_inquiry_dismissed") === "true" ||
        Number(localStorage.getItem("moosa_inquiry_snooze_until") || 0) > Date.now();
    } catch {}
    if (snoozed || el) return;
    timer = setTimeout(() => {
      el = build();
      document.body.appendChild(el);
    }, 2000);
  };
}
