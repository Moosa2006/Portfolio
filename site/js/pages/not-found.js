import { h } from "../core/dom.js";

export const title = "Moosa | Full-Stack Developer & Problem Solver";

// Mirrors the framework's default 404 screen that the original site serves.
export default function notFound({ scope }) {
  const prevBodyStyle = document.body.getAttribute("style");
  scope.add(() => {
    if (prevBodyStyle === null) document.body.removeAttribute("style");
    else document.body.setAttribute("style", prevBodyStyle);
  });
  return h(
    "div",
    {
      style:
        'font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"; height: 100vh; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;',
    },
    h(
      "div",
      null,
      h("style", null, "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"),
      h(
        "h1",
        {
          className: "next-error-h1",
          style: "display: inline-block; margin: 0px 20px 0px 0px; padding: 0px 23px 0px 0px; font-size: 24px; font-weight: 500; vertical-align: top; line-height: 49px;",
        },
        "404",
      ),
      h("div", { style: "display: inline-block;" }, h("h2", { style: "font-size: 14px; font-weight: 400; line-height: 49px; margin: 0px;" }, "This page could not be found.")),
    ),
  );
}
