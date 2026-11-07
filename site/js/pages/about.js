import { h } from "../core/dom.js";
import { arrowIcon, destinationShell } from "../ui/common.js";
import { lucide } from "../ui/icons.js";

export const title = "About Moosa · Full-Stack Software Developer";

const gsap = typeof window !== "undefined" ? window.gsap : undefined;

const STATS = [
  { value: 4, prefix: "", suffix: "+", label: "Production Web Apps", desc: "Civora, PRAMAAN, DailyTrack, SkillGap" },
  { value: 150, prefix: "", suffix: "+", label: "LeetCode Solved", desc: "Active C++ & Python DSA Practitioner", link: "https://leetcode.com/u/Moosa_ENG/" },
  { value: 8, prefix: "", suffix: "+", label: "CGPA (Ongoing)", desc: "B.Tech IT at GNDEC Ludhiana" },
  { value: 2, prefix: "", suffix: "x", label: "Hackathon Finalist", desc: "BitNBuild (Thapar) & Zinnovatio 4.0" },
];

const PILLARS = [
  {
    icon: "layers",
    title: "Production Web Architectures",
    desc: "Architecting end-to-end full-stack applications with React 19, Next.js, Node.js, Express, Prisma, PostgreSQL, and MongoDB with rigorous type safety and responsive design.",
  },
  {
    icon: "code",
    title: "Algorithmic Rigor & DSA",
    desc: "150+ problems solved on LeetCode across data structures, graph traversals, dynamic programming, and systems optimization using C++ and Python.",
  },
  {
    icon: "terminal",
    title: "Linux & System Automation",
    desc: "Leveraging Linux (Ubuntu/WSL), Bash scripting, Git workflows, and CI/CD pipelines to automate tasks, audit infrastructure, and deploy reliable cloud services.",
  },
  {
    icon: "sparkles",
    title: "AI Integration & Workflows",
    desc: "Infusing modern applications with multimodal LLMs, structured outputs, and automated triage pipelines for real-world enterprise utility.",
  },
];

const fmt = (n) => Math.round(n).toLocaleString("en-IN");

export default function about(ctx) {
  const { scope, path } = ctx;

  const root = h(
    "div",
    { className: "ab", style: { paddingBottom: "60px" } },
    // Executive Hero Section
    h(
      "header",
      { className: "ab-hero", style: { paddingTop: "60px", paddingBottom: "40px", textAlign: "center" } },
      h(
        "div",
        { className: "ab-wrap ab-hero-inner", style: { maxWidth: "860px", margin: "0 auto" } },
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
              marginBottom: "20px",
            },
          },
          h("span", { style: { width: "6px", height: "6px", borderRadius: "50%", background: "#f5d78e" } }),
          "Guru Nanak Dev Engineering College (GNDEC), Ludhiana",
        ),
        h(
          "h1",
          {
            className: "ab-title",
            style: {
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: "800",
              color: "#efe4cd",
              letterSpacing: "-0.02em",
              lineHeight: "1.1",
              margin: "0 0 16px",
            },
          },
          h("span", { className: "ab-line" }, h("span", null, "MOOSA")),
          h("span", { className: "ab-line" }, h("span", { className: "ab-gold", style: { color: "#c99a3a" } }, "DEVELOPER")),
        ),
        h(
          "h2",
          {
            style: {
              fontSize: "17px",
              color: "#f5d78e",
              fontWeight: "600",
              letterSpacing: "0.04em",
              margin: "0 0 16px",
            },
          },
          "Full-Stack Software Developer & B.Tech IT Undergraduate",
        ),
        h(
          "p",
          {
            className: "ab-lead",
            style: {
              fontSize: "15px",
              lineHeight: "1.7",
              color: "rgba(239, 228, 205, 0.8)",
              maxWidth: "720px",
              margin: "0 auto 32px",
            },
          },
          "Information Technology undergraduate (8+ GPA) specializing in production-grade full-stack web architecture, AI-integrated workflows, and algorithmic problem solving. Proven track record of building scalable applications with React 19, TypeScript, Node.js, Express, Prisma/PostgreSQL, and MongoDB, alongside competing at national and international hackathons.",
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
              className: "resume-download-btn",
              href: "/Moosa_Resume.pdf",
              target: "_blank",
              download: "Moosa_Resume.pdf",
              "data-native-navigation": "true",
              rel: "noopener noreferrer",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(226, 184, 112, 0.15)",
                border: "1px solid rgba(226, 184, 112, 0.5)",
                borderRadius: "8px",
                padding: "0.75rem 1.5rem",
                fontWeight: "600",
                fontSize: "13px",
                color: "#F3E5AB",
                textDecoration: "none",
                cursor: "pointer",
                transition: "all 0.25s ease",
              },
            },
            lucide("file-text", "w-4 h-4", 16),
            h("span", null, "Download Resume (PDF)"),
          ),
          h(
            "a",
            {
              className: "button button-gold",
              href: "/projects",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 24px",
                fontSize: "12px",
                fontWeight: "600",
              },
            },
            h("span", null, "Explore Production Builds"),
            arrowIcon(true),
          ),
          h(
            "a",
            {
              className: "button",
              href: "https://leetcode.com/u/Moosa_ENG/",
              target: "_blank",
              rel: "noopener noreferrer",
              style: {
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                fontSize: "12px",
                borderColor: "rgba(201, 154, 58, 0.4)",
                color: "#f5d78e",
              },
            },
            lucide("code", "w-4 h-4"),
            h("span", null, "LeetCode Profile (150+) ↗"),
          ),
          h(
            "a",
            {
              className: "button",
              href: "/contact",
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
            h("span", null, "Contact & Inquiries"),
          ),
        ),
      ),
    ),
    // Key Engineering Metrics (Stat Cards)
    h(
      "section",
      { className: "ab-reveal", style: { padding: "20px 20px 50px" }, "aria-label": "Engineering Metrics" },
      h(
        "div",
        { className: "ab-wrap", style: { maxWidth: "980px", margin: "0 auto" } },
        h(
          "div",
          {
            className: "ab-stats",
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "18px",
              marginBottom: "50px",
            },
          },
          STATS.map((s) =>
            h(
              s.link ? "a" : "div",
              {
                className: "ab-stat",
                href: s.link || undefined,
                target: s.link ? "_blank" : undefined,
                rel: s.link ? "noreferrer" : undefined,
                style: {
                  background: "rgba(16, 39, 52, 0.75)",
                  border: "1px solid rgba(201, 154, 58, 0.3)",
                  borderRadius: "14px",
                  padding: "24px 20px",
                  textAlign: "center",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(12px)",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                },
                onMouseenter: (e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "rgba(201, 154, 58, 0.65)";
                },
                onMouseleave: (e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = "rgba(201, 154, 58, 0.3)";
                },
              },
              h(
                "strong",
                {
                  style: {
                    fontSize: "36px",
                    fontWeight: "800",
                    color: "#f5d78e",
                    lineHeight: "1.1",
                    marginBottom: "8px",
                  },
                },
                s.prefix,
                h("span", { "data-count": String(s.value) }, fmt(s.value)),
                s.suffix,
              ),
              h("span", { style: { fontSize: "14px", fontWeight: "600", color: "#efe4cd", marginBottom: "4px" } }, s.label),
              h("p", { style: { fontSize: "11px", color: "rgba(239, 228, 205, 0.6)", margin: "0", lineHeight: "1.4" } }, s.desc),
            ),
          ),
        ),
        // Core Engineering Pillars
        h(
          "div",
          {
            style: {
              background: "linear-gradient(135deg, rgba(16, 39, 52, 0.85) 0%, rgba(13, 8, 22, 0.85) 100%)",
              border: "1px solid rgba(201, 154, 58, 0.3)",
              borderRadius: "16px",
              padding: "36px 32px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
            },
          },
          h(
            "div",
            { style: { textAlign: "center", marginBottom: "32px" } },
            h("span", { style: { color: "#c99a3a", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" } }, "ENGINEERING PHILOSOPHY"),
            h("h3", { style: { fontSize: "24px", color: "#efe4cd", fontWeight: "700", margin: "6px 0 0" } }, "Architectural Pillars & Technical Focus"),
          ),
          h(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              },
            },
            PILLARS.map((p) =>
              h(
                "div",
                {
                  style: {
                    padding: "20px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(201, 154, 58, 0.15)",
                  },
                },
                h(
                  "div",
                  { style: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" } },
                  h(
                    "div",
                    {
                      style: {
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        background: "rgba(201, 154, 58, 0.15)",
                        border: "1px solid rgba(201, 154, 58, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#f5d78e",
                        flexShrink: "0",
                      },
                    },
                    lucide(p.icon, "w-4 h-4", 18),
                  ),
                  h("h4", { style: { margin: "0", fontSize: "15px", color: "#efe4cd", fontWeight: "600" } }, p.title),
                ),
                h("p", { style: { margin: "0", fontSize: "13px", lineHeight: "1.6", color: "rgba(239, 228, 205, 0.72)" } }, p.desc),
              ),
            ),
          ),
        ),
      ),
    ),
  );

  const main = destinationShell(scope, {
    pathname: path,
    mainClass: "fullscreen-page-overlay destination-page destination-page-about",
    content: root,
  });

  ctx.afterMount = () => {
    const scroller = root.closest(".fullscreen-page-scroll") ?? undefined;
    if (gsap && typeof gsap.matchMedia === "function") {
      const mm = gsap.matchMedia();
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.utils.toArray(root.querySelectorAll("[data-count]")).forEach((el) => {
            const counter = { n: 0 };
            el.textContent = fmt(0);
            gsap.to(counter, {
              n: Number(el.dataset.count),
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: { trigger: ".ab-stats", scroller, start: "top 85%", once: true },
              onUpdate: () => {
                el.textContent = fmt(counter.n);
              },
            });
          });
        },
        root,
      );
      scope.add(() => mm.revert());
    }
  };

  return main;
}
