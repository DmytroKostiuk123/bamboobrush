/* Pre-paint boot: apply theme + language before first render (loaded synchronously in <head>).
   Default theme is time-based (light 06:00–19:00, dark otherwise); a manual toggle overrides
   for the current session only (resets next visit so the time-of-day default applies again).
   Stored values are validated against an allowlist before being applied to the DOM. */
(function () {
  var root = document.documentElement;

  // Anti-clickjacking guard. GitHub Pages can't send X-Frame-Options, and
  // frame-ancestors is ignored in a <meta> CSP, so if this page is loaded
  // inside a frame on another origin, break out to the top-level window.
  try {
    if (window.top !== window.self) {
      window.top.location = window.self.location;
    }
  } catch (e) {
    // Cross-origin access threw — we're definitely framed by a foreign site.
    root.style.display = "none";
  }

  var theme = null, lang = null;
  try {
    // Theme override is session-only, so each new visit falls back to the time-of-day default.
    theme = sessionStorage.getItem("bb-theme");
    localStorage.removeItem("bb-theme"); // drop any old persistent choice from before
    lang = localStorage.getItem("bb-lang");
  } catch (e) {}
  if (theme !== "dark" && theme !== "light") {
    var h = new Date().getHours();
    theme = (h >= 19 || h < 6) ? "dark" : "light";
  }
  root.setAttribute("data-theme", theme);
  root.setAttribute("lang", lang === "en" ? "en" : "sv");
})();
