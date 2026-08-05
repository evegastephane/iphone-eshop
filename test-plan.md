# Test Plan — iphone-eshop redesign (PR #2, re-test)

Dev server http://localhost:3000. Node 22. Neutral black/white theme, Framer Motion animations.
Code refs: `lib/products.ts` (CATEGORIES 8 ids L25-33; getAppleHighlights L619; getBelieveProducts L625),
`app/page.tsx` (Hero + Apple en vedette + Believe banner + categories), `components/Header.tsx` (nav links L17-28, animated badge L37-50),
`app/products/page.tsx` (filter pills L39-49, active pill black L79), `context/CartContext.tsx` (unchanged; localStorage key `iphone-eshop-cart`, shipping `>=50 ? 0 : 5` — same as before).
Believe category = 5 products (cheapest = believe-cable-usbc-2m @ 15 €). Home Believe section shows 4 (slice 0,4).

## Test 1 — Home renders + animations play
- Go to `/`. Expect: Hero section animates in (content visible, not blank). Scroll down.
- "Apple en vedette" heading + grid of iPhone & Mac cards (e.g. iPhone 17 Pro Max, MacBook Air M3). Cards reveal via stagger.
- Believe banner (indigo/violet gradient) "Believe : chargeurs, écouteurs…" with "Découvrir Believe" button + 4 Believe product cards.
- "Explorer par catégorie" grid with 8 category tiles.
- PASS: all four sections render with real content (no blank/janky placeholders); scroll-reveal animations visibly play. FAIL if any section empty or content never appears.

## Test 2 — Header nav links route correctly
- Click Header "Believe" → URL `/products?category=believe`, H1 "Believe", only Believe-brand products (5), each name starts "Believe".
- Click Header "iPhone" → URL `/products?category=iphone`, H1 "iPhone", only iPhone products (names start "iPhone").
- Click Header "Mac" → `/products?category=mac`, H1 "Mac", Mac products (MacBook/iMac).
- PASS: each link changes URL + filters list to that category only. (Broken routing would show all products or wrong set.)

## Test 3 — Catalog filter pills (all categories, adversarial on believe/iphone)
- Go to `/products`. Note total product count (~56) and 9 pills: Tout + 8 categories.
- Click "Believe" pill → active pill styled black/filled; list = exactly the 5 Believe products; H1 "Believe".
- Click "iPhone" pill → active; list = iPhone range only (all names "iPhone …"), count > believe count.
- Direct nav `/products?category=believe` → same 5 Believe products (server-side filter).
- Click "Tout" → back to full catalog (~56).
- PASS: counts and product sets change per category; active pill visibly filled black. FAIL if list unchanged between categories.

## Test 4 — Generated iPhone variant detail
- Go to `/products/iphone-17-pro-max`. Expect: name "iPhone 17 Pro Max", a price (€), specs table (Écran/Puce/Stockage etc.), emoji 📱, "Ajouter au panier" button.
- PASS: page renders full detail (proves per-variant generation works). FAIL if 404 or missing fields.

## Test 5 — Cart flow end-to-end (KEY REGRESSION) + animated badge + shipping threshold
Start empty (clear localStorage `iphone-eshop-cart`).
- On `/products/believe-cable-usbc-2m` (15 €) click "Ajouter au panier". Button animates/confirms ("Ajouté ✓"); Header badge appears = 1 (spring animation).
- Go to `/cart`. Item "Believe Câble USB-C 2 m" listed, line 15 €. Sous-total 15 €, Livraison 5 € (15<50), Total 20 €.
- Click "+" to qty 3 → Sous-total 45 €, Livraison 5 € (45<50 still charged), Total 50 €. (Adversarial: threshold not crossed at 45.)
- Click "+" to qty 4 → Sous-total 60 €, Livraison Offerte (≥50), Total 60 €.
- Click "−" once → qty 3, Livraison back to 5 €, Total 50 €.
- Reload `/cart` (F5) → item + qty 3 + badge persist (localStorage).
- Click "✕" remove → empty cart "Votre panier est vide", badge gone.
- PASS: badge increments with animation, all totals exact, shipping flips at 50 €, persistence holds, remove empties.

## Evidence
Screenshot each key state; zoom badge/totals. Annotate recording. For animations, capture mid/post-reveal frames to show content actually appears.
