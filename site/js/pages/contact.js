import { h } from "../core/dom.js";
import { arrowIcon, destinationShell, destinationHero } from "../ui/common.js";
import { lucide } from "../ui/icons.js";

export { destinationHero };

export const title = "Contact & Connect · Moosa";

const CONTACT_INFO = {
  name: "Moosa",
  role: "Full-Stack Developer",
  email: "moosarajput2006@gmail.com",
  phone: "+91 9877890312",
  phoneRaw: "+919877890312",
  location: "Punjab, India",
  timezone: "IST (UTC+5:30)",
  leetcode: "https://leetcode.com/u/Moosa_ENG/",
  github: "https://github.com/Moosa2006",
  linkedin: "https://www.linkedin.com/in/moosa2006/",
  mapsUrl: "https://maps.google.com/?q=Guru+Nanak+Dev+Engineering+College,+Ludhiana,+Punjab",
  builds: [
    { name: "Civora", url: "https://civora-tau.vercel.app/", desc: "Enterprise Civic Reporting & Municipal GIS" },
    { name: "PRAMAAN", url: "https://pramaan-verify.vercel.app/", desc: "Proof-Backed Matchmaking & Credentials" },
    { name: "DailyTrack", url: "https://dailytrack4bros.vercel.app/", desc: "High-Performance Habit Tracker & Streaks" },
  ],
};

const GITHUB_ICON_SVG = () =>
  h(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: "16",
      height: "16",
      fill: "currentColor",
      "aria-hidden": "true",
      style: { width: "16px", height: "16px", flexShrink: "0" },
    },
    h("path", {
      d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z",
    })
  );

const LINKEDIN_ICON_SVG = () =>
  h(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: "16",
      height: "16",
      fill: "currentColor",
      "aria-hidden": "true",
      style: { width: "16px", height: "16px", flexShrink: "0" },
    },
    h("path", {
      d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    })
  );

export default function contact({ scope, path }) {
  // Direct Inquiry Form elements
  const nameInput = h("input", {
    type: "text",
    required: true,
    placeholder: "Your Name or Organization",
    className: "dest-input",
    style: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      background: "rgba(16, 39, 52, 0.7)",
      border: "1px solid rgba(201, 154, 58, 0.35)",
      color: "#efe4cd",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s ease",
    },
  });

  const emailInput = h("input", {
    type: "email",
    required: true,
    placeholder: "your.email@company.com",
    className: "dest-input",
    style: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      background: "rgba(16, 39, 52, 0.7)",
      border: "1px solid rgba(201, 154, 58, 0.35)",
      color: "#efe4cd",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s ease",
    },
  });

  const subjectInput = h("input", {
    type: "text",
    required: true,
    placeholder: "Engineering Role / Project Collaboration / Inquiry",
    className: "dest-input",
    style: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      background: "rgba(16, 39, 52, 0.7)",
      border: "1px solid rgba(201, 154, 58, 0.35)",
      color: "#efe4cd",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s ease",
    },
  });

  const messageInput = h("textarea", {
    required: true,
    rows: 4,
    placeholder: "Describe your opportunity, project specifications, or collaboration details...",
    className: "dest-textarea",
    style: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "8px",
      background: "rgba(16, 39, 52, 0.7)",
      border: "1px solid rgba(201, 154, 58, 0.35)",
      color: "#efe4cd",
      fontSize: "14px",
      outline: "none",
      resize: "vertical",
      transition: "border-color 0.2s ease",
    },
  });

  const statusMsg = h("p", {
    style: {
      margin: "12px 0 0",
      fontSize: "13px",
      color: "#f5d78e",
      display: "none",
    },
  });

  const form = h(
    "form",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      },
      onSubmit: (e) => {
        e.preventDefault();
        const nameVal = nameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const subVal = subjectInput.value.trim();
        const msgVal = messageInput.value.trim();

        if (!nameVal || !emailVal || !subVal || !msgVal) return;

        const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
          `[Portfolio Inquiry] ${subVal} - from ${nameVal}`
        )}&body=${encodeURIComponent(
          `Hello Moosa,\n\nName: ${nameVal}\nEmail: ${emailVal}\nSubject: ${subVal}\n\nMessage:\n${msgVal}\n\n---\nSent via Moosa Developer Portfolio`
        )}`;

        statusMsg.style.display = "block";
        statusMsg.textContent = "✓ Opening default email client to dispatch message to moosarajput2006@gmail.com...";
        window.location.href = mailtoUrl;
      },
    },
    h(
      "div",
      { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" } },
      h("div", null, h("label", { style: { display: "block", fontSize: "12px", color: "rgba(239, 228, 205, 0.7)", marginBottom: "6px" } }, "Your Name *"), nameInput),
      h("div", null, h("label", { style: { display: "block", fontSize: "12px", color: "rgba(239, 228, 205, 0.7)", marginBottom: "6px" } }, "Your Email *"), emailInput),
    ),
    h("div", null, h("label", { style: { display: "block", fontSize: "12px", color: "rgba(239, 228, 205, 0.7)", marginBottom: "6px" } }, "Subject *"), subjectInput),
    h("div", null, h("label", { style: { display: "block", fontSize: "12px", color: "rgba(239, 228, 205, 0.7)", marginBottom: "6px" } }, "Message *"), messageInput),
    h(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", marginTop: "4px" } },
      h(
        "button",
        {
          type: "submit",
          className: "contact-card-btn",
          style: {
            padding: "12px 28px",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "0.04em",
          },
        },
        h("span", null, "Send Direct Inquiry"),
        arrowIcon(true),
      ),
      h("span", { style: { fontSize: "12px", color: "rgba(239, 228, 205, 0.6)" } }, "Dispatches directly via mailto to moosarajput2006@gmail.com"),
    ),
    statusMsg,
  );

  // Standardized Channel Card component with 2x2 symmetry, word-break title, and balanced button
  const channelCard = ({ kicker, title, desc, ctaText, ctaHref, target, isExternal }) => {
    const btn = h(
      "a",
      {
        href: ctaHref,
        target: isExternal || target === "_blank" ? "_blank" : undefined,
        rel: isExternal || target === "_blank" ? "noopener noreferrer" : undefined,
        className: "contact-card-btn",
        onMouseenter: (e) => {
          e.currentTarget.style.background = "#E2B870";
          e.currentTarget.style.color = "#0F141C";
          e.currentTarget.style.borderColor = "#E2B870";
        },
        onMouseleave: (e) => {
          e.currentTarget.style.background = "rgba(226, 184, 112, 0.12)";
          e.currentTarget.style.color = "#F3E5AB";
          e.currentTarget.style.borderColor = "rgba(226, 184, 112, 0.4)";
        },
      },
      h("span", null, ctaText),
    );

    return h(
      "div",
      {
        className: "contact-card",
      },
      h(
        "div",
        null,
        h("span", { className: "contact-card-kicker" }, kicker),
        h("h3", { className: "contact-card-title" }, title),
        h("p", { className: "contact-card-desc" }, desc),
      ),
      btn,
    );
  };

  const content = h(
    "div",
    { className: "dest-page", style: { padding: "40px 20px 80px", maxWidth: "1100px", margin: "0 auto" } },
    // Executive Hero
    h(
      "header",
      { className: "dest-hero", style: { textAlign: "center", marginBottom: "48px" } },
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
        "Direct Contact Channels",
      ),
      h(
        "h1",
        { className: "dest-title", style: { fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: "800", color: "#efe4cd", margin: "0 0 12px" } },
        "Get in Touch with ",
        h("span", { style: { color: "#c99a3a" } }, "Moosa"),
      ),
      h(
        "p",
        { className: "dest-lead", style: { fontSize: "15px", lineHeight: "1.6", color: "rgba(239, 228, 205, 0.78)", maxWidth: "700px", margin: "0 auto" } },
        "Full-Stack Software Developer & B.Tech IT Undergraduate at Guru Nanak Dev Engineering College. Open for software engineering roles, hackathon collaborations, full-stack contracts, and algorithmic discussions.",
      ),
    ),
    // Symmetrical 2x2 Channels Grid
    h(
      "section",
      { className: "dest-section", style: { marginBottom: "48px" } },
      h(
        "div",
        {
          className: "contact-channels-grid",
        },
        channelCard({
          kicker: "ELECTRONIC MAIL",
          title: CONTACT_INFO.email,
          desc: "Primary inbox for recruiting, technical inquiries, and project proposals.",
          ctaText: "Draft Email ↗",
          ctaHref: `mailto:${CONTACT_INFO.email}`,
          isExternal: false,
        }),
        channelCard({
          kicker: "DIRECT TELEPHONY & WHATSAPP",
          title: CONTACT_INFO.phone,
          desc: "Direct mobile contact for immediate technical, hackathon, and recruitment discussions.",
          ctaText: "Dial Phone ↗",
          ctaHref: `tel:${CONTACT_INFO.phoneRaw}`,
          isExternal: false,
        }),
        channelCard({
          kicker: "ALGORITHMIC PROBLEM SOLVING",
          title: "LeetCode: Moosa_ENG",
          desc: "150+ problems solved across data structures, graph traversals, and dynamic programming.",
          ctaText: "Inspect LeetCode ↗",
          ctaHref: CONTACT_INFO.leetcode,
          target: "_blank",
          isExternal: true,
        }),
        channelCard({
          kicker: "LOCATION & TIMEZONE",
          title: `${CONTACT_INFO.location}`,
          desc: `Standard Time: ${CONTACT_INFO.timezone} · Undergraduate at Guru Nanak Dev Engineering College.`,
          ctaText: "View Location ↗",
          ctaHref: CONTACT_INFO.mapsUrl,
          target: "_blank",
          isExternal: true,
        }),
      ),
    ),
    // Live Builds & Professional Profiles
    h(
      "section",
      {
        style: {
          background: "rgba(18, 22, 28, 0.85)",
          border: "1px solid rgba(220, 180, 110, 0.25)",
          borderRadius: "14px",
          padding: "32px",
          marginBottom: "48px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(8px)",
          maxWidth: "56rem",
          margin: "0 auto 48px",
        },
      },
      h(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "24px",
          },
        },
        h(
          "div",
          null,
          h("span", { style: { color: "#E2B870", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" } }, "DEVELOPER HUBS & PORTALS"),
          h("h3", { style: { margin: "4px 0 0", fontSize: "20px", color: "#F8FAFC", fontWeight: "700" } }, "External Profiles & Flagship Builds"),
        ),
        h(
          "div",
          { style: { display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" } },
          h(
            "a",
            {
              href: CONTACT_INFO.github,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "external-profile-btn",
            },
            GITHUB_ICON_SVG(),
            h("span", { style: { whiteSpace: "nowrap" } }, "GitHub ↗"),
          ),
          h(
            "a",
            {
              href: CONTACT_INFO.linkedin,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "external-profile-btn",
            },
            LINKEDIN_ICON_SVG(),
            h("span", { style: { whiteSpace: "nowrap" } }, "LinkedIn ↗"),
          ),
        ),
      ),
      h(
        "div",
        { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" } },
        CONTACT_INFO.builds.map((b) =>
          h(
            "a",
            {
              href: b.url,
              target: "_blank",
              rel: "noopener noreferrer",
              style: {
                display: "block",
                padding: "18px 20px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(220, 180, 110, 0.2)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              },
              onMouseenter: (e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(226, 184, 112, 0.6)";
              },
              onMouseleave: (e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.borderColor = "rgba(220, 180, 110, 0.2)";
              },
            },
            h(
              "div",
              { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" } },
              h("h4", { style: { margin: "0", fontSize: "16px", color: "#F3E5AB", fontWeight: "700" } }, b.name),
              lucide("external-link", "w-3.5 h-3.5 text-[#E2B870]"),
            ),
            h("p", { style: { margin: "0", fontSize: "12px", color: "#CBD5E1", lineHeight: "1.4" } }, b.desc),
          ),
        ),
      ),
    ),
    // Direct Inquiry Form Section
    h(
      "section",
      {
        style: {
          background: "linear-gradient(135deg, rgba(18, 22, 28, 0.95) 0%, rgba(13, 8, 22, 0.95) 100%)",
          border: "1px solid rgba(220, 180, 110, 0.35)",
          borderRadius: "16px",
          padding: "36px 32px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(8px)",
          maxWidth: "56rem",
          margin: "0 auto",
        },
      },
      h(
        "div",
        { style: { marginBottom: "28px" } },
        h("span", { style: { color: "#E2B870", fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase" } }, "INQUIRY DISPATCH"),
        h("h3", { style: { margin: "4px 0 8px", fontSize: "22px", color: "#F8FAFC", fontWeight: "700" } }, "Send a Direct Message"),
        h("p", { style: { margin: "0", fontSize: "14px", color: "#CBD5E1" } }, "Fill in the details below to format and dispatch an email directly to Moosa's primary inbox."),
      ),
      form,
    ),
  );

  return destinationShell(scope, {
    pathname: path,
    mainClass: "fullscreen-page-overlay destination-page destination-page-contact",
    content,
  });
}
