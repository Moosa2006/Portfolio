import { DefaultLoadingManager } from "three";

// Tracks three.js loads (weighted by file type) so the preloader can report
// progress and a human-readable activity line, like the original site.

const listeners = new Set();
let snapshot = { pending: 0, totalFiles: 0, fraction: 0, activity: "Opening the gates", revision: 0 };
let restore = null;

const weight = (url) => {
  const u = url.split("?")[0].toLowerCase();
  if (/\.(glb|gltf)$/.test(u)) return 6;
  if (u.endsWith(".hdr")) return 4;
  if (u.endsWith(".wasm")) return 2;
  return 1;
};

function activityFor(url) {
  const u = url.toLowerCase();
  if (u.includes("cherry")) return "Loading the cherry blossoms";
  if (u.includes("cedar")) return "Loading the cedar forest";
  if (u.includes(".hdr")) return "Loading the forest sky";
  if (u.includes("draco") || u.includes(".wasm")) return "Preparing the 3D decoder";
  if (u.includes("/materials/")) return "Laying the stone and wood";
  if (u.includes("waterfall")) return "Loading the waterfall";
  if (u.includes("logo")) return "Preparing sanctuary crest";
  return "Loading textures";
}

function install() {
  const manager = DefaultLoadingManager;
  const origStart = manager.itemStart;
  const origEnd = manager.itemEnd;
  const pending = [];
  let total = 0;
  let done = 0;
  const emit = () => {
    snapshot = {
      ...snapshot,
      pending: pending.length,
      fraction: total ? done / total : 0,
      activity: pending.length ? activityFor(pending[pending.length - 1]) : "Polishing the sanctuary",
      revision: snapshot.revision + 1,
    };
    listeners.forEach((fn) => fn(snapshot));
  };
  const start = function (url) {
    origStart.call(this, url);
    pending.push(url);
    total += weight(url);
    snapshot = { ...snapshot, totalFiles: snapshot.totalFiles + 1 };
    emit();
  };
  const end = function (url) {
    origEnd.call(this, url);
    const i = pending.indexOf(url);
    if (i !== -1) {
      pending.splice(i, 1);
      done += weight(url);
    }
    emit();
  };
  manager.itemStart = start;
  manager.itemEnd = end;
  restore = () => {
    if (manager.itemStart === start) manager.itemStart = origStart;
    if (manager.itemEnd === end) manager.itemEnd = origEnd;
    snapshot = { pending: 0, totalFiles: 0, fraction: 0, activity: "Opening the gates", revision: 0 };
  };
}

export function trackLoading(fn) {
  if (!restore) install();
  listeners.add(fn);
  fn(snapshot);
  return () => {
    listeners.delete(fn);
    if (!listeners.size) {
      restore?.();
      restore = null;
    }
  };
}
