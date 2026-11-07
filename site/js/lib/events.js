import { h } from "../core/dom.js";
import { lucide } from "../ui/icons.js";

/* ------------------------------- path data -------------------------------- */

export const PATHS = [
  { id: "all", number: "01", name: "Architecture of Scale", virtue: "All Work", kanji: "全", description: "Exploration across full-stack platforms, Linux automation tools, and algorithmic systems.", category: "FULL-STACK · SYSTEMS · CLOUD" },
  { id: "civic", number: "02", name: "Civic & Public Tech", virtue: "Civic & Enterprise Tech", kanji: "市", description: "Enterprise-grade civic issue reporting, public accountability, SLA tracking, and GIS municipal infrastructure.", category: "ENTERPRISE · CIVIC · GIS · AI" },
  { id: "verification", number: "03", name: "Verification & Matchmaking", virtue: "Verification & Talent", kanji: "証", description: "Evidence-backed skill profiles, perceptual deduplication, fraud analysis, and hackathon team matchmaking.", category: "EVIDENCE · TALENT · MATCHMAKING" },
  { id: "productivity", number: "04", name: "Productivity & Collaboration", virtue: "Productivity & Social", kanji: "律", description: "Modern habit tracking, accountability streak engines, collaborative workspaces, and real-time state synchronization.", category: "HABITS · COLLABORATION · WORKSPACE" },
  { id: "edtech", number: "05", name: "Competency & Career Guidance", virtue: "Career & EdTech", kanji: "道", description: "Technical competency matching, gap analysis platforms, curriculum parsing, and career-readiness roadmap generation.", category: "ANALYSIS · SKILLS · ROADMAPS" },
];

const PATH_MAP = Object.fromEntries(PATHS.map((p) => [p.id, p]));
PATHS.forEach((p) => {
  PATH_MAP[p.virtue.toLowerCase()] = p;
  PATH_MAP[p.name.toLowerCase()] = p;
  PATH_MAP[p.category.toLowerCase()] = p;
});
PATH_MAP["all work"] = PATH_MAP.all;
PATH_MAP["civic & enterprise tech"] = PATH_MAP.civic;
PATH_MAP["verification & talent"] = PATH_MAP.verification;
PATH_MAP["productivity & social"] = PATH_MAP.productivity;
PATH_MAP["career & edtech"] = PATH_MAP.edtech;

/** Lenient path lookup used throughout the UI. */
export function pathInfo(key) {
  if (typeof key === "string") {
    if (key in PATH_MAP) return PATH_MAP[key];
    const n = key.toLowerCase().trim();
    if (n in PATH_MAP) return PATH_MAP[n];
    if (n.includes("civic") || n.includes("enterprise")) return PATH_MAP.civic;
    if (n.includes("verif") || n.includes("talent")) return PATH_MAP.verification;
    if (n.includes("prod") || n.includes("social") || n.includes("habit")) return PATH_MAP.productivity;
    if (n.includes("ed") || n.includes("career") || n.includes("skill")) return PATH_MAP.edtech;
    if (n.includes("all")) return PATH_MAP.all;
  }
  return PATH_MAP.all;
}

export const COMING_SOON_PATHS = [];
export const LITERARY_SOCIETIES = [];
export const PERFORMING_SOCIETIES = [];

const IMAGE_BASE = "https://pub-e5ca9932190a4ee0b9bb897d25594a1d.r2.dev";
export function imageUrl(key) {
  if (!key || typeof key !== "string") return null;
  const t = key.trim();
  if (!t) return null;
  if (t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/")) return t;
  return `${IMAGE_BASE}/${t.replace(/^\/+/, "")}`;
}

export function withTrack(e) {
  const a = (e.category || "").toLowerCase().trim();
  let t = "all";
  if (["all", "civic", "verification", "productivity", "edtech"].includes(a)) t = a;
  else if (a.includes("civic") || a.includes("enterprise")) t = "civic";
  else if (a.includes("verif") || a.includes("talent")) t = "verification";
  else if (a.includes("prod") || a.includes("social")) t = "productivity";
  else if (a.includes("ed") || a.includes("career")) t = "edtech";
  return { ...e, track: t, image_url: e.image_url || imageUrl(e.image_key) || "/art/fans/technical.webp" };
}

export function normalizeEvent(e) {
  const img = e.image_url || imageUrl(e.image_key);
  if ("track" in e && e.track) return e.image_url ? e : { ...e, image_url: img };
  let n = (e.category || "cultural").toLowerCase().trim();
  if (!PATH_MAP[n]) n = "cultural";
  return {
    ...e,
    reg_fees: Number(e.reg_fees ?? 0),
    prize_money: e.prize_money !== undefined && e.prize_money !== null && String(e.prize_money).trim() !== "" ? String(e.prize_money).trim() : null,
    display: e.display || "prize_pool",
    in_top_10: !!e.in_top_10,
    min_team_members: e.min_team_members ?? 1,
    max_team_members: e.max_team_members ?? 1,
    track: n,
    image_url: img,
  };
}

/* ------------------------------- data access ------------------------------ */

let dataPromise = null;
export function loadEventData() {
  dataPromise ??= fetch("/data/events.json")
    .then((r) => {
      if (!r.ok) throw new Error("Could not load events");
      return r.json();
    })
    .then((d) => {
      const events = d.events.map(withTrack);
      const byId = new Map(events.map((e) => [e.event_id, e]));
      const categories = Object.fromEntries(Object.entries(d.categories).map(([k, ids]) => [k, ids.map((id) => byId.get(id)).filter(Boolean)]));
      return { events, byId, categories, counts: d.counts };
    })
    .catch((err) => {
      dataPromise = null;
      throw err;
    });
  return dataPromise;
}

/* ------------------------------- formatting ------------------------------- */

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
function ist(value) {
  const t = value ? Date.parse(value) : NaN;
  return Number.isNaN(t) ? null : new Date(t + 198e5);
}
export function dayLabel(value) {
  const d = ist(value);
  return d ? `${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS[d.getUTCMonth()]}` : "";
}
function timeLabel(value) {
  const d = ist(value);
  if (!d) return "";
  const hours = d.getUTCHours();
  return `${hours % 12 || 12}:${String(d.getUTCMinutes()).padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
}
export function scheduleLine(e) {
  const day = dayLabel(e.date_time);
  return `${day ? `${day} · ${timeLabel(e.date_time)}` : "Schedule TBA"} · ${e.location || "Venue TBA"}`;
}
export function whenLine(e) {
  const day = dayLabel(e.date_time);
  if (!day) return "Schedule to be announced";
  let s = `${day} · ${timeLabel(e.date_time)}`;
  const end = dayLabel(e.end_date_time);
  if (end === day) s += ` – ${timeLabel(e.end_date_time)}`;
  else if (end) s += ` – ${end} · ${timeLabel(e.end_date_time)}`;
  return s;
}
export function teamLabel(e) {
  if (!e || !e.is_team_event) return "Solo";
  const min = e.min_team_members ?? 1;
  const max = e.max_team_members ?? min;
  return min === max ? `Team of ${min}` : `Team (${min}–${max})`;
}
export function feeLabel(e) {
  if (e == null) return "Free";
  const n = Number((typeof e === "object" && "reg_fees" in e ? e.reg_fees : e) ?? 0);
  return n > 0 ? `₹${n.toLocaleString("en-IN")}` : "Free";
}
export function prizeAmount(value) {
  if (value == null) return null;
  const t = String(value).trim();
  const n = t.toLowerCase();
  if (!t || t === "0" || ["null", "undefined", "none", "n/a", "nil", "no"].includes(n)) return null;
  const num = Number(t.replace(/[₹,\s]/g, ""));
  if (Number.isNaN(num)) return t;
  return num <= 0 ? null : `₹${num.toLocaleString("en-IN")}`;
}
export function isGoodies(display) {
  if (!display) return false;
  const t = String(display).toLowerCase().trim();
  return t === "goodies" || t === "goodies_worth" || t.includes("goodie");
}
export function teamDetail(isTeam, min = 1, max = 1) {
  if (!isTeam || (min <= 1 && max <= 1)) return "Individual Event";
  const a = Math.max(1, min);
  const b = Math.max(a, max);
  return a === b ? `Team Event · ${a} ${a === 1 ? "member" : "members"}` : `Team Event · ${a}–${b} members`;
}
export function registrationClosed(e, now = Date.now()) {
  const t = Date.parse(e.end_date_time || e.date_time || "");
  return Number.isFinite(t) && t <= now;
}
export function safeUrl(value) {
  const t = (value ?? "").trim();
  if (!t || /\s/.test(t)) return null;
  const url = /^https?:\/\//i.test(t) ? t : /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/|$)/i.test(t) ? `https://${t}` : null;
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

/** Unique "DD MON" days, ordered by earliest event that day. */
export function eventDays(events) {
  const map = new Map();
  for (const e of events) {
    const day = dayLabel(e.date_time);
    const t = Date.parse(e.date_time ?? "");
    if (day && !map.has(day)) map.set(day, t);
    else if (day && t < (map.get(day) ?? Infinity)) map.set(day, t);
  }
  return [...map.entries()].sort((a, b) => a[1] - b[1]).map(([d]) => d);
}
function dayValue(label, year = 2026) {
  const parts = label.trim().split(/\s+/);
  if (parts.length < 2) return 0;
  const d = parseInt(parts[0], 10);
  const m = MONTHS.indexOf(parts[1].toUpperCase());
  return Number.isNaN(d) || m === -1 ? 0 : Date.UTC(year, m, d);
}
export const sortDays = (days) => [...days].sort((a, b) => dayValue(a) - dayValue(b));

const startOf = (e) => Date.parse(e.date_time || "") || 0;
export function soonestSort(a, b, now = Date.now()) {
  const topA = !!a.in_top_10;
  if (!!b.in_top_10 !== topA) return topA ? -1 : 1;
  const noPrizeA = !a.prize_money || String(a.prize_money).trim() === "";
  if (noPrizeA !== (!b.prize_money || String(b.prize_money).trim() === "")) return noPrizeA ? 1 : -1;
  const i = startOf(a);
  const j = startOf(b);
  const fi = i > now;
  let s;
  if (fi !== j > now) s = fi ? -1 : 1;
  else if (i === j) s = 0;
  else if (i === 0) s = 1;
  else if (j === 0) s = -1;
  else s = fi ? i - j : j - i;
  return s !== 0 ? s : (a.event_name || "").localeCompare(b.event_name || "");
}

/** Client-side filter (path membership, filters and free-text search) from the original search mode. */
export function filterEvents(list, query, category, filters) {
  const searching = (query || "").trim().length > 0;
  return list.filter((e) => {
    if (category && category !== "all") {
      const normCat = category.toLowerCase().trim();
      const eCat = (e.category || "").toLowerCase().trim();
      const eTrack = (e.track || "").toLowerCase().trim();
      const matches =
        eTrack === normCat ||
        eCat === normCat ||
        (normCat === "civic" && (eCat.includes("civic") || eCat.includes("enterprise"))) ||
        (normCat === "verification" && (eCat.includes("verif") || eCat.includes("talent"))) ||
        (normCat === "productivity" && (eCat.includes("prod") || eCat.includes("social"))) ||
        (normCat === "edtech" && (eCat.includes("ed") || eCat.includes("career")));
      if (!matches) return false;
    }
    if (!searching) return true;
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return true;
    const techStackText = Object.values(e.techStack || {}).join(" ");
    const featuresText = (e.features || []).join(" ");
    const haystack = [
      e.name,
      e.event_name,
      e.tagline,
      e.summary,
      e.description,
      e.brief_description,
      e.category,
      e.track,
      e.society_name,
      e.additional_club,
      techStackText,
      featuresText,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}

/* ------------------------------ URL helpers -------------------------------- */

const PARAMS = {
  category: ["all", "civic", "verification", "productivity", "edtech"],
  fee: ["all", "free", "paid"],
  format: ["all", "individual", "team"],
  sort: ["soonest", "latest", "name_asc", "fee_low", "fee_high"],
  date: ["all", "upcoming", "today", "tomorrow", "past"],
};
export const PAGE_SIZE = 10;

export function cleanParams(params) {
  const out = new URLSearchParams();
  for (const [key, allowed] of Object.entries(PARAMS)) {
    const v = params.get(key) || (key === "category" ? params.get("track") : null);
    if (v && allowed.includes(v) && v !== "all") out.set(key, v);
  }
  const search = (params.get("search") || "").replace(/[^a-zA-Z0-9\s-&]/g, "").trim().slice(0, 50);
  if (search) out.set("search", search);
  return out;
}

export function safeReturn(href) {
  if (!href || !/^\/(?:projects|events)(?:\?|$)/.test(href)) return "/projects";
  const q = cleanParams(new URLSearchParams(href.split("?")[1] || "")).toString();
  return q ? `/projects?${q}` : "/projects";
}

export function readFilters(params) {
  const clean = cleanParams(params);
  return {
    query: (params.get("search") || "").slice(0, 50),
    club: clean.get("society") || "all",
    type: clean.get("format") === "individual" ? "solo" : clean.get("format") === "team" ? "team" : "all",
    fee: clean.get("fee") === "free" ? "free" : clean.get("fee") === "paid" ? "paid" : "all",
    day: clean.get("eventDay") || "all",
  };
}

export function listingHref(category, filters = {}, page = 1) {
  const p = new URLSearchParams();
  if (category && category !== "all") p.set("category", category);
  if (filters.query?.trim()) p.set("search", filters.query.slice(0, 50));
  if (page > 1) p.set("page", String(page));
  return `/projects${p.size ? `?${p}` : ""}`;
}

export function registerHref(eventId, returnHref) {
  const p = new URLSearchParams();
  if (returnHref !== null && returnHref !== undefined) p.set("from", safeReturn(returnHref));
  return `/projects/${encodeURIComponent(eventId)}${p.size ? `?${p}` : ""}`;
}

/* ------------------------------- components -------------------------------- */

export const PLACEHOLDER = {
  card: { src: "/events/event-placeholder-720.webp", width: 720, height: 627 },
  large: { src: "/events/event-placeholder-1200.webp", width: 1200, height: 1044 },
};

/** Crest placeholder underneath a poster that fades in once it loads. */
export function poster(src, alt, size = "card") {
  const ph = size === "large" ? PLACEHOLDER.large : PLACEHOLDER.card;
  const crest = h("img", { className: "ev-poster-crest", src: ph.src, width: ph.width, height: ph.height, alt, loading: "eager" });
  const nodes = [crest];
  if (src) {
    const photo = h("img", {
      className: "ev-poster-photo",
      src,
      alt,
      width: 1200,
      height: 600,
      decoding: "async",
      loading: size === "large" ? "eager" : "lazy",
    });
    const loaded = () => {
      photo.classList.add("is-loaded");
      crest.alt = "";
      crest.setAttribute("aria-hidden", "true");
    };
    photo.addEventListener("load", loaded);
    photo.addEventListener("error", () => photo.remove());
    if (photo.complete && photo.naturalWidth > 0) loaded();
    nodes.push(photo);
  }
  return nodes;
}

export function prizeBadge(amount, displayType = "prize_pool", variant = "card", className = "") {
  const value = prizeAmount(amount);
  if (!value) return null;
  const goodies = isGoodies(displayType);
  const upper = goodies ? "GOODIES WORTH" : "PRIZE POOL";
  const title = goodies ? "Goodies Worth" : "Prize Pool";
  const label = `${title}: ${value}`;
  const icon = (size, cls) => lucide(goodies ? "gift" : "trophy", cls, size);
  if (variant === "banner")
    return h(
      "div",
      { className: `ev-prize-banner ${className}`.trim(), "aria-label": label, role: "status" },
      h(
        "span",
        { className: "ev-prize-banner-inner" },
        h("span", { className: "ev-prize-banner-icon-wrap", "aria-hidden": "true" }, icon(16, "ev-prize-banner-icon")),
        h("span", { className: "ev-prize-banner-label" }, upper),
        h("span", { className: "ev-prize-banner-divider", "aria-hidden": "true" }, "·"),
        h("span", { className: "ev-prize-banner-amount" }, value),
      ),
    );
  if (variant === "modal")
    return h(
      "div",
      { className: `ev-meta-item ev-meta-prize ${className}`.trim(), "aria-label": label },
      h("dt", null, icon(13, "ev-meta-prize-icon"), h("span", null, title)),
      h("dd", { className: "ev-meta-prize-amount" }, value),
    );
  if (variant === "pill")
    return h(
      "span",
      { className: `ev-prize-pill ${className}`.trim(), "aria-label": label },
      icon(12, "ev-prize-icon"),
      h("span", { className: "ev-prize-label" }, upper),
      h("span", { className: "ev-prize-amount" }, value),
    );
  return h(
    "div",
    { className: `ev-prize-badge ${className}`.trim(), "aria-label": label },
    h(
      "span",
      { className: "ev-prize-badge-inner" },
      icon(13, "ev-prize-icon"),
      h("span", { className: "ev-prize-label" }, upper),
      h("span", { className: "ev-prize-divider", "aria-hidden": "true" }, "·"),
      h("span", { className: "ev-prize-amount" }, value),
    ),
  );
}

export function contactEntries(e) {
  if (!e) return [];
  const out = [];
  if (e.poc1_name?.trim() || e.poc1_number?.trim()) out.push({ label: "POC 1", name: e.poc1_name?.trim() || null, number: e.poc1_number?.trim() || "" });
  if (e.poc2_name?.trim() || e.poc2_number?.trim()) out.push({ label: "POC 2", name: e.poc2_name?.trim() || null, number: e.poc2_number?.trim() || "" });
  if (out.length) return out;
  const raw = e.contact_info?.trim();
  if (!raw) return [];
  const parts = (raw.includes("\n") ? raw.split("\n") : raw.includes("|") ? raw.split("|") : [raw]).map((s) => s.trim()).filter(Boolean);
  parts.forEach((line, i) => {
    const poc = line.match(/^POC\s*([12])\s*[:\-]\s*(.+)$/i);
    let text = line;
    let label = parts.length === 1 ? "Contact" : `POC ${i + 1}`;
    if (poc) {
      label = `POC ${poc[1]}`;
      text = poc[2].trim();
    }
    const named = text.match(/^([^:-]+)[:\-]\s*(.+)$/);
    out.push(named ? { label, name: named[1].trim(), number: named[2].trim() } : { label, name: null, number: text });
  });
  return out;
}

const CONTACT_PATTERN = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)|((?:\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5})/g;
function linkify(text, linkClass) {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(CONTACT_PATTERN)) {
    const [whole, email] = m;
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(h("a", { href: email ? `mailto:${email}` : `tel:${whole.replace(/[\s-]/g, "")}`, className: linkClass }, whole));
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function contactCard(e, className = "") {
  const entries = contactEntries(e);
  if (!entries.length) return null;
  return h(
    "div",
    { className: `rounded-2xl border border-(--ev-line) bg-(--ev-bg-3)/90 p-4 shadow-sm ${className}` },
    h(
      "div",
      { className: "flex items-center gap-2 mb-3" },
      h(
        "div",
        { className: "flex h-6 w-6 items-center justify-center rounded-full bg-(--ev-gold)/15 border border-(--ev-gold)/30" },
        lucide("phone", "h-3.5 w-3.5 text-(--ev-gold)"),
      ),
      h("h3", { className: "text-xs font-bold uppercase tracking-wider text-(--ev-gold)" }, "Contact Info"),
    ),
    h(
      "div",
      { className: `grid gap-2.5 ${entries.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}` },
      entries.map((c) =>
        h(
          "div",
          { className: "flex flex-col gap-1 rounded-xl border border-(--ev-line)/60 bg-(--ev-bg-2)/80 p-3" },
          h("span", { className: "text-[10px] font-bold uppercase tracking-wider text-(--ev-gold-soft)" }, c.label),
          c.name && h("p", { className: "text-sm font-semibold text-(--ev-text)" }, c.name),
          c.number &&
            h(
              "div",
              { className: "text-xs text-(--ev-mist-2)" },
              linkify(c.number, "text-(--ev-gold-soft)! font-medium underline underline-offset-2 hover:text-white!"),
            ),
        ),
      ),
    ),
  );
}

/** Project details dialog (portal to body), as opened from a card's "View details". */
export function openEventModal(event, returnHref) {
  const e = normalizeEvent(event);
  const path = pathInfo(e.track);
  const prevBody = document.body.style.overflow;
  const prevHtml = document.documentElement.style.overflow;
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
  const restoreFocus = document.activeElement;
  const close = () => {
    backdrop.remove();
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("moosa:navigating", close);
    document.body.style.overflow = prevBody;
    document.documentElement.style.overflow = prevHtml;
    restoreFocus?.focus?.();
  };
  const onKey = (ev) => {
    if (ev.key === "Escape") close();
  };
  const closeBtn = h("button", { type: "button", className: "ev-modal-close", onClick: close, "aria-label": "Close project details" }, lucide("x", "", 20, { "stroke-width": "2.2" }));
  closeBtn.querySelector("svg").setAttribute("stroke-width", "2.2");

  const techRows = e.techStack ? [
    e.techStack.frontend && h("div", null, h("dt", null, "Frontend"), h("dd", null, e.techStack.frontend)),
    e.techStack.backend && h("div", null, h("dt", null, "Backend"), h("dd", null, e.techStack.backend)),
    e.techStack.database && h("div", null, h("dt", null, "Database"), h("dd", null, e.techStack.database)),
    e.techStack.hosting && h("div", null, h("dt", null, "Deployment"), h("dd", null, e.techStack.hosting)),
  ].filter(Boolean) : [];

  const backdrop = h(
    "div",
    {
      className: "ev-modal-backdrop",
      role: "presentation",
      onClick: (ev) => {
        if (ev.target === ev.currentTarget) close();
      },
    },
    h(
      "div",
      { className: "ev-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "ev-modal-title" },
      closeBtn,
      h(
        "div",
        { className: "ev-modal-scroll" },
        h("div", { className: "ev-modal-banner" }, h("div", { className: "ev-pattern", "aria-hidden": "true" }), poster(e.image_url, e.name || e.event_name)),
        h(
          "div",
          { className: "ev-modal-body" },
          h(
            "div",
            { className: "ev-modal-badges" },
            h("span", { className: "ev-society" }, path.kanji, " ", path.virtue),
            e.society_name && h("span", { className: "ev-society" }, e.society_name),
            e.additional_club && e.additional_club !== "None" && h("span", { className: "ev-society" }, e.additional_club),
          ),
          h("h2", { id: "ev-modal-title", className: "ev-modal-title" }, e.name || e.event_name),
          e.tagline && h("p", { className: "text-xs font-semibold text-(--ev-gold-soft) mb-3" }, e.tagline),
          techRows.length > 0 && h("dl", { className: "ev-meta" }, ...techRows),
          h("section", { className: "ev-modal-section" }, h("h3", null, "Project Architecture & Scope"), h("p", { className: "ev-prewrap" }, e.description || e.summary || e.brief_description || "Details will be shared soon.")),
          e.features && e.features.length > 0 && h(
            "section",
            { className: "ev-modal-section" },
            h("h3", null, "Key Core Modules"),
            h(
              "ul",
              { className: "list-disc pl-5 space-y-1.5 text-xs text-(--ev-mist-2)" },
              e.features.map((f) => h("li", null, f)),
            ),
          ),
        ),
      ),
      h(
        "div",
        { className: "ev-modal-actions" },
        e.liveUrl
          ? h("a", { href: e.liveUrl, target: "_blank", rel: "noopener noreferrer", className: "ev-btn ev-btn-primary" }, "Open Live Application ↗")
          : h("span", { className: "ev-btn ev-btn-ghost", "aria-disabled": "true" }, "Local / Cloud Service"),
        h("a", { href: `/projects/${encodeURIComponent(e.id || e.event_id)}`, className: "ev-btn ev-btn-ghost", onClick: close }, "Full Architecture Page →"),
        e.githubUrl && h("a", { href: e.githubUrl, target: "_blank", rel: "noopener noreferrer", className: "ev-btn ev-btn-ghost" }, "View Source ↗"),
      ),
    ),
  );
  document.body.appendChild(backdrop);
  window.addEventListener("keydown", onKey);
  window.addEventListener("moosa:navigating", close);
  closeBtn.focus();
  return close;
}

export function eventCard(event, { returnHref, onSelect } = {}) {
  const e = normalizeEvent(event);
  const path = pathInfo(e.track);
  let opening = false;
  const cta = h("button", { type: "button", className: "ev-card-cta", "aria-busy": "false", "aria-label": `View architecture for ${e.name || e.event_name}` }, "View Architecture →");
  cta.addEventListener("click", () => {
    if (opening) return;
    opening = true;
    cta.className = "ev-card-cta ev-card-cta--opening";
    cta.setAttribute("aria-busy", "true");
    cta.setAttribute("aria-label", `Opening ${e.name || e.event_name}…`);
    cta.replaceChildren(
      h(
        "svg",
        { className: "ev-card-cta-spinner", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" },
        h("circle", { cx: "8", cy: "8", r: "6", stroke: "currentColor", "stroke-width": "2", "stroke-dasharray": "28", "stroke-dashoffset": "10", "stroke-linecap": "round" }),
      ),
      "Opening…",
    );
    (onSelect || ((ev) => openEventModal(ev, returnHref)))(e);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        opening = false;
        cta.className = "ev-card-cta";
        cta.setAttribute("aria-busy", "false");
        cta.setAttribute("aria-label", `View architecture for ${e.name || e.event_name}`);
        cta.replaceChildren("View Architecture →");
      }),
    );
  });

  const techSnippet = e.techStack?.frontend ? e.techStack.frontend.split(",")[0].trim() : (e.additional_club || "Full-Stack System");

  return h(
    "article",
    { className: "ev-card" },
    h(
      "div",
      { className: "ev-thumb" },
      h("div", { className: "ev-pattern", "aria-hidden": "true" }),
      poster(e.image_url, e.name || e.event_name),
      h("span", { className: "ev-path-tag" }, path.kanji, " ", path.virtue),
    ),
    h(
      "div",
      { className: "ev-card-body" },
      e.society_name && h("span", { className: "ev-society" }, e.society_name),
      h("h3", { className: "ev-card-title" }, e.name || e.event_name),
      h("p", { className: "text-xs text-(--ev-mist-2) line-clamp-2 mt-1 mb-2 leading-relaxed" }, e.tagline || e.summary || e.brief_description),
      h("div", { className: "ev-tags" }, h("span", { className: "text-[11px] font-mono text-(--ev-gold)" }, techSnippet), e.category && h("span", { className: "ev-tag-fee" }, e.category)),
      h(
        "div",
        { className: "ev-card-actions" },
        e.liveUrl
          ? h("a", { href: e.liveUrl, target: "_blank", rel: "noopener noreferrer", className: "ev-card-register", "aria-label": `Open live ${e.name || e.event_name}` }, "Live App ↗")
          : h("a", { href: `/projects/${encodeURIComponent(e.id || e.event_id)}`, className: "ev-card-register", "aria-label": `Inspect ${e.name || e.event_name}` }, "Details"),
        cta,
      ),
    ),
  );
}
