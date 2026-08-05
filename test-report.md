# Test Report — iphone-eshop redesign (PR #2, re-test)

**Branch:** `devin/1785930521-ecommerce-setup` · commit `2577259` (Rework catalog + UI: full Apple/Believe range with Framer Motion)
**How tested:** Ran the Next.js 16 app locally (Node 22, `npm run dev`) and exercised the redesigned home, nav routing, catalog filters, a generated variant page, and the full cart flow end-to-end through the browser at http://localhost:3000.

**Result: All test assertions passed.** No bugs or spec deviations found.

---

## Test 1 — Redesigned home renders + animations play
Hero ("L'iPhone. Le Mac. Et tout ce qui va avec.") animates in; "Apple en vedette" shows featured iPhones + Macs; Believe gradient banner + 4 Believe products; "Explorer par catégorie" grid with all 8 category tiles. Scroll-reveal/stagger animations played with no blank/janky content.

| Hero + Apple en vedette | Believe banner + products |
|---|---|
| ![Hero](https://app.devin.ai/attachments/3749a940-54a6-4621-b338-8b04325d83ea/ss_4814d599.png) | ![Believe banner](https://app.devin.ai/attachments/fef5b73f-dc39-4a17-90bf-8746ece73b65/ss_b60fe5a2.png) |

![Categories grid](https://app.devin.ai/attachments/005f27a7-3c20-463c-baeb-ad19038c9056/ss_d4f1f829.png)

## Test 2 — Header nav links route to correct filtered catalog
- "Believe" → `/products?category=believe`, H1 "Believe", **5 produits**, active pill filled black, all Believe-brand.
- "iPhone" → `/products?category=iphone`, H1 "iPhone", **28 produits** (full iPhone 11→17 range).
- "Mac" → `/products?category=mac`, H1 "Mac", **3 produits** (MacBook Air/Pro, iMac).

| Believe (5) | iPhone (28) |
|---|---|
| ![Believe filter](https://app.devin.ai/attachments/f5b6387e-32ce-4b0f-b75c-60f7f1e7390c/ss_54457b06.png) | ![iPhone filter](https://app.devin.ai/attachments/2c9f75a9-816d-47a8-bfa3-d9b9e9a4ccb0/ss_16d14833.png) |

## Test 3 — Catalog filter pills + reset
`/products` shows **56 produits** with "Tout" pill active and 9 pills (Tout + 8 categories). Distinct per-category counts (56/28/5/3) confirm filtering works.

![Boutique 56 products](https://app.devin.ai/attachments/46383661-123d-42b1-991f-a75b5ac617f0/ss_5eeea0a8.png)

## Test 4 — Generated iPhone variant detail
`/products/iphone-17-pro-max` renders name "iPhone 17 Pro Max", price **1 539 €**, emoji 📱, 5-row specs table (Écran 6,7"/Puce A19/Caméra/5G/Charge), and "Ajouter au panier". Confirms per-variant generation works.

![iPhone 17 Pro Max detail](https://app.devin.ai/attachments/f20b1556-3390-4bfe-b72f-2bf6ebe726d0/ss_7e55f269.png)

## Test 5 — Cart flow end-to-end (KEY REGRESSION) — animated badge + shipping threshold
Used the 15 € Believe USB-C cable to probe the 50 € free-shipping threshold.

- Add to cart → button "Ajouté ✓", Header badge animated in showing **1**.
- Cart: item listed, Sous-total 15 € / Livraison 5 € / Total **20 €**.
- **Shipping threshold (adversarial):** qty 3 = 45 € → Livraison **5 €** / Total **50 €** (below 50 € subtotal, still charged); qty 4 = 60 € → Livraison **Offerte** / Total **60 €** (crosses threshold).
- Decrement (−) back to qty 3 restores 5 € shipping.
- **Persistence:** F5 reload preserved item, qty 3, totals, and badge.
- Remove (✕) → "Votre panier est vide", badge cleared.

| Qty 3 = 45 € → shipping 5 € | Qty 4 = 60 € → Offerte |
|---|---|
| ![Qty 3](https://app.devin.ai/attachments/60a00528-80f7-4b2b-847c-ec5e5693b92d/ss_c19f3501.png) | ![Qty 4 free shipping](https://app.devin.ai/attachments/ecc7f220-e0b1-4dfb-ba59-bc23fb4c2a49/ss_d17c9131.png) |

| Persisted after F5 reload | Empty after remove |
|---|---|
| ![Persisted](https://app.devin.ai/attachments/b3a516b4-5ae8-4fa9-bf23-de84f233b34e/ss_7d8efb6e.png) | ![Empty cart](https://app.devin.ai/attachments/9ea05666-f77c-414e-82cf-9a4fe5ef0851/ss_9d255c5f.png) |

---

## Notes / caveats
- None. Every assertion produced the exact expected value; the shipping threshold flips correctly at 50 €.
- Product "images" are emoji glyphs (📱/💻/🔋 etc.) rendered by the OS emoji font — by design per the code (`emoji` placeholder field), not a bug.
- Animations (Framer Motion scroll-reveal, stagger, animated cart badge) played smoothly; a static recording cannot fully convey motion but the sections all revealed with real content.
