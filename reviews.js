/* v1 ===== BambooBrush – produktrecensioner =====
   Skickar recensioner till Cloudflare Worker för Telegram-moderering,
   och visar godkända recensioner. Degradar tyst om Workern inte är uppe. */
(() => {
  "use strict";

  // Byt om din Worker heter något annat:
  const API = "https://bamboobrush-reviews.dmytro-kostiuk123.workers.dev";
  const PRODUCT = "tb6";

  const $ = (s, r = document) => r.querySelector(s);
  const t = (k) => (window.I18N && window.I18N.t ? window.I18N.t(k) : k);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // 5 tecken: n fyllda ★ följt av tomma ☆
  const stars = (n) => "★★★★★☆☆☆☆☆".slice(5 - n, 10 - n);

  /* ---------- Visa godkända recensioner ---------- */
  const list = $("#reviewsList");
  const empty = $("#reviewsEmpty");

  async function loadReviews() {
    if (!list) return;
    try {
      const res = await fetch(API + "/reviews?product=" + encodeURIComponent(PRODUCT));
      if (!res.ok) return;
      const data = await res.json();
      const reviews = Array.isArray(data.reviews) ? data.reviews : [];
      if (!reviews.length) return; // behåll tomt-läget
      if (empty) empty.hidden = true;
      const frag = document.createDocumentFragment();
      reviews.forEach((r) => {
        const rating = Math.max(1, Math.min(5, parseInt(r.rating, 10) || 5));
        const el = document.createElement("article");
        el.className = "review-card";
        el.innerHTML =
          '<div class="review-card__head">' +
            '<span class="review-card__name">' + esc(r.name || t("rev_js_anon")) + "</span>" +
            '<span class="review-card__stars" aria-label="' + rating + ' av 5">' + stars(rating) + "</span>" +
          "</div>" +
          '<p class="review-card__text">' + esc(r.text || "") + "</p>" +
          (r.date ? '<span class="review-card__date">' + esc(r.date) + "</span>" : "");
        frag.appendChild(el);
      });
      if (empty) list.insertBefore(frag, empty);
      else list.appendChild(frag);
    } catch (e) { /* Worker offline → behåll tomt-läget */ }
  }

  /* ---------- Stjärninmatning ---------- */
  const starInput = $("#starInput");
  const ratingField = $("#rvRating");
  let rating = 0;
  if (starInput && ratingField) {
    const btns = [...starInput.querySelectorAll(".star")];
    const paint = (n) => btns.forEach((b, i) => b.classList.toggle("is-on", i < n));
    btns.forEach((b) => {
      b.addEventListener("click", () => { rating = +b.dataset.v; ratingField.value = rating; paint(rating); });
      b.addEventListener("mouseenter", () => paint(+b.dataset.v));
    });
    starInput.addEventListener("mouseleave", () => paint(rating));
  }

  /* ---------- Skicka recension ---------- */
  const form = $("#reviewForm");
  const msg = $("#rvMsg");
  function show(t, isErr) { if (msg) { msg.textContent = t; msg.classList.toggle("is-error", !!isErr); } }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = ($("#rvName").value || "").trim();
      const text = ($("#rvText").value || "").trim();
      const website = (($("#rvWebsite") || {}).value || "").trim(); // honeypot – ska vara tom
      if (!name || !text || !rating) { show(t("rev_js_fill"), true); return; }

      const btn = $("#rvSubmit");
      btn.disabled = true;
      show(t("rev_js_sending"), false);
      try {
        const res = await fetch(API + "/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product: PRODUCT, name, rating, text, website }),
        });
        if (!res.ok) throw new Error("bad");
        form.reset();
        rating = 0; ratingField.value = 0;
        if (starInput) starInput.querySelectorAll(".star").forEach((s) => s.classList.remove("is-on"));
        show(t("rev_js_thanks"), false);
      } catch (err) {
        show(t("rev_js_error"), true);
      } finally {
        btn.disabled = false;
      }
    });
  }

  loadReviews();
})();
