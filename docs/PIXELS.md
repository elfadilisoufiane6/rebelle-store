# Rebelle Store — Pixel & Analytics Implementation

## Overview

Three advertising pixels are implemented:
- **Facebook (Meta) Pixel** — Web + CAPI
- **TikTok Pixel** — Web + Events API (CAPI)
- **Snapchat Pixel** — Web + CAPI

Each has two layers:
1. **Web pixel** (browser-side) — fires immediately from the browser
2. **CAPI / Server-side** (backend) — fires from the server, independent of ad blockers

### Deduplication
Both layers use the same `event_id` so each platform counts only ONE conversion per event.

### Performance
All web pixels are loaded **deferred** (`strategy="afterInteractive"` or `lazyOnload` in Next.js Script). Never block first paint.

---

## Confirmed Hashing Rules (verified 2025)

| Platform | Phone format before SHA-256 |
|----------|-----------------------------|
| **Facebook CAPI** | Digits only, country code no +. `212612345678` |
| **TikTok Events API** | E.164 WITH + prefix. `+212612345678` |
| **Snapchat CAPI** | Digits only, country code no +. `212612345678` |

All emails: `lowercase().trim()` before sha256.

---

## 1. Phone Normalization (backend)

```typescript
// backend/src/utils/hash.ts
import { createHash } from 'crypto';

export function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

// Morocco phone → Facebook/Snapchat format: "212XXXXXXXXX"
export function normalizePhoneFB(raw: string): string {
  let clean = raw.replace(/[\s\-().+]/g, '');
  if (clean.startsWith('00212')) clean = '212' + clean.slice(5);
  else if (clean.startsWith('212'))  clean = clean; // already correct
  else if (clean.startsWith('0'))    clean = '212' + clean.slice(1);
  return clean; // "212612345678"
}

// Morocco phone → TikTok format: "+212XXXXXXXXX"
export function normalizePhoneTT(raw: string): string {
  const base = normalizePhoneFB(raw); // "212612345678"
  return '+' + base;                  // "+212612345678"
}

export function normalizeEmail(raw: string): string {
  return raw.toLowerCase().trim();
}

// Hash helpers
export const hashPhone = {
  facebook:  (phone: string) => sha256(normalizePhoneFB(phone)),
  tiktok:    (phone: string) => sha256(normalizePhoneTT(phone)),
  snapchat:  (phone: string) => sha256(normalizePhoneFB(phone)),
};

export const hashEmail = (email: string) => sha256(normalizeEmail(email));
```

---

## 2. Event ID Generation (frontend)

```typescript
// frontend/lib/pixels.ts
export function generateEventId(): string {
  // Use crypto.randomUUID if available, fallback to manual
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
```

---

## 3. Frontend Pixel Setup (Next.js)

### 3.1 Script loading (deferred)

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  const fbPixelId  = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  const ttPixelId  = process.env.NEXT_PUBLIC_TT_PIXEL_ID;
  const scPixelId  = process.env.NEXT_PUBLIC_SC_PIXEL_ID;

  return (
    <html lang="fr">
      <body>
        {children}

        {/* ─── Facebook Pixel — deferred ─── */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* ─── TikTok Pixel — deferred ─── */}
        <Script id="tt-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;
              var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
              ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
              var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
              var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${ttPixelId}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>

        {/* ─── Snapchat Pixel — deferred ─── */}
        <Script id="sc-pixel" strategy="afterInteractive">
          {`
            (function(e,t,n){
              if(e.snaptr)return;
              var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
              a.queue=[];
              var s='script';r=t.createElement(s);r.async=!0;
              r.src=n;var u=t.getElementsByTagName(s)[0];
              u.parentNode.insertBefore(r,u);
            })(window,document,'https://sc-static.net/scevent.min.js');
            snaptr('init', '${scPixelId}', { 'user_email': '__INSERT_EMAIL__' });
            snaptr('track', 'PAGE_VIEW');
          `}
        </Script>

      </body>
    </html>
  );
}
```

---

### 3.2 Client pixel helper functions

```typescript
// frontend/lib/pixels.ts

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void; page: () => void };
    snaptr?: (...args: unknown[]) => void;
  }
}

export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// ──────────────────────────────────────────────
// Facebook Web Pixel
// ──────────────────────────────────────────────
export function fbViewContent(productId: string, value: number, eventId: string) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'ViewContent', {
    content_ids:  [productId],
    content_type: 'product',
    value,
    currency:     'MAD',
  }, { eventID: eventId });
}

export function fbAddToCart(productId: string, value: number, eventId: string) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'AddToCart', {
    content_ids:  [productId],
    content_type: 'product',
    value,
    currency:     'MAD',
  }, { eventID: eventId });
}

export function fbInitiateCheckout(productIds: string[], value: number, eventId: string) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'InitiateCheckout', {
    content_ids:  productIds,
    content_type: 'product',
    value,
    currency:     'MAD',
    num_items:    productIds.length,
  }, { eventID: eventId });
}

export function fbPurchase(productIds: string[], value: number, eventId: string) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'Purchase', {
    content_ids:  productIds,
    content_type: 'product',
    value,
    currency:     'MAD',
  }, { eventID: eventId });
}

// ──────────────────────────────────────────────
// TikTok Web Pixel
// ──────────────────────────────────────────────
export function ttViewContent(productId: string, productName: string, value: number) {
  if (typeof window === 'undefined' || !window.ttq) return;
  window.ttq.track('ViewContent', {
    contents: [{ content_id: productId, content_type: 'product', content_name: productName, price: value, quantity: 1 }],
    value,
    currency: 'MAD',
  });
}

export function ttAddToCart(productId: string, productName: string, value: number) {
  if (typeof window === 'undefined' || !window.ttq) return;
  window.ttq.track('AddToCart', {
    contents: [{ content_id: productId, content_type: 'product', content_name: productName, price: value, quantity: 1 }],
    value,
    currency: 'MAD',
  });
}

export function ttInitiateCheckout(contents: Array<{id: string; name: string; price: number}>, value: number) {
  if (typeof window === 'undefined' || !window.ttq) return;
  window.ttq.track('InitiateCheckout', {
    contents: contents.map(c => ({ content_id: c.id, content_type: 'product', content_name: c.name, price: c.price, quantity: 1 })),
    value,
    currency: 'MAD',
  });
}

export function ttPlaceOrder(contents: Array<{id: string; name: string; price: number}>, value: number) {
  if (typeof window === 'undefined' || !window.ttq) return;
  window.ttq.track('PlaceAnOrder', {
    contents: contents.map(c => ({ content_id: c.id, content_type: 'product', content_name: c.name, price: c.price, quantity: 1 })),
    value,
    currency: 'MAD',
  });
}

// ──────────────────────────────────────────────
// Snapchat Web Pixel
// ──────────────────────────────────────────────
export function scViewContent(productId: string, value: number, eventId: string) {
  if (typeof window === 'undefined' || !window.snaptr) return;
  window.snaptr('track', 'VIEW_CONTENT', {
    price:            String(value),
    currency:         'MAD',
    item_ids:         [productId],
    client_dedup_id:  eventId,
  });
}

export function scAddToCart(productId: string, value: number, eventId: string) {
  if (typeof window === 'undefined' || !window.snaptr) return;
  window.snaptr('track', 'ADD_CART', {
    price:            String(value),
    currency:         'MAD',
    item_ids:         [productId],
    client_dedup_id:  eventId,
  });
}

export function scPurchase(productIds: string[], value: number, orderId: string, eventId: string) {
  if (typeof window === 'undefined' || !window.snaptr) return;
  window.snaptr('track', 'PURCHASE', {
    price:            String(value),
    currency:         'MAD',
    transaction_id:   orderId,
    item_ids:         productIds,
    client_dedup_id:  eventId,
  });
}
```

---

### 3.3 CAPI proxy call from frontend (for non-purchase events)

```typescript
// frontend/lib/pixels.ts (append)

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendCAPIEvent(payload: {
  events:     string[];
  product_id: string;
  value:      number;
  currency:   string;
  event_id:   string;
  fbc?:       string;
  fbp?:       string;
  page_url:   string;
}) {
  try {
    await fetch(`${API_URL}/api/pixels/capi`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        ...payload,
        user_agent: navigator.userAgent,
      }),
    });
  } catch {
    // Never block UI on CAPI failure
  }
}
```

---

## 4. Backend CAPI Implementation

### 4.1 Facebook CAPI

```typescript
// backend/src/services/pixelService.ts

import axios from 'axios';
import { sha256, hashPhone, hashEmail, normalizePhoneFB } from '../utils/hash';

const FB_API_VERSION = 'v19.0';
const FB_ENDPOINT = `https://graph.facebook.com/${FB_API_VERSION}`;

interface CAPIEventData {
  eventName:   string;  // 'Purchase' | 'AddToCart' | 'ViewContent' | 'InitiateCheckout'
  eventId:     string;
  eventTime?:  number;
  pageUrl:     string;
  phone?:      string;
  email?:      string;
  fbc?:        string;
  fbp?:        string;
  clientIp?:   string;
  userAgent?:  string;
  productIds:  string[];
  value:       number;
  currency:    string;
  numItems?:   number;
  orderId?:    string;
}

export async function sendFBCAPI(data: CAPIEventData): Promise<void> {
  const pixelId     = process.env.FB_PIXEL_ID!;
  const accessToken = process.env.FB_ACCESS_TOKEN!;

  const userData: Record<string, string> = {
    client_ip_address: data.clientIp  || '',
    client_user_agent: data.userAgent || '',
  };

  if (data.fbc)   userData.fbc = data.fbc;
  if (data.fbp)   userData.fbp = data.fbp;
  if (data.phone) userData.ph  = hashPhone.facebook(data.phone);
  if (data.email) userData.em  = hashEmail(data.email);

  const payload = {
    data: [{
      event_name:       data.eventName,
      event_time:       data.eventTime ?? Math.floor(Date.now() / 1000),
      event_id:         data.eventId,
      event_source_url: data.pageUrl,
      action_source:    'website',
      user_data:        userData,
      custom_data: {
        currency:     data.currency,
        value:        data.value,
        content_ids:  data.productIds,
        content_type: 'product',
        num_items:    data.numItems ?? data.productIds.length,
        ...(data.orderId ? { order_id: data.orderId } : {}),
      },
    }],
    access_token: accessToken,
  };

  await axios.post(
    `${FB_ENDPOINT}/${pixelId}/events`,
    payload,
    { timeout: 5000 }
  );
}
```

---

### 4.2 TikTok Events API (CAPI)

```typescript
// In backend/src/services/pixelService.ts

const TT_ENDPOINT = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

interface TTEventData {
  eventName:  string;  // 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'PlaceAnOrder'
  eventId:    string;
  pageUrl:    string;
  phone?:     string;
  email?:     string;
  ttclid?:    string;
  clientIp?:  string;
  userAgent?: string;
  contents:   Array<{ id: string; name: string; price: number; quantity: number }>;
  value:      number;
  currency:   string;
  orderId?:   string;
}

export async function sendTTCAPI(data: TTEventData): Promise<void> {
  const pixelId     = process.env.TT_PIXEL_ID!;
  const accessToken = process.env.TT_ACCESS_TOKEN!;

  const user: Record<string, string> = {
    ip:         data.clientIp  || '',
    user_agent: data.userAgent || '',
  };

  if (data.ttclid) user.ttclid = data.ttclid;
  // TikTok phone: E.164 WITH + sign
  if (data.phone)  user.phone_number = hashPhone.tiktok(data.phone);
  if (data.email)  user.email        = hashEmail(data.email);

  const payload = {
    pixel_code:   pixelId,
    event_source: 'web',
    data: [{
      event:      data.eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id:   data.eventId,
      page: {
        url:      data.pageUrl,
        referrer: '',
      },
      user,
      properties: {
        currency: data.currency,
        value:    data.value,
        contents: data.contents.map(c => ({
          content_id:   c.id,
          content_type: 'product',
          content_name: c.name,
          price:        c.price,
          quantity:     c.quantity,
        })),
        ...(data.orderId ? { order_id: data.orderId } : {}),
      },
    }],
  };

  await axios.post(TT_ENDPOINT, payload, {
    headers: { 'Access-Token': accessToken },
    timeout: 5000,
  });
}
```

---

### 4.3 Snapchat CAPI

```typescript
// In backend/src/services/pixelService.ts

const SC_ENDPOINT = 'https://tr.snapchat.com/v2/conversion';

interface SCEventData {
  eventType:  string;  // 'PURCHASE' | 'ADD_CART' | 'VIEW_CONTENT' | 'PAGE_VIEW'
  eventId:    string;
  pageUrl:    string;
  phone?:     string;
  email?:     string;
  scid?:      string;  // _scid cookie
  clientIp?:  string;
  userAgent?: string;
  productIds: string[];
  value:      number;
  currency:   string;
  orderId?:   string;
}

export async function sendSCCAPI(data: SCEventData): Promise<void> {
  const pixelId     = process.env.SC_PIXEL_ID!;
  const accessToken = process.env.SC_ACCESS_TOKEN!;

  const payload: Record<string, unknown> = {
    pixel_id:              pixelId,
    event_conversion_type: 'WEB',
    event_type:            data.eventType,
    timestamp:             new Date().toISOString(),
    client_dedup_id:       data.eventId,
    page_url:              data.pageUrl,
    user_agent:            data.userAgent || '',
    currency_code:         data.currency,
    price:                 String(data.value),
    item_ids:              data.productIds,
  };

  if (data.clientIp) payload.hashed_ip_address  = sha256(data.clientIp);
  // Snapchat phone: digits only, no + sign (same as Facebook)
  if (data.phone)    payload.hashed_phone_number = hashPhone.snapchat(data.phone);
  if (data.email)    payload.hashed_email        = hashEmail(data.email);
  if (data.scid)     payload.uuid_c1             = data.scid;
  if (data.orderId)  payload.transaction_id      = data.orderId;

  await axios.post(SC_ENDPOINT, payload, {
    headers: { Authorization: `Bearer ${accessToken}` },
    timeout: 5000,
  });
}
```

---

### 4.4 Combined CAPI Purchase call (on order creation)

```typescript
// backend/src/services/pixelService.ts

export async function fireAllCAPIPurchase(order: {
  orderId:   string;
  eventId:   string;
  phone:     string;
  items:     Array<{ product_id: string; product_name: string; unit_price: number; quantity: number }>;
  total:     number;
  fbc?:      string;
  fbp?:      string;
  ttclid?:   string;
  scid?:     string;
  clientIp?: string;
  userAgent?:string;
  pageUrl?:  string;
}): Promise<void> {
  const pageUrl    = order.pageUrl   || 'https://rebelle.ma/merci';
  const productIds = order.items.map(i => i.product_id);
  const contents   = order.items.map(i => ({
    id:       i.product_id,
    name:     i.product_name,
    price:    i.unit_price,
    quantity: i.quantity,
  }));

  // Fire all three in parallel, never throw on partial failure
  const results = await Promise.allSettled([
    sendFBCAPI({
      eventName:  'Purchase',
      eventId:    order.eventId,
      pageUrl,
      phone:      order.phone,
      fbc:        order.fbc,
      fbp:        order.fbp,
      clientIp:   order.clientIp,
      userAgent:  order.userAgent,
      productIds,
      value:      order.total,
      currency:   'MAD',
      orderId:    order.orderId,
    }),
    sendTTCAPI({
      eventName:  'PlaceAnOrder',
      eventId:    order.eventId,
      pageUrl,
      phone:      order.phone,
      ttclid:     order.ttclid,
      clientIp:   order.clientIp,
      userAgent:  order.userAgent,
      contents,
      value:      order.total,
      currency:   'MAD',
      orderId:    order.orderId,
    }),
    sendSCCAPI({
      eventType:  'PURCHASE',
      eventId:    order.eventId,
      pageUrl,
      phone:      order.phone,
      scid:       order.scid,
      clientIp:   order.clientIp,
      userAgent:  order.userAgent,
      productIds,
      value:      order.total,
      currency:   'MAD',
      orderId:    order.orderId,
    }),
  ]);

  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      const names = ['Facebook', 'TikTok', 'Snapchat'];
      console.error(`CAPI ${names[i]} error:`, r.reason?.message);
    }
  });
}
```

---

## 5. Route Handler: POST /api/pixels/capi

```typescript
// backend/src/routes/pixels.ts
import { Router, Request, Response } from 'express';
import { sendFBCAPI, sendTTCAPI, sendSCCAPI } from '../services/pixelService';

const router = Router();

router.post('/capi', async (req: Request, res: Response) => {
  const { events, product_id, value, currency, event_id, fbc, fbp, page_url, user_agent } = req.body;
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.ip || '';

  const fires: Promise<void>[] = [];

  if (events.includes('ViewContent') || events.includes('AddToCart') || events.includes('InitiateCheckout')) {
    const fbEvent  = events.includes('InitiateCheckout') ? 'InitiateCheckout' : events.includes('AddToCart') ? 'AddToCart' : 'ViewContent';
    const ttEvent  = events.includes('InitiateCheckout') ? 'InitiateCheckout' : events.includes('AddToCart') ? 'AddToCart' : 'ViewContent';
    const scEvent  = events.includes('InitiateCheckout') ? 'START_CHECKOUT' : events.includes('ADD_CART') ? 'ADD_CART' : 'VIEW_CONTENT';

    fires.push(
      sendFBCAPI({ eventName: fbEvent, eventId: event_id, pageUrl: page_url, fbc, fbp, clientIp, userAgent: user_agent, productIds: [product_id], value, currency: currency || 'MAD' }).catch(() => {}),
      sendTTCAPI({ eventName: ttEvent, eventId: event_id, pageUrl: page_url, clientIp, userAgent: user_agent, contents: [{ id: product_id, name: product_id, price: value, quantity: 1 }], value, currency: currency || 'MAD' }).catch(() => {}),
      sendSCCAPI({ eventType: scEvent, eventId: event_id, pageUrl: page_url, clientIp, userAgent: user_agent, productIds: [product_id], value, currency: currency || 'MAD' }).catch(() => {}),
    );
  }

  await Promise.allSettled(fires);
  res.json({ success: true });
});

export default router;
```

---

## 6. Event Firing Map

| User Action | Web Pixel | CAPI (backend) |
|-------------|-----------|----------------|
| Page load (any) | PageView (all 3) | — |
| Visit product page | ViewContent (all 3) | Via `/api/pixels/capi` |
| Click "Add to cart" | AddToCart (all 3) | Via `/api/pixels/capi` |
| Open checkout popup | InitiateCheckout (all 3) | Via `/api/pixels/capi` |
| Submit order form | Purchase (all 3) | Via `/api/orders` (backend fires CAPI) |

---

## 7. Cookie Helpers (Frontend)

```typescript
// frontend/lib/cookies.ts
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : undefined;
}

export function getTrackingData() {
  return {
    fbc:    getCookie('_fbc'),
    fbp:    getCookie('_fbp'),
    scid:   getCookie('_scid'),
    ttclid: localStorage.getItem('ttclid') ?? undefined,
    utm_source:   localStorage.getItem('utm_source')   ?? undefined,
    utm_medium:   localStorage.getItem('utm_medium')   ?? undefined,
    utm_campaign: localStorage.getItem('utm_campaign') ?? undefined,
  };
}
```

---

## 8. Environment Variables Required

### Frontend
```
NEXT_PUBLIC_FB_PIXEL_ID=      # Meta Pixel ID (numeric)
NEXT_PUBLIC_TT_PIXEL_ID=      # TikTok Pixel ID
NEXT_PUBLIC_SC_PIXEL_ID=      # Snapchat Pixel ID
```

### Backend
```
FB_PIXEL_ID=                  # Same as frontend
FB_ACCESS_TOKEN=              # Meta System User Access Token (from Events Manager)

TT_PIXEL_ID=                  # Same as frontend
TT_ACCESS_TOKEN=              # TikTok Events API Access Token

SC_PIXEL_ID=                  # Same as frontend
SC_ACCESS_TOKEN=              # Snapchat Marketing API token
```

---

## 9. Testing Pixels

### Facebook
- Use Meta Pixel Helper Chrome extension
- Use Events Manager → Test Events tab with Test Event Code
- CAPI: Events Manager → Test Events → Server Events tab

### TikTok
- TikTok Ads Manager → Assets → Events → Web Events → Diagnostics
- Use TikTok Pixel Helper Chrome extension

### Snapchat
- Snap Ads Manager → Assets → Events Manager → Pixel → Debug tab

---

*End of PIXELS.md*
