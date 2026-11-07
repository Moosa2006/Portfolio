import { h, Scope } from "./dom.js";
import { isKnownRoute, normalizePath, passageTitle, setNavigateHandler } from "./nav.js";
import { closePassage, markPassageDelayed, openPassage, passagePhase } from "../ui/layout.js";

const REDIRECTS = {
  "/login": "/",
  "/profile": "/",
  "/feedback": "/contact",
  "/sponsors": "/skills",
};

const ROUTES = [
  { test: (p) => p === "/", load: () => import("../pages/home.js") },
  { test: (p) => p === "/projects" || p === "/events", load: () => import("../pages/events.js") },
  { test: (p) => /^\/(projects|events)\/[^/]+$/.test(p), load: () => import("../pages/event-detail.js") },
  { test: (p) => p === "/skills" || p === "/sponsors", load: () => import("../pages/skills.js") },
  { test: (p) => p === "/journey" || p === "/calendar" || p === "/schedule", load: () => import("../pages/calendar.js") },
  { test: (p) => p === "/leadership" || p === "/committees/map", load: () => import("../pages/committee-map.js") },
  { test: (p) => p === "/leadership/directory" || p === "/committee", load: () => import("../pages/committee.js") },
  { test: (p) => p === "/gallery", load: () => import("../pages/gallery.js") },
  { test: (p) => p === "/about" || p === "/developer", load: () => import("../pages/about.js") },
  { test: (p) => p === "/contact", load: () => import("../pages/contact.js") },
];

let anchor = null;
let current = null;
let busy = false;
let onRouteChange = () => {};

function findRoute(path) {
  return ROUTES.find((r) => r.test(path)) ?? { load: () => import("../pages/not-found.js") };
}

async function mountRoute(href) {
  const url = new URL(href, location.origin);
  let path = normalizePath(url.pathname);
  if (REDIRECTS[path]) {
    const target = REDIRECTS[path];
    history.replaceState(null, "", target + url.search + url.hash);
    return mountRoute(new URL(target + url.search + url.hash, location.origin).href);
  }
  const route = findRoute(path);
  let mod;
  try {
    mod = await route.load();
  } catch (err) {
    console.error("Route failed to load", err);
    mod = await import("../pages/not-found.js");
  }
  const scope = new Scope();
  const ctx = { scope, path, url, query: url.searchParams, params: path.split("/").filter(Boolean) };
  let result;
  try {
    result = await mod.default(ctx);
  } catch (renderErr) {
    console.error(`Page mount failed for route: ${path}`, renderErr);
    result = h(
      "div",
      { className: "dest-page dest-error", style: { padding: "4rem 2rem", textAlign: "center", color: "#efe4cd" } },
      h("h1", { style: { color: "#c99a3a", fontSize: "28px" } }, "Unable to display this view"),
      h("p", { style: { color: "#829b91", marginTop: "1rem" } }, "An unexpected error occurred while mounting this section."),
      h("a", { href: "/", className: "button button-gold", style: { marginTop: "1.5rem", display: "inline-block" } }, "Return to Sanctuary"),
    );
  }
  const nodes = (Array.isArray(result) ? result : [result]).filter(Boolean);

  if (current) {
    current.scope.dispose();
    current.nodes.forEach((n) => n.remove());
  }
  for (const node of nodes) anchor.parentNode.insertBefore(node, anchor);
  const title = typeof mod.title === "function" ? mod.title(ctx) : mod.title;
  if (title) document.title = title;
  current = { path, href: url.pathname + url.search, scope, nodes };
  onRouteChange(path);
  ctx.afterMount?.();
  if (url.hash) {
    requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      target?.scrollIntoView({ block: "start" });
    });
  }
}

function waitForRouteReady() {
  return new Promise((resolve) => {
    let done = false;
    const check = () => {
      if (done || document.querySelector('[data-route-loading="true"]')) return;
      done = true;
      observer.disconnect();
      clearTimeout(first);
      clearTimeout(slow);
      resolve();
    };
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-route-loading"] });
    const first = setTimeout(check, 120);
    const slow = setTimeout(markPassageDelayed, 12000);
  });
}

function focusHeading() {
  const heading = document.querySelector("main h1, main h2");
  if (!heading) return;
  const prev = heading.getAttribute("tabindex");
  heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });
  heading.addEventListener(
    "blur",
    () => (prev === null ? heading.removeAttribute("tabindex") : heading.setAttribute("tabindex", prev)),
    { once: true },
  );
}

async function go(href) {
  const url = new URL(href, location.origin);
  if (url.origin !== location.origin || !isKnownRoute(url.pathname) || busy) return false;
  let p = normalizePath(url.pathname);
  if (REDIRECTS[p]) {
    url.pathname = REDIRECTS[p];
  }
  if (url.href === location.href) return true;
  busy = true;
  window.dispatchEvent(new Event("moosa:navigating"));
  await closePassage(passageTitle(url.href));
  history.pushState(null, "", url.pathname + url.search + url.hash);
  window.scrollTo(0, 0);
  try {
    await mountRoute(url.href);
  } catch (err) {
    console.error(err);
  }
  await waitForRouteReady();
  if (passagePhase() !== "idle") await openPassage();
  busy = false;
  focusHeading();
  return true;
}

function onDocumentClick(e) {
  if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
  const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
  if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self") || link.hasAttribute("data-native-navigation")) return;
  const url = new URL(link.href, location.origin);
  if (
    isKnownRoute(location.pathname) &&
    url.origin === location.origin &&
    isKnownRoute(url.pathname) &&
    (url.pathname !== location.pathname || url.search !== location.search)
  ) {
    e.preventDefault();
    e.stopImmediatePropagation();
    go(url.pathname + url.search + url.hash);
  }
}

export async function startRouter({ anchorNode, onChange }) {
  anchor = anchorNode;
  onRouteChange = onChange;
  history.scrollRestoration = "manual";
  setNavigateHandler((href) => {
    go(href);
    return true;
  });
  document.addEventListener("click", onDocumentClick, true);
  window.addEventListener("popstate", async () => {
    if (busy) return;
    busy = true;
    try {
      await mountRoute(location.href);
      window.scrollTo(0, 0);
    } finally {
      busy = false;
    }
  });
  window.addEventListener("moosa:passage-reset", () => {
    busy = false;
  });
  await mountRoute(location.href);
}

/** Replace the current URL's query without a passage (used by in-page filters). */
export function replaceQuery(search, { push = false } = {}) {
  const next = location.pathname + (search ? `?${search}` : "");
  if (next === location.pathname + location.search) return;
  history[push ? "pushState" : "replaceState"](null, "", next);
  if (current) current.href = next;
}

export function currentPath() {
  return current?.path ?? normalizePath(location.pathname);
}
