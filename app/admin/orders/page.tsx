"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { adminApi, AdminOrder, OrdersListResponse } from "@/lib/admin-api";
import DateRangePicker, { DateRange, presets } from "../_components/DateRangePicker";
import OrdersTable from "../_components/OrdersTable";
import OrderPreviewModal from "../_components/OrderPreviewModal";
import { useLocale } from "../_lib/locale";

export default function AdminOrdersPage() {
  const { t } = useLocale();
  const [range, setRange] = useState<DateRange>(presets.last30);
  const [status, setStatus] = useState<string>("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);

  const [data, setData] = useState<OrdersListResponse | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<AdminOrder | null>(null);

  const refresh = useCallback(() => {
    let cancelled = false;
    if (data) setRefreshing(true);
    setError(null);
    adminApi
      .orders({
        from: range.from,
        to: range.to,
        status: status || undefined,
        q: query || undefined,
        page,
        pageSize,
      })
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) {
          setInitialLoading(false);
          setRefreshing(false);
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range.from, range.to, status, query, page, pageSize]);

  useEffect(() => {
    const cleanup = refresh();
    return cleanup;
  }, [refresh]);

  async function handleStatusChange(
    orderId: string,
    next: AdminOrder["status"]
  ) {
    try {
      const res = await adminApi.updateOrderStatus(orderId, next);
      setData((d) =>
        d
          ? {
              ...d,
              items: d.items.map((o) =>
                o.order_id === orderId ? res.order : o
              ),
            }
          : d
      );
      if (selected?.order_id === orderId) setSelected(res.order);
    } catch (err) {
      const message = err instanceof Error ? err.message : t("common.error");
      alert(message);
    }
  }

  async function handleDelete(orderId: string) {
    const ok = window.confirm(t("modal.deleteConfirm", { id: orderId }));
    if (!ok) return;
    try {
      await adminApi.deleteOrder(orderId);
      setData((d) =>
        d
          ? {
              ...d,
              total: Math.max(0, d.total - 1),
              items: d.items.filter((o) => o.order_id !== orderId),
            }
          : d
      );
      if (selected?.order_id === orderId) setSelected(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : t("common.error");
      alert(message);
    }
  }

  return (
    <div className="flex flex-col gap-7">
      {/* Header */}
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
            {t("orders.eyebrow")}
          </p>
          <h1 className="font-cormorant font-light text-charcoal text-[2rem] lg:text-[2.5rem] tracking-tight leading-[1.05] mt-1">
            {t("orders.title")}
          </h1>
        </div>
        {refreshing && (
          <span className="text-[10px] tracking-[0.22em] uppercase text-charcoal/40 font-medium animate-pulse">
            {t("common.refreshing")}
          </span>
        )}
      </header>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 bg-white border border-[#F0E9E1] rounded-2xl px-4 py-3 shadow-[0_1px_0_rgba(26,26,26,0.02)]">
        <DateRangePicker
          value={range}
          onChange={(r) => {
            setRange(r);
            setPage(1);
          }}
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded-full border border-[#E8D5C4] bg-white text-[12px] text-charcoal hover:border-[#810B38] focus:border-[#810B38] focus:outline-none transition-colors"
        >
          <option value="">{t("status.all")}</option>
          <option value="pending">{t("status.pending")}</option>
          <option value="confirmed">{t("status.confirmed")}</option>
          <option value="shipped">{t("status.shipped")}</option>
          <option value="delivered">{t("status.delivered")}</option>
          <option value="cancelled">{t("status.cancelled")}</option>
          <option value="returned">{t("status.returned")}</option>
        </select>

        <div className="relative flex-1 lg:ml-auto">
          <Search
            size={13}
            strokeWidth={1.8}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={t("orders.searchPlaceholder")}
            className="w-full pl-9 pr-4 py-2 rounded-full border border-[#E8D5C4] bg-white text-[12px] text-charcoal placeholder:text-charcoal/40 focus:border-[#810B38] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {error && (
        <div className="border border-rose-200 bg-rose-50 rounded-2xl p-4 text-[12px] text-rose-700">
          {error}
        </div>
      )}

      <OrdersTable
        loading={initialLoading}
        items={data?.items || []}
        onRowClick={(o) => setSelected(o)}
        onStatusChange={handleStatusChange}
      />

      {/* Pagination */}
      {data && data.total_pages > 1 && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-[11px] text-charcoal/55 tabular-nums">
            {t("orders.pagination.summary", {
              page: data.page,
              total: data.total_pages,
              count: data.total,
            })}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[#E8D5C4] bg-white text-[11px] font-medium disabled:opacity-40 hover:border-[#810B38] hover:text-[#810B38] transition-colors"
            >
              <ChevronLeft size={12} strokeWidth={2} />
              {t("orders.pagination.prev")}
            </button>
            <button
              onClick={() =>
                setPage((p) => Math.min(data.total_pages, p + 1))
              }
              disabled={page >= data.total_pages}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[#E8D5C4] bg-white text-[11px] font-medium disabled:opacity-40 hover:border-[#810B38] hover:text-[#810B38] transition-colors"
            >
              {t("orders.pagination.next")}
              <ChevronRight size={12} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {selected && (
        <OrderPreviewModal
          order={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
