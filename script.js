/* ===== BambooBrush 2.0 storefront ===== */
(() => {
  "use strict";

  // Per-page product config. A product page may carry a hidden element
  // <div id="bbProductConfig" data-id="heads" data-price="179" ...> — read here
  // (CSP blocks inline <script>, so we use data-attributes, not window globals).
  // Without it we default to the 6-pack (tb6) so existing pages are unaffected.
  // title/variant fall back to the i18n dictionary (prod_title / js_variant).
  function readProductConfig() {
    const el = document.getElementById("bbProductConfig");
    if (!el) return {};
    const d = el.dataset, cfg = {}, pd = {};
    if (d.id) cfg.id = d.id;
    if (d.price) cfg.price = Number(d.price);
    if (d.img) cfg.img = d.img;
    if (d.checkout) cfg.checkoutProduct = d.checkout;
    if (d.title) cfg.title = d.title;
    if (d.variant) cfg.variant = d.variant;
    if (d.discount2) pd[2] = Number(d.discount2);
    if (d.discount3) pd[3] = Number(d.discount3);
    if (Object.keys(pd).length) cfg.packDiscount = pd;
    return cfg;
  }
  const PRODUCT = Object.assign(
    { id: "tb6", price: 230, img: "/assets/bambutandborste-6-pack.jpg",
      checkoutProduct: "tb6", packDiscount: { 2: 40, 3: 100 } },
    readProductConfig()
  );
  const MIN_QTY = 1;
  const MAX_QTY = 20;
  const CHECKOUT_URL = "https://bamboobrush-checkout.dmytro-kostiuk123.workers.dev/";

  // Volume discount (kr off the raw qty×price total). MUST stay identical to
  // packDiscountKr() in the checkout Worker for THIS product — client display and
  // Stripe charge have to agree. Values come from PRODUCT.packDiscount.
  function packDiscountKr(q) {
    const d = PRODUCT.packDiscount || {};
    if (q >= 3) return d[3] || 0;
    if (q === 2) return d[2] || 0;
    return 0;
  }

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const kr = (n) => `${n.toLocaleString("sv-SE")} kr`;
  // i18n helper (falls back to the key if i18n.js isn't loaded)
  const t = (key, vars) => (window.I18N ? window.I18N.t(key, vars) : key);

  let cart = [];
  let pdpQty = 1;

  /* ---------- Theme toggle ---------- */
  // The inline <head> script already applied the correct theme (saved choice, else
  // the time-based default) before paint — here we just sync the UI and wire the toggle.
  const root = document.documentElement;
  const themeToggles = $$("#themeToggle, #themeToggleMobile");
  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) { try { sessionStorage.setItem("bb-theme", theme); } catch (e) {} }
    themeToggles.forEach((el) => el.setAttribute("aria-pressed", String(theme === "dark")));
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--cream").trim());
  }
  applyTheme(root.getAttribute("data-theme"), false);
  themeToggles.forEach((el) => el.addEventListener("click", () => {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
  }));

  /* ---------- Header shadow on scroll ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  const hamburger = $("#hamburger");
  const mobileNav = $("#mobileNav");
  hamburger.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", String(open));
  });
  $$("#mobileNav a").forEach((a) =>
    a.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Product gallery thumbnails ---------- */
  const galleryImg = $("#galleryImg");
  const galleryWebp = $("#galleryWebp");
  if (galleryImg) {
    $$(".thumb").forEach((t) =>
      t.addEventListener("click", () => {
        $$(".thumb").forEach((x) => x.classList.remove("is-active"));
        t.classList.add("is-active");
        // keep the WebP <source> and the JPG fallback <img> in sync
        if (galleryWebp && t.dataset.webp) galleryWebp.srcset = t.dataset.webp;
        galleryImg.src = t.dataset.img;
      })
    );
  }

  /* ---------- PDP quantity ---------- */
  const qtyVal = $("#qtyVal");
  const qtyMinus = $("#qtyMinus");
  const qtyPlus = $("#qtyPlus");
  const packPicker = $("#packPicker");
  const pdpPrice = $("#pdpPrice");
  const pdpWas = $("#pdpWas");

  // Discounted total shown on the PDP for the chosen quantity.
  function pdpPackTotal(q) { return q * PRODUCT.price - packDiscountKr(q); }

  function refreshPdpPrice() {
    if (pdpPrice) pdpPrice.textContent = kr(pdpPackTotal(pdpQty));
    if (pdpWas) {
      const disc = packDiscountKr(pdpQty);
      if (disc > 0) { pdpWas.textContent = kr(pdpQty * PRODUCT.price); pdpWas.hidden = false; }
      else pdpWas.hidden = true;
    }
    if (packPicker) {
      $$(".pack-opt", packPicker).forEach((b) =>
        b.classList.toggle("is-active", Number(b.dataset.pack) === pdpQty));
    }
  }

  // Single entry point so the stepper, the pack picker, the price and the
  // free-shipping meter never drift apart.
  function setPdpQty(q) {
    pdpQty = Math.min(MAX_QTY, Math.max(MIN_QTY, q || MIN_QTY));
    if (qtyVal) qtyVal.textContent = pdpQty;
    refreshPdpPrice();
    updateShipMeter(); // let the free-shipping meter follow the quantity picker
  }

  if (qtyVal && qtyMinus && qtyPlus) {
    qtyMinus.addEventListener("click", () => setPdpQty(pdpQty - 1));
    qtyPlus.addEventListener("click", () => setPdpQty(pdpQty + 1));
  }
  if (packPicker) {
    packPicker.addEventListener("click", (e) => {
      const b = e.target.closest(".pack-opt");
      if (b) setPdpQty(Number(b.dataset.pack));
    });
    refreshPdpPrice();
  }

  /* ---------- Cart logic ---------- */
  function addToCart(qty = 1) {
    const found = cart.find((i) => i.id === PRODUCT.id);
    if (found) found.qty += qty;
    else cart.push({ ...PRODUCT, qty });
    renderCart();
    toast(t("js_added", { qty: qty, name: PRODUCT.title || t("prod_title") }));
    openCart();
    bumpCount();
  }

  function changeQty(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    renderCart();
  }

  function removeItem(idx) {
    cart.splice(idx, 1);
    renderCart();
  }

  function totalQty() { return cart.reduce((s, i) => s + i.qty, 0); }
  function totalSum() { return cart.reduce((s, i) => s + i.qty * i.price, 0); }

  function renderCart() {
    const items = $("#cartItems");
    const empty = $("#cartEmpty");
    const count = $("#cartCount");

    items.innerHTML = "";
    if (cart.length === 0) {
      empty.hidden = false;
    } else {
      empty.hidden = true;
      cart.forEach((item, idx) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
          <div class="cart-item__img"><img src="${item.img}" alt="" loading="lazy" decoding="async" /></div>
          <div class="cart-item__info">
            <div class="cart-item__name">${PRODUCT.title || t("prod_title")}</div>
            <div class="cart-item__variant">${PRODUCT.variant || t("js_variant")}</div>
            <div class="cart-item__price">${kr(item.price * item.qty)}</div>
            <div class="cart-item__qty">
              <button data-dec="${idx}" aria-label="Minska">−</button>
              <span>${item.qty}</span>
              <button data-inc="${idx}" aria-label="Öka">+</button>
            </div>
          </div>
          <button class="cart-item__remove" data-rm="${idx}" aria-label="Ta bort">✕</button>`;
        items.appendChild(li);
      });
    }

    const sum = totalSum();
    const n = totalQty();
    const disc = packDiscountKr(n);
    $("#cartTotal").textContent = kr(sum - disc);

    count.textContent = n;
    count.hidden = n === 0;

    // discount + shipping summary lines (trusted i18n strings)
    const lines = [];
    if (disc > 0) lines.push(t("cart_discount", { amount: disc }));
    if (cart.length > 0) {
      lines.push((n >= 2 || sum >= FREE_SHIP_THRESHOLD) ? t("cart_freeship") : t("js_ship_note"));
    }
    $("#cartShip").innerHTML = lines.join("<br>");

    updateShipMeter();
  }

  /* ---------- Free-shipping progress meter (product page) ---------- */
  const FREE_SHIP_THRESHOLD = 350; // kr
  function renderMeter(wrap, sum) {
    const pct = Math.max(0, Math.min(100, Math.round((sum / FREE_SHIP_THRESHOLD) * 100)));
    const remaining = Math.max(0, FREE_SHIP_THRESHOLD - sum);
    const unlocked = sum >= FREE_SHIP_THRESHOLD;
    const txt = unlocked ? t("ship_meter_done") : t("ship_meter_left", { amount: remaining });
    const fill = wrap.querySelector(".ship-meter__fill");
    const label = wrap.querySelector(".ship-meter__label");
    if (fill) fill.style.width = pct + "%";
    wrap.classList.toggle("is-unlocked", unlocked);
    if (label) label.innerHTML = txt; // txt is a trusted i18n string
  }
  // Cart-drawer meter (.ship-meter--cart) tracks the cart total; the product-page
  // meter previews the quantity picker so it moves live as you change "antal".
  function updateShipMeter() {
    const cartSum = totalSum();
    $$(".ship-meter").forEach((wrap) => {
      const isCart = wrap.classList.contains("ship-meter--cart");
      renderMeter(wrap, isCart ? cartSum : pdpQty * PRODUCT.price);
    });
  }

  function bumpCount() {
    const c = $("#cartCount");
    c.style.transform = "scale(1.4)";
    setTimeout(() => (c.style.transform = ""), 180);
  }

  /* ---------- Drawer open/close ---------- */
  const cartEl = $("#cart");
  const overlay = $("#overlay");

  function openCart() {
    overlay.hidden = false;
    cartEl.classList.add("is-open");
    cartEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    cartEl.classList.remove("is-open");
    cartEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => (overlay.hidden = true), 300);
  }

  $("#cartBtn").addEventListener("click", () => (cartEl.classList.contains("is-open") ? closeCart() : openCart()));
  $("#cartClose").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeCart());

  // delegated cart item buttons
  $("#cartItems").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.inc != null) changeQty(+b.dataset.inc, 1);
    else if (b.dataset.dec != null) changeQty(+b.dataset.dec, -1);
    else if (b.dataset.rm != null) removeItem(+b.dataset.rm);
  });

  /* ---------- Add-to-cart buttons ---------- */
  $$("[data-add]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const qty = btn.hasAttribute("data-from-qty") ? pdpQty : 1;
      addToCart(qty);
    })
  );

  /* ---------- Checkout (demo) ---------- */
  $("#checkout").addEventListener("click", () => {
    if (cart.length === 0) { toast(t("js_empty_toast")); return; }
    // Clamp the outgoing quantity to a valid integer in [MIN_QTY, MAX_QTY].
    // NOTE: this is only a convenience guard — the browser is not a trust boundary.
    // The Cloudflare Worker MUST re-validate qty and check the request Origin server-side.
    const qty = Math.min(MAX_QTY, Math.max(MIN_QTY, Math.trunc(totalQty()) || MIN_QTY));
    // hand off to the Cloudflare Worker, which creates a Stripe Checkout session with the chosen quantity.
    // Pass the chosen site language (bb-lang) so the order-confirmation email goes out in SV or EN.
    const lang = (localStorage.getItem("bb-lang") || "sv") === "en" ? "en" : "sv";
    const product = encodeURIComponent(PRODUCT.checkoutProduct || "tb6");
    window.location.href = CHECKOUT_URL + "?qty=" + qty + "&lang=" + lang + "&product=" + product;
  });

  /* ---------- Copy email links (e.g. FAQ "Kontakta oss") ---------- */
  document.addEventListener("click", (e) => {
    const el = e.target.closest(".js-copy-email");
    if (!el) return;
    e.preventDefault();
    const email = el.getAttribute("data-email") || "info@bamboobrush.se";
    const reveal = () => toast(t("js_email_copied", { email }));
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(reveal).catch(() => toast(email));
    } else {
      toast(email); // clipboard unavailable — at least reveal the address
    }
  });

  /* ---------- Re-render dynamic cart text on language change ---------- */
  document.addEventListener("bb:langchange", () => renderCart());

  /* ---------- Impact "read more" modal ---------- */
  const impactModal = $("#impactModal");
  if (impactModal) {
    const openModal = () => {
      impactModal.classList.add("is-open");
      impactModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
      impactModal.classList.remove("is-open");
      impactModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    const moreBtn = $("#impactMore");
    if (moreBtn) moreBtn.addEventListener("click", openModal);
    $$("[data-modal-close]", impactModal).forEach((el) => el.addEventListener("click", closeModal));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && impactModal.classList.contains("is-open")) closeModal();
    });
  }

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-visible"), 2600);
  }

  /* ---------- Scroll reveal ---------- */
  const els = $$(".section-head, .card, .step, .ngo-card, .product__gallery, .product__info, .impact__copy, .impact__visual, .strip__item, .greenwash__head, .gwcard");
  els.forEach((el, i) => {
    el.setAttribute("data-reveal", "");
    el.style.transitionDelay = `${(i % 4) * 60}ms`;
  });
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && (en.target.classList.add("is-in"), io.unobserve(en.target))),
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));

  renderCart();

  /* ---------- Speculatively warm the product page ----------
     Once the homepage has fully loaded and the browser is idle, prefetch the
     product page (low priority) so clicking "Se produkten" feels instant.
     Only runs on the homepage; skips if the visitor asked to save data. */
  (function warmProductPage() {
    const onHome = location.pathname === "/" || location.pathname.endsWith("/index.html");
    if (!onHome) return;
    if (navigator.connection && navigator.connection.saveData) return;

    const prefetch = () => {
      ["produkter/bambutandborste-6-pack.html"].forEach((href) => {
        if (document.querySelector('link[rel="prefetch"][href="' + href + '"]')) return;
        const l = document.createElement("link");
        l.rel = "prefetch";
        l.href = href;
        document.head.appendChild(l);
      });
    };
    const schedule = () =>
      window.requestIdleCallback ? requestIdleCallback(prefetch, { timeout: 3000 }) : setTimeout(prefetch, 1500);

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
  })();
})();
