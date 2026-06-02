"use client";

import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import {
  ShoppingBag,
  Wallet,
  TrendingUp,
  CheckCircle2,
  Truck,
  XCircle,
} from "lucide-react";
import {
  adminApi,
  MetricsResponse,
  MetricsTotals,
} from "@/lib/admin-api";
import DateRangePicker, {
  DateRange,
  presets,
} from "../_components/DateRangePicker";
import KpiCard from "../_components/KpiCard";
import OperationalFunnel from "../_components/OperationalFunnel";
import TimeseriesChart from "../_components/TimeseriesChart";

// Lazy-load the AI panel — it ships an EventSource client + heavy
// state hooks that aren't needed before the dashboard paints.
const AIChatPanel = lazy(() => import("../_components/AIChatPanel"));

export default function AdminDashboardPage() {
  const [range, setRange] = useState<DateRange>(presets.last30);
  const [validMaOnly, setValidMaOnly] = useState(true);
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (data) setRefreshing(true);
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
        if (!cancelled) {
          setInitialLoading(false);
          setRefreshing(false);
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range.from, range.to, validMaOnly]);

  const loading = initialLoading;
  const t = data?.totals as MetricsTotals | undefined;
  const d = data?.deltas || {};

  const conv = useMemo(
    () => (t ? (t.conversion_rate * 100).toFixed(2) + " %" : "—"),
    [t]
  );

  // Deltas for the rates: for "good" rates we display delta directly;
  // for cancellation we flip the sign so a drop reads as positive in
  // the green-up-arrow heuristic the KpiCard uses.
  const cancellationDeltaForUi =
    d.cancellation_rate == null ? null : -(d.cancellation_rate as number);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-end justify-between gap-4 mb-2">
        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
            Tableau de bord
          </p>
          <h1 className="font-cormorant font-light text-charcoal text-3xl lg:text-4xl">
            Performance commerce.
          </h1>
        </div>
        {refreshing && (
          <span className="text-[10px] tracking-[0.22em] uppercase text-charcoal/40 font-medium animate-pulse">
            actualisation…
          </span>
        )}
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white border border-[#F0E9E1] rounded-2xl p-4">
        <DateRangePicker value={range} onChange={setRange} />
        <label className="flex items-center gap-2 sm:ml-auto text-[12px] text-charcoal/70 cursor-pointer">
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
        <div className="border border-rose-200 bg-rose-50 rounded-2xl p-4 text-[12px] text-rose-700">
          {error}
        </div>
      )}

      {/* 6 executive KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <KpiCard
          label="Commandes"
          value={t?.orders ?? 0}
          delta={(d.orders as number | undefined) ?? null}
          format="int"
          icon={<ShoppingBag size={14} />}
          loading={loading}
          highlight
        />
        <KpiCard
          label="Revenu"
          value={t?.revenue ?? 0}
          delta={(d.revenue as number | undefined) ?? null}
          format="currency"
          icon={<Wallet size={14} />}
          loading={loading}
        />
        <KpiCard
          label="AOV"
          value={t?.avg_order_value ?? 0}
          delta={(d.avg_order_value as number | undefined) ?? null}
          format="currency"
          icon={<TrendingUp size={14} />}
          loading={loading}
        />
        <KpiCard
          label="Taux de confirmation"
          value={t?.confirmation_rate ?? 0}
          delta={(d.confirmation_rate as number | undefined) ?? null}
          format="percent"
          icon={<CheckCircle2 size={14} />}
          loading={loading}
        />
        <KpiCard
          label="Taux de livraison"
          value={t?.delivery_rate ?? 0}
          delta={(d.delivery_rate as number | undefined) ?? null}
          format="percent"
          icon={<Truck size={14} />}
          loading={loading}
        />
        <KpiCard
          label="Taux d'annulation"
          value={t?.cancellation_rate ?? 0}
          delta={cancellationDeltaForUi}
          format="percent"
          icon={<XCircle size={14} />}
          loading={loading}
        />
      </div>

      {/* Conversion rate as a secondary metric strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <KpiCard
          label="Taux de conversion"
          value={conv}
          delta={(d.conversion_rate as number | undefined) ?? null}
          format="raw"
          loading={loading}
        />
        <KpiCard
          label="Clics totaux"
          value={t?.clicks ?? 0}
          delta={(d.clicks as number | undefined) ?? null}
          format="int"
          loading={loading}
        />
        <KpiCard
          label="Add to cart"
          value={data?.events_by_type?.add_to_cart ?? 0}
          format="int"
          loading={loading}
        />
      </div>

      {/* Funnel + chart side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <OperationalFunnel
            orders={t?.orders ?? 0}
            confirmed={
              (t?.confirmed_orders ?? 0) +
              (t?.shipped_orders ?? 0) +
              (t?.delivered_orders ?? 0)
            }
            shipped={(t?.shipped_orders ?? 0) + (t?.delivered_orders ?? 0)}
            delivered={t?.delivered_orders ?? 0}
            loading={loading}
          />
        </div>

        <div className="lg:col-span-7 bg-white border border-[#F0E9E1] rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-cormorant text-charcoal text-xl">
              Clics & commandes par jour
            </h2>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.22em] uppercase text-charcoal/55">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C4956A]" />
                Clics
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#810B38]" />
                Commandes
              </span>
            </div>
          </div>
          <TimeseriesChart data={data?.timeseries || []} loading={loading} />
        </div>
      </div>

      {/* AI panel + top products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7">
          <Suspense
            fallback={
              <div className="bg-white border border-[#F0E9E1] rounded-2xl h-[520px] flex items-center justify-center">
                <p className="text-[10px] tracking-[0.28em] uppercase text-charcoal/40 animate-pulse">
                  Chargement assistant…
                </p>
              </div>
            }
          >
            <AIChatPanel context={data} />
          </Suspense>
        </div>

        <div className="lg:col-span-5 bg-white border border-[#F0E9E1] rounded-2xl p-5 sm:p-6">
          <h2 className="font-cormorant text-charcoal text-xl mb-4">
            Top produits
          </h2>
          {(data?.top_products?.length ?? 0) === 0 ? (
            <p className="text-[12px] text-charcoal/45">
              Aucune commande sur la période.
            </p>
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
