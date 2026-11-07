(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8634],
  {
    2619: () => {},
    4511: (e, a, t) => {
      Promise.resolve().then(t.bind(t, 23520));
    },
    9005: (e, a, t) => {
      "use strict";
      t.d(a, { A: () => r });
      var s = t(51811);
      let n = {
        name: "x",
        size: 24,
        node: [
          ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
          ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
        ],
      };
      n.node;
      let r = (0, s.A)(n);
    },
    16369: (e, a, t) => {
      "use strict";
      t.d(a, { A: () => r });
      var s = t(51811);
      let n = {
        name: "phone",
        size: 24,
        node: [
          [
            "path",
            {
              d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
              key: "9njp5v",
            },
          ],
        ],
      };
      n.node;
      let r = (0, s.A)(n);
    },
    17007: (e, a, t) => {
      "use strict";
      t.d(a, { A: () => r });
      var s = t(51811);
      let n = {
        name: "gift",
        size: 24,
        node: [
          ["path", { d: "M12 7v14", key: "1akyts" }],
          [
            "path",
            { d: "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8", key: "1sqzm4" },
          ],
          [
            "path",
            {
              d: "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5",
              key: "kc0143",
            },
          ],
          [
            "rect",
            {
              x: "3",
              y: "7",
              width: "18",
              height: "4",
              rx: "1",
              key: "1hberx",
            },
          ],
        ],
      };
      n.node;
      let r = (0, s.A)(n);
    },
    23520: (e, a, t) => {
      "use strict";
      t.d(a, { default: () => L });
      var s = t(95155),
        n = t(12115),
        r = t(73321),
        l = t(78780),
        i = t(76721),
        c = t(74320),
        o = t(77976);
      let d = {
          cultural: "/art/fans/cultural.webp",
          technical: "/art/fans/technical.webp",
          literary: "/art/fans/literary.webp",
          gaming: "/art/fans/gaming.webp",
          performing: "/art/fans/performing.webp",
        },
        h = {
          cultural: -24,
          technical: -12,
          literary: 0,
          gaming: 12,
          performing: 24,
        },
        u = {
          cultural: -210,
          technical: -105,
          literary: 0,
          gaming: 105,
          performing: 210,
        };
      function m({
        onTrack: e,
        onCue: a,
        mode: t = "homepage",
        selectedTrackId: r,
        onToggleTrack: l,
      }) {
        let [i, p] = (0, n.useState)(null),
          [v, f] = (0, n.useState)("cultural"),
          g = (0, n.useRef)(null),
          x = (e) => {
            (p(e), e && (f(e), a?.()));
          },
          j = (a) => {
            "events" === t ? l?.(a) : e(a);
          },
          b = r || v,
          y = c.P.find((e) => e.id === b) || c.P[0];
        return (0, s.jsxs)("div", {
          className: "sensu-fan-container",
          ref: g,
          children: [
            (0, s.jsx)("div", {
              className: "sensu-fan-stage",
              "aria-label": "Interactive Japanese Folding Fan",
              children: (0, s.jsxs)("div", {
                className: "sensu-fan-pivot",
                children: [
                  c.P.map((e) => {
                    let a = i === e.id,
                      n = r === e.id,
                      l = h[e.id],
                      c = u[e.id],
                      m = l,
                      p = 0,
                      v = 1,
                      f = 10;
                    return (
                      i
                        ? a
                          ? ((m = 0.4 * l), (p = -45), (v = 1.14), (f = 30))
                          : ((m = l + (h[e.id] - h[i] > 0 ? 8 : -8)),
                            (p = 10),
                            (v = 0.94),
                            (f = 5))
                        : "events" === t &&
                          n &&
                          ((m = 0.5 * l), (p = -38), (v = 1.1), (f = 25)),
                      (0, s.jsx)(
                        "button",
                        {
                          type: "button",
                          className: `sensu-blade ${a ? "is-hovered" : ""} ${n ? "is-selected" : ""}`,
                          style: {
                            transform: `translateX(${c}px) translateY(${p}px) rotate(${m}deg) scale(${v})`,
                            zIndex: f,
                          },
                          onMouseEnter: () => x(e.id),
                          onMouseLeave: () => x(null),
                          onClick: () => j(e.id),
                          "aria-label": `Explore ${e.name} (${e.virtue})`,
                          children: (0, s.jsxs)("div", {
                            className: "sensu-blade-inner",
                            children: [
                              (0, s.jsx)("img", {
                                src: d[e.id],
                                alt: `${e.virtue} Fan Art`,
                                className: "sensu-blade-img",
                                loading: "lazy",
                              }),
                              (0, s.jsx)("div", {
                                className: "sensu-blade-scrim",
                              }),
                              (0, s.jsx)("div", {
                                className: "sensu-blade-rib",
                              }),
                              (0, s.jsx)("div", {
                                className: "sensu-blade-kintsugi",
                              }),
                              (0, s.jsxs)("div", {
                                className: "sensu-blade-content",
                                children: [
                                  (0, s.jsx)("span", {
                                    className: "sensu-blade-number",
                                    children: e.number,
                                  }),
                                  (0, s.jsx)("span", {
                                    className: "sensu-blade-kanji",
                                    children: e.kanji,
                                  }),
                                  (0, s.jsx)("h3", {
                                    className: "sensu-blade-title",
                                    children: e.virtue,
                                  }),
                                  (0, s.jsx)("p", {
                                    className: "sensu-blade-category",
                                    children: e.category,
                                  }),
                                  "events" === t && n
                                    ? (0, s.jsx)("span", {
                                        className:
                                          "sensu-blade-cta text-[#d6b05e] font-bold",
                                        children: "Filtered ✓",
                                      })
                                    : (0, s.jsxs)("span", {
                                        className: "sensu-blade-cta",
                                        children: [
                                          "events" === t ? "Filter" : "Explore",
                                          " ",
                                          (0, s.jsx)(o.i3, {
                                            diagonal: "events" !== t,
                                          }),
                                        ],
                                      }),
                                ],
                              }),
                            ],
                          }),
                        },
                        e.id,
                      )
                    );
                  }),
                  (0, s.jsxs)("div", {
                    className: "sensu-pivot-rivet",
                    "aria-hidden": "true",
                    children: [
                      (0, s.jsx)("div", { className: "sensu-pivot-gem" }),
                      (0, s.jsx)("div", { className: "sensu-pivot-ring" }),
                      (0, s.jsxs)("div", {
                        className: "sensu-pivot-tassel",
                        children: [
                          (0, s.jsx)("span", { className: "tassel-cord" }),
                          (0, s.jsx)("span", { className: "tassel-head" }),
                          (0, s.jsx)("span", { className: "tassel-fringe" }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
            (0, s.jsxs)("div", {
              className: "sensu-active-preview",
              "data-track": y.id,
              children: [
                (0, s.jsxs)("div", {
                  className: "preview-top",
                  children: [
                    (0, s.jsx)("span", {
                      className: "preview-kanji",
                      children: y.kanji,
                    }),
                    (0, s.jsxs)("div", {
                      children: [
                        (0, s.jsxs)("span", {
                          className: "preview-number",
                          children: [y.number, " \xb7 ", y.category],
                        }),
                        (0, s.jsx)("h4", {
                          className: "preview-name",
                          children: y.name,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsx)("p", {
                  className: "preview-desc",
                  children: y.description,
                }),
                (0, s.jsx)("button", {
                  className: "button button-gold preview-enter-btn",
                  onClick: () => j(y.id),
                  children:
                    "events" === t
                      ? r === y.id
                        ? (0, s.jsx)(s.Fragment, { children: "Clear Filter" })
                        : (0, s.jsxs)(s.Fragment, {
                            children: [
                              "Explore ",
                              y.virtue,
                              " Events ",
                              (0, s.jsx)(o.i3, {}),
                            ],
                          })
                      : (0, s.jsxs)(s.Fragment, {
                          children: [
                            "Enter ",
                            y.virtue,
                            " Chamber ",
                            (0, s.jsx)(o.i3, {}),
                          ],
                        }),
                }),
              ],
            }),
            (0, s.jsx)("div", {
              className: "sensu-mobile-tabs",
              role: "group",
              "aria-label": "Category selector",
              children: c.P.map((e) => {
                let n = r === e.id,
                  l = n || v === e.id;
                return (0, s.jsxs)(
                  "button",
                  {
                    type: "button",
                    "aria-pressed": l,
                    className: `sensu-tab ${l ? "is-active" : ""} ${n ? "is-selected" : ""}`,
                    onClick: () => {
                      (f(e.id), a?.(), "events" === t && j(e.id));
                    },
                    children: [
                      (0, s.jsx)("span", {
                        className: "sensu-tab-kanji",
                        children: e.kanji,
                      }),
                      (0, s.jsx)("span", { children: e.virtue }),
                      "events" === t &&
                        n &&
                        (0, s.jsx)("span", {
                          className:
                            "ml-1 text-[11px] font-bold text-[#d6b05e]",
                          children: "✓",
                        }),
                    ],
                  },
                  e.id,
                );
              }),
            }),
          ],
        });
      }
      var p = t(98500),
        v = t.n(p),
        f = t(94222);
      let g = [...c.P.map((e) => e.id), "convenor"],
        x = {
          cultural: "Music, dance, theatre and art",
          technical: "Coding, robotics and design",
          literary: "Debate, poetry and quizzes",
          gaming: "Esports and strategy games",
          performing: "Bands, dance battles and stage acts",
          convenor: "Opening, closing and keynotes",
        };
      function j(e, a) {
        if (f.tj.includes(e)) return "Coming soon";
        let t = a[e];
        return void 0 === t
          ? null
          : 0 === t
            ? "Coming soon"
            : `${t} ${1 === t ? "event" : "events"}`;
      }
      let b = {
        cultural: "/art/fans/cultural.webp",
        technical: "/art/fans/technical.webp",
        literary: "/art/fans/literary.webp",
        gaming: "/art/fans/gaming.webp",
        performing: "/art/fans/performing.webp",
      };
      function y({ counts: e = {}, onSelect: a, onCue: t }) {
        let r = (0, n.useRef)(null),
          [l, i] = (0, n.useState)(0),
          d = c.P[l],
          h = j(d.id, e);
        (0, n.useEffect)(() => {
          let e = r.current;
          if (!e) return;
          let a = 0,
            t = () => {
              (cancelAnimationFrame(a),
                (a = requestAnimationFrame(() => {
                  let a = e.scrollLeft + e.clientWidth / 2,
                    t = 0,
                    s = 1 / 0;
                  (Array.from(e.children).forEach((e, n) => {
                    let r = Math.abs(e.offsetLeft + e.offsetWidth / 2 - a);
                    r < s && ((s = r), (t = n));
                  }),
                    i(t));
                })));
            };
          return (
            e.addEventListener("scroll", t, { passive: !0 }),
            () => {
              (e.removeEventListener("scroll", t), cancelAnimationFrame(a));
            }
          );
        }, []);
        let u = (e, n, r, l) =>
            a
              ? (0, s.jsx)("button", {
                  type: "button",
                  className: n,
                  onClick: () => a(e),
                  "aria-label": l,
                  children: r,
                })
              : (0, s.jsx)(v(), {
                  href: `/events?category=${e}`,
                  className: n,
                  onClick: t,
                  "aria-label": l,
                  children: r,
                }),
          m = j("convenor", e);
        return (0, s.jsxs)("div", {
          className: "path-picker",
          children: [
            (0, s.jsxs)("p", {
              className: "path-hint",
              "aria-hidden": "true",
              children: [
                (0, s.jsx)("span", { children: "‹" }),
                " Swipe the fan \xb7 tap a blade to open ",
                (0, s.jsx)("span", { children: "›" }),
              ],
            }),
            (0, s.jsx)("ul", {
              ref: r,
              className: "path-rail",
              "aria-label": "Event paths",
              children: c.P.map((e, a) => {
                let n = Math.max(-2, Math.min(2, a - l)),
                  c = 0 === n,
                  o = {
                    transform: c
                      ? "translateY(-10px) scale(1)"
                      : `translateY(${12 * Math.abs(n)}px) rotate(${7 * n}deg) scale(${1 - 0.08 * Math.abs(n)})`,
                    zIndex: 10 - Math.abs(n),
                  },
                  d = (0, s.jsxs)("span", {
                    className: "sensu-blade-inner",
                    children: [
                      (0, s.jsx)("img", {
                        src: b[e.id],
                        alt: "",
                        className: "sensu-blade-img",
                        loading: a < 2 ? "eager" : "lazy",
                      }),
                      (0, s.jsx)("span", { className: "sensu-blade-scrim" }),
                      (0, s.jsx)("span", { className: "sensu-blade-rib" }),
                      (0, s.jsx)("span", { className: "sensu-blade-kintsugi" }),
                      (0, s.jsxs)("span", {
                        className: "sensu-blade-content",
                        children: [
                          (0, s.jsx)("span", {
                            className: "sensu-blade-number",
                            children: e.number,
                          }),
                          (0, s.jsx)("span", {
                            className: "sensu-blade-kanji",
                            children: e.kanji,
                          }),
                          (0, s.jsx)("span", {
                            className: "sensu-blade-title",
                            children: e.virtue,
                          }),
                          (0, s.jsx)("span", {
                            className: "sensu-blade-category",
                            children: e.category,
                          }),
                        ],
                      }),
                    ],
                  });
                return (0, s.jsx)(
                  "li",
                  {
                    className: `path-blade${c ? " is-active" : ""}`,
                    style: o,
                    children: c
                      ? u(e.id, "path-blade-hit", d, `Open ${e.virtue} events`)
                      : (0, s.jsx)("button", {
                          type: "button",
                          className: "path-blade-hit",
                          onClick: () =>
                            ((e) => {
                              let a = r.current,
                                s = a?.children[e];
                              if (!a || !s) return;
                              let n = !window.matchMedia(
                                "(prefers-reduced-motion: reduce)",
                              ).matches;
                              (a.scrollTo({
                                left:
                                  s.offsetLeft -
                                  (a.clientWidth - s.offsetWidth) / 2,
                                behavior: n ? "smooth" : "auto",
                              }),
                                i(e),
                                t?.());
                            })(a),
                          "aria-label": `Show ${e.virtue}`,
                          children: d,
                        }),
                  },
                  e.id,
                );
              }),
            }),
            (0, s.jsx)("div", {
              className: "path-pivot",
              "aria-hidden": "true",
              children: (0, s.jsxs)("div", {
                className: "sensu-pivot-rivet",
                children: [
                  (0, s.jsx)("div", { className: "sensu-pivot-gem" }),
                  (0, s.jsx)("div", { className: "sensu-pivot-ring" }),
                  (0, s.jsxs)("div", {
                    className: "sensu-pivot-tassel",
                    children: [
                      (0, s.jsx)("span", { className: "tassel-cord" }),
                      (0, s.jsx)("span", { className: "tassel-head" }),
                      (0, s.jsx)("span", { className: "tassel-fringe" }),
                    ],
                  }),
                ],
              }),
            }),
            (0, s.jsxs)("div", {
              className: "sensu-active-preview path-preview",
              "data-track": d.id,
              "aria-live": "polite",
              children: [
                (0, s.jsxs)("div", {
                  className: "preview-top",
                  children: [
                    (0, s.jsx)("span", {
                      className: "preview-kanji",
                      "aria-hidden": "true",
                      children: d.kanji,
                    }),
                    (0, s.jsxs)("div", {
                      children: [
                        (0, s.jsxs)("span", {
                          className: "preview-number",
                          children: [d.number, " \xb7 ", d.category],
                        }),
                        (0, s.jsx)("h3", {
                          className: "preview-name",
                          children: d.name,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsx)("p", {
                  className: "preview-desc",
                  children: d.description,
                }),
                (0, s.jsxs)("p", {
                  className: "path-preview-meta",
                  children: [
                    (0, s.jsx)("span", { children: x[d.id] }),
                    h &&
                      (0, s.jsx)("span", {
                        className: "path-count",
                        "data-soon": "Coming soon" === h || void 0,
                        children: h,
                      }),
                  ],
                }),
                u(
                  d.id,
                  "button button-gold preview-enter-btn",
                  (0, s.jsxs)(s.Fragment, {
                    children: [
                      "Explore ",
                      d.virtue,
                      " Events ",
                      (0, s.jsx)(o.i3, {}),
                    ],
                  }),
                ),
              ],
            }),
            u(
              "convenor",
              "path-flagship",
              (0, s.jsxs)(s.Fragment, {
                children: [
                  (0, s.jsx)("span", {
                    className: "path-flagship-kanji",
                    "aria-hidden": "true",
                    children: f.Wo.convenor.kanji,
                  }),
                  (0, s.jsxs)("span", {
                    className: "path-flagship-text",
                    children: [
                      (0, s.jsx)("span", {
                        className: "path-flagship-name",
                        children: "Flagship & Convenor",
                      }),
                      (0, s.jsx)("span", {
                        className: "path-flagship-hint",
                        children: x.convenor,
                      }),
                    ],
                  }),
                  m &&
                    (0, s.jsx)("span", {
                      className: "path-count",
                      children: m,
                    }),
                  (0, s.jsx)("span", {
                    className: "path-chevron",
                    "aria-hidden": "true",
                    children: "›",
                  }),
                ],
              }),
            ),
          ],
        });
      }
      function N({
        mode: e = "homepage",
        onTrack: a,
        onCue: t,
        selectedTrackId: n,
        onCategorySelect: r,
        className: l = "",
        pathCounts: i,
        onPathSelect: c,
      }) {
        return (0, s.jsxs)("section", {
          id: "paths",
          className: `paths-section section-shell ${l}`,
          "aria-labelledby": "paths-title",
          children: [
            (0, s.jsxs)("div", {
              className: "section-heading",
              "data-reveal": !0,
              children: [
                (0, s.jsxs)("div", {
                  children: [
                    (0, s.jsx)("p", {
                      className: "eyebrow",
                      children: "DIFFERENT CALLINGS. ONE SPIRIT.",
                    }),
                    (0, s.jsxs)("h2", {
                      id: "paths-title",
                      children: [
                        "Find your ",
                        (0, s.jsx)("em", { children: "way." }),
                      ],
                    }),
                  ],
                }),
                (0, s.jsxs)("p", {
                  children: [
                    "Five paths into the extraordinary.",
                    (0, s.jsx)("br", {}),
                    "Choose a path to see its events.",
                  ],
                }),
              ],
            }),
            (0, s.jsx)(y, { counts: i, onSelect: c, onCue: t }),
            (0, s.jsx)(m, {
              mode: e,
              onTrack: a || (() => {}),
              onCue: t,
              selectedTrackId: n,
              onToggleTrack: (t) => {
                "events" === e ? (n === t ? r?.(null) : r?.(t)) : a?.(t);
              },
            }),
            (0, s.jsx)("p", {
              className: "section-footnote",
              children: "THE BRAVE DON’T WAIT FOR A PATH. THEY MAKE ONE.",
            }),
          ],
        });
      }
      var w = t(94388),
        k = t(30827),
        E = t(47960),
        C = t(61402),
        S = t(3255);
      t(2619);
      let A = "https://techfest.org/competitions",
        M = ["ThetaShift", "RoboReach", "Meshmerize", "ZeroCode", "InnovateX"];
      function T({ isAriaHidden: e = !1 }) {
        return (0, s.jsxs)("div", {
          className: "tf-ticker-segment",
          "aria-hidden": e ? "true" : void 0,
          children: [
            (0, s.jsx)("span", {
              className: "tf-ticker-title",
              children: "IIT BOMBAY TECHFEST ZONALS — CHANDIGARH",
            }),
            (0, s.jsx)("span", {
              className: "tf-ticker-dot",
              "aria-hidden": "true",
              children: "\xb7",
            }),
            (0, s.jsx)("span", {
              className: "tf-ticker-free",
              children: "REGISTRATIONS ARE FREE!",
            }),
            (0, s.jsx)("span", {
              className: "tf-ticker-dot",
              "aria-hidden": "true",
              children: "\xb7",
            }),
            (0, s.jsx)("span", {
              className: "tf-ticker-date",
              children: "31 OCTOBER 2026",
            }),
            (0, s.jsx)("span", {
              className: "tf-ticker-dot",
              "aria-hidden": "true",
              children: "\xb7",
            }),
            (0, s.jsx)("span", {
              className: "tf-ticker-venue",
              children: "Punjab Engineering College, Chandigarh",
            }),
            (0, s.jsx)("span", {
              className: "tf-ticker-dot",
              "aria-hidden": "true",
              children: "\xb7",
            }),
            (0, s.jsxs)("a", {
              href: A,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "tf-ticker-cta",
              tabIndex: e ? -1 : 0,
              "aria-label":
                "Register here for Techfest Zonals (opens in a new tab)",
              children: [
                (0, s.jsx)("span", { children: "REGISTER HERE" }),
                (0, s.jsx)("span", {
                  className: "tf-ticker-arrow",
                  "aria-hidden": "true",
                  children: "→",
                }),
              ],
            }),
            (0, s.jsx)("span", {
              className: "tf-ticker-dot",
              "aria-hidden": "true",
              children: "\xb7",
            }),
            M.map((a, t) =>
              (0, s.jsxs)(
                n.Fragment,
                {
                  children: [
                    (0, s.jsx)("a", {
                      href: A,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "tf-ticker-comp",
                      tabIndex: e ? -1 : 0,
                      title: `Register for ${a} at Techfest`,
                      children: a,
                    }),
                    t < M.length - 1 &&
                      (0, s.jsx)("span", {
                        className: "tf-ticker-dot",
                        "aria-hidden": "true",
                        children: "\xb7",
                      }),
                  ],
                },
                `${a}-${e ? "dup" : "orig"}`,
              ),
            ),
            (0, s.jsx)("span", {
              className: "tf-ticker-dot",
              "aria-hidden": "true",
              children: "\xb7",
            }),
          ],
        });
      }
      function $() {
        return (0, s.jsx)("div", {
          className: "tf-ticker-wrap",
          role: "region",
          "aria-label": "IIT Bombay Techfest Zonals Announcement",
          children: (0, s.jsxs)("div", {
            className: "tf-ticker-track",
            children: [
              (0, s.jsx)(T, { isAriaHidden: !1 }),
              (0, s.jsx)(T, { isAriaHidden: !1 }),
              (0, s.jsx)(T, { isAriaHidden: !0 }),
              (0, s.jsx)(T, { isAriaHidden: !0 }),
            ],
          }),
        });
      }
      var F = t(55042),
        P = t(41193);
      let q = {
        cultural: {
          title: "Cultural Events",
          subtitle: "The art of expression",
          description:
            "Explore cultural experiences, competitions and performances at PECFEST 2026. Let your colours speak across music, fine arts, and heritage showcases.",
        },
        technical: {
          title: "Technical Events",
          subtitle: "The pursuit of possibility",
          description:
            "Explore technical competitions, challenges and innovation-driven events at PECFEST 2026. Question the familiar, build the impossible, and leave something new behind.",
        },
        literary: {
          title: "Literary Events",
          subtitle: "The weight of a word",
          description:
            "Explore debate, poetry, creative writing and literary duels at PECFEST 2026. An idea, a voice, and a room that listens.",
        },
        gaming: {
          title: "Gaming Events",
          subtitle: "The instinct to conquer",
          description:
            "Explore esports championships, tactical showdowns and gaming arenas at PECFEST 2026. Find your focus, trust your squad, and own the final moment.",
        },
        performing: {
          title: "Performing Arts Events",
          subtitle: "The courage to be seen",
          description:
            "Explore music concerts, dance battles, theatrical showcases and center-stage acts at PECFEST 2026. Step into the light and make the stage your own.",
        },
        convenor: {
          title: "Flagship & Convenor Events",
          subtitle: "Grand Ceremonies & Assemblies",
          description:
            "Explore the grand ceremonies, keynotes, celebrity nights and flagship spectacles at PECFEST 2026.",
        },
      };
      function L({
        events: e,
        initialTotal: a = e.length,
        technicalClubs: t = [],
        status: o = "ok",
        counts: d = {},
      }) {
        let h = (0, r.useRouter)(),
          u = (0, r.useSearchParams)(),
          m = (0, r.usePathname)(),
          p = u.toString(),
          v = (0, n.useMemo)(() => (0, F.vH)(new URLSearchParams(p)), [p]),
          x = Number((0, F.KN)(new URLSearchParams(p)).get("page") || 1),
          [j, b] = (0, n.useState)(e),
          [y, A] = (0, n.useState)(a),
          [M, T] = (0, n.useState)(!1),
          [R, _] = (0, n.useState)("error" === o),
          [I, D] = (0, n.useState)(null),
          [H, O] = (0, n.useState)(!1),
          [B, W] = (0, n.useState)(v.query);
        (0, n.useEffect)(() => {
          if (!v.query.trim()) return void W("");
          let e = window.setTimeout(() => {
            W(v.query);
          }, 150);
          return () => window.clearTimeout(e);
        }, [v.query]);
        let [z, G] = (0, n.useState)(0);
        (0, n.useEffect)(() => {
          let e = () => {
            G((e) => e + 1);
          };
          return (
            window.addEventListener("events-cache-invalidated", e),
            () => window.removeEventListener("events-cache-invalidated", e)
          );
        }, []);
        let U = (e) => {
            window.history.replaceState(null, "", (0, F.N7)(Q, { ...v, ...e }));
          },
          V = () => {
            window.history.replaceState(null, "", (0, F.N7)(Q, f.fF));
          },
          Y = (e) => {
            window.history.pushState(null, "", (0, F.N7)(Q, v, e));
          },
          J = (u.get("category") || u.get("track") || "").trim().toLowerCase(),
          Q = (0, n.useMemo)(() => {
            if (!J) return null;
            let e = c.P.find((e) => e.id === J || e.virtue.toLowerCase() === J);
            return e ? e.id : "convenor" === J ? "convenor" : null;
          }, [J]);
        (0, n.useEffect)(() => {
          if (!Q || 0 === e.length) return;
          let t = (0, P.a5)({
            category: Q,
            society: "all",
            additionalClub: "all",
            fee: "all",
            format: "all",
            date: "all",
            eventDay: "all",
            location: "all",
            sort: "soonest",
            page: 1,
            limit: F.q3,
          });
          (0, P.YG)(t, e, a, 1, F.q3);
        }, [Q, e, a]);
        let Z = Q && "convenor" !== Q ? Q : null,
          K = (0, n.useMemo)(
            () =>
              Q
                ? "convenor" === Q
                  ? f.Wo.convenor
                  : c.P.find((e) => e.id === Q) || null
                : null,
            [Q],
          ),
          X = Q ? q[Q] : null,
          ee = "Search all events",
          [ea, et] = (0, n.useState)(() => (0, f.qS)(e));
        ((0, n.useEffect)(() => {
          let a = (0, f.qS)(e);
          a.length > 0 &&
            et((e) => (0, f.VI)(Array.from(new Set([...e, ...a]))));
        }, [e]),
          (0, n.useEffect)(() => {
            let e = (0, f.qS)(j);
            e.length > 0 &&
              et((a) => (0, f.VI)(Array.from(new Set([...a, ...e]))));
          }, [j]),
          (0, n.useEffect)(() => {
            if (!Q) return;
            let e = !1;
            return (
              (0, P.q1)()
                .then((a) => {
                  if (e) return;
                  let t = a.filter((e) =>
                      "convenor" === Q
                        ? "convenor" === e.category
                        : "literary" === Q
                          ? "literary" === e.category ||
                            "literary" === e.track ||
                            E.OQ.includes(e.society_name)
                          : "performing" === Q
                            ? "performing" === e.category ||
                              "performing" === e.track ||
                              E.r4.includes(e.society_name)
                            : e.track === Q || e.category === Q,
                    ),
                    s = t.length > 0 ? t : a,
                    n = (0, f.qS)(s);
                  n.length > 0 &&
                    et((e) => (0, f.VI)(Array.from(new Set([...e, ...n]))));
                })
                .catch(() => {}),
              () => {
                e = !0;
              }
            );
          }, [Q, z]));
        let [es, en] = (0, n.useState)(Q);
        es !== Q &&
          (en(Q),
          b(e),
          A(a),
          T(!1),
          _("error" === o),
          O(!1),
          e.length > 0 && et((0, f.qS)(e)));
        let er = (0, n.useMemo)(() => {
            let e = new Set(ea);
            return (
              v.day && "all" !== v.day && e.add(v.day),
              (0, f.VI)(Array.from(e))
            );
          }, [ea, v.day]),
          el = (0, n.useMemo)(
            () =>
              t.length > 0
                ? t
                : Array.from(
                    new Set(
                      j.map((e) => e.society_name.trim()).filter(Boolean),
                    ),
                  ).sort((e, a) => e.localeCompare(a)),
            [t, j],
          ),
          ei = !!B.trim();
        (0, n.useEffect)(() => {
          if (!Q) return;
          let e = !1;
          if (ei) {
            let a = (0, P.nd)();
            return (
              a || T(!0),
              (0, P.q1)({ forceRefresh: z > 0 && !a })
                .then((a) => {
                  if (e) return;
                  let t = (0, P.Uu)(a, B, Q, v).sort(f._v);
                  A(t.length);
                  let s = Math.max(1, Math.ceil(t.length / F.q3));
                  x > s &&
                    window.history.replaceState(null, "", (0, F.N7)(Q, v, s));
                  let n = (x - 1) * F.q3;
                  (b(t.slice(n, n + F.q3)), T(!1), _(!1));
                })
                .catch((a) => {
                  e ||
                    (console.error("Client-side search error:", a),
                    _(!0),
                    T(!1));
                }),
              () => {
                e = !0;
              }
            );
          }
          let a = {
              category: Q,
              society: "all" !== v.club ? v.club : "all",
              format:
                "solo" === v.type
                  ? "individual"
                  : "team" === v.type
                    ? "team"
                    : "all",
              fee: "all" !== v.fee ? v.fee : "all",
              eventDay: "all" !== v.day ? v.day : "all",
              sort: "soonest",
              page: x,
              limit: F.q3,
            },
            t = (0, P.a5)(a),
            s = (0, P.AY)(t);
          if (s && 0 === z) {
            (b(s.events), A(s.total), T(!1), _(!1));
            let e = Math.max(1, Math.ceil(s.total / F.q3));
            x > e && window.history.replaceState(null, "", (0, F.N7)(Q, v, e));
            return;
          }
          return (
            T(!0),
            (0, P.jB)(a, { forceRefresh: z > 0 })
              .then((a) => {
                if (e) return;
                (b(a.events), A(a.total), _(!1));
                let t = Math.max(1, Math.ceil(a.total / F.q3));
                x > t &&
                  window.history.replaceState(null, "", (0, F.N7)(Q, v, t));
              })
              .catch((a) => {
                e ||
                  (a instanceof Error && "AbortError" === a.name) ||
                  (console.error("Could not fetch events page:", a), _(!0));
              })
              .finally(() => {
                e || T(!1);
              }),
            () => {
              e = !0;
            }
          );
        }, [Q, x, B, ei, v, z]);
        let ec = (e) => {
            e !== Q &&
              h.push(e ? `${m}?category=${encodeURIComponent(e)}` : m, {
                scroll: !0,
              });
          },
          eo = (0, n.useMemo)(() => (Q ? j : []), [j, Q]),
          ed = Math.max(1, Math.ceil(y / F.q3)),
          eh = y ? (x - 1) * F.q3 + 1 : 0,
          eu = Math.min(x * F.q3, y),
          em =
            "" !== v.query.trim() ||
            "all" !== v.club ||
            "all" !== v.type ||
            "all" !== v.fee ||
            "all" !== v.day,
          ep = [v.club, v.type, v.fee, v.day].filter((e) => "all" !== e).length,
          ev = (0, n.useRef)(null);
        (0, n.useEffect)(() => {
          let e = ev.current,
            a = e?.querySelector('[aria-current="page"]');
          if (!e || !a) return;
          let t = e.firstElementChild,
            s = a.offsetLeft - (t?.offsetWidth ?? 0) - 16,
            n = a.offsetLeft + a.offsetWidth + 40 - e.clientWidth;
          e.scrollLeft > s
            ? (e.scrollLeft = Math.max(0, s))
            : e.scrollLeft < n && (e.scrollLeft = n);
        }, [Q]);
        let ef = (e, a, t, n) =>
          (0, s.jsxs)("div", {
            className: "ev-filter-group",
            children: [
              (0, s.jsx)("span", { className: "ev-filter-label", children: e }),
              (0, s.jsx)("div", {
                className: "ev-pill-group",
                role: "group",
                "aria-label": `${e} filter`,
                children: t.map(([e, t]) =>
                  (0, s.jsx)(
                    "button",
                    {
                      type: "button",
                      className: "ev-pill",
                      "aria-pressed": a === e,
                      onClick: () => n(a === e && "all" !== e ? "all" : e),
                      children: t,
                    },
                    e,
                  ),
                ),
              }),
            ],
          });
        return (0, s.jsxs)("div", {
          className: Q ? "ev-view has-path" : "ev-view",
          children: [
            (0, s.jsx)(w.FestivalNavbar, {}),
            !Q &&
              (0, s.jsx)(N, {
                mode: "events",
                selectedTrackId: Z,
                onCategorySelect: ec,
                pathCounts: d,
                onPathSelect: ec,
              }),
            !Q &&
              (0, s.jsxs)("p", {
                className: "ev-flagship-link ev-inner",
                children: [
                  (0, s.jsx)("span", {
                    children:
                      "Looking for the opening, closing and other flagship events?",
                  }),
                  (0, s.jsxs)("button", {
                    type: "button",
                    className: "ev-btn ev-btn-ghost",
                    onClick: () => ec("convenor"),
                    children: [
                      f.Wo.convenor.kanji,
                      " Flagship & Convenor events →",
                    ],
                  }),
                ],
              }),
            Q &&
              K &&
              X &&
              (0, s.jsxs)("section", {
                id: "events-results",
                className: "ev-results-section ev-inner",
                "aria-labelledby": "category-results-heading",
                children: [
                  (0, s.jsxs)("nav", {
                    ref: ev,
                    className: "ev-path-switch",
                    "aria-label": "Switch path",
                    children: [
                      (0, s.jsxs)("button", {
                        type: "button",
                        className: "ev-switch-chip ev-switch-all",
                        onClick: () => ec(null),
                        children: [
                          (0, s.jsx)("span", {
                            "aria-hidden": "true",
                            children: "←",
                          }),
                          " All paths",
                        ],
                      }),
                      g.map((e) =>
                        (0, s.jsxs)(
                          "button",
                          {
                            type: "button",
                            className: "ev-switch-chip",
                            "aria-current": e === Q ? "page" : void 0,
                            onClick: () => ec(e),
                            children: [
                              (0, s.jsx)("span", {
                                className: "ev-switch-kanji",
                                "aria-hidden": "true",
                                children: f.Wo[e].kanji,
                              }),
                              " ",
                              "convenor" === e ? "Flagship" : f.Wo[e].virtue,
                            ],
                          },
                          e,
                        ),
                      ),
                    ],
                  }),
                  (0, s.jsxs)("div", {
                    className: "ev-hero",
                    children: [
                      (0, s.jsx)("span", {
                        className: "ev-hero-kanji",
                        "aria-hidden": "true",
                        children: K.kanji,
                      }),
                      (0, s.jsx)("p", {
                        className: "ev-hero-number",
                        children:
                          "convenor" === Q
                            ? K.category
                            : `CHAMBER ${K.number} \xb7 ${K.category}`,
                      }),
                      (0, s.jsx)("h1", {
                        id: "category-results-heading",
                        className: "ev-title",
                        children: X.title,
                      }),
                      (0, s.jsx)("p", {
                        className: "ev-motto",
                        children: X.subtitle,
                      }),
                      (0, s.jsx)("p", {
                        className: "ev-subtitle",
                        children: X.description,
                      }),
                    ],
                  }),
                  "technical" === Q && (0, s.jsx)($, {}),
                  (0, s.jsxs)("div", {
                    className:
                      y > 0 || em ? "ev-browse has-filters" : "ev-browse",
                    children: [
                      (y > 0 || em) &&
                        (0, s.jsxs)("aside", {
                          className: "ev-browse-side",
                          "aria-label": "Search and filters",
                          children: [
                            (0, s.jsxs)("div", {
                              className: "ev-toolbar",
                              children: [
                                (0, s.jsxs)("div", {
                                  className: "ev-search",
                                  children: [
                                    (0, s.jsxs)("svg", {
                                      className: "ev-search-icon",
                                      width: "18",
                                      height: "18",
                                      viewBox: "0 0 24 24",
                                      fill: "none",
                                      stroke: "currentColor",
                                      strokeWidth: "2",
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      "aria-hidden": "true",
                                      children: [
                                        (0, s.jsx)("circle", {
                                          cx: "11",
                                          cy: "11",
                                          r: "8",
                                        }),
                                        (0, s.jsx)("path", {
                                          d: "m21 21-4.3-4.3",
                                        }),
                                      ],
                                    }),
                                    (0, s.jsx)("input", {
                                      type: "search",
                                      "aria-label": ee,
                                      placeholder: ee,
                                      value: v.query,
                                      onFocus: () => {
                                        (0, P.q1)().catch(() => {});
                                      },
                                      onChange: (e) =>
                                        U({ query: e.target.value }),
                                    }),
                                  ],
                                }),
                                (0, s.jsxs)("button", {
                                  type: "button",
                                  className: "ev-filter-toggle",
                                  "aria-expanded": H,
                                  "aria-controls": "ev-filter-panel",
                                  onClick: () => O((e) => !e),
                                  children: [
                                    (0, s.jsx)("svg", {
                                      width: "16",
                                      height: "16",
                                      viewBox: "0 0 24 24",
                                      fill: "none",
                                      stroke: "currentColor",
                                      strokeWidth: "2",
                                      strokeLinecap: "round",
                                      "aria-hidden": "true",
                                      children: (0, s.jsx)("path", {
                                        d: "M4 6h16M7 12h10M10 18h4",
                                      }),
                                    }),
                                    "Filters",
                                    ep > 0 &&
                                      (0, s.jsxs)("span", {
                                        className: "ev-filter-badge",
                                        children: [
                                          ep,
                                          (0, s.jsx)("span", {
                                            className: "sr-only",
                                            children: " on",
                                          }),
                                        ],
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            (0, s.jsxs)("div", {
                              id: "ev-filter-panel",
                              className: "ev-filter-panel",
                              "data-open": H,
                              role: "group",
                              "aria-label": "Filter events",
                              children: [
                                (0, s.jsx)("h2", {
                                  className: "ev-filter-panel-title",
                                  children: "Filter events",
                                }),
                                (0, s.jsxs)("div", {
                                  className: "ev-filter-panel-groups",
                                  children: [
                                    "technical" === Q &&
                                      el.length > 0 &&
                                      (0, s.jsxs)("div", {
                                        className:
                                          "ev-filter-group ev-filter-club",
                                        children: [
                                          (0, s.jsx)("label", {
                                            className: "ev-filter-label",
                                            htmlFor: "ev-club-filter",
                                            children: "Club",
                                          }),
                                          (0, s.jsxs)("select", {
                                            id: "ev-club-filter",
                                            className: "ev-filter-select",
                                            value: v.club,
                                            onChange: (e) =>
                                              U({ club: e.target.value }),
                                            children: [
                                              (0, s.jsx)("option", {
                                                value: "all",
                                                children: "All technical clubs",
                                              }),
                                              el.map((e) =>
                                                (0, s.jsx)(
                                                  "option",
                                                  { value: e, children: e },
                                                  e,
                                                ),
                                              ),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ef(
                                      "Event format",
                                      v.type,
                                      [
                                        ["all", "All"],
                                        ["solo", "Solo"],
                                        ["team", "Team"],
                                      ],
                                      (e) => U({ type: e }),
                                    ),
                                    ef(
                                      "Entry fee",
                                      v.fee,
                                      [
                                        ["all", "All"],
                                        ["free", "Free"],
                                        ["paid", "Paid"],
                                      ],
                                      (e) => U({ fee: e }),
                                    ),
                                    ef(
                                      "Date",
                                      v.day,
                                      [
                                        ["all", "All days"],
                                        ...er.map((e) => [e, e]),
                                      ],
                                      (e) => U({ day: e }),
                                    ),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      (0, s.jsxs)("div", {
                        className: "ev-browse-main",
                        children: [
                          (y > 0 || v.query.trim()) &&
                            (0, s.jsxs)("div", {
                              className: "ev-results-bar",
                              children: [
                                (0, s.jsx)("p", {
                                  className: "ev-result-count",
                                  role: "status",
                                  children:
                                    y > 0
                                      ? `Showing ${eh}–${eu} of ${y} ${1 === y ? "event" : "events"}`
                                      : "No events found",
                                }),
                                em &&
                                  y > 0 &&
                                  (0, s.jsx)("button", {
                                    type: "button",
                                    className: "ev-clear-filters",
                                    onClick: V,
                                    children: "Clear filters",
                                  }),
                              ],
                            }),
                          (0, s.jsx)("div", {
                            "aria-live": "polite",
                            children: M
                              ? (0, s.jsx)("p", {
                                  className: "ev-result-count",
                                  role: "status",
                                  children: "Loading events…",
                                })
                              : R
                                ? (0, s.jsxs)("div", {
                                    className: "ev-empty",
                                    role: "alert",
                                    children: [
                                      (0, s.jsx)("span", {
                                        className: "ev-empty-kanji",
                                        "aria-hidden": "true",
                                        children: "断",
                                      }),
                                      (0, s.jsx)("p", {
                                        children:
                                          "We couldn’t load these events right now.",
                                      }),
                                      (0, s.jsx)("p", {
                                        className: "ev-empty-hint",
                                        children:
                                          "Check your connection and try again.",
                                      }),
                                      (0, s.jsx)("button", {
                                        type: "button",
                                        className: "ev-btn ev-btn-primary",
                                        onClick: () => G((e) => e + 1),
                                        children: "Try again",
                                      }),
                                    ],
                                  })
                                : "soon" !== o || 0 !== y || em
                                  ? 0 === eo.length
                                    ? (0, s.jsxs)("div", {
                                        className: "ev-empty",
                                        children: [
                                          (0, s.jsx)("span", {
                                            className: "ev-empty-kanji",
                                            "aria-hidden": "true",
                                            children: "空",
                                          }),
                                          (0, s.jsxs)("p", {
                                            children: [
                                              "No events match",
                                              v.query.trim()
                                                ? ` “${v.query.trim()}”`
                                                : " these filters",
                                              ".",
                                            ],
                                          }),
                                          (0, s.jsx)("button", {
                                            type: "button",
                                            className: "ev-btn ev-btn-ghost",
                                            onClick: V,
                                            children: "Clear filters",
                                          }),
                                        ],
                                      })
                                    : (0, s.jsx)("div", {
                                        className: "ev-grid",
                                        children: eo.map((e) =>
                                          (0, s.jsx)(
                                            C.A,
                                            {
                                              event: e,
                                              onSelect: D,
                                              returnHref: (0, F.N7)(Q, v, x),
                                            },
                                            e.event_id,
                                          ),
                                        ),
                                      })
                                  : (0, s.jsxs)("div", {
                                      className: "ev-empty",
                                      children: [
                                        (0, s.jsx)("span", {
                                          className: "ev-empty-kanji",
                                          "aria-hidden": "true",
                                          children: K.kanji,
                                        }),
                                        (0, s.jsx)("p", {
                                          children:
                                            "Events for this path will be announced soon.",
                                        }),
                                        (0, s.jsx)("p", {
                                          className: "ev-empty-hint",
                                          children:
                                            "Rulebooks and registrations open here as soon as the organisers publish them. Meanwhile, explore another path.",
                                        }),
                                        (0, s.jsx)("div", {
                                          className: "ev-empty-actions",
                                          children: ["cultural", "technical"]
                                            .filter((e) => e !== Q)
                                            .map((e) =>
                                              (0, s.jsxs)(
                                                "button",
                                                {
                                                  type: "button",
                                                  className:
                                                    "ev-btn ev-btn-ghost",
                                                  onClick: () => ec(e),
                                                  children: [
                                                    f.Wo[e].kanji,
                                                    " ",
                                                    f.Wo[e].virtue,
                                                    " events",
                                                  ],
                                                },
                                                e,
                                              ),
                                            ),
                                        }),
                                      ],
                                    }),
                          }),
                          y > F.q3 &&
                            (0, s.jsxs)("nav", {
                              className: "ev-pagination",
                              "aria-label": "Event result pages",
                              children: [
                                (0, s.jsxs)("button", {
                                  type: "button",
                                  className: "ev-page-button",
                                  onClick: () => Y(Math.max(1, x - 1)),
                                  disabled: 1 === x || M,
                                  "aria-label": "Previous page of events",
                                  children: [
                                    (0, s.jsx)(l.A, { "aria-hidden": "true" }),
                                    (0, s.jsx)("span", {
                                      children: "Previous",
                                    }),
                                  ],
                                }),
                                (0, s.jsxs)("span", {
                                  className: "ev-page-status",
                                  "aria-live": "polite",
                                  children: ["Page ", x, " of ", ed],
                                }),
                                (0, s.jsxs)("button", {
                                  type: "button",
                                  className: "ev-page-button",
                                  onClick: () => Y(Math.min(ed, x + 1)),
                                  disabled: x === ed || M,
                                  "aria-label": "Next page of events",
                                  children: [
                                    (0, s.jsx)("span", { children: "Next" }),
                                    (0, s.jsx)(i.A, { "aria-hidden": "true" }),
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
            (0, s.jsx)(k.q, {}),
            I &&
              (0, s.jsx)(S.A, {
                event: I,
                onClose: () => D(null),
                returnHref: (0, F.N7)(Q, v, x),
              }),
          ],
        });
      }
    },
    30827: (e, a, t) => {
      "use strict";
      t.d(a, { q: () => l });
      var s = t(95155),
        n = t(98500),
        r = t.n(n);
      function l() {
        return (0, s.jsxs)("footer", {
          className: "site-footer",
          style: { marginTop: "auto" },
          children: [
            (0, s.jsxs)(r(), {
              href: "/",
              className: "footer-brand",
              children: ["PECFEST ", (0, s.jsx)("span", { children: "2026" })],
            }),
            (0, s.jsx)("p", {
              children: "Made of curiosity. Built on belonging.",
            }),
            (0, s.jsxs)("div", {
              children: [
                (0, s.jsx)(r(), { href: "/events", children: "Events" }),
                (0, s.jsx)(r(), { href: "/calendar", children: "Schedule" }),
                (0, s.jsx)(r(), { href: "/contact", children: "Contact" }),
                (0, s.jsx)(r(), { href: "/about", children: "About Us" }),
              ],
            }),
            (0, s.jsxs)("div", {
              className: "footer-bottom",
              children: [
                (0, s.jsx)("span", {
                  children: "\xa9 2026 PECFEST \xb7 PUNJAB ENGINEERING COLLEGE",
                }),
                (0, s.jsx)(r(), { href: "/", children: "Back to the gate ↑" }),
              ],
            }),
          ],
        });
      }
    },
    36083: (e, a, t) => {
      "use strict";
      t.d(a, { A: () => r });
      var s = t(51811);
      let n = {
        name: "trophy",
        size: 24,
        node: [
          [
            "path",
            { d: "M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2", key: "pwuv1l" },
          ],
          [
            "path",
            { d: "M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2", key: "1y54w1" },
          ],
          [
            "path",
            {
              d: "M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3",
              key: "e30mpu",
            },
          ],
          ["path", { d: "M4 22h16", key: "57wxv0" }],
          [
            "path",
            {
              d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",
              key: "1mhfuq",
            },
          ],
          [
            "path",
            {
              d: "M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3",
              key: "i0yafy",
            },
          ],
        ],
      };
      n.node;
      let r = (0, s.A)(n);
    },
    41193: (e, a, t) => {
      "use strict";
      t.d(a, {
        AY: () => h,
        Mr: () => g,
        Uu: () => f,
        YG: () => u,
        a5: () => d,
        jB: () => m,
        nd: () => p,
        q1: () => v,
      });
      var s = t(94222),
        n = t(47960);
      function r(e) {
        let a = (e.category || "cultural").toLowerCase().trim(),
          t = "cultural";
        return (
          [
            "cultural",
            "technical",
            "literary",
            "gaming",
            "performing",
            "convenor",
          ].includes(a)
            ? (t = a)
            : a.includes("tech")
              ? (t = "technical")
              : a.includes("game")
                ? (t = "gaming")
                : a.includes("lit")
                  ? (t = "literary")
                  : (a.includes("perform") ||
                      a.includes("dance") ||
                      a.includes("music")) &&
                    (t = "performing"),
          { ...e, track: t, image_url: e.image_url || (0, s.zq)(e.image_key) }
        );
      }
      let l = new Map(),
        i = new Map(),
        c = null,
        o = null;
      function d(e) {
        return `category=${(e.category || "all").toLowerCase().trim()}&society=${(e.society || "all").trim()}&additionalClub=${(e.additionalClub || "all").trim()}&fee=${(e.fee || "all").toLowerCase().trim()}&format=${(e.format || "all").toLowerCase().trim()}&date=${(e.date || "all").toLowerCase().trim()}&eventDay=${(e.eventDay || "all").trim()}&location=${(e.location || "all").trim()}&sort=${(e.sort || "soonest").toLowerCase().trim()}&page=${Math.max(1, e.page)}&limit=${e.limit || 10}`;
      }
      function h(e) {
        return l.get(e) || null;
      }
      function u(e, a, t, s = 1, n = 10) {
        let r = Math.max(1, Math.ceil(t / n));
        l.set(e, {
          events: a,
          total: t,
          totalPages: r,
          page: s,
          timestamp: Date.now(),
        });
      }
      async function m(e, a) {
        let t = d(e);
        if (!a?.forceRefresh) {
          let e = l.get(t);
          if (e) return e;
        }
        let s = i.get(t);
        if (s) return s;
        let n = (async () => {
          try {
            let s = new URLSearchParams();
            (e.category &&
              "all" !== e.category &&
              s.set("category", e.category),
              e.society && "all" !== e.society && s.set("society", e.society),
              e.additionalClub &&
                "all" !== e.additionalClub &&
                s.set("additionalClub", e.additionalClub),
              e.fee && "all" !== e.fee && s.set("fee", e.fee),
              e.format && "all" !== e.format && s.set("format", e.format),
              e.date && "all" !== e.date && s.set("date", e.date),
              e.eventDay &&
                "all" !== e.eventDay &&
                s.set("eventDay", e.eventDay),
              e.location &&
                "all" !== e.location &&
                s.set("location", e.location),
              s.set("sort", e.sort || "soonest"),
              s.set("page", String(e.page)),
              s.set("limit", String(e.limit || 10)));
            let n = await fetch(`/api/events?${s.toString()}`, {
              signal: a?.signal,
            });
            if (!n.ok)
              throw Error(`Failed to fetch events page: ${n.statusText}`);
            let i = await n.json(),
              c = (Array.isArray(i.events) ? i.events : []).map(r),
              o = "number" == typeof i.total ? i.total : c.length,
              d = e.limit || 10,
              h = i.totalPages || Math.max(1, Math.ceil(o / d)),
              u = {
                events: c,
                total: o,
                totalPages: h,
                page: e.page,
                timestamp: Date.now(),
              };
            return (l.set(t, u), u);
          } finally {
            i.delete(t);
          }
        })();
        return (i.set(t, n), n);
      }
      function p(e = Date.now()) {
        return !!c && e - c.timestamp < 12e4;
      }
      async function v(e) {
        let a = Date.now();
        return !e?.forceRefresh && p(a) && c
          ? c.events
          : o ||
              (o = (async () => {
                try {
                  let a = await fetch("/api/events?all=true", {
                    signal: e?.signal,
                  });
                  if (!a.ok)
                    throw Error(
                      `Failed to fetch all events for search: ${a.statusText}`,
                    );
                  let t = await a.json(),
                    s = (Array.isArray(t.events) ? t.events : []).map(r);
                  return ((c = { events: s, timestamp: Date.now() }), s);
                } catch (e) {
                  if (
                    (console.error("Error refreshing search dataset:", e),
                    c && c.events.length > 0)
                  )
                    return c.events;
                  throw e;
                } finally {
                  o = null;
                }
              })());
      }
      function f(e, a, t, s) {
        let r = a.trim().length > 0;
        return e.filter((e) => {
          if (t && "all" !== t) {
            if ("literary" === t) {
              if (
                "literary" !== e.category &&
                "literary" !== e.track &&
                !n.OQ.includes(e.society_name)
              )
                return !1;
            } else if ("performing" === t) {
              if (
                "performing" !== e.category &&
                "performing" !== e.track &&
                !n.r4.includes(e.society_name)
              )
                return !1;
            } else if (e.category !== t && e.track !== t) return !1;
          }
          if (
            s &&
            ((s.club && "all" !== s.club && e.society_name.trim() !== s.club) ||
              ("solo" === s.type && e.is_team_event) ||
              ("team" === s.type && !e.is_team_event) ||
              ("free" === s.fee && Number(e.reg_fees) > 0) ||
              ("paid" === s.fee && 0 === Number(e.reg_fees)) ||
              (s.day &&
                "all" !== s.day &&
                (function (e) {
                  if (!e) return "";
                  let a = Date.parse(e);
                  if (Number.isNaN(a)) return "";
                  let t = new Date(a + 198e5);
                  return `${String(t.getUTCDate()).padStart(2, "0")} ${["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][t.getUTCMonth()]}`;
                })(e.date_time) !== s.day))
          )
            return !1;
          if (!r) return !0;
          let l = a.trim().toLowerCase();
          if (!l) return !0;
          let i = l.split(/\s+/).filter(Boolean);
          if (0 === i.length) return !0;
          let c = [
            e.event_name,
            e.brief_description,
            e.category,
            e.society_name,
            e.additional_club,
            e.location,
            e.contact_info,
            e.pdf_link,
            e.whatsapp_link,
            e.track,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return i.every((e) => c.includes(e));
        });
      }
      function g() {
        (l.clear(),
          i.clear(),
          (c = null),
          (o = null),
          window.dispatchEvent(new CustomEvent("events-cache-invalidated")));
      }
    },
    47960: (e, a, t) => {
      "use strict";
      t.d(a, { Jf: () => l, OQ: () => n, R7: () => s, r4: () => r });
      let s = [
          { id: "cultural", label: "Cultural", mark: "華" },
          { id: "technical", label: "Technical", mark: "技" },
          { id: "literary", label: "Literary", mark: "文" },
          { id: "performing", label: "Performing Arts", mark: "舞" },
          { id: "gaming", label: "Gaming", mark: "勝" },
          { id: "convenor", label: "Convenor", mark: "統" },
        ],
        n = ["Literary Society"],
        r = ["Dance Society", "Music Club", "Dramatics"],
        l = (e) => s.some((a) => a.id === e);
    },
    73321: (e, a, t) => {
      "use strict";
      var s = t(74645);
      (t.o(s, "usePathname") &&
        t.d(a, {
          usePathname: function () {
            return s.usePathname;
          },
        }),
        t.o(s, "useRouter") &&
          t.d(a, {
            useRouter: function () {
              return s.useRouter;
            },
          }),
        t.o(s, "useSearchParams") &&
          t.d(a, {
            useSearchParams: function () {
              return s.useSearchParams;
            },
          }));
    },
    76721: (e, a, t) => {
      "use strict";
      t.d(a, { A: () => r });
      var s = t(51811);
      let n = {
        name: "chevron-right",
        size: 24,
        node: [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]],
      };
      n.node;
      let r = (0, s.A)(n);
    },
    78780: (e, a, t) => {
      "use strict";
      t.d(a, { A: () => r });
      var s = t(51811);
      let n = {
        name: "chevron-left",
        size: 24,
        node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]],
      };
      n.node;
      let r = (0, s.A)(n);
    },
  },
  (e) => {
    (e.O(
      0,
      [2490, 6711, 8500, 4987, 9030, 4222, 4388, 1402, 8441, 3794, 7358],
      () => e((e.s = 4511)),
    ),
      (_N_E = e.O()));
  },
]);
