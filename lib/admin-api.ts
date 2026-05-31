// Thin admin API client. All requests carry the admin session cookie
// via credentials: 'include'. Backend rejects unauthenticated calls
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

export type AdminUser = { username: string };

export type MetricsResponse = {
  success: true;
  range: { from: string; to: string; valid_ma_only: boolean };
  totals: {
    clicks: number;
    valid_ma_clicks: number;
    orders: number;
    revenue: number;
    conversion_rate: number;
    avg_order_value: number;
  };
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
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
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
    return request<MetricsResponse>(`/api/admin/metrics?${qs.toString()}`);
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

  updateOrderStatus: (id: string, status: AdminOrder["status"]) =>
    request<{ success: true; order: AdminOrder }>(
      `/api/admin/orders/${id}/status`,
      { method: "PATCH", body: JSON.stringify({ status }) }
    ),
};
