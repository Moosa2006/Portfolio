import { startRouter } from "./core/router.js";
import { getSoundState, resumeSound, setSoundEnabled, setSoundHidden } from "./core/sound.js";
import { createPassage, createShortcuts, initDirectory, initFeedbackPrompt } from "./ui/layout.js";

// Defensive check: verify GSAP and ScrollTrigger are available before registering plugin
if (typeof window !== "undefined") {
  const gsapInstance = window.gsap;
  const scrollTriggerInstance = window.ScrollTrigger;
  if (gsapInstance && typeof gsapInstance.registerPlugin === "function" && scrollTriggerInstance) {
    try {
      gsapInstance.registerPlugin(scrollTriggerInstance);
    } catch (err) {
      console.warn("GSAP ScrollTrigger registration deferred:", err);
    }
  }
}

const anchor = document.createComment(" page ");
document.body.appendChild(anchor);

const shortcuts = createShortcuts();
const passage = createPassage();
document.body.appendChild(passage);

let path = location.pathname;
initDirectory({ getPath: () => path, shortcuts });
const updateFeedback = initFeedbackPrompt();

function onRouteChange(nextPath) {
  path = nextPath;
  if (nextPath === "/") {
    if (!shortcuts.isConnected) passage.before(shortcuts);
  } else if (shortcuts.isConnected) {
    shortcuts.remove();
  }
  updateFeedback(nextPath);
}

// Sound is on by default and starts with the first gesture anywhere but the seal.
if (getSoundState().enabled) setSoundEnabled(true);
const unlock = (e) => {
  if (e.target instanceof Element && e.target.closest(".sound-control")) return;
  resumeSound();
};
document.addEventListener("pointerup", unlock);
document.addEventListener("keydown", unlock);
document.addEventListener("visibilitychange", () => setSoundHidden(document.hidden));

startRouter({ anchorNode: anchor, onChange: onRouteChange });
