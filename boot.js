/* Pre-paint boot: apply theme + language before first render (loaded synchronously in <head>).
   Default theme is time-based (dark 20:00–06:00, light otherwise); a saved manual choice wins.
   Stored values are validated against an allowlist before being applied to the DOM. */
(function () {
  var root = document.documentElement;
  var theme = null, lang = null;
  try {
    theme = localStorage.getItem("bb-theme");
    lang = localStorage.getItem("bb-lang");
  } catch (e) {}
  if (theme !== "dark" && theme !== "light") {
    var h = new Date().getHours();
    theme = (h >= 20 || h < 6) ? "dark" : "light";
  }
  root.setAttribute("data-theme", theme);
  root.setAttribute("lang", lang === "en" ? "en" : "sv");
})();
