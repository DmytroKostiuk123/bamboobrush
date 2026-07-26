/* Fires the Google Ads "Purchase" conversion – only on the thank-you page (tack.html).
   Loaded after gtag.js so window.gtag is defined. Value is a flat 230 kr per order
   (a multi-item order under-reports slightly; can be made dynamic later). */
(function () {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: "AW-18327932244/5z2gCKjA4dYcENSauKNE",
    value: 230.0,
    currency: "SEK"
  });
})();
