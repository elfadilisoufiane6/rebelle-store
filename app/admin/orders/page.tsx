"use client";

import { useEffect, useState, useCallback } from "react";
import { adminApi, AdminOrder, OrdersListResponse } from "@/lib/admin-api";
import DateRangePicker, { DateRange, presets } from "../_components/DateRangePicker";
import OrdersTable from "../_components/OrdersTable";
import OrderPreviewModal from "../_components/OrderPreviewModal";

export default function AdminOrdersPage() {
  const [range, setRange] = useState<DateRange>(presets.last30);
  const [status, setStatus] = useState<string>("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);

  const [data, setData] = useState<OrdersListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<AdminOrder | null>(null);

  const refresh = useCallback(() => {
    let cancelled = false;
    setLoading(true);
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
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
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
      const message = err instanceof Error ? err.message : "Update failed";
      alert(message);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1 mb-2">
        <p className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
          Commandes
        </p>
        <h1 className="font-cormorant font-light text-charcoal text-3xl lg:text-4xl">
          Toutes les commandes.
        </h1>
      </header>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 bg-white border border-[#F0E9E1] rounded-2xl p-4">
        <DateRangePicker value={range} onChange={(r) => { setRange(r); setPage(1); }} />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded-full border border-[#E8D5C4] text-[12px] text-charcoal bg-white"
        >
          <option value="">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmées</option>
          <option value="shipped">Expédiées</option>
          <option value="delivered">Livrées</option>
          <option value="cancelled">Annulées</option>
        </select>
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Recherche (ID, nom, téléphone)"
          className="flex-1 lg:ml-auto px-4 py-2 rounded-full border border-[#E8D5C4] text-[12px] text-charcoal focus:border-[#810B38] focus:outline-none"
        />
      </div>

      {error && (
        <div className="border border-red-200 bg-red-50 rounded-2xl p-4 text-[12px] text-red-700">
          {error}
        </div>
      )}

      <OrdersTable
        loading={loading}
        items={data?.items || []}
        onRowClick={(o) => setSelected(o)}
        onStatusChange={handleStatusChange}
      />

      {/* Pagination */}
      {data && data.total_pages > 1 && (
        <div className="flex items-center justify-between mt-2">
          <p className="text-[11px] text-charcoal/55 tabular-nums">
            Page {data.page} sur {data.total_pages} · {data.total} commandes
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 rounded-full border border-[#E8D5C4] text-[11px] disabled:opacity-40 hover:border-[#810B38] hover:text-[#810B38]"
            >
              ← Précédent
            </button>
            <button
              onClick={() =>
                setPage((p) => Math.min(data.total_pages, p + 1))
              }
              disabled={page >= data.total_pages}
              className="px-3 py-1.5 rounded-full border border-[#E8D5C4] text-[11px] disabled:opacity-40 hover:border-[#810B38] hover:text-[#810B38]"
            >
              Suivant →
            </button>
          </div>
        </div>
      )}

      {selected && (
        <OrderPreviewModal
          order={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
