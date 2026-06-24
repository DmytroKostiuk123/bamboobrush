/* Theme toggle + footer year for policy pages.
   Default theme is time-based: dark 20:00–06:00, light otherwise. A saved manual choice always wins. */
(function () {
  var root = document.documentElement;
  function timeTheme() {
    var h = new Date().getHours();
    return (h >= 20 || h < 6) ? "dark" : "light";
  }
  try {
    var saved = localStorage.getItem("bb-theme");
    root.setAttribute("data-theme", saved || timeTheme());
  } catch (e) { root.setAttribute("data-theme", timeTheme()); }

  document.addEventListener("DOMContentLoaded", function () {
    var t = document.getElementById("themeToggle");
    if (t) {
      t.setAttribute("aria-pressed", String(root.getAttribute("data-theme") === "dark"));
      t.addEventListener("click", function () {
        var cur = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", cur);
        try { localStorage.setItem("bb-theme", cur); } catch (e) {}
        t.setAttribute("aria-pressed", String(cur === "dark"));
      });
    }
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
