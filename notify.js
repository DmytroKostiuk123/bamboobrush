/* v1 ===== BambooBrush – "Notifiera mig" =====
   Samlar e-post för kommande produkter och skickar till samma Cloudflare
   Worker som recensionerna (endpoint /notify). Degraderar tyst om Workern
   inte är uppe. */
(() => {
  "use strict";

  const API = "https://bamboobrush-reviews.dmytro-kostiuk123.workers.dev";
  const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  const form = document.querySelector("#notifyForm");
  if (!form) return;

  const emailEl = document.querySelector("#notifyEmail");
  const hp = document.querySelector("#notifyHp"); // honeypot – ska vara tom
  const msg = document.querySelector("#notifyMsg");
  const product = form.getAttribute("data-product") || "unknown";

  function show(text, isErr) {
    if (!msg) return;
    msg.textContent = text;
    msg.classList.toggle("is-error", !!isErr);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = (emailEl.value || "").trim();
    if (!EMAIL_RE.test(email)) { show("Ange en giltig e-postadress.", true); return; }

    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = true;
    show("Skickar…", false);
    try {
      const res = await fetch(API + "/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, email, website: (hp && hp.value) || "" }),
      });
      if (!res.ok) throw new Error("bad");
      form.reset();
      show("Tack! Vi mejlar dig så fort den släpps. 🌿", false);
    } catch (err) {
      show("Kunde inte skicka just nu. Försök igen om en stund.", true);
    } finally {
      if (btn) btn.disabled = false;
    }
  });
})();
