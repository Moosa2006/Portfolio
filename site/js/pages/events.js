import { h, clear, prefersReducedMotion } from "../core/dom.js";
import { arrowIcon, festivalNavbar, siteFooter } from "../ui/common.js";
import { lucide } from "../ui/icons.js";
import {
  COMING_SOON_PATHS,
  PAGE_SIZE,
  PATHS,
  eventCard,
  eventDays,
  filterEvents,
  listingHref,
  loadEventData,
  pathInfo,
  readFilters,
  soonestSort,
  sortDays,
} from "../lib/events.js";

export const title = "Projects & Engineering Showcase · Moosa";

const FAN_ART = {
  all: "/art/fans/technical.webp",
  civic: "/art/fans/cultural.webp",
  verification: "/art/fans/literary.webp",
  productivity: "/art/fans/gaming.webp",
  edtech: "/art/fans/performing.webp",
};
const FAN_ROTATION = { all: -24, civic: -12, verification: 0, productivity: 12, edtech: 24 };
const FAN_OFFSET = { all: -210, civic: -105, verification: 0, productivity: 105, edtech: 210 };
const PATH_IDS = PATHS.map((p) => p.id);
const PATH_HINTS = {
  all: "Full-Stack web applications, Linux automation & algorithms",
  civic: "Municipal GIS, multimodal AI triage, and accountability pipelines",
  verification: "Proof-backed developer profiles & algorithmic matchmaking",
  productivity: "Habit streaks, state sync, and team workspaces",
  edtech: "Role competency modeling & structured career roadmaps",
};
const CATEGORY_COPY = {
  all: {
    title: "All Projects & Systems",
    subtitle: "End-to-End Engineering Portfolio",
    description: "Explore Moosa's software engineering portfolio spanning enterprise civic platforms, proof-backed matchmaking architectures, high-performance productivity workspaces, and career competency engines.",
  },
  civic: {
    title: "Civic & Enterprise Tech",
    subtitle: "Public Accountability & Municipal GIS",
    description: "Enterprise software bridging citizens, officials, and contractors through multimodal AI validation, SLA tracking, and GIS field reporting.",
  },
  verification: {
    title: "Verification & Talent",
    subtitle: "Evidence-Backed Profiles & Matchmaking",
    description: "Platforms replacing unverified developer claims with verified artifacts and pairing hackathon squads with complementary engineering strengths.",
  },
  productivity: {
    title: "Productivity & Social",
    subtitle: "Habit Streaks & Collaborative Workspaces",
    description: "High-performance productivity tools designed to sustain engineering momentum through automated streak engines and real-time team collaboration.",
  },
  edtech: {
    title: "Career & EdTech",
    subtitle: "Competency Matching & Gap Analysis",
    description: "Career-readiness architectures that analyze developer skill matrices against production benchmarks to chart actionable learning roadmaps.",
  },
};

function countLabel(id, counts) {
  if (COMING_SOON_PATHS.includes(id)) return "Coming soon";
  const n = counts[id];
  if (n === undefined) return null;
  if (n === 0) return "Coming soon";
  return `${n} ${n === 1 ? "event" : "events"}`;
}

function bladeInner(path, tag = "span", { cta = null, eager = true } = {}) {
  const T = tag === "div";
  return h(
    T ? "div" : "span",
    { className: "sensu-blade-inner" },
    h("img", { src: FAN_ART[path.id], alt: T ? `${path.virtue} Fan Art` : "", className: "sensu-blade-img", loading: eager ? "eager" : "lazy" }),
    h(T ? "div" : "span", { className: "sensu-blade-scrim" }),
    h(T ? "div" : "span", { className: "sensu-blade-rib" }),
    h(T ? "div" : "span", { className: "sensu-blade-kintsugi" }),
    h(
      T ? "div" : "span",
      { className: "sensu-blade-content" },
      h("span", { className: "sensu-blade-number" }, path.number),
      h("span", { className: "sensu-blade-kanji" }, path.kanji),
      h(T ? "h3" : "span", { className: "sensu-blade-title" }, path.virtue),
      h(T ? "p" : "span", { className: "sensu-blade-category" }, path.category),
      cta,
    ),
  );
}

function pivotRivet(extra = {}) {
  return h(
    "div",
    { className: "sensu-pivot-rivet", ...extra },
    h("div", { className: "sensu-pivot-gem" }),
    h("div", { className: "sensu-pivot-ring" }),
    h("div", { className: "sensu-pivot-tassel" }, h("span", { className: "tassel-cord" }), h("span", { className: "tassel-head" }), h("span", { className: "tassel-fringe" })),
  );
}

/* ----------------------- mobile blade rail (path picker) ------------------- */

function pathPicker(scope, counts, onSelect) {
  let active = 0;
  const rail = h("ul", { className: "path-rail", "aria-label": "Event paths" });
  const previewSlot = h("div", { style: "display:contents" });
  const picker = h(
    "div",
    { className: "path-picker" },
    h("p", { className: "path-hint", "aria-hidden": "true" }, h("span", null, "‹"), " Swipe the fan · tap a blade to open ", h("span", null, "›")),
    rail,
    h("div", { className: "path-pivot", "aria-hidden": "true" }, pivotRivet()),
    previewSlot,
    h(
      "button",
      { type: "button", className: "path-flagship", onClick: () => onSelect("all") },
      h("span", { className: "path-flagship-kanji", "aria-hidden": "true" }, "全"),
      h("span", { className: "path-flagship-text" }, h("span", { className: "path-flagship-name" }, "All Projects & Systems"), h("span", { className: "path-flagship-hint" }, PATH_HINTS.all)),
      countLabel("all", counts) && h("span", { className: "path-count" }, countLabel("all", counts)),
      h("span", { className: "path-chevron", "aria-hidden": "true" }, "›"),
    ),
  );
  const scrollToBlade = (i) => {
    const li = rail.children[i];
    if (!li) return;
    rail.scrollTo({ left: li.offsetLeft - (rail.clientWidth - li.offsetWidth) / 2, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    setActive(i);
  };
  const render = () => {
    clear(rail);
    PATHS.forEach((p, i) => {
      const d = Math.max(-2, Math.min(2, i - active));
      const isActive = d === 0;
      const inner = bladeInner(p, "span", { eager: i < 2 });
      const li = h(
        "li",
        {
          className: `path-blade${isActive ? " is-active" : ""}`,
          style: {
            transform: isActive ? "translateY(-10px) scale(1)" : `translateY(${12 * Math.abs(d)}px) rotate(${7 * d}deg) scale(${1 - 0.08 * Math.abs(d)})`,
            zIndex: String(10 - Math.abs(d)),
          },
        },
        isActive
          ? h("button", { type: "button", className: "path-blade-hit", onClick: () => onSelect(p.id), "aria-label": `Open ${p.virtue} events` }, inner)
          : h("button", { type: "button", className: "path-blade-hit", onClick: () => scrollToBlade(i), "aria-label": `Show ${p.virtue}` }, inner),
      );
      rail.appendChild(li);
    });
    const p = PATHS[active];
    const label = countLabel(p.id, counts);
    clear(previewSlot);
    previewSlot.appendChild(
      h(
        "div",
        { className: "sensu-active-preview path-preview", "data-track": p.id, "aria-live": "polite" },
        h(
          "div",
          { className: "preview-top" },
          h("span", { className: "preview-kanji", "aria-hidden": "true" }, p.kanji),
          h("div", null, h("span", { className: "preview-number" }, p.number, " · ", p.category), h("h3", { className: "preview-name" }, p.name)),
        ),
        h("p", { className: "preview-desc" }, p.description),
        h("p", { className: "path-preview-meta" }, h("span", null, PATH_HINTS[p.id]), label && h("span", { className: "path-count", "data-soon": label === "Coming soon" ? "true" : undefined }, label)),
        h("button", { type: "button", className: "button button-gold preview-enter-btn", onClick: () => onSelect(p.id) }, "Explore ", p.virtue, " Events ", arrowIcon()),
      ),
    );
  };
  const setActive = (i) => {
    if (i === active) return;
    active = i;
    // Update transforms in place so the rail's scroll position is preserved.
    [...rail.children].forEach((li, j) => {
      const d = Math.max(-2, Math.min(2, j - active));
      li.className = `path-blade${d === 0 ? " is-active" : ""}`;
      li.style.transform = d === 0 ? "translateY(-10px) scale(1)" : `translateY(${12 * Math.abs(d)}px) rotate(${7 * d}deg) scale(${1 - 0.08 * Math.abs(d)})`;
      li.style.zIndex = String(10 - Math.abs(d));
      const btn = li.firstElementChild;
      const p = PATHS[j];
      const fresh = h(
        "button",
        { type: "button", className: "path-blade-hit", onClick: d === 0 ? () => onSelect(p.id) : () => scrollToBlade(j), "aria-label": d === 0 ? `Open ${p.virtue} events` : `Show ${p.virtue}` },
        ...btn.childNodes,
      );
      btn.replaceWith(fresh);
    });
    const p = PATHS[active];
    const label = countLabel(p.id, counts);
    const preview = previewSlot.firstElementChild;
    preview.dataset.track = p.id;
    preview.querySelector(".preview-kanji").textContent = p.kanji;
    preview.querySelector(".preview-number").textContent = `${p.number} · ${p.category}`;
    preview.querySelector(".preview-name").textContent = p.name;
    preview.querySelector(".preview-desc").textContent = p.description;
    const meta = preview.querySelector(".path-preview-meta");
    meta.replaceChildren(h("span", null, PATH_HINTS[p.id]), label ? h("span", { className: "path-count", "data-soon": label === "Coming soon" ? "true" : undefined }, label) : "");
    const enter = preview.querySelector(".preview-enter-btn");
    enter.replaceChildren("Explore ", p.virtue, " Events ", arrowIcon());
    enter.onclick = () => onSelect(p.id);
  };
  render();
  let raf = 0;
  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      [...rail.children].forEach((li, i) => {
        const d = Math.abs(li.offsetLeft + li.offsetWidth / 2 - center);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive(best);
    });
  };
  rail.addEventListener("scroll", onScroll, { passive: true });
  scope.add(() => cancelAnimationFrame(raf));
  return picker;
}

/* --------------------------- desktop sensu fan ---------------------------- */

function sensuFan(onSelect) {
  let hovered = null;
  let preview = "all";
  const pivot = h("div", { className: "sensu-fan-pivot" });
  const previewEl = h("div", { className: "sensu-active-preview" });
  const blades = PATHS.map((p) => {
    const btn = h(
      "button",
      {
        type: "button",
        className: "sensu-blade  ",
        "aria-label": `Explore ${p.name} (${p.virtue})`,
        onMouseenter: () => setHover(p.id),
        onMouseleave: () => setHover(null),
        onClick: () => onSelect(p.id),
      },
      bladeInner(p, "div", { eager: false, cta: h("span", { className: "sensu-blade-cta" }, "Filter", " ", arrowIcon(false)) }),
    );
    btn.querySelector(".sensu-blade-img").loading = "lazy";
    return { p, btn };
  });
  const layout = () => {
    for (const { p, btn } of blades) {
      const isHovered = hovered === p.id;
      const base = FAN_ROTATION[p.id];
      let rot = base;
      let y = 0;
      let scale = 1;
      let z = 10;
      if (hovered) {
        if (isHovered) {
          rot = 0.4 * base;
          y = -45;
          scale = 1.14;
          z = 30;
        } else {
          rot = base + (FAN_ROTATION[p.id] - FAN_ROTATION[hovered] > 0 ? 8 : -8);
          y = 10;
          scale = 0.94;
          z = 5;
        }
      }
      btn.className = `sensu-blade ${isHovered ? "is-hovered" : ""} `;
      btn.style.transform = `translateX(${FAN_OFFSET[p.id]}px) translateY(${y}px) rotate(${rot}deg) scale(${scale})`;
      btn.style.zIndex = String(z);
    }
    const p = pathInfo(preview);
    previewEl.dataset.track = preview;
    previewEl.replaceChildren(
      h(
        "div",
        { className: "preview-top" },
        h("span", { className: "preview-kanji" }, p.kanji),
        h("div", null, h("span", { className: "preview-number" }, p.number, " · ", p.category), h("h4", { className: "preview-name" }, p.name)),
      ),
      h("p", { className: "preview-desc" }, p.description),
      h("button", { className: "button button-gold preview-enter-btn", onClick: () => onSelect(preview) }, "Explore ", p.virtue, " Events ", arrowIcon()),
    );
  };
  const setHover = (id) => {
    hovered = id;
    if (id) preview = id;
    layout();
  };
  for (const { btn } of blades) pivot.appendChild(btn);
  pivot.appendChild(pivotRivet({ "aria-hidden": "true" }));
  const tabs = h(
    "div",
    { className: "sensu-mobile-tabs", role: "group", "aria-label": "Category selector" },
    PATHS.map((p) =>
      h(
        "button",
        {
          type: "button",
          "aria-pressed": String(p.id === preview),
          className: `sensu-tab ${p.id === preview ? "is-active" : ""} `,
          onClick: () => {
            preview = p.id;
            onSelect(p.id);
          },
        },
        h("span", { className: "sensu-tab-kanji" }, p.kanji),
        h("span", null, p.virtue),
      ),
    ),
  );
  layout();
  return h(
    "div",
    { className: "sensu-fan-container" },
    h("div", { className: "sensu-fan-stage", "aria-label": "Interactive Japanese Folding Fan" }, pivot),
    previewEl,
    tabs,
  );
}

/* ------------------------------ portfolio ticker ---------------------------- */

function tickerSegment(hidden) {
  const dot = () => h("span", { className: "tf-ticker-dot", "aria-hidden": "true" }, "·");
  return h(
    "div",
    { className: "tf-ticker-segment", "aria-hidden": hidden ? "true" : undefined },
    h("span", { className: "tf-ticker-title" }, "MOOSA · FULL-STACK & SYSTEMS DEVELOPER"),
    dot(),
    h("span", { className: "tf-ticker-free" }, "PRODUCTION READY"),
    dot(),
    h("span", { className: "tf-ticker-date" }, "REACT 19 · NODE.JS · POSTGRESQL · GEMINI AI"),
    dot(),
    h("span", { className: "tf-ticker-venue" }, "GNDEC · INFORMATION TECHNOLOGY"),
    dot(),
    h(
      "a",
      { href: "/contact", className: "tf-ticker-cta", tabIndex: hidden ? -1 : 0, "aria-label": "Contact Moosa (opens contact page)" },
      h("span", null, "CONTACT ME"),
      h("span", { className: "tf-ticker-arrow", "aria-hidden": "true" }, "→"),
    ),
    dot(),
    ["Civora", "PRAMAAN", "DailyTrack", "SkillGap"].flatMap((c, i) => [
      h("a", { href: `/projects/${c.toLowerCase()}`, className: "tf-ticker-comp", tabIndex: hidden ? -1 : 0, title: `View ${c} architecture` }, c),
      i < 3 ? dot() : null,
    ]),
    dot(),
  );
}
const techfestTicker = () =>
  h(
    "div",
    { className: "tf-ticker-wrap", role: "region", "aria-label": "Engineering highlights ticker" },
    h("div", { className: "tf-ticker-track" }, tickerSegment(false), tickerSegment(false), tickerSegment(true), tickerSegment(true)),
  );

/* ---------------------------------- page ----------------------------------- */

export default async function events(ctx) {
  const { scope, path } = ctx;
  let data = null;
  let loadError = false;
  try {
    data = await loadEventData();
  } catch {
    loadError = true;
  }
  const counts = data?.counts ?? {};
  const view = h("div");
  const main = h("main", { className: "ev-page" }, view);

  const navbarScope = new (scope.constructor)();
  scope.add(() => navbarScope.dispose());
  const navbar = festivalNavbar(navbarScope, path);
  const footer = siteFooter("margin-top: auto;");

  let renderScope = null;
  let filterOpen = false;
  let searchTimer = 0;
  let debouncedQuery = null;

  const currentCategory = () => {
    const params = new URLSearchParams(location.search);
    const raw = (params.get("category") || params.get("track") || "").trim().toLowerCase();
    if (!raw) return null;
    const match = PATHS.find((p) => p.id === raw || p.virtue.toLowerCase() === raw);
    return match ? match.id : null;
  };

  const goCategory = (id) => {
    if (id === currentCategory()) return;
    history.pushState(null, "", id ? `/projects?category=${encodeURIComponent(id)}` : "/projects");
    filterOpen = false;
    debouncedQuery = null;
    window.scrollTo(0, 0);
    render();
  };
  const replaceFilters = (patch) => {
    const category = currentCategory();
    const f = { ...readFilters(new URLSearchParams(location.search)), ...patch };
    history.replaceState(null, "", listingHref(category, f));
    render();
  };
  const clearFilters = () => {
    history.replaceState(null, "", listingHref(currentCategory(), { query: "", club: "all", type: "all", fee: "all", day: "all" }));
    debouncedQuery = "";
    render();
  };
  const goPage = (page) => {
    history.pushState(null, "", listingHref(currentCategory(), readFilters(new URLSearchParams(location.search)), page));
    render();
  };

  const pathsView = () =>
    [
      h(
        "section",
        { id: "paths", className: "paths-section section-shell ", "aria-labelledby": "paths-title" },
        h(
          "div",
          { className: "section-heading", "data-reveal": "true" },
          h("div", null, h("p", { className: "eyebrow" }, "FEATURED WORKS · SYSTEM ARCHITECTURES"), h("h2", { id: "paths-title" }, "Explore by ", h("em", null, "domain."))),
          h("p", null, "Five engineering domains.", h("br"), "Select a domain to inspect architectures, technical stacks, and live deployments."),
        ),
        pathPicker(renderScope, counts, goCategory),
        sensuFan(goCategory),
        h("p", { className: "section-footnote" }, "BUILT FOR SCALE · ROOTED IN REAL PROBLEMS · VERIFIABLE AT EVERY LAYER."),
      ),
      h(
        "p",
        { className: "ev-flagship-link ev-inner" },
        h("span", null, "Want to view all projects together in a unified listing?"),
        h("button", { type: "button", className: "ev-btn ev-btn-ghost", onClick: () => goCategory("all") }, "全 View Complete Project Catalog →"),
      ),
    ];

  const listingView = (category) => {
    const params = new URLSearchParams(location.search);
    const filters = readFilters(params);
    const page = Number(params.get("page") || 1) > 1 ? Number(params.get("page")) : 1;
    const info = pathInfo(category);
    const copy = CATEGORY_COPY[category] || CATEGORY_COPY.all;
    const query = debouncedQuery ?? filters.query;
    const searching = !!query.trim();

    let list = [];
    let total = 0;
    if (data) {
      const source = category === "all" ? data.events : (data.categories[category] || filterEvents(data.events, "", category, null));
      const pool = searching
        ? filterEvents(data.events, query, category === "all" ? null : category, filters).sort((a, b) => soonestSort(a, b))
        : filterEvents(source || [], "", null, filters);
      total = pool.length;
      const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      const safePage = Math.min(page, pages);
      if (safePage !== page) history.replaceState(null, "", listingHref(category, filters, safePage));
      list = pool.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
    }
    const pageNow = Math.min(page, Math.max(1, Math.ceil(total / PAGE_SIZE)));
    const filtered = filters.query.trim() !== "";
    const returnHref = listingHref(category, filters, pageNow);

    const searchInput = h("input", {
      type: "search",
      "aria-label": "Search projects",
      placeholder: "Search projects by keyword, stack, or feature...",
      value: filters.query,
    });
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value;
      const f = { ...readFilters(new URLSearchParams(location.search)), query: value };
      history.replaceState(null, "", listingHref(category, f));
      clearTimeout(searchTimer);
      if (!value.trim()) {
        debouncedQuery = "";
        render({ keepFocus: true });
        return;
      }
      searchTimer = setTimeout(() => {
        debouncedQuery = value;
        render({ keepFocus: true });
      }, 150);
    });

    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const from = total ? (pageNow - 1) * PAGE_SIZE + 1 : 0;
    const to = Math.min(pageNow * PAGE_SIZE, total);

    let results;
    if (loadError) {
      results = h(
        "div",
        { className: "ev-empty", role: "alert" },
        h("span", { className: "ev-empty-kanji", "aria-hidden": "true" }, "断"),
        h("p", null, "We couldn’t load these projects right now."),
        h("p", { className: "ev-empty-hint" }, "Check your connection and try again."),
        h(
          "button",
          {
            type: "button",
            className: "ev-btn ev-btn-primary",
            onClick: async () => {
              try {
                data = await loadEventData();
                loadError = false;
              } catch {}
              render();
            },
          },
          "Try again",
        ),
      );
    } else if (list.length === 0) {
      results = h(
        "div",
        { className: "ev-empty" },
        h("span", { className: "ev-empty-kanji", "aria-hidden": "true" }, "空"),
        h("p", null, "No projects match", query.trim() ? ` “${query.trim()}”` : " this domain", "."),
        h("button", { type: "button", className: "ev-btn ev-btn-ghost", onClick: clearFilters }, "Clear search"),
      );
    } else {
      results = h("div", { className: "ev-grid" }, list.map((e) => eventCard(e, { returnHref })));
    }

    return h(
      "section",
      { id: "events-results", className: "ev-results-section ev-inner", "aria-labelledby": "category-results-heading" },
      h(
        "nav",
        { className: "ev-path-switch", "aria-label": "Switch engineering domain" },
        h("button", { type: "button", className: "ev-switch-chip ev-switch-all", onClick: () => goCategory(null) }, h("span", { "aria-hidden": "true" }, "←"), " All Domains"),
        PATH_IDS.map((id) =>
          h(
            "button",
            { type: "button", className: "ev-switch-chip", "aria-current": id === category ? "page" : undefined, onClick: () => goCategory(id) },
            h("span", { className: "ev-switch-kanji", "aria-hidden": "true" }, pathInfo(id).kanji),
            " ",
            pathInfo(id).virtue,
          ),
        ),
      ),
      h(
        "div",
        { className: "ev-hero" },
        h("span", { className: "ev-hero-kanji", "aria-hidden": "true" }, info.kanji),
        h("p", { className: "ev-hero-number" }, `${info.number} · ${info.category}`),
        h("h1", { id: "category-results-heading", className: "ev-title" }, copy.title),
        h("p", { className: "ev-motto" }, copy.subtitle),
        h("p", { className: "ev-subtitle" }, copy.description),
      ),
      techfestTicker(),
      h(
        "div",
        { className: "ev-browse" },
        h(
          "div",
          { className: "ev-browse-main w-full" },
          h(
            "div",
            { className: "ev-toolbar mb-4 flex items-center justify-between gap-4" },
            h(
              "div",
              { className: "ev-search max-w-md w-full" },
              h(
                "svg",
                { className: "ev-search-icon", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
                h("circle", { cx: "11", cy: "11", r: "8" }),
                h("path", { d: "m21 21-4.3-4.3" }),
              ),
              searchInput,
            ),
            h("p", { className: "ev-result-count whitespace-nowrap text-xs text-(--ev-mist)", role: "status" }, total > 0 ? `Showing ${from}–${to} of ${total} ${total === 1 ? "project" : "projects"}` : "No projects found"),
          ),
          h("div", { "aria-live": "polite" }, results),
          total > PAGE_SIZE &&
            h(
              "nav",
              { className: "ev-pagination", "aria-label": "Project result pages" },
              h(
                "button",
                { type: "button", className: "ev-page-button", onClick: () => goPage(Math.max(1, pageNow - 1)), disabled: pageNow === 1, "aria-label": "Previous page" },
                lucide("chevron-left"),
                h("span", null, "Previous"),
              ),
              h("span", { className: "ev-page-status", "aria-live": "polite" }, "Page ", String(pageNow), " of ", String(pages)),
              h(
                "button",
                { type: "button", className: "ev-page-button", onClick: () => goPage(Math.min(pages, pageNow + 1)), disabled: pageNow === pages, "aria-label": "Next page" },
                h("span", null, "Next"),
                lucide("chevron-right"),
              ),
            ),
        ),
      ),
    );
  };

  const render = ({ keepFocus = false } = {}) => {
    const focusedSearch = keepFocus && document.activeElement?.matches?.(".ev-search input");
    const caret = focusedSearch ? document.activeElement.selectionStart : null;
    renderScope?.dispose();
    renderScope = new (scope.constructor)();
    const category = currentCategory();
    view.className = category ? "ev-view has-path" : "ev-view";
    clear(view);
    view.append(navbar);
    if (!category) view.append(...pathsView());
    else view.append(listingView(category));
    view.append(footer);
    if (focusedSearch) {
      const input = view.querySelector(".ev-search input");
      input?.focus();
      if (caret !== null) input?.setSelectionRange(caret, caret);
    }
    if (category) {
      const nav = view.querySelector(".ev-path-switch");
      const current = nav?.querySelector('[aria-current="page"]');
      requestAnimationFrame(() => {
        if (!nav || !current) return;
        const first = nav.firstElementChild;
        const min = current.offsetLeft - (first?.offsetWidth ?? 0) - 16;
        const max = current.offsetLeft + current.offsetWidth + 40 - nav.clientWidth;
        if (nav.scrollLeft > min) nav.scrollLeft = Math.max(0, min);
        else if (nav.scrollLeft < max) nav.scrollLeft = max;
      });
    }
  };
  scope.add(() => {
    renderScope?.dispose();
    clearTimeout(searchTimer);
  });
  render();
  return main;
}
