"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [4222],
  {
    74320: (e, t, n) => {
      n.d(t, { P: () => r });
      let r = [
        {
          id: "cultural",
          number: "01",
          name: "The art of expression",
          virtue: "Cultural",
          kanji: "華",
          description:
            "For the ones who turn a moment into a movement. Let your colours speak.",
          category: "ART \xb7 CULTURE \xb7 EXPRESSION",
        },
        {
          id: "technical",
          number: "02",
          name: "The pursuit of possibility",
          virtue: "Technical",
          kanji: "技",
          description:
            "Question the familiar. Build the impossible. Leave something new behind.",
          category: "BUILD \xb7 BREAK \xb7 REIMAGINE",
        },
        {
          id: "literary",
          number: "03",
          name: "The weight of a word",
          virtue: "Literary",
          kanji: "文",
          description: "An idea. A voice. A room that listens.",
          category: "WORDS \xb7 WIT \xb7 WONDER",
        },
        {
          id: "gaming",
          number: "04",
          name: "The instinct to conquer",
          virtue: "Gaming",
          kanji: "勝",
          description:
            "Find your focus. Trust your team. Own the final moment.",
          category: "STRATEGY \xb7 SKILL \xb7 SPIRIT",
        },
        {
          id: "performing",
          number: "05",
          name: "The courage to be seen",
          virtue: "Performing Arts",
          kanji: "舞",
          description: "Step into the light. Make the stage your own.",
          category: "RHYTHM \xb7 MOVEMENT \xb7 STAGE",
        },
      ];
    },
    94222: (e, t, n) => {
      n.d(t, {
        AM: () => p,
        HD: () => i,
        Hh: () => g,
        Ob: () => d,
        VI: () => I,
        Wo: () => u,
        Ww: () => F,
        Y3: () => w,
        _v: () => x,
        er: () => T,
        fF: () => a,
        fG: () => N,
        hY: () => A,
        l1: () => $,
        pd: () => v,
        qS: () => S,
        qV: () => l,
        sX: () => E,
        tj: () => C,
        wI: () => b,
        x$: () => _,
        zG: () => y,
        zq: () => h,
      });
      var r = n(74320);
      let i = {
          card: {
            src: "/events/event-placeholder-720.webp",
            width: 720,
            height: 627,
          },
          large: {
            src: "/events/event-placeholder-1200.webp",
            width: 1200,
            height: 1044,
          },
        },
        a = { query: "", club: "all", type: "all", fee: "all", day: "all" },
        o = Object.fromEntries(r.P.map((e) => [e.id, e]));
      o.convenor = {
        id: "cultural",
        number: "00",
        name: "Flagship & Grand Stages",
        virtue: "Convenor",
        kanji: "統",
        category: "FLAGSHIP \xb7 LEADERSHIP \xb7 CEREMONY",
        description:
          "Flagship events, keynote addresses, and the heart of PECFEST.",
      };
      let u = new Proxy(o, {
        get(e, t) {
          if ("string" == typeof t && t in e) return e[t];
          if ("string" == typeof t) {
            let n = t.toLowerCase().trim();
            if (n in e) return e[n];
            if (n.includes("tech")) return e.technical;
            if (n.includes("cult")) return e.cultural;
            if (n.includes("lit")) return e.literary;
            if (n.includes("game")) return e.gaming;
            if (
              n.includes("perform") ||
              n.includes("dance") ||
              n.includes("music")
            )
              return e.performing;
            if (n.includes("conv")) return e.convenor;
          }
          return e.cultural;
        },
      });
      function l(e) {
        if (!e) return [];
        let t = [];
        if (
          ((e.poc1_name?.trim() || e.poc1_number?.trim()) &&
            t.push({
              label: "POC 1",
              name: e.poc1_name?.trim() || null,
              number: e.poc1_number?.trim() || "",
            }),
          (e.poc2_name?.trim() || e.poc2_number?.trim()) &&
            t.push({
              label: "POC 2",
              name: e.poc2_name?.trim() || null,
              number: e.poc2_number?.trim() || "",
            }),
          t.length > 0)
        )
          return t;
        let n = e.contact_info?.trim();
        if (!n) return [];
        let r = (
          n.includes("\n")
            ? n.split("\n")
            : n.includes("|")
              ? n.split("|")
              : [n]
        )
          .map((e) => e.trim())
          .filter(Boolean);
        return (
          r.forEach((e, n) => {
            let i = e.match(/^POC\s*([12])\s*[:\-]\s*(.+)$/i),
              a = e,
              o = 1 === r.length ? "Contact" : `POC ${n + 1}`;
            i && ((o = `POC ${i[1]}`), (a = i[2].trim()));
            let u = a.match(/^([^:-]+)[:\-]\s*(.+)$/);
            u
              ? t.push({ label: o, name: u[1].trim(), number: u[2].trim() })
              : t.push({ label: o, name: null, number: a });
          }),
          t
        );
      }
      let m = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      function s(e) {
        let t = e ? Date.parse(e) : NaN;
        return Number.isNaN(t) ? null : new Date(t + 198e5);
      }
      function c(e) {
        let t = s(e);
        return t
          ? `${String(t.getUTCDate()).padStart(2, "0")} ${m[t.getUTCMonth()]}`
          : "";
      }
      function f(e) {
        let t = s(e);
        if (!t) return "";
        let n = t.getUTCHours(),
          r = String(t.getUTCMinutes()).padStart(2, "0");
        return `${n % 12 || 12}:${r} ${n < 12 ? "AM" : "PM"}`;
      }
      function d(e) {
        let t = c(e.date_time),
          n = t ? `${t} \xb7 ${f(e.date_time)}` : "Schedule TBA";
        return `${n} \xb7 ${e.location || "Venue TBA"}`;
      }
      function g(e) {
        let t = c(e.date_time);
        if (!t) return "Schedule to be announced";
        let n = `${t} \xb7 ${f(e.date_time)}`,
          r = c(e.end_date_time),
          i = Date.parse(e.date_time ?? ""),
          a = e.end_date_time ? Date.parse(e.end_date_time) : NaN;
        return (
          Number.isFinite(a) &&
            Number.isFinite(i) &&
            a > i &&
            (r === t
              ? (n += ` – ${f(e.end_date_time)}`)
              : r && (n += ` – ${r} \xb7 ${f(e.end_date_time)}`)),
          n
        );
      }
      function p(e) {
        if (!e || !e.is_team_event) return "Solo";
        let t = e.min_team_members ?? 1,
          n = e.max_team_members ?? t;
        return t === n ? `Team of ${t}` : `Team (${t}–${n})`;
      }
      function _(e) {
        if (null == e) return "Free";
        let t = Number(
          ("object" == typeof e && "reg_fees" in e ? e.reg_fees : e) ?? 0,
        );
        return t > 0 ? `₹${t.toLocaleString("en-IN")}` : "Free";
      }
      function h(e) {
        if (!e || "string" != typeof e) return null;
        let t = e.trim();
        if (!t) return null;
        if (t.startsWith("http://") || t.startsWith("https://")) return t;
        let n = "https://pub-e5ca9932190a4ee0b9bb897d25594a1d.r2.dev".replace(
            /\/$/,
            "",
          ),
          r = t.replace(/^\/+/, "");
        return `${n}/${r}`;
      }
      function b(e) {
        let t = Number(e ?? 0);
        return isNaN(t) || t <= 0 ? "FREE" : `₹${t.toLocaleString("en-IN")}`;
      }
      function T(e) {
        if (null == e) return null;
        let t = String(e).trim(),
          n = t.toLowerCase();
        if (
          !t ||
          "0" === t ||
          "null" === n ||
          "undefined" === n ||
          "none" === n ||
          "n/a" === n ||
          "nil" === n ||
          "no" === n
        )
          return null;
        let r = Number(t.replace(/[₹,\s]/g, ""));
        return Number.isNaN(r)
          ? t
          : r <= 0
            ? null
            : `₹${r.toLocaleString("en-IN")}`;
      }
      function $(e) {
        if (!e) return !1;
        let t = String(e).toLowerCase().trim();
        return "goodies" === t || "goodies_worth" === t || t.includes("goodie");
      }
      function N(e, t = 1, n = 1) {
        if (!e || (t <= 1 && n <= 1)) return "Individual Event";
        let r = Math.max(1, t),
          i = Math.max(r, n);
        return r === i
          ? `Team Event \xb7 ${r} ${1 === r ? "member" : "members"}`
          : `Team Event \xb7 ${r}–${i} members`;
      }
      function y(e) {
        let t = e.image_url || h(e.image_key);
        if ("track" in e && e.track)
          return e.image_url ? e : { ...e, image_url: t };
        let n = (e.category || "cultural").toLowerCase().trim();
        return (
          o[n] || (n = "cultural"),
          {
            ...e,
            reg_fees: Number(e.reg_fees ?? 0),
            prize_money:
              void 0 !== e.prize_money &&
              null !== e.prize_money &&
              "" !== String(e.prize_money).trim()
                ? String(e.prize_money).trim()
                : null,
            display: e.display || "prize_pool",
            in_top_10: !!e.in_top_10,
            min_team_members: e.min_team_members ?? 1,
            max_team_members: e.max_team_members ?? 1,
            track: n,
            image_url: t,
          }
        );
      }
      function v(e, t) {
        let n = {
          dateStr: "TBA",
          timeStr: "TBA",
          fullDateWithTime: "Date to be announced",
          durationStr: "",
          isPast: !1,
          isToday: !1,
          isUpcoming: !0,
        };
        if (!e) return n;
        try {
          let r = new Date(e);
          if (isNaN(r.getTime())) return n;
          let i = t ? new Date(t) : null,
            a =
              i && !isNaN(i.getTime()) && i.getTime() > r.getTime() ? i : null,
            o = new Date(),
            u = a ? a.getTime() < o.getTime() : r.getTime() < o.getTime(),
            l = r.getTime() >= o.getTime(),
            m = {
              timeZone: "Asia/Kolkata",
              day: "numeric",
              month: "short",
              year: "numeric",
            },
            s = {
              timeZone: "Asia/Kolkata",
              hour: "numeric",
              minute: "2-digit",
              hour12: !0,
            },
            c = new Intl.DateTimeFormat("en-IN", m).format(r),
            f = new Intl.DateTimeFormat("en-IN", m).format(o),
            d = new Intl.DateTimeFormat("en-IN", s).format(r),
            g = d,
            p = `${c} \xb7 ${d}`,
            _ = "";
          if (a) {
            let e = new Intl.DateTimeFormat("en-IN", m).format(a),
              t = new Intl.DateTimeFormat("en-IN", s).format(a),
              n = Math.max(0, Math.round((a.getTime() - r.getTime()) / 6e4));
            if (n > 0) {
              let e = Math.floor(n / 60),
                t = n % 60;
              _ =
                e > 0 && t > 0
                  ? `${e}h ${t}m`
                  : e > 0
                    ? `${e} hr${e > 1 ? "s" : ""}`
                    : `${t} mins`;
            }
            c === e
              ? ((g = `${d} – ${t}`), (p = `${c} \xb7 ${g}`))
              : ((g = `${d} – ${t} (${e})`), (p = `${c}, ${d} – ${e}, ${t}`));
          }
          return {
            dateStr: c,
            timeStr: g,
            fullDateWithTime: p,
            durationStr: _,
            isPast: u,
            isToday: c === f,
            isUpcoming: l,
          };
        } catch (e) {
          return (console.error("Error formatting event date time:", e), n);
        }
      }
      function w(e) {
        let t = (e || "").toLowerCase(),
          n = {
            badgeBg: "bg-(--ev-gold)/10",
            badgeText: "text-(--ev-gold-soft)",
            badgeBorder: "border-(--ev-line-strong)",
            glowColor: "rgba(212, 169, 100, 0.22)",
            gradientFrom: "#0b1014",
            gradientTo: "#162024",
            accentHex: "#d4a964",
          };
        switch (t) {
          case "technical":
            return {
              label: "Technical",
              kanji: "技",
              tagline: "Code \xb7 Robotics \xb7 Innovation",
              ...n,
            };
          case "cultural":
            return {
              label: "Cultural",
              kanji: "華",
              tagline: "Music \xb7 Dance \xb7 Theatre \xb7 Arts",
              ...n,
            };
          case "convenor":
            return {
              label: "Convenor",
              kanji: "統",
              tagline: "Flagship \xb7 Ceremonies \xb7 Keynotes",
              ...n,
            };
          default:
            return {
              label: e || "Event",
              kanji: "祭",
              tagline: "PECFEST 2026 Experience",
              ...n,
            };
        }
      }
      let C = [];
      function E(e) {
        let t = (e ?? "").trim();
        if (!t || /\s/.test(t)) return null;
        let n = /^https?:\/\//i.test(t)
          ? t
          : /^[a-z0-9-]+(\.[a-z0-9-]+)+(\/|$)/i.test(t)
            ? `https://${t}`
            : null;
        if (!n) return null;
        try {
          let e = new URL(n);
          return "http:" === e.protocol || "https:" === e.protocol
            ? e.toString()
            : null;
        } catch {
          return null;
        }
      }
      function S(e) {
        let t = new Map();
        for (let n of e) {
          let e = c(n.date_time),
            r = Date.parse(n.date_time ?? "");
          e && !t.has(e)
            ? t.set(e, r)
            : e && r < (t.get(e) ?? 1 / 0) && t.set(e, r);
        }
        return [...t.entries()].sort((e, t) => e[1] - t[1]).map(([e]) => e);
      }
      function D(e, t = 2026) {
        let n = e.trim().split(/\s+/);
        if (n.length < 2) return 0;
        let r = parseInt(n[0], 10),
          i = m.indexOf(n[1].toUpperCase());
        return isNaN(r) || -1 === i ? 0 : Date.UTC(t, i, r);
      }
      function I(e) {
        return [...e].sort((e, t) => D(e) - D(t));
      }
      function A(e, t = Date.now()) {
        let n = Date.parse(e.end_date_time || e.date_time || "");
        return Number.isFinite(n) && n <= t;
      }
      function k(e) {
        return Date.parse(e.date_time || "") || 0;
      }
      function x(e, t, n = Date.now()) {
        return (function (e, t, n = "soonest", r = Date.now()) {
          let i,
            a,
            o,
            u = (n || "soonest").toLowerCase();
          if ("soonest" !== u) {
            let n = (function (e, t, n) {
              switch (n) {
                case "latest":
                  return k(t) - k(e);
                case "name_asc":
                  return (e.event_name || "").localeCompare(t.event_name || "");
                case "name_desc":
                  return (t.event_name || "").localeCompare(e.event_name || "");
                case "fee_low":
                  return Number(e.reg_fees ?? 0) - Number(t.reg_fees ?? 0);
                case "fee_high":
                  return Number(t.reg_fees ?? 0) - Number(e.reg_fees ?? 0);
                default:
                  return 0;
              }
            })(e, t, u);
            if (0 !== n) return n;
          }
          let l = !!e.in_top_10;
          if (!!t.in_top_10 !== l) return l ? -1 : 1;
          let m = !e.prize_money || "" === e.prize_money.trim();
          if (m !== (!t.prize_money || "" === t.prize_money.trim()))
            return m ? 1 : -1;
          let s =
            ((i = k(e)),
            (a = k(t)),
            (o = i > r) != a > r
              ? o
                ? -1
                : 1
              : i === a
                ? 0
                : 0 === i
                  ? 1
                  : 0 === a
                    ? -1
                    : o
                      ? i - a
                      : a - i);
          return 0 !== s
            ? s
            : (e.event_name || "").localeCompare(t.event_name || "");
        })(e, t, "soonest", n);
      }
      function F(e) {
        if (!e) return !1;
        let t = e.name?.trim(),
          n = e.college?.trim(),
          r = (e.studentId ?? e.student_id)?.trim(),
          i = (e.phoneNumber ?? e.phone_number)?.trim(),
          a = e.branch?.trim();
        return !!(t && n && r && i && a);
      }
    },
  },
]);
