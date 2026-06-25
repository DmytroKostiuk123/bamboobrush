/* ===== BambooBrush 2.0 storefront ===== */
(() => {
  "use strict";

  // Display name/variant come from the i18n dictionary (prod_title / js_variant), not from here.
  const PRODUCT = { id: "tb6", price: 230, img: "assets/product-1.jpg" };
  const FREE_SHIP = 350;   // kr — also stated in copy (announce bar, FAQ, cart, product meta)
  const MIN_QTY = 1;
  const MAX_QTY = 20;

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
  const themeToggle = $("#themeToggle");
  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) { try { localStorage.setItem("bb-theme", theme); } catch (e) {} }
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--cream").trim());
  }
  applyTheme(root.getAttribute("data-theme"), false);
  themeToggle.addEventListener("click", () => {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark", true);
  });

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
  $$(".thumb").forEach((t) =>
    t.addEventListener("click", () => {
      $$(".thumb").forEach((x) => x.classList.remove("is-active"));
      t.classList.add("is-active");
      galleryImg.src = t.dataset.img;
    })
  );

  /* ---------- PDP quantity ---------- */
  const qtyVal = $("#qtyVal");
  $("#qtyMinus").addEventListener("click", () => {
    pdpQty = Math.max(MIN_QTY, pdpQty - 1);
    qtyVal.textContent = pdpQty;
  });
  $("#qtyPlus").addEventListener("click", () => {
    pdpQty = Math.min(MAX_QTY, pdpQty + 1);
    qtyVal.textContent = pdpQty;
  });

  /* ---------- Cart logic ---------- */
  function addToCart(qty = 1) {
    const found = cart.find((i) => i.id === PRODUCT.id);
    if (found) found.qty += qty;
    else cart.push({ ...PRODUCT, qty });
    renderCart();
    toast(t("js_added", { qty: qty, name: t("prod_title") }));
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
            <div class="cart-item__name">${t("prod_title")}</div>
            <div class="cart-item__variant">${t("js_variant")}</div>
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
    $("#cartTotal").textContent = kr(sum);

    const n = totalQty();
    count.textContent = n;
    count.hidden = n === 0;

    // free shipping progress
    const ship = $("#cartShip");
    if (cart.length === 0) {
      ship.innerHTML = "";
    } else if (sum >= FREE_SHIP) {
      ship.innerHTML = `${t("js_freeship_have")}<div class="bar"><i style="width:100%"></i></div>`;
    } else {
      const left = FREE_SHIP - sum;
      const pct = Math.min(100, (sum / FREE_SHIP) * 100);
      ship.innerHTML = `${t("js_freeship_left", { left: kr(left) })}<div class="bar"><i style="width:${pct}%"></i></div>`;
    }
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
    toast(t("js_checkout", { sum: kr(totalSum()) }));
    cart = [];
    renderCart();
    closeCart();
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
  const els = $$(".section-head, .card, .step, .product__gallery, .product__info, .impact__copy, .impact__visual, .strip__item");
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
})();
