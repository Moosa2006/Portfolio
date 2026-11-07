import { h, clear, prefersReducedMotion } from "../core/dom.js";
import {
  CHAPTERS,
  DOORS,
  FALLS_START,
  ROOM_LEAVE,
  ROOM_START,
  angleDelta,
  doorAngle,
  doorAtTravel,
  doorTravel,
  journey,
  onFrame,
  resetJourney,
} from "../core/store.js";
import { getSoundState, playCue, setSoundEnabled } from "../core/sound.js";
import { navigate } from "../core/nav.js";
import { arrowIcon, dragon, soundControl } from "../ui/common.js";
import { initMagnetic } from "../ui/magnetic.js";
import { initClickFx, initInkCursor } from "../ui/effects.js";

export const title = "Moosa | Full-Stack Developer & Problem Solver";

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

let preloaderShown = false;

/* --------------------------- painted fallback ----------------------------- */

function buildFallbackWorld(scope, paused) {
  const el = h(
    "div",
    {
      className: "fallback-world forest-fallback",
      "data-quality": "D",
      "data-chapter": "forest",
      role: "img",
      "aria-label": "Evening forest stairs, a closed timber sanctuary, and a secluded waterfall.",
    },
    h("img", { className: "fallback-view view-forest", src: "/art/forest-stairs.webp", alt: "", width: 1920, height: 1080, loading: "eager", decoding: "async" }),
    h("img", { className: "fallback-view view-falls", src: "/art/sacred-waterfall.webp", alt: "", width: 1920, height: 1080, loading: "lazy", decoding: "async" }),
    h(
      "div",
      { className: "fallback-view view-room fallback-timber-room", "aria-hidden": "true" },
      h("div", { className: "fallback-room-ceiling" }),
      h("div", { className: "fallback-room-floor" }),
    ),
  );
  scope.add(
    onFrame(() => {
      el.style.setProperty("--world-scale", String(1 + (paused ? 0 : 0.08 * journey.travel)));
      el.dataset.chapter = journey.travel < 0.5 ? "forest" : journey.travel < FALLS_START ? "room" : "falls";
    }, 10),
  );
  return el;
}

/* ------------------------------- preloader -------------------------------- */

function buildPreloader(scope, { getReady, getFailed, reduced, onComplete, trackLoading }) {
  const counter = h("span", { className: "preloader-counter-num" }, "0");
  const fill = h("div", { className: "preloader-bar-fill", style: { width: "0%" } });
  const track = h(
    "div",
    {
      className: "preloader-bar-track",
      role: "progressbar",
      "aria-label": "Loading the festival",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": "0",
    },
    fill,
  );
  const status = h("span", { className: "preloader-status-main", "aria-live": "polite" }, "Opening the gates");
  let finished = false;
  const complete = () => {
    if (finished) return;
    finished = true;
    onComplete();
  };
  const el = h(
    "div",
    { className: "preloader", "data-route-loading": "true" },
    h(
      "div",
      { className: "preloader-stage" },
      h("div", { className: "preloader-ambient-glow", "aria-hidden": "true" }),
      h(
        "div",
        { className: "preloader-content" },
        h(
          "div",
          { className: "preloader-logo-wrap", style: { textAlign: "center", marginBottom: "0.5rem" } },
          h("div", { className: "preloader-logo-ambient", "aria-hidden": "true" }),
          h(
            "div",
            { className: "preloader-brand-container", style: { display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" } },
            h("span", { style: { fontSize: "clamp(26px, 4vw, 38px)", color: "#e8c66a", textShadow: "0 0 24px rgba(232,198,106,0.6)" }, "aria-hidden": "true" }, "⛩"),
            h(
              "h1",
              {
                className: "preloader-title",
                style: {
                  fontFamily: "Cinzel, Georgia, serif",
                  fontSize: "clamp(38px, 6vw, 58px)",
                  letterSpacing: "0.18em",
                  color: "#f8ebd2",
                  margin: "0",
                  textShadow: "0 0 32px rgba(232, 198, 106, 0.5), 0 2px 10px rgba(0,0,0,0.8)",
                  fontWeight: "700",
                },
              },
              "MOOSA",
            ),
          ),
        ),
        h(
          "div",
          { className: "preloader-meta" },
          h("div", { className: "preloader-counter", "aria-hidden": "true" }, counter, h("span", { className: "preloader-counter-pct" }, "%")),
          track,
          h(
            "div",
            { className: "preloader-status" },
            h("span", { className: "preloader-status-sub" }, "Full-Stack Developer · DSA · Systems & ML"),
            status,
          ),
        ),
      ),
    ),
    h("button", { type: "button", className: "preloader-skip", onClick: complete }, "Skip intro ↗"),
    h("div", { className: "preloader-sound-btn" }, soundControl(scope, "")),
  );

  let fraction = 0;
  let pending = 0;
  let files = 0;
  let lastChange = performance.now();
  scope.add(
    trackLoading((s) => {
      fraction = s.fraction;
      pending = s.pending;
      files = s.totalFiles;
      lastChange = performance.now();
      if (!done) status.textContent = s.activity;
    }),
  );

  let shown = 0;
  let last = -1;
  let done = false;
  let raf = 0;
  let wasReady = false;
  const step = () => {
    const now = performance.now();
    const ready = getReady();
    if (ready && !wasReady) {
      wasReady = true;
      lastChange = now;
    }
    if (!done) {
      const quiet = now - lastChange;
      done = getFailed() || (ready && pending === 0 && quiet > (files ? 400 : 1500)) || (ready && quiet > 2e4);
    }
    const target = done ? 100 : Math.min(95, 100 * fraction);
    const eased = reduced ? target : shown + (target - shown) * 0.12;
    shown = Math.max(shown, target - eased < 0.5 ? target : eased);
    const value = Math.floor(shown);
    if (value !== last) {
      last = value;
      counter.textContent = String(value);
      fill.style.width = `${value}%`;
      track.setAttribute("aria-valuenow", String(value));
    }
    if (value >= 100) {
      status.textContent = "Welcome to the Realm";
      setTimeout(() => {
        if (finished) return;
        gsap.to(el, { opacity: 0, duration: reduced ? 0.15 : 0.55, ease: "power2.out", onComplete: complete });
      }, 150);
      return;
    }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  scope.add(() => {
    cancelAnimationFrame(raf);
    gsap.killTweensOf(el);
  });
  return el;
}

/* ------------------------------ reveal card ------------------------------- */

function buildRevealCard(scope) {
  const card = h("article", { className: "reveal-card", "aria-labelledby": "reveal-title", "data-lenis-prevent": "true" });
  let restoreSound = false;
  let onKey = null;
  const close = () => {
    if (restoreSound) setSoundEnabled(true);
    restoreSound = false;
    if (onKey) window.removeEventListener("keydown", onKey);
    onKey = null;
    render(false);
    requestAnimationFrame(() => card.querySelector(".reveal-poster")?.focus({ preventScroll: true }));
  };
  const render = (playing) => {
    clear(card);
    card.className = `reveal-card${playing ? " is-playing" : ""}`;
    card.append(
      h("span", { className: "reveal-kicker" }, "SOFTWARE ARCHITECT & SYSTEMS PRACTITIONER"),
      h("h2", { id: "reveal-title" }, "Moosa · Engineering Portfolio"),
      h("p", null, "Full-Stack Web Architect · Algorithmic Rigor · Cloud Automation."),
    );
    if (playing) {
      card.append(
        h(
          "div",
          {
            className: "reveal-video",
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "2rem",
              background: "linear-gradient(135deg, #0b1119 0%, #162232 100%)",
              border: "1px solid rgba(201, 154, 58, 0.4)",
              borderRadius: "16px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
              textAlign: "left",
            },
          },
          h(
            "div",
            null,
            h(
              "span",
              {
                style: {
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "999px",
                  background: "rgba(201, 154, 58, 0.15)",
                  border: "1px solid rgba(201, 154, 58, 0.4)",
                  color: "#f5d78e",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                },
              },
              "Core Engineering Manifesto",
            ),
            h(
              "h3",
              {
                style: {
                  fontFamily: "var(--font-serif, Georgia, serif)",
                  fontSize: "24px",
                  color: "#efe4cd",
                  margin: "0 0 12px",
                },
              },
              "High-Impact Engineering with Rigorous Fundamentals",
            ),
            h(
              "p",
              {
                style: {
                  color: "rgba(239, 228, 205, 0.82)",
                  fontSize: "14px",
                  lineHeight: "1.7",
                  margin: "0 0 16px",
                },
              },
              "Specializing in production-grade full-stack architecture, clean asynchronous data pipelines, and algorithmic problem-solving. From high-throughput APIs and verifiable credential engines to low-latency logistics synchronization, every system is engineered for resilience, security, and developer clarity.",
            ),
            h(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "12px",
                  marginTop: "16px",
                },
              },
              [
                { label: "Full-Stack Web", val: "Next.js 15, React 19, TypeScript" },
                { label: "Backend & Systems", val: "Node.js, Express, PostgreSQL, Prisma" },
                { label: "Algorithms & DSA", val: "150+ LeetCode (C++ & Python)" },
                { label: "DevOps & Cloud", val: "Linux / Bash, Docker, CI/CD" },
              ].map((pill) =>
                h(
                  "div",
                  {
                    style: {
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "rgba(0, 0, 0, 0.35)",
                      border: "1px solid rgba(201, 154, 58, 0.2)",
                    },
                  },
                  h("div", { style: { fontSize: "11px", color: "#c99a3a", fontWeight: "600" } }, pill.label),
                  h("div", { style: { fontSize: "13px", color: "#ece5d6", marginTop: "2px" } }, pill.val),
                ),
              ),
            ),
          ),
          h(
            "div",
            { className: "reveal-player-actions", style: { marginTop: "20px" } },
            h("button", { type: "button", onClick: close }, "Back to Sanctuary"),
            h("a", { href: "/projects" }, "Explore All Projects ↗"),
            h("a", { href: "https://github.com/Moosa2006", target: "_blank", rel: "noopener noreferrer" }, "GitHub Profile ↗"),
          ),
        ),
      );
      return;
    }
    const flames = h(
      "svg",
      { className: "reveal-flames", viewBox: "0 0 640 360", fill: "none" },
      h("path", { d: "M0 360c60-72 25-100 78-145-20 69 71 47 56 123 12-63 54-96 46-156 64 71 11 128 84 178Z" }),
      h("path", { d: "M640 360c-75-42-27-111-82-155 11 48-48 40-48 89-14-55-47-76-20-157-102 87-44 149-91 223Z" }),
      h("path", { d: "M540 359c-61-45-4-84-41-125m-362 124c42-45-16-62-2-95" }),
    );
    card.append(
      h(
        "button",
        {
          type: "button",
          className: "reveal-poster",
          "aria-label": "Explore Moosa Engineering Manifesto",
          onClick: () => {
            restoreSound = getSoundState().enabled;
            if (restoreSound) setSoundEnabled(false);
            onKey = (e) => {
              if (e.key === "Escape") close();
            };
            window.addEventListener("keydown", onKey);
            render(true);
          },
        },
        h(
          "span",
          { className: "reveal-poster-art", "aria-hidden": "true" },
          h("span", { className: "reveal-sun" }),
          flames,
          dragon("reveal-dragon"),
          h("span", { className: "reveal-embers" }, Array.from({ length: 8 }, () => h("i"))),
          h("span", { className: "reveal-poster-brand" }, "MOOSA ", h("span", null, "PORTFOLIO")),
          h("span", { className: "reveal-poster-note" }, "CODE ARCHITECTURE & DESIGN"),
        ),
        h(
          "span",
          { className: "reveal-play", "aria-hidden": "true" },
          h("svg", { viewBox: "0 0 24 24", fill: "currentColor" }, h("path", { d: "m9 5 11 7-11 7Z" })),
        ),
        h("span", { className: "reveal-poster-caption" }, "Explore Architecture"),
      ),
    );
  };
  render(false);
  scope.add(() => {
    if (onKey) window.removeEventListener("keydown", onKey);
    if (restoreSound) setSoundEnabled(true);
  });
  return card;
}

/* ------------------------------- the page --------------------------------- */

export default async function home(ctx) {
  const { scope } = ctx;
  const reduced = prefersReducedMotion();
  document.documentElement.dataset.motion = reduced ? "paused" : "playing";
  resetJourney();

  let failed = false;
  let ready = false;
  let doneLoading = preloaderShown;
  let world = null;
  let lenis = null;
  let doorBusy = false;
  let doorWatch = null;

  /* scroll helpers */
  const journeyEl = h("section", {
    id: "journey",
    className: "journey forest-journey",
    "data-phase": "0",
    "data-fallback": "false",
    "data-leaving": "false",
    "aria-labelledby": "hero-title",
  });
  const scrollToTravel = (p, immediate = false) => {
    immediate = immediate || prefersReducedMotion();
    if (!journeyEl.isConnected) return;
    const top = journeyEl.offsetTop + Math.max(0, Math.min(1, p)) * (journeyEl.offsetHeight - innerHeight);
    if (lenis) lenis.scrollTo(top, { immediate, duration: 2.2 });
    else window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
  };

  /* door opening sequence */
  const openDoor = (id) => {
    const index = DOORS.findIndex((d) => d.id === id);
    if (index < 0 || doorBusy) return;
    if (failed) {
      playCue("clack");
      navigate(DOORS[index].href);
      return;
    }
    doorBusy = true;
    scrollToTravel(doorTravel(index), true);
    doorWatch = onFrame(() => {
      if (journey.roomDoor !== index) {
        doorWatch?.();
        doorWatch = null;
        doorBusy = false;
        return;
      }
      if (!journey.doorAligned) return;
      doorWatch?.();
      doorWatch = null;
      journey.openDoor = index;
      playCue("clack");
      gsap.to(journey, {
        doorAmount: 1,
        duration: reduced ? 0 : 0.85,
        ease: "power2.inOut",
        onComplete: () => {
          navigate(DOORS[index].href);
          gsap.to(journey, {
            doorAmount: 0,
            delay: 0.35,
            duration: reduced ? 0 : 0.7,
            onComplete: () => {
              journey.openDoor = -1;
              doorBusy = false;
            },
          });
        },
      });
    });
  };
  scope.add(() => {
    doorWatch?.();
    gsap.killTweensOf(journey, "doorAmount");
  });

  /* journey overlay UI */
  const sticky = h("div", { className: "hero-sticky" });
  journeyEl.appendChild(sticky);
  const intro = h(
    "div",
    { className: "forest-intro" },
    h(
      "div",
      { className: "hero-eyebrow-wrap", style: { marginBottom: "8px" } },
      h(
        "p",
        {
          className: "hero-eyebrow",
          style: {
            fontFamily: "Cinzel, Georgia, serif",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            fontSize: "clamp(10px, 1.2vw, 13px)",
            color: "#d4af64",
            margin: "0",
            textShadow: "0 0 16px rgba(212,175,100,0.4)",
          },
        },
        "Software Engineer · Systems & Algorithms",
      ),
    ),
    h(
      "h1",
      {
        id: "hero-title",
        style: {
          fontFamily: "Cinzel, Georgia, serif",
          fontSize: "clamp(48px, 9vw, 96px)",
          letterSpacing: "0.14em",
          color: "#f8ebd2",
          lineHeight: "1.05",
          margin: "0 0 12px",
          textShadow: "0 0 36px rgba(232, 198, 106, 0.45), 0 4px 16px rgba(0,0,0,0.9)",
          fontWeight: "700",
        },
      },
      "MOOSA",
    ),
    h(
      "p",
      {
        className: "hero-tagline",
        style: {
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: "clamp(12px, 1.4vw, 15px)",
          color: "#d8cfbd",
          maxWidth: "560px",
          margin: "0 auto 22px",
          lineHeight: "1.6",
          textShadow: "0 2px 8px rgba(0,0,0,0.85)",
        },
      },
      "Building scalable full-stack web apps, automating Linux systems, and solving complex algorithmic problems.",
    ),
    h(
      "div",
      { className: "hero-actions" },
      h(
        "button",
        { className: "forest-enter", type: "button", onClick: () => scrollToTravel(failed ? ROOM_START : 0.4, failed) },
        "Enter the sanctuary ",
        h("span", { "aria-hidden": "true" }, "↗"),
      ),
      h(
        "button",
        { className: "hero-scroll-cue", type: "button", onClick: () => scrollToTravel(failed ? ROOM_START : 0.2, failed) },
        "Scroll to explore ",
        h("span", { "aria-hidden": "true" }, "↓"),
      ),
      h("a", { className: "hero-login", href: "/contact" }, "Contact"),
    ),
  );
  const captionLabel = h("span");
  const captionDetail = h("p");
  const caption = h("div", { className: "journey-caption is-intro", "aria-live": "polite" }, captionLabel, captionDetail);
  const progress = h("div", { className: "journey-progress", "aria-hidden": "true" }, h("i"));
  const scrollHint = h("span", { className: "journey-scroll" });
  const slot = h("div", { style: "display:contents" });
  sticky.append(intro, caption, slot, progress, scrollHint);

  const ui = { phase: -1, leaving: null, aligned: null, opening: null, door: -1, fallback: null };
  let compass = null;
  let revealScope = null;

  const turn = (dir) => {
    if (journey.openDoor >= 0) return;
    const t = (journey.roomDoor + (dir === "left" ? 1 : -1) + DOORS.length) % DOORS.length;
    scrollToTravel(doorTravel(t), true);
  };

  const buildCompass = () => {
    const door = DOORS[ui.door] || DOORS[0];
    const action = h(
      "button",
      { className: "door-action", disabled: !ui.aligned || ui.opening, onClick: () => openDoor(door.id) },
      h("small", null, door.mark, " / ", door.subtitle),
      h("strong", null, door.title),
      h("span", null, ui.opening ? "Entering…" : ui.aligned ? "Open this door ↗" : "Turning to this door…"),
    );
    return h(
      "div",
      { className: "room-compass" },
      h("p", null, "Click a door to enter · scroll or use arrows to turn"),
      h(
        "div",
        null,
        h(
          "button",
          { className: "compass-turn compass-turn-left", onClick: () => turn("left"), disabled: ui.opening, "aria-label": "Turn left to next destination door" },
          arrowIcon(),
        ),
        action,
        h(
          "button",
          { className: "compass-turn", onClick: () => turn("right"), disabled: ui.opening, "aria-label": "Turn right to previous destination door" },
          arrowIcon(),
        ),
      ),
    );
  };

  const buildFallbackDoors = () =>
    h(
      "div",
      { className: "fallback-directory", "aria-labelledby": "fallback-door-title", "data-lenis-prevent": "true" },
      h("span", { className: "fallback-door-kicker" }, "THE SEVEN GATES"),
      h("h2", { id: "fallback-door-title" }, "Choose your chapter."),
      h("p", null, "Every door opens a different world."),
      h(
        "div",
        { className: "fallback-door-wall" },
        DOORS.map((d) =>
          h(
            "button",
            { type: "button", className: "fallback-door", disabled: ui.opening, onClick: () => openDoor(d.id) },
            h("small", null, d.mark, " / ", d.subtitle),
            h("strong", null, d.title),
            h("span", null, "Open this door ↗"),
          ),
        ),
      ),
    );

  const renderSlot = () => {
    if (revealScope && ui.phase !== 3) {
      revealScope.dispose();
      revealScope = null;
    }
    clear(slot);
    compass = null;
    if (ui.phase === 2 && !ui.leaving) {
      if (ui.fallback) slot.appendChild(buildFallbackDoors());
      else slot.appendChild((compass = buildCompass()));
    } else if (ui.phase === 3) {
      revealScope = new (scope.constructor)();
      slot.appendChild(buildRevealCard(revealScope));
    }
  };
  scope.add(() => revealScope?.dispose());

  const syncUI = (force = false) => {
    const t = journey.travel;
    journeyEl.style.setProperty("--intro-opacity", String(Math.max(0, 1 - t / 0.12)));
    journeyEl.style.setProperty("--journey-progress", `${100 * t}%`);
    const phase = t < 0.18 ? 0 : t < 0.52 ? 1 : t < FALLS_START ? 2 : 3;
    const leaving = phase === 2 && t >= ROOM_LEAVE;
    const aligned = journey.doorAligned;
    const opening = journey.openDoor >= 0;
    const door = journey.roomDoor;
    const fallback = failed || !ready;
    const slotChanged =
      force || phase !== ui.phase || leaving !== ui.leaving || fallback !== ui.fallback || (phase === 2 && !fallback && (aligned !== ui.aligned || opening !== ui.opening || door !== ui.door));
    const phaseChanged = phase !== ui.phase || leaving !== ui.leaving || force;
    Object.assign(ui, { phase, leaving, aligned, opening, door, fallback });
    if (phaseChanged || force) {
      journeyEl.dataset.phase = String(phase);
      journeyEl.dataset.leaving = String(leaving);
      intro.inert = phase !== 0;
      caption.hidden = leaving;
      caption.className = `journey-caption ${phase === 0 ? "is-intro" : ""}`;
      captionLabel.textContent = `0${phase + 1} / ${CHAPTERS[phase].label}`;
      captionDetail.textContent = CHAPTERS[phase].detail;
      scrollHint.textContent = leaving
        ? "Continue through the open gate ↓"
        : phase === 2
          ? "Keep scrolling to discover the hidden falls ↓"
          : phase === 3
            ? "Your next chapter awaits."
            : "Scroll to explore the sanctuary ↓";
    }
    journeyEl.dataset.fallback = String(fallback);
    if (fallback && leaving) Object.assign(scrollHint.style, { display: "block", bottom: "82px" });
    else scrollHint.removeAttribute("style");
    if (slotChanged) renderSlot();
  };

  const onKey = (e) => {
    if (ui.phase !== 2 || ui.fallback || ui.leaving) return;
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || (e.target instanceof Element && e.target.closest("dialog"))) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      turn("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      turn("right");
    }
  };
  scope.on(window, "keydown", onKey);

  /* layers */
  const vignette = h("div", { className: "world-vignette", "aria-hidden": "true" });
  const grain = h("div", { className: "paper-grain", "aria-hidden": "true" });
  const clickLayer = initClickFx(scope);
  const cursor = initInkCursor(scope);
  const experience = h("div", { className: "experience-controls" }, soundControl(scope, ""));
  const siteUI = h(
    "div",
    { className: "site-ui", inert: !doneLoading },
    h("a", { className: "skip-link", href: "/events" }, "Skip to events"),
    h("main", null, journeyEl),
    experience,
  );

  const sceneSlot = h("div", { style: "display:contents" });
  const startup = h("div", { className: "scene-startup-backdrop", "data-scene-starting": "true" }, buildFallbackWorld(scope, true));

  const showFallback = () => {
    world?.dispose();
    world = null;
    clear(sceneSlot);
    sceneSlot.appendChild(buildFallbackWorld(scope, reduced));
    startup.remove();
    if (!experience.querySelector(".scene-retry")) {
      experience.appendChild(
        h(
          "button",
          {
            className: "scene-retry",
            type: "button",
            onClick: (e) => {
              e.currentTarget.disabled = true;
              e.currentTarget.textContent = "Reopening…";
              startScene();
            },
          },
          "Retry immersive view ↗",
        ),
      );
    }
    syncUI(true);
  };

  const fail = (reason) => {
    if (reason) console.error("onFailure triggered:", reason);
    else console.warn("The immersive view is unavailable; showing the accessible fallback.");
    failed = true;
    ready = true;
    showFallback();
  };

  const progressModule = import("../scene/progress.js");
  const trackLoading = (fn) => {
    let stop = null;
    let cancelled = false;
    progressModule
      .then((m) => {
        if (!cancelled) stop = m.trackLoading(fn);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      stop?.();
    };
  };

  let watchdog = null;
  const startScene = async () => {
    failed = false;
    ready = false;
    experience.querySelector(".scene-retry")?.remove();
    if (!startup.isConnected) sceneSlot.after(startup);
    clear(sceneSlot);
    try {
      const [{ createWorld }, progress] = await Promise.all([import("../scene/world.js"), progressModule]);
      // Install the load tracker before any asset request starts.
      scope.add(progress.trackLoading(() => {}));
      world = createWorld({
        paused: reduced,
        onReady: () => {
          watchdog?.finish();
          ready = true;
          startup.remove();
          syncUI(true);
        },
        onFailure: (reason) => {
          watchdog?.finish();
          fail(reason);
        },
        onDoor: openDoor,
        scrollTo: (p) => scrollToTravel(p),
      });
      sceneSlot.appendChild(world.element);
      watchdog = startWatchdog(trackLoading, () => {
        console.warn("The immersive scene exceeded its visible startup budget; showing the accessible fallback.");
        fail();
      });
      scope.add(() => watchdog?.finish());
    } catch (err) {
      console.error(err);
      fail(err?.message);
    }
  };
  scope.add(() => world?.dispose());

  /* preloader */
  let preloader = null;
  const finishPreloader = () => {
    preloaderShown = true;
    doneLoading = true;
    preloader?.remove();
    preloader = null;
    document.body.style.overflow = "";
    siteUI.inert = false;
  };
  scope.add(() => {
    document.body.style.overflow = "";
  });

  const nodes = [sceneSlot, startup, vignette, grain, clickLayer, cursor, siteUI].filter(Boolean);

  startScene();
  if (!doneLoading) {
    document.body.style.overflow = "hidden";
    preloader = buildPreloader(scope, {
      getReady: () => ready,
      getFailed: () => failed,
      reduced,
      onComplete: finishPreloader,
      trackLoading,
    });
    nodes.push(preloader);
  }

  syncUI(true);
  scope.add(onFrame(() => syncUI(false), 15));

  ctx.afterMount = () => {
    lenis = initScroll(scope, { reduced, scrollToTravel });
    initMagnetic(scope, reduced);
    if (location.hash) history.replaceState(null, "", location.pathname);
  };
  scope.add(() => resetJourney());

  return nodes;
}

/* --------------------------- scroll controller ---------------------------- */

function initScroll(scope, { reduced, scrollToTravel }) {
  const lenis = new window.Lenis({ lerp: 0.085, smoothWheel: !reduced, syncTouch: false });
  lenis.on("scroll", ScrollTrigger.update);
  scope.add(
    onFrame((time, dt) => {
      lenis.raf(time * 1000);
      const door = doorAtTravel(journey.travel);
      const target = doorAngle(door);
      const inRoom = journey.travel >= ROOM_START && journey.travel < ROOM_LEAVE;
      const delta = angleDelta(journey.roomAngle, target);
      journey.roomAngle = reduced || !inRoom ? target : journey.roomAngle + delta * (1 - Math.exp(-dt / 90));
      const aligned = Math.abs(angleDelta(journey.roomAngle, target)) < 0.01;
      if (aligned) journey.roomAngle = target;
      journey.roomDoor = door;
      journey.doorAligned = aligned && journey.travel >= ROOM_START;
    }, -10),
  );
  let previous = journey.travel;
  const context = gsap.context(() => {
    gsap.to(journey, {
      travel: 1,
      ease: "none",
      scrollTrigger: { trigger: "#journey", start: "top top", end: "bottom bottom", scrub: true },
      onUpdate: () => {
        if (((previous < 0.48 && journey.travel >= 0.48) || (previous > 0.48 && journey.travel <= 0.48)) && !reduced) playCue("taiko");
        previous = journey.travel;
      },
    });
  });
  const refresh = () => ScrollTrigger.refresh();
  const onResize = () => {
    const t = journey.travel;
    lenis.resize();
    refresh();
    scrollToTravel(t, true);
    ScrollTrigger.update();
  };
  window.addEventListener("resize", onResize);
  document.fonts.ready.then(refresh);
  const onVisibility = () => {
    if (document.hidden) lenis.stop();
    else {
      lenis.start();
      refresh();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);
  const seen = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) e.isIntersecting ? seen.add(e.target) : seen.delete(e.target);
      journey.visible = seen.size > 0;
    },
    { rootMargin: "200px" },
  );
  document.querySelectorAll("#journey").forEach((el) => observer.observe(el));
  scope.add(() => {
    context.revert();
    lenis.destroy();
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    observer.disconnect();
    journey.visible = true;
  });
  return lenis;
}

/* -------------------- startup budget for the 3D scene ---------------------- */

function startWatchdog(trackLoading, onTimeout) {
  let elapsed = 0;
  let quiet = 0;
  let revision = 0;
  let pending = 0;
  let finished = false;
  let last = performance.now();
  const untrack = trackLoading((s) => {
    pending = s.pending;
    if (s.revision !== revision) {
      revision = s.revision;
      quiet = 0;
    }
  });
  const onVisibility = () => {
    last = performance.now();
  };
  document.addEventListener("visibilitychange", onVisibility);
  const timer = setInterval(() => {
    const now = performance.now();
    const dt = now - last;
    last = now;
    if (finished || document.hidden) return;
    elapsed += dt;
    quiet += dt;
    if (elapsed >= 9e4 || (pending === 0 && quiet >= 3e4)) {
      finish();
      onTimeout();
    }
  }, 250);
  function finish() {
    if (finished) return;
    finished = true;
    clearInterval(timer);
    untrack();
    document.removeEventListener("visibilitychange", onVisibility);
  }
  return { finish };
}
