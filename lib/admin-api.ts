// Admin API client. Every call ships the signed session cookie via
// `credentials: 'include'`. The backend rejects unauthenticated calls
// with 401, which our pages translate to a redirect → /admin/login.

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = { raw: text };
  }
  if (!res.ok) {
    const err = body as { error?: string } | null;
    throw Object.assign(new Error(err?.error || `HTTP ${res.status}`), {
      status: res.status,
      body,
    });
  }
  return body as T;
}

// ──────────────────────────────────────────────
// Auth
// ──────────────────────────────────────────────

export type AdminUser = { username: string };

// ──────────────────────────────────────────────
// Metrics
// ──────────────────────────────────────────────

export type MetricsTotals = {
  clicks: number;
  valid_ma_clicks: number;
  orders: number;
  revenue: number;
  conversion_rate: number;
  avg_order_value: number;
  confirmation_rate: number;
  delivery_rate: number;
  cancellation_rate: number;
  pending_orders: number;
  confirmed_orders: number;
  shipped_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  returned_orders: number;
};

// Delta is null when the previous period had a zero baseline.
export type MetricsDeltas = Partial<Record<keyof MetricsTotals, number | null>>;

export type MetricsResponse = {
  success: true;
  range: { from: string; to: string; valid_ma_only: boolean };
  previous_range: { from: string; to: string };
  totals: MetricsTotals;
  previous_totals: MetricsTotals;
  deltas: MetricsDeltas;
  events_by_type: Record<string, number>;
  orders_by_status: Record<string, number>;
  timeseries: Array<{
    date: string;
    clicks: number;
    orders: number;
    revenue: number;
  }>;
  top_products: Array<{
    product_id: string;
    product_name: string;
    qty: number;
    orders: number;
  }>;
};

// ──────────────────────────────────────────────
// Orders
// ──────────────────────────────────────────────

export type AdminOrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type AdminOrder = {
  _id: string;
  order_id: string;
  name: string;
  phone: string;
  phone_normalized?: string;
  city?: string | null;
  items: Array<{
    product_id: string;
    product_name: string;
    product_name_en?: string | null;
    sku?: string | null;
    quantity: number;
    offer?: string | null;
    unit_price: number;
  }>;
  total: number;
  total_with_upsell?: number | null;
  upsell_accepted?: boolean;
  upsell_product_name?: string | null;
  upsell_price?: number | null;
  status: AdminOrderStatus;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  client_ip?: string | null;
  user_agent?: string | null;
  created_at: string;
  updated_at: string;
};

export type OrdersListResponse = {
  success: true;
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  items: AdminOrder[];
};

// ──────────────────────────────────────────────
// Ads (Meta + TikTok)
// ──────────────────────────────────────────────

export type AdsCampaignRow = {
  campaign_id: string;
  campaign_name: string;
  spend: number;
  revenue: number;
  purchases: number;
  impressions: number;
  clicks: number;
  reach: number;
  ctr: number;
  cpm: number;
  cpc: number;
  cpa: number | null;
  roas: number;
};

export type AdsTotals = {
  spend: number;
  revenue: number;
  purchases: number;
  impressions: number;
  clicks: number;
  reach: number;
  ctr: number;
  cpm: number;
  cpc: number;
  cpa: number | null;
  roas: number;
};

export type AdsMetricsResponse = {
  success: boolean;
  configured: boolean;
  error?: string;
  items: AdsCampaignRow[];
  totals: AdsTotals;
};

// ──────────────────────────────────────────────
// AI
// ──────────────────────────────────────────────

export type AICapabilitiesResponse = {
  success: true;
  configured: boolean;
  suggested_prompts: string[];
};

export type AIChatResponse = {
  success: true;
  text: string;
  model: string;
  provider: string;
};

// ──────────────────────────────────────────────
// Client
// ──────────────────────────────────────────────

export const adminApi = {
  login: (username: string, password: string) =>
    request<{ success: true; user: AdminUser }>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  logout: () =>
    request<{ success: true }>("/api/admin/logout", { method: "POST" }),

  me: () => request<{ success: true; user: AdminUser }>("/api/admin/me"),

  metrics: (params: {
    from?: string;
    to?: string;
    validMaOnly?: boolean;
  }) => {
    const qs = new URLSearchParams();
    if (params.from) qs.set("from", params.from);
    if (params.to) qs.set("to", params.to);
    if (params.validMaOnly !== undefined)
      qs.set("validMaOnly", String(params.validMaOnly));
    return request<MetricsResponse>(
      `/api/admin/metrics?${qs.toString()}`
    );
  },

  orders: (params: {
    from?: string;
    to?: string;
    status?: string;
    q?: string;
    page?: number;
    pageSize?: number;
  }) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
    });
    return request<OrdersListResponse>(`/api/admin/orders?${qs.toString()}`);
  },

  order: (id: string) =>
    request<{ success: true; order: AdminOrder }>(`/api/admin/orders/${id}`),

  updateOrderStatus: (id: string, status: AdminOrderStatus) =>
    request<{ success: true; order: AdminOrder }>(
      `/api/admin/orders/${id}/status`,
      { method: "PATCH", body: JSON.stringify({ status }) }
    ),

  deleteOrder: (id: string) =>
    request<{ success: true; deleted: string }>(
      `/api/admin/orders/${id}`,
      { method: "DELETE" }
    ),

  // ──────── AI ────────
  aiCapabilities: () =>
    request<AICapabilitiesResponse>("/api/admin/ai/capabilities"),

  aiChat: (question: string, context?: unknown) =>
    request<AIChatResponse>("/api/admin/ai/chat", {
      method: "POST",
      body: JSON.stringify({ question, context }),
    }),

  // Streaming endpoint URL — caller uses EventSource directly.
  aiStreamUrl: (question: string, context?: unknown) => {
    const qs = new URLSearchParams();
    qs.set("question", question);
    if (context !== undefined) qs.set("context", JSON.stringify(context));
    return `${API_URL}/api/admin/ai/chat/stream?${qs.toString()}`;
  },

  // ──────── Ads ────────
  metaAds: (params: { from?: string; to?: string }) => {
    const qs = new URLSearchParams();
    if (params.from) qs.set("from", params.from);
    if (params.to) qs.set("to", params.to);
    return request<AdsMetricsResponse>(
      `/api/admin/ads/meta/metrics?${qs.toString()}`
    );
  },

  tiktokAds: (params: { from?: string; to?: string }) => {
    const qs = new URLSearchParams();
    if (params.from) qs.set("from", params.from);
    if (params.to) qs.set("to", params.to);
    return request<AdsMetricsResponse>(
      `/api/admin/ads/tiktok/metrics?${qs.toString()}`
    );
  },
};
