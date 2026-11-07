import { h, clear } from "../core/dom.js";
import { arrowIcon, destinationShell } from "../ui/common.js";
import { lucide } from "../ui/icons.js";

export const title = "Journey & Milestones · Moosa";

const BADGE_COLORS = {
  gold: { bg: "rgba(201, 154, 58, 0.15)", border: "rgba(201, 154, 58, 0.5)", text: "#f5d78e" },
  blue: { bg: "rgba(108, 182, 255, 0.15)", border: "rgba(108, 182, 255, 0.4)", text: "#96ccff" },
  crimson: { bg: "rgba(167, 13, 22, 0.2)", border: "rgba(224, 86, 96, 0.5)", text: "#ffa4a9" },
  teal: { bg: "rgba(82, 184, 166, 0.15)", border: "rgba(82, 184, 166, 0.45)", text: "#8ce4d4" },
};

export default async function calendar(ctx) {
  const { scope, path } = ctx;

  let scheduleData = { tabs: [] };
  try {
    const res = await fetch("/data/schedule.json");
    scheduleData = await res.json();
  } catch (err) {
    console.error("Failed to load schedule.json", err);
  }

  const tabs = scheduleData.tabs || [];
  let activeTabKey = tabs[0]?.key || "academics";

  const page = h("div", { className: "prog-page journey-page" });

  function render() {
    clear(page);

    const activeTab = tabs.find((t) => t.key === activeTabKey) || tabs[0];

    // Hero Header
    const hero = h(
      "header",
      { className: "prog-hero", style: { padding: "48px 24px 32px", textAlign: "center" } },
      h(
        "div",
        { className: "prog-wrap", style: { maxWidth: "860px", margin: "0 auto" } },
        h(
          "div",
          {
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 14px",
              borderRadius: "999px",
              background: "rgba(201, 154, 58, 0.12)",
              border: "1px solid rgba(201, 154, 58, 0.35)",
              color: "#f5d78e",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "16px",
            },
          },
          h("span", { style: { width: "6px", height: "6px", borderRadius: "50%", background: "#f5d78e" } }),
          "Developer Timeline",
        ),
        h(
          "h1",
          {
            className: "prog-title",
            style: {
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: "700",
              color: "#efe4cd",
              letterSpacing: "-0.02em",
              lineHeight: "1.15",
              margin: "0 0 14px",
            },
          },
          "Journey & ",
          h("span", { style: { color: "#c99a3a" } }, "Milestones"),
        ),
        h(
          "p",
          {
            className: "prog-lead",
            style: {
              fontSize: "15px",
              color: "rgba(239, 228, 205, 0.72)",
              lineHeight: "1.6",
              maxWidth: "680px",
              margin: "0 auto 28px",
            },
          },
          "Academic foundations at Guru Nanak Dev Engineering College and competitive hackathons demonstrating rapid problem solving, algorithmic rigor, and full-stack execution under pressure.",
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
            },
          },
          h(
            "a",
            {
              href: "/projects",
              className: "button button-gold",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              },
            },
            h("span", null, "Explore Projects"),
            arrowIcon(true),
          ),
          h(
            "a",
            {
              href: "/skills",
              className: "button",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                fontSize: "12px",
                borderColor: "rgba(239, 228, 205, 0.2)",
                color: "#dfceb1",
              },
            },
            h("span", null, "View Technical Arsenal"),
          ),
        ),
      ),
    );

    // Tab Navigation Bar
    const tabBar = h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          padding: "0 20px 36px",
          maxWidth: "680px",
          margin: "0 auto",
        },
      },
      tabs.map((tab) => {
        const isActive = tab.key === activeTabKey;
        return h(
          "button",
          {
            type: "button",
            onClick: () => {
              activeTabKey = tab.key;
              render();
            },
            style: {
              flex: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "14px 20px",
              borderRadius: "10px",
              background: isActive ? "rgba(201, 154, 58, 0.16)" : "rgba(16, 39, 52, 0.6)",
              border: isActive ? "1px solid rgba(201, 154, 58, 0.65)" : "1px solid rgba(239, 228, 205, 0.12)",
              color: isActive ? "#f5d78e" : "rgba(239, 228, 205, 0.65)",
              boxShadow: isActive ? "0 4px 20px rgba(201, 154, 58, 0.18)" : "none",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.03em",
              cursor: "pointer",
              transition: "all 0.2s ease",
            },
          },
          lucide(tab.key === "academics" ? "graduation-cap" : "trophy", "w-4 h-4"),
          h("span", null, tab.label),
        );
      }),
    );

    // Timeline entries container
    const timelineContainer = h(
      "div",
      {
        style: {
          maxWidth: "800px",
          margin: "0 auto 60px",
          padding: "0 24px",
          position: "relative",
        },
      },
      // Vertical timeline center line
      h("div", {
        style: {
          position: "absolute",
          top: "20px",
          bottom: "20px",
          left: "40px",
          width: "2px",
          background: "linear-gradient(180deg, rgba(201, 154, 58, 0.6) 0%, rgba(201, 154, 58, 0.15) 100%)",
        },
      }),
      (activeTab?.entries || []).map((entry, index) => {
        const badgeTheme = BADGE_COLORS[entry.badgeType] || BADGE_COLORS.gold;

        return h(
          "article",
          {
            key: entry.id,
            style: {
              position: "relative",
              paddingLeft: "52px",
              marginBottom: "32px",
            },
          },
          // Glowing node circle on timeline
          h(
            "div",
            {
              style: {
                position: "absolute",
                left: "7px",
                top: "20px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#102734",
                border: "2px solid #c99a3a",
                boxShadow: "0 0 12px rgba(201, 154, 58, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: "2",
              },
            },
            h("span", {
              style: {
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#f5d78e",
              },
            }),
          ),
          // Entry Card
          h(
            "div",
            {
              style: {
                background: "rgba(16, 39, 52, 0.75)",
                border: "1px solid rgba(201, 154, 58, 0.25)",
                borderRadius: "12px",
                padding: "24px 28px",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              },
              onMouseenter: (e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(201, 154, 58, 0.6)";
              },
              onMouseleave: (e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.borderColor = "rgba(201, 154, 58, 0.25)";
              },
            },
            // Card top row: badge and period
            h(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "12px",
                },
              },
              h(
                "span",
                {
                  style: {
                    padding: "4px 12px",
                    borderRadius: "6px",
                    background: badgeTheme.bg,
                    border: `1px solid ${badgeTheme.border}`,
                    color: badgeTheme.text,
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.04em",
                  },
                },
                entry.badge,
              ),
              h(
                "span",
                {
                  style: {
                    fontSize: "12px",
                    color: "rgba(239, 228, 205, 0.55)",
                    fontFamily: "monospace",
                    letterSpacing: "0.05em",
                  },
                },
                entry.period,
              ),
            ),
            // Title
            h(
              "h3",
              {
                style: {
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#efe4cd",
                  margin: "0 0 6px",
                  letterSpacing: "-0.01em",
                },
              },
              entry.title,
            ),
            // Institution / Society
            h(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  color: "#c99a3a",
                  fontWeight: "500",
                  marginBottom: "12px",
                },
              },
              lucide("building", "w-3.5 h-3.5 opacity-80"),
              h("span", null, entry.institution),
            ),
            // Details description
            h(
              "p",
              {
                style: {
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "rgba(239, 228, 205, 0.8)",
                  margin: "0",
                },
              },
              entry.details,
            ),
          ),
        );
      }),
    );

    // Callout footer
    const footerCallout = h(
      "div",
      {
        style: {
          maxWidth: "800px",
          margin: "0 auto 40px",
          padding: "28px 32px",
          borderRadius: "14px",
          background: "linear-gradient(135deg, rgba(201, 154, 58, 0.12) 0%, rgba(16, 39, 52, 0.8) 100%)",
          border: "1px solid rgba(201, 154, 58, 0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        },
      },
      h(
        "div",
        null,
        h("h4", { style: { margin: "0 0 6px", fontSize: "16px", color: "#efe4cd", fontWeight: "700" }, }, "Want to see these skills in production?"),
        h("p", { style: { margin: "0", fontSize: "13px", color: "rgba(239, 228, 205, 0.7)" } }, "Inspect full-stack architectures, live deployments, and system repositories."),
      ),
      h(
        "a",
        {
          href: "/projects",
          className: "button button-gold",
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 22px",
            fontSize: "12px",
            fontWeight: "600",
          },
        },
        h("span", null, "View Projects"),
        arrowIcon(true),
      ),
    );

    page.append(hero, tabBar, timelineContainer, footerCallout);
  }

  render();

  return destinationShell(scope, {
    pathname: path,
    mainClass: "fullscreen-page-overlay destination-page destination-page-calendar",
    content: page,
  });
}
