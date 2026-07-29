/* Theme toggle + footer year for blog pages.
   Default theme is time-based: dark 20:00–06:00, light otherwise. A saved manual choice always wins. */
(function () {
  var root = document.documentElement;
  function timeTheme() {
    var h = new Date().getHours();
    return (h >= 20 || h < 6) ? "dark" : "light";
  }
  try {
    var saved = sessionStorage.getItem("bb-theme");
    if (saved !== "dark" && saved !== "light") saved = null; // allowlist stored value
    root.setAttribute("data-theme", saved || timeTheme());
  } catch (e) { root.setAttribute("data-theme", timeTheme()); }

  document.addEventListener("DOMContentLoaded", function () {
    var t = document.getElementById("themeToggle");
    if (t) {
      t.setAttribute("aria-pressed", String(root.getAttribute("data-theme") === "dark"));
      t.addEventListener("click", function () {
        var cur = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", cur);
        try { sessionStorage.setItem("bb-theme", cur); } catch (e) {}
        t.setAttribute("aria-pressed", String(cur === "dark"));
      });
    }
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    var body = document.querySelector(".article__body");

    // Auto reading time (~200 words/min)
    var rt = document.querySelector("[data-reading-time]");
    if (rt && body) {
      var words = (body.innerText || "").trim().split(/\s+/).filter(Boolean).length;
      rt.textContent = Math.max(1, Math.round(words / 200)) + " min läsning";
    }

    // Auto table of contents built from the article's H2 headings
    var toc = document.querySelector("[data-toc]");
    if (toc && body) {
      var hs = body.querySelectorAll("h2");
      if (hs.length >= 3) {
        var ul = document.createElement("ul");
        Array.prototype.forEach.call(hs, function (h, i) {
          if (!h.id) {
            h.id = "sec-" + (i + 1) + "-" + (h.textContent || "").toLowerCase()
              .replace(/[^a-z0-9åäö]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
          }
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.href = "#" + h.id;
          a.textContent = h.textContent;
          li.appendChild(a);
          ul.appendChild(li);
        });
        toc.appendChild(ul);
      } else {
        toc.hidden = true;
      }
    }
  });
})();
