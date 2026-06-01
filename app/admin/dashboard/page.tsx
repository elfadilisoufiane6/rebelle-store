"use client";

import { useEffect, useMemo, useState } from "react";
import { adminApi, MetricsResponse } from "@/lib/admin-api";
import DateRangePicker, { DateRange, presets } from "../_components/DateRangePicker";
import MetricCard from "../_components/MetricCard";
import TimeseriesChart from "../_components/TimeseriesChart";

export default function AdminDashboardPage() {
  const [range, setRange] = useState<DateRange>(presets.last30);
  const [validMaOnly, setValidMaOnly] = useState(true);
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    adminApi
      .metrics({ from: range.from, to: range.to, validMaOnly })
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
  }, [range.from, range.to, validMaOnly]);

  const t = data?.totals;
  const conv = useMemo(
    () => (t ? (t.conversion_rate * 100).toFixed(2) + " %" : "—"),
    [t]
  );

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1 mb-2">
        <p className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
          Tableau de bord
        </p>
        <h1 className="font-cormorant font-light text-charcoal text-3xl lg:text-4xl">
          Performance commerce.
        </h1>
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white border border-[#F0E9E1] rounded-2xl p-4">
        <DateRangePicker value={range} onChange={setRange} />
        <label className="flex items-center gap-2 ml-auto text-[12px] text-charcoal/70 cursor-pointer">
          <input
            type="checkbox"
            checked={validMaOnly}
            onChange={(e) => setValidMaOnly(e.target.checked)}
            className="accent-[#810B38]"
          />
          MA valide uniquement (non-VPN)
        </label>
      </div>

      {error && (
        <div className="border border-red-200 bg-red-50 rounded-2xl p-4 text-[12px] text-red-700">
          {error}
        </div>
      )}

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Clics totaux"
          value={t?.clicks ?? 0}
          loading={loading}
          format="int"
          highlight
        />
        <MetricCard
          label="Commandes"
          value={t?.orders ?? 0}
          loading={loading}
          format="int"
        />
        <MetricCard
          label="Taux de conversion"
          value={conv}
          loading={loading}
          format="raw"
          highlight
        />
        <MetricCard
          label="Revenu"
          value={t?.revenue ?? 0}
          loading={loading}
          format="currency"
        />
        <MetricCard
          label="Panier moyen"
          value={t?.avg_order_value ?? 0}
          loading={loading}
          format="currency"
        />
        <MetricCard
          label="Add to cart"
          value={data?.events_by_type?.add_to_cart ?? 0}
          loading={loading}
          format="int"
        />
        <MetricCard
          label="Checkout démarrés"
          value={data?.events_by_type?.checkout_started ?? 0}
          loading={loading}
          format="int"
        />
      </div>

      {/* Chart */}
      <div className="bg-white border border-[#F0E9E1] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-cormorant text-charcoal text-xl">
            Clics & commandes par jour
          </h2>
          <div className="flex items-center gap-4 text-[10px] tracking-[0.22em] uppercase text-charcoal/55">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C4956A]" /> Clics
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#810B38]" /> Commandes
            </span>
          </div>
        </div>
        <TimeseriesChart data={data?.timeseries || []} loading={loading} />
      </div>

      {/* Two-column: status breakdown + top products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-[#F0E9E1] rounded-2xl p-6">
          <h2 className="font-cormorant text-charcoal text-xl mb-4">
            Commandes par statut
          </h2>
          <StatusBreakdown
            data={data?.orders_by_status || {}}
            total={t?.orders ?? 0}
          />
        </div>
        <div className="bg-white border border-[#F0E9E1] rounded-2xl p-6">
          <h2 className="font-cormorant text-charcoal text-xl mb-4">
            Top produits
          </h2>
          {(data?.top_products?.length ?? 0) === 0 ? (
            <p className="text-[12px] text-charcoal/45">Aucune commande sur la période.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-[#F0E9E1]">
              {data?.top_products?.map((p) => (
                <li
                  key={p.product_id}
                  className="flex items-center justify-between py-2.5"
                >
                  <span className="text-[13px] text-charcoal truncate pr-3">
                    {p.product_name}
                  </span>
                  <span className="text-[12px] font-medium text-[#810B38] tabular-nums whitespace-nowrap">
                    {p.qty} pcs · {p.orders} cmd
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBreakdown({
  data,
  total,
}: {
  data: Record<string, number>;
  total: number;
}) {
  const order = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
  const labels: Record<string, string> = {
    pending: "En attente",
    confirmed: "Confirmées",
    shipped: "Expédiées",
    delivered: "Livrées",
    cancelled: "Annulées",
  };
  const colors: Record<string, string> = {
    pending: "#FBBF24",
    confirmed: "#3B82F6",
    shipped: "#8B5CF6",
    delivered: "#16A34A",
    cancelled: "#DC2626",
  };

  return (
    <ul className="flex flex-col gap-3">
      {order.map((s) => {
        const count = data[s] || 0;
        const pct = total > 0 ? (count / total) * 100 : 0;
        return (
          <li key={s} className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: colors[s] }}
            />
            <span className="text-[13px] text-charcoal w-28">{labels[s]}</span>
            <div className="flex-1 h-1.5 bg-[#F0E9E1] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: colors[s] }}
              />
            </div>
            <span className="text-[12px] tabular-nums text-charcoal/70 w-14 text-right">
              {count}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
