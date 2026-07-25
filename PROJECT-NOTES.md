# BambooBrush — Project handoff notes

Context summary so a new Claude chat can continue seamlessly. Read this first.

## What this is
A modern rebuild of the BambooBrush online shop (plastic-free bamboo toothbrushes with
boar bristles, "Bamboo & Boar", Swedish brand). It replaces the old Shopify store.

- **Live site:** https://bamboobrush.se  (also www.bamboobrush.se)
- **Repo:** https://github.com/DmytroKostiuk123/bamboobrush  (branch `main`)
- **Local path:** `C:\Users\boost\Desktop\Claude website\bamboobrush-2.0`
- **Owner / GitHub user:** DmytroKostiuk123 (Dmytro Kostiuk)
- **Business:** Bamboobrush, enskild näringsverksamhet, Alsättersgatan 5c, 584 35 Linköping
- **Contact:** info@bamboobrush.se · +46 73 676 53 90

## Tech stack (deliberately simple)
- **Static site** — plain HTML + CSS + vanilla JS, NO build step, NO framework.
- Hosted on **GitHub Pages** (custom domain bamboobrush.se, HTTPS enforced).
- Domain registered/DNS at **Loopia**; email (MX) stays at Loopia — untouched by web changes.
- Fonts: Google Fonts **Playfair Display** (headings) + **Nunito Sans** (body).

## File map
- `index.html` — the whole storefront (one page, many sections).
- `styles.css` — all styles; design tokens as CSS vars; dark theme is default.
- `script.js` — cart drawer, theme toggle, gallery, modal, scroll-reveal, checkout handoff.
- `i18n.js` — full SV/EN dictionary + the translation engine (`data-i18n` attributes).
- `boot.js` — tiny pre-paint script (applies saved/time-based theme + language, avoids flash).
- `assets/` — images: `logo-soft.png` (transparent logo used site-wide), `logo.jpg` (favicon),
  `hero.jpg`, `product-1/3/4.jpg` (carousel; product-2 was removed).
- `policies/` — 6 policy pages + `policy.css` + `policy.js`:
  privacy-policy, refund-policy, terms-of-service, shipping-policy, contact-information, legal-notice.
- `CNAME` — contains `bamboobrush.se` (GitHub Pages custom domain).
- `.claude/` — local dev server (`serve.ps1`, PowerShell static server on :8123) — gitignored.

## How to run locally
No Node/Python on this machine. A PowerShell static server is used:
`.claude/launch.json` has a "bamboobrush" config → serves `bamboobrush-2.0/` on http://localhost:8123
via `.claude/serve.ps1`. (Preview tools start it by name "bamboobrush".)

## How to publish changes
Everything is committed + pushed to GitHub; Pages redeploys in ~1 min. Standard flow:
```
cd "C:\Users\boost\Desktop\Claude website\bamboobrush-2.0"
git add -A
git commit -m "..."
git push
```
Notes:
- Git is at `C:\Users\boost\Desktop\Claude website\Git\cmd\git.exe`; credential helper = bundled GCM
  (browser login). Commit identity set locally to boostedmonkey7x@gmail.com / boostedmonkey7x.
- PowerShell here-strings break commit messages with parens/quotes — use multiple `-m` flags.
- Commit trailer used: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- After deploy, hard-refresh (Ctrl+F5) — the browser caches CSS/JS/images.

## Payments (IMPORTANT — this is a real, live shop)
- Checkout is **real** via **Stripe**. Cart → "Till kassan" → **Cloudflare Worker** → Stripe Checkout.
- The Worker (`bamboobrush-checkout.dmytro-kostiuk123.workers.dev`) creates a Stripe Checkout Session
  with the chosen **quantity** (this solved the "quantity didn't carry over" problem that a plain
  Payment Link had). It sets: line item (Price ID `price_1TwgGZKFFPvE5lcPxI9Oq0XZ`), quantity from
  `?qty=N`, shipping (49 kr DHL, inline), `allow_promotion_codes`, Sweden shipping address, success/
  cancel URLs → then 303-redirects to Stripe.
- Worker URL is referenced in `script.js` as `CHECKOUT_URL`.
- **Stripe secret key** lives ONLY as an encrypted `STRIPE_SECRET_KEY` secret in the Cloudflare Worker
  — never in the repo or site. Do not put it in code.
- Payment methods: Card, Klarna, Amazon Pay (Swish if Stripe offers it).
- Product price: 230 kr (tax-inclusive). Shipping: flat 49 kr DHL. NO free-shipping threshold.
- Promo: coupon "50 kr rabatt", promotion code **`SPARA50`**, min order 350 kr (i.e. 2+ packs).
- Fulfilment is manual (owner ships from the Stripe dashboard order info).

## Key features/state
- Bilingual **SV/EN** toggle (top-right); Swedish is default. All copy is in `i18n.js`.
- **Theme:** time-based default (dark 20:00–06:00, light otherwise); manual toggle persists.
- Sections: announcement marquee, hero (headline "Ren munvård – helt utan *mikroplaster*"),
  value strip, product + gallery (3 thumbs), "Varför BambooBrush?" cards, microplastics section
  with a "Läs mer" modal, "Så enkelt är det" steps, environmental **NGO links** section, FAQ,
  trust bar (Klarna/Visa/Mastercard/Swish), footer.
- **Security:** strict Content-Security-Policy on every page (script/connect self-only, no
  inline styles/scripts, fonts limited to Google Fonts), referrer policy, storage values validated.
- Images were optimized (~6.7 MB → ~0.9 MB), EXIF rotation baked in, lazy-loading + hero preload.

## Migration status (Shopify → new site)
DONE: DNS repointed at Loopia (A records → GitHub 185.199.108–111.153; www CNAME →
dmytrokostiuk123.github.io), domain verified on GitHub account, custom domain set on the
bamboobrush repo, HTTPS active. Site + email confirmed working on bamboobrush.se.

⚠️ **Still to do by the owner:** do a real end-to-end test purchase (confirm order + qty + address
in Stripe, then refund via Transactions → payment → Refund), then **cancel the Shopify subscription**
(Shopify admin → Settings → Plan). Shopify data was already exported. Email is safe (MX at Loopia).

## Known follow-ups / ideas (not done)
- Add org/VAT number to the legal page (currently "lämnas på begäran"; Swedish e-com usually requires it).
- Optional: self-host Google Fonts for stricter GDPR.
- Optional: real logo image swap if a different file is preferred.
- The exact "tube standing against birch log" photo exists as
  `C:\Users\boost\Desktop\Bamboobrush\Bamboobrush main.jpg` (a compressed copy exists) if the owner
  wants it as the main product image.

## Working style notes
- Owner is a beginner on Windows — give step-by-step, verify changes live before saying done.
- Product photos originals live in `C:\Users\boost\Desktop\Bamboobrush`.
- Bristles are **boar/galt** ("proteinbaserat galtborst"), whole brush is compostable, shipping
  from Sweden, flat 49 kr — keep copy consistent with these facts.
