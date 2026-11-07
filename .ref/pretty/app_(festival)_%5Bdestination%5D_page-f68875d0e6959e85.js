(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [1621],
  {
    1315: (e, t, s) => {
      "use strict";
      s.d(t, { AboutDestination: () => u });
      var a = s(95155),
        n = s(12115),
        r = s(98500),
        l = s.n(r),
        i = s(45911),
        o = s(63018),
        c = s(77976);
      (s(49733), i.Ay.registerPlugin(o.u));
      let d = "dhzCjRJDJYE",
        h = [
          { value: 105, prefix: "", suffix: "+", label: "Years of heritage" },
          { value: 5e4, prefix: "", suffix: "+", label: "Footfall" },
          { value: 100, prefix: "", suffix: "+", label: "Events" },
          { value: 15, prefix: "₹", suffix: "L+", label: "In prizes" },
        ],
        p = (e) => Math.round(e).toLocaleString("en-IN");
      function u() {
        let e = (0, n.useRef)(null),
          t = (0, n.useRef)(null),
          [s, r] = (0, n.useState)(!1);
        return (
          (0, n.useEffect)(() => {
            let e = t.current;
            if (!e) return;
            let s = new IntersectionObserver(
              ([e]) => {
                e.isIntersecting && (r(!0), s.disconnect());
              },
              { rootMargin: "300px 0px" },
            );
            return (s.observe(e), () => s.disconnect());
          }, []),
          (0, n.useEffect)(() => {
            let t = e.current;
            if (!t) return;
            let s = t.closest(".fullscreen-page-scroll") ?? void 0,
              a = i.Ay.matchMedia();
            return (
              a.add(
                "(prefers-reduced-motion: no-preference)",
                () => {
                  (i.Ay.timeline({
                    scrollTrigger: {
                      trigger: ".ab-reveal",
                      scroller: s,
                      start: "top 95%",
                      end: "top 20%",
                      scrub: 0.6,
                    },
                  })
                    .fromTo(
                      ".ab-video",
                      { autoAlpha: 0, scale: 0.86, y: 40 },
                      { autoAlpha: 1, scale: 1, y: 0, ease: "none" },
                    )
                    .fromTo(
                      ".ab-stat",
                      { autoAlpha: 0, y: 24 },
                      { autoAlpha: 1, y: 0, ease: "none", stagger: 0.12 },
                      0.35,
                    ),
                    i.Ay.to(".ab-hero-inner", {
                      autoAlpha: 0.2,
                      y: -40,
                      ease: "none",
                      scrollTrigger: {
                        trigger: ".ab-hero",
                        scroller: s,
                        start: "top top",
                        end: "bottom top",
                        scrub: !0,
                      },
                    }),
                    i.Ay.utils
                      .toArray(t.querySelectorAll("[data-count]"))
                      .forEach((e) => {
                        let t = { n: 0 };
                        ((e.textContent = p(0)),
                          i.Ay.to(t, {
                            n: Number(e.dataset.count),
                            duration: 1.6,
                            ease: "power2.out",
                            scrollTrigger: {
                              trigger: ".ab-stats",
                              scroller: s,
                              start: "top 78%",
                              once: !0,
                            },
                            onUpdate: () => {
                              e.textContent = p(t.n);
                            },
                          }));
                      }));
                },
                t,
              ),
              () => a.revert()
            );
          }, []),
          (0, a.jsxs)("div", {
            className: "ab",
            ref: e,
            children: [
              (0, a.jsx)("header", {
                className: "ab-hero",
                children: (0, a.jsxs)("div", {
                  className: "ab-wrap ab-hero-inner",
                  children: [
                    (0, a.jsx)("img", {
                      className: "ab-logo",
                      src: "/pecfest-logo-display.webp",
                      alt: "PECFEST logo",
                      width: 400,
                      height: 348,
                      decoding: "async",
                      fetchPriority: "high",
                    }),
                    (0, a.jsx)("span", {
                      className: "ab-eyebrow",
                      children: "Punjab Engineering College \xb7 Chandigarh",
                    }),
                    (0, a.jsxs)("h1", {
                      className: "ab-title",
                      children: [
                        (0, a.jsx)("span", {
                          className: "ab-line",
                          children: (0, a.jsx)("span", { children: "PECFEST" }),
                        }),
                        (0, a.jsx)("span", {
                          className: "ab-line",
                          children: (0, a.jsx)("span", {
                            className: "ab-gold",
                            children: "2026",
                          }),
                        }),
                      ],
                    }),
                    (0, a.jsx)("p", {
                      className: "ab-lead",
                      children:
                        "The annual techno-cultural festival: three days of technology, culture and performance, with students from over 100 institutes.",
                    }),
                  ],
                }),
              }),
              (0, a.jsx)("section", {
                className: "ab-reveal",
                "aria-label": "Theme reveal",
                children: (0, a.jsxs)("div", {
                  className: "ab-wrap",
                  children: [
                    (0, a.jsx)("div", {
                      className: "ab-video",
                      ref: t,
                      children:
                        s &&
                        (0, a.jsx)("iframe", {
                          src: `https://www.youtube-nocookie.com/embed/${d}?autoplay=1&mute=1&loop=1&playlist=${d}&rel=0&modestbranding=1&playsinline=1`,
                          title: "PECFEST 2026 theme reveal",
                          allow:
                            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                          allowFullScreen: !0,
                        }),
                    }),
                    (0, a.jsx)("div", {
                      className: "ab-stats",
                      children: h.map((e) =>
                        (0, a.jsxs)(
                          "div",
                          {
                            className: "ab-stat",
                            children: [
                              (0, a.jsxs)("strong", {
                                children: [
                                  e.prefix,
                                  (0, a.jsx)("span", {
                                    "data-count": e.value,
                                    children: p(e.value),
                                  }),
                                  e.suffix,
                                ],
                              }),
                              (0, a.jsx)("span", { children: e.label }),
                            ],
                          },
                          e.label,
                        ),
                      ),
                    }),
                    (0, a.jsx)("div", {
                      className: "ab-explore",
                      children: (0, a.jsxs)(l(), {
                        className: "button button-gold",
                        href: "/events",
                        children: [
                          "Explore events ",
                          (0, a.jsx)(c.i3, { diagonal: !0 }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            ],
          })
        );
      }
    },
    14163: () => {},
    25007: () => {},
    25222: (e, t, s) => {
      "use strict";
      s.d(t, { CommitteeChronicle: () => u });
      var a = s(95155),
        n = s(12115),
        r = s(98500),
        l = s.n(r),
        i = s(24413),
        o = s(9751),
        c = s(78780),
        d = s(76721),
        h = s(35581);
      function p() {
        let e = (0, n.useRef)(null);
        return (
          (0, n.useEffect)(() => {
            let t,
              s = e.current;
            if (!s) return;
            let a = s.getContext("2d");
            if (!a) return;
            let n = (s.width = window.innerWidth),
              r = (s.height = window.innerHeight),
              l = () => {
                s &&
                  ((n = s.width = window.innerWidth),
                  (r = s.height = window.innerHeight));
              };
            window.addEventListener("resize", l);
            let i = Array.from({
                length: Math.min(window.innerWidth < 768 ? 20 : 40, 45),
              }).map(() => ({
                x: Math.random() * n,
                y: Math.random() * r,
                size: 2.5 * Math.random() + 0.8,
                speedX: (Math.random() - 0.5) * 0.45,
                speedY: -(0.65 * Math.random()) - 0.2,
                opacity: 0.55 * Math.random() + 0.15,
                color:
                  Math.random() > 0.65
                    ? "rgba(232, 198, 106, "
                    : "rgba(167, 13, 22, ",
              })),
              o = () => {
                a.clearRect(0, 0, n, r);
                for (let e = 0; e < i.length; e++) {
                  let t = i[e];
                  ((t.x += t.speedX),
                    (t.y += t.speedY),
                    t.y < -10 && (t.y = r + 10),
                    t.x < -10 && (t.x = n + 10),
                    t.x > n + 10 && (t.x = -10),
                    a.beginPath(),
                    a.arc(t.x, t.y, t.size, 0, 2 * Math.PI),
                    (a.fillStyle = `${t.color}${t.opacity})`),
                    (a.shadowBlur = 8),
                    (a.shadowColor =
                      "rgba(232, 198, 106, " === t.color
                        ? "#c99a3a"
                        : "#d81e28"),
                    a.fill());
                }
                t = requestAnimationFrame(o);
              };
            return (
              o(),
              () => {
                (window.removeEventListener("resize", l),
                  cancelAnimationFrame(t));
              }
            );
          }, []),
          (0, a.jsx)("canvas", {
            ref: e,
            className: "comm-particles-canvas",
            "aria-hidden": "true",
          })
        );
      }
      function u() {
        let [e, t] = (0, n.useState)("convener"),
          [s, r] = (0, n.useState)(null);
        (0, n.useEffect)(() => {
          let e = () => {
              let e = window.location.hash.replace("#", "");
              if (e) {
                let s = document.getElementById(e);
                s &&
                  (t(e),
                  r(e),
                  s.scrollIntoView({ behavior: "smooth", block: "start" }),
                  setTimeout(() => {
                    r(null);
                  }, 3e3));
              }
            },
            s = setTimeout(e, 100);
          return (
            window.addEventListener("hashchange", e),
            () => {
              (clearTimeout(s), window.removeEventListener("hashchange", e));
            }
          );
        }, []);
        let u = (0, n.useRef)(null),
          m = (e) => {
            u.current &&
              u.current.scrollBy({
                left: "left" === e ? -280 : 280,
                behavior: "smooth",
              });
          };
        return (0, a.jsxs)("div", {
          className: "committee-root",
          children: [
            (0, a.jsx)("div", {
              className: "comm-ambience",
              "aria-hidden": "true",
              children: (0, a.jsx)("div", { className: "comm-ink-wash" }),
            }),
            (0, a.jsx)(p, {}),
            (0, a.jsxs)("div", {
              className: "comm-container",
              children: [
                (0, a.jsxs)("header", {
                  className: "comm-hero",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "comm-badge",
                      children: [
                        (0, a.jsx)("span", { className: "comm-badge-dot" }),
                        (0, a.jsx)("span", {
                          className: "comm-badge-text",
                          children: "PECFEST 2026 ORGANIZING COMMITTEES",
                        }),
                      ],
                    }),
                    (0, a.jsxs)("h1", {
                      className: "comm-main-title",
                      children: [
                        "Festival ",
                        (0, a.jsx)("span", {
                          className: "comm-gold-text",
                          children: "Committees",
                        }),
                      ],
                    }),
                    (0, a.jsx)("p", {
                      className: "comm-subtitle",
                      children:
                        "Meet the faculty convenors, student secretaries, and organizing teams driving PECFEST 2026.",
                    }),
                  ],
                }),
                (0, a.jsxs)("div", {
                  className: "comm-map-callout",
                  children: [
                    (0, a.jsxs)("div", {
                      className: "comm-map-callout-left",
                      children: [
                        (0, a.jsx)("div", {
                          className: "comm-map-callout-icon",
                          children: (0, a.jsx)(i.A, { className: "w-5 h-5" }),
                        }),
                        (0, a.jsxs)("div", {
                          className: "comm-map-callout-text",
                          children: [
                            (0, a.jsx)("h4", {
                              children: "Explore The Illustrated Sanctuary Map",
                            }),
                            (0, a.jsx)("p", {
                              children:
                                "Experience the illuminated Japanese village and discover all committee landmarks.",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, a.jsxs)(l(), {
                      href: "/committees/map",
                      className: "comm-map-callout-btn",
                      children: [
                        (0, a.jsx)("span", { children: "Open Map Experience" }),
                        (0, a.jsx)(o.A, { className: "w-3.5 h-3.5" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, a.jsx)("nav", {
              className: "comm-sticky-nav-wrap",
              "aria-label": "Committees Navigation",
              children: (0, a.jsxs)("div", {
                className: "comm-sticky-nav-container",
                children: [
                  (0, a.jsx)("button", {
                    type: "button",
                    onClick: () => m("left"),
                    className: "comm-nav-arrow-btn comm-nav-arrow-left",
                    "aria-label": "Scroll committees left",
                    children: (0, a.jsx)(c.A, { className: "w-4 h-4" }),
                  }),
                  (0, a.jsx)("div", {
                    ref: u,
                    className: "comm-sticky-nav-scroll",
                    children: h.CT.map((s) => {
                      let n = e === s.id;
                      return (0, a.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            var e;
                            let a;
                            return (
                              t((e = s.id)),
                              void (
                                (a = document.getElementById(e)) &&
                                (a.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                }),
                                window.history.replaceState(null, "", `#${e}`))
                              )
                            );
                          },
                          className: `comm-nav-tab ${n ? "is-active" : ""}`,
                          "aria-pressed": n,
                          children: (0, a.jsx)("span", { children: s.title }),
                        },
                        s.id,
                      );
                    }),
                  }),
                  (0, a.jsx)("button", {
                    type: "button",
                    onClick: () => m("right"),
                    className: "comm-nav-arrow-btn comm-nav-arrow-right",
                    "aria-label": "Scroll committees right",
                    children: (0, a.jsx)(d.A, { className: "w-4 h-4" }),
                  }),
                ],
              }),
            }),
            (0, a.jsx)("main", {
              className: "comm-container",
              id: "directory-content",
              children: h.CT.map((e) => {
                let t = h.Pd.filter((t) => t.committeeId === e.id),
                  n = s === e.id;
                return (0, a.jsxs)(
                  "section",
                  {
                    id: e.id,
                    className: `comm-section ${n ? "is-highlighted" : ""}`,
                    "aria-labelledby": `heading-${e.id}`,
                    children: [
                      (0, a.jsxs)("div", {
                        className: "comm-section-header",
                        children: [
                          (0, a.jsx)("div", {
                            className: "comm-section-title-wrap",
                            children: (0, a.jsxs)("div", {
                              children: [
                                (0, a.jsx)("span", {
                                  className: "comm-section-eyebrow",
                                  children: e.tag,
                                }),
                                (0, a.jsx)("h2", {
                                  id: `heading-${e.id}`,
                                  className: "comm-section-h2",
                                  children: e.title,
                                }),
                              ],
                            }),
                          }),
                          (0, a.jsx)("div", {
                            className: "comm-section-meta",
                            children: (0, a.jsx)("p", {
                              className: "m-0 text-xs text-[#efe4cd]/60",
                              children: e.subtitle,
                            }),
                          }),
                        ],
                      }),
                      (0, a.jsx)("div", {
                        className: "comm-members-grid",
                        children: t.map((e) =>
                          (0, a.jsxs)(
                            "article",
                            {
                              className: "comm-card-simple",
                              children: [
                                (0, a.jsxs)("div", {
                                  className: "comm-card-photo-box",
                                  children: [
                                    e.portrait
                                      ? (0, a.jsx)("img", {
                                          src: e.portrait,
                                          alt: e.name,
                                          className: "comm-card-photo-img",
                                          loading: "lazy",
                                        })
                                      : (0, a.jsx)("div", {
                                          className: "comm-card-photo-avatar",
                                          children: (0, a.jsx)("div", {
                                            className:
                                              "comm-card-photo-avatar-ring",
                                            children: (0, a.jsx)("span", {
                                              className:
                                                "comm-card-photo-monogram",
                                              children: e.name
                                                .split(" ")
                                                .map((e) => e[0])
                                                .join("")
                                                .slice(0, 2),
                                            }),
                                          }),
                                        }),
                                    (0, a.jsx)("div", {
                                      className: "comm-card-photo-scrim",
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)("div", {
                                  className: "comm-card-simple-identity",
                                  children: [
                                    (0, a.jsx)("h3", {
                                      className: "comm-card-simple-name",
                                      children: e.name,
                                    }),
                                    (0, a.jsx)("span", {
                                      className: "comm-card-simple-role",
                                      children: e.role,
                                    }),
                                  ],
                                }),
                              ],
                            },
                            e.id,
                          ),
                        ),
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
      s(25007);
    },
    30188: (e, t, s) => {
      "use strict";
      s.d(t, { F: () => n, r: () => a });
      let a = [
          {
            id: "star-night",
            title: "The Starry Night Mirage",
            category: "Matsuri Concerts",
            edition: "2025",
            description:
              "Over 15,000 students united under the amphitheatre spotlight.",
          },
          {
            id: "bhangra-beat",
            title: "Virasat: Folk Majesty",
            category: "Cultural Showcase",
            edition: "2025",
            description:
              "Thunderous Dhol beats echoing across the centenary campus.",
          },
          {
            id: "robowars",
            title: "Steel & Spark Arena",
            category: "Technical Battles",
            edition: "2025",
            description:
              "Heavyweight combat bots clashing in the subterranean arena.",
          },
          {
            id: "rangmanch",
            title: "Rangmanch: Street Odyssey",
            category: "Dramatic Arts",
            edition: "2025",
            description:
              "Potent theatrical performances stirring minds and hearts.",
          },
          {
            id: "glitz",
            title: "Haute Couture Runway",
            category: "Fashion & Style",
            edition: "2025",
            description:
              "Avant-garde styling fusing traditional heritage with high fashion.",
          },
          {
            id: "drone-show",
            title: "Constellations of Mikado",
            category: "Visual Spectacle",
            edition: "2026 Preview",
            description:
              "Synchronized light arrays illuminating the night sky.",
          },
        ],
        n = {
          address:
            "Punjab Engineering College (Deemed to be University), Sector 12, Chandigarh, 160012",
          email: "marketing.pecfest@pec.edu.in",
          instagram: "@pec.pecfest",
          instagramUrl: "https://www.instagram.com/pec.pecfest/",
          mapsUrl: "https://maps.app.goo.gl/wgYE4wBdCbNSV6gd9",
          emergencyDesk: "+91 (0172) 275-3051",
          helpline: "+91 (0172) 275-3055",
        };
    },
    34053: (e, t, s) => {
      (Promise.resolve().then(s.t.bind(s, 98500, 23)),
        Promise.resolve().then(s.bind(s, 1315)),
        Promise.resolve().then(s.bind(s, 91850)),
        Promise.resolve().then(s.bind(s, 25222)),
        Promise.resolve().then(s.bind(s, 75747)),
        Promise.resolve().then(s.bind(s, 72280)),
        Promise.resolve().then(s.bind(s, 94388)),
        Promise.resolve().then(s.bind(s, 68152)),
        Promise.resolve().then(s.t.bind(s, 29185, 23)),
        Promise.resolve().then(s.t.bind(s, 55168, 23)));
    },
    47960: (e, t, s) => {
      "use strict";
      s.d(t, { Jf: () => l, OQ: () => n, R7: () => a, r4: () => r });
      let a = [
          { id: "cultural", label: "Cultural", mark: "華" },
          { id: "technical", label: "Technical", mark: "技" },
          { id: "literary", label: "Literary", mark: "文" },
          { id: "performing", label: "Performing Arts", mark: "舞" },
          { id: "gaming", label: "Gaming", mark: "勝" },
          { id: "convenor", label: "Convenor", mark: "統" },
        ],
        n = ["Literary Society"],
        r = ["Dance Society", "Music Club", "Dramatics"],
        l = (e) => a.some((t) => t.id === e);
    },
    49733: () => {},
    55168: () => {},
    68152: (e, t, s) => {
      "use strict";
      s.d(t, { GalleryPage: () => x });
      var a = s(95155),
        n = s(12115);
      let r = Array.from({ length: 21 }, (e, t) => {
        let s = String(t + 1).padStart(2, "0");
        return {
          id: `archive-${s}`,
          title: "PECFEST Archives",
          category: "Campus",
          edition: "From the archives",
          image: `/photos/archive/archive-${s}-thumb.webp`,
          fullImage: `/photos/archive/archive-${s}.webp`,
          alt: `PECFEST archive photograph ${t + 1}`,
          caption: "",
        };
      });
      var l = s(57101);
      function i({ src: e, alt: t, style: s, ...r }) {
        let [l, o] = (0, n.useState)(null),
          c = (0, n.useRef)(null);
        (0, n.useEffect)(() => {
          c.current?.complete && 0 === c.current.naturalWidth && o(e);
        }, [e]);
        let d = l === e;
        return (0, a.jsx)("img", {
          ...r,
          ref: c,
          src: d ? "/pecfest-logo-nav.webp" : e,
          alt: d ? "Photograph currently unavailable" : t,
          style: d
            ? {
                ...s,
                objectFit: "contain",
                padding: "12%",
                background: "#0e141e",
              }
            : s,
          onError: () => o(e),
        });
      }
      let o = (e, t, s) => Math.min(Math.max(e, t), s),
        c = (e) => ((((e + 180) % 360) + 360) % 360) - 180;
      function d({
        photos: e,
        onSelectPhoto: t,
        fit: s = 0.52,
        fitBasis: r = "auto",
        minRadius: h = 380,
        maxRadius: p = 780,
        overlayBlurColor: u = "#07030e",
        maxVerticalRotationDeg: m = 8,
        dragSensitivity: x = 22,
        segments: g = 35,
        dragDampening: f = 2,
        imageBorderRadius: y = "22px",
      }) {
        let j = (0, n.useRef)(null),
          b = (0, n.useRef)(null),
          v = (0, n.useRef)(null),
          w = (0, n.useRef)({ x: 0, y: 0 }),
          k = (0, n.useRef)({ x: 0, y: 0 }),
          N = (0, n.useRef)(null),
          M = (0, n.useRef)(!1),
          $ = (0, n.useRef)(!1),
          C = (0, n.useRef)(!1),
          S = (0, n.useRef)(null),
          L = (0, n.useRef)(null),
          I = (0, n.useRef)("mouse"),
          P = (0, n.useRef)(null),
          E = (0, n.useRef)(0),
          R = (0, n.useRef)(!1),
          F = (0, n.useMemo)(
            () =>
              (function (e, t) {
                let s = Array.from({ length: t }, (e, t) => -37 + 2 * t),
                  a = [-4, -2, 0, 2, 4],
                  n = [-3, -1, 1, 3, 5],
                  r = s.flatMap((e, t) =>
                    (t % 2 == 0 ? a : n).map((t) => ({
                      x: e,
                      y: t,
                      sizeX: 2,
                      sizeY: 2,
                    })),
                  ),
                  l = r.length;
                if (!e || 0 === e.length)
                  return r.map((e) => ({ ...e, photo: null }));
                let i = Array.from({ length: l }, (t, s) => e[s % e.length]);
                for (let e = 1; e < i.length; e++)
                  if (i[e].id === i[e - 1].id) {
                    for (let t = e + 1; t < i.length; t++)
                      if (i[t].id !== i[e].id) {
                        let s = i[e];
                        ((i[e] = i[t]), (i[t] = s));
                        break;
                      }
                  }
                return r.map((e, t) => ({ ...e, photo: i[t] }));
              })(e, g),
            [e, g],
          ),
          A = (0, n.useCallback)((e, t) => {
            let s = v.current;
            s &&
              (s.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${e.toFixed(2)}deg) rotateY(${t.toFixed(2)}deg)`);
          }, []),
          T = (0, n.useRef)(null);
        ((0, n.useEffect)(() => {
          let e = j.current;
          if (!e) return;
          let t = new ResizeObserver((t) => {
            let a,
              n = t[0].contentRect,
              l = Math.max(1, n.width),
              i = Math.max(1, n.height),
              c = Math.min(l, i),
              d = Math.max(l, i);
            switch (r) {
              case "min":
                a = c;
                break;
              case "max":
                a = d;
                break;
              case "width":
                a = l;
                break;
              case "height":
                a = i;
                break;
              default:
                a = l / i >= 1.3 ? l : c;
            }
            let m = a * s;
            ((T.current = Math.round(
              (m = o((m = Math.min(m, 1.35 * i)), h, p)),
            )),
              e.style.setProperty("--radius", `${T.current}px`),
              e.style.setProperty("--overlay-blur-color", u),
              e.style.setProperty("--tile-radius", y),
              A(w.current.x, w.current.y));
          });
          return (t.observe(e), () => t.disconnect());
        }, [s, r, h, p, u, y, A]),
          (0, n.useEffect)(() => {
            A(w.current.x, w.current.y);
          }, [A]));
        let z = (0, n.useCallback)(() => {
            S.current && (cancelAnimationFrame(S.current), (S.current = null));
          }, []),
          D = (0, n.useCallback)(
            (e, t) => {
              let s = 80 * o(e, -1.4, 1.4),
                a = 80 * o(t, -1.4, 1.4),
                n = 0,
                r = o(f ?? 0.6, 0, 1),
                l = 0.94 + 0.055 * r,
                i = 0.015 - 0.01 * r,
                d = Math.round(90 + 270 * r),
                h = () => {
                  if (
                    ((s *= l),
                    (a *= l),
                    (Math.abs(s) < i && Math.abs(a) < i) || ++n > d)
                  ) {
                    S.current = null;
                    return;
                  }
                  let e = o(w.current.x - a / 200, -m, m),
                    t = c(w.current.y + s / 200);
                  ((w.current = { x: e, y: t }),
                    A(e, t),
                    (S.current = requestAnimationFrame(h)));
                };
              (z(), (S.current = requestAnimationFrame(h)));
            },
            [f, m, z, A],
          );
        ((0, n.useEffect)(() => {
          let e = () => {
            if (!M.current && !S.current && !R.current) {
              let e = c(w.current.y + 0.05);
              ((w.current.y = e), A(w.current.x, e));
            }
            L.current = requestAnimationFrame(e);
          };
          return (
            (L.current = requestAnimationFrame(e)),
            () => {
              L.current && cancelAnimationFrame(L.current);
            }
          );
        }, [A]),
          (0, l.useGesture)(
            {
              onDragStart: ({ event: e }) => {
                (z(),
                  (I.current = e.pointerType || "mouse"),
                  (M.current = !0),
                  ($.current = !1),
                  (C.current = !1),
                  (k.current = { ...w.current }),
                  (N.current = { x: e.clientX, y: e.clientY }),
                  (P.current =
                    e.target.closest?.(".sphere-photo-card") || null));
              },
              onDrag: ({
                event: e,
                last: t,
                velocity: s = [0, 0],
                direction: a = [0, 0],
                movement: n,
              }) => {
                if (!M.current || !N.current) return;
                let r = e.clientX - N.current.x,
                  l = e.clientY - N.current.y;
                !C.current && r * r + l * l > 16 && (C.current = !0);
                let i = o(k.current.x - l / x, -m, m),
                  c = k.current.y + r / x,
                  d = w.current;
                if (
                  ((d.x !== i || d.y !== c) &&
                    ((w.current = { x: i, y: c }), A(i, c)),
                  t)
                ) {
                  M.current = !1;
                  let t = !1;
                  if (N.current) {
                    let s = e.clientX - N.current.x,
                      a = e.clientY - N.current.y,
                      n = "touch" === I.current ? 10 : 6;
                    s * s + a * a <= n * n && (t = !0);
                  }
                  let [r, l] = s,
                    [i, o] = a,
                    c = r * i,
                    d = l * o;
                  if (
                    !t &&
                    0.001 > Math.abs(c) &&
                    0.001 > Math.abs(d) &&
                    Array.isArray(n)
                  ) {
                    let [e, t] = n;
                    ((c = (e / x) * 0.02), (d = (t / x) * 0.02));
                  }
                  (!t &&
                    (Math.abs(c) > 0.005 || Math.abs(d) > 0.005) &&
                    D(c, d),
                    (N.current = null),
                    ($.current = !t),
                    (P.current = null),
                    $.current && setTimeout(() => ($.current = !1), 120),
                    C.current && (E.current = performance.now()),
                    (C.current = !1));
                }
              },
            },
            { target: b, eventOptions: { passive: !1 } },
          ));
        let U = () => {
            let e = document.getElementById("cylinder-section");
            e && e.scrollIntoView({ behavior: "smooth" });
          },
          O = `
    .sphere-root {
      --radius: 560px;
      --circ: calc(var(--radius) * 3.14159);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .sphere-photo-card { transform-style: preserve-3d; }
    
    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }
    
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    
    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 300ms;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)))) 
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)))) 
                 translateZ(var(--radius));
    }
    
    .sphere-photo-card {
      position: absolute;
      inset: 8px;
      border-radius: var(--tile-radius, 22px);
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 250ms ease,
                  box-shadow 250ms ease;
      pointer-events: auto;
      transform: translateZ(0);
      background: #0d0816;
      border: 1.2px solid rgba(255, 255, 255, 0.09);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.65);
    }
    
    .sphere-photo-card:hover {
      border-color: #ffd778;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.85), 0 0 22px rgba(245, 215, 142, 0.6);
      transform: translateZ(12px) scale(1.06);
    }
  `;
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)("style", { dangerouslySetInnerHTML: { __html: O } }),
            (0, a.jsxs)("section", {
              id: "sphere-section",
              className:
                "photo-sphere-section relative w-full h-screen min-h-[700px] overflow-hidden select-none",
              "aria-label": "3D Interactive Dome Photo Gallery",
              children: [
                (0, a.jsx)("div", {
                  className:
                    "absolute inset-0 opacity-10 pointer-events-none z-[1]",
                  style: {
                    backgroundImage:
                      'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=")',
                  },
                }),
                (0, a.jsx)("div", {
                  className: "absolute inset-0 pointer-events-none z-0",
                  style: {
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(68, 20, 110, 0.35) 0%, rgba(20, 7, 36, 0.22) 48%, #07030e 85%)",
                  },
                }),
                (0, a.jsx)("div", {
                  ref: j,
                  className: "sphere-root relative w-full h-full",
                  style: {
                    "--segments-x": g,
                    "--segments-y": g,
                    "--overlay-blur-color": u,
                    "--tile-radius": y,
                  },
                  children: (0, a.jsxs)("main", {
                    ref: b,
                    className:
                      "photo-sphere-viewport absolute inset-0 grid place-items-center overflow-hidden select-none bg-transparent",
                    style: {
                      touchAction: "none",
                      WebkitUserSelect: "none",
                      cursor: "grab",
                    },
                    onMouseEnter: () => {
                      R.current = !0;
                    },
                    onMouseLeave: () => {
                      R.current = !1;
                    },
                    children: [
                      (0, a.jsx)("div", {
                        className: "stage",
                        children: (0, a.jsx)("div", {
                          ref: v,
                          className: "sphere photo-sphere-world",
                          children: F.map((e, s) =>
                            (0, a.jsx)(
                              "div",
                              {
                                className: "sphere-item absolute m-auto",
                                "data-offset-x": e.x,
                                "data-offset-y": e.y,
                                "data-size-x": e.sizeX,
                                "data-size-y": e.sizeY,
                                style: {
                                  "--offset-x": e.x,
                                  "--offset-y": e.y,
                                  "--item-size-x": e.sizeX,
                                  "--item-size-y": e.sizeY,
                                  top: "-999px",
                                  bottom: "-999px",
                                  left: "-999px",
                                  right: "-999px",
                                },
                                children: (0, a.jsx)("div", {
                                  className: "sphere-photo-card item__image",
                                  role: "button",
                                  tabIndex: 0,
                                  "aria-label": `View ${e.photo?.title || "photo"} (${e.photo?.edition || "Pecfest"})`,
                                  onClick: () => {
                                    M.current ||
                                      C.current ||
                                      (!(performance.now() - E.current < 80) &&
                                        e.photo &&
                                        t(e.photo));
                                  },
                                  onKeyDown: (s) => {
                                    ("Enter" === s.key || " " === s.key) &&
                                      (s.preventDefault(),
                                      e.photo && t(e.photo));
                                  },
                                  children: (0, a.jsx)(i, {
                                    src: e.photo?.image || "",
                                    alt:
                                      e.photo?.alt ||
                                      e.photo?.title ||
                                      "Festival photograph",
                                    loading: "lazy",
                                    draggable: !1,
                                  }),
                                }),
                              },
                              `${e.x},${e.y},${s}`,
                            ),
                          ),
                        }),
                      }),
                      (0, a.jsx)("div", {
                        className:
                          "absolute inset-0 m-auto z-[3] pointer-events-none",
                        style: {
                          backgroundImage: `radial-gradient(rgba(235, 235, 235, 0) 65%, var(--overlay-blur-color, ${u}) 100%)`,
                        },
                      }),
                      (0, a.jsx)("div", {
                        className:
                          "absolute inset-0 m-auto z-[3] pointer-events-none",
                        style: {
                          WebkitMaskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${u}) 90%)`,
                          maskImage: `radial-gradient(rgba(235, 235, 235, 0) 70%, var(--overlay-blur-color, ${u}) 90%)`,
                          backdropFilter: "blur(3px)",
                        },
                      }),
                      (0, a.jsx)("div", {
                        className:
                          "absolute left-0 right-0 top-0 h-[140px] z-[5] pointer-events-none rotate-180",
                        style: {
                          background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${u}))`,
                        },
                      }),
                      (0, a.jsx)("div", {
                        className:
                          "absolute left-0 right-0 bottom-0 h-[140px] z-[5] pointer-events-none",
                        style: {
                          background: `linear-gradient(to bottom, transparent, var(--overlay-blur-color, ${u}))`,
                        },
                      }),
                    ],
                  }),
                }),
                (0, a.jsxs)("div", {
                  className:
                    "sphere-explore-more absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer transition-transform hover:translate-y-1",
                  onClick: U,
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Scroll down to panorama cylinder",
                  onKeyDown: (e) => {
                    ("Enter" === e.key || " " === e.key) &&
                      (e.preventDefault(), U());
                  },
                  children: [
                    (0, a.jsx)("span", {
                      className:
                        "text-xs font-mono tracking-widest text-[#f5efe6]/75 uppercase",
                      children: "EXPLORE MORE",
                    }),
                    (0, a.jsx)("svg", {
                      className: "w-5 h-5 animate-bounce text-[#ffd778]",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      "aria-hidden": "true",
                      children: (0, a.jsx)("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2.5",
                        d: "M19 9l-7 7-7-7",
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      function h({ photos: e, onSelectPhoto: t }) {
        let s = (0, n.useRef)(null),
          [r, l] = (0, n.useState)(165),
          [o, c] = (0, n.useState)(260),
          [d, p] = (0, n.useState)(null),
          u = (0, n.useRef)(0),
          m = (0, n.useRef)(0),
          x = (0, n.useRef)(0),
          g = (0, n.useRef)(!1),
          f = (0, n.useRef)(!1),
          y = (0, n.useRef)(!1),
          j = (0, n.useRef)({ x: 0, y: 0 }),
          b = (0, n.useRef)(0),
          v = (0, n.useRef)(0),
          w = (0, n.useRef)(0),
          k = (0, n.useMemo)(() => {
            if (!e || 0 === e.length) return [];
            let t = [];
            for (let s = 0; s < 20; s++)
              t.push({ index: s, photo: e[s % e.length] });
            return t;
          }, [e]),
          N = 360 / k.length,
          M = (0, n.useMemo)(
            () => Math.round(r / 2 / Math.tan((N / 2) * (Math.PI / 180))) + 12,
            [r, N],
          );
        ((0, n.useEffect)(() => {
          let e = () => {
            let e = window.innerWidth;
            e < 480
              ? (l(125), c(190))
              : e < 768
                ? (l(140), c(220))
                : e < 1100
                  ? (l(155), c(245))
                  : (l(168), c(265));
          };
          return (
            e(),
            window.addEventListener("resize", e),
            () => window.removeEventListener("resize", e)
          );
        }, []),
          (0, n.useEffect)(() => {
            let e = () => {
              s.current &&
                (!f.current &&
                  Math.abs(x.current) > 0.01 &&
                  ((m.current += x.current), (x.current *= 0.94)),
                (u.current += (m.current - u.current) * 0.12),
                (s.current.style.transform = `rotateY(${u.current}deg)`),
                (w.current = requestAnimationFrame(e)));
            };
            return (
              (w.current = requestAnimationFrame(e)),
              () => cancelAnimationFrame(w.current)
            );
          }, []),
          (0, n.useEffect)(() => {
            let e = () => {
              ((g.current = !1), (f.current = !1), (y.current = !1));
            };
            return (
              window.addEventListener("pointerup", e),
              window.addEventListener("pointercancel", e),
              () => {
                (window.removeEventListener("pointerup", e),
                  window.removeEventListener("pointercancel", e));
              }
            );
          }, []));
        let $ = (0, n.useCallback)((e) => {
            (0 === e.button || "mouse" !== e.pointerType) &&
              ((g.current = !0),
              (f.current = !1),
              (y.current = !1),
              (v.current = 0),
              (j.current = { x: e.clientX, y: e.clientY }),
              (b.current = e.clientX),
              (x.current = 0));
          }, []),
          C = (0, n.useCallback)((e) => {
            if (!g.current || y.current) return;
            let t = e.clientX - j.current.x,
              s = e.clientY - j.current.y,
              a = Math.hypot(t, s);
            if (
              "touch" === e.pointerType &&
              !f.current &&
              Math.abs(s) > Math.abs(t) &&
              Math.abs(s) > 6
            ) {
              ((y.current = !0), (g.current = !1));
              return;
            }
            if (!f.current)
              if (!(a > 6)) return;
              else f.current = !0;
            let n = e.clientX - b.current;
            v.current += Math.abs(n);
            let r = 0.28 * n;
            ((m.current += r),
              (u.current += r),
              (x.current = 0.65 * r),
              (b.current = e.clientX));
          }, []),
          S = (0, n.useCallback)(() => {
            ((g.current = !1), (f.current = !1), (y.current = !1));
          }, []);
        return (0, a.jsxs)("section", {
          id: "cylinder-section",
          className: "photo-cylinder-section",
          "aria-label": "3D Cylinder Photo Panorama",
          children: [
            (0, a.jsxs)("div", {
              className: "cylinder-instruction-header",
              children: [
                (0, a.jsx)("p", {
                  className: "cylinder-instruction-title",
                  children: "Drag to spin the memories",
                }),
                (0, a.jsx)("p", {
                  className: "cylinder-instruction-subtitle",
                  children: "(click any photo to view in high resolution)",
                }),
              ],
            }),
            (0, a.jsx)("div", {
              className: "photo-cylinder-viewport",
              onPointerDown: $,
              onPointerMove: C,
              onPointerUp: S,
              onPointerCancel: S,
              children: (0, a.jsx)("div", {
                ref: s,
                className: "photo-cylinder-ring",
                children: k.map(({ index: e, photo: s }) => {
                  let n = e * N,
                    l = d === `${e}-${s.id}`;
                  return (0, a.jsx)(
                    "div",
                    {
                      className: `cylinder-photo-panel ${l ? "panel-hovered" : ""}`,
                      style: {
                        width: `${r}px`,
                        height: `${o}px`,
                        marginLeft: `-${r / 2}px`,
                        marginTop: `-${o / 2}px`,
                        transform: `rotateY(${n}deg) translateZ(${M}px)`,
                      },
                      onMouseEnter: () => p(`${e}-${s.id}`),
                      onMouseLeave: () => p(null),
                      onClick: (e) => {
                        (e.stopPropagation(), !(v.current > 8) && t(s));
                      },
                      role: "button",
                      tabIndex: 0,
                      "aria-label": `Preview ${s.title} (${s.edition})`,
                      onKeyDown: (e) => {
                        ("Enter" === e.key || " " === e.key) &&
                          (e.preventDefault(), t(s));
                      },
                      children: (0, a.jsxs)("div", {
                        className: "cylinder-panel-media",
                        children: [
                          (0, a.jsx)(i, {
                            src: s.image,
                            alt: s.alt,
                            loading: "lazy",
                            draggable: !1,
                          }),
                          (0, a.jsxs)("div", {
                            className: "cylinder-panel-meta",
                            children: [
                              (0, a.jsx)("span", {
                                className: "cylinder-panel-edition",
                                children: s.edition,
                              }),
                              (0, a.jsx)("span", {
                                className: "cylinder-panel-title",
                                children: s.title,
                              }),
                            ],
                          }),
                        ],
                      }),
                    },
                    `cylinder-panel-${e}-${s.id}`,
                  );
                }),
              }),
            }),
          ],
        });
      }
      var p = s(47650);
      function u({ photo: e, onClose: t, onNext: s, onPrev: r }) {
        let [l, o] = (0, n.useState)(!1);
        if (
          ((0, n.useEffect)(() => {
            o(!0);
          }, []),
          (0, n.useEffect)(() => {
            let e = (e) => {
              ("Escape" === e.key && t(),
                "ArrowRight" === e.key && s(),
                "ArrowLeft" === e.key && r());
            };
            window.addEventListener("keydown", e);
            let a = document.body.style.overflow;
            return (
              (document.body.style.overflow = "hidden"),
              () => {
                (window.removeEventListener("keydown", e),
                  (document.body.style.overflow = a));
              }
            );
          }, [t, s, r]),
          !l)
        )
          return null;
        let c = (0, a.jsxs)("div", {
          className: "gc-lightbox-backdrop pure-image-mode",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": e.title,
          onClick: t,
          children: [
            (0, a.jsx)("button", {
              className: "gc-lightbox-floating-close",
              onClick: (e) => {
                (e.stopPropagation(), t());
              },
              "aria-label": "Close preview",
              title: "Close",
              children: "✕",
            }),
            (0, a.jsx)("button", {
              className: "gc-lightbox-floating-nav prev",
              onClick: (e) => {
                (e.stopPropagation(), r());
              },
              "aria-label": "Previous photograph",
              title: "Previous",
              children: "‹",
            }),
            (0, a.jsx)("div", {
              className: "gc-lightbox-image-container",
              onClick: t,
              children: (0, a.jsx)(i, {
                src: e.fullImage || e.image,
                alt: e.alt,
                loading: "eager",
                draggable: !1,
                className: "gc-lightbox-pure-img",
              }),
            }),
            (0, a.jsx)("button", {
              className: "gc-lightbox-floating-nav next",
              onClick: (e) => {
                (e.stopPropagation(), s());
              },
              "aria-label": "Next photograph",
              title: "Next",
              children: "›",
            }),
          ],
        });
        return (0, p.createPortal)(c, document.body);
      }
      function m() {
        let [e, t] = (0, n.useState)(0),
          [s, r] = (0, n.useState)(!1),
          l = (0, n.useRef)(null);
        (0, n.useEffect)(() => {
          let e = document.querySelector(".fullscreen-page-scroll");
          if (!e) return;
          let s = () => {
            let s = e.scrollHeight - e.clientHeight;
            s <= 0 ? t(0) : t(Math.max(0, Math.min(1, e.scrollTop / s)));
          };
          return (
            s(),
            e.addEventListener("scroll", s, { passive: !0 }),
            window.addEventListener("resize", s),
            () => {
              (e.removeEventListener("scroll", s),
                window.removeEventListener("resize", s));
            }
          );
        }, []);
        let i = (0, n.useCallback)((e) => {
            if (!l.current) return;
            let t = l.current.getBoundingClientRect(),
              s = Math.max(0, Math.min(1, (e - t.top) / t.height)),
              a = document.querySelector(".fullscreen-page-scroll");
            if (a) {
              let e = a.scrollHeight - a.clientHeight;
              a.scrollTop = s * e;
            }
          }, []),
          o = (e) => {
            r(!1);
            try {
              e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {}
          };
        return (0, a.jsxs)("aside", {
          className: `gallery-side-scrollbar ${s ? "dragging" : ""}`,
          "aria-label": "Gallery page mobile navigation scrollbar",
          children: [
            (0, a.jsxs)("button", {
              type: "button",
              className: `scroller-section-node ${e < 0.4 ? "active" : ""}`,
              onClick: (e) => {
                e.stopPropagation();
                let t = document.querySelector(".fullscreen-page-scroll");
                t && t.scrollTo({ top: 0, behavior: "smooth" });
              },
              title: "Scroll to Photo Sphere",
              "aria-label": "Scroll to 3D Photo Sphere",
              children: [
                (0, a.jsx)("span", { className: "scroller-node-dot" }),
                (0, a.jsx)("span", {
                  className: "scroller-node-label",
                  children: "SPHERE",
                }),
              ],
            }),
            (0, a.jsxs)("div", {
              ref: l,
              className: "scroller-track",
              onPointerDown: (e) => {
                (e.preventDefault(),
                  e.stopPropagation(),
                  r(!0),
                  e.currentTarget.setPointerCapture(e.pointerId),
                  i(e.clientY));
              },
              onPointerMove: (e) => {
                s && (e.preventDefault(), e.stopPropagation(), i(e.clientY));
              },
              onPointerUp: o,
              onPointerCancel: o,
              children: [
                (0, a.jsx)("div", { className: "scroller-track-line" }),
                (0, a.jsx)("div", {
                  className: "scroller-thumb",
                  style: { top: `${100 * e}%` },
                  children: (0, a.jsx)("div", {
                    className: "scroller-thumb-handle",
                  }),
                }),
              ],
            }),
            (0, a.jsxs)("button", {
              type: "button",
              className: `scroller-section-node ${e >= 0.4 ? "active" : ""}`,
              onClick: (e) => {
                e.stopPropagation();
                let t = document.getElementById("cylinder-section");
                t && t.scrollIntoView({ behavior: "smooth", block: "start" });
              },
              title: "Scroll to Photo Cylinder",
              "aria-label": "Scroll to 3D Photo Cylinder",
              children: [
                (0, a.jsx)("span", { className: "scroller-node-dot" }),
                (0, a.jsx)("span", {
                  className: "scroller-node-label",
                  children: "PANORAMA",
                }),
              ],
            }),
          ],
        });
      }
      function x() {
        let [e, t] = (0, n.useState)(null),
          s = (0, n.useMemo)(
            () => (e ? r.findIndex((t) => t.id === e.id) : -1),
            [e],
          ),
          l = (0, n.useCallback)(() => {
            if (-1 === s || 0 === r.length) return;
            let e = (s + 1) % r.length;
            t(r[e]);
          }, [s]),
          i = (0, n.useCallback)(() => {
            if (-1 === s || 0 === r.length) return;
            let e = (s - 1 + r.length) % r.length;
            t(r[e]);
          }, [s]);
        return (0, a.jsxs)("div", {
          className: "gallery-experience-container",
          children: [
            (0, a.jsx)(m, {}),
            (0, a.jsx)(d, { photos: r, onSelectPhoto: t }),
            (0, a.jsx)(h, { photos: r, onSelectPhoto: t }),
            e &&
              (0, a.jsx)(u, {
                photo: e,
                currentIndex: s >= 0 ? s : 0,
                totalPhotos: r.length,
                onClose: () => t(null),
                onNext: l,
                onPrev: i,
              }),
          ],
        });
      }
      s(14163);
    },
    72280: (e, t, s) => {
      "use strict";
      s.d(t, { SponsorsPage: () => ee });
      var a = s(95155);
      s(12115);
      let n = (e) => Math.round(100 * e) / 100,
        r = (e) => `${n((e / 1420) * 100)}%`,
        l = (e) => `${e}cqw`,
        i = [
          {
            name: "Anant Raj Limited",
            jp: "アナント・ラージ",
            tier: "Title Sponsor",
            logo: "/logos/anant-raj.png",
            roof: "torii",
            x: 61,
            y: 125,
            w: 30,
            ar: 1.25,
            logoH: 54,
          },
          {
            name: "ICICI Bank",
            jp: "ICICI銀行",
            tier: "Powered By",
            logo: "/logos/icici.png",
            roof: "slate",
            x: 73,
            y: 257,
            w: 29,
          },
          {
            name: "Avon Cycles",
            jp: "エイボン・サイクルズ",
            tier: "Driven By",
            logo: "/logos/avon-cycles.png",
            roof: "maroon",
            x: 76,
            y: 381,
            w: 27,
            ar: 1.3,
          },
          {
            name: "Vaishnav",
            jp: "ヴァイシュナヴ",
            tier: "Associate Sponsor",
            logo: "/logos/vaishnavi.png",
            roof: "indigo",
            x: 57,
            y: 505,
            w: 28,
          },
          {
            name: "SBI Bank",
            jp: "インド国営銀行",
            tier: "Banking Partner",
            logo: "/logos/sbi.png",
            roof: "slate",
            x: 69,
            y: 629,
            w: 29,
          },
          {
            name: "Wendy's",
            jp: "ウェンディーズ",
            tier: "Food Partner",
            logo: "/logos/wendys.png",
            roof: "red",
            x: 75,
            y: 753,
            w: 27,
            ar: 1.3,
          },
          {
            name: "Livguard",
            jp: "リヴガード",
            tier: "Power Partner",
            logo: "/logos/livguard.png",
            roof: "maroon",
            x: 57,
            y: 877,
            w: 29,
          },
          {
            name: "Rebel",
            jp: "レベル",
            tier: "Food Partner",
            logo: "/logos/rebel.png",
            roof: "red",
            x: 70,
            y: 1001,
            w: 29,
          },
          {
            name: "MyUni",
            jp: "マイユニ",
            tier: "Wellness Partner",
            logo: "/logos/myuni.png",
            roof: "indigo",
            x: 76,
            y: 1125,
            w: 29,
          },
          {
            name: "GKD",
            jp: "ジーケーディー",
            tier: "Associate Sponsor",
            logo: "/logos/gkd.png",
            roof: "slate",
            x: 58,
            y: 1249,
            w: 29,
          },
        ],
        o = [
          { text: "始まり", x: 40, y: 235 },
          { text: "成長", x: 50.5, y: 360 },
          { text: "絆", x: 31, y: 485 },
          { text: "広がり", x: 29, y: 610 },
          { text: "挑戦", x: 42, y: 735 },
          { text: "飛躍", x: 28, y: 860 },
          { text: "輝き", x: 40, y: 985 },
          { text: "夢", x: 30, y: 1110 },
          { text: "未来", x: 28, y: 1235 },
        ],
        c = [
          [242, 190],
          [150, 262],
          [300, 350],
          [370, 430],
          [150, 520],
          [240, 600],
          [350, 680],
          [140, 770],
          [300, 850],
          [372, 930],
          [150, 1020],
          [245, 1100],
          [350, 1180],
          [140, 1270],
          [260, 1345],
          [240, 1420],
        ],
        d = c.reduce((e, [t, s], a) => {
          if (0 === a) return `M${t} ${s}`;
          let [r, l] = c[a - 1],
            i = n((s - l) * 0.5);
          return `${e} C${r} ${n(l + i)} ${t} ${n(s - i)} ${t} ${s}`;
        }, ""),
        h = "#120a1c",
        p = ["#8e2f78", "#c2488a", "#e86aa6", "#f59bc0", "#fbd0e0", "#fff0f5"],
        u =
          "'Shippori Mincho','Noto Serif JP','Hiragino Mincho ProN','Yu Mincho',Georgia,serif";
      function m(e) {
        let t = e >>> 0;
        return () => {
          let e = (t = (t + 0x6d2b79f5) >>> 0);
          return (
            (e = Math.imul(e ^ (e >>> 15), 1 | e)),
            (((e ^= e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ (e >>> 14)) >>> 0) /
              0x100000000
          );
        };
      }
      function x() {
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)("svg", {
              width: "0",
              height: "0",
              className: "absolute",
              "aria-hidden": "true",
              focusable: "false",
              children: (0, a.jsxs)("defs", {
                children: [
                  (0, a.jsxs)("filter", {
                    id: "sil-rough",
                    x: "-10%",
                    y: "-10%",
                    width: "120%",
                    height: "120%",
                    children: [
                      (0, a.jsx)("feTurbulence", {
                        type: "fractalNoise",
                        baseFrequency: "0.04",
                        numOctaves: "3",
                        seed: "4",
                        result: "n",
                      }),
                      (0, a.jsx)("feDisplacementMap", {
                        in: "SourceGraphic",
                        in2: "n",
                        scale: "3",
                      }),
                    ],
                  }),
                  (0, a.jsxs)("filter", {
                    id: "bark",
                    x: "-10%",
                    y: "-5%",
                    width: "120%",
                    height: "110%",
                    children: [
                      (0, a.jsx)("feTurbulence", {
                        type: "fractalNoise",
                        baseFrequency: "0.06 0.012",
                        numOctaves: "4",
                        seed: "3",
                        result: "n",
                      }),
                      (0, a.jsx)("feDisplacementMap", {
                        in: "SourceGraphic",
                        in2: "n",
                        scale: "5",
                      }),
                    ],
                  }),
                  (0, a.jsx)("filter", {
                    id: "mtn-soft",
                    x: "-5%",
                    y: "-5%",
                    width: "110%",
                    height: "110%",
                    children: (0, a.jsx)("feGaussianBlur", {
                      stdDeviation: "1.2",
                    }),
                  }),
                  (0, a.jsxs)("filter", {
                    id: "glow-soft",
                    x: "-20%",
                    y: "-20%",
                    width: "140%",
                    height: "140%",
                    children: [
                      (0, a.jsx)("feGaussianBlur", {
                        stdDeviation: "2",
                        result: "b",
                      }),
                      (0, a.jsxs)("feMerge", {
                        children: [
                          (0, a.jsx)("feMergeNode", { in: "b" }),
                          (0, a.jsx)("feMergeNode", { in: "SourceGraphic" }),
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsx)("filter", {
                    id: "path-glow",
                    x: "-30%",
                    y: "-5%",
                    width: "160%",
                    height: "110%",
                    children: (0, a.jsx)("feGaussianBlur", {
                      stdDeviation: "7",
                    }),
                  }),
                  (0, a.jsxs)("radialGradient", {
                    id: "warm",
                    children: [
                      (0, a.jsx)("stop", {
                        offset: "0",
                        stopColor: "#ffcf7a",
                        stopOpacity: "0.55",
                      }),
                      (0, a.jsx)("stop", {
                        offset: "1",
                        stopColor: "#ffcf7a",
                        stopOpacity: "0",
                      }),
                    ],
                  }),
                  (0, a.jsxs)("linearGradient", {
                    id: "torii-grad",
                    x1: "0",
                    y1: "0",
                    x2: "1",
                    y2: "0",
                    children: [
                      (0, a.jsx)("stop", { offset: "0", stopColor: "#7a160d" }),
                      (0, a.jsx)("stop", {
                        offset: "0.45",
                        stopColor: "#e2452a",
                      }),
                      (0, a.jsx)("stop", { offset: "1", stopColor: "#8a1a10" }),
                    ],
                  }),
                  (0, a.jsxs)("linearGradient", {
                    id: "torii-beam",
                    x1: "0",
                    y1: "0",
                    x2: "0",
                    y2: "1",
                    children: [
                      (0, a.jsx)("stop", { offset: "0", stopColor: "#ee5333" }),
                      (0, a.jsx)("stop", { offset: "1", stopColor: "#a82a18" }),
                    ],
                  }),
                  (0, a.jsxs)("linearGradient", {
                    id: "mtn-main",
                    x1: "0",
                    y1: "0",
                    x2: "0",
                    y2: "1",
                    children: [
                      (0, a.jsx)("stop", { offset: "0", stopColor: "#5a3577" }),
                      (0, a.jsx)("stop", {
                        offset: "0.5",
                        stopColor: "#2c1a42",
                      }),
                      (0, a.jsx)("stop", { offset: "1", stopColor: "#140b1f" }),
                    ],
                  }),
                  (0, a.jsxs)("linearGradient", {
                    id: "mtn-far",
                    x1: "0",
                    y1: "0",
                    x2: "0",
                    y2: "1",
                    children: [
                      (0, a.jsx)("stop", {
                        offset: "0",
                        stopColor: "#a874b4",
                        stopOpacity: "0.55",
                      }),
                      (0, a.jsx)("stop", {
                        offset: "1",
                        stopColor: "#5a3a78",
                        stopOpacity: "0.2",
                      }),
                    ],
                  }),
                ],
              }),
            }),
            (0, a.jsx)("style", {
              children: `
        @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700&display=swap');
        @keyframes jm-breathe { 0%,100% { filter: brightness(1); } 50% { filter: brightness(1.08); } }
        @keyframes jm-fly { 0%,100% { transform: translateY(0); opacity: .5; } 50% { transform: translateY(-8px); opacity: 1; } }
        @keyframes jm-drift { 0% { transform: translate(0,0) rotate(var(--r)); } 100% { transform: translate(-14px,22px) rotate(calc(var(--r) + 50deg)); } }
        @keyframes jm-twinkle { 0%,100% { opacity: var(--o); } 50% { opacity: calc(var(--o) * .35); } }
        .jm-board, .jm-lantern { animation: jm-breathe 4.5s ease-in-out infinite; }
        .jm-fly { animation: jm-fly 5s ease-in-out infinite; }
        .jm-petal { animation: jm-drift 9s ease-in-out infinite alternate; }
        .jm-star { animation: jm-twinkle 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .jm-board, .jm-lantern, .jm-fly, .jm-petal, .jm-star { animation: none; } }
      `,
            }),
          ],
        });
      }
      function g({ name: e }) {
        return (0, a.jsxs)("div", {
          className:
            "flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-sm border-2 border-dashed border-[#8a6a52]/70 bg-[#b77b48]/10 text-[#6e5240]",
          role: "img",
          "aria-label": `${e} logo placeholder`,
          children: [
            (0, a.jsxs)("svg", {
              viewBox: "0 0 24 24",
              className: "h-[30%] min-h-3 w-auto",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.5",
              "aria-hidden": "true",
              children: [
                (0, a.jsx)("rect", {
                  x: "3",
                  y: "4",
                  width: "18",
                  height: "16",
                  rx: "2",
                }),
                (0, a.jsx)("circle", { cx: "9", cy: "10", r: "1.6" }),
                (0, a.jsx)("path", { d: "M3 17l5-4 4 3 3-2 6 4" }),
              ],
            }),
            (0, a.jsx)("span", {
              className: "text-[9px] tracking-[0.18em]",
              style: { fontFamily: u },
              children: "Logo",
            }),
          ],
        });
      }
      let f = {
        slate: {
          base: "#2b4660",
          light: "#3f6784",
          trim: "#e3c277",
          shade: "#10202f",
        },
        maroon: {
          base: "#6a1c2e",
          light: "#8c2a3f",
          trim: "#f0c872",
          shade: "#2e0a14",
        },
        indigo: {
          base: "#26346e",
          light: "#3a4c94",
          trim: "#e3c277",
          shade: "#121a3f",
        },
      };
      function y({ kind: e, className: t = "" }) {
        if ("red" === e)
          return (0, a.jsxs)("svg", {
            viewBox: "0 0 200 50",
            className: `overflow-visible ${t}`,
            "aria-hidden": "true",
            children: [
              (0, a.jsx)("path", {
                d: "M-12 10 Q100 -8 212 10 L204 20 Q100 4 -4 20Z",
                fill: "#17090c",
              }),
              (0, a.jsx)("path", {
                d: "M6 22 Q100 8 194 22 L190 32 Q100 18 10 32Z",
                fill: "#d63a24",
              }),
              (0, a.jsx)("path", {
                d: "M6 22 Q100 8 194 22",
                fill: "none",
                stroke: "#f08a5a",
                strokeWidth: "1",
                opacity: "0.6",
              }),
              (0, a.jsx)("rect", {
                x: "22",
                y: "38",
                width: "156",
                height: "6",
                fill: "#b82a18",
              }),
              (0, a.jsx)("rect", {
                x: "88",
                y: "20",
                width: "24",
                height: "26",
                fill: "#17090c",
              }),
              (0, a.jsx)("rect", {
                x: "91",
                y: "23",
                width: "18",
                height: "20",
                fill: "none",
                stroke: "#e3c277",
                strokeWidth: "1",
              }),
            ],
          });
        let s = f[e],
          n = Array.from({ length: 13 }, (e, t) => 22 + 13 * t);
        return (0, a.jsxs)("svg", {
          viewBox: "0 0 200 56",
          className: `overflow-visible ${t}`,
          "aria-hidden": "true",
          children: [
            (0, a.jsx)("rect", {
              x: "14",
              y: "48",
              width: "172",
              height: "6",
              fill: s.shade,
            }),
            (0, a.jsx)("path", {
              d: "M-10 44 Q10 42 28 30 L52 10 Q100 2 148 10 L172 30 Q190 42 210 44 Q198 52 180 50 L20 50 Q2 52 -10 44Z",
              fill: s.base,
            }),
            (0, a.jsx)("path", {
              d: "M52 10 Q100 2 148 10 L172 30 Q100 22 28 30Z",
              fill: s.light,
              opacity: "0.45",
            }),
            (0, a.jsx)("g", {
              stroke: s.shade,
              strokeWidth: "1",
              opacity: "0.65",
              children: n.map((e) =>
                (0, a.jsx)(
                  "line",
                  { x1: 50 + (e - 100) * 0.35, y1: "8", x2: e - 4, y2: "46" },
                  e,
                ),
              ),
            }),
            (0, a.jsx)("path", {
              d: "M-10 44 Q10 42 28 30 L52 10 Q100 2 148 10 L172 30 Q190 42 210 44",
              fill: "none",
              stroke: s.trim,
              strokeWidth: "2.2",
            }),
            (0, a.jsx)("path", {
              d: "M20 50 L180 50",
              stroke: s.trim,
              strokeWidth: "1.6",
            }),
            (0, a.jsx)("path", {
              d: "M50 10 Q100 0 150 10",
              fill: "none",
              stroke: s.trim,
              strokeWidth: "3",
              strokeLinecap: "round",
            }),
            (0, a.jsx)("circle", { cx: "49", cy: "9", r: "2.8", fill: s.trim }),
            (0, a.jsx)("circle", {
              cx: "151",
              cy: "9",
              r: "2.8",
              fill: s.trim,
            }),
          ],
        });
      }
      function j({ s: e, z: t, index: s }) {
        return (0, a.jsxs)("figure", {
          className: "absolute m-0 -translate-x-1/2",
          style: { left: `${e.x}%`, top: r(e.y), width: `${e.w}%`, zIndex: t },
          "aria-label": `${e.name}, ${e.tier}`,
          children: [
            "torii" !== e.roof &&
              (0, a.jsx)(y, {
                kind: e.roof,
                className: "absolute bottom-[97%] left-[-7%] w-[114%]",
              }),
            (0, a.jsxs)("div", {
              className:
                "jm-board relative flex flex-col items-center justify-center text-center",
              style: {
                aspectRatio: e.ar ?? 1.35,
                gap: "3%",
                border: "3px solid #2b170e",
                borderRadius: 3,
                animationDelay: `${(s % 5) * 0.6}s`,
                background:
                  "repeating-linear-gradient(90deg, rgba(150,90,30,.07) 0 1px, transparent 1px 6px), linear-gradient(180deg,#fff6df 0%,#f8e0b0 100%)",
                boxShadow:
                  "0 0 0 2px #6b3f24, 0 0 28px 9px rgba(255,170,90,.55), 0 6px 14px rgba(0,0,0,.45), inset 0 0 22px rgba(255,190,110,.6)",
              },
              children: [
                (0, a.jsx)("span", {
                  className:
                    "pointer-events-none absolute inset-[3px] border border-[#b98a52]/60",
                  "aria-hidden": "true",
                }),
                (0, a.jsx)("span", {
                  className:
                    "pointer-events-none absolute inset-x-0 top-[6%] h-px bg-[#b98a52]/30",
                  "aria-hidden": "true",
                }),
                (0, a.jsx)("div", {
                  className: "flex items-center justify-center",
                  style: { height: `${e.logoH ?? 46}%`, width: "80%" },
                  children: e.logo
                    ? (0, a.jsx)("img", {
                        src: e.logo,
                        alt: `${e.name} logo`,
                        className: "max-h-full max-w-full object-contain",
                        loading: s < 3 ? "eager" : "lazy",
                        decoding: "async",
                        draggable: !1,
                      })
                    : (0, a.jsx)(g, { name: e.name }),
                }),
                (0, a.jsxs)("figcaption", {
                  className: "flex w-[92%] flex-col items-center",
                  style: { gap: l(0.2) },
                  children: [
                    (0, a.jsx)("span", {
                      className:
                        "leading-tight tracking-[0.14em] text-[#7a5a40]",
                      style: {
                        fontFamily: u,
                        fontSize: "max(6px, 1.7cqw)",
                        textTransform: "uppercase",
                      },
                      children: e.tier,
                    }),
                    (0, a.jsx)("span", {
                      className:
                        "font-bold leading-tight tracking-wide text-[#3a2214]",
                      style: { fontFamily: u, fontSize: "max(8px, 2.5cqw)" },
                      children: e.name,
                    }),
                    (0, a.jsx)("span", {
                      lang: "ja",
                      className: "font-bold leading-tight text-[#8a3b22]",
                      style: {
                        fontFamily: u,
                        fontSize: "max(7px, 2.05cqw)",
                        letterSpacing: "0.08em",
                      },
                      children: e.jp,
                    }),
                  ],
                }),
              ],
            }),
            (0, a.jsx)("div", {
              className:
                "mx-auto h-[5%] min-h-[3px] w-[104%] -translate-x-[2%] rounded-sm",
              style: { background: "#2b170e" },
              "aria-hidden": "true",
            }),
            (0, a.jsxs)("div", {
              className: "flex flex-col items-center",
              "aria-hidden": "true",
              children: [
                (0, a.jsx)("div", {
                  style: {
                    width: "96%",
                    height: l(1.3),
                    background: "#2a1c3a",
                    borderTop: "1px solid #6b4a80",
                  },
                }),
                (0, a.jsx)("div", {
                  style: {
                    width: "112%",
                    height: l(1.5),
                    background: "#1e1330",
                    borderTop: "1px solid #55396a",
                  },
                }),
              ],
            }),
          ],
        });
      }
      function b({ text: e, x: t, y: s }) {
        return (0, a.jsxs)("div", {
          className:
            "absolute z-[15] flex -translate-x-1/2 flex-col items-center",
          style: { left: `${t}%`, top: r(s), width: "7.5%" },
          "aria-hidden": "true",
          children: [
            (0, a.jsx)("div", {
              style: {
                width: "130%",
                height: l(2.6),
                background: "#2a1712",
                clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
              },
            }),
            (0, a.jsx)("div", {
              className: "w-[116%] bg-[#2a1712]",
              style: { height: l(0.9) },
            }),
            (0, a.jsx)("div", {
              className:
                "jm-lantern flex w-full items-center justify-center border-x-2 border-[#3a2217]",
              style: {
                padding: `${l(1.4)} 0`,
                background:
                  "linear-gradient(90deg,#efbd6a,#fff3d0 50%,#efbd6a)",
                boxShadow: "0 0 20px 7px rgba(255,180,90,.55)",
              },
              children: (0, a.jsx)("span", {
                className: "leading-[1.12] text-[#3a1f12]",
                style: {
                  fontFamily: u,
                  fontWeight: 700,
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                  fontSize: "max(9px, 3cqw)",
                  letterSpacing: "0.06em",
                },
                children: e,
              }),
            }),
            (0, a.jsx)("div", {
              className: "w-[116%] bg-[#2a1712]",
              style: { height: l(0.9) },
            }),
            (0, a.jsx)("div", {
              style: {
                width: l(1.2),
                height: l(7),
                background: "linear-gradient(90deg,#1b0f0c,#4a2c20,#1b0f0c)",
              },
            }),
            (0, a.jsx)("div", {
              className: "rounded-sm bg-[#1a1020]",
              style: { width: l(4), height: l(1.2) },
            }),
          ],
        });
      }
      function v({
        cx: e,
        cy: t,
        rx: s,
        ry: r,
        seed: l,
        count: i = 70,
        color: o = h,
      }) {
        let c = m(l),
          d = [];
        for (let l = 0; l < i; l++) {
          let i = Math.PI + c() * Math.PI * 1.15 - 0.075 * Math.PI,
            o = 0.15 + 0.35 * c(),
            h = 0.7 + 0.45 * c();
          d.push(
            (0, a.jsx)(
              "line",
              {
                x1: n(e + Math.cos(i) * s * o),
                y1: n(t + Math.sin(i) * r * o * 0.8),
                x2: n(e + Math.cos(i) * s * h),
                y2: n(t + Math.sin(i) * r * h),
                strokeWidth: n(0.8 + 0.9 * c()),
                opacity: n(0.7 + 0.3 * c()),
              },
              l,
            ),
          );
        }
        return (0, a.jsxs)("g", {
          children: [
            (0, a.jsx)("ellipse", {
              cx: e,
              cy: n(t + 0.1 * r),
              rx: n(0.78 * s),
              ry: n(0.55 * r),
              fill: o,
            }),
            (0, a.jsx)("g", { stroke: o, strokeLinecap: "round", children: d }),
          ],
        });
      }
      let w = [
        { cx: 14, cy: 90, rx: 24, ry: 11, n: 70 },
        { cx: 106, cy: 60, rx: 22, ry: 10, n: 70 },
        { cx: 30, cy: 26, rx: 20, ry: 9, n: 50 },
        { cx: 62, cy: 34, rx: 26, ry: 12, n: 80 },
        { cx: 26, cy: 138, rx: 20, ry: 8, n: 55 },
        { cx: 94, cy: 112, rx: 20, ry: 8, n: 55 },
      ];
      function k({ seed: e }) {
        return (0, a.jsxs)("g", {
          transform: "translate(-63 -200)",
          children: [
            (0, a.jsxs)("g", {
              filter: "url(#sil-rough)",
              children: [
                (0, a.jsx)("path", {
                  d: "M54 200 C58 172 48 150 56 120 C60 96 52 70 58 40 L64 40 C62 72 72 96 66 122 C62 150 72 172 74 200Z",
                  fill: h,
                }),
                (0, a.jsx)("path", {
                  d: "M58 132 C40 128 24 114 8 94 L10 90 C28 108 44 118 60 122Z",
                  fill: h,
                }),
                (0, a.jsx)("path", {
                  d: "M64 98 C82 94 96 82 110 62 L106 60 C92 78 80 86 62 88Z",
                  fill: h,
                }),
                (0, a.jsx)("path", {
                  d: "M60 66 C50 56 40 44 30 28 L34 26 C44 40 54 50 62 56Z",
                  fill: h,
                }),
                (0, a.jsx)("path", {
                  d: "M57 156 C44 154 34 148 22 138 L24 135 C36 144 46 148 58 148Z",
                  fill: h,
                }),
                (0, a.jsx)("path", {
                  d: "M66 130 C78 130 88 124 96 114 L93 111 C86 119 76 122 64 122Z",
                  fill: h,
                }),
              ],
            }),
            (0, a.jsx)("path", {
              d: "M54 196 C58 172 48 150 56 120 C60 96 52 70 58 40",
              fill: "none",
              stroke: "#8a5aa0",
              strokeWidth: "0.9",
              opacity: "0.45",
            }),
            w.map((t, s) =>
              (0, a.jsxs)(
                "g",
                {
                  children: [
                    (0, a.jsx)("g", {
                      transform: "translate(-1.8 -2)",
                      opacity: "0.5",
                      children: (0, a.jsx)(v, {
                        cx: t.cx,
                        cy: t.cy,
                        rx: t.rx,
                        ry: t.ry,
                        seed: e + s,
                        count: t.n,
                        color: "#7a4a8c",
                      }),
                    }),
                    (0, a.jsx)(v, {
                      cx: t.cx,
                      cy: t.cy,
                      rx: t.rx,
                      ry: t.ry,
                      seed: e + s,
                      count: t.n,
                    }),
                  ],
                },
                s,
              ),
            ),
          ],
        });
      }
      function N({ cx: e, cy: t, rx: s, ry: r, seed: l, count: i = 60 }) {
        let o = m(l),
          c = [],
          d = [],
          h = [];
        for (let l = 0; l < i; l++) {
          let i = o() * Math.PI * 2,
            u = Math.sqrt(o()),
            m = n(e + Math.cos(i) * s * u),
            x = n(t + Math.sin(i) * r * u),
            g = n(2.4 + 5.5 * o()),
            f = (x - t) / r,
            y = Math.max(
              0,
              Math.min(4, Math.round(2.4 - 2 * f + (o() - 0.5) * 1.6)),
            );
          (c.push(
            (0, a.jsx)(
              "circle",
              { cx: m, cy: x, r: n(1.3 * g), fill: "#6a2260", opacity: "0.5" },
              `s${l}`,
            ),
          ),
            d.push(
              (0, a.jsx)(
                "circle",
                {
                  cx: m,
                  cy: x,
                  r: g,
                  fill: p[y],
                  opacity: n(0.6 + 0.35 * o()),
                },
                `m${l}`,
              ),
            ),
            f < 0.1 &&
              o() > 0.45 &&
              h.push(
                (0, a.jsx)(
                  "circle",
                  {
                    cx: n(m - 0.25 * g),
                    cy: n(x - 0.3 * g),
                    r: n(0.45 * g),
                    fill: "#fff0f5",
                    opacity: "0.8",
                  },
                  `l${l}`,
                ),
              ));
        }
        return (0, a.jsxs)("g", { children: [c, d, h] });
      }
      function M({ x: e, y: t, len: s, seed: r }) {
        let l = m(r),
          i = Math.round(s / 4.5);
        return (0, a.jsxs)("g", {
          children: [
            (0, a.jsx)("line", {
              x1: e,
              y1: t,
              x2: e,
              y2: t + 0.9 * s,
              stroke: "#241520",
              strokeWidth: "0.7",
              opacity: "0.8",
            }),
            Array.from({ length: i }, (s, r) =>
              (0, a.jsx)(
                "circle",
                {
                  cx: n(e + (l() - 0.5) * 7),
                  cy: n(t + 4.5 * r),
                  r: n(Math.max(1.4, 4.2 - 0.28 * r)),
                  fill: p[1 + Math.floor(4 * l())],
                  opacity: n(0.65 + 0.3 * l()),
                },
                r,
              ),
            ),
          ],
        });
      }
      let $ = [
        { d: "M0 0 C-2 -30 -8 -52 -10 -84", w: 12 },
        { d: "M-10 -84 C-12 -102 -10 -116 -12 -132", w: 8 },
        { d: "M-8 -70 C-30 -80 -52 -88 -66 -104", w: 6 },
        { d: "M-8 -62 C14 -76 38 -90 54 -108", w: 6 },
        { d: "M-12 -112 C-26 -128 -34 -146 -34 -164", w: 4 },
        { d: "M-12 -118 C4 -134 22 -146 32 -162", w: 4 },
        { d: "M-66 -104 C-78 -110 -86 -112 -94 -108", w: 3 },
      ];
      function C({ seed: e }) {
        let t = m(e + 99),
          s = Array.from({ length: 16 }, (e, s) =>
            (0, a.jsx)(
              "ellipse",
              {
                cx: n((t() - 0.5) * 70),
                cy: n(5 * t()),
                rx: n(1.6 + 1.6 * t()),
                ry: "0.9",
                fill: p[2 + Math.floor(3 * t())],
                opacity: n(0.45 + 0.4 * t()),
              },
              s,
            ),
          );
        return (0, a.jsxs)("g", {
          children: [
            (0, a.jsx)("ellipse", {
              cx: "0",
              cy: "2",
              rx: "46",
              ry: "5",
              fill: "#0c0614",
              opacity: "0.5",
            }),
            s,
            (0, a.jsxs)("g", {
              filter: "url(#bark)",
              fill: "#241520",
              stroke: "#241520",
              strokeLinecap: "round",
              children: [
                (0, a.jsx)("path", {
                  d: "M-16 2 C-8 -6 -5 -12 -6 -28 L6 -28 C5 -12 9 -6 18 2Z",
                  stroke: "none",
                }),
                $.map((e) =>
                  (0, a.jsx)(
                    "path",
                    { d: e.d, strokeWidth: e.w, fill: "none" },
                    e.d,
                  ),
                ),
              ],
            }),
            (0, a.jsx)("g", {
              fill: "none",
              stroke: "#8a5878",
              strokeLinecap: "round",
              opacity: "0.55",
              transform: "translate(1.4 -1.2)",
              children: $.map((e) =>
                (0, a.jsx)("path", { d: e.d, strokeWidth: "1" }, e.d),
              ),
            }),
            (0, a.jsxs)("g", {
              filter: "url(#glow-soft)",
              children: [
                (0, a.jsx)(N, {
                  cx: -70,
                  cy: -108,
                  rx: 38,
                  ry: 28,
                  seed: e + 1,
                  count: 60,
                }),
                (0, a.jsx)(N, {
                  cx: 56,
                  cy: -114,
                  rx: 40,
                  ry: 30,
                  seed: e + 2,
                  count: 64,
                }),
                (0, a.jsx)(N, {
                  cx: -12,
                  cy: -142,
                  rx: 56,
                  ry: 40,
                  seed: e,
                  count: 96,
                }),
                (0, a.jsx)(N, {
                  cx: -36,
                  cy: -174,
                  rx: 34,
                  ry: 24,
                  seed: e + 3,
                  count: 50,
                }),
                (0, a.jsx)(N, {
                  cx: 34,
                  cy: -170,
                  rx: 32,
                  ry: 22,
                  seed: e + 4,
                  count: 46,
                }),
                (0, a.jsx)(M, { x: -94, y: -106, len: 32, seed: e + 5 }),
                (0, a.jsx)(M, { x: 86, y: -104, len: 28, seed: e + 6 }),
                (0, a.jsx)(M, { x: -40, y: -98, len: 24, seed: e + 7 }),
                (0, a.jsx)(M, { x: 20, y: -96, len: 20, seed: e + 8 }),
              ],
            }),
          ],
        });
      }
      function S() {
        let e = [0, 1, 2, 3, 4];
        return (0, a.jsxs)("g", {
          children: [
            (0, a.jsxs)("g", {
              fill: h,
              filter: "url(#sil-rough)",
              children: [
                (0, a.jsx)("rect", {
                  x: "-26",
                  y: "-4",
                  width: "52",
                  height: "4",
                }),
                e.map((e) => {
                  let t = 36 - 4 * e,
                    s = -4 - 18 * e;
                  return (0, a.jsxs)(
                    "g",
                    {
                      children: [
                        (0, a.jsx)("rect", {
                          x: n(-(0.34 * t)),
                          y: s - 9,
                          width: n(0.68 * t),
                          height: "9",
                        }),
                        (0, a.jsx)("path", {
                          d: `M${n(-t / 2 - 7)} ${s - 10} Q${n(-(0.3 * t))} ${s - 8} ${n(-(0.16 * t))} ${s - 18} L${n(0.16 * t)} ${s - 18} Q${n(0.3 * t)} ${s - 8} ${n(t / 2 + 7)} ${s - 10} Q0 ${s - 4} ${n(-t / 2 - 7)} ${s - 10}Z`,
                        }),
                      ],
                    },
                    e,
                  );
                }),
                (0, a.jsx)("rect", {
                  x: "-0.8",
                  y: "-124",
                  width: "1.6",
                  height: "30",
                }),
              ],
            }),
            (0, a.jsx)("g", {
              stroke: "#c07ab0",
              strokeWidth: "0.7",
              fill: "none",
              opacity: "0.5",
              children: e.map((e) => {
                let t = 36 - 4 * e,
                  s = -4 - 18 * e;
                return (0, a.jsx)(
                  "path",
                  {
                    d: `M${n(0.16 * t)} ${s - 18} Q${n(0.3 * t)} ${s - 8} ${n(t / 2 + 7)} ${s - 10}`,
                  },
                  e,
                );
              }),
            }),
            (0, a.jsx)("g", {
              fill: "#ffcf7a",
              filter: "url(#glow-soft)",
              children: e.map((e) => {
                let t = 36 - 4 * e,
                  s = -4 - 18 * e;
                return (0, a.jsxs)(
                  "g",
                  {
                    children: [
                      (0, a.jsx)("rect", {
                        x: "-2",
                        y: s - 7,
                        width: "4",
                        height: "5",
                      }),
                      t > 24 &&
                        (0, a.jsx)("rect", {
                          x: n(-(0.25 * t) - 1.5),
                          y: s - 7,
                          width: "3",
                          height: "5",
                        }),
                      t > 24 &&
                        (0, a.jsx)("rect", {
                          x: n(0.25 * t - 1.5),
                          y: s - 7,
                          width: "3",
                          height: "5",
                        }),
                    ],
                  },
                  e,
                );
              }),
            }),
            (0, a.jsx)("circle", {
              cx: "0",
              cy: "-126",
              r: "2",
              fill: "#ffcf7a",
            }),
          ],
        });
      }
      function L() {
        return (0, a.jsxs)("g", {
          children: [
            (0, a.jsx)("rect", {
              x: "-48",
              y: "-2",
              width: "96",
              height: "22",
              fill: "#1b1128",
            }),
            (0, a.jsxs)("g", {
              stroke: "#2e1f42",
              strokeWidth: "0.8",
              children: [
                [4, 10, 16].map((e) =>
                  (0, a.jsx)("line", { x1: "-48", y1: e, x2: "48", y2: e }, e),
                ),
                [-36, -22, -8, 8, 22, 36].map((e) =>
                  (0, a.jsx)("line", { x1: e, y1: "-2", x2: e, y2: "20" }, e),
                ),
              ],
            }),
            (0, a.jsx)("rect", {
              x: "-48",
              y: "-10",
              width: "96",
              height: "9",
              fill: "#2a1b3b",
            }),
            (0, a.jsx)("path", {
              d: "M-48 -10 L48 -10",
              stroke: "#8a5aa0",
              strokeWidth: "1",
              opacity: "0.7",
            }),
            (0, a.jsxs)("g", {
              fill: h,
              filter: "url(#sil-rough)",
              children: [
                (0, a.jsx)("rect", {
                  x: "-30",
                  y: "-36",
                  width: "60",
                  height: "26",
                }),
                (0, a.jsx)("path", {
                  d: "M-54 -33 Q-40 -34 -28 -46 L28 -46 Q40 -34 54 -33 Q0 -24 -54 -33Z",
                }),
                (0, a.jsx)("path", { d: "M-30 -46 L-16 -58 L16 -58 L30 -46Z" }),
              ],
            }),
            (0, a.jsx)("g", {
              fill: "#ffcf7a",
              filter: "url(#glow-soft)",
              children: [-24, -10, 4, 18].map((e) =>
                (0, a.jsx)(
                  "rect",
                  { x: e, y: "-31", width: "9", height: "17" },
                  e,
                ),
              ),
            }),
            (0, a.jsx)("path", {
              d: "M-54 -33 Q-40 -34 -28 -46 L28 -46 Q40 -34 54 -33",
              fill: "none",
              stroke: "#c07ab0",
              strokeWidth: "0.8",
              opacity: "0.55",
            }),
            (0, a.jsx)("path", {
              d: "M-16 -58 L16 -58",
              stroke: "#e3c277",
              strokeWidth: "1.5",
            }),
          ],
        });
      }
      function I() {
        return (0, a.jsxs)("g", {
          children: [
            (0, a.jsx)("circle", {
              cx: "0",
              cy: "-18",
              r: "16",
              fill: "url(#warm)",
            }),
            (0, a.jsxs)("g", {
              fill: "#2a1b3b",
              stroke: "#6b4a80",
              strokeWidth: "0.5",
              children: [
                (0, a.jsx)("rect", {
                  x: "-7",
                  y: "-3",
                  width: "14",
                  height: "3",
                }),
                (0, a.jsx)("rect", {
                  x: "-2.5",
                  y: "-15",
                  width: "5",
                  height: "12",
                }),
                (0, a.jsx)("rect", {
                  x: "-8",
                  y: "-17",
                  width: "16",
                  height: "3",
                }),
                (0, a.jsx)("path", { d: "M-10 -26 L0 -33 L10 -26Z" }),
                (0, a.jsx)("circle", { cx: "0", cy: "-34", r: "1.6" }),
              ],
            }),
            (0, a.jsx)("rect", {
              x: "-5",
              y: "-26",
              width: "10",
              height: "9",
              fill: "#ffcf7a",
            }),
            (0, a.jsx)("path", {
              d: "M0 -26 V-17 M-5 -21.5 H5",
              stroke: "#2a1b3b",
              strokeWidth: "0.8",
            }),
          ],
        });
      }
      function P({ className: e = "", style: t }) {
        return (0, a.jsxs)("svg", {
          viewBox: "0 0 300 230",
          className: `overflow-visible ${e}`,
          style: t,
          "aria-hidden": "true",
          children: [
            (0, a.jsx)("ellipse", {
              cx: "150",
              cy: "120",
              rx: "150",
              ry: "90",
              fill: "#ff8a6a",
              opacity: "0.12",
              filter: "url(#path-glow)",
            }),
            (0, a.jsx)("path", {
              d: "M32 44 L46 44 L45 230 L33 230Z",
              fill: "url(#torii-grad)",
            }),
            (0, a.jsx)("path", {
              d: "M254 44 L268 44 L267 230 L255 230Z",
              fill: "url(#torii-grad)",
            }),
            (0, a.jsx)("path", {
              d: "M32 44 L34.5 44 L34 230 L33 230Z",
              fill: "#ff9a78",
              opacity: "0.35",
            }),
            (0, a.jsx)("path", {
              d: "M254 44 L256.5 44 L256 230 L255 230Z",
              fill: "#ff9a78",
              opacity: "0.35",
            }),
            (0, a.jsx)("rect", {
              x: "26",
              y: "206",
              width: "26",
              height: "24",
              fill: "#17090c",
            }),
            (0, a.jsx)("rect", {
              x: "248",
              y: "206",
              width: "26",
              height: "24",
              fill: "#17090c",
            }),
            (0, a.jsx)("rect", {
              x: "26",
              y: "206",
              width: "26",
              height: "2",
              fill: "#4a2d68",
              opacity: "0.8",
            }),
            (0, a.jsx)("rect", {
              x: "248",
              y: "206",
              width: "26",
              height: "2",
              fill: "#4a2d68",
              opacity: "0.8",
            }),
            (0, a.jsx)("rect", {
              x: "12",
              y: "76",
              width: "276",
              height: "10",
              fill: "url(#torii-beam)",
            }),
            (0, a.jsx)("rect", {
              x: "12",
              y: "76",
              width: "276",
              height: "1.5",
              fill: "#ff9a78",
              opacity: "0.5",
            }),
            (0, a.jsx)("rect", {
              x: "138",
              y: "52",
              width: "24",
              height: "24",
              fill: "#17090c",
            }),
            (0, a.jsx)("rect", {
              x: "141.5",
              y: "55.5",
              width: "17",
              height: "17",
              fill: "none",
              stroke: "#e3c277",
              strokeWidth: "1",
            }),
            (0, a.jsx)("path", {
              d: "M6 34 Q150 8 294 34 L290 52 Q150 28 10 52Z",
              fill: "url(#torii-beam)",
            }),
            (0, a.jsx)("path", {
              d: "M6 34 Q150 8 294 34",
              fill: "none",
              stroke: "#ff9a78",
              strokeWidth: "1",
              opacity: "0.45",
            }),
            (0, a.jsx)("path", {
              d: "M-14 22 Q150 -14 314 22 L304 36 Q150 4 -4 36Z",
              fill: "#17090c",
            }),
            (0, a.jsx)("path", {
              d: "M-14 22 Q150 -14 314 22",
              fill: "none",
              stroke: "#4a2d68",
              strokeWidth: "0.8",
              opacity: "0.7",
            }),
          ],
        });
      }
      function E() {
        let e = m(77),
          t = Array.from({ length: 80 }, (t, s) => ({
            i: s,
            left: n(100 * e()),
            top: n(46 * e() * 0.5070422535211268),
            s: n(1 + 1.8 * e()),
            o: n(0.3 + 0.6 * e()),
            d: n(4 * e()),
          }));
        return (0, a.jsx)("div", {
          className: "pointer-events-none absolute inset-0",
          "aria-hidden": "true",
          children: t.map((e) =>
            (0, a.jsx)(
              "span",
              {
                className: "jm-star absolute rounded-full bg-[#fdf1ff]",
                style: {
                  left: `${e.left}%`,
                  top: `${e.top}%`,
                  width: e.s,
                  height: e.s,
                  "--o": e.o,
                  animationDelay: `${e.d}s`,
                },
              },
              e.i,
            ),
          ),
        });
      }
      function R() {
        let e = m(2026),
          t = ["#f59bc0", "#fbd0e0", "#e86aa6", "#fff0f5"],
          s = Array.from({ length: 72 }, (s, a) => {
            let r = 4 + 9 * e();
            return {
              i: a,
              left: n(100 * e()),
              top: n(1 + 96 * e()),
              w: n(r),
              h: n(0.65 * r),
              rot: Math.round(360 * e()),
              color: t[Math.floor(e() * t.length)],
              op: n(0.4 + 0.5 * e()),
              blur: 1.5 * (r > 10),
              delay: n(6 * e()),
            };
          });
        return (0, a.jsx)("div", {
          className: "pointer-events-none absolute inset-0 z-30",
          "aria-hidden": "true",
          children: s.map((e) =>
            (0, a.jsx)(
              "span",
              {
                className: "jm-petal absolute block",
                style: {
                  left: `${e.left}%`,
                  top: `${e.top}%`,
                  width: e.w,
                  height: e.h,
                  backgroundColor: e.color,
                  opacity: e.op,
                  borderRadius: "100% 0 100% 0",
                  filter: e.blur ? `blur(${e.blur}px)` : void 0,
                  animationDelay: `${e.delay}s`,
                  "--r": `${e.rot}deg`,
                },
              },
              e.i,
            ),
          ),
        });
      }
      function F() {
        let e = m(404),
          t = Array.from({ length: 34 }, (t, s) => ({
            i: s,
            left: n(10 + 80 * e()),
            top: n(8 + 88 * e()),
            delay: n(5 * e()),
          }));
        return (0, a.jsx)("div", {
          className: "pointer-events-none absolute inset-0 z-[12]",
          "aria-hidden": "true",
          children: t.map((e) =>
            (0, a.jsx)(
              "span",
              {
                className: "jm-fly absolute rounded-full bg-[#ffe9a8]",
                style: {
                  left: `${e.left}%`,
                  top: `${e.top}%`,
                  width: 3,
                  height: 3,
                  boxShadow: "0 0 8px 3px rgba(255,214,120,.8)",
                  animationDelay: `${e.delay}s`,
                },
              },
              e.i,
            ),
          ),
        });
      }
      let A = [
          [-1400, 520, -800, 505, -300, 480, -120, 420],
          [-120, 420, 20, 372, 72, 292, 120, 228],
          [120, 228, 165, 170, 210, 126, 255, 114],
          [255, 114, 300, 126, 345, 172, 395, 232],
          [395, 232, 450, 300, 520, 360, 720, 420],
          [720, 420, 1050, 480, 1500, 520, 1800, 540],
        ],
        T =
          `M${A[0][0]} ${A[0][1]}` +
          A.map(
            (e) => ` C${e[2]} ${e[3]} ${e[4]} ${e[5]} ${e[6]} ${e[7]}`,
          ).join(""),
        z = `${T} L1800 1420 L-1400 1420Z`,
        D = [];
      function U(e) {
        for (let t = 0; t < D.length - 1; t++) {
          let [s, a] = D[t],
            [n, r] = D[t + 1];
          if (e >= s && e <= n) return a + ((r - a) * (e - s)) / (n - s || 1);
        }
        return 540;
      }
      function O(e, t, s, a, r, l) {
        let i = m(l),
          o = "",
          c = e;
        for (; c < t;) {
          let e = 7 + 6 * i() + 0.1 * r,
            t = a + i() * (r - a),
            l = U(c) + s + (i() - 0.5) * 4;
          ((o += `M${n(c - e / 2)} ${n(l)}L${n(c - 0.2 * e)} ${n(l - 0.45 * t)}L${n(c - 0.32 * e)} ${n(l - 0.45 * t)}L${n(c)} ${n(l - t)}L${n(c + 0.32 * e)} ${n(l - 0.45 * t)}L${n(c + 0.2 * e)} ${n(l - 0.45 * t)}L${n(c + e / 2)} ${n(l)}Z`),
            (c += e * (0.55 + 0.5 * i())));
        }
        return o;
      }
      A.forEach((e) => {
        for (let t = 0; t < 24; t++) {
          let s = t / 24,
            a = 1 - s;
          D.push([
            a * a * a * e[0] +
              3 * a * a * s * e[2] +
              3 * a * s * s * e[4] +
              s * s * s * e[6],
            a * a * a * e[1] +
              3 * a * a * s * e[3] +
              3 * a * s * s * e[5] +
              s * s * s * e[7],
          ]);
        }
      });
      let W = [
          { off: 2, h: [14, 26], fill: "#4a2d68" },
          { off: 30, h: [18, 34], fill: "#392254" },
          { off: 66, h: [24, 44], fill: "#2a1840" },
          { off: 112, h: [30, 56], fill: "#190e2a" },
        ].map((e, t) => ({
          fill: e.fill,
          d:
            O(-760, 108, e.off, e.h[0], e.h[1], 300 + 7 * t) +
            O(388, 1100, e.off, e.h[0], e.h[1], 400 + 7 * t),
        })),
        B = [
          { x: -90, s: 0.62 },
          { x: -20, s: 0.55 },
          { x: 34, s: 0.5 },
          { x: 116, s: 0.42 },
          { x: 352, s: 0.4 },
          { x: 430, s: 0.52 },
          { x: 520, s: 0.6 },
          { x: 640, s: 0.66 },
        ],
        Z = [
          { x: -10, y: 470, s: 0.8, seed: 30, flip: !1 },
          { x: 402, y: 452, s: 0.78, seed: 70, flip: !0 },
          { x: 520, y: 520, s: 0.9, seed: 130, flip: !0 },
          { x: -150, y: 500, s: 0.9, seed: 150, flip: !1 },
          { x: -12, y: 800, s: 0.85, seed: 210, flip: !1 },
          { x: 404, y: 930, s: 0.85, seed: 230, flip: !0 },
          { x: -8, y: 1070, s: 0.9, seed: 250, flip: !1 },
          { x: 404, y: 1200, s: 0.85, seed: 270, flip: !0 },
          { x: -10, y: 1330, s: 0.9, seed: 290, flip: !1 },
          { x: 520, y: 1010, s: 0.9, seed: 310, flip: !0 },
          { x: -150, y: 1120, s: 0.9, seed: 330, flip: !1 },
        ],
        G = [
          { x: -6, y: 1442, s: 1, seed: 10, flip: !1 },
          { x: 442, y: 1444, s: 0.95, seed: 50, flip: !0 },
        ],
        V = [
          { x: 92, y: 462, s: 0.9 },
          { x: 346, y: 470, s: 0.9 },
          { x: 298, y: 626, s: 0.9 },
          { x: 196, y: 262, s: 0.8 },
          { x: 70, y: 720, s: 0.9 },
          { x: 340, y: 885, s: 0.9 },
          { x: 60, y: 1030, s: 0.9 },
          { x: 350, y: 1135, s: 0.9 },
          { x: 90, y: 1260, s: 0.9 },
        ],
        H = [187, 360, 533, 706, 879, 1052, 1225, 1360],
        Q = (e, t, s, a = !1) =>
          `translate(${e} ${t}) scale(${a ? -s : s} ${s})`,
        q = "0 0 400 1420";
      function Y() {
        let e = m(61),
          t = Array.from({ length: 34 }, (t, s) => ({
            i: s,
            x: n(1600 * e()),
            y: n(668 + 40 * e()),
            o: n(0.4 + 0.5 * e()),
          }));
        return (0, a.jsxs)("svg", {
          viewBox: "0 0 1600 900",
          preserveAspectRatio: "xMidYMax slice",
          className: "pointer-events-none absolute inset-0 h-full w-full",
          "aria-hidden": "true",
          children: [
            (0, a.jsxs)("defs", {
              children: [
                (0, a.jsxs)("linearGradient", {
                  id: "far1",
                  x1: "0",
                  y1: "0",
                  x2: "0",
                  y2: "1",
                  children: [
                    (0, a.jsx)("stop", {
                      offset: "0",
                      stopColor: "#c795cf",
                      stopOpacity: "0.55",
                    }),
                    (0, a.jsx)("stop", {
                      offset: "1",
                      stopColor: "#6a4a86",
                      stopOpacity: "0.15",
                    }),
                  ],
                }),
                (0, a.jsxs)("linearGradient", {
                  id: "far2",
                  x1: "0",
                  y1: "0",
                  x2: "0",
                  y2: "1",
                  children: [
                    (0, a.jsx)("stop", {
                      offset: "0",
                      stopColor: "#7a5496",
                      stopOpacity: "0.85",
                    }),
                    (0, a.jsx)("stop", {
                      offset: "1",
                      stopColor: "#35204c",
                      stopOpacity: "0.9",
                    }),
                  ],
                }),
                (0, a.jsxs)("linearGradient", {
                  id: "mist-band",
                  x1: "0",
                  y1: "0",
                  x2: "0",
                  y2: "1",
                  children: [
                    (0, a.jsx)("stop", {
                      offset: "0",
                      stopColor: "#f3b6d4",
                      stopOpacity: "0",
                    }),
                    (0, a.jsx)("stop", {
                      offset: "0.5",
                      stopColor: "#f3b6d4",
                      stopOpacity: "0.2",
                    }),
                    (0, a.jsx)("stop", {
                      offset: "1",
                      stopColor: "#f3b6d4",
                      stopOpacity: "0",
                    }),
                  ],
                }),
              ],
            }),
            (0, a.jsxs)("g", {
              filter: "url(#mtn-soft)",
              children: [
                (0, a.jsx)("path", {
                  d: "M0 900 V500 L80 460 L150 490 L230 430 L300 470 L380 440 L470 480 L560 440 L650 480 L740 450 L830 490 L930 450 L1010 480 L1090 440 C1130 430 1170 390 1210 340 L1250 335 C1290 385 1330 430 1380 470 L1470 450 L1540 480 L1600 460 V900Z",
                  fill: "url(#far1)",
                }),
                (0, a.jsx)("path", {
                  d: "M1196 352 L1210 340 L1250 335 L1262 346 L1248 362 L1238 352 L1226 368 L1214 354 L1204 366Z",
                  fill: "#ffe8f2",
                  opacity: "0.85",
                }),
              ],
            }),
            (0, a.jsx)("rect", {
              x: "0",
              y: "430",
              width: "1600",
              height: "150",
              fill: "url(#mist-band)",
            }),
            (0, a.jsx)("path", {
              d: "M0 900 V570 L100 530 L190 565 L290 515 L380 555 L480 525 L570 565 L690 530 L790 575 L900 535 L1000 570 L1110 525 L1210 565 L1320 530 L1420 570 L1520 540 L1600 560 V900Z",
              fill: "url(#far2)",
            }),
            (0, a.jsx)("rect", {
              x: "0",
              y: "540",
              width: "1600",
              height: "140",
              fill: "url(#mist-band)",
            }),
            (0, a.jsx)("path", {
              d: "M0 900 V650 C200 610 400 660 600 630 C800 600 1000 650 1200 620 C1400 595 1500 630 1600 610 V900Z",
              fill: "#1d1230",
            }),
            t.map((e) =>
              (0, a.jsx)(
                "circle",
                { cx: e.x, cy: e.y, r: "1.2", fill: "#ffd98a", opacity: e.o },
                e.i,
              ),
            ),
          ],
        });
      }
      function X() {
        return (0, a.jsxs)("svg", {
          viewBox: q,
          className: "pointer-events-none absolute inset-0 z-[3] h-full w-full",
          style: { overflow: "visible" },
          "aria-hidden": "true",
          children: [
            (0, a.jsxs)("defs", {
              children: [
                (0, a.jsxs)("linearGradient", {
                  id: "hill-grad",
                  gradientUnits: "userSpaceOnUse",
                  x1: "0",
                  y1: "110",
                  x2: "0",
                  y2: "720",
                  children: [
                    (0, a.jsx)("stop", { offset: "0", stopColor: "#7a4a92" }),
                    (0, a.jsx)("stop", {
                      offset: "0.35",
                      stopColor: "#4a2d66",
                    }),
                    (0, a.jsx)("stop", { offset: "1", stopColor: "#1a1028" }),
                  ],
                }),
                (0, a.jsxs)("radialGradient", {
                  id: "hill-moonlit",
                  gradientUnits: "userSpaceOnUse",
                  cx: "360",
                  cy: "150",
                  r: "380",
                  children: [
                    (0, a.jsx)("stop", {
                      offset: "0",
                      stopColor: "#ffb0d0",
                      stopOpacity: "0.32",
                    }),
                    (0, a.jsx)("stop", {
                      offset: "1",
                      stopColor: "#ffb0d0",
                      stopOpacity: "0",
                    }),
                  ],
                }),
                (0, a.jsx)("clipPath", {
                  id: "hill-clip",
                  children: (0, a.jsx)("path", { d: z }),
                }),
              ],
            }),
            (0, a.jsx)("path", { d: z, fill: "url(#hill-grad)" }),
            (0, a.jsxs)("g", {
              clipPath: "url(#hill-clip)",
              children: [
                (0, a.jsx)("path", { d: z, fill: "url(#hill-moonlit)" }),
                [46, 110, 190, 280, 390, 510, 640, 780, 930, 1090, 1250].map(
                  (e) =>
                    (0, a.jsx)(
                      "path",
                      {
                        d: T,
                        transform: `translate(0 ${e})`,
                        fill: "none",
                        stroke: "#d79ac8",
                        strokeWidth: "1.2",
                        opacity: n(Math.max(0.04, 0.16 - 4e-4 * e)),
                      },
                      e,
                    ),
                ),
              ],
            }),
            (0, a.jsx)("path", {
              d: T,
              fill: "none",
              stroke: "#f08fbf",
              strokeWidth: "1.3",
              opacity: "0.4",
            }),
            (0, a.jsx)("path", {
              d: T,
              fill: "none",
              stroke: "#ffd6e8",
              strokeWidth: "0.7",
              opacity: "0.35",
              transform: "translate(0 -0.8)",
            }),
            W.map((e, t) => (0, a.jsx)("path", { d: e.d, fill: e.fill }, t)),
            (0, a.jsx)("g", {
              transform: Q(86, 272, 0.78),
              children: (0, a.jsx)(S, {}),
            }),
            (0, a.jsx)("g", {
              transform: Q(380, 218, 0.46),
              children: (0, a.jsx)(S, {}),
            }),
            (0, a.jsx)("g", {
              transform: Q(64, 386, 0.7),
              children: (0, a.jsx)(L, {}),
            }),
            (0, a.jsx)("g", {
              transform: Q(62, 962, 0.6),
              children: (0, a.jsx)(S, {}),
            }),
            (0, a.jsx)("g", {
              transform: Q(382, 1022, 0.5),
              children: (0, a.jsx)(S, {}),
            }),
            (0, a.jsx)("g", {
              transform: Q(64, 1198, 0.6),
              children: (0, a.jsx)(L, {}),
            }),
          ],
        });
      }
      function K() {
        return (0, a.jsxs)("svg", {
          viewBox: q,
          className: "pointer-events-none absolute inset-0 z-[6] h-full w-full",
          style: { overflow: "visible" },
          "aria-hidden": "true",
          children: [
            B.map((e) =>
              (0, a.jsx)(
                "g",
                {
                  transform: Q(e.x, U(e.x) + 3, e.s),
                  children: (0, a.jsx)(k, { seed: 500 + e.x }),
                },
                e.x,
              ),
            ),
            V.map((e) =>
              (0, a.jsx)(
                "g",
                { transform: Q(e.x, e.y, e.s), children: (0, a.jsx)(I, {}) },
                `${e.x}-${e.y}`,
              ),
            ),
            Z.map((e) =>
              (0, a.jsx)(
                "g",
                {
                  transform: Q(e.x, e.y, e.s, e.flip),
                  children: (0, a.jsx)(C, { seed: e.seed }),
                },
                e.seed,
              ),
            ),
          ],
        });
      }
      function _() {
        return (0, a.jsx)("svg", {
          viewBox: q,
          className:
            "pointer-events-none absolute inset-0 z-[28] h-full w-full",
          style: { overflow: "visible" },
          "aria-hidden": "true",
          children: G.map((e) =>
            (0, a.jsx)(
              "g",
              {
                transform: Q(e.x, e.y, e.s, e.flip),
                children: (0, a.jsx)(C, { seed: e.seed }),
              },
              e.seed,
            ),
          ),
        });
      }
      function J({ y: e, className: t = "" }) {
        return (0, a.jsx)("div", {
          className: `pointer-events-none absolute rounded-[50%] bg-[#f3b6d4]/15 blur-3xl ${t}`,
          style: { top: r(e) },
          "aria-hidden": "true",
        });
      }
      function ee() {
        return (0, a.jsxs)("main", {
          className: "relative flow-root shrink-0 overflow-hidden text-white",
          style: {
            background:
              "linear-gradient(180deg,#120b24 0%,#2a1a47 13%,#6a3466 24%,#3d2252 34%,#1d1230 44%,#0a0610 100%)",
          },
          children: [
            (0, a.jsx)(x, {}),
            (0, a.jsx)(E, {}),
            (0, a.jsx)("div", {
              className: "pointer-events-none absolute inset-0",
              style: {
                background:
                  "radial-gradient(ellipse 75% 22% at 55% 16%, rgba(255,140,180,0.3), transparent)",
              },
            }),
            (0, a.jsx)("div", {
              className: "pointer-events-none absolute inset-x-0 top-0",
              style: { height: `${n(50.70422535211267)}%` },
              children: (0, a.jsx)(Y, {}),
            }),
            (0, a.jsxs)("div", {
              className: "relative mx-auto w-full max-w-[560px]",
              style: {
                aspectRatio: "400 / 1420",
                containerType: "inline-size",
              },
              children: [
                (0, a.jsxs)("div", {
                  className: "absolute z-[2] aspect-square rounded-full",
                  style: {
                    left: "62%",
                    top: r(25),
                    width: "30%",
                    background:
                      "radial-gradient(circle at 40% 35%,#fffaf0 0%,#f6dfd0 50%,#e0bcb0 100%)",
                    boxShadow:
                      "0 0 40px 10px rgba(255,214,200,.45), 0 0 140px 60px rgba(255,170,200,.22)",
                  },
                  "aria-hidden": "true",
                  children: [
                    (0, a.jsx)("span", {
                      className: "absolute rounded-full bg-[#c9a395]/30",
                      style: {
                        left: "20%",
                        top: "30%",
                        width: "20%",
                        height: "20%",
                      },
                    }),
                    (0, a.jsx)("span", {
                      className: "absolute rounded-full bg-[#c9a395]/25",
                      style: {
                        left: "56%",
                        top: "52%",
                        width: "26%",
                        height: "26%",
                      },
                    }),
                    (0, a.jsx)("span", {
                      className: "absolute rounded-full bg-[#c9a395]/20",
                      style: {
                        left: "42%",
                        top: "12%",
                        width: "14%",
                        height: "14%",
                      },
                    }),
                    (0, a.jsx)("span", {
                      className: "absolute rounded-full bg-[#c9a395]/20",
                      style: {
                        left: "24%",
                        top: "66%",
                        width: "12%",
                        height: "12%",
                      },
                    }),
                  ],
                }),
                (0, a.jsx)("p", {
                  className: "absolute z-[3] text-white",
                  style: {
                    fontFamily: u,
                    fontWeight: 700,
                    right: "1.5%",
                    top: r(36),
                    writingMode: "vertical-rl",
                    textOrientation: "upright",
                    fontSize: l(6.4),
                    letterSpacing: "0.1em",
                    textShadow: "0 0 12px rgba(0,0,0,.6)",
                  },
                  "aria-hidden": "true",
                  children: "共に創る",
                }),
                (0, a.jsx)(X, {}),
                H.map((e) =>
                  (0, a.jsx)(
                    J,
                    { y: e, className: "z-[4] left-[-90%] h-32 w-[280%]" },
                    e,
                  ),
                ),
                (0, a.jsx)("svg", {
                  viewBox: q,
                  preserveAspectRatio: "none",
                  className:
                    "pointer-events-none absolute inset-0 z-[5] h-full w-full",
                  "aria-hidden": "true",
                  children: (0, a.jsxs)("g", {
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                      (0, a.jsx)("path", {
                        d: d,
                        stroke: "#1a0f26",
                        strokeWidth: "24",
                        opacity: "0.55",
                      }),
                      (0, a.jsx)("path", {
                        d: d,
                        stroke: "#f0a9d0",
                        strokeWidth: "18",
                        filter: "url(#path-glow)",
                        opacity: "0.65",
                      }),
                      (0, a.jsx)("path", {
                        d: d,
                        stroke: "#e98fbd",
                        strokeWidth: "13",
                      }),
                      (0, a.jsx)("path", {
                        d: d,
                        stroke: "#f9d3e6",
                        strokeWidth: "9",
                      }),
                      (0, a.jsx)("path", {
                        d: d,
                        stroke: "#fff6fa",
                        strokeWidth: "2",
                        strokeDasharray: "0.1 9",
                        opacity: "0.95",
                      }),
                    ],
                  }),
                }),
                (0, a.jsx)(K, {}),
                (0, a.jsx)(P, {
                  className: "pointer-events-none absolute z-[8]",
                  style: { left: "36%", top: r(61), width: "50%" },
                }),
                (0, a.jsx)(F, {}),
                o.map((e) => (0, a.jsx)(b, { ...e }, e.text)),
                i.map((e, t) =>
                  (0, a.jsx)(j, { s: e, z: 20 + t, index: t }, e.name),
                ),
                (0, a.jsx)(_, {}),
                (0, a.jsx)("div", {
                  className:
                    "pointer-events-none absolute z-[24] rounded-full bg-[#0e0820]/55 blur-2xl",
                  style: {
                    left: "-4%",
                    top: r(14),
                    width: "58%",
                    height: r(173),
                  },
                  "aria-hidden": "true",
                }),
                (0, a.jsxs)("header", {
                  className: "absolute z-[25]",
                  style: { left: "5%", top: r(40) },
                  children: [
                    (0, a.jsxs)("h1", {
                      className: "font-bold leading-[1.05] text-white",
                      style: {
                        fontFamily: u,
                        fontSize: l(8.6),
                        textShadow:
                          "0 0 18px rgba(255,170,210,.5), 0 2px 4px rgba(0,0,0,.5)",
                      },
                      children: ["Our", (0, a.jsx)("br", {}), "Sponsors"],
                    }),
                    (0, a.jsx)("p", {
                      style: {
                        fontFamily: u,
                        marginTop: l(2.4),
                        fontSize: l(3.2),
                        lineHeight: 1.4,
                        maxWidth: l(30),
                        color: "#eadcf5",
                        textShadow: "0 1px 6px rgba(0,0,0,.7)",
                      },
                      children:
                        "Partners in culture, creativity, and community.",
                    }),
                  ],
                }),
                (0, a.jsx)(R, {}),
                (0, a.jsx)("div", {
                  className:
                    "pointer-events-none absolute inset-x-0 bottom-0 z-[31] bg-gradient-to-t from-[#0a0610] to-transparent",
                  style: { height: r(90) },
                }),
              ],
            }),
            (0, a.jsx)("div", {
              className:
                "pointer-events-none absolute inset-0 z-[40] opacity-[0.14] mix-blend-overlay",
              style: {
                backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>')}")`,
              },
              "aria-hidden": "true",
            }),
            (0, a.jsx)("div", {
              className:
                "pointer-events-none absolute inset-0 z-[41] bg-[radial-gradient(ellipse_at_50%_45%,transparent_55%,rgba(8,4,16,0.55)_100%)]",
              "aria-hidden": "true",
            }),
          ],
        });
      }
    },
    75747: (e, t, s) => {
      "use strict";
      s.d(t, { ContactDestination: () => r });
      var a = s(95155),
        n = s(30188);
      function r() {
        return (0, a.jsxs)("div", {
          className: "dest-page",
          children: [
            (0, a.jsx)("header", {
              className: "dest-hero",
              children: (0, a.jsx)("div", {
                className: "dest-wrap",
                children: (0, a.jsxs)("div", {
                  className: "dest-hero-inner",
                  children: [
                    (0, a.jsx)("img", {
                      src: "/pecfest-logo-transparent.webp",
                      alt: "",
                      className: "dest-logo",
                      width: 92,
                      height: 92,
                      decoding: "async",
                    }),
                    (0, a.jsx)("span", {
                      className: "dest-eyebrow",
                      children: "The Imperial Courier",
                    }),
                    (0, a.jsx)("h1", {
                      className: "dest-title",
                      children: "Contact",
                    }),
                    (0, a.jsx)("p", {
                      className: "dest-lead",
                      children:
                        "Reach out to the organizing secretariat, faculty convenors, and student directorate of PECFEST 2026.",
                    }),
                  ],
                }),
              }),
            }),
            (0, a.jsx)("section", {
              className: "dest-section",
              children: (0, a.jsxs)("div", {
                className: "dest-wrap",
                children: [
                  (0, a.jsx)("h2", {
                    className: "dest-section-title",
                    children: "Ways to reach us",
                  }),
                  (0, a.jsxs)("div", {
                    className: "dest-channels",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "dest-channel",
                        children: [
                          (0, a.jsx)("span", {
                            className: "dest-channel-label",
                            children: "Campus Headquarters",
                          }),
                          (0, a.jsx)("strong", {
                            children: "Punjab Engineering College",
                          }),
                          (0, a.jsx)("p", {
                            children:
                              "Sector 12, Chandigarh — 160012, India. Deemed to be University.",
                          }),
                          (0, a.jsx)("p", {
                            className: "dest-note",
                            children: (0, a.jsxs)("a", {
                              className: "dest-contact-link",
                              href: n.F.mapsUrl,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              children: [
                                "View on map ",
                                (0, a.jsx)("span", {
                                  "aria-hidden": "true",
                                  children: "↗",
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "dest-channel",
                        children: [
                          (0, a.jsx)("span", {
                            className: "dest-channel-label",
                            children: "Electronic Mail",
                          }),
                          (0, a.jsx)("strong", {
                            children: "General & Sponsorship",
                          }),
                          (0, a.jsx)("p", {
                            children: (0, a.jsx)("a", {
                              className: "dest-contact-link",
                              href: `mailto:${n.F.email}`,
                              children: n.F.email,
                            }),
                          }),
                          (0, a.jsx)("p", {
                            className: "dest-note",
                            children: "Direct response within 24–48 hours.",
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "dest-channel",
                        children: [
                          (0, a.jsx)("span", {
                            className: "dest-channel-label",
                            children: "Helpline",
                          }),
                          (0, a.jsx)("strong", { children: "Festival Desk" }),
                          (0, a.jsx)("p", {
                            children: (0, a.jsx)("a", {
                              className: "dest-contact-link",
                              href: `tel:${n.F.helpline.replace(/[^+\d]/g, "")}`,
                              children: n.F.helpline,
                            }),
                          }),
                          (0, a.jsxs)("p", {
                            className: "dest-note",
                            children: [
                              "Aashish Sachdeva:",
                              " ",
                              (0, a.jsx)("a", {
                                className: "dest-contact-link",
                                href: `tel:${n.F.emergencyDesk.replace(/[^+\d]/g, "")}`,
                                children: n.F.emergencyDesk,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "dest-channel",
                        children: [
                          (0, a.jsx)("span", {
                            className: "dest-channel-label",
                            children: "Social",
                          }),
                          (0, a.jsx)("strong", {
                            children: "Follow the Festival",
                          }),
                          (0, a.jsx)("p", {
                            children: (0, a.jsxs)("a", {
                              className: "dest-contact-link",
                              href: n.F.instagramUrl,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              children: [
                                n.F.instagram,
                                " ",
                                (0, a.jsx)("span", {
                                  "aria-hidden": "true",
                                  children: "↗",
                                }),
                              ],
                            }),
                          }),
                          (0, a.jsx)("p", {
                            className: "dest-note",
                            children:
                              "Announcements, line-ups, and behind the scenes.",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        });
      }
      s(29185);
    },
    91850: (e, t, s) => {
      "use strict";
      s.d(t, { CalendarDestination: () => D });
      var a = s(95155),
        n = s(12115),
        r = s(98500),
        l = s.n(r),
        i = s(73321),
        o = s(77976);
      let c = (e, t) =>
          new Date(Date.parse(`${e}T00:00:00Z`) + 864e5 * t)
            .toISOString()
            .slice(0, 10),
        d = c("2026-10-30", -3);
      var h = s(47960);
      let p = "pecfest:my-path:v1";
      function u(e) {
        let t = [],
          s = new Set();
        for (let a of e) {
          if ("string" != typeof a) continue;
          let e = a.trim();
          if (
            !(!e || e.length > 200 || e.includes(",") || s.has(e)) &&
            (s.add(e), t.push(e), t.length >= 200)
          )
            break;
        }
        return t;
      }
      let m = "plan";
      function x(e, t) {
        return e.endUnknown || t.endUnknown
          ? e.startMin === t.startMin
          : e.startMin < t.endMin && t.startMin < e.endMin;
      }
      function g(e, t) {
        return new Date(Date.parse(`${e}T00:00:00.000Z`) - 198e5 + 6e4 * t)
          .toISOString()
          .replace(/[-:]/g, "")
          .replace(/\.\d{3}/, "");
      }
      let f = (e) =>
        e
          .replace(/\\/g, "\\\\")
          .replace(/;/g, "\\;")
          .replace(/,/g, "\\,")
          .replace(/\r?\n/g, "\\n");
      function y(e) {
        let t = new TextEncoder(),
          s = [],
          a = "",
          n = 0;
        for (let r of e) {
          let e = t.encode(r).length;
          (n + e > (0 === s.length ? 75 : 74) && (s.push(a), (a = ""), (n = 0)),
            (a += r),
            (n += e));
        }
        return (s.push(a), s.join("\r\n "));
      }
      let j = (e, t) =>
        !e.endUnknown &&
        e.startMin >= t.start &&
        e.endMin <= t.end &&
        e.endMin > e.startMin;
      function b(e, t) {
        let s = [],
          a = e.paths.filter((e) => t.savedPaths.has(e));
        if (
          (a.length &&
            s.push(
              `Matches your saved ${a.map((e) => t.pathLabels[e] ?? e).join(" and ")} events`,
            ),
          !e.venueUnknown)
        ) {
          let a = e.venue.trim().toLowerCase();
          for (let e of [t.before, t.after])
            if (e && !e.venueUnknown && e.venue.trim().toLowerCase() === a) {
              s.push(`Same venue as ${e.name}`);
              break;
            }
        }
        return s;
      }
      function v(e, t) {
        let s = (e) => +!!e.paths.some((e) => t.has(e));
        return [...e].sort(
          (e, t) =>
            s(t) - s(e) ||
            e.startMin - t.startMin ||
            e.name.localeCompare(t.name),
        );
      }
      function w(e, t, s, a) {
        return v(
          t.filter((t) => t.rowId !== e.rowId && !s.has(t.rowId) && x(e, t)),
          a,
        );
      }
      let k = [
          { id: "30", label: "30 min", minutes: 30 },
          { id: "60", label: "1 hour", minutes: 60 },
          { id: "120", label: "2 hours", minutes: 120 },
          { id: "rest", label: "Rest of the day", minutes: null },
        ],
        N = Array.from({ length: 29 }, (e, t) => 480 + 30 * t),
        M = ["cultural", "technical", "literary", "performing", "gaming"];
      function $(e) {
        return (e ?? "")
          .normalize("NFKD")
          .replace(/[̀-ͯ]/g, "")
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim();
      }
      let C = (e) => $(e).split(" ").filter(Boolean);
      function S(e, t) {
        if (0 === t.length) return !0;
        let s = e.map($).join(" \0 ");
        return t.every((e) => s.includes(e));
      }
      function L(e, t) {
        if (0 === t.length) return !0;
        let s = e.flatMap((e) => $(e).split(/[\s\-_/()·,.]+/)).filter(Boolean);
        return t.every((e) => s.some((t) => t.startsWith(e)));
      }
      let I = (e, t) => {
        let s = $(e);
        return t.length && s.startsWith(t.join(" "))
          ? 0
          : t.length && s.split(" ").some((e) => e.startsWith(t[0]))
            ? 1
            : 2;
      };
      function P(e, t, s = 60) {
        return !e.endUnknown && e.startMin <= t && t < e.endMin
          ? { kind: "live" }
          : e.startMin > t && e.startMin - t <= s
            ? { kind: "soon", inMin: e.startMin - t }
            : null;
      }
      let E = (e) => e.trim().toLowerCase(),
        R = ["#e3b04b", "#7fa7e8", "#b79be0", "#e0837a", "#8cc4ad", "#e0a77c"],
        F = {
          technical: "Technical",
          cultural: "Cultural",
          convenor: "Convenor",
          gaming: "Gaming",
          other: "Event",
        },
        A = {
          technical: "技",
          cultural: "華",
          convenor: "統",
          gaming: "勝",
          other: "✦",
        },
        T = Object.fromEntries(h.R7.map((e) => [e.id, e.label])),
        z = (e) => (/^(https?:\/\/|\/(?!\/))/i.test(e) ? e : "");
      function D({ days: e }) {
        let [t, s] = (0, n.useState)(null),
          r = (0, n.useMemo)(
            () =>
              t
                ? e.filter((e) =>
                    (function (e, t, s = !0) {
                      return (
                        !(e > "2026-11-01") && (e >= d || (s && e >= c(t, -1)))
                      );
                    })(e.key, t.key, e.entries.length > 0),
                  )
                : e,
            [e, t?.key],
          ),
          k = Math.max(
            0,
            r.findIndex((e) => !e.isPreFest),
          ),
          [M, $] = (0, n.useState)(r[k]?.key ?? ""),
          [R, q] = (0, n.useState)(""),
          [X, er] = (0, n.useState)("all"),
          [el, ei] = (0, n.useState)(!1),
          [eo, ec] = (0, n.useState)(null),
          [ed, eh] = (0, n.useState)("venue"),
          [ep, eu] = (0, n.useState)(null),
          [em, ex] = (0, n.useState)(() =>
            Math.max(0, Math.min(k, Math.max(0, r.length - 3))),
          ),
          [eg, ef] = (0, n.useState)(null),
          ey = (0, n.useRef)(!1),
          [ej, eb] = (0, n.useState)([]),
          [ev, ew] = (0, n.useState)(!1),
          [ek, eN] = (0, n.useState)(!1),
          [eM, e$] = (0, n.useState)([]),
          [eC, eS] = (0, n.useState)(!1),
          [eL, eI] = (0, n.useState)(null),
          [eP, eE] = (0, n.useState)("list"),
          [eR, eF] = (0, n.useState)(!1),
          [eA, eT] = (0, n.useState)("60"),
          [ez, eD] = (0, n.useState)(600),
          [eU, eO] = (0, n.useState)(0),
          [eW, eB] = (0, n.useState)(!1),
          [eZ, eG] = (0, n.useState)(() => new Set()),
          eV = (0, i.useRouter)(),
          [eH, eQ] = (0, n.useState)(null),
          [eq, eY] = (0, n.useState)(""),
          eX = (0, n.useRef)(null);
        (0, n.useEffect)(() => {
          try {
            eB("1" === window.localStorage.getItem(Y));
          } catch {}
          let e = () => {
            try {
              eb(
                (function (e) {
                  let t;
                  if (!e) return [];
                  try {
                    t = JSON.parse(e);
                  } catch {
                    return [];
                  }
                  return Array.isArray(t) ? u(t) : [];
                })(window.localStorage.getItem(p)),
              );
            } catch {}
          };
          e();
          let t = (t) => {
            t.key === p && e();
          };
          return (
            window.addEventListener("storage", t),
            () => window.removeEventListener("storage", t)
          );
        }, []);
        let eK = (e) => {
          eb(e);
          try {
            window.localStorage.setItem(p, JSON.stringify(e));
          } catch {}
        };
        ((0, n.useEffect)(() => {
          let e,
            t = new URLSearchParams(window.location.search),
            s = t.get("day"),
            a = r[k]?.key ?? "";
          if (s) {
            let e = r.findIndex((e) => e.key === s);
            e >= 0 &&
              ($(s),
              ex(Math.max(0, Math.min(e, Math.max(0, r.length - 3)))),
              (a = s));
          }
          let n = (function (e) {
            let t = /^(\d{1,4})-(\d{1,4})$/.exec((e ?? "").trim());
            if (!t) return null;
            let s = Number(t[1]),
              a = Number(t[2]);
            return s < 0 || a > 1440 || a - s < 30
              ? null
              : { start: s, end: a };
          })(t.get("gap"));
          (n && a && eQ({ day: a, gap: n }), q(t.get("q") ?? ""));
          let l = t.get("cat");
          ((0, h.Jf)(l) && er(l),
            ec(t.get("venue") || null),
            "1" === t.get("free") && ei(!0));
          let i = t.get("view");
          (("time" === i || "map" === i) && eh(i),
            "1" === t.get("mine") && ew(!0),
            "1" === t.get("soon") && eN(!0));
          let o = new Set(r.flatMap((e) => e.entries.map((e) => e.rowId))),
            c = ((e = t.get(m)) ? u(e.split(",")) : []).filter((e) => o.has(e));
          (c.length && (e$(c), "1" === t.get("shared") && eS(!0)),
            (ey.current = !0));
        }, []),
          (0, n.useEffect)(() => {
            if (!ey.current) return;
            let e = new URLSearchParams();
            (M && M !== r[k]?.key && e.set("day", M),
              R.trim() && e.set("q", R.trim()),
              "all" !== X && e.set("cat", X),
              eo && e.set("venue", eo),
              el && e.set("free", "1"),
              "venue" !== ed && e.set("view", ed),
              ev && e.set("mine", "1"),
              ek && e.set("soon", "1"),
              eM.length && e.set(m, eM.join(",")),
              eC && eM.length && e.set("shared", "1"),
              eH &&
                eH.day === M &&
                e.set("gap", `${eH.gap.start}-${eH.gap.end}`));
            let t = e.toString(),
              s = `${window.location.pathname}${t ? `?${t}` : ""}${window.location.hash}`;
            window.history.replaceState(window.history.state, "", s);
          }, [M, R, X, eo, el, ev, ek, eM, eC, eH, ed, r, k]),
          (0, n.useEffect)(() => {
            let e = () => {
              let e;
              return s({
                key: (e = new Date(Date.now() + 198e5))
                  .toISOString()
                  .slice(0, 10),
                minutes: 60 * e.getUTCHours() + e.getUTCMinutes(),
              });
            };
            e();
            let t = setInterval(e, 6e4);
            return () => clearInterval(t);
          }, []),
          (0, n.useEffect)(() => {
            let e = r.findIndex((e) => e.key === M),
              t = e >= 0 ? e : k;
            (e < 0 && r[k] && $(r[k].key),
              ex((e) =>
                t >= e && t < e + 3 && e <= Math.max(0, r.length - 3)
                  ? e
                  : Math.max(0, Math.min(t, Math.max(0, r.length - 3))),
              ));
          }, [r]));
        let e_ = r.find((e) => e.key === M) ?? r[0],
          eJ = (0, n.useMemo)(() => new Set(ej), [ej]),
          e0 = (0, n.useMemo)(
            () =>
              r.flatMap((e) =>
                e.entries
                  .filter((e) => eJ.has(e.rowId))
                  .map((t) => ({
                    key: t.id,
                    dayKey: e.key,
                    rowId: t.rowId,
                    eventId: t.eventId,
                    name: t.name,
                    venue: t.venue,
                    startMin: t.startMin,
                    endMin: t.endMin,
                    endUnknown: t.endUnknown,
                    venueUnknown: t.venueUnknown,
                  })),
              ),
            [r, eJ],
          ),
          e1 = (0, n.useMemo)(
            () =>
              (function (e) {
                let t = new Map();
                for (let s = 0; s < e.length; s++)
                  for (let a = s + 1; a < e.length; a++) {
                    let n = e[s],
                      r = e[a];
                    n.dayKey === r.dayKey &&
                      n.rowId !== r.rowId &&
                      x(n, r) &&
                      (t.set(n.key, [...(t.get(n.key) ?? []), r.name]),
                      t.set(r.key, [...(t.get(r.key) ?? []), n.name]));
                  }
                return t;
              })(e0),
            [e0],
          ),
          e2 = new Set(e0.map((e) => e.rowId)).size,
          e5 = (0, n.useMemo)(() => {
            let e = new Set();
            for (let t of r)
              for (let s of t.entries)
                eJ.has(s.rowId) && s.paths.forEach((t) => e.add(t));
            return e;
          }, [r, eJ]),
          e4 = (e) => {
            let t = e0
                .filter((t) => t.dayKey === e)
                .sort((e, t) => e.startMin - t.startMin),
              s = r.find((t) => t.key === e)?.entries ?? [],
              a = (function (e, t = 30) {
                let s = [...e].sort(
                    (e, t) => e.startMin - t.startMin || e.endMin - t.endMin,
                  ),
                  a = [],
                  n = -1,
                  r = !1;
                for (let e of s)
                  (n >= 0 &&
                    !r &&
                    e.startMin - n >= t &&
                    a.push({ start: n, end: e.startMin }),
                    e.endUnknown
                      ? ((r = !0), (n = Math.max(n, e.startMin)))
                      : ((n = r ? e.endMin : Math.max(n, e.endMin)), (r = !1)));
                return a;
              })(t).map((e) => ({
                kind: "gap",
                gap: e,
                fits: s.filter((t) => !eJ.has(t.rowId) && j(t, e)).length,
              }));
            return [
              ...t.map((e) => ({ kind: "session", session: e })),
              ...a,
            ].sort((e, t) => ee(e) - ee(t) || ("session" === e.kind ? -1 : 1));
          },
          e3 = eH && eH.day === e_?.key ? eH.gap : null,
          e6 = (0, n.useMemo)(() => {
            if (!e3) return {};
            let e = e0.filter((e) => e.dayKey === e_?.key && !e.endUnknown);
            return {
              before: e.find((e) => e.endMin === e3.start),
              after: e.find((e) => e.startMin === e3.end),
            };
          }, [e3, e0, e_]),
          e8 = (e, t = "list") => {
            let s = eJ.has(e.rowId);
            if (!s && ej.length >= 200)
              return void eY(
                "My Path is full (200 events). Remove one to add another.",
              );
            if ((eK(s ? ej.filter((t) => t !== e.rowId) : [...ej, e.rowId]), s))
              return void eY(`Removed ${e.name} from My Path`);
            let a = r.find((t) => t.entries.some((t) => t.id === e.id)),
              n = a ? w(e, a.entries, new Set([...ej, e.rowId]), e5).length : 0;
            (eI(n > 0 ? e.id : null),
              eE(t),
              eY(
                n > 0
                  ? `Added ${e.name} to My Path. ${n} other ${1 === n ? "event runs" : "events run"} at the same time.`
                  : `Added ${e.name} to My Path`,
              ));
          },
          e7 = (0, n.useMemo)(() => new Set(eM), [eM]),
          e9 = eM.filter((e) => !eJ.has(e)),
          te = (() => {
            if (!eL) return null;
            let e = r.find((e) => e.entries.some((e) => e.id === eL)),
              t = e?.entries.find((e) => e.id === eL);
            if (!e || !t || !eJ.has(t.rowId)) return null;
            let s = w(t, e.entries, eJ, e5);
            return 0 === s.length
              ? null
              : (0, a.jsx)(_, {
                  target: t,
                  alternatives: s,
                  dayLabel: `${e.weekdayLabel}, ${e.dateLabel}`,
                  onSwap: (e) => {
                    (eK([
                      ...ej.filter((s) => s !== t.rowId && s !== e.rowId),
                      e.rowId,
                    ]),
                      eI(e.id),
                      eY(`Swapped ${t.name} for ${e.name} in My Path`));
                  },
                  onClose: () => eI(null),
                });
          })(),
          tt = (0, n.useMemo)(() => [...new Set(e0.map((e) => e.rowId))], [e0]),
          ts = (e) => {
            (tL(), er(e), eX.current?.close());
            let t = (t) => t.entries.some((t) => t.paths.includes(e));
            if (e_ && !t(e_)) {
              let e = r.find(t);
              e && tN(e.key);
            }
            (eY(`Showing ${T[e] ?? e} events`),
              requestAnimationFrame(() =>
                document
                  .querySelector(".prog-main")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" }),
              ));
          },
          ta = (e) => {
            eB(e);
            try {
              window.localStorage.setItem(Y, e ? "1" : "0");
            } catch {}
          },
          tn = () => eX.current?.showModal(),
          tr = (e, t, s) => {
            (tL(),
              tN(e),
              eQ({ day: e, gap: t }),
              eX.current?.close(),
              eY(
                `${s} ${1 === s ? "event fits" : "events fit"} ${Z(t.start)} to ${Z(t.end)}`,
              ),
              requestAnimationFrame(() =>
                document
                  .querySelector(".prog-main")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" }),
              ));
          },
          tl = null !== t && t.key === e_?.key,
          ti = ek && tl,
          to = tl
            ? (e_?.entries ?? []).filter((e) => null !== P(e, t.minutes)).length
            : 0,
          tc = (0, n.useMemo)(() => C(R), [R]),
          td = (0, n.useMemo)(
            () =>
              e_
                ? e_.entries.filter(
                    (e) =>
                      !(
                        (el && !e.isFree) ||
                        (ev && !eJ.has(e.rowId)) ||
                        (eC && !e7.has(e.rowId)) ||
                        (ti && t && null === P(e, t.minutes)) ||
                        (e3 && (eJ.has(e.rowId) || !j(e, e3)))
                      ) && G(e, tc),
                  )
                : [],
            [e_, tc, el, ev, eC, e7, ti, t, eJ, e3],
          ),
          th = (0, n.useMemo)(
            () =>
              0 === tc.length
                ? []
                : r
                    .filter((e) => e.key !== e_?.key)
                    .map((e) => ({
                      day: e,
                      count: e.entries.filter((e) => G(e, tc)).length,
                    }))
                    .filter((e) => e.count > 0),
            [r, e_, tc],
          ),
          tp = (0, n.useMemo)(
            () =>
              (function (e, t, s = { events: 6, venues: 4, paths: 3 }) {
                let a = C(e);
                if (0 === a.length)
                  return { events: [], venues: [], paths: [] };
                let n = new Set(),
                  r = t.events
                    .filter(
                      (e) =>
                        !(!e.eventId.trim() || n.has(e.rowId)) &&
                        !!S(
                          [e.name, e.venueUnknown ? "" : e.venue, e.society],
                          a,
                        ) &&
                        (n.add(e.rowId), !0),
                    )
                    .sort(
                      (e, t) =>
                        I(e.name, a) - I(t.name, a) ||
                        e.dayKey.localeCompare(t.dayKey) ||
                        e.startMin - t.startMin ||
                        e.name.localeCompare(t.name),
                    )
                    .slice(0, s.events);
                return {
                  events: r,
                  venues: t.venues
                    .filter((e) => !e.unknown && L([e.label], a))
                    .slice(0, s.venues)
                    .map(({ key: e, label: t, count: s }) => ({
                      key: e,
                      label: t,
                      count: s,
                    })),
                  paths: t.paths
                    .filter((e) => L([e.label, e.id], a))
                    .slice(0, s.paths)
                    .map(({ id: e, label: t }) => ({ id: e, label: t })),
                };
              })(R, {
                events: r.flatMap((e) =>
                  e.entries.map((t) => ({ ...t, dayKey: e.key })),
                ),
                venues: (e_?.entries ?? []).reduce((e, t) => {
                  let s = t.venue.trim().toLowerCase(),
                    a = e.find((e) => e.key === s);
                  return (
                    a
                      ? (a.count += 1)
                      : e.push({
                          key: s,
                          label: t.venue,
                          count: 1,
                          unknown: t.venueUnknown,
                        }),
                    e
                  );
                }, []),
                paths: h.R7,
              }),
            [R, r, e_],
          ),
          tu = (0, n.useMemo)(
            () =>
              Object.fromEntries(
                r.map((e) => [
                  e.key,
                  `${e.weekdayShort.slice(0, 3)} ${e.dayNumLabel} ${e.monthLabel}`,
                ]),
              ),
            [r],
          ),
          tm = (0, n.useMemo)(() => {
            let e = {};
            for (let t of td) for (let s of t.paths) e[s] = (e[s] ?? 0) + 1;
            return e;
          }, [td]),
          tx = (0, n.useMemo)(
            () => ("all" === X ? td : td.filter((e) => e.paths.includes(X))),
            [td, X],
          ),
          tg = (0, n.useMemo)(
            () =>
              eo ? tx.filter((e) => e.venue.trim().toLowerCase() === eo) : tx,
            [tx, eo],
          ),
          tf = (0, n.useMemo)(() => {
            let e = new Map();
            for (let t of e_?.entries ?? []) {
              let s = t.venue.trim().toLowerCase();
              e.has(s) ||
                e.set(s, {
                  key: s,
                  label: t.venue,
                  count: 0,
                  unknown: t.venueUnknown,
                });
            }
            for (let t of tx) {
              let s = e.get(t.venue.trim().toLowerCase());
              s && (s.count += 1);
            }
            return Array.from(e.values()).sort(
              (e, t) =>
                Number(e.unknown) - Number(t.unknown) ||
                e.label.localeCompare(t.label),
            );
          }, [e_, tx]),
          ty = (0, n.useMemo)(
            () =>
              e3
                ? [
                    {
                      key: "gap",
                      label: `Fits ${Z(e3.start)} – ${Z(e3.end)}`,
                      unknown: !1,
                      items: v(tg, e5),
                    },
                  ]
                : "time" === ed || "map" === ed
                  ? [
                      { label: "Morning", test: (e) => e.startMin < 720 },
                      {
                        label: "Afternoon",
                        test: (e) => e.startMin >= 720 && e.startMin < 1020,
                      },
                      { label: "Evening", test: (e) => e.startMin >= 1020 },
                    ]
                      .map((e) => ({
                        key: e.label,
                        label: e.label,
                        unknown: !1,
                        items: tg
                          .filter(e.test)
                          .sort((e, t) => e.startMin - t.startMin),
                      }))
                      .filter((e) => e.items.length > 0)
                  : tf
                      .map((e) => ({
                        key: e.key,
                        label: e.label,
                        unknown: e.unknown,
                        items: tg
                          .filter((t) => t.venue.trim().toLowerCase() === e.key)
                          .sort((e, t) => e.startMin - t.startMin),
                      }))
                      .filter((e) => e.items.length > 0),
            [ed, tg, tf, e3, e5],
          ),
          tj = (0, n.useMemo)(() => {
            if (e3 || "map" === ed) return null;
            let e = tg.filter((e) => e.eventId.trim());
            if (0 === e.length) return null;
            if (t && t.key === e_?.key) {
              let s = e.find(
                (e) => e.startMin <= t.minutes && e.endMin > t.minutes,
              );
              if (s) return { entry: s, state: "live" };
              let a = e.find((e) => e.startMin > t.minutes);
              if (a) return { entry: a, state: "next" };
            }
            return { entry: e[0], state: "opens" };
          }, [tg, t, e_, e3, ed]),
          tb = Math.max(0, r.length - 3),
          tv = r.slice(em, em + 3),
          tw = Math.max(0, r.length - (em + 3)),
          tk =
            R.trim().length > 0 ||
            "all" !== X ||
            null !== eo ||
            el ||
            ev ||
            ti ||
            eC ||
            null !== e3,
          tN = (e) => {
            let t = r.findIndex((t) => t.key === e);
            !(t < 0) &&
              ($(e),
              (t < em || t >= em + 3) && ex(Math.max(0, Math.min(t, tb))));
          },
          tM = (e) => {
            let t = Math.max(0, Math.min(tb, em + e));
            (ex(t),
              !r.slice(t, t + 3).some((e) => e.key === e_?.key) &&
                r[t] &&
                $(r[t].key));
          },
          t$ = (0, n.useMemo)(
            () =>
              (function (e, t, s = null) {
                let a = new Map();
                for (let t of e) {
                  let e = E(t.venue);
                  a.has(e) ||
                    a.set(e, {
                      key: e,
                      label: t.venue.trim(),
                      unknown: t.venueUnknown,
                      count: 0,
                      firstMin: null,
                      lastMin: null,
                      peak: 0,
                      live: 0,
                    });
                }
                let n = new Map();
                for (let e of t) {
                  let t = E(e.venue),
                    r = a.get(t);
                  r &&
                    ((r.count += 1),
                    (r.firstMin =
                      null === r.firstMin
                        ? e.startMin
                        : Math.min(r.firstMin, e.startMin)),
                    e.endUnknown ||
                      (r.lastMin =
                        null === r.lastMin
                          ? e.endMin
                          : Math.max(r.lastMin, e.endMin)),
                    s?.(e) && (r.live += 1),
                    n.set(t, [...(n.get(t) ?? []), e]));
                }
                for (let [e, t] of n)
                  a.get(e).peak = (function (e) {
                    let t = [];
                    for (let s of e) {
                      let e =
                        s.endUnknown || s.endMin <= s.startMin
                          ? s.startMin + 1
                          : s.endMin;
                      t.push([s.startMin, 1], [e, -1]);
                    }
                    t.sort((e, t) => e[0] - t[0] || e[1] - t[1]);
                    let s = 0,
                      a = 0;
                    for (let [, e] of t) ((s += e), (a = Math.max(a, s)));
                    return a;
                  })(t);
                return [...a.values()].sort(
                  (e, t) =>
                    Number(e.unknown) - Number(t.unknown) ||
                    e.label.localeCompare(t.label),
                );
              })(
                e_?.entries ?? [],
                tx,
                tl && t ? (e) => P(e, t.minutes)?.kind === "live" : null,
              ),
            [e_, tx, tl, t],
          ),
          tC = eo ? t$.find((e) => e.key === eo) : void 0,
          tS = (e) => `${e3 ? "gap" : ed}:${e}`,
          tL = () => {
            (q(""),
              er("all"),
              ec(null),
              ei(!1),
              ew(!1),
              eN(!1),
              eS(!1),
              eQ(null));
          },
          tI = [
            R.trim() && {
              key: "q",
              label: `“${R.trim()}”`,
              clear: () => q(""),
            },
            "all" !== X && {
              key: "cat",
              label: T[X] ?? X,
              clear: () => er("all"),
            },
            eo && {
              key: "venue",
              label: tf.find((e) => e.key === eo)?.label ?? eo,
              clear: () => ec(null),
            },
            el && { key: "free", label: "Free entry", clear: () => ei(!1) },
            ev && { key: "mine", label: "My Path", clear: () => ew(!1) },
            ti && { key: "soon", label: "Happening soon", clear: () => eN(!1) },
            eC && { key: "shared", label: "Shared plan", clear: () => eS(!1) },
            e3 && {
              key: "gap",
              label: `Fits ${Z(e3.start)} – ${Z(e3.end)}`,
              clear: () => eQ(null),
            },
          ].filter(Boolean);
        return 0 === r.length
          ? (0, a.jsxs)("div", {
              className: "prog-page",
              children: [
                (0, a.jsx)(W, {}),
                (0, a.jsx)("section", {
                  className: "prog-section",
                  children: (0, a.jsx)("div", {
                    className: "prog-wrap",
                    children: (0, a.jsxs)("div", {
                      className: "prog-empty",
                      children: [
                        (0, a.jsx)("span", {
                          lang: "ja",
                          "aria-hidden": "true",
                          className: "prog-empty-mark",
                          children: "準備中",
                        }),
                        (0, a.jsx)("h2", {
                          children: "The programme is being written",
                        }),
                        (0, a.jsx)("p", {
                          children:
                            "Events are still being scheduled. Browse everything already open for registration in the meantime.",
                        }),
                        (0, a.jsxs)(l(), {
                          className: "button button-gold",
                          href: "/events",
                          children: [
                            "Browse events ",
                            (0, a.jsx)(o.i3, { diagonal: !0 }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            })
          : (0, a.jsxs)("div", {
              className: "prog-page",
              children: [
                (0, a.jsx)(W, {}),
                (0, a.jsx)("section", {
                  className: "prog-section",
                  children: (0, a.jsxs)("div", {
                    className: "prog-wrap",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "prog-strip-wrap",
                        children: [
                          (0, a.jsxs)("button", {
                            type: "button",
                            className: "prog-page-btn",
                            onClick: () => tM(-3),
                            disabled: 0 === em,
                            "aria-label":
                              em > 0
                                ? `Show ${em} earlier ${1 === em ? "day" : "days"}, including pre-fest`
                                : "Earlier days",
                            children: [
                              "‹",
                              em > 0 &&
                                (0, a.jsx)("span", {
                                  className: "prog-page-count",
                                  "aria-hidden": "true",
                                  children: em,
                                }),
                            ],
                          }),
                          (0, a.jsx)("div", {
                            className: "prog-strip",
                            role: "tablist",
                            "aria-label": "Festival days",
                            children: tv.map((e) => {
                              let t = e.key === e_?.key;
                              return (0, a.jsxs)(
                                "button",
                                {
                                  role: "tab",
                                  type: "button",
                                  "aria-selected": t,
                                  className: `prog-chip${t ? " is-active" : ""}`,
                                  onClick: () => tN(e.key),
                                  children: [
                                    (0, a.jsx)("span", {
                                      className: "prog-chip-wd",
                                      children: e.isPreFest
                                        ? "PRE-FEST"
                                        : e.weekdayShort,
                                    }),
                                    (0, a.jsx)("strong", {
                                      children: e.dayNumLabel,
                                    }),
                                    (0, a.jsx)("span", {
                                      className: "prog-chip-mo",
                                      children: e.monthLabel,
                                    }),
                                    (0, a.jsx)("span", {
                                      className: "prog-chip-n",
                                      children: e.entries.length,
                                    }),
                                  ],
                                },
                                e.key,
                              );
                            }),
                          }),
                          (0, a.jsxs)("button", {
                            type: "button",
                            className: "prog-page-btn",
                            onClick: () => tM(3),
                            disabled: em >= tb,
                            "aria-label":
                              tw > 0
                                ? `Show ${tw} later ${1 === tw ? "day" : "days"}`
                                : "Later days",
                            children: [
                              "›",
                              tw > 0 &&
                                (0, a.jsx)("span", {
                                  className: "prog-page-count",
                                  "aria-hidden": "true",
                                  children: tw,
                                }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "prog-tools",
                        children: [
                          (0, a.jsx)(H, {
                            query: R,
                            onQuery: q,
                            suggestions: tp,
                            dayShort: tu,
                            onEvent: (e) =>
                              eV.push(
                                `/events/${encodeURIComponent(e.eventId.trim())}`,
                              ),
                            onVenue: (e) => {
                              (q(""), ec(e.key), eY(`Showing ${e.label}`));
                            },
                            onPath: (e) => {
                              (q(""), er(e.id), eY(`Showing ${e.label}`));
                            },
                          }),
                          (0, a.jsxs)("div", {
                            className: "prog-chips",
                            role: "group",
                            "aria-label": "Filter by path",
                            children: [
                              (0, a.jsx)("button", {
                                type: "button",
                                "aria-pressed": "all" === X,
                                className: `prog-cat prog-cat-all${"all" === X ? " is-on" : ""}`,
                                onClick: () => er("all"),
                                children: "All",
                              }),
                              h.R7.map((e) => {
                                let t = tm[e.id] ?? 0;
                                return (0, a.jsxs)(
                                  "button",
                                  {
                                    type: "button",
                                    "aria-pressed": X === e.id,
                                    className: `prog-cat prog-cat-${e.id}${X === e.id ? " is-on" : ""}${0 === t ? " is-zero" : ""}`,
                                    onClick: () =>
                                      er(X === e.id ? "all" : e.id),
                                    children: [
                                      (0, a.jsx)("span", {
                                        lang: "ja",
                                        className: "prog-cat-mark",
                                        "aria-hidden": "true",
                                        children: e.mark,
                                      }),
                                      e.label,
                                      (0, a.jsx)("span", {
                                        className: "prog-cat-n",
                                        children: t,
                                      }),
                                    ],
                                  },
                                  e.id,
                                );
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsxs)("div", {
                        className: "prog-quick",
                        role: "group",
                        "aria-label": "Quick filters",
                        children: [
                          tl &&
                            (0, a.jsxs)("button", {
                              type: "button",
                              "aria-pressed": ek,
                              className: `prog-cat prog-cat-soon${ek ? " is-on" : ""}${0 === to ? " is-zero" : ""}`,
                              onClick: () => eN(!ek),
                              title:
                                "Running now or starting within 60 minutes",
                              children: [
                                (0, a.jsx)("span", {
                                  className: "prog-live-dot",
                                  "aria-hidden": "true",
                                }),
                                "Happening soon",
                                (0, a.jsx)("span", {
                                  className: "prog-cat-n",
                                  children: to,
                                }),
                              ],
                            }),
                          (0, a.jsx)("button", {
                            type: "button",
                            "aria-pressed": el,
                            className: `prog-cat prog-cat-free${el ? " is-on" : ""}`,
                            onClick: () => ei(!el),
                            children: "Free entry",
                          }),
                          (0, a.jsxs)("button", {
                            type: "button",
                            "aria-pressed": ev,
                            className: `prog-cat prog-cat-mine${ev ? " is-on" : ""}`,
                            onClick: () => ew(!ev),
                            children: [
                              (0, a.jsx)(es, { filled: ev }),
                              "My Path",
                              (0, a.jsx)("span", {
                                className: "prog-cat-n",
                                children: e2,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, a.jsx)("div", {
                        className: "prog-budget-row",
                        children: (0, a.jsxs)("button", {
                          type: "button",
                          "aria-expanded": eR,
                          "aria-controls": "prog-budget",
                          className: `prog-budget-toggle${eR ? " is-on" : ""}`,
                          onClick: () => {
                            if (!eR) {
                              let e;
                              (eD(
                                tl && t
                                  ? ((e = 30 * Math.ceil(t.minutes / 30)),
                                    Math.min(
                                      N[N.length - 1],
                                      Math.max(N[0], e),
                                    ))
                                  : 600,
                              ),
                                eO(0));
                            }
                            eF(!eR);
                          },
                          children: [
                            (0, a.jsx)("span", {
                              className: "prog-budget-icon",
                              "aria-hidden": "true",
                              children: "✦",
                            }),
                            (0, a.jsxs)("span", {
                              className: "prog-budget-text",
                              children: [
                                (0, a.jsx)("strong", {
                                  children: "I have some free time…",
                                }),
                                (0, a.jsx)("span", {
                                  children:
                                    "Find events that fit 30 min, an hour or the rest of the day",
                                }),
                              ],
                            }),
                            (0, a.jsx)("span", {
                              className: "prog-chevron",
                              "aria-hidden": "true",
                            }),
                          ],
                        }),
                      }),
                      eR &&
                        e_ &&
                        (0, a.jsx)(J, {
                          day: e_,
                          budgetId: eA,
                          from: ez,
                          page: eU,
                          saved: eJ,
                          savedPaths: e5,
                          onBudget: (e) => {
                            (eT(e), eO(0));
                          },
                          onFrom: (e) => {
                            (eD(e), eO(0));
                          },
                          onPage: eO,
                          onToggleSave: (e) => e8(e, "budget"),
                          miss: "budget" === eP ? te : null,
                          onClose: () => eF(!1),
                        }),
                      tf.length > 1 &&
                        (0, a.jsx)("div", {
                          className: "prog-venue-pills",
                          role: "group",
                          "aria-label": "Jump to a venue",
                          children: tf.map((e) =>
                            (0, a.jsxs)(
                              "button",
                              {
                                type: "button",
                                className: "prog-venue-pill",
                                onClick: () => {
                                  var t;
                                  return (
                                    (t = e.key),
                                    void (ec(null),
                                    eh("venue"),
                                    eG((e) => {
                                      let s = new Set(e);
                                      return (s.delete(`venue:${t}`), s);
                                    }),
                                    requestAnimationFrame(() => {
                                      document
                                        .getElementById(`prog-venue-${t}`)
                                        ?.scrollIntoView({
                                          behavior: "smooth",
                                          block: "start",
                                        });
                                    }))
                                  );
                                },
                                children: [
                                  e.label,
                                  (0, a.jsx)("span", { children: e.count }),
                                ],
                              },
                              e.key,
                            ),
                          ),
                        }),
                      (0, a.jsxs)("div", {
                        className: "prog-layout",
                        children: [
                          (0, a.jsxs)("aside", {
                            className: "prog-side",
                            "aria-label": "My Path and venues",
                            children: [
                              e2 > 0 &&
                                !eW &&
                                (0, a.jsx)("div", {
                                  className: "prog-side-card",
                                  children: (0, a.jsx)(K, {
                                    compact: !0,
                                    savedPaths: e5,
                                    onExplore: ts,
                                    onHide: () => ta(!0),
                                  }),
                                }),
                              e2 > 0 &&
                                (0, a.jsxs)("div", {
                                  className: "prog-side-card prog-plan-card",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      className: "prog-side-head",
                                      children: [
                                        (0, a.jsx)("h2", {
                                          className: "prog-side-title",
                                          children: "My Path \xb7 this day",
                                        }),
                                        (0, a.jsx)("button", {
                                          type: "button",
                                          className: "prog-clear",
                                          onClick: tn,
                                          children: "Full plan",
                                        }),
                                      ],
                                    }),
                                    0 ===
                                    e0.filter((e) => e.dayKey === e_?.key)
                                      .length
                                      ? (0, a.jsxs)("p", {
                                          className: "prog-plan-empty",
                                          children: [
                                            "Nothing saved on this day. ",
                                            e2,
                                            " saved on other days.",
                                          ],
                                        })
                                      : (0, a.jsx)("ol", {
                                          className: "prog-plan-mini",
                                          children: e4(e_?.key ?? "").map(
                                            (e) =>
                                              "gap" === e.kind
                                                ? (0, a.jsx)(
                                                    "li",
                                                    {
                                                      className:
                                                        "prog-plan-gap",
                                                      children: (0, a.jsx)(et, {
                                                        gap: e.gap,
                                                        fits: e.fits,
                                                        active:
                                                          e3?.start ===
                                                            e.gap.start &&
                                                          e3?.end === e.gap.end,
                                                        onPick: () =>
                                                          tr(
                                                            e_?.key ?? "",
                                                            e.gap,
                                                            e.fits,
                                                          ),
                                                      }),
                                                    },
                                                    `gap-${e.gap.start}`,
                                                  )
                                                : (0, a.jsxs)(
                                                    "li",
                                                    {
                                                      className: e1.has(
                                                        e.session.key,
                                                      )
                                                        ? "is-clash"
                                                        : "",
                                                      children: [
                                                        (0, a.jsx)("span", {
                                                          className:
                                                            "prog-plan-time",
                                                          children: Z(
                                                            e.session.startMin,
                                                          ),
                                                        }),
                                                        (0, a.jsx)("span", {
                                                          className:
                                                            "prog-plan-name",
                                                          children:
                                                            e.session.name,
                                                        }),
                                                        e1.has(e.session.key) &&
                                                          (0, a.jsxs)("span", {
                                                            className:
                                                              "prog-plan-warn",
                                                            children: [
                                                              "Clashes with ",
                                                              e1
                                                                .get(
                                                                  e.session.key,
                                                                )
                                                                .join(", "),
                                                            ],
                                                          }),
                                                      ],
                                                    },
                                                    e.session.key,
                                                  ),
                                          ),
                                        }),
                                  ],
                                }),
                              (0, a.jsxs)("div", {
                                className: "prog-side-card",
                                children: [
                                  (0, a.jsxs)("div", {
                                    className: "prog-side-head",
                                    children: [
                                      (0, a.jsx)("h2", {
                                        className: "prog-side-title",
                                        children: "Venues",
                                      }),
                                      eo &&
                                        (0, a.jsx)("button", {
                                          type: "button",
                                          className: "prog-clear",
                                          onClick: () => ec(null),
                                          children: "View all",
                                        }),
                                    ],
                                  }),
                                  (0, a.jsx)("ul", {
                                    className: "prog-venue-list",
                                    children: tf.map((e) => {
                                      let t = eo === e.key;
                                      return (0, a.jsx)(
                                        "li",
                                        {
                                          children: (0, a.jsxs)("button", {
                                            type: "button",
                                            "aria-pressed": t,
                                            className: `prog-venue-row${t ? " is-active" : ""}${0 === e.count ? " is-empty" : ""}`,
                                            onClick: () => ec(t ? null : e.key),
                                            children: [
                                              (0, a.jsxs)("span", {
                                                className: "prog-venue-name",
                                                children: [
                                                  e.label,
                                                  e.unknown &&
                                                    (0, a.jsx)("em", {
                                                      children:
                                                        " \xb7 to be confirmed",
                                                    }),
                                                ],
                                              }),
                                              (0, a.jsx)("span", {
                                                className: "prog-venue-n",
                                                children: e.count,
                                              }),
                                            ],
                                          }),
                                        },
                                        e.key,
                                      );
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, a.jsxs)("div", {
                            className: "prog-main",
                            children: [
                              (0, a.jsxs)("div", {
                                className: "prog-mainhead",
                                children: [
                                  (0, a.jsxs)("div", {
                                    children: [
                                      (0, a.jsxs)("h2", {
                                        className: "prog-dayname",
                                        children: [
                                          e_?.isPreFest &&
                                            (0, a.jsx)("span", {
                                              className: "prog-pre-badge",
                                              children: "Pre-fest",
                                            }),
                                          e_?.weekdayLabel,
                                          ", ",
                                          e_?.dateLabel,
                                        ],
                                      }),
                                      (0, a.jsxs)("p", {
                                        className: "prog-count",
                                        "aria-live": "polite",
                                        children: [
                                          tg.length,
                                          " ",
                                          1 === tg.length ? "event" : "events",
                                          tk && tg.length !== e_?.entries.length
                                            ? ` of ${e_?.entries.length} this day`
                                            : "",
                                        ],
                                      }),
                                    ],
                                  }),
                                  !e3 &&
                                    (0, a.jsxs)("div", {
                                      className: "prog-toggle",
                                      role: "group",
                                      "aria-label": "Group events by",
                                      children: [
                                        (0, a.jsx)("button", {
                                          type: "button",
                                          "aria-pressed": "venue" === ed,
                                          className:
                                            "venue" === ed ? "is-on" : "",
                                          onClick: () => eh("venue"),
                                          children: "By venue",
                                        }),
                                        (0, a.jsx)("button", {
                                          type: "button",
                                          "aria-pressed": "time" === ed,
                                          className:
                                            "time" === ed ? "is-on" : "",
                                          onClick: () => eh("time"),
                                          children: "By time",
                                        }),
                                        (0, a.jsx)("button", {
                                          type: "button",
                                          "aria-pressed": "map" === ed,
                                          className:
                                            "map" === ed ? "is-on" : "",
                                          onClick: () => eh("map"),
                                          children: "Map",
                                        }),
                                      ],
                                    }),
                                ],
                              }),
                              eM.length > 0 &&
                                (0, a.jsxs)("section", {
                                  className: "prog-shared",
                                  "aria-labelledby": "prog-shared-title",
                                  children: [
                                    (0, a.jsxs)("div", {
                                      children: [
                                        (0, a.jsxs)("h3", {
                                          id: "prog-shared-title",
                                          children: [
                                            "A shared plan \xb7 ",
                                            eM.length,
                                            " ",
                                            1 === eM.length
                                              ? "event"
                                              : "events",
                                          ],
                                        }),
                                        (0, a.jsx)("p", {
                                          children:
                                            0 === e9.length
                                              ? "Every event in it is already in your My Path."
                                              : `${eM.length - e9.length} already in your My Path, ${e9.length} new to you.`,
                                        }),
                                      ],
                                    }),
                                    (0, a.jsxs)("div", {
                                      className: "prog-shared-actions",
                                      children: [
                                        (0, a.jsx)("button", {
                                          type: "button",
                                          className: "prog-shared-btn",
                                          "aria-pressed": eC,
                                          onClick: () => eS(!eC),
                                          children: eC
                                            ? "Show everything"
                                            : "Show shared plan",
                                        }),
                                        e9.length > 0 &&
                                          (0, a.jsxs)("button", {
                                            type: "button",
                                            className:
                                              "prog-shared-btn is-primary",
                                            onClick: () => {
                                              let e = [...ej, ...e9].slice(
                                                  0,
                                                  200,
                                                ),
                                                t = e.length - ej.length;
                                              (eK(e),
                                                eY(
                                                  t < e9.length
                                                    ? `Added ${t} events. My Path holds up to 200.`
                                                    : `Added ${t} ${1 === t ? "event" : "events"} to My Path`,
                                                ));
                                            },
                                            children: [
                                              "Add ",
                                              e9.length,
                                              " to My Path",
                                            ],
                                          }),
                                        (0, a.jsx)("button", {
                                          type: "button",
                                          className: "prog-clear",
                                          onClick: () => {
                                            (e$([]), eS(!1));
                                          },
                                          children: "Dismiss",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              tI.length > 0 &&
                                (0, a.jsxs)("div", {
                                  className: "prog-applied",
                                  role: "group",
                                  "aria-label": "Active filters",
                                  children: [
                                    tI.map((e) =>
                                      (0, a.jsxs)(
                                        "button",
                                        {
                                          type: "button",
                                          className: "prog-applied-chip",
                                          onClick: e.clear,
                                          "aria-label": `Remove filter ${e.label}`,
                                          children: [
                                            e.label,
                                            " ",
                                            (0, a.jsx)("span", {
                                              "aria-hidden": "true",
                                              children: "\xd7",
                                            }),
                                          ],
                                        },
                                        e.key,
                                      ),
                                    ),
                                    tI.length > 1 &&
                                      (0, a.jsx)("button", {
                                        type: "button",
                                        className: "prog-clear",
                                        onClick: tL,
                                        children: "Clear all",
                                      }),
                                  ],
                                }),
                              tj &&
                                (0, a.jsxs)(B, {
                                  className: "prog-featured",
                                  eventId: tj.entry.eventId,
                                  children: [
                                    z(tj.entry.imageUrl) && eg !== tj.entry.id
                                      ? (0, a.jsx)("img", {
                                          className: "prog-featured-img",
                                          src: z(tj.entry.imageUrl),
                                          alt: "",
                                          loading: "lazy",
                                          onError: () => ef(tj.entry.id),
                                        })
                                      : (0, a.jsx)("span", {
                                          className: "prog-featured-mark",
                                          "aria-hidden": "true",
                                          children: A[tj.entry.category] ?? "✦",
                                        }),
                                    (0, a.jsxs)("span", {
                                      className: "prog-featured-body",
                                      children: [
                                        (0, a.jsxs)("span", {
                                          className: "prog-featured-kicker",
                                          children: [
                                            (0, a.jsx)("span", {
                                              className: "prog-featured-label",
                                              children: "Featured",
                                            }),
                                            "live" === tj.state
                                              ? "Happening now"
                                              : "next" === tj.state
                                                ? "Up next"
                                                : "Opens the day",
                                            (0, a.jsx)("span", {
                                              className: `prog-tag prog-tag-${tj.entry.category}`,
                                              children:
                                                F[tj.entry.category] ??
                                                tj.entry.category,
                                            }),
                                          ],
                                        }),
                                        (0, a.jsx)("strong", {
                                          children: tj.entry.name,
                                        }),
                                        (0, a.jsxs)("span", {
                                          className: "prog-featured-meta",
                                          children: [
                                            U(tj.entry),
                                            " \xb7 ",
                                            O(tj.entry),
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, a.jsx)("span", {
                                      className: "prog-featured-go",
                                      "aria-hidden": "true",
                                      children: (0, a.jsx)(o.i3, {
                                        diagonal: !0,
                                      }),
                                    }),
                                  ],
                                }),
                              "map" === ed &&
                                !e3 &&
                                (0, a.jsx)(Q, {
                                  tiles: t$,
                                  selected: eo,
                                  highlighted: ep,
                                  onPick: (e) => {
                                    let t = eo === e.key ? null : e.key;
                                    (ec(t),
                                      eY(
                                        t
                                          ? `Showing ${e.label}: ${e.count} ${1 === e.count ? "event" : "events"}`
                                          : "Showing all venues",
                                      ),
                                      t &&
                                        window.matchMedia("(max-width: 860px)")
                                          .matches &&
                                        requestAnimationFrame(() =>
                                          document
                                            .getElementById("prog-map-results")
                                            ?.scrollIntoView({
                                              behavior: "smooth",
                                              block: "start",
                                            }),
                                        ));
                                  },
                                  onClear: () => ec(null),
                                }),
                              "map" === ed &&
                                !e3 &&
                                (0, a.jsx)("p", {
                                  className: "prog-map-summary",
                                  id: "prog-map-results",
                                  children: tC
                                    ? (0, a.jsxs)(a.Fragment, {
                                        children: [
                                          (0, a.jsxs)("strong", {
                                            children: [
                                              tC.label,
                                              tC.unknown &&
                                                " \xb7 to be confirmed",
                                            ],
                                          }),
                                          " \xb7 ",
                                          tC.count,
                                          " ",
                                          1 === tC.count ? "event" : "events",
                                          null !== tC.firstMin &&
                                            ` \xb7 ${Z(tC.firstMin)}${null !== tC.lastMin ? ` – ${Z(tC.lastMin)}` : ""}`,
                                          tC.peak > 1 &&
                                            ` \xb7 up to ${tC.peak} at once`,
                                        ],
                                      })
                                    : "Every venue, in time order. Choose a tile to see one place.",
                                }),
                              0 === tg.length
                                ? (0, a.jsxs)("div", {
                                    className: "prog-none",
                                    children: [
                                      (0, a.jsx)("p", {
                                        children: e3
                                          ? "Nothing unsaved fits entirely inside this free time."
                                          : tk
                                            ? "Nothing on this day matches your filters."
                                            : "Nothing scheduled on this day yet.",
                                      }),
                                      th.length > 0 &&
                                        (0, a.jsxs)("p", {
                                          className: "prog-elsewhere",
                                          children: [
                                            "“",
                                            R.trim(),
                                            "” is on",
                                            " ",
                                            th.map((e, t) =>
                                              (0, a.jsxs)(
                                                "span",
                                                {
                                                  children: [
                                                    t > 0 &&
                                                      (t === th.length - 1
                                                        ? " and "
                                                        : ", "),
                                                    (0, a.jsxs)("button", {
                                                      type: "button",
                                                      className: "prog-clear",
                                                      onClick: () =>
                                                        tN(e.day.key),
                                                      children: [
                                                        e.day.weekdayLabel,
                                                        " ",
                                                        e.day.dateLabel,
                                                        " (",
                                                        e.count,
                                                        ")",
                                                      ],
                                                    }),
                                                  ],
                                                },
                                                e.day.key,
                                              ),
                                            ),
                                          ],
                                        }),
                                      tk &&
                                        (0, a.jsx)("button", {
                                          type: "button",
                                          className: "prog-clear",
                                          onClick: tL,
                                          children: "Clear filters",
                                        }),
                                    ],
                                  })
                                : (0, a.jsxs)(a.Fragment, {
                                    children: [
                                      ty.length > 1 &&
                                        (0, a.jsx)("div", {
                                          className: "prog-group-tools",
                                          children: (0, a.jsx)("button", {
                                            type: "button",
                                            className: "prog-clear",
                                            onClick: () =>
                                              eG((e) => {
                                                let t = new Set(e),
                                                  s = ty.every((t) =>
                                                    e.has(tS(t.key)),
                                                  );
                                                for (let e of ty)
                                                  s
                                                    ? t.delete(tS(e.key))
                                                    : t.add(tS(e.key));
                                                return t;
                                              }),
                                            children: ty.every((e) =>
                                              eZ.has(tS(e.key)),
                                            )
                                              ? "Expand all"
                                              : "Collapse all",
                                          }),
                                        }),
                                      ty.map((e, s) => {
                                        let n = !eZ.has(tS(e.key)),
                                          r = `prog-group-list-${s}`;
                                        return (0, a.jsxs)(
                                          "section",
                                          {
                                            className: `prog-group${n ? "" : " is-collapsed"}`,
                                            id:
                                              "venue" !== ed || e3
                                                ? void 0
                                                : `prog-venue-${e.key}`,
                                            children: [
                                              (0, a.jsx)("h3", {
                                                className: "prog-group-head",
                                                children: (0, a.jsxs)(
                                                  "button",
                                                  {
                                                    type: "button",
                                                    className:
                                                      "prog-group-toggle",
                                                    "aria-expanded": n,
                                                    "aria-controls": r,
                                                    onClick: () => {
                                                      let t;
                                                      return (
                                                        (t = e.key),
                                                        eG((e) => {
                                                          let s = new Set(e),
                                                            a = tS(t);
                                                          return (
                                                            s.has(a)
                                                              ? s.delete(a)
                                                              : s.add(a),
                                                            s
                                                          );
                                                        })
                                                      );
                                                    },
                                                    children: [
                                                      (0, a.jsx)("span", {
                                                        className:
                                                          "prog-group-dot",
                                                        "aria-hidden": "true",
                                                      }),
                                                      (0, a.jsxs)("span", {
                                                        className:
                                                          "prog-group-label",
                                                        children: [
                                                          e.label,
                                                          e.unknown &&
                                                            (0, a.jsx)("em", {
                                                              children:
                                                                " \xb7 to be confirmed",
                                                            }),
                                                        ],
                                                      }),
                                                      (0, a.jsxs)("span", {
                                                        className:
                                                          "prog-group-n",
                                                        children: [
                                                          e.items.length,
                                                          " ",
                                                          1 === e.items.length
                                                            ? "event"
                                                            : "events",
                                                        ],
                                                      }),
                                                      (0, a.jsx)("span", {
                                                        className:
                                                          "prog-chevron",
                                                        "aria-hidden": "true",
                                                      }),
                                                    ],
                                                  },
                                                ),
                                              }),
                                              (0, a.jsx)("ul", {
                                                className: "prog-cards",
                                                id: r,
                                                hidden: !n,
                                                children: e.items.flatMap(
                                                  (e) => [
                                                    (0, a.jsxs)(
                                                      "li",
                                                      {
                                                        className:
                                                          "prog-card-item",
                                                        ...("map" === ed
                                                          ? {
                                                              onMouseEnter:
                                                                () =>
                                                                  eu(
                                                                    E(e.venue),
                                                                  ),
                                                              onMouseLeave:
                                                                () => eu(null),
                                                              onFocus: () =>
                                                                eu(E(e.venue)),
                                                              onBlur: () =>
                                                                eu(null),
                                                            }
                                                          : {}),
                                                        children: [
                                                          (0, a.jsxs)(B, {
                                                            className:
                                                              "prog-card",
                                                            eventId: e.eventId,
                                                            children: [
                                                              (0, a.jsx)(
                                                                "span",
                                                                {
                                                                  className: `prog-card-mark prog-mark-${e.category}`,
                                                                  "aria-hidden":
                                                                    "true",
                                                                  children:
                                                                    A[
                                                                      e.category
                                                                    ] ?? "✦",
                                                                },
                                                              ),
                                                              (0, a.jsxs)(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "prog-card-body",
                                                                  children: [
                                                                    (0, a.jsx)(
                                                                      "strong",
                                                                      {
                                                                        children:
                                                                          e.name,
                                                                      },
                                                                    ),
                                                                    (0, a.jsxs)(
                                                                      "span",
                                                                      {
                                                                        className:
                                                                          "prog-card-meta",
                                                                        children:
                                                                          [
                                                                            U(
                                                                              e,
                                                                            ),
                                                                            ("venue" !==
                                                                              ed ||
                                                                              e3) &&
                                                                              ` \xb7 ${O(e)}`,
                                                                          ],
                                                                      },
                                                                    ),
                                                                    tl &&
                                                                      (0,
                                                                      a.jsx)(
                                                                        V,
                                                                        {
                                                                          state:
                                                                            P(
                                                                              e,
                                                                              t.minutes,
                                                                            ),
                                                                        },
                                                                      ),
                                                                    e7.has(
                                                                      e.rowId,
                                                                    ) &&
                                                                      (0,
                                                                      a.jsx)(
                                                                        "span",
                                                                        {
                                                                          className:
                                                                            "prog-shared-note",
                                                                          children:
                                                                            eJ.has(
                                                                              e.rowId,
                                                                            )
                                                                              ? "In both plans"
                                                                              : "In the shared plan",
                                                                        },
                                                                      ),
                                                                    (e.continuedFrom ||
                                                                      e.continuesInto) &&
                                                                      (0,
                                                                      a.jsxs)(
                                                                        "span",
                                                                        {
                                                                          className:
                                                                            "prog-span-note",
                                                                          children:
                                                                            [
                                                                              "Day ",
                                                                              e.dayIndex +
                                                                                1,
                                                                              " of ",
                                                                              e.totalDays,
                                                                            ],
                                                                        },
                                                                      ),
                                                                    e3 &&
                                                                      b(e, {
                                                                        savedPaths:
                                                                          e5,
                                                                        pathLabels:
                                                                          T,
                                                                        before:
                                                                          e6.before,
                                                                        after:
                                                                          e6.after,
                                                                      }).map(
                                                                        (e) =>
                                                                          (0,
                                                                          a.jsx)(
                                                                            "span",
                                                                            {
                                                                              className:
                                                                                "prog-reason-note",
                                                                              children:
                                                                                e,
                                                                            },
                                                                            e,
                                                                          ),
                                                                      ),
                                                                    e1.has(
                                                                      e.id,
                                                                    ) &&
                                                                      (0,
                                                                      a.jsxs)(
                                                                        "span",
                                                                        {
                                                                          className:
                                                                            "prog-clash-note",
                                                                          children:
                                                                            [
                                                                              "Clashes with ",
                                                                              e1
                                                                                .get(
                                                                                  e.id,
                                                                                )
                                                                                .join(
                                                                                  ", ",
                                                                                ),
                                                                            ],
                                                                        },
                                                                      ),
                                                                  ],
                                                                },
                                                              ),
                                                              (0, a.jsx)(
                                                                "span",
                                                                {
                                                                  className: `prog-tag prog-tag-${e.category}`,
                                                                  children:
                                                                    F[
                                                                      e.category
                                                                    ] ??
                                                                    e.category,
                                                                },
                                                              ),
                                                              (0, a.jsx)(
                                                                "span",
                                                                {
                                                                  className:
                                                                    "prog-card-go",
                                                                  "aria-hidden":
                                                                    "true",
                                                                  children: (0,
                                                                  a.jsx)(o.i3, {
                                                                    diagonal:
                                                                      !0,
                                                                  }),
                                                                },
                                                              ),
                                                            ],
                                                          }),
                                                          (0, a.jsx)(ea, {
                                                            name: e.name,
                                                            saved: eJ.has(
                                                              e.rowId,
                                                            ),
                                                            onToggle: () =>
                                                              e8(e),
                                                          }),
                                                        ],
                                                      },
                                                      e.id,
                                                    ),
                                                    e.id === eL &&
                                                    "list" === eP &&
                                                    te
                                                      ? (0, a.jsx)(
                                                          "li",
                                                          {
                                                            className:
                                                              "prog-miss-row",
                                                            children: te,
                                                          },
                                                          `${e.id}-miss`,
                                                        )
                                                      : null,
                                                  ],
                                                ),
                                              }),
                                            ],
                                          },
                                          e.key,
                                        );
                                      }),
                                    ],
                                  }),
                              (0, a.jsx)("p", {
                                className: "prog-foot",
                                children:
                                  "Times are IST. Each card opens that event’s page. Save events with the bookmark to build My Path; it stays on this device.",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                e2 > 0 &&
                  (0, a.jsxs)("button", {
                    type: "button",
                    className: "prog-plan-bar",
                    onClick: tn,
                    children: [
                      (0, a.jsx)(es, { filled: !0 }),
                      "My Path \xb7 ",
                      e2,
                      " saved",
                      e1.size > 0 &&
                        (0, a.jsx)("span", {
                          className: "prog-plan-bar-warn",
                          children: "Clash",
                        }),
                      (0, a.jsx)("span", {
                        className: "prog-plan-bar-go",
                        children: "View",
                      }),
                    ],
                  }),
                (0, a.jsx)(en, {
                  dialogRef: eX,
                  days: r,
                  plan: e0,
                  shareLink: () => {
                    var e, t;
                    let s;
                    return (
                      (e = window.location.origin),
                      (t = window.location.pathname),
                      (s = new URLSearchParams({ [m]: u(tt).join(",") })),
                      `${e}${t}?${s.toString()}`
                    );
                  },
                  passport: (0, a.jsx)(K, {
                    savedPaths: e5,
                    onExplore: ts,
                    hidden: eW,
                    onHide: () => ta(!0),
                    onShow: () => ta(!1),
                  }),
                  agendaFor: e4,
                  onPickGap: tr,
                  clashes: e1,
                  onRemove: (e, t) => {
                    (eK(ej.filter((t) => t !== e)),
                      eY(`Removed ${t} from My Path`));
                  },
                  onExport: () => {
                    let e = (function (e, t) {
                        let s = t.now
                            .toISOString()
                            .replace(/[-:]/g, "")
                            .replace(/\.\d{3}/, ""),
                          a = [
                            "BEGIN:VCALENDAR",
                            "VERSION:2.0",
                            "PRODID:-//PECFEST 2026//My Path//EN",
                            "CALSCALE:GREGORIAN",
                            "METHOD:PUBLISH",
                            "X-WR-CALNAME:PECFEST 2026 \xb7 My Path",
                          ];
                        for (let n of e) {
                          let e = n.eventId
                              ? `${t.origin}/events/${encodeURIComponent(n.eventId)}`
                              : "",
                            r = [
                              n.endUnknown ? "End time to be announced." : "",
                              e,
                            ]
                              .filter(Boolean)
                              .join("\n");
                          a.push(
                            "BEGIN:VEVENT",
                            `UID:${n.key}@pecfest.in`,
                            `DTSTAMP:${s}`,
                            `DTSTART:${g(n.dayKey, n.startMin)}`,
                            ...(n.endUnknown
                              ? []
                              : [`DTEND:${g(n.dayKey, n.endMin)}`]),
                            `SUMMARY:${f(n.name)}`,
                            `LOCATION:${f(n.venueUnknown ? "Venue to be confirmed" : n.venue)}`,
                            ...(r ? [`DESCRIPTION:${f(r)}`] : []),
                            ...(e ? [`URL:${e}`] : []),
                            "END:VEVENT",
                          );
                        }
                        return (
                          a.push("END:VCALENDAR"),
                          a.map(y).join("\r\n") + "\r\n"
                        );
                      })(e0, {
                        origin: window.location.origin,
                        now: new Date(),
                      }),
                      t = URL.createObjectURL(
                        new Blob([e], { type: "text/calendar;charset=utf-8" }),
                      ),
                      s = document.createElement("a");
                    ((s.href = t),
                      (s.download = "pecfest-2026-my-path.ics"),
                      document.body.appendChild(s),
                      s.click(),
                      s.remove(),
                      setTimeout(() => URL.revokeObjectURL(t), 1e3));
                  },
                  onClear: () => {
                    (eK([]), eY("Cleared My Path"));
                  },
                }),
                (0, a.jsx)("p", {
                  className: "prog-sr prog-announce",
                  role: "status",
                  "aria-live": "polite",
                  children: eq,
                }),
              ],
            });
      }
      function U(e) {
        return e.endUnknown
          ? `${e.startLabel} \xb7 end time to be announced`
          : `${e.startLabel} – ${e.endLabel}`;
      }
      function O(e) {
        return e.venueUnknown ? "Venue to be confirmed" : e.venue;
      }
      function W() {
        return (0, a.jsx)("header", {
          className: "prog-hero",
          children: (0, a.jsxs)("div", {
            className: "prog-wrap",
            children: [
              (0, a.jsx)("h1", {
                className: "prog-title",
                children: "Schedule",
              }),
              (0, a.jsx)("p", {
                className: "prog-lead",
                children:
                  "PECFEST 2026 \xb7 A Mystic Mikado \xb7 30 Oct – 1 Nov \xb7 Times are IST",
              }),
            ],
          }),
        });
      }
      function B({ eventId: e, className: t, children: s }) {
        let n = e.trim();
        return n
          ? (0, a.jsx)(l(), {
              className: t,
              href: `/events/${encodeURIComponent(n)}`,
              children: s,
            })
          : (0, a.jsx)("div", { className: `${t} is-static`, children: s });
      }
      let Z = (e) => {
        let t = Math.floor(e / 60) % 24;
        return `${t % 12 == 0 ? 12 : t % 12}:${String(e % 60).padStart(2, "0")} ${t < 12 ? "am" : "pm"}`;
      };
      function G(e, t) {
        return S(
          [
            e.name,
            e.venueUnknown ? "" : e.venue,
            e.society,
            F[e.category],
            ...e.paths.map((e) => T[e]),
          ],
          t,
        );
      }
      function V({ state: e }) {
        let t;
        return e
          ? "live" === e.kind
            ? (0, a.jsxs)("span", {
                className: "prog-live-note is-live",
                children: [
                  (0, a.jsx)("span", {
                    className: "prog-live-dot",
                    "aria-hidden": "true",
                  }),
                  " Live now",
                ],
              })
            : (0, a.jsx)("span", {
                className: "prog-live-note",
                children:
                  (t = e.inMin) >= 60
                    ? `Starts in ${Math.round(t / 60)} hr`
                    : `Starts in ${t} min`,
              })
          : null;
      }
      function H({
        query: e,
        onQuery: t,
        suggestions: s,
        dayShort: r,
        onEvent: l,
        onVenue: i,
        onPath: o,
      }) {
        let [c, d] = (0, n.useState)(!1),
          [h, p] = (0, n.useState)(-1),
          u = [
            ...s.events.map((e, t) => ({
              kind: "event",
              id: `prog-opt-e${t}`,
              event: e,
            })),
            ...s.venues.map((e, t) => ({
              kind: "venue",
              id: `prog-opt-v${t}`,
              venue: e,
            })),
            ...s.paths.map((e, t) => ({
              kind: "path",
              id: `prog-opt-p${t}`,
              path: e,
            })),
          ],
          m = c && u.length > 0,
          x = m && h >= 0 && h < u.length ? u[h].id : void 0,
          g = (e) => {
            (d(!1),
              p(-1),
              "event" === e.kind
                ? l(e.event)
                : "venue" === e.kind
                  ? i(e.venue)
                  : o(e.path));
          },
          f = (e, t) => {
            let s = u.filter((t) => t.kind === e);
            return 0 === s.length
              ? null
              : (0, a.jsxs)("div", {
                  role: "group",
                  "aria-labelledby": `prog-sg-${e}`,
                  className: "prog-suggest-group",
                  children: [
                    (0, a.jsx)("div", {
                      id: `prog-sg-${e}`,
                      className: "prog-suggest-label",
                      role: "presentation",
                      children: t,
                    }),
                    s.map((e) => {
                      let t = u.indexOf(e);
                      return (0, a.jsxs)(
                        "div",
                        {
                          id: e.id,
                          role: "option",
                          "aria-selected": t === h,
                          className: `prog-suggest-opt${t === h ? " is-active" : ""}`,
                          onMouseDown: (t) => {
                            (t.preventDefault(), g(e));
                          },
                          onMouseEnter: () => p(t),
                          children: [
                            "event" === e.kind &&
                              (0, a.jsxs)(a.Fragment, {
                                children: [
                                  (0, a.jsx)("strong", {
                                    children: e.event.name,
                                  }),
                                  (0, a.jsxs)("span", {
                                    children: [
                                      r[e.event.dayKey],
                                      " \xb7 ",
                                      e.event.startLabel,
                                      e.event.venueUnknown
                                        ? ""
                                        : ` \xb7 ${e.event.venue}`,
                                    ],
                                  }),
                                ],
                              }),
                            "venue" === e.kind &&
                              (0, a.jsxs)(a.Fragment, {
                                children: [
                                  (0, a.jsx)("strong", {
                                    children: e.venue.label,
                                  }),
                                  (0, a.jsxs)("span", {
                                    children: [
                                      e.venue.count,
                                      " ",
                                      1 === e.venue.count ? "event" : "events",
                                      " this day \xb7 show only this venue",
                                    ],
                                  }),
                                ],
                              }),
                            "path" === e.kind &&
                              (0, a.jsxs)(a.Fragment, {
                                children: [
                                  (0, a.jsx)("strong", {
                                    children: e.path.label,
                                  }),
                                  (0, a.jsx)("span", {
                                    children: "Show only this path",
                                  }),
                                ],
                              }),
                          ],
                        },
                        e.id,
                      );
                    }),
                  ],
                });
          };
        return (0, a.jsxs)("div", {
          className: "prog-search",
          children: [
            (0, a.jsx)("input", {
              type: "search",
              role: "combobox",
              "aria-autocomplete": "list",
              "aria-expanded": m,
              "aria-controls": "prog-suggest",
              "aria-activedescendant": x,
              enterKeyHint: "search",
              autoComplete: "off",
              value: e,
              onChange: (e) => {
                (t(e.target.value), d(!0), p(-1));
              },
              onFocus: () => d(!0),
              onBlur: () => d(!1),
              onKeyDown: (s) => {
                if ("ArrowDown" === s.key || "ArrowUp" === s.key) {
                  if (0 === u.length) return;
                  (s.preventDefault(), d(!0));
                  let e = u.length - 1;
                  p((t) =>
                    "ArrowDown" === s.key
                      ? t >= e
                        ? 0
                        : t + 1
                      : t <= 0
                        ? e
                        : t - 1,
                  );
                } else
                  "Enter" === s.key
                    ? x
                      ? (s.preventDefault(), g(u[h]))
                      : d(!1)
                    : "Escape" === s.key &&
                      (m
                        ? (s.preventDefault(), d(!1), p(-1))
                        : e && (s.preventDefault(), t("")));
              },
              placeholder: "Search event, venue, society or path…",
              "aria-label": "Search the programme",
            }),
            e &&
              (0, a.jsx)("button", {
                type: "button",
                className: "prog-search-clear",
                onClick: () => t(""),
                "aria-label": "Clear search",
                children: "\xd7",
              }),
            (0, a.jsxs)("div", {
              id: "prog-suggest",
              role: "listbox",
              "aria-label": "Suggestions",
              className: "prog-suggest",
              hidden: !m,
              children: [
                f("event", "Events \xb7 opens the event"),
                f("venue", "Venues"),
                f("path", "Paths"),
              ],
            }),
            (0, a.jsx)("p", {
              className: "prog-sr",
              role: "status",
              "aria-live": "polite",
              children:
                e.trim() && c
                  ? 0 === u.length
                    ? "No suggestions"
                    : `${u.length} ${1 === u.length ? "suggestion" : "suggestions"}, use the arrow keys`
                  : "",
            }),
          ],
        });
      }
      function Q({
        tiles: e,
        selected: t,
        highlighted: s,
        onPick: n,
        onClear: r,
      }) {
        return 0 === e.length
          ? null
          : (0, a.jsxs)("section", {
              className: "prog-map",
              "aria-labelledby": "prog-map-title",
              children: [
                (0, a.jsxs)("header", {
                  className: "prog-map-head",
                  children: [
                    (0, a.jsx)("h3", {
                      id: "prog-map-title",
                      children: "Festival grounds",
                    }),
                    (0, a.jsx)("span", {
                      className: "prog-map-badge",
                      children: "Schematic \xb7 not to scale",
                    }),
                  ],
                }),
                (0, a.jsx)("div", {
                  className: "prog-map-bar",
                  children: t
                    ? (0, a.jsx)("button", {
                        type: "button",
                        className: "prog-clear",
                        onClick: r,
                        children: "Show every venue",
                      })
                    : (0, a.jsx)("span", {
                        children: "Choose a venue to see its events",
                      }),
                }),
                (0, a.jsx)("ul", {
                  className: "prog-map-grid",
                  children: e.map((e) => {
                    let r = t === e.key,
                      l = s === e.key,
                      i =
                        null === e.firstMin
                          ? "Nothing matches"
                          : `${Z(e.firstMin)}${null !== e.lastMin ? ` – ${Z(e.lastMin)}` : ""}`;
                    return (0, a.jsx)(
                      "li",
                      {
                        children: (0, a.jsxs)("button", {
                          type: "button",
                          className: `prog-map-tile${r ? " is-on" : ""}${l ? " is-lit" : ""}${0 === e.count ? " is-empty" : ""}${e.unknown ? " is-tbc" : ""}`,
                          style: {
                            "--pin": e.unknown
                              ? "var(--prog-dim)"
                              : (function (e) {
                                  let t = 0;
                                  for (let s of e)
                                    t = (31 * t + s.codePointAt(0)) >>> 0;
                                  return R[t % R.length];
                                })(e.key),
                          },
                          "aria-pressed": r,
                          onClick: () => n(e),
                          children: [
                            (0, a.jsx)(q, {}),
                            (0, a.jsxs)("strong", {
                              children: [
                                e.label,
                                e.unknown &&
                                  (0, a.jsx)("em", {
                                    children: " \xb7 to be confirmed",
                                  }),
                              ],
                            }),
                            (0, a.jsxs)("span", {
                              className: "prog-map-n",
                              children: [
                                e.count,
                                " ",
                                1 === e.count ? "event" : "events",
                              ],
                            }),
                            (0, a.jsx)("span", {
                              className: "prog-map-span",
                              children: i,
                            }),
                            (e.live > 0 || e.peak > 1) &&
                              (0, a.jsxs)("span", {
                                className: "prog-map-flags",
                                children: [
                                  e.live > 0 &&
                                    (0, a.jsxs)("span", {
                                      className: "prog-map-live",
                                      children: [
                                        (0, a.jsx)("span", {
                                          className: "prog-live-dot",
                                          "aria-hidden": "true",
                                        }),
                                        " ",
                                        e.live,
                                        " live",
                                      ],
                                    }),
                                  e.peak > 1 &&
                                    (0, a.jsxs)("span", {
                                      children: [e.peak, " at once"],
                                    }),
                                ],
                              }),
                          ],
                        }),
                      },
                      e.key,
                    );
                  }),
                }),
              ],
            });
      }
      function q() {
        return (0, a.jsxs)("svg", {
          className: "prog-map-pin",
          viewBox: "0 0 24 24",
          width: "22",
          height: "22",
          "aria-hidden": "true",
          children: [
            (0, a.jsx)("path", {
              d: "M12 21s-6.5-6.2-6.5-11.2A6.5 6.5 0 0 1 12 3.3a6.5 6.5 0 0 1 6.5 6.5C18.5 14.8 12 21 12 21z",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.8",
            }),
            (0, a.jsx)("circle", {
              cx: "12",
              cy: "9.8",
              r: "2.4",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.8",
            }),
          ],
        });
      }
      let Y = "pecfest:passport-hidden:v1",
        X = { performing: "Performing" };
      function K({
        savedPaths: e,
        onExplore: t,
        hidden: s = !1,
        compact: r = !1,
        onHide: l,
        onShow: i,
      }) {
        let o = (0, n.useId)();
        if (s)
          return i
            ? (0, a.jsx)("p", {
                className: "prog-passport-off",
                children: (0, a.jsx)("button", {
                  type: "button",
                  className: "prog-clear",
                  onClick: i,
                  children: "Show the Five Paths Passport",
                }),
              })
            : null;
        let { explored: c, missing: d } = {
            explored: M.filter((t) => e.has(t)),
            missing: M.filter((t) => !e.has(t)),
          },
          p = (e) => e.map((e) => T[e]).join(", ");
        return (0, a.jsxs)("section", {
          className: `prog-passport${r ? " is-compact" : ""}`,
          "aria-labelledby": o,
          children: [
            (0, a.jsxs)("div", {
              className: "prog-passport-head",
              children: [
                (0, a.jsxs)("h3", {
                  id: o,
                  children: ["Five Paths \xb7 ", c.length, " of ", M.length],
                }),
                (0, a.jsx)("button", {
                  type: "button",
                  className: "prog-clear",
                  onClick: l,
                  "aria-label": "Hide the Five Paths Passport",
                  children: "Hide",
                }),
              ],
            }),
            (0, a.jsx)("ul", {
              className: "prog-passport-row",
              children: M.map((s) => {
                let n = h.R7.find((e) => e.id === s),
                  r = e.has(s);
                return (0, a.jsx)(
                  "li",
                  {
                    children: r
                      ? (0, a.jsxs)("span", {
                          className: `prog-stamp is-done prog-cat-${s}`,
                          role: "img",
                          "aria-label": `${n.label}: saved`,
                          title: `${n.label}: saved`,
                          children: [
                            (0, a.jsx)("span", {
                              lang: "ja",
                              "aria-hidden": "true",
                              children: n.mark,
                            }),
                            (0, a.jsx)("small", {
                              "aria-hidden": "true",
                              children: X[s] ?? n.label,
                            }),
                          ],
                        })
                      : (0, a.jsxs)("button", {
                          type: "button",
                          className: `prog-stamp prog-cat-${s}`,
                          onClick: () => t(s),
                          "aria-label": `Find a ${n.label} event`,
                          title: `Find a ${n.label} event`,
                          children: [
                            (0, a.jsx)("span", {
                              lang: "ja",
                              "aria-hidden": "true",
                              children: n.mark,
                            }),
                            (0, a.jsx)("small", {
                              "aria-hidden": "true",
                              children: X[s] ?? n.label,
                            }),
                          ],
                        }),
                  },
                  s,
                );
              }),
            }),
            (0, a.jsxs)("p", {
              className: "prog-passport-note",
              children: [
                c.length > 0 &&
                  (0, a.jsxs)(a.Fragment, {
                    children: ["Saved: ", p(c), ". "],
                  }),
                d.length > 0 &&
                  (0, a.jsxs)(a.Fragment, {
                    children: ["Not yet: ", p(d), "."],
                  }),
              ],
            }),
            (0, a.jsx)("p", {
              className: "prog-passport-note",
              children:
                c.length === M.length
                  ? "Every path is in your plan."
                  : "From the events you have saved, not attendance. Tap an empty stamp to explore that path.",
            }),
          ],
        });
      }
      function _({
        target: e,
        alternatives: t,
        dayLabel: s,
        onSwap: n,
        onClose: r,
      }) {
        let i = t.slice(0, 4),
          o = t.length - i.length;
        return (0, a.jsxs)("aside", {
          className: "prog-miss",
          "aria-labelledby": "prog-miss-title",
          children: [
            (0, a.jsxs)("header", {
              className: "prog-miss-head",
              children: [
                (0, a.jsxs)("div", {
                  children: [
                    (0, a.jsx)("h3", {
                      id: "prog-miss-title",
                      children: "What you’ll miss",
                    }),
                    (0, a.jsxs)("p", {
                      children: [
                        (0, a.jsx)("strong", { children: e.name }),
                        " (",
                        U(e),
                        ") runs alongside ",
                        t.length,
                        " ",
                        1 === t.length ? "other event" : "other events",
                        " on ",
                        s,
                        ".",
                      ],
                    }),
                  ],
                }),
                (0, a.jsx)("button", {
                  type: "button",
                  className: "prog-plan-close",
                  onClick: r,
                  "aria-label": "Close what you'll miss",
                  children: "\xd7",
                }),
              ],
            }),
            (0, a.jsx)("ul", {
              className: "prog-miss-list",
              children: i.map((t) => {
                let s;
                return (0, a.jsxs)(
                  "li",
                  {
                    children: [
                      (0, a.jsxs)("span", {
                        className: "prog-miss-what",
                        children: [
                          t.eventId.trim()
                            ? (0, a.jsx)(l(), {
                                href: `/events/${encodeURIComponent(t.eventId.trim())}`,
                                children: t.name,
                              })
                            : (0, a.jsx)("strong", { children: t.name }),
                          (0, a.jsxs)("span", {
                            children: [U(t), " \xb7 ", O(t)],
                          }),
                          (0, a.jsx)("span", {
                            className: "prog-miss-facts",
                            children: ((s = [
                              t.paths.map((e) => T[e]).join(" & ") ||
                                (F[t.category] ?? ""),
                            ]),
                            t.isFree
                              ? s.push("Free entry")
                              : t.fee > 0 && s.push(`₹${t.fee}`),
                            s.push(t.isTeamEvent ? "Team" : "Solo"),
                            s.filter(Boolean)).join(" \xb7 "),
                          }),
                        ],
                      }),
                      (0, a.jsx)("button", {
                        type: "button",
                        className: "prog-plan-remove",
                        onClick: () => n(t),
                        "aria-label": `Swap ${e.name} for ${t.name}`,
                        children: "Swap",
                      }),
                    ],
                  },
                  t.id,
                );
              }),
            }),
            o > 0 &&
              (0, a.jsxs)("p", {
                className: "prog-miss-more",
                children: ["and ", o, " more at this time"],
              }),
          ],
        });
      }
      function J({
        day: e,
        budgetId: t,
        from: s,
        page: n,
        saved: r,
        savedPaths: i,
        onBudget: o,
        onFrom: c,
        onPage: d,
        onToggleSave: h,
        miss: p,
        onClose: u,
      }) {
        var m, x;
        let g,
          f = k.find((e) => e.id === t) ?? k[1],
          y =
            ((m = f.minutes),
            {
              start: (g = Math.max(0, Math.min(1439, Math.floor(s)))),
              end: null === m ? 1440 : Math.min(1440, g + m),
            }),
          w =
            ((x = e.entries),
            v(
              x.filter((e) => !r.has(e.rowId) && j(e, y)),
              i,
            )),
          M = Math.max(1, Math.ceil(w.length / 3)),
          $ = n % M,
          C = w.slice(3 * $, 3 * $ + 3);
        return (0, a.jsxs)("section", {
          className: "prog-budget",
          id: "prog-budget",
          "aria-labelledby": "prog-budget-title",
          children: [
            (0, a.jsxs)("header", {
              className: "prog-budget-head",
              children: [
                (0, a.jsx)("h2", {
                  id: "prog-budget-title",
                  children: "How much time do you have?",
                }),
                (0, a.jsx)("button", {
                  type: "button",
                  className: "prog-plan-close",
                  onClick: u,
                  "aria-label": "Close time finder",
                  children: "\xd7",
                }),
              ],
            }),
            (0, a.jsxs)("div", {
              className: "prog-budget-controls",
              children: [
                (0, a.jsx)("div", {
                  className: "prog-budget-opts",
                  role: "group",
                  "aria-label": "Time available",
                  children: k.map((e) =>
                    (0, a.jsx)(
                      "button",
                      {
                        type: "button",
                        "aria-pressed": e.id === f.id,
                        className: e.id === f.id ? "is-on" : "",
                        onClick: () => o(e.id),
                        children: e.label,
                      },
                      e.id,
                    ),
                  ),
                }),
                (0, a.jsxs)("label", {
                  className: "prog-budget-from",
                  children: [
                    "Starting",
                    (0, a.jsx)("select", {
                      value: s,
                      onChange: (e) => c(Number(e.target.value)),
                      children: N.map((e) =>
                        (0, a.jsx)("option", { value: e, children: Z(e) }, e),
                      ),
                    }),
                    (0, a.jsxs)("span", { children: ["on ", e.weekdayLabel] }),
                  ],
                }),
              ],
            }),
            (0, a.jsx)("p", {
              className: "prog-budget-count",
              "aria-live": "polite",
              children:
                0 === w.length
                  ? `Nothing fits between ${Z(y.start)} and ${Z(y.end)}. Try more time or an earlier start.`
                  : `${w.length} ${1 === w.length ? "event fits" : "events fit"} between ${Z(y.start)} and ${Z(y.end)}${w.length > 3 ? ` \xb7 showing ${3 * $ + 1}–${3 * $ + C.length}` : ""}`,
            }),
            C.length > 0 &&
              (0, a.jsx)("ol", {
                className: "prog-budget-list",
                children: C.map((e) => {
                  let t = y.end - e.endMin,
                    s = b(e, { savedPaths: i, pathLabels: T });
                  return (0, a.jsxs)(
                    "li",
                    {
                      children: [
                        (0, a.jsxs)("span", {
                          className: "prog-miss-what",
                          children: [
                            e.eventId.trim()
                              ? (0, a.jsx)(l(), {
                                  href: `/events/${encodeURIComponent(e.eventId.trim())}`,
                                  children: e.name,
                                })
                              : (0, a.jsx)("strong", { children: e.name }),
                            (0, a.jsxs)("span", {
                              children: [U(e), " \xb7 ", O(e)],
                            }),
                            (0, a.jsx)("span", {
                              className: "prog-miss-facts",
                              children: [
                                null !== f.minutes && t > 0
                                  ? `${t} min to spare`
                                  : "",
                                null !== f.minutes && 0 === t
                                  ? "Uses all of it"
                                  : "",
                                ...s,
                              ]
                                .filter(Boolean)
                                .join(" \xb7 "),
                            }),
                          ],
                        }),
                        (0, a.jsx)(ea, {
                          name: e.name,
                          saved: r.has(e.rowId),
                          onToggle: () => h(e),
                        }),
                      ],
                    },
                    e.id,
                  );
                }),
              }),
            p,
            M > 1 &&
              (0, a.jsx)("button", {
                type: "button",
                className: "prog-clear",
                onClick: () => d($ + 1),
                children:
                  $ + 1 < M ? "Show 3 more" : "Back to the best matches",
              }),
          ],
        });
      }
      let ee = (e) => ("session" === e.kind ? e.session.startMin : e.gap.start);
      function et({ gap: e, fits: t, active: s = !1, onPick: n }) {
        let r = `${Z(e.start)} – ${Z(e.end)}`;
        return 0 === t
          ? (0, a.jsxs)("span", {
              className: "prog-gap is-none",
              children: ["Free ", r, " \xb7 nothing else fits"],
            })
          : (0, a.jsxs)("button", {
              type: "button",
              className: `prog-gap${s ? " is-on" : ""}`,
              "aria-pressed": s,
              onClick: n,
              children: [
                "Free ",
                r,
                " \xb7 ",
                (0, a.jsxs)("strong", {
                  children: [t, " ", 1 === t ? "event fits" : "events fit"],
                }),
              ],
            });
      }
      function es({ filled: e }) {
        return (0, a.jsx)("svg", {
          className: "prog-bm",
          viewBox: "0 0 16 16",
          width: "14",
          height: "14",
          "aria-hidden": "true",
          children: (0, a.jsx)("path", {
            d: "M4 2h8v12l-4-3-4 3z",
            fill: e ? "currentColor" : "none",
            stroke: "currentColor",
            strokeWidth: "1.4",
            strokeLinejoin: "round",
          }),
        });
      }
      function ea({ name: e, saved: t, onToggle: s }) {
        return (0, a.jsx)("button", {
          type: "button",
          className: `prog-save${t ? " is-saved" : ""}`,
          "aria-pressed": t,
          "aria-label": t ? `Remove ${e} from My Path` : `Save ${e} to My Path`,
          title: t ? "Saved to My Path" : "Save to My Path",
          onClick: s,
          children: (0, a.jsx)(es, { filled: t }),
        });
      }
      function en({
        dialogRef: e,
        days: t,
        plan: s,
        shareLink: r,
        passport: i,
        agendaFor: o,
        onPickGap: c,
        clashes: d,
        onRemove: h,
        onExport: p,
        onClear: u,
      }) {
        let m = () => e.current?.close(),
          [x, g] = (0, n.useState)(null),
          [f, y] = (0, n.useState)(""),
          j = async () => {
            let e = r();
            g(e);
            try {
              (await navigator.clipboard.writeText(e),
                y("Link copied. It holds only the events, nothing about you."));
            } catch {
              y("Copy the link below to share your plan.");
            }
          },
          b = t
            .filter((e) => s.some((t) => t.dayKey === e.key))
            .map((e) => ({ day: e, items: o(e.key) }));
        return (0, a.jsx)("dialog", {
          ref: e,
          className: "prog-plan",
          "aria-labelledby": "prog-plan-title",
          onClick: (e) => {
            e.target === e.currentTarget && m();
          },
          children: (0, a.jsxs)("div", {
            className: "prog-plan-inner",
            children: [
              (0, a.jsxs)("header", {
                className: "prog-plan-head",
                children: [
                  (0, a.jsxs)("div", {
                    children: [
                      (0, a.jsx)("h2", {
                        id: "prog-plan-title",
                        children: "My Path",
                      }),
                      (0, a.jsx)("p", {
                        children: "Saved on this device. Times are IST.",
                      }),
                    ],
                  }),
                  (0, a.jsx)("button", {
                    type: "button",
                    className: "prog-plan-close",
                    onClick: m,
                    "aria-label": "Close My Path",
                    children: "\xd7",
                  }),
                ],
              }),
              b.length > 0 && i,
              0 === b.length
                ? (0, a.jsx)("p", {
                    className: "prog-plan-empty",
                    children:
                      "Nothing saved yet. Tap the bookmark on any event to add it here.",
                  })
                : b.map(({ day: e, items: t }) => {
                    let s = t.filter((e) => "session" === e.kind).length;
                    return (0, a.jsxs)(
                      "section",
                      {
                        className: "prog-plan-day",
                        children: [
                          (0, a.jsxs)("h3", {
                            children: [
                              e.weekdayLabel,
                              ", ",
                              e.dateLabel,
                              (0, a.jsxs)("span", {
                                children: [
                                  s,
                                  " ",
                                  1 === s ? "event" : "events",
                                ],
                              }),
                            ],
                          }),
                          (0, a.jsx)("ol", {
                            children: t.map((t) => {
                              if ("gap" === t.kind)
                                return (0, a.jsx)(
                                  "li",
                                  {
                                    className: "prog-plan-gap",
                                    children: (0, a.jsx)(et, {
                                      gap: t.gap,
                                      fits: t.fits,
                                      onPick: () => c(e.key, t.gap, t.fits),
                                    }),
                                  },
                                  `gap-${t.gap.start}`,
                                );
                              let s = t.session;
                              return (0, a.jsxs)(
                                "li",
                                {
                                  className: d.has(s.key) ? "is-clash" : "",
                                  children: [
                                    (0, a.jsxs)("span", {
                                      className: "prog-plan-time",
                                      children: [
                                        Z(s.startMin),
                                        !s.endUnknown &&
                                          (0, a.jsxs)(a.Fragment, {
                                            children: [" – ", Z(s.endMin)],
                                          }),
                                      ],
                                    }),
                                    (0, a.jsxs)("span", {
                                      className: "prog-plan-what",
                                      children: [
                                        s.eventId.trim()
                                          ? (0, a.jsx)(l(), {
                                              href: `/events/${encodeURIComponent(s.eventId.trim())}`,
                                              onClick: m,
                                              children: s.name,
                                            })
                                          : (0, a.jsx)("strong", {
                                              children: s.name,
                                            }),
                                        (0, a.jsxs)("span", {
                                          children: [
                                            s.venueUnknown
                                              ? "Venue to be confirmed"
                                              : s.venue,
                                            s.endUnknown &&
                                              " \xb7 end time to be announced",
                                          ],
                                        }),
                                        d.has(s.key) &&
                                          (0, a.jsxs)("span", {
                                            className: "prog-plan-warn",
                                            children: [
                                              "Clashes with ",
                                              d.get(s.key).join(", "),
                                            ],
                                          }),
                                      ],
                                    }),
                                    (0, a.jsx)("button", {
                                      type: "button",
                                      className: "prog-plan-remove",
                                      onClick: () => h(s.rowId, s.name),
                                      "aria-label": `Remove ${s.name} from My Path`,
                                      children: "Remove",
                                    }),
                                  ],
                                },
                                s.key,
                              );
                            }),
                          }),
                        ],
                      },
                      e.key,
                    );
                  }),
              b.length > 0 &&
                (0, a.jsxs)("footer", {
                  className: "prog-plan-foot",
                  children: [
                    (0, a.jsx)("button", {
                      type: "button",
                      className: "prog-plan-export",
                      onClick: p,
                      children: "Add to calendar (.ics)",
                    }),
                    (0, a.jsx)("button", {
                      type: "button",
                      className: "prog-plan-share",
                      onClick: j,
                      children: "Share plan",
                    }),
                    (0, a.jsx)("button", {
                      type: "button",
                      className: "prog-clear",
                      onClick: () => {
                        window.confirm("Remove every event from My Path?") &&
                          u();
                      },
                      children: "Clear My Path",
                    }),
                  ],
                }),
              x &&
                (0, a.jsxs)("div", {
                  className: "prog-plan-link",
                  children: [
                    (0, a.jsx)("p", { role: "status", children: f }),
                    (0, a.jsx)("input", {
                      readOnly: !0,
                      value: x,
                      "aria-label": "Share link for your plan",
                      onFocus: (e) => e.currentTarget.select(),
                    }),
                  ],
                }),
            ],
          }),
        });
      }
    },
  },
  (e) => {
    (e.O(
      0,
      [
        3611, 5864, 8680, 5592, 8500, 4987, 5911, 3018, 9678, 4388, 789, 8441,
        3794, 7358,
      ],
      () => e((e.s = 34053)),
    ),
      (_N_E = e.O()));
  },
]);
