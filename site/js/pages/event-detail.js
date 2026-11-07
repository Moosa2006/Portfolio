import { h } from "../core/dom.js";
import { lucide } from "../ui/icons.js";
import {
  eventCard,
  imageUrl,
  loadEventData,
  pathInfo,
  poster,
  safeReturn,
} from "../lib/events.js";

let pageTitle = "Projects | Moosa · Portfolio";
export const title = () => pageTitle;

const BTN_BASE =
  "flex w-full min-h-12 items-center justify-center gap-2 py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.14em] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--ev-bg-2) transition-all";
const BTN_PRIMARY = `${BTN_BASE} rounded-full border border-(--ev-gold) bg-(--ev-gold)/18 text-(--ev-text)! shadow-[0_4px_20px_rgba(0,0,0,0.45),0_0_24px_rgba(212,169,100,0.2)] hover:-translate-y-0.5 hover:bg-(--ev-gold)/32 hover:text-white! hover:shadow-[0_8px_28px_rgba(212,169,100,0.4)] focus-visible:ring-(--ev-gold-soft)`;
const BTN_SECONDARY = `${BTN_BASE} rounded-full border border-(--ev-line-strong) bg-(--ev-bg-3)/90 text-(--ev-mist-2)! hover:-translate-y-0.5 hover:border-(--ev-gold) hover:bg-(--ev-gold)/12 hover:text-(--ev-text)!`;

const STYLE = {
  badgeBg: "bg-(--ev-gold)/12",
  badgeText: "text-(--ev-gold)",
  badgeBorder: "border-(--ev-gold)/30",
  accentHex: "#d4a964",
};

function notFound() {
  pageTitle = "Project Not Found | Moosa Portfolio";
  return h(
    "div",
    { className: "ev-theme relative flex min-h-screen flex-col items-center justify-center bg-(--ev-bg) px-4 text-center text-(--ev-text)" },
    h(
      "div",
      { className: "pointer-events-none fixed inset-0 overflow-hidden", "aria-hidden": "true" },
      h("div", { className: "absolute top-1/3 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--ev-red)/15 blur-3xl" }),
      h("div", {
        className: "absolute inset-0 opacity-15",
        style: { backgroundImage: "radial-gradient(circle at 1px 1px, rgba(214, 176, 94, 0.15) 1px, transparent 0px)", backgroundSize: "24px 24px" },
      }),
    ),
    h(
      "div",
      { className: "relative z-10 max-w-md space-y-6" },
      h(
        "div",
        { className: "mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-(--ev-gold)/30 bg-(--ev-bg-3) shadow-[0_0_30px_rgba(214,176,94,0.15)]" },
        lucide("search-x", "h-10 w-10 text-(--ev-gold)"),
      ),
      h(
        "div",
        { className: "inline-flex items-center gap-1.5 rounded-full border border-(--ev-gold)/30 bg-(--ev-gold)/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-(--ev-gold)" },
        lucide("sparkles", "lucide-stars h-3 w-3"),
        h("span", null, "PROJECT NOT FOUND · 404"),
      ),
      h("h1", { className: "font-(family-name:--ev-heading) text-3xl font-extrabold tracking-tight sm:text-4xl" }, "Project Architecture Not Found"),
      h("p", { className: "text-sm leading-relaxed text-(--ev-mist)" }, "The requested project identifier could not be located in Moosa’s portfolio catalog."),
      h(
        "div",
        { className: "pt-2" },
        h(
          "a",
          {
            className: BTN_PRIMARY,
            href: "/projects",
          },
          lucide("arrow-left", "h-4 w-4"),
          h("span", null, "Return to Projects Showcase"),
        ),
      ),
    ),
  );
}

export default async function eventDetail({ scope, params, query }) {
  const id = decodeURIComponent(params[1] || "").toLowerCase().trim();
  let data;
  try {
    data = await loadEventData();
  } catch {
    return notFound();
  }
  const e = data.byId.get(id) || data.events.find((x) => (x.id || x.event_id || "").toLowerCase() === id);
  if (!e) return notFound();

  const projectName = e.name || e.event_name;
  pageTitle = `${projectName} · System Architecture | Moosa`;

  const path = pathInfo(e.track || e.category);
  const backHref = safeReturn(query.get("from") || "/projects");
  const goldIcon = (name) => lucide(name, "mt-0.5 h-4 w-4 shrink-0 text-(--ev-gold)");

  const shareLabel = h("span", null, "Share");
  const shareIcon = lucide("share-2", "h-3.5 w-3.5");
  const share = h(
    "button",
    {
      type: "button",
      className:
        "flex min-h-11 items-center gap-1.5 rounded-xl border border-(--ev-line) bg-(--ev-bg) px-3 py-1.5 text-xs font-semibold text-(--ev-mist-2) transition-all hover:border-(--ev-gold) hover:text-(--ev-gold)",
      "aria-label": "Share project link",
    },
    shareIcon,
    shareLabel,
  );
  let copiedTimer = 0;
  share.addEventListener("click", async () => {
    try {
      const url = location.href;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        share.setAttribute("aria-label", "Link copied");
        share.replaceChildren(lucide("check", "h-3.5 w-3.5 text-emerald-400"), h("span", { className: "text-emerald-300" }, "Copied"));
        clearTimeout(copiedTimer);
        copiedTimer = setTimeout(() => {
          share.setAttribute("aria-label", "Share project link");
          share.replaceChildren(shareIcon, shareLabel);
        }, 2500);
      } else if (navigator.share) {
        await navigator.share({ title: `${projectName} | Moosa Portfolio`, text: e.tagline || e.summary, url });
      }
    } catch {}
  });
  scope.add(() => clearTimeout(copiedTimer));

  const infoRow = (icon, primary, secondary, extra) =>
    h("div", { className: "flex items-start gap-3" }, icon, h("div", null, h("div", { className: "font-semibold text-(--ev-text)" }, primary), h("div", { className: "text-xs text-(--ev-mist)" }, secondary), extra));

  const techStack = e.techStack || {};
  const related = data.events.filter((x) => (x.id || x.event_id) !== (e.id || e.event_id));

  return h(
    "div",
    { className: "ev-theme relative min-h-screen bg-(--ev-bg) text-(--ev-text)" },
    h(
      "div",
      { className: "pointer-events-none fixed inset-0 overflow-hidden", "aria-hidden": "true" },
      h("div", { className: "absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 opacity-20", style: { background: `radial-gradient(closest-side, ${STYLE.accentHex}, transparent)` } }),
      h("div", {
        className: "absolute inset-0 opacity-10",
        style: { backgroundImage: "radial-gradient(ellipse at 50% 50%, rgba(214,176,94,0.15) 1px, transparent 1px)", backgroundSize: "36px 36px" },
      }),
    ),
    h(
      "header",
      { className: "sticky top-0 z-40 border-b border-(--ev-line) bg-(--ev-bg)/90 backdrop-blur-md" },
      h(
        "div",
        { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8" },
        h(
          "div",
          { className: "flex items-center gap-3" },
          h(
            "a",
            { href: "/", "aria-label": "Moosa portfolio home", className: "shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-(--ev-gold)" },
            h("div", { className: "flex h-9 w-9 items-center justify-center rounded-full border border-(--ev-gold)/40 bg-(--ev-gold)/10 font-bold text-(--ev-gold)" }, "M"),
          ),
          h("span", { className: "text-(--ev-line-strong)", "aria-hidden": "true" }, "/"),
          h(
            "a",
            {
              href: backHref,
              className:
                "group flex min-h-11 items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-(--ev-mist-2)! transition-colors hover:text-(--ev-gold)!",
            },
            lucide("arrow-left", "h-4 w-4 transition-transform group-hover:-translate-x-1"),
            h("span", null, "Back to Projects"),
          ),
          h("span", { className: "hidden text-(--ev-mist)/50 sm:inline", "aria-hidden": "true" }, "/"),
          h("span", { className: "hidden max-w-[200px] truncate text-xs text-(--ev-mist) sm:inline" }, projectName),
        ),
        h("div", { className: "flex items-center gap-3" }, share, h("div", { className: "account-status signed-out" }, h("span", { className: "status-pulse" }), " Moosa · Full-Stack")),
      ),
    ),
    h(
      "main",
      { className: "relative z-10 mx-auto max-w-7xl px-4 pt-6 pb-28 sm:px-6 sm:pt-8 lg:px-8 lg:pb-8" },
      h(
        "div",
        { className: "grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-8" },
        h(
          "div",
          { className: "lg:col-span-7 lg:col-start-6 lg:row-start-1" },
          h(
            "div",
            { className: "mb-3 flex flex-wrap items-center gap-2 text-sm" },
            h("span", { className: "rounded-lg border border-(--ev-gold)/30 bg-(--ev-gold)/10 px-3 py-1 font-semibold text-(--ev-gold)" }, path.virtue),
            e.society_name && h("span", { className: "rounded-lg border border-(--ev-line-strong) bg-(--ev-bg-3) px-3 py-1 font-semibold text-(--ev-mist-2)" }, e.society_name),
          ),
          h("h1", { className: "font-(family-name:--ev-heading) text-3xl font-extrabold tracking-tight text-(--ev-text) sm:text-4xl lg:text-5xl" }, projectName),
          e.tagline && h("p", { className: "mt-3 text-sm leading-relaxed text-(--ev-gold-soft) font-medium" }, e.tagline),
          h(
            "div",
            { className: "mt-3 flex items-center gap-2 text-xs text-(--ev-mist)" },
            h("span", { className: "font-mono text-(--ev-mist)/75" }, "SYSTEM ID: ", e.id || e.event_id),
            h("span", { "aria-hidden": "true" }, "✦"),
            h("span", null, e.category),
          ),
        ),
        h(
          "div",
          { className: "grid content-start gap-6 md:grid-cols-2 md:items-start lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:grid-cols-1" },
          h(
            "div",
            { className: "group relative overflow-hidden rounded-3xl border border-(--ev-line) bg-(--ev-bg) shadow-2xl" },
            h(
              "div",
              { className: "ev-poster-frame relative overflow-hidden bg-(--ev-bg) aspect-[1200/600] w-full" },
              h("div", { className: "ev-pattern", "aria-hidden": "true" }),
              poster(imageUrl(e.image_url || e.image_key), `Banner for ${projectName}`, "large"),
            ),
            h(
              "div",
              { className: "absolute top-4 left-4 z-10" },
              h(
                "span",
                { className: `inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold tracking-wider uppercase backdrop-blur-md border ${STYLE.badgeBg} ${STYLE.badgeText} ${STYLE.badgeBorder} shadow-lg` },
                h("span", { className: "font-(family-name:--ev-heading)" }, path.kanji),
                h("span", null, path.virtue),
              ),
            ),
          ),
          h(
            "div",
            { className: "rounded-3xl border border-(--ev-line) bg-(--ev-bg-2)/80 p-6 shadow-xl space-y-5" },
            h("h3", { className: "font-(family-name:--ev-heading) text-sm font-bold uppercase tracking-wider text-(--ev-gold)" }, "Engineering Metadata"),
            h(
              "div",
              { className: "space-y-4 text-sm" },
              infoRow(goldIcon("layers"), e.category, "Engineering Category / Domain"),
              infoRow(
                goldIcon("globe"),
                e.liveUrl ? "Live Production Deployment" : "Cloud Web Service / Local",
                techStack.hosting || "Vercel + Render Cloud Architecture",
              ),
              techStack.database && infoRow(goldIcon("database"), techStack.database, "Persistent Database & Data Stores"),
              techStack.security && infoRow(goldIcon("shield-check"), techStack.security, "Authentication & Security Layer"),
              techStack.ai_vision && infoRow(goldIcon("sparkles"), techStack.ai_vision, "Multimodal AI & Algorithmic Logic"),
            ),
            h(
              "div",
              { className: "space-y-3 pt-3 border-t border-(--ev-line)" },
              e.liveUrl
                ? h(
                    "a",
                    {
                      href: e.liveUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: BTN_PRIMARY,
                    },
                    lucide("external-link", "h-4 w-4"),
                    h("span", null, "Open Live Application ↗"),
                  )
                : h(
                    "span",
                    { className: `${BTN_PRIMARY} opacity-60 cursor-not-allowed` },
                    lucide("server", "h-4 w-4"),
                    h("span", null, "Cloud Web Service / Local"),
                  ),
              e.githubUrl &&
                h(
                  "a",
                  {
                    href: e.githubUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: BTN_SECONDARY,
                  },
                  lucide("github", "h-4 w-4"),
                  h("span", null, "View Source / Architecture"),
                ),
            ),
          ),
        ),
        h(
          "div",
          { className: "space-y-6 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:space-y-8" },
          h(
            "div",
            { className: "rounded-3xl border border-(--ev-line) bg-(--ev-bg-2)/80 p-6 sm:p-8 shadow-xl" },
            h("h2", { className: "mb-4 font-(family-name:--ev-heading) text-xl font-bold text-(--ev-text)" }, "Executive Summary & Architectural Scope"),
            h(
              "div",
              { className: "prose prose-invert max-w-none text-sm leading-relaxed text-(--ev-mist-2) space-y-4" },
              e.summary && h("p", { className: "font-medium text-(--ev-text)" }, e.summary),
              h("p", null, e.description || e.brief_description),
            ),
          ),
          h(
            "div",
            { className: "rounded-3xl border border-(--ev-line) bg-(--ev-bg-2)/80 p-6 sm:p-8 shadow-xl space-y-4" },
            h("h2", { className: "font-(family-name:--ev-heading) text-xl font-bold text-(--ev-text)" }, "Tech Stack & Core Libraries"),
            h(
              "div",
              { className: "grid grid-cols-1 gap-3 sm:grid-cols-2" },
              techStack.frontend &&
                h(
                  "div",
                  { className: "rounded-2xl border border-(--ev-line) bg-(--ev-bg-3)/70 p-4" },
                  h("span", { className: "text-[10px] font-bold uppercase tracking-wider text-(--ev-gold)" }, "Frontend Layer"),
                  h("p", { className: "mt-1 text-xs font-semibold text-(--ev-text)" }, techStack.frontend),
                ),
              techStack.backend &&
                h(
                  "div",
                  { className: "rounded-2xl border border-(--ev-line) bg-(--ev-bg-3)/70 p-4" },
                  h("span", { className: "text-[10px] font-bold uppercase tracking-wider text-(--ev-gold)" }, "Backend Engine"),
                  h("p", { className: "mt-1 text-xs font-semibold text-(--ev-text)" }, techStack.backend),
                ),
              techStack.database &&
                h(
                  "div",
                  { className: "rounded-2xl border border-(--ev-line) bg-(--ev-bg-3)/70 p-4" },
                  h("span", { className: "text-[10px] font-bold uppercase tracking-wider text-(--ev-gold)" }, "Database & ORM"),
                  h("p", { className: "mt-1 text-xs font-semibold text-(--ev-text)" }, techStack.database),
                ),
              techStack.security &&
                h(
                  "div",
                  { className: "rounded-2xl border border-(--ev-line) bg-(--ev-bg-3)/70 p-4" },
                  h("span", { className: "text-[10px] font-bold uppercase tracking-wider text-(--ev-gold)" }, "Auth & Security"),
                  h("p", { className: "mt-1 text-xs font-semibold text-(--ev-text)" }, techStack.security),
                ),
              techStack.ai_vision &&
                h(
                  "div",
                  { className: "sm:col-span-2 rounded-2xl border border-(--ev-line) bg-(--ev-bg-3)/70 p-4" },
                  h("span", { className: "text-[10px] font-bold uppercase tracking-wider text-(--ev-gold)" }, "AI & Multimodal Processing"),
                  h("p", { className: "mt-1 text-xs font-semibold text-(--ev-text)" }, techStack.ai_vision),
                ),
            ),
          ),
          e.features &&
            e.features.length > 0 &&
            h(
              "div",
              { className: "rounded-3xl border border-(--ev-line) bg-(--ev-bg-2)/80 p-6 sm:p-8 shadow-xl" },
              h("h2", { className: "mb-4 font-(family-name:--ev-heading) text-xl font-bold text-(--ev-text)" }, "Architecture & Core Modules"),
              h(
                "ul",
                { className: "space-y-3" },
                e.features.map((feat) =>
                  h(
                    "li",
                    { className: "flex items-start gap-3 text-sm text-(--ev-mist-2)" },
                    lucide("check-circle-2", "mt-0.5 h-4 w-4 shrink-0 text-(--ev-gold)"),
                    h("span", null, feat),
                  ),
                ),
              ),
            ),
          h(
            "div",
            { className: "rounded-3xl border border-(--ev-line) bg-(--ev-bg)/60 p-6 text-xs text-(--ev-mist) space-y-2" },
            h("div", { className: "flex items-center gap-2 font-semibold text-(--ev-mist-2)" }, lucide("code", "h-4 w-4 text-(--ev-gold)"), h("span", null, "Engineering Standards & Production Integrity")),
            h(
              "p",
              null,
              "Engineered with strict type safety, modular micro-component design, defensive input validation via Zod, and optimized asset delivery for sub-second first contentful paint.",
            ),
          ),
        ),
      ),
      related.length > 0 &&
        h(
          "section",
          { className: "mt-12 border-t border-(--ev-line) pt-10 sm:mt-16 sm:pt-12" },
          h(
            "div",
            { className: "mb-6 flex flex-wrap items-end justify-between gap-3" },
            h(
              "div",
              null,
              h("h2", { className: "font-(family-name:--ev-heading) text-2xl font-bold text-(--ev-text)" }, "Explore More Engineering Works"),
              h("p", { className: "text-xs text-(--ev-mist) mt-1" }, "Explore other full-stack web applications and systems in Moosa’s portfolio"),
            ),
            h("a", { href: "/projects", className: "text-xs font-semibold text-(--ev-gold)! hover:underline" }, "View all projects →"),
          ),
          h(
            "div",
            { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" },
            related.slice(0, 3).map((x) => eventCard(x)),
          ),
        ),
    ),
  );
}
