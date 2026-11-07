(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8404],
  {
    71524: () => {},
    88672: (e, s, a) => {
      (Promise.resolve().then(a.t.bind(a, 98500, 23)),
        Promise.resolve().then(a.bind(a, 88755)),
        Promise.resolve().then(a.bind(a, 94388)),
        Promise.resolve().then(a.t.bind(a, 29185, 23)));
    },
    88755: (e, s, a) => {
      "use strict";
      a.d(s, { CommitteeMap: () => v });
      var l = a(95155),
        i = a(12115),
        t = a(98500),
        c = a.n(t),
        o = a(73321),
        m = a(18310),
        n = a(9751),
        r = a(24413),
        d = a(26937),
        h = a(19707),
        u = a(55766),
        p = a(89959),
        x = a(76721),
        b = a(78780),
        j = a(35581);
      function N() {
        let e = (0, i.useRef)(null),
          s = (0, m.I)();
        return ((0, i.useEffect)(() => {
          let a;
          if (s) return;
          let l = e.current;
          if (!l) return;
          let i = l.getContext("2d");
          if (!i) return;
          let t = (l.width = l.parentElement?.clientWidth || window.innerWidth),
            c = (l.height =
              l.parentElement?.clientHeight || window.innerHeight),
            o = () => {
              l &&
                ((t = l.width =
                  l.parentElement?.clientWidth || window.innerWidth),
                (c = l.height =
                  l.parentElement?.clientHeight || window.innerHeight));
            };
          window.addEventListener("resize", o);
          let m = Array.from({
              length: window.innerWidth <= 768 ? 24 : 65,
            }).map(() => ({
              x: Math.random() * t,
              y: Math.random() * c,
              size: 3.8 * Math.random() + 1.8,
              speedX: 1.3 * Math.random() + 0.4,
              speedY: 0.9 * Math.random() + 0.3,
              oscillation: Math.random() * Math.PI * 2,
              oscSpeed: 0.03 * Math.random() + 0.015,
              rotation: Math.random() * Math.PI * 2,
              rotSpeed: (Math.random() - 0.5) * 0.04,
              opacity: 0.55 * Math.random() + 0.3,
              petalType:
                Math.random() > 0.65
                  ? "gold"
                  : Math.random() > 0.3
                    ? "sakura"
                    : "crimson",
            })),
            n = () => {
              i.clearRect(0, 0, t, c);
              for (let e = 0; e < m.length; e++) {
                let s = m[e];
                ((s.oscillation += s.oscSpeed),
                  (s.x += s.speedX + 0.6 * Math.sin(s.oscillation)),
                  (s.y += s.speedY + 0.3 * Math.cos(s.oscillation)),
                  (s.rotation += s.rotSpeed),
                  s.x > t + 25 && (s.x = -25),
                  s.y > c + 25 && (s.y = -25),
                  i.save(),
                  i.translate(s.x, s.y),
                  i.rotate(s.rotation),
                  i.beginPath(),
                  i.moveTo(0, -(1.8 * s.size)),
                  i.bezierCurveTo(
                    1.4 * s.size,
                    -s.size,
                    1.4 * s.size,
                    s.size,
                    0,
                    1.6 * s.size,
                  ),
                  i.bezierCurveTo(
                    -(1.4 * s.size),
                    s.size,
                    -(1.4 * s.size),
                    -s.size,
                    0,
                    -(1.8 * s.size),
                  ),
                  "gold" === s.petalType
                    ? ((i.fillStyle = `rgba(232, 198, 106, ${s.opacity})`),
                      (i.shadowColor = "#c99a3a"))
                    : "crimson" === s.petalType
                      ? ((i.fillStyle = `rgba(167, 13, 22, ${s.opacity})`),
                        (i.shadowColor = "#a70d16"))
                      : ((i.fillStyle = `rgba(235, 120, 160, ${s.opacity})`),
                        (i.shadowColor = "#e878a0")),
                  (i.shadowBlur = 6),
                  i.fill(),
                  i.restore());
              }
              a = requestAnimationFrame(n);
            };
          return (
            n(),
            () => {
              (window.removeEventListener("resize", o),
                cancelAnimationFrame(a));
            }
          );
        }, [s]),
        s)
          ? null
          : (0, l.jsx)("canvas", {
              ref: e,
              className: "comm-map-particles-canvas",
              "aria-hidden": "true",
            });
      }
      function v() {
        let e = (0, o.useRouter)(),
          s = (0, i.useRef)(null),
          a = (0, i.useRef)(null),
          [t, m] = (0, i.useState)(j.bN[0]),
          [v, g] = (0, i.useState)(null),
          [f, w] = (0, i.useState)(null),
          [y, C] = (0, i.useState)(null),
          [k, M] = (0, i.useState)(!1),
          [$, A] = (0, i.useState)(!1),
          [E, S] = (0, i.useState)("focus"),
          [z, F] = (0, i.useState)(1);
        (0, i.useEffect)(() => {
          let e = () => {
            A(window.innerWidth <= 900);
          };
          return (
            e(),
            window.addEventListener("resize", e),
            () => window.removeEventListener("resize", e)
          );
        }, []);
        let T = j.bN.findIndex((e) => e.id === t.id);
        (0, i.useEffect)(() => {
          if (a.current) {
            let e = a.current.querySelector('[data-active="true"]');
            e &&
              e.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
          }
        }, [t.id]);
        let L = y || v || t;
        return (0, l.jsxs)("div", {
          className: "comm-map-page",
          children: [
            (0, l.jsxs)("div", {
              className: "comm-map-ambience",
              "aria-hidden": "true",
              children: [
                (0, l.jsx)("div", { className: "comm-map-mist" }),
                (0, l.jsx)("div", { className: "comm-map-vignette" }),
              ],
            }),
            (0, l.jsxs)("header", {
              className: "comm-map-header",
              children: [
                (0, l.jsxs)("div", {
                  className: "comm-map-badge",
                  children: [
                    (0, l.jsx)("span", {
                      className: "w-1.5 h-1.5 rounded-full bg-[#c99a3a]",
                    }),
                    (0, l.jsx)("span", {
                      className: "comm-map-badge-text",
                      children: "PECFEST 2026 \xb7 Organizing Committees",
                    }),
                  ],
                }),
                (0, l.jsxs)("h1", {
                  className: "comm-map-title",
                  children: [
                    "Check the Faces Behind ",
                    (0, l.jsx)("span", {
                      className: "comm-map-title-gold",
                      children: "PECFEST",
                    }),
                  ],
                }),
                (0, l.jsx)("p", {
                  className: "comm-map-subtitle",
                  children:
                    "PECFEST 2026 is shown through a Japanese village where different committees are contributing to its success. On phones, touch any guild to glide the camera across the parchment, revealing its sovereign decree and council roster.",
                }),
                (0, l.jsxs)("div", {
                  className: "comm-map-quick-actions",
                  children: [
                    (0, l.jsxs)(c(), {
                      href: "/committee",
                      className: "comm-map-btn-direct",
                      children: [
                        (0, l.jsx)("span", {
                          children: "View Unified Directory",
                        }),
                        (0, l.jsx)(n.A, { className: "w-3.5 h-3.5" }),
                      ],
                    }),
                    (0, l.jsx)("span", {
                      className: "text-xs text-[#efe4cd]/50 font-mono",
                      children: "8 Sanctuary Guilds Active",
                    }),
                  ],
                }),
              ],
            }),
            (0, l.jsxs)("div", {
              className: "comm-map-stage-outer",
              children: [
                (0, l.jsxs)("div", {
                  ref: s,
                  className: "comm-map-canvas-card",
                  onMouseMove: (e) => {
                    if ($) return;
                    let a = s.current;
                    if (!a) return;
                    let l = a.getBoundingClientRect(),
                      i = e.clientX - l.left,
                      t = e.clientY - l.top,
                      c = 1 / 0,
                      o = null;
                    for (let e of j.bN) {
                      let s = Math.hypot(
                        i - (e.pinX / 100) * l.width,
                        t - (e.pinY / 100) * l.height,
                      );
                      s < 62 && s < c && ((c = s), (o = e));
                    }
                    o
                      ? (w({
                          x: (o.pinX / 100) * l.width,
                          y: (o.pinY / 100) * l.height,
                        }),
                        C(o),
                        g(o))
                      : (w({ x: i, y: t }), C(null), g(null));
                  },
                  onMouseEnter: () => {
                    $ || M(!0);
                  },
                  onMouseLeave: () => {
                    $ || (M(!1), w(null), C(null), g(null));
                  },
                  children: [
                    (0, l.jsxs)("div", {
                      className: "comm-map-viewport-surface",
                      style: {
                        transform: (() => {
                          if (!$) return;
                          if ("overview" === E)
                            return `translate(0%, 0%) scale(${z})`;
                          let e = 50 - (t.pinX / 100) * 182,
                            s = 50 - (t.pinY / 100) * 182,
                            a = Math.max(-82, Math.min(0, e)),
                            l = Math.max(-82, Math.min(0, s));
                          return `translate(${a.toFixed(2)}%, ${l.toFixed(2)}%) scale(1.82)`;
                        })(),
                        transformOrigin: "0 0",
                        transition:
                          "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                      },
                      children: [
                        (0, l.jsx)("img", {
                          src: "/images/ancient_japan_committee_map.jpg",
                          alt: "Ancient Japanese Illustrated Committee Map",
                          className: "comm-map-backdrop-img",
                        }),
                        (0, l.jsx)("div", {
                          className: "comm-map-color-grade",
                        }),
                        (0, l.jsx)(N, {}),
                        j.bN.map((s) => {
                          let a = t.id === s.id,
                            i = y?.id === s.id || v?.id === s.id,
                            c = $ && a;
                          return (0, l.jsxs)(
                            "button",
                            {
                              type: "button",
                              className: `comm-landmark-node ${a ? "is-selected" : ""} ${i ? "is-targeted" : ""} ${c ? "is-mobile-active" : ""}`,
                              style: { left: `${s.pinX}%`, top: `${s.pinY}%` },
                              onClick: () => {
                                $
                                  ? t.id === s.id
                                    ? e.push(`/committee#${s.id}`)
                                    : (m(s), S("focus"))
                                  : (m(s),
                                    setTimeout(() => {
                                      e.push(`/committee#${s.id}`);
                                    }, 240));
                              },
                              onFocus: () => {
                                $ || (C(s), g(s));
                              },
                              onBlur: () => {
                                $ || (C(null), g(null));
                              },
                              "aria-label": `Select ${s.title} - ${s.buildingName || ""}`,
                              children: [
                                (0, l.jsxs)("div", {
                                  className: "comm-landmark-beacon",
                                  style: {
                                    borderColor:
                                      i || c
                                        ? s.emblemColor || "#ff4d5a"
                                        : s.emblemColor,
                                    boxShadow:
                                      i || c
                                        ? `0 0 28px ${s.emblemColor}, inset 0 0 14px rgba(255, 255, 255, 0.5)`
                                        : `0 0 14px ${s.emblemColor}66`,
                                  },
                                  children: [
                                    (0, l.jsx)("span", {
                                      className: "comm-beacon-pulse",
                                      style: { borderColor: s.emblemColor },
                                    }),
                                    (0, l.jsx)("span", {
                                      className: "comm-beacon-kanji",
                                      style: {
                                        color: i || c ? "#fff" : s.emblemColor,
                                      },
                                      children:
                                        s.kanjiMark || s.title.charAt(0),
                                    }),
                                  ],
                                }),
                                (0, l.jsxs)("div", {
                                  className: `comm-landmark-label ${c ? "is-mobile-visible" : ""}`,
                                  children: [
                                    (0, l.jsx)("span", {
                                      className: "comm-label-tag",
                                      children: s.tag,
                                    }),
                                    (0, l.jsx)("span", {
                                      className: "comm-label-title",
                                      children: s.title,
                                    }),
                                  ],
                                }),
                              ],
                            },
                            s.id,
                          );
                        }),
                      ],
                    }),
                    k &&
                      f &&
                      !$ &&
                      (0, l.jsxs)("div", {
                        className: `comm-game-crosshair comm-desktop-only ${y ? "is-locked" : ""}`,
                        style: { left: `${f.x}px`, top: `${f.y}px` },
                        children: [
                          (0, l.jsx)("div", {
                            className: "comm-crosshair-reticle",
                            children: (0, l.jsx)("span", {
                              className: "comm-crosshair-dot",
                            }),
                          }),
                          y &&
                            (0, l.jsx)("div", {
                              className: "comm-crosshair-lock-label",
                              children: (0, l.jsxs)("span", {
                                children: [
                                  "TARGET LOCKED: ",
                                  y.title.toUpperCase(),
                                ],
                              }),
                            }),
                        ],
                      }),
                    (0, l.jsxs)("div", {
                      className: "comm-mobile-only",
                      children: [
                        (0, l.jsxs)("div", {
                          className: "comm-mobile-hud-badge",
                          children: [
                            (0, l.jsx)(r.A, {
                              className:
                                "w-3.5 h-3.5 text-[#c99a3a] animate-pulse",
                            }),
                            (0, l.jsxs)("span", {
                              children: [
                                "GUILD ",
                                String(T + 1).padStart(2, "0"),
                                " / 08",
                              ],
                            }),
                          ],
                        }),
                        (0, l.jsxs)("div", {
                          className: "comm-mobile-hud-controls",
                          children: [
                            (0, l.jsx)("button", {
                              type: "button",
                              onClick: () => {
                                (S((e) =>
                                  "focus" === e ? "overview" : "focus",
                                ),
                                  "focus" === E && F(1));
                              },
                              className: `comm-mobile-hud-btn ${"focus" === E ? "is-active" : ""}`,
                              title:
                                "focus" === E
                                  ? "View Full Map"
                                  : "Focus on Active Guild",
                              children:
                                "focus" === E
                                  ? (0, l.jsxs)(l.Fragment, {
                                      children: [
                                        (0, l.jsx)(d.A, {
                                          className:
                                            "w-3.5 h-3.5 text-[#c99a3a]",
                                        }),
                                        (0, l.jsx)("span", {
                                          children: "Focus",
                                        }),
                                      ],
                                    })
                                  : (0, l.jsxs)(l.Fragment, {
                                      children: [
                                        (0, l.jsx)(h.A, {
                                          className:
                                            "w-3.5 h-3.5 text-[#efe4cd]",
                                        }),
                                        (0, l.jsx)("span", {
                                          children: "Full Map",
                                        }),
                                      ],
                                    }),
                            }),
                            "overview" === E &&
                              (0, l.jsxs)(l.Fragment, {
                                children: [
                                  (0, l.jsx)("button", {
                                    type: "button",
                                    onClick: () =>
                                      F((e) =>
                                        Math.min(2.4, +(e + 0.3).toFixed(1)),
                                      ),
                                    className: "comm-mobile-hud-btn icon-only",
                                    "aria-label": "Zoom In",
                                    children: (0, l.jsx)(u.A, {
                                      className: "w-3.5 h-3.5",
                                    }),
                                  }),
                                  (0, l.jsx)("button", {
                                    type: "button",
                                    onClick: () =>
                                      F((e) =>
                                        Math.max(1, +(e - 0.3).toFixed(1)),
                                      ),
                                    className: "comm-mobile-hud-btn icon-only",
                                    "aria-label": "Zoom Out",
                                    children: (0, l.jsx)(p.A, {
                                      className: "w-3.5 h-3.5",
                                    }),
                                  }),
                                ],
                              }),
                          ],
                        }),
                        (0, l.jsxs)("div", {
                          className: "comm-mobile-target-strip",
                          children: [
                            (0, l.jsxs)("div", {
                              className: "comm-mobile-target-left",
                              children: [
                                (0, l.jsx)("span", {
                                  className: "comm-mobile-target-dot",
                                  style: { backgroundColor: t.emblemColor },
                                }),
                                (0, l.jsx)("span", {
                                  className: "comm-mobile-target-name",
                                  children: t.buildingName || t.title,
                                }),
                              ],
                            }),
                            (0, l.jsx)("span", {
                              className: "comm-mobile-target-action",
                              children: "Tap card to explore",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, l.jsxs)("div", {
                      className: "comm-map-inspector-bar comm-desktop-only",
                      children: [
                        (0, l.jsxs)("div", {
                          className: "comm-inspector-left",
                          children: [
                            (0, l.jsx)("div", {
                              className: "comm-inspector-kanji-stamp",
                              style: {
                                borderColor: L.emblemColor,
                                color: L.emblemColor,
                              },
                              children: L.kanjiMark || L.title.charAt(0),
                            }),
                            (0, l.jsxs)("div", {
                              className: "comm-inspector-meta",
                              children: [
                                (0, l.jsx)("h4", { children: L.title }),
                                (0, l.jsx)("p", { children: L.subtitle }),
                              ],
                            }),
                          ],
                        }),
                        (0, l.jsxs)(c(), {
                          href: `/committee#${L.id}`,
                          className: "comm-inspector-action",
                          children: [
                            (0, l.jsx)("span", { children: "Examine Guild" }),
                            (0, l.jsx)(x.A, { className: "w-4 h-4" }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, l.jsxs)("div", {
                  className: "comm-mobile-only comm-mobile-chronicle-dock",
                  children: [
                    (0, l.jsx)("div", {
                      ref: a,
                      className: "comm-mobile-pills-row no-scrollbar",
                      children: j.bN.map((e) => {
                        let s = t.id === e.id;
                        return (0, l.jsxs)(
                          "button",
                          {
                            type: "button",
                            "data-active": s,
                            onClick: () => {
                              (m(e), S("focus"));
                            },
                            className: `comm-mobile-pill-btn ${s ? "is-active" : ""}`,
                            style: { borderColor: s ? e.emblemColor : void 0 },
                            children: [
                              (0, l.jsx)("span", {
                                className: "comm-mobile-pill-kanji",
                                style: { color: s ? e.emblemColor : void 0 },
                                children: e.kanjiMark || e.title.charAt(0),
                              }),
                              (0, l.jsx)("span", {
                                className: "comm-mobile-pill-title",
                                children: e.title,
                              }),
                            ],
                          },
                          e.id,
                        );
                      }),
                    }),
                    (0, l.jsxs)("div", {
                      className: "comm-mobile-decree-card",
                      style: { borderColor: `${t.emblemColor}66` },
                      children: [
                        (0, l.jsxs)("div", {
                          className: "comm-decree-header",
                          children: [
                            (0, l.jsx)("div", {
                              className: "comm-decree-seal",
                              style: {
                                borderColor: t.emblemColor,
                                color: t.emblemColor,
                                boxShadow: `0 0 16px ${t.emblemColor}40`,
                              },
                              children: (0, l.jsx)("span", {
                                children: t.kanjiMark || t.title.charAt(0),
                              }),
                            }),
                            (0, l.jsxs)("div", {
                              className: "comm-decree-meta",
                              children: [
                                (0, l.jsxs)("div", {
                                  className: "comm-decree-tag-row",
                                  children: [
                                    (0, l.jsx)("span", {
                                      className: "comm-decree-tag",
                                      style: { color: t.emblemColor },
                                      children: t.tag,
                                    }),
                                    t.buildingName &&
                                      (0, l.jsxs)("span", {
                                        className: "comm-decree-building",
                                        children: ["• ", t.buildingName],
                                      }),
                                  ],
                                }),
                                (0, l.jsx)("h3", {
                                  className: "comm-decree-title",
                                  children: t.title,
                                }),
                                (0, l.jsx)("p", {
                                  className: "comm-decree-sub",
                                  children: t.subtitle,
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, l.jsxs)("div", {
                          className: "comm-decree-actions",
                          children: [
                            (0, l.jsxs)("div", {
                              className: "comm-decree-nav-btns",
                              children: [
                                (0, l.jsx)("button", {
                                  type: "button",
                                  onClick: () => {
                                    let e = (T - 1 + j.bN.length) % j.bN.length;
                                    (m(j.bN[e]), S("focus"));
                                  },
                                  className: "comm-decree-nav-btn",
                                  "aria-label": "Previous Guild",
                                  children: (0, l.jsx)(b.A, {
                                    className: "w-4 h-4",
                                  }),
                                }),
                                (0, l.jsxs)("span", {
                                  className: "comm-decree-step-count",
                                  children: [T + 1, " / ", j.bN.length],
                                }),
                                (0, l.jsx)("button", {
                                  type: "button",
                                  onClick: () => {
                                    let e = (T + 1) % j.bN.length;
                                    (m(j.bN[e]), S("focus"));
                                  },
                                  className: "comm-decree-nav-btn",
                                  "aria-label": "Next Guild",
                                  children: (0, l.jsx)(x.A, {
                                    className: "w-4 h-4",
                                  }),
                                }),
                              ],
                            }),
                            (0, l.jsxs)(c(), {
                              href: `/committee#${t.id}`,
                              className: "comm-decree-dispatch-btn",
                              style: {
                                background: `linear-gradient(135deg, ${t.emblemColor} 0%, #a87d27 100%)`,
                              },
                              children: [
                                (0, l.jsx)("span", {
                                  children: "Explore Guild",
                                }),
                                (0, l.jsx)(n.A, { className: "w-4 h-4" }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, l.jsxs)("section", {
              className: "comm-map-grid-guide",
              "aria-label": "Committee Guild Landmarks",
              children: [
                (0, l.jsxs)("div", {
                  className: "comm-guide-header",
                  children: [
                    (0, l.jsx)("span", {
                      className: "comm-guide-eyebrow",
                      children: "THE 8 SANCTUARY LANDMARKS",
                    }),
                    (0, l.jsx)("h2", {
                      className: "comm-guide-title",
                      children: "Directory of Landmarks",
                    }),
                  ],
                }),
                (0, l.jsx)("div", {
                  className: "comm-landmarks-cards-grid",
                  children: j.bN.map((e) =>
                    (0, l.jsxs)(
                      c(),
                      {
                        href: `/committee#${e.id}`,
                        className: "comm-landmark-card-link",
                        onMouseEnter: () => {
                          $ || g(e);
                        },
                        onMouseLeave: () => {
                          $ || g(null);
                        },
                        onClick: () => {
                          $ && (m(e), S("focus"));
                        },
                        children: [
                          (0, l.jsxs)("div", {
                            className: "comm-card-link-top",
                            children: [
                              (0, l.jsx)("span", {
                                className: "comm-card-link-kanji",
                                style: { color: e.emblemColor },
                                children: e.kanjiMark || e.title.charAt(0),
                              }),
                              (0, l.jsx)("span", {
                                className: "comm-card-link-tag",
                                children: e.tag,
                              }),
                            ],
                          }),
                          (0, l.jsx)("h3", {
                            className: "comm-card-link-title",
                            children: e.title,
                          }),
                          (0, l.jsx)("p", {
                            className: "comm-card-link-sub",
                            children: e.subtitle,
                          }),
                          (0, l.jsxs)("div", {
                            className: "comm-card-link-footer",
                            children: [
                              (0, l.jsx)("span", {
                                children: "Dispatch to section",
                              }),
                              (0, l.jsx)(n.A, { className: "w-3.5 h-3.5" }),
                            ],
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                }),
              ],
            }),
          ],
        });
      }
      a(71524);
    },
  },
  (e) => {
    (e.O(0, [2317, 5864, 8500, 4987, 9174, 4388, 789, 8441, 3794, 7358], () =>
      e((e.s = 88672)),
    ),
      (_N_E = e.O()));
  },
]);
