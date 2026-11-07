export const DESTINATIONS = [
  { href: "/projects", title: "Projects", detail: "Full-Stack, Systems & Web Apps", mark: "01" },
  { href: "/journey", title: "Journey", detail: "Education, Routine & Milestones", mark: "02" },
  { href: "/skills", title: "Skills", detail: "Tech Arsenal & Certifications", mark: "03" },
  { href: "/leadership", title: "Achievements", detail: "ITian Club & Competition Wins", mark: "04" },
  { href: "/about", title: "About Me", detail: "Developer Profile & Bio", mark: "05" },
  { href: "/gallery", title: "Gallery", detail: "UI Showcase & Visual Aesthetics", mark: "06" },
  { href: "/contact", title: "Contact", detail: "Direct Reach & Social Hub", mark: "07" },
];

export function normalizePath(path) {
  if (path === "/developers") return "/developer";
  if (path === "/committees") return "/committee";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function isKnownRoute(path) {
  const p = normalizePath(path);
  return (
    p === "/" ||
    p === "/login" ||
    p === "/profile" ||
    p === "/feedback" ||
    p === "/projects" ||
    p.startsWith("/projects/") ||
    p === "/events" ||
    p.startsWith("/events/") ||
    p === "/skills" ||
    p === "/sponsors" ||
    p === "/journey" ||
    p === "/calendar" ||
    p === "/schedule" ||
    p === "/leadership" ||
    p === "/leadership/directory" ||
    p === "/committees/map" ||
    p === "/committee" ||
    p === "/gallery" ||
    p === "/about" ||
    p === "/developer" ||
    p === "/contact" ||
    DESTINATIONS.some((d) => d.href === p)
  );
}

export function passageTitle(url) {
  const p = normalizePath(url.split(/[?#]/)[0]);
  if (p === "/") return "The sanctuary";
  if (p.startsWith("/projects/") || p.startsWith("/events/")) return "Project details";
  if (p === "/leadership" || p === "/committees/map" || p === "/committee") return "Achievements & Leadership";
  if (p === "/skills" || p === "/sponsors") return "Skills & Tech Arsenal";
  if (p === "/journey" || p === "/calendar" || p === "/schedule") return "Journey & Education";
  if (p === "/about" || p === "/developer") return "About Me";
  return DESTINATIONS.find((d) => d.href === p)?.title ?? "Moosa";
}

let handler = null;

/** Navigate within the app (with the door passage), falling back to a full load. */
export function navigate(url) {
  return handler ? handler(url) : (window.location.assign(url), true);
}

export function setNavigateHandler(fn) {
  handler = fn;
  return () => {
    if (handler === fn) handler = null;
  };
}

export function openExplore() {
  window.dispatchEvent(new Event("moosa:explore"));
}
