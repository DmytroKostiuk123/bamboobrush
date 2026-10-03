/* Cookie consent + Google Ads tag (Google Consent Mode v2).
   No Google request or cookie happens until the visitor clicks "Acceptera".
   The choice is stored in localStorage "bb-consent" ("granted" | "denied").
   Kept in an external file with no inline code so the strict CSP stays intact. */
(function () {
  var AW = "AW-18327932244";

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  var stored = null;
  try { stored = localStorage.getItem("bb-consent"); } catch (e) {}
  if (stored !== "granted" && stored !== "denied") stored = null;
  var granted = stored === "granted";

  // Consent Mode v2 — everything denied by default; only lifted after explicit consent.
  gtag("consent", "default", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: "denied",
    wait_for_update: 500
  });
  gtag("js", new Date());
  gtag("config", AW);

  var tagLoaded = false;
  function loadGoogleTag() {
    if (tagLoaded) return;
    tagLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + AW;
    document.head.appendChild(s);
  }
  // If the visitor accepted on a previous visit, load the tag right away.
  if (granted) loadGoogleTag();

  function setConsent(state) {
    try { localStorage.setItem("bb-consent", state); } catch (e) {}
    if (state === "granted") {
      gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted"
      });
      loadGoogleTag();
    }
    hideBanner();
  }

  /* ---- Consent banner (injected on DOMContentLoaded; CSP-safe, no inline) ---- */
  var banner = null;
  function hideBanner() { if (banner) banner.hidden = true; }
  function showBanner() { if (banner) banner.hidden = false; }

  function build() {
    // English on English pages (the blog's /en/ pages) or when the visitor picked EN in the shop.
    var en = (document.documentElement.getAttribute("lang") || "").slice(0, 2) === "en";
    try { if (localStorage.getItem("bb-lang") === "en") en = true; } catch (e) {}

    banner = document.createElement("div");
    banner.className = "cookiebar";
    banner.hidden = true;
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", en ? "Cookie consent" : "Cookie-samtycke");

    var p = document.createElement("p");
    p.className = "cookiebar__text";
    p.innerHTML = en
      ? 'We use cookies to measure and improve our ads. Essential cookies (such as language and theme) are always used. <a href="/policies/privacy-policy.html">Read more</a>.'
      : 'Vi använder cookies för att mäta och förbättra våra annonser. Nödvändiga cookies (t.ex. språk och tema) används alltid. <a href="/policies/privacy-policy.html">Läs mer</a>.';
    banner.appendChild(p);

    var actions = document.createElement("div");
    actions.className = "cookiebar__actions";

    var no = document.createElement("button");
    no.type = "button";
    no.className = "btn btn--ghost cookiebar__btn";
    no.textContent = en ? "Decline" : "Neka";
    no.addEventListener("click", function () { setConsent("denied"); });

    var yes = document.createElement("button");
    yes.type = "button";
    yes.className = "btn btn--primary cookiebar__btn";
    yes.textContent = en ? "Accept" : "Acceptera";
    yes.addEventListener("click", function () { setConsent("granted"); });

    actions.appendChild(no);
    actions.appendChild(yes);
    banner.appendChild(actions);
    document.body.appendChild(banner);

    // "Cookie-inställningar" link in the footer so the choice can always be changed/withdrawn.
    var foot = document.querySelector(".footer__bottom");
    if (foot) {
      var link = document.createElement("button");
      link.type = "button";
      link.className = "cookie-settings-link";
      link.textContent = "Cookie-inställningar";
      link.addEventListener("click", showBanner);
      foot.appendChild(link);
    }

    if (!stored) showBanner(); // first visit, no choice yet
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else { build(); }
})();
