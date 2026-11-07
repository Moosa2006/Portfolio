const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_TAGS = new Set([
  "svg", "g", "path", "circle", "rect", "line", "polyline", "polygon",
  "ellipse", "defs", "linearGradient", "radialGradient", "stop", "text",
  "use", "clipPath", "mask", "filter", "feGaussianBlur", "feTurbulence",
  "feColorMatrix", "feBlend", "feComposite", "feOffset", "feMerge",
  "feMergeNode", "tspan", "pattern", "symbol",
]);

function applyProps(el, props, isSvg) {
  if (!props) return;
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null || value === false) continue;
    if (key === "className" || key === "class") {
      if (isSvg) el.setAttribute("class", value);
      else el.className = value;
    } else if (key === "style") {
      if (typeof value === "string") el.setAttribute("style", value);
      else
        for (const [prop, v] of Object.entries(value)) {
          if (v === undefined || v === null) continue;
          if (prop.startsWith("--")) el.style.setProperty(prop, v);
          else el.style[prop] = typeof v === "number" && !UNITLESS.has(prop) ? `${v}px` : v;
        }
    } else if (key === "dataset") {
      for (const [k, v] of Object.entries(value)) el.dataset[k] = v;
    } else if (key === "ref") {
      value(el);
    } else if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (key === "html") {
      el.innerHTML = value;
    } else if (key === "text") {
      el.textContent = value;
    } else if (value === true) {
      el.setAttribute(key, "");
    } else if (!isSvg && key in el && typeof el[key] !== "object" && !key.includes("-") && key !== "list" && key !== "form") {
      try { el[key] = value; } catch { el.setAttribute(key, value); }
    } else {
      el.setAttribute(key, value);
    }
  }
}

const UNITLESS = new Set(["opacity", "zIndex", "fontWeight", "lineHeight", "flex", "order", "scale"]);

function append(el, children) {
  for (const child of children) {
    if (child === null || child === undefined || child === false || child === true) continue;
    if (Array.isArray(child)) append(el, child);
    else if (child instanceof Node) el.appendChild(child);
    else el.appendChild(document.createTextNode(String(child)));
  }
}

export function h(tag, props, ...children) {
  const isSvg = SVG_TAGS.has(tag);
  const el = isSvg ? document.createElementNS(SVG_NS, tag) : document.createElement(tag);
  applyProps(el, props, isSvg);
  append(el, children);
  return el;
}

export function frag(...children) {
  const f = document.createDocumentFragment();
  append(f, children);
  return f;
}

export function fromHTML(markup) {
  const t = document.createElement("template");
  t.innerHTML = markup.trim();
  return t.content;
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

export function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
export const prefersReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;

/** Collects teardown callbacks for a mounted view. */
export class Scope {
  constructor() {
    this.fns = [];
  }
  add(fn) {
    if (typeof fn === "function") this.fns.push(fn);
    return fn;
  }
  on(target, type, handler, options) {
    target.addEventListener(type, handler, options);
    this.fns.push(() => target.removeEventListener(type, handler, options));
  }
  dispose() {
    const fns = this.fns.splice(0).reverse();
    for (const fn of fns) {
      try { fn(); } catch (err) { console.error(err); }
    }
  }
}
