import { h, fromHTML } from "../core/dom.js";
import { arrowIcon, destinationShell, destinationHero } from "../ui/common.js";

export const title = "Tech Arsenal & Certifications · Moosa";

// The illustrated skills village is a deterministic SVG/CSS scene; it is
// served as a static fragment.
let scenePromise = null;
const loadScene = () =>
  (scenePromise ??= (async () => {
    // Attempt canonical skills-scene.html first
    try {
      const res = await fetch("/data/skills-scene.html");
      if (res.ok) return await res.text();
      console.warn("fetch('/data/skills-scene.html') returned " + res.status + ", trying fallback...");
    } catch (err) {
      console.warn("Error fetching /data/skills-scene.html:", err);
    }
    // Attempt fallback sponsors-scene.html
    try {
      const res = await fetch("/data/sponsors-scene.html");
      if (res.ok) return await res.text();
      console.warn("fetch('/data/sponsors-scene.html') returned " + res.status);
    } catch (err) {
      console.warn("Error fetching /data/sponsors-scene.html:", err);
    }
    throw new Error("Skills scene HTML template could not be loaded from either /data/skills-scene.html or /data/sponsors-scene.html");
  })());

function pendingFallback() {
  return h(
    "div",
    { className: "dest-page" },
    destinationHero("ENGINEERING ARSENAL", "Tech Arsenal & Certifications", "Explore Moosa’s technical stack, programming languages, modern frameworks, and algorithmic practice."),
    h(
      "section",
      { className: "dest-section" },
      h(
        "div",
        { className: "dest-wrap" },
        h(
          "div",
          { className: "dest-pending" },
          h("span", { lang: "ja", "aria-hidden": "true", className: "dest-pending-mark" }, "技術"),
          h("h2", { className: "dest-pending-title" }, "Tech Arsenal"),
          h("p", { className: "dest-pending-note" }, "Full-stack web engineering, Linux system automation, C++/Python DSA problem-solving, and verified technical certifications."),
          h(
            "div",
            { className: "dest-pending-actions" },
            h("a", { className: "button button-gold", href: "/projects" }, "Browse projects ", arrowIcon(true)),
            h("a", { className: "dest-ghost-link", href: "/" }, "Return to Sanctuary ", arrowIcon(true)),
          ),
        ),
      ),
    ),
  );
}

export default async function skills({ scope, path }) {
  let content;
  try {
    const htmlText = await loadScene();
    content = fromHTML(htmlText);
  } catch (err) {
    console.error("Failed to mount Skills scene:", err);
    content = pendingFallback();
  }
  return destinationShell(scope, {
    pathname: path,
    mainClass: "fullscreen-page-overlay destination-page destination-page-sponsors destination-page-skills",
    content,
  });
}

