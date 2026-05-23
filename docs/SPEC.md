# Rebelle Store — Master Technical Specification

## 1. Project Overview

**Brand**: Rebelle — luxury handbag DTC brand targeting Moroccan women  
**Domain**: rebelle.ma (frontend) · api.rebelle.ma (backend)  
**Model**: COD-only (Cash on Delivery), no payment gateway  
**Traffic channels**: Facebook Ads, TikTok Ads, Snapchat Ads (UGC/Reels)  
**ICP**: Moroccan women 20–40, fashion-forward, aspirational, social-media native  
**Goal**: Maximum AOV, maximum CRO, maximum delivery rate confirmation

---

## 2. Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS variables
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State**: React Context (cart + checkout)
- **Fonts**: Cormorant Garamond (headings) + Montserrat (body) via next/font/google

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js + TypeScript
- **Database**: PostgreSQL 15 (via `pg` driver)
- **Migrations**: Custom SQL on startup
- **Hashing**: Node.js native `crypto` (SHA-256)
- **HTTP client**: Axios (CAPI calls, Sheets webhook)
- **Security**: Helmet, cors, express-rate-limit

### Infrastructure
- **Hosting**: EasyPanel
- **DB**: PostgreSQL internal — `postgres://rebelle:rebelle@rebelle_database:5432/rebelle?sslmode=disable`
- **Containers**: Docker (separate Dockerfile per service)
- **Git**: GitHub (separate repos or monorepo)

---

## 3. Repository Structure

```
rebelle-store/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Homepage
│   │   ├── globals.css
│   │   ├── collection/
│   │   │   └── page.tsx              # All products
│   │   ├── produits/
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Product landing page
│   │   ├── a-propos/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── merci/
│   │       └── page.tsx              # Thank you
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── BrandStory.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── UrgencyBanner.tsx
│   │   │   └── HomeFAQ.tsx
│   │   ├── product/
│   │   │   ├── ProductHero.tsx       # Images + offer selector + CTA
│   │   │   ├── OfferSelector.tsx     # 1/2/3 piece bundles
│   │   │   ├── TrustBadges.tsx
│   │   │   ├── ProductBenefits.tsx
│   │   │   ├── SocialProof.tsx
│   │   │   ├── ProductStory.tsx
│   │   │   ├── BundleHighlight.tsx
│   │   │   ├── ProductFAQ.tsx
│   │   │   └── CrosssellSection.tsx
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── CrosssellCard.tsx
│   │   ├── checkout/
│   │   │   ├── CheckoutPopup.tsx
│   │   │   └── UpsellPopup.tsx
│   │   └── ui/
│   │       ├── StarRating.tsx
│   │       ├── ScarcityBadge.tsx
│   │       ├── CountdownTimer.tsx
│   │       └── AnimatedSection.tsx
│   ├── context/
│   │   └── CartContext.tsx
│   ├── lib/
│   │   ├── products.ts               # Product data + pricing
│   │   ├── pixels.ts                 # Client pixel helpers (deferred)
│   │   └── utils.ts
│   ├── public/
│   │   └── assets/images/            # Product + hero images
│   ├── Dockerfile
│   ├── .env.example
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── index.ts                  # Express app entry
│   │   ├── routes/
│   │   │   ├── orders.ts
│   │   │   └── pixels.ts             # CAPI proxy endpoint
│   │   ├── services/
│   │   │   ├── orderService.ts
│   │   │   ├── pixelService.ts       # FB + TT + SC CAPI with hashing
│   │   │   └── sheetsService.ts      # Google Sheets webhook
│   │   ├── db/
│   │   │   ├── connection.ts         # pg Pool
│   │   │   └── migrations.ts         # Run on startup
│   │   └── utils/
│   │       └── hash.ts               # SHA-256 helpers
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
└── templates/
    ├── sheet-webhook.js              # Google Apps Script (deploy as web app)
    └── orders-template.csv           # Import into Google Sheets
```

---

## 4. Design System

### Colors
```
Primary:    #810B38  (Burgundy)
Secondary:  #C4956A  (Gold)
Background: #FAF6F2  (Cream)
Dark:       #1A1A1A  (Charcoal)
Success:    #16A34A
White:      #FFFFFF
```

### Fonts
```
Display:  "Cormorant Garamond" — weight 300/400/600/700  (headings, brand name)
Body:     "Montserrat"         — weight 300/400/500/600  (paragraphs, labels)
```

### Spacing / Radius
- Section vertical padding: `py-16 lg:py-24`
- Cards: `rounded-2xl` or `rounded-3xl`
- Buttons: `rounded-full`

### Shadows
```css
--shadow-luxury: 0 8px 40px rgba(129, 11, 56, 0.12);
--shadow-card:   0 2px 20px rgba(0,0,0,0.08);
```

---

## 5. Product Catalogue

Six fixed products. All pricing is per-bundle (not per-item):

| ID | Name | Slug |
|----|------|------|
| 1 | Coach Tabby Shoulder Bag Brown | coach-tabby-brown |
| 2 | Gucci GG Marmont Shoulder Bag Black | gucci-gg-marmont-black |
| 3 | Louis Vuitton CarryAll | lv-carryall |
| 4 | LV Catchy PM | lv-catchy-pm |
| 5 | LV x TM Alma BB Epi Leather | lv-alma-bb-epi |
| 6 | Ophidia Mini Bag Beige/Ebony | gucci-ophidia-mini |

### Pricing (same for all products)
| Bundle | Price | Label |
|--------|-------|-------|
| 1 piece | 469 DH | — |
| 2 pieces | 699 DH | Économise 239 DH |
| 3 pieces | 899 DH | Économise 508 DH ⭐ Le plus populaire |

### Image paths (3 images per product)
```
/assets/images/products/coach-tabby-brown/1.png  (+ 2.png, 3.png)
/assets/images/products/gucci-gg-marmont-black/1.png
/assets/images/products/lv-carryall/1.png
/assets/images/products/lv-catchy-pm/1.png
/assets/images/products/lv-alma-bb-epi/1.png
/assets/images/products/gucci-ophidia-mini/1.png
```
> **Note**: Placeholder images provided — replace with real product photos later.

---

## 6. Header Component

### Layout (desktop, left → right)
```
[ ⬤ R ]  REBELLE    |  Accueil  Collection  À Propos  Contact  |  🛒 (count badge)
```

### Layout (mobile)
```
[ ⬤ R ]  REBELLE                                               🛒  ☰
```

### Spec
- **Brand mark**: Circle with `R` inside — background `#810B38`, text white — `w-9 h-9 rounded-full flex items-center justify-center`
- **Brand name**: "REBELLE" — `font-cormorant font-bold text-2xl tracking-[0.18em] text-charcoal`
- **Position**: Fixed, `z-50`. Transparent on scroll top → white `bg-white/95 backdrop-blur shadow-sm` after 20px scroll
- **Cart icon**: Lucide `ShoppingBag` — burgundy badge showing count when > 0
- **Mobile**: Hamburger opens full-screen overlay menu
- **Announcement bar** (above header): "🚚 Livraison gratuite partout au Maroc · Paiement à la livraison" — background `#810B38`, text white, `text-xs`

---

## 7. Homepage Sections

Build in this exact order:

### 7.1 AnnouncementBar
- Sticky top bar, burgundy bg, white text
- "🚚 Livraison gratuite partout au Maroc · Paiement à la livraison 💳"

### 7.2 Hero Section
- **Layout**: Full screen (`min-h-screen`), dark overlay on background image
- **Background**: `/assets/images/hero/hero-bg.png` with `opacity-60` and dark gradient overlay
- **Left side** (text):
  - Eyebrow: gold line + "Collection Exclusive" label
  - H1: `clamp(3rem, 7vw, 5.5rem)` — "L'élégance qui vous appartient."
  - Subheadline: "Sacs premium pour femmes au Maroc · Qualité internationale · Livraison COD"
  - CTA primary: "Découvrir la Collection →" → scrolls to #collection
  - CTA secondary: "Commander sur WhatsApp" → WhatsApp link
  - Trust mini row: "✓ Livraison 2-4 jours · ✓ Paiement à la livraison · ✓ Retour facile"
- **Right side** (desktop only): floating product card with `/assets/images/hero/card.png`, product name, price badge

### 7.3 TrustBar
4 pillars in a horizontal row:
1. 🚚 Livraison partout au Maroc (2-4 jours)
2. 💰 Paiement à la livraison
3. ✅ Qualité premium garantie
4. 🔄 Retour sous 7 jours

### 7.4 FeaturedProducts (id="collection")
- Title: "Nos Pièces d'Exception"
- Filter tabs: Tous / Bestsellers / Nouveautés
- Grid: 3 cols desktop, 2 cols tablet, 1 col mobile
- Each card:
  - Product image (aspect 3:4) with hover → show image 2
  - Badge: "Bestseller" (burgundy) or "Nouveau" (gold)
  - Stars: 4.9 ★★★★★ (87 avis)
  - Name + tagline
  - Price from 469 DH
  - "Commander →" CTA → goes to product page
  - Scarcity: "⚡ Plus que 5 en stock"

### 7.5 BrandStory
- **Layout** (alternating desktop): image left, text right
- Image: `/assets/images/brand-story/main.png`
- Title: "Née pour la femme marocaine moderne"
- Text: brand story copy (see COPY.md)
- Stats: 500+ clientes, 100% satisfaction, 2-4j livraison
- CTA: "Notre Histoire →" → /a-propos

### 7.6 HowItWorks
- Title: "Comment commander ?"
- 3 steps: Choisir ton sac → Confirmer ta commande → Recevoir chez toi
- Icons + short descriptions

### 7.7 Testimonials
- Title: "Ce que disent nos clientes"
- 4 review cards with: photo placeholder, name, city, stars, review text (in Darija/French mix)
- Auto-scroll carousel on mobile

### 7.8 UrgencyBanner
- Background: burgundy
- Text: "⏰ Offre limitée — Commande 2 sacs et économise 239 DH · Ma tbqa l'offre mezyana"
- CTA: "Profiter de l'offre →"

### 7.9 HomeFAQ
- 5 accordion items (see COPY.md)
- Schema markup for SEO

### 7.10 Footer
- See Section 11

---

## 8. Product Landing Page `/produits/[slug]`

This page is the primary conversion page. Every section exists to remove objections and drive the purchase. Build in this order:

### 8.1 ProductHero
Two-column layout desktop (image left, details right). Single column mobile.

**Left — Image Gallery**:
- Main image large: `aspect-[4/5]`, click to zoom
- 3 thumbnail buttons below (or left side desktop)
- Arrows to navigate between 3 images
- Image counter badge

**Right — Product Details**:
```
[Badge: "Bestseller" | "Nouveau" | "⚡ Vente Flash"]
[Product Name — font-cormorant text-4xl]
[Tagline — Montserrat text-sm gold]
[★★★★★ 4.9/5  (87 avis) — clickable → scroll to reviews]

[Scarcity: "🔴 Plus que 5 pièces disponibles!"]
[Social proof: "✅ 23 personnes ont commandé aujourd'hui"]

[--- Choisis ton offre ---]
[OfferSelector component]

[CTA Button: "🛍️ Ajouter au panier & confirmer" — full width, burgundy, large]

[Trust mini badges row]
[COD badge] [Livraison 2-4j] [Retour 7j] [Qualité garantie]
```

### 8.2 OfferSelector Component

Three offer cards stacked vertically, selectable:

```
○  1 SAC             469 DH
                     Livraison standard

◉  2 SACS ⭐ POPULAIRE    699 DH   ~~938 DH~~
                     Économise 239 DH · Offre la plus choisie

○  3 SACS 🔥 MEILLEUR PRIX   899 DH  ~~1407 DH~~
                     Économise 508 DH
```

- Default selected: 2 pieces (highest conversion)
- Selected card: burgundy border + subtle bg tint
- "POPULAIRE" / "MEILLEUR PRIX" badges on right

### 8.3 TrustBadges (below CTA)
Horizontal row of small badges:
- 🔒 Paiement sécurisé
- 🚚 Livraison gratuite au Maroc
- ↩️ Retour facile 7 jours
- ⭐ Qualité garantie

### 8.4 ProductBenefits
- Section title: "Pourquoi choisir ce sac ?"
- 4 benefits with icons (alternating image/text layout on desktop):
  1. Cuir véritable — quality material
  2. Finitions dorées premium
  3. Design intemporel
  4. Taille parfaite pour le quotidien

### 8.5 SocialProof (Reviews)
- Title: "Ce que disent nos clientes" + aggregate star rating
- 4 review cards (grid 2 cols desktop, 1 col mobile)
- Each review: photo, name (city), stars, date, review text
- "Verified Purchase" badge on each
- "Voir tous les avis" → loads more (static, 4 more)

### 8.6 ProductStory
- Alternating image/text layout
- Image: product photo 2 or 3
- Text: material story, craftsmanship, why it's special
- Emotional copy about what the bag says about the woman who carries it

### 8.7 BundleHighlight
- Dark background section (`bg-charcoal`)
- Spotlight the 2-piece offer as "Choix de nos clientes"
- Large price display: 699 DH
- Savings callout: "Tu économises 239 DH"
- CTA: "Je prends 2 sacs →"

### 8.8 ProductFAQ
- 6 accordion items specific to the product
- See COPY.md

### 8.9 CrosssellSection
- Title: "Complète ta commande"
- 3 other product cards (not current product)
- Each card: image, name, price, "Voir →" CTA

---

## 9. Cart Drawer

Slides in from right. Triggered by cart icon or "Add to cart" CTA.

### Structure

```
[X close]              Ton Panier 🛍️
─────────────────────────────────────
[CartItem × N]
  - product image (60x80)
  - name + offer selected
  - quantity selector (- qty +)
  - price
  - remove button

─────────────────────────────────────
Subtotal:                    699 DH
─────────────────────────────────────
🔥 Tu as 1 sac — Ajoute-en 1 autre et économise 239 DH  [Ajouter]
─────────────────────────────────────
[Crossell Section: "Les clientes ont aussi aimé"]
  [CrosssellCard] [CrosssellCard] [CrosssellCard]
  — each: small image, name, price, "Ajouter" button
─────────────────────────────────────
[BUTTON: "Confirmer ma commande →"]  (full width, burgundy)
[Lock icon] Paiement à la livraison — 100% sécurisé
```

### CrosssellCard
- Image + name + price
- Quick "Ajouter" button (adds 1 piece at 469 DH offer)
- Should show 3 products that are NOT in cart

### Cart upgrade nudge
- If cart has 1 item → show: "Ajoute 1 sac et économise 239 DH!"
- If cart has 2 items → show: "Ajoute 1 sac de plus et économise encore!"
- If cart has 3+ → hide nudge, show: "🎉 Tu as le meilleur deal!"

---

## 10. Checkout Popup

Triggered by "Confirmer ma commande" button in cart. Full-screen modal/overlay.

### Layout

```
[X close]

⭐⭐⭐⭐⭐  +500 commandes confirmées aujourd'hui

═══════════ Récapitulatif ═══════════
[product image small] [name] [offer]         [price]
...
                              Total:  699 DH
                     Livraison:  GRATUITE
══════════════════════════════════════

🔴 Plus que 3 places disponibles aujourd'hui

──── Tes coordonnées ────

[Prénom *]
[Numéro de téléphone (06/07...) *]

    [CONFIRMER MA COMMANDE →]
    🔒 Paiement à la livraison · Livraison 2-4 jours

⏰ Offre réservée pour toi pendant: [00:15]
```

### Phone validation
- Accept Moroccan numbers only
- Valid patterns: `06XXXXXXXX`, `07XXXXXXXX`, `+2126XXXXXXXX`, `+2127XXXXXXXX`
- Regex: `/^(\+212|0)(6|7)[0-9]{8}$/`
- Show error in red if invalid: "Numéro invalide — entre un numéro marocain valide (06/07...)"
- Only enable submit button when both fields are valid

### Countdown timer
- 15 minutes countdown: "⏰ Offre réservée pendant: 14:45"
- Resets each time popup opens
- Visual urgency (turns red at < 3 minutes)

### On submit
1. Validate name (non-empty, > 2 chars) + phone (valid MA)
2. Call `POST /api/orders` → backend
3. Show loading spinner on button
4. On success → close checkout popup → show UpsellPopup

---

## 11. Upsell Popup

Shown immediately after successful order submission. Time-limited offer.

### Spec
```
[X — but shows timer so they hesitate]

🎁  Attends! Une offre spéciale pour toi

[product image of DIFFERENT product, rotating suggestion]

"Tu viens de commander avec goût. 
 Nos clientes qui commandent ce sac adorent aussi celui-ci."

[Product name]
Prix normal: ~~850 DH~~
Ton prix maintenant: 469 DH  ← uniquement ici

⏰ Cette offre expire dans: [00:12]  ← 12 seconds countdown

[OUI, JE L'AJOUTE À MA COMMANDE →]  (burgundy full width)
[Non merci, je passe]
```

### Logic
- Show a product that is NOT already in the order
- Price always 469 DH regardless of original
- If user clicks "Oui" → update order on backend (add upsell item) → go to /merci
- If user clicks "Non" or timer expires → go to /merci
- Timer: 12 seconds, visible countdown

---

## 12. Thank You Page `/merci`

```
[Confetti animation]

✅  Commande confirmée!

Merci [prénom]! Ta commande #RB-XXXXX est bien enregistrée.

Notre équipe va te contacter dans 24h pour confirmer la livraison.

[Order summary card]
  Products, quantities, total

[WhatsApp CTA] "Suivi de commande sur WhatsApp →"

[Share section] "Partage Rebelle avec tes amies ❤️"
  [FB share] [WA share] [IG story]

[Continue shopping] "Découvrir d'autres sacs →"
```

---

## 13. Collection Page `/collection`

- Hero banner: "Notre Collection Complète"
- All 6 products in grid (3 cols desktop, 2 tablet, 1 mobile)
- Filter bar: Tous / Par prix / Bestsellers
- Same ProductCard component as homepage

---

## 14. About Us Page `/a-propos`

Sections in order:
1. Hero image (full-width dark overlay with headline)
2. Brand story (image left, text right)
3. Values section (4 cards)
4. Team section (3 members)
5. Morocco inspiration (dark bg, full width)
6. CTA → collection

---

## 15. Contact Page `/contact`

- Hero: "Contacte-nous"
- WhatsApp button (primary CTA): large green button
- Contact form: Nom, Email, Message
- Instagram link
- Response time badge: "Réponse en moins de 2h"

---

## 16. Footer

```
[Logo + tagline]

[Col 1: Navigation]        [Col 2: Aide]            [Col 3: Social]
Accueil                    FAQ                      Instagram
Collection                 Livraison & Retours      TikTok
À Propos                   Contact                  Facebook
                           WhatsApp                 Snapchat

[Trust badges row]
Paiement COD · Livraison Maroc · Qualité Garantie

[Bottom bar]
© 2026 Rebelle. Tous droits réservés. · Politique de confidentialité
```

---

## 17. Backend API Specification

Base URL: `https://api.rebelle.ma`

### 17.1 POST /api/orders

Create a new order.

**Request body**:
```json
{
  "name": "Fatima",
  "phone": "0661234567",
  "items": [
    {
      "product_id": "gucci-gg-marmont-black",
      "product_name": "Gucci GG Marmont Shoulder Bag Black",
      "quantity": 2,
      "offer": "2pieces",
      "unit_price": 699
    }
  ],
  "upsell_accepted": false,
  "utm_source": "facebook",
  "utm_medium": "cpc",
  "utm_campaign": "rebelle_may2026",
  "fbc": "_fbc_value",
  "fbp": "_fbp_value",
  "ttclid": "ttclid_value",
  "scid": "scid_value",
  "event_id": "uuid-v4-for-dedup",
  "client_ip": "1.2.3.4",
  "user_agent": "Mozilla/5.0..."
}
```

**Response**:
```json
{
  "success": true,
  "order_id": "RB-2026-00042",
  "message": "Commande enregistrée"
}
```

**On receive**:
1. Validate phone (MA format)
2. Generate order_id (format: `RB-YYYY-NNNNN`)
3. Calculate total from items
4. Insert into `orders` table
5. Fire FB/TT/SC CAPI Purchase event (async, non-blocking)
6. Send to Google Sheets webhook (async, non-blocking)
7. Return order_id immediately

### 17.2 POST /api/orders/:id/upsell

Add upsell item to existing order.

**Request body**:
```json
{
  "product_id": "coach-tabby-brown",
  "product_name": "Coach Tabby Shoulder Bag Brown",
  "upsell_price": 469
}
```

**Response**: `{ "success": true }`

**On receive**:
1. Find order by order_id
2. Append upsell item to items JSONB
3. Update total
4. Update `upsell_accepted = true`
5. Fire CAPI event for upsell (optional)

### 17.3 POST /api/pixels/capi

Proxy endpoint for client-side CAPI events (ViewContent, AddToCart, InitiateCheckout).

**Request body**:
```json
{
  "events": ["ViewContent"],
  "product_id": "gucci-gg-marmont-black",
  "value": 469,
  "currency": "MAD",
  "event_id": "uuid-v4",
  "fbc": "_fbc_value",
  "fbp": "_fbp_value",
  "client_ip": "1.2.3.4",
  "user_agent": "Mozilla/5.0...",
  "page_url": "https://rebelle.ma/produits/gucci-gg-marmont-black"
}
```

**Response**: `{ "success": true }`

---

## 18. Database Schema

```sql
-- migrations/001_init.sql

CREATE TABLE IF NOT EXISTS orders (
  id                 SERIAL PRIMARY KEY,
  order_id           VARCHAR(20)   UNIQUE NOT NULL,
  name               VARCHAR(100)  NOT NULL,
  phone              VARCHAR(20)   NOT NULL,
  phone_normalized   VARCHAR(20),           -- 212XXXXXXXXX format for CAPI

  items              JSONB         NOT NULL,
  subtotal           NUMERIC(10,2) NOT NULL,
  total              NUMERIC(10,2) NOT NULL,
  offer_type         VARCHAR(20),           -- '1piece','2pieces','3pieces'

  upsell_accepted    BOOLEAN       DEFAULT false,
  upsell_product_id  VARCHAR(100),
  upsell_amount      NUMERIC(10,2) DEFAULT 0,

  status             VARCHAR(20)   DEFAULT 'pending',
  -- pending | confirmed | shipped | delivered | cancelled

  utm_source         VARCHAR(200),
  utm_medium         VARCHAR(200),
  utm_campaign       VARCHAR(200),
  utm_content        VARCHAR(200),
  utm_term           VARCHAR(200),

  fbc                VARCHAR(500),
  fbp                VARCHAR(500),
  ttclid             VARCHAR(500),
  scid               VARCHAR(500),

  client_ip          VARCHAR(45),
  user_agent         TEXT,

  event_id           VARCHAR(100),          -- dedup id from frontend

  sheets_sent        BOOLEAN       DEFAULT false,
  capi_sent          BOOLEAN       DEFAULT false,

  created_at         TIMESTAMPTZ   DEFAULT NOW(),
  updated_at         TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_phone    ON orders(phone);
CREATE INDEX IF NOT EXISTS idx_orders_status   ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created  ON orders(created_at);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## 19. MA Phone Number Normalization

Used in backend for CAPI hashing:

```typescript
// utils/phone.ts
export function normalizeMAPhone(raw: string): string {
  // Remove all non-numeric except leading +
  let clean = raw.replace(/[\s\-().]/g, '');

  if (clean.startsWith('+212')) {
    clean = '212' + clean.slice(4);
  } else if (clean.startsWith('00212')) {
    clean = '212' + clean.slice(5);
  } else if (clean.startsWith('0')) {
    clean = '212' + clean.slice(1);
  }
  // Result: "212612345678" (no + sign)
  return clean;
}

export function validateMAPhone(raw: string): boolean {
  return /^(\+212|00212|0)(6|7)\d{8}$/.test(raw.replace(/\s/g, ''));
}
```

---

## 20. Environment Variables

### frontend/.env.example
```env
NEXT_PUBLIC_API_URL=https://api.rebelle.ma
NEXT_PUBLIC_SITE_URL=https://rebelle.ma

# Facebook
NEXT_PUBLIC_FB_PIXEL_ID=your_fb_pixel_id

# TikTok
NEXT_PUBLIC_TT_PIXEL_ID=your_tiktok_pixel_id

# Snapchat
NEXT_PUBLIC_SC_PIXEL_ID=your_snapchat_pixel_id

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=212600000000
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/212600000000

# Instagram
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/rebelle.ma
```

### backend/.env.example
```env
NODE_ENV=production
PORT=3001

DATABASE_URL=postgres://rebelle:rebelle@rebelle_database:5432/rebelle?sslmode=disable

# Facebook CAPI
FB_PIXEL_ID=your_fb_pixel_id
FB_ACCESS_TOKEN=your_fb_access_token

# TikTok Events API
TT_PIXEL_ID=your_tiktok_pixel_id
TT_ACCESS_TOKEN=your_tiktok_access_token

# Snapchat CAPI
SC_PIXEL_ID=your_snapchat_pixel_id
SC_ACCESS_TOKEN=your_snapchat_access_token

# Google Sheets Webhook (Google Apps Script URL)
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# CORS
ALLOWED_ORIGINS=https://rebelle.ma,http://localhost:3000
```

---

## 21. Docker Configuration

### frontend/Dockerfile
```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

### backend/Dockerfile
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

### next.config.mjs (add output: standalone)
```js
const nextConfig = {
  output: 'standalone',
  // ...rest of config
};
```

---

## 22. EasyPanel Deployment Notes

1. **Frontend service**: 
   - Build from Dockerfile in `frontend/`
   - Domain: `rebelle.ma`
   - Port: 3000
   - All `NEXT_PUBLIC_*` vars as build args AND runtime env

2. **Backend service**:
   - Build from Dockerfile in `backend/`
   - Domain: `api.rebelle.ma`
   - Port: 3001
   - All env vars set in EasyPanel env section

3. **CORS**: Backend must allow `https://rebelle.ma`

4. **Database**: Already exists — use internal connection string

---

## 23. Order ID Generation

```typescript
// Format: RB-2026-NNNNN (zero-padded 5 digits)
async function generateOrderId(db: Pool): Promise<string> {
  const year = new Date().getFullYear();
  const result = await db.query(
    `SELECT COUNT(*) as count FROM orders WHERE order_id LIKE $1`,
    [`RB-${year}-%`]
  );
  const count = parseInt(result.rows[0].count) + 1;
  return `RB-${year}-${String(count).padStart(5, '0')}`;
}
```

---

## 24. UTM & Attribution Tracking

Frontend should read UTM params from URL on every page load and store in localStorage:
```typescript
// lib/utm.ts
export function captureUTM() {
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  utmKeys.forEach(key => {
    const val = params.get(key);
    if (val) localStorage.setItem(key, val);
  });
  // Also capture click IDs
  const fbclid = params.get('fbclid');
  const ttclid = params.get('ttclid');
  if (fbclid) {
    localStorage.setItem('fbclid', fbclid);
    // Set _fbc cookie: fb.1.{timestamp}.{fbclid}
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    document.cookie = `_fbc=${fbc}; path=/; max-age=7776000`; // 90 days
  }
  if (ttclid) localStorage.setItem('ttclid', ttclid);
}
```

---

## 25. CRO Checklist

Every page must have:
- [ ] Above-the-fold CTA visible without scrolling
- [ ] Social proof (stars, count, reviews) near every CTA
- [ ] Scarcity signal near every CTA ("Plus que X en stock")
- [ ] COD badge near every checkout button
- [ ] Mobile-optimized sticky CTA bar on product pages
- [ ] Page load < 2s (use Next.js Image optimization, lazy-load pixels)
- [ ] WhatsApp floating button (bottom right, all pages)
- [ ] Exit-intent or scroll-triggered popup (optional v2)

### Sticky Mobile CTA (product page)
- Fixed bottom bar on mobile only
- Shows: product name + selected price + "Commander →"
- Background: burgundy
- Appears after scrolling past the hero CTA

---

*End of SPEC.md*
