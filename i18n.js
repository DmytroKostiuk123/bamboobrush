/* ===== BambooBrush i18n (SV / EN) ===== */
(function () {
  "use strict";

  var DICT = {
    sv: {
      page_title: "BambooBrush – Plastfria tandborstar i bambu",
      page_desc: "BambooBrush – plastfria, komposterbara tandborstar i bambu. Tillverkade av naturligt material, helt utan plast eller lim. Snabb frakt i Sverige.",

      ann_ship: "🚚 Frakt 49 kr i hela Sverige",
      ann_compost: "♻️ Plastfri & komposterbar",
      ann_delivery: "🚚 Snabb leverans i hela Sverige",
      ann_micro: "💧 Fria från mikroplast",
      ann_code: "🚚 Fri frakt vid ordrar över 350 kr – kod FRIFRAKT",

      nav_product: "Produkt",
      dd_instock: "✓ Finns i lager",
      dd_soon: "🔔 Kommer snart",
      nav_why: "Varför bambu",
      nav_env: "Miljö",
      nav_faq: "Vanliga frågor",
      nav_blog: "Blogg",
      nav_about: "Om oss",
      see_product: "Se produkten →",
      theme_label: "Mörkt / ljust läge",
      buy_now: "Köp nu",

      hero_h1: 'Plastfri tandborste – ren munvård utan <span class="hl">mikroplaster</span>.',
      hero_lead: "En plastfri tandborste i bambu med naturborst – för dig som inte vill få i dig mikroplast vid varje borstning.",
      hero_buy: "Köp 6-pack · 230 kr",
      hero_more: "Läs mer ↓",
      hero_badge1: "🌍 0% plast",
      hero_badge2: "🌿 Trä + naturborst",

      strip_plastic_l: "Plast",
      strip_compost_v: "Komposterbar",
      strip_compost_l: "tandborste",
      strip_fast_v: "Snabb",
      strip_fast_l: "Leverans",
      strip_swe_v: "Svensk",
      strip_swe_l: "Frakt",

      gw_eyebrow: "Från grundaren · Kemist",
      gw_h2: "Vi är trötta på greenwashing.",
      gw_p1: 'Idag kallar vem som helst sin produkt "eko", "naturlig" eller "nedbrytbar" – ofta utan att veta vad orden betyder. <strong>Jag är kemist</strong>, så jag ska vara rak med dig.',
      gw_p2: "Att göra handtaget i bambu är <strong>lätt</strong> – nästan alla gör det. Det svåra är <strong>stråna</strong>. På de flesta bambutandborstar är stråna av <strong>plast</strong> – som <strong>aldrig</strong> kan komposteras, hur grönt handtaget än marknadsförs.",
      gw_p3: "Vår borste har strån av <strong>naturlig galtborst</strong>: ren keratin, samma protein som i ditt hår. Plastfritt hela vägen. Se skillnaden själv. 👇",
      gw_ours_badge: "✓ BambooBrush",
      gw_ours_stron: "Strån: naturlig galtborst",
      gw_ours_sub: "Keratin · 100% plastfritt · komposterbart",
      gw_eco_badge: '✕ Typisk "eko"-borste',
      gw_eco_stron: "Strån: nylon = plast",
      gw_eco_sub: "Går inte att kompostera",
      gw_macro_cap: "Äkta galtborst på nära håll: mjuka naturfibrer av keratin – ingen plast, inget nylon.",
      gw_note: "Samma bambuhandtag. Helt olika strån. Det är där greenwashingen göms.",
      gw_cta: "Se den plastfria borsten →",
      gw_link: "Läs hela historien →",

      prod_sticker: "Bästsäljare",
      prod_title: "Tandborste 6-pack",
      prod_desc: "Sex tandborstar i naturlig bambu med mjuka, BPA-fria borst. Ett års förbrukning för en person – eller perfekt att dela med familjen.",
      feat_1: "🌿 Handtag i naturlig bambu",
      feat_2: "🐗 Proteinbaserat galtborst",
      feat_3: "🚫 Helt utan plast, lim eller BPA",
      feat_4: "♻️ Komposterbar tandborste",
      price_code: "🚚 Fri frakt vid ordrar över 350 kr – kod FRIFRAKT",
      add_cart: "Lägg i varukorg",

      bc_home: "Startsidan",
      pdp_sku: "Artikelnr: BB-TB-6PACK",
      pdp_instock: "Finns i lager",
      pdp_delivery: "🔒 Säker betalning · 30 dagars öppet köp<br>🚚 Frakt 49 kr (DHL) · skickas inom 24 h · leverans 2–4 arbetsdagar",
      pdp_d_desc_h: "Beskrivning",
      pdp_d_desc_1: "BambooBrush 6-pack är sex tandborstar tillverkade helt av naturmaterial – för dig som vill borsta tänderna utan plast i munnen.",
      pdp_d_desc_2: "Handtaget är av naturlig bambu, ett snabbväxande gräs som är komposterbart. Borsten är naturborst (galtborst av keratin) med medium hårdhet – samma protein som finns i hår och naglar, helt fritt från nylon och mikroplast. Borsten fästs i handtaget med en liten kopparklammer, som du enkelt plockar bort innan du komposterar handtaget.",
      pdp_d_desc_3: "Helt utan plast, lim och BPA.",
      pdp_d_care_h: "Skötselråd",
      pdp_d_care_1: "Skölj tandborsten efter användning och låt den torka ordentligt mellan gångerna – naturborst suger mer vatten än nylon, så lufttorkning håller den fräsch. Byt borste ungefär varannan månad för bästa munhygien, eller tidigare om stråna börjar spreta.",
      pdp_d_spec_h: "Innehåll & specifikation",
      pdp_d_spec_1: "<strong>Antal:</strong> 6 tandborstar",
      pdp_d_spec_2: "<strong>Längd:</strong> 19 cm per tandborste",
      pdp_d_spec_3: "<strong>Handtag:</strong> naturlig bambu",
      pdp_d_spec_4: "<strong>Borst:</strong> naturborst (galtborst av keratin), medium hårdhet",
      pdp_d_spec_5: "<strong>Förpackning:</strong> papp",
      pdp_d_comp_h: "Kompostering & återvinning",
      pdp_d_comp_1: 'När borsten är utsliten kan du kompostera hela den – både bambuhandtaget och galtborsten (keratin) bryts ner, så du behöver inte dra ut stråna. Vill du vara noggrann plockar du bort den lilla kopparklammern och återvinner den som metall. Läs mer i vår guide <a href="../blogg/kompostera-tandborsten.html">Så komposterar du din bambutandborste</a>.',
      pdp_rev_h: "Recensioner",
      pdp_rev_empty1: "<strong>Inga recensioner än.</strong>",
      pdp_rev_empty2: "Har du köpt och provat vår tandborste? Bli den första att recensera.",
      pdp_rev_formh: "Lämna en recension",
      pdp_rev_name: "Namn",
      pdp_rev_rating: "Betyg",
      pdp_rev_text: "Din recension",
      pdp_rev_hp: "Lämna detta fält tomt",
      pdp_rev_submit: "Skicka recension",
      pdp_rev_disc: "Din recension granskas innan den publiceras. Publicera inga kontaktuppgifter.",
      rev_js_fill: "Fyll i namn, betyg och recension.",
      rev_js_sending: "Skickar…",
      rev_js_thanks: "Tack! Din recension har skickats för granskning och publiceras när den godkänts. 🌿",
      rev_js_error: "Kunde inte skicka just nu. Försök igen om en stund.",
      rev_js_anon: "Anonym",
      ship_meter_left: "🚚 {amount} kr kvar till fri frakt",
      ship_meter_done: '🎉 Fri frakt! Ange kod <span class="ship-code">FRIFRAKT</span> i kassan',
      prod_meta: "🔒 Säker betalning · 30 dagars öppet köp · Frakt 49 kr",

      why_eyebrow: "Varför BambooBrush?",
      why_h2: 'Litet byte. <span class="hl">Stor</span> skillnad.',
      why_p: "En vanlig plasttandborste tar över 400 år att brytas ner. Vår löses upp i komposten på några månader.",
      card1_h: "Snabbast växande växt",
      card1_p: "Bambu växer upp till 90 cm per dygn och behöver varken bekämpningsmedel eller konstbevattning.",
      card2_h: "Inga mikroplaster",
      card2_p: "Våra borst är gjorda av proteinet keratin som kommer från vildsvinshår.",
      card3_h: "Komposterbar",
      card3_p: "Bambuhandtaget och de naturliga borsten blir till jord igen – långt från plasttandborsten som ligger kvar i naturen i 400 år.",
      card4_h: "Skonsam mot emaljen",
      card4_p: "Torrt är galtborst styvt (3–6 GPa), men när man blöter ner den mjuknar den till ≤1 GPa – mjukare än nylon, som ligger kvar på 2–3 GPa även blött.",

      imp_eyebrow: "Visste du?",
      imp_h2: "Varför mikroplaster är farliga",
      imp_p: "Forskning visar att mikroplaster kan försvaga cellmembran, utlösa inflammation och härma hormoner i kroppen. Emaljen är hårdare än borststråna, så varje borstning nöter ner plasten och frigör små partiklar i munnen. Genom ett enkelt byte tar du bort en daglig plastkälla – för din egen hälsa.",
      impact_more: "Läs mer →",
      impact_modal_title: "Små plastpartiklar leder till cellskador",
      impact_modal_p1: "Mikroplaster kan påverka kroppen på flera sätt. När de fastnar i våra celler kan de göra cellmembranet svagare och orsaka läckage som skadar cellen inifrån. De kan även störa mitokondrierna – våra cellers \"kraftverk\" – vilket minskar energiproduktionen och kan leda till ännu mer skada.",
      impact_modal_p2: "Dessutom innehåller många plaster kemikalier som liknar våra egna hormoner. Dessa kan lura kroppen och störa den naturliga hormonbalansen. Resultatet kan bli ökad östrogenpåverkan hos män och oregelbundna menstruationscykler hos kvinnor.",
      stat1_v: "400+ år",
      stat1_l: "Nedbrytning av plasttandborste",
      stat2_v: "3,6 mdr",
      stat2_l: "Plasttandborstar slängs varje år",
      stat3_v: "~6 mån",
      stat3_l: "Vår bambu blir till jord",
      cmp_plast: "Plast",
      cmp_micro: "Mikroplastfri",
      cmp_compost: "Komposterbar",
      cmp_renew: "Förnybart material",
      cmp_bpa: "BPA-fri",

      steps_eyebrow: "Så enkelt är det",
      steps_h2: "Från beställning till kompost",
      step1_h: "Beställ",
      step1_p: "Välj ditt 6-pack och slutför i kassan på under en minut.",
      step2_h: "Borsta",
      step2_p: "Byt borste varannan månad – ett pack räcker länge.",
      step3_h: "Gräv ner den",
      step3_p: "Gräv ner hela tandborsten i jorden eller lägg den i komposten – naturen tar hand om resten.",

      ngo_eyebrow: "För planeten",
      ngo_h2: 'Goda krafter för en <span class="hl">plastfri</span> värld',
      ngo_intro: "Vi hyllar arbetet dessa organisationer gör mot plast och för naturen. Stötta dem gärna du också – varje litet bidrag räknas.",
      ngo1_p: "Kämpar mot nedskräpning och plast i den svenska naturen.",
      ngo2_p: "Sveriges största miljöorganisation – för natur och hållbarhet.",
      ngo3_p: "Arbetar globalt för att stoppa mikroplaster vid källan.",
      ngo4_p: "Utvecklar teknik för att rensa haven från plast.",
      ngo_visit: "Besök →",

      faq_eyebrow: "Vanliga frågor",
      faq_h2: "Allt du undrar",
      faq_intro: 'Hittar du inte svaret? <a href="mailto:info@bamboobrush.se" class="js-copy-email" data-email="info@bamboobrush.se">Kontakta oss</a> så hjälper vi dig.',
      faq_q1: "Är borsten verkligen helt plastfri?",
      faq_a1: "Handtaget är 100% bambu och borsten är gjord av naturligt, proteinbaserat material. Inga plaster, inget lim och inget BPA.",
      faq_q2: "Hur komposterar jag tandborsten?",
      faq_a2: "Gräv ner hela tandborsten i jorden eller lägg den i komposten. Både bambuhandtaget och galtborsten bryts ner naturligt.",
      faq_q3: "Hur länge håller ett 6-pack?",
      faq_a3: "Tandläkare rekommenderar byte varannan månad. Ett 6-pack räcker alltså i cirka 1 år för en person.",
      faq_q4: "Vad kostar frakten?",
      faq_a4: "Frakten är 49 kr per order och skickas med DHL. Vi skickar inom 24 timmar och leverans sker normalt inom 2–4 arbetsdagar.",
      faq_q5: "Kan jag returnera om jag ändrar mig?",
      faq_a5: "Självklart. Du har 30 dagars öppet köp på oöppnade förpackningar. Kontakta oss så ordnar vi returen.",

      trust1_h: "Säker betalning",
      trust1_p: "Krypterad kassa via Klarna",
      trust2_h: "Premiumkvalitet",
      trust2_p: "Slät bambu av hög kvalitet",
      trust3_h: "Snabb leverans",
      trust3_p: "Skickas inom 24 timmar",
      trust4_h: "30 dagars öppet köp",
      trust4_p: "Enkel retur, inget krångel",
      trust_pay_label: "Trygg betalning med",

      foot_brand_p: "Plastfri munvård, tillverkad med omtanke om dig och planeten. Skickas från Sverige.",
      foot_shop: "Handla",
      foot_help: "Hjälp",
      foot_terms: "Villkor",
      foot_prod: "Tandborste 6-pack",
      foot_why: "Varför BambooBrush",
      foot_faq: "Vanliga frågor",
      foot_contact: "Kontakta oss",
      foot_about: "Om oss",
      foot_shipping: "Frakt & leverans",
      foot_privacy: "Integritetspolicy",
      foot_refund: "Returpolicy",
      foot_terms_link: "Köpvillkor",
      foot_legal: "Juridisk information",
      foot_copy: "© 2026 BambooBrush. Alla rättigheter förbehållna.",

      cart_title: "Din varukorg",
      cart_empty: "Din varukorg är tom. 🌿",
      cart_total: "Summa",
      cart_checkout: "Till kassan",
      cart_secure: "🔒 Säker betalning · Frakt 49 kr (DHL)",

      js_variant: "Naturell bambu",
      js_added: "✓ {qty} × {name} tillagd",
      js_empty_toast: "Din varukorg är tom 🌿",
      js_email_copied: "📋 {email} – kopierad!",
      js_checkout: "Tack! Demobeställning på {sum} 🌍",
      js_ship_note: "🚚 Frakt 49 kr (DHL) tillkommer i kassan",
    },

    en: {
      page_title: "BambooBrush – Plastic-free bamboo toothbrushes",
      page_desc: "BambooBrush – plastic-free, compostable bamboo toothbrushes. Made from natural material, completely without plastic or glue. Fast shipping within Sweden.",

      ann_ship: "🚚 Flat 49 kr shipping across Sweden",
      ann_compost: "♻️ Plastic-free & compostable",
      ann_delivery: "🚚 Fast delivery across Sweden",
      ann_micro: "💧 Free from microplastics",
      ann_code: "🚚 Free shipping on orders over 350 kr – code FRIFRAKT",

      nav_product: "Product",
      dd_instock: "✓ In stock",
      dd_soon: "🔔 Coming soon",
      nav_why: "Why bamboo",
      nav_env: "Environment",
      nav_faq: "FAQ",
      nav_blog: "Blog",
      nav_about: "About",
      see_product: "See the product →",
      theme_label: "Dark / light mode",
      buy_now: "Buy now",

      hero_h1: 'Plastic-free toothbrush – clean oral care without <span class="hl">microplastics</span>.',
      hero_lead: "A plastic-free bamboo toothbrush with natural bristles – for you who'd rather not ingest microplastics with every brush.",
      hero_buy: "Buy 6-pack · 230 kr",
      hero_more: "Learn more ↓",
      hero_badge1: "🌍 0% plastic",
      hero_badge2: "🌿 Wood + natural bristles",

      strip_plastic_l: "Plastic",
      strip_compost_v: "Compostable",
      strip_compost_l: "toothbrush",
      strip_fast_v: "Fast",
      strip_fast_l: "Delivery",
      strip_swe_v: "Swedish",
      strip_swe_l: "Shipping",

      gw_eyebrow: "From the founder · Chemist",
      gw_h2: "We're tired of greenwashing.",
      gw_p1: 'These days anyone slaps "eco", "natural" or "biodegradable" on a product – often without knowing what the words mean. <strong>I\'m a chemist</strong>, so let me be blunt.',
      gw_p2: "Making the handle from bamboo is <strong>easy</strong> – almost everyone does it. The hard part is the <strong>bristles</strong>. On most bamboo toothbrushes the bristles are <strong>plastic</strong> – which can <strong>never</strong> be composted, however green the handle is marketed.",
      gw_p3: "Our brush has bristles of <strong>natural boar hair</strong>: pure keratin, the same protein as in your hair. Plastic-free all the way. See the difference yourself. 👇",
      gw_ours_badge: "✓ BambooBrush",
      gw_ours_stron: "Bristles: natural boar hair",
      gw_ours_sub: "Keratin · 100% plastic-free · compostable",
      gw_eco_badge: '✕ Typical "eco" brush',
      gw_eco_stron: "Bristles: nylon = plastic",
      gw_eco_sub: "Can't be composted",
      gw_macro_cap: "Real boar bristle up close: soft natural keratin fibres – no plastic, no nylon.",
      gw_note: "Same bamboo handle. Completely different bristles. That's where the greenwashing hides.",
      gw_cta: "See the plastic-free brush →",
      gw_link: "Read the full story →",

      prod_sticker: "Bestseller",
      prod_title: "Toothbrush 6-pack",
      prod_desc: "Six toothbrushes in natural bamboo with soft, BPA-free bristles. A year's supply for one person – or perfect to share with the family.",
      feat_1: "🌿 Handle in natural bamboo",
      feat_2: "🐗 Protein-based boar bristles",
      feat_3: "🚫 No plastic, glue or BPA",
      feat_4: "♻️ Compostable toothbrush",
      price_code: "🚚 Free shipping on orders over 350 kr – code FRIFRAKT",
      add_cart: "Add to cart",

      bc_home: "Home",
      pdp_sku: "Item no: BB-TB-6PACK",
      pdp_instock: "In stock",
      pdp_delivery: "🔒 Secure payment · 30-day returns<br>🚚 49 kr shipping (DHL) · ships within 24 h · delivery 2–4 business days",
      pdp_d_desc_h: "Description",
      pdp_d_desc_1: "The BambooBrush 6-pack is six toothbrushes made entirely from natural materials – for anyone who wants to brush without plastic in their mouth.",
      pdp_d_desc_2: "The handle is natural bamboo, a fast-growing grass that is compostable. The bristles are natural boar hair (keratin) with medium firmness – the same protein found in hair and nails, completely free from nylon and microplastics. The bristles are held in the handle with a small copper staple, which you easily remove before composting the handle.",
      pdp_d_desc_3: "Completely free from plastic, glue and BPA.",
      pdp_d_care_h: "Care instructions",
      pdp_d_care_1: "Rinse the toothbrush after use and let it dry properly between uses – natural bristles absorb more water than nylon, so air-drying keeps them fresh. Replace the brush roughly every two months for the best oral hygiene, or sooner if the bristles start to splay.",
      pdp_d_spec_h: "Contents & specification",
      pdp_d_spec_1: "<strong>Quantity:</strong> 6 toothbrushes",
      pdp_d_spec_2: "<strong>Length:</strong> 19 cm per toothbrush",
      pdp_d_spec_3: "<strong>Handle:</strong> natural bamboo",
      pdp_d_spec_4: "<strong>Bristles:</strong> natural boar hair (keratin), medium firmness",
      pdp_d_spec_5: "<strong>Packaging:</strong> cardboard",
      pdp_d_comp_h: "Composting & recycling",
      pdp_d_comp_1: 'When the brush is worn out you can compost the whole thing – both the bamboo handle and the boar bristle (keratin) break down, so you don\'t need to pull out the bristles. If you want to be thorough, pick out the small copper staple and recycle it as metal. Read more in our guide <a href="../blogg/kompostera-tandborsten.html">How to compost your bamboo toothbrush</a>.',
      pdp_rev_h: "Reviews",
      pdp_rev_empty1: "<strong>No reviews yet.</strong>",
      pdp_rev_empty2: "Have you bought and tried our toothbrush? Be the first to review it.",
      pdp_rev_formh: "Leave a review",
      pdp_rev_name: "Name",
      pdp_rev_rating: "Rating",
      pdp_rev_text: "Your review",
      pdp_rev_hp: "Leave this field empty",
      pdp_rev_submit: "Submit review",
      pdp_rev_disc: "Your review is checked before it is published. Don't post any contact details.",
      rev_js_fill: "Please fill in name, rating and review.",
      rev_js_sending: "Sending…",
      rev_js_thanks: "Thank you! Your review has been submitted for moderation and will be published once approved. 🌿",
      rev_js_error: "Couldn't send right now. Please try again in a moment.",
      rev_js_anon: "Anonymous",
      ship_meter_left: "🚚 {amount} kr to go for free shipping",
      ship_meter_done: '🎉 Free shipping! Enter code <span class="ship-code">FRIFRAKT</span> at checkout',
      prod_meta: "🔒 Secure payment · 30-day returns · 49 kr shipping",

      why_eyebrow: "Why BambooBrush?",
      why_h2: 'Small switch. <span class="hl">Big</span> difference.',
      why_p: "A regular plastic toothbrush takes over 400 years to break down. Ours dissolves in the compost in a few months.",
      card1_h: "Fastest-growing plant",
      card1_p: "Bamboo grows up to 90 cm a day and needs neither pesticides nor irrigation.",
      card2_h: "No microplastics",
      card2_p: "Our bristles are made of a protein called keratin, which comes from wild boar hair.",
      card3_h: "Compostable",
      card3_p: "The bamboo handle and the natural bristles turn back into soil – unlike the plastic toothbrush that lingers in nature for 400 years.",
      card4_h: "Gentle on enamel",
      card4_p: "Dry, boar bristle is stiff (3–6 GPa), but once you wet it down it softens to ≤1 GPa – softer than nylon, which stays at 2–3 GPa even when wet.",

      imp_eyebrow: "Did you know?",
      imp_h2: "Why microplastics are harmful",
      imp_p: "Research shows microplastics can weaken cell membranes, trigger inflammation and mimic hormones in the body. Enamel is harder than the bristles, so every brushing wears down the plastic and releases tiny particles into your mouth. With one simple switch you remove a daily source of plastic – for your own health.",
      impact_more: "Read more →",
      impact_modal_title: "Tiny plastic particles cause cell damage",
      impact_modal_p1: "Microplastics can affect the body in several ways. When they lodge in our cells, they can weaken the cell membrane and cause leakage that damages the cell from within. They can also disrupt the mitochondria – our cells' \"power plants\" – which lowers energy production and can lead to even more damage.",
      impact_modal_p2: "In addition, many plastics contain chemicals that resemble our own hormones. These can fool the body and disrupt its natural hormone balance. The result can be increased estrogenic effects in men and irregular menstrual cycles in women.",
      stat1_v: "400+ yrs",
      stat1_l: "For a plastic brush to break down",
      stat2_v: "3.6 bn",
      stat2_l: "Plastic toothbrushes thrown away yearly",
      stat3_v: "~6 mo",
      stat3_l: "For our bamboo to become soil",
      cmp_plast: "Plastic",
      cmp_micro: "Microplastic-free",
      cmp_compost: "Compostable",
      cmp_renew: "Renewable material",
      cmp_bpa: "BPA-free",

      steps_eyebrow: "It's this easy",
      steps_h2: "From order to compost",
      step1_h: "Order",
      step1_p: "Pick your 6-pack and check out in under a minute.",
      step2_h: "Brush",
      step2_p: "Swap your brush every two months – one pack lasts a long time.",
      step3_h: "Bury it",
      step3_p: "Bury the whole toothbrush in the soil or pop it in the compost – nature takes care of the rest.",

      ngo_eyebrow: "For the planet",
      ngo_h2: 'Good forces for a <span class="hl">plastic-free</span> world',
      ngo_intro: "We admire the work these organizations do against plastic and for nature. Support them too — every little bit counts.",
      ngo1_p: "Fights litter and plastic in Sweden's outdoors.",
      ngo2_p: "Sweden's largest environmental organization — for nature and sustainability.",
      ngo3_p: "Works globally to stop microplastics at the source.",
      ngo4_p: "Develops technology to clean plastic from the oceans.",
      ngo_visit: "Visit →",

      faq_eyebrow: "FAQ",
      faq_h2: "Everything you're wondering",
      faq_intro: 'Can\'t find the answer? <a href="mailto:info@bamboobrush.se" class="js-copy-email" data-email="info@bamboobrush.se">Contact us</a> and we\'ll help.',
      faq_q1: "Is the brush really completely plastic-free?",
      faq_a1: "The handle is 100% bamboo and the bristles are made from natural, protein-based material. No plastics, no glue and no BPA.",
      faq_q2: "How do I compost the toothbrush?",
      faq_a2: "Bury the whole toothbrush in the soil or put it in the compost. Both the bamboo handle and the boar bristles break down naturally.",
      faq_q3: "How long does a 6-pack last?",
      faq_a3: "Dentists recommend replacing your brush every two months. So a 6-pack lasts about 1 year for one person.",
      faq_q4: "What does shipping cost?",
      faq_a4: "Shipping is a flat 49 kr per order, sent with DHL. We dispatch within 24 hours and delivery normally takes 2–4 business days.",
      faq_q5: "Can I return it if I change my mind?",
      faq_a5: "Of course. You have 30 days' right of return on unopened packages. Contact us and we'll arrange the return.",

      trust1_h: "Secure payment",
      trust1_p: "Encrypted checkout via Klarna",
      trust2_h: "Premium quality",
      trust2_p: "Smooth, high-quality bamboo",
      trust3_h: "Fast delivery",
      trust3_p: "Dispatched within 24 hours",
      trust4_h: "30-day returns",
      trust4_p: "Easy returns, no hassle",
      trust_pay_label: "Secure payment with",

      foot_brand_p: "Plastic-free oral care, made with care for you and the planet. Shipped from Sweden.",
      foot_shop: "Shop",
      foot_help: "Help",
      foot_terms: "Terms",
      foot_prod: "Toothbrush 6-pack",
      foot_why: "Why BambooBrush",
      foot_faq: "FAQ",
      foot_contact: "Contact us",
      foot_about: "About",
      foot_shipping: "Shipping & delivery",
      foot_privacy: "Privacy policy",
      foot_refund: "Return policy",
      foot_terms_link: "Terms of purchase",
      foot_legal: "Legal notice",
      foot_copy: "© 2026 BambooBrush. All rights reserved.",

      cart_title: "Your cart",
      cart_empty: "Your cart is empty. 🌿",
      cart_total: "Total",
      cart_checkout: "Checkout",
      cart_secure: "🔒 Secure payment · 49 kr shipping (DHL)",

      js_variant: "Natural bamboo",
      js_added: "✓ {qty} × {name} added",
      js_empty_toast: "Your cart is empty 🌿",
      js_email_copied: "📋 {email} – copied!",
      js_checkout: "Thanks! Demo order of {sum} 🌍",
      js_ship_note: "🚚 49 kr shipping (DHL) added at checkout",
    },
  };

  var lang = "sv";
  try { lang = localStorage.getItem("bb-lang") || "sv"; } catch (e) {}
  if (!DICT[lang]) lang = "sv";

  function t(key, vars) {
    var str = (DICT[lang] && DICT[lang][key]) || (DICT.sv && DICT.sv[key]) || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace("{" + k + "}", vars[k]);
      });
    }
    return str;
  }

  function apply(attr, prop) {
    var nodes = document.querySelectorAll("[" + attr + "]");
    for (var i = 0; i < nodes.length; i++) {
      var val = DICT[lang][nodes[i].getAttribute(attr)];
      if (val != null) nodes[i][prop] = val;
    }
  }

  // Capture each page's optimized static <title>/<meta description> once, before
  // any language swap, so the default-language (sv) SEO tags are never clobbered.
  var _titleEl = null, _descEl = null, _svTitle = "", _svDesc = "", _captured = false;
  function captureStatic() {
    if (_captured) return;
    _titleEl = document.querySelector("title");
    _descEl = document.querySelector('meta[name="description"]');
    _svTitle = _titleEl ? _titleEl.textContent : "";
    _svDesc = _descEl ? (_descEl.getAttribute("content") || "") : "";
    _captured = true;
  }

  function applyDom() {
    captureStatic();
    document.documentElement.setAttribute("lang", lang);

    // Keep the page's unique static SV title/description for the default language
    // (that is what Google indexes). Only swap to English when the visitor picks EN,
    // preferring a per-page data-en value over the generic fallback key.
    if (lang === "sv") {
      document.title = _svTitle;
      if (_descEl) _descEl.setAttribute("content", _svDesc);
    } else {
      document.title = (_titleEl && _titleEl.dataset.en) || t("page_title");
      if (_descEl) _descEl.setAttribute("content", _descEl.dataset.en || t("page_desc"));
    }

    apply("data-i18n", "textContent");
    apply("data-i18n-html", "innerHTML");

    var toggle = document.getElementById("langToggle");
    if (toggle) {
      var spans = toggle.querySelectorAll("[data-lang]");
      for (var s = 0; s < spans.length; s++) {
        spans[s].classList.toggle("is-active", spans[s].getAttribute("data-lang") === lang);
      }
    }
  }

  function setLang(next) {
    if (!DICT[next]) return;
    lang = next;
    try { localStorage.setItem("bb-lang", lang); } catch (e) {}
    applyDom();
    document.dispatchEvent(new CustomEvent("bb:langchange", { detail: { lang: lang } }));
  }

  window.I18N = {
    t: t,
    get lang() { return lang; },
    setLang: setLang,
  };

  function init() {
    applyDom();
    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        setLang(lang === "sv" ? "en" : "sv");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
