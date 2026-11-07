"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4388],
  {
    24800: (e, a, l) => {
      l.d(a, { JB: () => i, Z5: () => s, s_: () => r, w: () => d });
      let n = { enabled: !0, status: "waiting" },
        o = n,
        t = new Set(),
        r = () => o,
        s = () => n;
      function i(e, a) {
        (o.enabled !== e || o.status !== a) &&
          ((o = { enabled: e, status: a }), t.forEach((e) => e()));
      }
      function d(e) {
        return (
          t.add(e),
          () => {
            t.delete(e);
          }
        );
      }
    },
    52228: (e, a, l) => {
      l.d(a, { sU: () => o, Qc: () => t, gJ: () => r });
      let n = JSON.parse(
        '{"/models/CHerry_blossom_draco.glb":"https://res.cloudinary.com/xcjt6dhx/image/upload/v1791703997/cherry_blossom_draco_2_-compressed.glb","/models/Cedar_tree.glb":"https://res.cloudinary.com/xcjt6dhx/image/upload/v1791705151/cedar_tree_1_-compressed.glb","/textures/forest_env.hdr":"https://res.cloudinary.com/xcjt6dhx/raw/upload/v1790763988/forest_env_1024.hdr","/textures/cedar_billboard.png":"https://res.cloudinary.com/xcjt6dhx/image/upload/v1790764046/cedar_billboard.png","/textures/cedar_leaf_rgba.png":"https://res.cloudinary.com/xcjt6dhx/image/upload/v1790764068/cedar_leaf_rgba.png","/pecfest-logo-display.webp":"https://res.cloudinary.com/xcjt6dhx/image/upload/v1790763641/pecfest2026/branding/pecfest_logo_display.webp","/audio/ambience.mp3":"https://res.cloudinary.com/xcjt6dhx/video/upload/v1790764076/ambience_loop.mp3"}',
      );
      function o(e) {
        return n[e] ? n[e] : e;
      }
      function t(e) {
        let a = o(e);
        return a.includes("res.cloudinary.com") &&
          a.includes("/image/upload/") &&
          !a.includes("f_auto")
          ? a.replace("/image/upload/", "/image/upload/f_auto,q_auto/")
          : a;
      }
      function r(e, a) {
        return a
          .map(
            (a) =>
              `${(function (e, a, l = {}) {
                let n = o(e);
                if (
                  !n.includes("res.cloudinary.com") ||
                  !n.includes("/image/upload/")
                )
                  return n;
                let t = l.quality ?? "auto",
                  r = l.dpr ?? "auto",
                  s = `f_auto,q_${t},w_${Math.max(1, Math.round(a))},dpr_${r}`,
                  i = "/image/upload/",
                  d = n.indexOf(i),
                  c = n.slice(d + i.length);
                return /^(?:f_|q_|w_|dpr_|c_|ar_)/.test(c)
                  ? n.replace(i, `${i}${s},`)
                  : n.replace(i, `${i}${s}/`);
              })(e, a)} ${a}w`,
          )
          .join(", ");
      }
    },
    57295: (e, a, l) => {
      l.d(a, { y: () => s });
      var n = l(95155),
        o = l(12115),
        t = l(24800),
        r = l(95295);
      function s({ className: e = "" }) {
        let { enabled: a, status: l } = (0, o.useSyncExternalStore)(
          t.w,
          t.s_,
          t.Z5,
        );
        return (0, n.jsxs)("div", {
          className: "sound-control",
          children: [
            (0, n.jsxs)("button", {
              type: "button",
              className: `sound-seal ${"playing" === l ? "is-playing" : ""} ${e}`,
              "aria-pressed": a,
              "aria-label":
                "loading" === l
                  ? "Cancel sound loading"
                  : a
                    ? "Mute sound"
                    : "Enable sound",
              "aria-busy": "loading" === l,
              onClick: () => (0, r.RJ)(!(0, t.s_)().enabled),
              children: [
                (0, n.jsxs)("span", {
                  className: "sound-bars",
                  "aria-hidden": "true",
                  children: [
                    (0, n.jsx)("i", {}),
                    (0, n.jsx)("i", {}),
                    (0, n.jsx)("i", {}),
                    (0, n.jsx)("i", {}),
                  ],
                }),
                (0, n.jsx)("span", {
                  children:
                    "loading" === l
                      ? "LOADING SOUND"
                      : `SOUND ${a ? "ON" : "OFF"}`,
                }),
              ],
            }),
            "error" === l &&
              (0, n.jsx)("p", {
                className: "audio-error",
                role: "status",
                children: "Sound could not start. Tap to retry.",
              }),
          ],
        });
      }
    },
    77976: (e, a, l) => {
      l.d(a, { i3: () => o });
      var n = l(95155);
      function o({ diagonal: e = !1 }) {
        return (0, n.jsx)("svg", {
          viewBox: "0 0 24 24",
          fill: "none",
          "aria-hidden": "true",
          children: (0, n.jsx)("path", {
            d: e ? "M5 19 19 5M5 5h14v14" : "M3 12h17m-6-6 6 6-6 6",
            stroke: "currentColor",
            strokeWidth: "1.3",
          }),
        });
      }
      l(12115);
    },
    94388: (e, a, l) => {
      l.d(a, { FestivalNavbar: () => u });
      var n = l(95155),
        o = l(12115),
        t = l(98500),
        r = l.n(t),
        s = l(73321),
        i = l(77976),
        d = l(57295);
      let c = [
        { href: "/events", label: "Events" },
        { href: "/calendar", label: "Schedule" },
        { href: "/sponsors", label: "Sponsors" },
        { href: "/committees/map", label: "Committee" },
        { href: "/developer", label: "Developers" },
        { href: "/gallery", label: "Gallery" },
        { href: "/contact", label: "Contact" },
        { href: "/about", label: "About" },
      ];
      function u() {
        let e = (0, s.usePathname)(),
          [a, l] = (0, o.useState)(!1),
          [t, u] = (0, o.useState)(!1);
        return (
          (0, o.useEffect)(() => {
            let e = () => {
              u(!!localStorage.getItem("token"));
            };
            return (
              e(),
              window.addEventListener("tokenChanged", e),
              window.addEventListener("storage", e),
              () => {
                (window.removeEventListener("tokenChanged", e),
                  window.removeEventListener("storage", e));
              }
            );
          }, []),
          (0, n.jsxs)("header", {
            className: "site-header festival-page-navbar",
            children: [
              (0, n.jsxs)(r(), {
                className: "brand",
                href: "/",
                "aria-label": "PECFEST 2026, back to Sanctuary",
                children: [
                  (0, n.jsx)("img", {
                    className: "official-logo",
                    src: "/pecfest-logo-nav.webp",
                    alt: "PECFEST 2026",
                    width: 34,
                    height: 34,
                  }),
                  (0, n.jsxs)("span", {
                    children: [
                      "PECFEST",
                      (0, n.jsx)("small", {
                        children: "2026 \xb7 A MYSTIC MIKADO",
                      }),
                    ],
                  }),
                ],
              }),
              (0, n.jsx)("nav", {
                className: "desktop-nav",
                "aria-label": "Main navigation",
                children: c.map((a) => {
                  let l = e === a.href;
                  return (0, n.jsx)(
                    r(),
                    {
                      href: a.href,
                      className: l ? "is-active" : "",
                      style: l
                        ? { color: "#f5d78e", borderColor: "#c99a3a" }
                        : void 0,
                      children: a.label,
                    },
                    a.href,
                  );
                }),
              }),
              (0, n.jsxs)("div", {
                className: "header-actions",
                style: { display: "flex", alignItems: "center", gap: "14px" },
                children: [
                  (0, n.jsx)(d.y, { className: "navbar-sound-btn" }),
                  (0, n.jsx)(r(), {
                    href: "/",
                    className: "button",
                    style: {
                      minHeight: "40px",
                      padding: "8px 16px",
                      fontSize: "9px",
                      gap: "8px",
                      borderColor: "rgba(212, 175, 100, 0.4)",
                      color: "#dfceb1",
                    },
                    "aria-label": "Return to 3D Sanctuary",
                    children: (0, n.jsx)("span", { children: "⛩ Sanctuary" }),
                  }),
                  (0, n.jsxs)(r(), {
                    href: t ? "/profile" : "/login",
                    className: "button button-gold",
                    style: {
                      minHeight: "40px",
                      padding: "8px 20px",
                      fontSize: "9px",
                      gap: "8px",
                      fontWeight: 600,
                    },
                    "aria-label": t
                      ? "Go to your Dashboard"
                      : "Log in to PECFEST",
                    children: [
                      (0, n.jsx)("span", {
                        children: t ? "Dashboard" : "Log In",
                      }),
                      " ",
                      (0, n.jsx)(i.i3, { diagonal: !0 }),
                    ],
                  }),
                ],
              }),
              (0, n.jsx)("button", {
                className: "menu-toggle",
                "aria-label": a ? "Close navigation" : "Open navigation",
                "aria-expanded": a,
                "aria-controls": "mobile-nav",
                onClick: () => l((e) => !e),
                children: a ? "Close −" : "Menu +",
              }),
              a
                ? (0, n.jsxs)("nav", {
                    className: "mobile-nav",
                    id: "mobile-nav",
                    "aria-label": "Mobile navigation",
                    style: { display: "flex" },
                    children: [
                      (0, n.jsx)("div", {
                        className: "mobile-nav-sound",
                        children: (0, n.jsx)(d.y, {
                          className: "navbar-sound-btn",
                        }),
                      }),
                      c.map((e, a) =>
                        (0, n.jsxs)(
                          r(),
                          {
                            href: e.href,
                            onClick: () => l(!1),
                            children: [
                              (0, n.jsxs)("span", { children: ["0", a + 1] }),
                              e.label,
                              (0, n.jsx)(i.i3, { diagonal: !0 }),
                            ],
                          },
                          e.href,
                        ),
                      ),
                      (0, n.jsxs)(r(), {
                        href: "/",
                        onClick: () => l(!1),
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: "11px 0",
                          color: "#d4a964",
                          borderBottom: "1px solid rgba(201, 154, 58, 0.2)",
                        },
                        children: [
                          (0, n.jsx)("span", { children: "⛩" }),
                          " Return to Sanctuary",
                        ],
                      }),
                      (0, n.jsxs)(r(), {
                        href: t ? "/profile" : "/login",
                        className: "button button-gold",
                        onClick: () => l(!1),
                        style: { marginTop: "18px" },
                        children: [
                          t ? "Dashboard" : "Log In",
                          " ",
                          (0, n.jsx)(i.i3, { diagonal: !0 }),
                        ],
                      }),
                    ],
                  })
                : null,
            ],
          })
        );
      }
    },
    95295: (e, a, l) => {
      let n;
      l.d(a, {
        L3: () => y,
        RJ: () => f,
        gb: () => g,
        kI: () => v,
        q3: () => b,
      });
      var o = l(14987),
        t = l(52228),
        r = l(24800);
      let s = null,
        i = null,
        d = !1,
        c = !1,
        u = !1,
        p = 0;
      function h() {
        if (!(!d || c || u || s?.state() !== "loaded" || s.playing())) {
          if (o.Howler.ctx && "running" !== o.Howler.ctx.state)
            return void (0, r.JB)(!0, "waiting");
          ((u = !0), s.play());
        }
      }
      function g() {
        if (!d || c) return;
        if (!o.Howler.ctx || "running" === o.Howler.ctx.state) return void h();
        let e = p;
        (o.Howler.ctx
          ?.resume()
          .then(() => {
            e === p && h();
          })
          .catch(() => {
            d && e === p && (0, r.JB)(!0, "waiting");
          }),
          h());
      }
      function m() {
        (s?.state() === "loaded" && s.pause(),
          i?.state() === "loaded" && i.stop(),
          (u = !1));
      }
      function x() {
        (clearTimeout(n),
          (p += 1),
          s?.unload(),
          i?.unload(),
          (s = null),
          (i = null),
          (u = !1));
      }
      function f(e) {
        if (((d = e), (c = document.hidden), !e)) {
          (clearTimeout(n), m(), (0, r.JB)(!1, "off"));
          return;
        }
        if (((0, r.JB)(!0, s?.playing() ? "playing" : "loading"), !s)) {
          let e = ++p,
            a = () => {
              if (e !== p) return;
              let a = d;
              ((d = !1), x(), a && (0, r.JB)(!1, "error"));
            };
          ((s = new o.Howl({
            src: [(0, t.sU)("/audio/ambience.mp3")],
            loop: !0,
            volume: 0.28,
            preload: !1,
            onload: () => {
              e === p && (clearTimeout(n), h());
            },
            onplay: () => {
              e === p &&
                ((u = !1),
                !d || c ? m() : (clearTimeout(n), (0, r.JB)(!0, "playing")));
            },
            onloaderror: a,
            onplayerror: () => {
              e === p &&
                ((u = !1),
                o.Howler.ctx?.state === "suspended"
                  ? (d && (0, r.JB)(!0, "waiting"), s?.once("unlock", h))
                  : a());
            },
          })),
            (i = new o.Howl({
              src: ["/audio/cues.mp3"],
              volume: 0.34,
              preload: !1,
              sprite: {
                clack: [0, 300],
                slash: [500, 650],
                taiko: [1400, 1400],
              },
              onplay: () => {
                e === p && (!d || c) && i?.stop();
              },
              onloaderror: () =>
                console.warn("Festival interaction sounds are unavailable."),
            })));
        }
        let a = p;
        (clearTimeout(n),
          (n = setTimeout(() => {
            d &&
              a === p &&
              s?.state() !== "loaded" &&
              ((d = !1), x(), (0, r.JB)(!1, "error"));
          }, 15e3)),
          "unloaded" === s.state() && s.load(),
          i?.state() === "unloaded" && i.load(),
          g());
      }
      function b(e) {
        d && !c && i?.state() === "loaded" && i.play(e);
      }
      function v(e) {
        (c = e) ? m() : g();
      }
      function y() {
        let e = (0, r.s_)().enabled;
        ((d = !1), (c = !1), x(), (0, r.JB)(e, e ? "waiting" : "off"));
      }
    },
  },
]);
