(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [7177],
  {
    18897: (e, t, r) => {
      "use strict";
      r.d(t, { MP: () => a, S9: () => n, f4: () => s, sy: () => i });
      let a = [
        {
          href: "/events",
          title: "Events",
          detail: "Find your competition",
          mark: "01",
        },
        {
          href: "/calendar",
          title: "Schedule",
          detail: "Plan your festival",
          mark: "02",
        },
        {
          href: "/gallery",
          title: "Gallery",
          detail: "Festival Chronicles",
          mark: "03",
        },
        {
          href: "/sponsors",
          title: "Sponsors",
          detail: "Patrons of the realm",
          mark: "04",
        },
        {
          href: "/committees/map",
          title: "Committee",
          detail: "Meet the organisers",
          mark: "05",
        },
        {
          href: "/developer",
          title: "Developers",
          detail: "Behind the sanctuary",
          mark: "06",
        },
        {
          href: "/contact",
          title: "Contact",
          detail: "Find help and directions",
          mark: "07",
        },
        {
          href: "/about",
          title: "About PECFEST",
          detail: "A Mystic Mikado",
          mark: "08",
        },
      ];
      function s(e) {
        let t = i(e.split(/[?#]/)[0]);
        return "/" === t
          ? "The sanctuary"
          : "/login" === t
            ? "Festival sign in"
            : "/profile" === t
              ? "Your festival pass"
              : t.startsWith("/events/")
                ? "Event details"
                : "/committee" === t
                  ? "Committee directory"
                  : (a.find((e) => e.href === t)?.title ?? "PECFEST");
      }
      function n(e) {
        return (
          "/" === (e = i(e)) ||
          "/login" === e ||
          "/profile" === e ||
          "/events" === e ||
          "/committee" === e ||
          e.startsWith("/events/") ||
          a.some((t) => t.href === e)
        );
      }
      function i(e) {
        return "/developers" === e
          ? "/developer"
          : "/committees" === e
            ? "/committee"
            : e;
      }
    },
    19579: (e, t, r) => {
      "use strict";
      r.d(t, { AA: () => l, vi: () => n, yQ: () => i });
      var a = r(55042),
        s = r(18897);
      function n(e, t) {
        let r = new URLSearchParams({ register: "1" });
        return (
          null !== t && r.set("from", (0, a.EB)(t)),
          `/events/${encodeURIComponent(e)}?${r}`
        );
      }
      function i(e, t) {
        let r = new URLSearchParams(t);
        r.delete("register");
        let a = r.toString();
        return `${e}${a ? `?${a}` : ""}`;
      }
      function o(e, t) {
        return (e.sort(), t.sort(), e.toString() === t.toString());
      }
      function l(e, t) {
        try {
          let r = new URL(e, "https://pecfest.invalid"),
            a = new URL(t, "https://pecfest.invalid");
          if (
            r.origin !== a.origin ||
            (0, s.sy)(r.pathname) !== (0, s.sy)(a.pathname)
          )
            return !1;
          if (o(r.searchParams, a.searchParams)) return !0;
          if (
            !/^\/events\/[^/]+$/.test(r.pathname) ||
            1 !== r.searchParams.getAll("register").length ||
            "1" !== r.searchParams.get("register") ||
            a.searchParams.has("register")
          )
            return !1;
          return (
            r.searchParams.delete("register"),
            o(r.searchParams, a.searchParams)
          );
        } catch {
          return !1;
        }
      }
    },
    24800: (e, t, r) => {
      "use strict";
      r.d(t, { JB: () => l, Z5: () => o, s_: () => i, w: () => c });
      let a = { enabled: !0, status: "waiting" },
        s = a,
        n = new Set(),
        i = () => s,
        o = () => a;
      function l(e, t) {
        (s.enabled !== e || s.status !== t) &&
          ((s = { enabled: e, status: t }), n.forEach((e) => e()));
      }
      function c(e) {
        return (
          n.add(e),
          () => {
            n.delete(e);
          }
        );
      }
    },
    26579: (e, t, r) => {
      (Promise.resolve().then(r.t.bind(r, 48624, 23)),
        Promise.resolve().then(r.t.bind(r, 86477, 23)),
        Promise.resolve().then(r.t.bind(r, 17094, 23)),
        Promise.resolve().then(r.t.bind(r, 64219, 23)),
        Promise.resolve().then(r.t.bind(r, 35504, 23)),
        Promise.resolve().then(r.t.bind(r, 5869, 23)),
        Promise.resolve().then(r.t.bind(r, 7526, 23)),
        Promise.resolve().then(r.t.bind(r, 19931, 23)),
        Promise.resolve().then(r.t.bind(r, 42593, 23)),
        Promise.resolve().then(r.t.bind(r, 51743, 23)),
        Promise.resolve().then(r.bind(r, 80895)),
        Promise.resolve().then(r.bind(r, 99360)),
        Promise.resolve().then(r.bind(r, 65619)),
        Promise.resolve().then(r.t.bind(r, 79521, 23)));
    },
    51743: () => {},
    52228: (e, t, r) => {
      "use strict";
      r.d(t, { sU: () => s, Qc: () => n, gJ: () => i });
      let a = JSON.parse(
        '{"/models/CHerry_blossom_draco.glb":"https://res.cloudinary.com/xcjt6dhx/image/upload/v1791703997/cherry_blossom_draco_2_-compressed.glb","/models/Cedar_tree.glb":"https://res.cloudinary.com/xcjt6dhx/image/upload/v1791705151/cedar_tree_1_-compressed.glb","/textures/forest_env.hdr":"https://res.cloudinary.com/xcjt6dhx/raw/upload/v1790763988/forest_env_1024.hdr","/textures/cedar_billboard.png":"https://res.cloudinary.com/xcjt6dhx/image/upload/v1790764046/cedar_billboard.png","/textures/cedar_leaf_rgba.png":"https://res.cloudinary.com/xcjt6dhx/image/upload/v1790764068/cedar_leaf_rgba.png","/pecfest-logo-display.webp":"https://res.cloudinary.com/xcjt6dhx/image/upload/v1790763641/pecfest2026/branding/pecfest_logo_display.webp","/audio/ambience.mp3":"https://res.cloudinary.com/xcjt6dhx/video/upload/v1790764076/ambience_loop.mp3"}',
      );
      function s(e) {
        return a[e] ? a[e] : e;
      }
      function n(e) {
        let t = s(e);
        return t.includes("res.cloudinary.com") &&
          t.includes("/image/upload/") &&
          !t.includes("f_auto")
          ? t.replace("/image/upload/", "/image/upload/f_auto,q_auto/")
          : t;
      }
      function i(e, t) {
        return t
          .map(
            (t) =>
              `${(function (e, t, r = {}) {
                let a = s(e);
                if (
                  !a.includes("res.cloudinary.com") ||
                  !a.includes("/image/upload/")
                )
                  return a;
                let n = r.quality ?? "auto",
                  i = r.dpr ?? "auto",
                  o = `f_auto,q_${n},w_${Math.max(1, Math.round(t))},dpr_${i}`,
                  l = "/image/upload/",
                  c = a.indexOf(l),
                  d = a.slice(c + l.length);
                return /^(?:f_|q_|w_|dpr_|c_|ar_)/.test(d)
                  ? a.replace(l, `${l}${o},`)
                  : a.replace(l, `${l}${o}/`);
              })(e, t)} ${t}w`,
          )
          .join(", ");
      }
    },
    55042: (e, t, r) => {
      "use strict";
      r.d(t, {
        EB: () => n,
        KN: () => s,
        N7: () => l,
        q3: () => i,
        vH: () => o,
      });
      let a = {
        category: [
          ["all", "All events", "祭"],
          ["cultural", "Cultural", "華"],
          ["technical", "Technical", "技"],
          ["literary", "Literary", "文"],
          ["gaming", "Gaming", "勝"],
          ["performing", "Performing arts", "舞"],
          ["convenor", "Flagship", "統"],
        ].map(([e]) => e),
        fee: ["all", "free", "paid"],
        format: ["all", "individual", "team"],
        sort: ["soonest", "latest", "name_asc", "fee_low", "fee_high"],
        date: ["all", "upcoming", "today", "tomorrow", "past"],
      };
      function s(e) {
        var t;
        let r,
          s,
          n,
          i,
          o,
          l,
          c = new URLSearchParams();
        for (let [t, r] of Object.entries(a)) {
          let a = e.get(t) || ("category" === t ? e.get("track") : null);
          a &&
            r.includes(a) &&
            "all" !== a &&
            ("sort" !== t || "soonest" !== a) &&
            c.set(t, a);
        }
        let d = ((n = (s = (r = (t = e.get("search") || "").replace(
          /[^a-zA-Z0-9\s-&]/g,
          "",
        )).trim()).slice(0, 50)),
        (i = /[^a-zA-Z0-9\s-&]/.test(t)),
        (o = s.length > 50),
        (l =
          !n && t.trim()
            ? "No search applied. Use English letters, numbers, spaces, hyphens or & to find an event."
            : [
                i ? "Unsupported characters were removed." : "",
                o ? "Search is limited to the first 50 characters." : "",
              ]
                .filter(Boolean)
                .join(" ")),
        { value: n, inputValue: r.trimStart().slice(0, 50), message: l }).value;
        for (let t of (d && c.set("search", d),
        ["society", "location", "eventDay"])) {
          let r = e.get(t)?.trim();
          r && "all" !== r && c.set(t, r.slice(0, 160));
        }
        let u = Number(e.get("page"));
        return (
          Number.isSafeInteger(u) && u > 1 && c.set("page", String(u)),
          c
        );
      }
      function n(e) {
        if (!e || !/^\/events(?:\?|$)/.test(e)) return "/events";
        let t = s(new URLSearchParams(e.split("?")[1] || "")).toString();
        return t ? `/events?${t}` : "/events";
      }
      let i = 10;
      function o(e) {
        let t = s(e);
        return {
          query: (e.get("search") || "").slice(0, 50),
          club: t.get("society") || "all",
          type:
            "individual" === t.get("format")
              ? "solo"
              : "team" === t.get("format")
                ? "team"
                : "all",
          fee:
            "free" === t.get("fee")
              ? "free"
              : "paid" === t.get("fee")
                ? "paid"
                : "all",
          day: t.get("eventDay") || "all",
        };
      }
      function l(e, t, r = 1) {
        let a = s(
          new URLSearchParams({
            category: e || "",
            society: t.club,
            fee: t.fee,
            format: "solo" === t.type ? "individual" : t.type,
            eventDay: t.day,
            page: String(r),
          }),
        );
        return (
          t.query && a.set("search", t.query.slice(0, 50)),
          `/events${a.size ? `?${a}` : ""}`
        );
      }
    },
    65619: (e, t, r) => {
      "use strict";
      r.d(t, { PublicExperienceShell: () => g });
      var a = r(95155),
        s = r(12115),
        n = r(73321),
        i = r(98500),
        o = r.n(i),
        l = r(18897),
        c = r(73916);
      function d() {
        let e = (0, n.usePathname)(),
          [t, r] = (0, s.useState)(!1),
          i = (0, s.useRef)(null);
        return (
          (0, s.useEffect)(() => {
            let e = () => r(!0),
              t = () => r(!1);
            return (
              window.addEventListener("pecfest:explore", e),
              window.addEventListener("pecfest:navigating", t),
              () => {
                (window.removeEventListener("pecfest:explore", e),
                  window.removeEventListener("pecfest:navigating", t));
              }
            );
          }, []),
          (0, s.useEffect)(() => {
            if (!t) return;
            let e = document.activeElement,
              r = i.current;
            return (
              r.showModal(),
              () => {
                (r.close(), e?.focus({ preventScroll: !0 }));
              }
            );
          }, [t]),
          (0, a.jsxs)(a.Fragment, {
            children: [
              "/" === e &&
                (0, a.jsxs)("nav", {
                  className: "sanctuary-shortcuts",
                  "aria-label": "Quick festival navigation",
                  children: [
                    (0, a.jsxs)(o(), {
                      className: "shortcut-events",
                      href: "/events",
                      children: [
                        "Events ",
                        (0, a.jsx)("span", {
                          "aria-hidden": "true",
                          children: "↗",
                        }),
                      ],
                    }),
                    (0, a.jsxs)("button", {
                      className: "explore-crest",
                      type: "button",
                      onClick: c.UT,
                      "aria-haspopup": "dialog",
                      "aria-expanded": t,
                      children: [
                        (0, a.jsx)("span", {
                          className: "explore-symbol",
                          "aria-hidden": "true",
                          children: "✦",
                        }),
                        " Explore PECFEST",
                      ],
                    }),
                  ],
                }),
              t &&
                (0, a.jsx)("dialog", {
                  ref: i,
                  className: "destination-directory",
                  "aria-labelledby": "directory-title",
                  "data-lenis-prevent": !0,
                  onCancel: () => r(!1),
                  onClick: (e) => {
                    e.target === e.currentTarget && r(!1);
                  },
                  children: (0, a.jsxs)("div", {
                    className: "directory-inner",
                    children: [
                      (0, a.jsx)("button", {
                        className: "directory-close",
                        type: "button",
                        onClick: () => r(!1),
                        "aria-label": "Close destination menu",
                        children: "\xd7",
                      }),
                      (0, a.jsx)("span", {
                        className: "directory-kicker",
                        children: "THE IMPERIAL DIRECTORY",
                      }),
                      (0, a.jsxs)("h2", {
                        id: "directory-title",
                        children: [
                          "Choose your ",
                          (0, a.jsx)("em", { children: "chapter." }),
                        ],
                      }),
                      (0, a.jsx)("p", {
                        children:
                          "Go straight to what brings you here. The sanctuary will be waiting.",
                      }),
                      (0, a.jsx)("nav", {
                        className: "directory-grid",
                        "aria-label": "Festival destinations",
                        children: l.MP.map((t) =>
                          (0, a.jsxs)(
                            o(),
                            {
                              href: t.href,
                              "aria-current": e === t.href ? "page" : void 0,
                              children: [
                                (0, a.jsx)("span", {
                                  className: "directory-number",
                                  children: t.mark,
                                }),
                                (0, a.jsxs)("span", {
                                  children: [
                                    (0, a.jsx)("strong", { children: t.title }),
                                    (0, a.jsx)("small", { children: t.detail }),
                                  ],
                                }),
                                (0, a.jsx)("span", {
                                  "aria-hidden": "true",
                                  children: "↗",
                                }),
                              ],
                            },
                            t.href,
                          ),
                        ),
                      }),
                      (0, a.jsxs)("div", {
                        className: "directory-footer",
                        children: [
                          (0, a.jsx)(o(), {
                            href: "/login",
                            children: "Sign in to your festival pass ↗",
                          }),
                          (0, a.jsx)("button", {
                            type: "button",
                            onClick: () => r(!1),
                            children: "Continue exploring",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
            ],
          })
        );
      }
      var u = r(45911),
        m = r(19579);
      let p = "/art/passage-dragon.webp";
      function f() {
        let e = (0, n.useRouter)(),
          t = (0, n.usePathname)(),
          [r, i] = (0, s.useTransition)(),
          [o, d] = (0, s.useState)("idle"),
          [f, h] = (0, s.useState)("The sanctuary"),
          x = (0, s.useRef)(null),
          g = (0, s.useRef)(!1),
          b = (0, s.useRef)(""),
          v = (0, s.useRef)(null),
          y = (0, s.useRef)(!1);
        return (
          (0, s.useEffect)(() => {
            let t = new Image();
            ((t.src = p), t.decode?.().catch(() => {}));
            let r = matchMedia("(prefers-reduced-motion: reduce)"),
              a = () => {
                y.current = r.matches;
              };
            (a(), r.addEventListener("change", a));
            let s = (t) => {
                let r = new URL(t, location.origin);
                if (
                  r.origin !== location.origin ||
                  !(0, l.S9)(r.pathname) ||
                  g.current
                )
                  return !1;
                if (r.href === location.href) return !0;
                ((g.current = !0),
                  (b.current = r.pathname + r.search),
                  h((0, l.f4)(t)),
                  d("closing"),
                  window.dispatchEvent(new Event("pecfest:navigating")),
                  v.current?.kill());
                let a = x.current;
                return (
                  u.Ay.set(a, { visibility: "visible", pointerEvents: "auto" }),
                  a.focus({ preventScroll: !0 }),
                  (v.current = u.Ay.timeline()
                    .fromTo(
                      a.querySelector(".passage-door-left"),
                      { x: 0, xPercent: -102 },
                      {
                        x: 0,
                        xPercent: 0,
                        duration: y.current ? 0.12 : 0.48,
                        ease: "power3.inOut",
                      },
                      0,
                    )
                    .fromTo(
                      a.querySelector(".passage-door-right"),
                      { x: 0, xPercent: 102 },
                      {
                        x: 0,
                        xPercent: 0,
                        duration: y.current ? 0.12 : 0.48,
                        ease: "power3.inOut",
                      },
                      0,
                    )
                    .fromTo(
                      a.querySelector(".passage-seal"),
                      { opacity: 0, y: 8 },
                      { opacity: 1, y: 0, duration: y.current ? 0.08 : 0.18 },
                      "-=.1",
                    )
                    .call(() => {
                      (a.focus({ preventScroll: !0 }),
                        d("loading"),
                        i(() => e.push(t)));
                    })),
                  !0
                );
              },
              n = (0, c.i6)(s),
              o = (e) => {
                if (
                  e.defaultPrevented ||
                  0 !== e.button ||
                  e.ctrlKey ||
                  e.metaKey ||
                  e.shiftKey ||
                  e.altKey
                )
                  return;
                let t =
                  e.target instanceof Element
                    ? e.target.closest("a[href]")
                    : null;
                if (
                  !t ||
                  t.download ||
                  (t.target && "_self" !== t.target) ||
                  t.hasAttribute("data-native-navigation")
                )
                  return;
                let r = new URL(t.href, location.origin);
                (0, l.S9)(location.pathname) &&
                  r.origin === location.origin &&
                  (0, l.S9)(r.pathname) &&
                  (r.pathname !== location.pathname ||
                    r.search !== location.search) &&
                  (e.preventDefault(),
                  e.stopImmediatePropagation(),
                  s(r.pathname + r.search + r.hash));
              };
            return (
              document.addEventListener("click", o, !0),
              () => {
                (n(),
                  document.removeEventListener("click", o, !0),
                  r.removeEventListener("change", a),
                  v.current?.kill());
              }
            );
          }, [e]),
          (0, s.useEffect)(() => {
            if ("loading" !== o && "delayed" !== o) return;
            let e = () => {
                if (
                  r ||
                  t !== location.pathname ||
                  !(0, m.AA)(b.current, location.pathname + location.search) ||
                  document.querySelector('[data-route-loading="true"]')
                )
                  return;
                d("opening");
                let e = x.current;
                (v.current?.kill(),
                  (v.current = u.Ay.timeline({
                    onComplete: () => {
                      (u.Ay.set(e, {
                        visibility: "hidden",
                        pointerEvents: "none",
                      }),
                        (g.current = !1),
                        d("idle"));
                      let t = document.querySelector("main h1, main h2");
                      if (t) {
                        let e = t.getAttribute("tabindex");
                        (t.setAttribute("tabindex", "-1"),
                          t.focus({ preventScroll: !0 }),
                          t.addEventListener(
                            "blur",
                            () => {
                              null === e
                                ? t.removeAttribute("tabindex")
                                : t.setAttribute("tabindex", e);
                            },
                            { once: !0 },
                          ));
                      }
                    },
                  })
                    .to(e.querySelector(".passage-seal"), {
                      opacity: 0,
                      duration: 0.12,
                    })
                    .to(
                      e.querySelector(".passage-door-left"),
                      {
                        xPercent: -102,
                        duration: y.current ? 0.12 : 0.65,
                        ease: "power3.inOut",
                      },
                      "-=.06",
                    )
                    .to(
                      e.querySelector(".passage-door-right"),
                      {
                        xPercent: 102,
                        duration: y.current ? 0.12 : 0.65,
                        ease: "power3.inOut",
                      },
                      "<",
                    )));
              },
              a = new MutationObserver(e);
            a.observe(document.body, {
              childList: !0,
              subtree: !0,
              attributes: !0,
              attributeFilter: ["data-route-loading"],
            });
            let s = setTimeout(e, 120),
              n = setTimeout(() => d("delayed"), 12e3);
            return () => {
              (a.disconnect(), clearTimeout(s), clearTimeout(n));
            };
          }, [o, t, r]),
          (0, a.jsxs)("div", {
            ref: x,
            className: "imperial-passage",
            "data-phase": o,
            "aria-hidden": "idle" === o,
            tabIndex: -1,
            onKeyDown: (e) => {
              "idle" !== o &&
                "delayed" !== o &&
                "Tab" === e.key &&
                e.preventDefault();
            },
            children: [
              ["left", "right"].map((e) =>
                (0, a.jsxs)(
                  "div",
                  {
                    className: `passage-door passage-door-${e}`,
                    "aria-hidden": "true",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "passage-painting",
                        children: [
                          (0, a.jsx)("span", { className: "passage-sun" }),
                          (0, a.jsx)("div", {
                            className: "passage-cloud passage-cloud-one",
                          }),
                          (0, a.jsx)("div", {
                            className: "passage-cloud passage-cloud-two",
                          }),
                          (0, a.jsx)("img", {
                            className: "ink-dragon",
                            src: p,
                            alt: "",
                            width: 1e3,
                            height: 820,
                            decoding: "async",
                            draggable: !1,
                          }),
                          (0, a.jsxs)("span", {
                            className: "passage-inscription",
                            children: [
                              "A MYSTIC",
                              (0, a.jsx)("br", {}),
                              "MIKADO",
                            ],
                          }),
                          (0, a.jsxs)("span", {
                            className: "passage-stamp",
                            children: ["PEC", (0, a.jsx)("br", {}), "FEST"],
                          }),
                          (0, a.jsx)("div", {
                            className: "passage-petals",
                            children: [0, 1, 2, 3, 4].map((e) =>
                              (0, a.jsx)("i", {}, e),
                            ),
                          }),
                        ],
                      }),
                      (0, a.jsx)("span", { className: "passage-handle" }),
                    ],
                  },
                  e,
                ),
              ),
              (0, a.jsxs)("div", {
                className: "passage-seal",
                role: "status",
                "aria-live": "polite",
                children: [
                  (0, a.jsx)("span", {
                    className: "passage-kicker",
                    children: "PECFEST 2026 \xb7 A MYSTIC MIKADO",
                  }),
                  (0, a.jsx)("strong", { children: f }),
                  (0, a.jsx)("span", {
                    className: "passage-status",
                    children:
                      "delayed" === o
                        ? "Taking a little longer than expected…"
                        : "Unfolding your next chapter…",
                  }),
                  "delayed" === o &&
                    (0, a.jsx)("button", {
                      type: "button",
                      onClick: () => {
                        (v.current?.kill(),
                          u.Ay.set(x.current, {
                            visibility: "hidden",
                            pointerEvents: "none",
                          }),
                          (g.current = !1),
                          d("idle"));
                      },
                      children: "Return to the page",
                    }),
                ],
              }),
            ],
          })
        );
      }
      var h = r(95295),
        x = r(24800);
      function g() {
        let e = (0, n.usePathname)().startsWith("/admin");
        return (
          (0, s.useEffect)(() => {
            if (e) return;
            (0, x.s_)().enabled && (0, h.RJ)(!0);
            let t = () => (0, h.kI)(document.hidden),
              r = (e) => {
                (e.target instanceof Element &&
                  e.target.closest(".sound-control")) ||
                  (0, h.gb)();
              };
            return (
              document.addEventListener("visibilitychange", t),
              document.addEventListener("pointerup", r),
              document.addEventListener("keydown", r),
              () => {
                (document.removeEventListener("visibilitychange", t),
                  document.removeEventListener("pointerup", r),
                  document.removeEventListener("keydown", r),
                  (0, h.L3)());
              }
            );
          }, [e]),
          (0, a.jsxs)(a.Fragment, {
            children: [(0, a.jsx)(d, {}), (0, a.jsx)(f, {})],
          })
        );
      }
    },
    73916: (e, t, r) => {
      "use strict";
      r.d(t, { UT: () => n, VJ: () => s, i6: () => i });
      let a = null;
      function s(e) {
        return a ? a(e) : (window.location.assign(e), !0);
      }
      function n() {
        window.dispatchEvent(new Event("pecfest:explore"));
      }
      function i(e) {
        return (
          (a = e),
          () => {
            a === e && (a = null);
          }
        );
      }
    },
    79521: () => {},
    80895: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => u });
      var a = r(95155),
        s = r(12115),
        n = r(98500),
        i = r.n(n),
        o = r(73321),
        l = r(49237),
        c = r(9005),
        d = r(90467);
      function u() {
        let e = (0, o.usePathname)(),
          [t, r] = (0, s.useState)(!1);
        (0, s.useEffect)(() => {
          if (
            !e ||
            e.startsWith("/feedback") ||
            e.startsWith("/admin") ||
            !(
              e.startsWith("/profile") ||
              e.startsWith("/events") ||
              e.startsWith("/schedule")
            )
          )
            return void r(!1);
          {
            if ("true" === sessionStorage.getItem("pecfest_feedback_dismissed"))
              return void r(!1);
            let e = localStorage.getItem("pecfest_feedback_snooze_until");
            if (e && Number(e) > Date.now()) return void r(!1);
            let t = setTimeout(() => {
              r(!0);
            }, 2e3);
            return () => clearTimeout(t);
          }
        }, [e]);
        let n = () => {
          (r(!1),
            sessionStorage.setItem("pecfest_feedback_dismissed", "true"),
            localStorage.setItem(
              "pecfest_feedback_snooze_until",
              String(Date.now() + 2592e5),
            ));
        };
        return t
          ? (0, a.jsxs)("aside", {
              "aria-label": "Feedback prompt",
              className:
                "fixed bottom-4 right-4 z-40 max-w-[340px] w-[calc(100vw-2rem)] rounded-2xl bg-[#0d131f]/95 border border-[#c99a3a]/40 shadow-2xl backdrop-blur-md p-3.5 sm:p-4 text-[#efe4cd] animate-slide-up flex items-start gap-3",
              children: [
                (0, a.jsx)("div", {
                  className:
                    "w-9 h-9 rounded-xl bg-[#c99a3a]/15 border border-[#c99a3a]/30 flex items-center justify-center text-[#e8c66a] shrink-0 mt-0.5",
                  children: (0, a.jsx)(l.A, { className: "w-5 h-5" }),
                }),
                (0, a.jsxs)("div", {
                  className: "flex-1 min-w-0 space-y-1",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, a.jsx)("p", {
                          className:
                            "font-serif text-xs font-semibold text-[#efe4cd]",
                          children: "Have a question or feedback?",
                        }),
                        (0, a.jsx)("button", {
                          type: "button",
                          onClick: n,
                          "aria-label": "Dismiss feedback prompt",
                          className:
                            "text-[#829b91] hover:text-[#efe4cd] transition p-0.5 rounded cursor-pointer",
                          children: (0, a.jsx)(c.A, {
                            className: "w-3.5 h-3.5",
                          }),
                        }),
                      ],
                    }),
                    (0, a.jsx)("p", {
                      className:
                        "text-[11px] text-[#829b91] font-serif leading-tight",
                      children:
                        "Let us know if you need assistance or want to share your thoughts.",
                    }),
                    (0, a.jsxs)("div", {
                      className: "pt-1.5 flex items-center justify-between",
                      children: [
                        (0, a.jsxs)(i(), {
                          href: "/feedback",
                          onClick: n,
                          className:
                            "inline-flex items-center gap-1 text-[11px] font-serif font-bold text-[#e8c66a] hover:underline",
                          children: [
                            (0, a.jsx)("span", { children: "Open Helpdesk" }),
                            (0, a.jsx)(d.A, {
                              className: "w-3 h-3 text-[#c99a3a]",
                            }),
                          ],
                        }),
                        (0, a.jsx)("button", {
                          type: "button",
                          onClick: n,
                          className:
                            "text-[10px] text-[#829b91] hover:text-slate-300 font-serif cursor-pointer",
                          children: "Not now",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          : null;
      }
    },
    95295: (e, t, r) => {
      "use strict";
      let a;
      r.d(t, {
        L3: () => y,
        RJ: () => g,
        gb: () => f,
        kI: () => v,
        q3: () => b,
      });
      var s = r(14987),
        n = r(52228),
        i = r(24800);
      let o = null,
        l = null,
        c = !1,
        d = !1,
        u = !1,
        m = 0;
      function p() {
        if (!(!c || d || u || o?.state() !== "loaded" || o.playing())) {
          if (s.Howler.ctx && "running" !== s.Howler.ctx.state)
            return void (0, i.JB)(!0, "waiting");
          ((u = !0), o.play());
        }
      }
      function f() {
        if (!c || d) return;
        if (!s.Howler.ctx || "running" === s.Howler.ctx.state) return void p();
        let e = m;
        (s.Howler.ctx
          ?.resume()
          .then(() => {
            e === m && p();
          })
          .catch(() => {
            c && e === m && (0, i.JB)(!0, "waiting");
          }),
          p());
      }
      function h() {
        (o?.state() === "loaded" && o.pause(),
          l?.state() === "loaded" && l.stop(),
          (u = !1));
      }
      function x() {
        (clearTimeout(a),
          (m += 1),
          o?.unload(),
          l?.unload(),
          (o = null),
          (l = null),
          (u = !1));
      }
      function g(e) {
        if (((c = e), (d = document.hidden), !e)) {
          (clearTimeout(a), h(), (0, i.JB)(!1, "off"));
          return;
        }
        if (((0, i.JB)(!0, o?.playing() ? "playing" : "loading"), !o)) {
          let e = ++m,
            t = () => {
              if (e !== m) return;
              let t = c;
              ((c = !1), x(), t && (0, i.JB)(!1, "error"));
            };
          ((o = new s.Howl({
            src: [(0, n.sU)("/audio/ambience.mp3")],
            loop: !0,
            volume: 0.28,
            preload: !1,
            onload: () => {
              e === m && (clearTimeout(a), p());
            },
            onplay: () => {
              e === m &&
                ((u = !1),
                !c || d ? h() : (clearTimeout(a), (0, i.JB)(!0, "playing")));
            },
            onloaderror: t,
            onplayerror: () => {
              e === m &&
                ((u = !1),
                s.Howler.ctx?.state === "suspended"
                  ? (c && (0, i.JB)(!0, "waiting"), o?.once("unlock", p))
                  : t());
            },
          })),
            (l = new s.Howl({
              src: ["/audio/cues.mp3"],
              volume: 0.34,
              preload: !1,
              sprite: {
                clack: [0, 300],
                slash: [500, 650],
                taiko: [1400, 1400],
              },
              onplay: () => {
                e === m && (!c || d) && l?.stop();
              },
              onloaderror: () =>
                console.warn("Festival interaction sounds are unavailable."),
            })));
        }
        let t = m;
        (clearTimeout(a),
          (a = setTimeout(() => {
            c &&
              t === m &&
              o?.state() !== "loaded" &&
              ((c = !1), x(), (0, i.JB)(!1, "error"));
          }, 15e3)),
          "unloaded" === o.state() && o.load(),
          l?.state() === "unloaded" && l.load(),
          f());
      }
      function b(e) {
        c && !d && l?.state() === "loaded" && l.play(e);
      }
      function v(e) {
        (d = e) ? h() : f();
      }
      function y() {
        let e = (0, i.s_)().enabled;
        ((c = !1), (d = !1), x(), (0, i.JB)(e, e ? "waiting" : "off"));
      }
    },
    99360: (e, t, r) => {
      "use strict";
      r.d(t, { default: () => y });
      var a = r(95155),
        s = r(12115),
        n = r(98500),
        i = r.n(n),
        o = r(73321),
        l = r(47650),
        c = r(9005),
        d = r(69203),
        u = r(5669),
        m = r(90467),
        p = r(64962);
      let f = "pecfest_important_notice_v1",
        h = "pecfest_notice_dismissed";
      function x(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          "boolean" == typeof e.neverShowAgain &&
          "number" == typeof e.windowStart &&
          "number" == typeof e.impressions
        );
      }
      function g(e) {
        "u" > typeof document &&
          (document.cookie = e
            ? `${h}=1; path=/; max-age=31536000; SameSite=Lax`
            : `${h}=; path=/; max-age=0; SameSite=Lax`);
      }
      function b(e) {
        try {
          localStorage.setItem(f, JSON.stringify(e));
        } catch {}
      }
      function v() {
        (g(!0),
          b({ neverShowAgain: !0, windowStart: Date.now(), impressions: 99 }));
      }
      function y() {
        let e = (0, o.usePathname)(),
          [t, r] = (0, s.useState)(!1),
          [n, y] = (0, s.useState)(!1),
          [w, j] = (0, s.useState)(!1),
          N = (0, s.useRef)(null);
        ((0, s.useEffect)(() => {
          r(!0);
        }, []),
          (0, s.useEffect)(() => {
            if (
              !("/profile" === e || e?.startsWith("/profile/")) ||
              (!("u" < typeof document) &&
                document.cookie
                  .split(";")
                  .some((e) => e.trim().startsWith(`${h}=1`))) ||
              !(function () {
                try {
                  let e = Date.now(),
                    t = localStorage.getItem(f),
                    r = t ? JSON.parse(t) : null;
                  if (x(r)) {
                    if (r.neverShowAgain) return !1;
                    if (e - r.windowStart < 144e5) {
                      if (r.impressions >= 2) return !1;
                      return (b({ ...r, impressions: r.impressions + 1 }), !0);
                    }
                  }
                  return (
                    b({ neverShowAgain: !1, windowStart: e, impressions: 1 }),
                    !0
                  );
                } catch {
                  return !1;
                }
              })()
            )
              return void y(!1);
            let t = setTimeout(() => y(!0), 350);
            return () => clearTimeout(t);
          }, [e]));
        let k = (0, s.useCallback)(() => {
          (y(!1), w && v());
        }, [w]);
        return ((0, s.useEffect)(() => {
          if (!n) return;
          let e = (e) => {
            "Escape" === e.key && k();
          };
          window.addEventListener("keydown", e);
          let t = document.body.style.overflow;
          return (
            (document.body.style.overflow = "hidden"),
            N.current?.focus(),
            () => {
              (window.removeEventListener("keydown", e),
                (document.body.style.overflow = t));
            }
          );
        }, [n, k]),
        t && n)
          ? (0, l.createPortal)(
              (0, a.jsx)("div", {
                role: "presentation",
                onClick: (e) => {
                  e.target === e.currentTarget && k();
                },
                className:
                  "fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in",
                children: (0, a.jsxs)("div", {
                  role: "dialog",
                  "aria-modal": "true",
                  "aria-labelledby": "important-notice-title",
                  "aria-describedby": "important-notice-desc",
                  style: { maxHeight: "70vh" },
                  className:
                    "relative flex flex-col w-full max-w-[560px] rounded-2xl bg-gradient-to-b from-[#141b25] to-[#070b12] border border-[#d6b05e]/50 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(214,176,94,0.15)] overflow-hidden text-[#efe4cd]",
                  children: [
                    (0, a.jsx)("div", {
                      className:
                        "h-1 w-full shrink-0 bg-gradient-to-r from-transparent via-[#d6b05e] to-transparent",
                    }),
                    (0, a.jsx)("button", {
                      type: "button",
                      onClick: k,
                      "aria-label": "Close important notice",
                      className:
                        "absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#0a0e16]/80 border border-[#d6b05e]/40 hover:border-[#d6b05e] hover:bg-[#d6b05e]/20 text-[#efe4cd] flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d6b05e]",
                      children: (0, a.jsx)(c.A, {
                        className: "w-4 h-4",
                        strokeWidth: 2.2,
                      }),
                    }),
                    (0, a.jsxs)("div", {
                      className:
                        "flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "text-center space-y-1.5 px-8",
                          children: [
                            (0, a.jsx)("span", {
                              className:
                                "inline-block px-2.5 py-0.5 rounded-full bg-[#d6b05e]/15 border border-[#d6b05e]/40 text-[10px] font-mono tracking-widest text-[#e8c66a] uppercase font-bold",
                              children: "重要なお知らせ \xb7 Official Advisory",
                            }),
                            (0, a.jsx)("h2", {
                              id: "important-notice-title",
                              className:
                                "font-serif text-xl sm:text-2xl font-black tracking-wide uppercase text-[#fcd34d]",
                              children: "Important Notice",
                            }),
                            (0, a.jsx)("p", {
                              id: "important-notice-desc",
                              className:
                                "hidden sm:block text-xs text-[#9cb0a8] leading-relaxed",
                              children:
                                "Mandatory guidelines for all attendees, participants and prize winners visiting Punjab Engineering College (PEC).",
                            }),
                          ],
                        }),
                        (0, a.jsx)("div", {
                          className:
                            "rounded-xl p-3 sm:p-4 bg-[#15131e]/90 border border-[#f43f5e]/35",
                          children: (0, a.jsxs)("div", {
                            className: "flex items-start gap-3",
                            children: [
                              (0, a.jsx)("div", {
                                className:
                                  "w-9 h-9 rounded-lg bg-[#f43f5e]/15 border border-[#f43f5e]/40 flex items-center justify-center text-[#ff6b8b] shrink-0",
                                children: (0, a.jsx)(d.A, {
                                  className: "w-5 h-5",
                                }),
                              }),
                              (0, a.jsxs)("div", {
                                className: "flex-1 min-w-0 space-y-1",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className:
                                      "flex flex-wrap items-center gap-x-2 gap-y-1",
                                    children: [
                                      (0, a.jsx)("h3", {
                                        className:
                                          "font-serif text-sm sm:text-base font-bold text-[#efe4cd]",
                                        children: "1. Photo ID Verification",
                                      }),
                                      (0, a.jsx)("span", {
                                        className:
                                          "px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-[#f43f5e]/20 text-[#ff8da6] border border-[#f43f5e]/30",
                                        children: "Required for entry",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)("p", {
                                    className:
                                      "text-xs sm:text-[13px] text-[#cbd5e1] leading-relaxed",
                                    children: [
                                      "Carry a valid original Government Photo ID (",
                                      (0, a.jsx)("strong", {
                                        className:
                                          "text-[#fcd34d] font-semibold",
                                        children: "Aadhaar Card",
                                      }),
                                      ", Voter ID, Driving License or Passport) along with your",
                                      " ",
                                      (0, a.jsx)("strong", {
                                        className:
                                          "text-[#efe4cd] font-semibold",
                                        children: "College ID Card",
                                      }),
                                      " when visiting campus.",
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        (0, a.jsx)("div", {
                          className:
                            "rounded-xl p-3 sm:p-4 bg-[#121921]/90 border border-[#d6b05e]/35",
                          children: (0, a.jsxs)("div", {
                            className: "flex items-start gap-3",
                            children: [
                              (0, a.jsx)("div", {
                                className:
                                  "w-9 h-9 rounded-lg bg-[#d6b05e]/15 border border-[#d6b05e]/40 flex items-center justify-center text-[#e8c66a] shrink-0",
                                children: (0, a.jsx)(u.A, {
                                  className: "w-5 h-5",
                                }),
                              }),
                              (0, a.jsxs)("div", {
                                className: "flex-1 min-w-0 space-y-1",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className:
                                      "flex flex-wrap items-center gap-x-2 gap-y-1",
                                    children: [
                                      (0, a.jsx)("h3", {
                                        className:
                                          "font-serif text-sm sm:text-base font-bold text-[#efe4cd]",
                                        children: "2. Update Bank Details",
                                      }),
                                      (0, a.jsx)("span", {
                                        className:
                                          "px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-[#d6b05e]/20 text-[#e8c66a] border border-[#d6b05e]/30",
                                        children: "Prize transfers",
                                      }),
                                    ],
                                  }),
                                  (0, a.jsxs)("p", {
                                    className:
                                      "text-xs sm:text-[13px] text-[#cbd5e1] leading-relaxed",
                                    children: [
                                      "For instant, direct prize money transfers, all team leaders must add their bank account details in the",
                                      " ",
                                      (0, a.jsx)("strong", {
                                        className:
                                          "text-[#fcd34d] font-semibold",
                                        children: "Profile",
                                      }),
                                      " section.",
                                    ],
                                  }),
                                  "/profile" !== e &&
                                    (0, a.jsxs)(i(), {
                                      href: "/profile",
                                      onClick: k,
                                      className:
                                        "group inline-flex items-center gap-1 text-xs font-serif font-bold text-[#e8c66a] hover:text-white transition-colors",
                                      children: [
                                        (0, a.jsx)("span", {
                                          children: "Go to Profile",
                                        }),
                                        (0, a.jsx)(m.A, {
                                          className:
                                            "w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform",
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, a.jsxs)("div", {
                      className:
                        "shrink-0 px-4 sm:px-6 py-3 border-t border-[#d6b05e]/25 bg-[#070b12]/80 flex flex-row items-center justify-between gap-3",
                      children: [
                        (0, a.jsxs)("label", {
                          className:
                            "flex items-center gap-2 cursor-pointer select-none group",
                          children: [
                            (0, a.jsx)("input", {
                              type: "checkbox",
                              id: "dont-show-notice-again",
                              checked: w,
                              onChange: (e) => {
                                var t;
                                (j((t = e.target.checked)),
                                  t
                                    ? v()
                                    : (function () {
                                        g(!1);
                                        try {
                                          let e = localStorage.getItem(f);
                                          if (!e) return;
                                          let t = JSON.parse(e);
                                          x(t) &&
                                            b({ ...t, neverShowAgain: !1 });
                                        } catch {}
                                      })());
                              },
                              className:
                                "w-4 h-4 rounded cursor-pointer accent-[#c99a3a]",
                            }),
                            (0, a.jsx)("span", {
                              className:
                                "text-xs sm:text-sm text-[#cbd5e1] group-hover:text-white transition-colors",
                              children: "Don't show again",
                            }),
                          ],
                        }),
                        (0, a.jsxs)("button", {
                          ref: N,
                          type: "button",
                          onClick: k,
                          className:
                            "inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#d6b05e] via-[#e8c66a] to-[#c99a3a] text-[#090d15] font-serif font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_14px_rgba(201,154,58,0.3)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#fcd34d] focus:ring-offset-2 focus:ring-offset-[#070b12]",
                          children: [
                            (0, a.jsx)(p.A, { className: "w-4 h-4" }),
                            (0, a.jsx)("span", { children: "I Understand" }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              document.body,
            )
          : null;
      }
    },
  },
  (e) => {
    (e.O(
      0,
      [1229, 3334, 5256, 5592, 8500, 4987, 5911, 7418, 8441, 3794, 7358],
      () => e((e.s = 26579)),
    ),
      (_N_E = e.O()));
  },
]);
