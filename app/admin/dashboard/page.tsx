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
import { useLocale } from "../_lib/locale";

const AIChatPanel = lazy(() => import("../_components/AIChatPanel"));

export default function AdminDashboardPage() {
  const { t } = useLocale();
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
  const totals = data?.totals as MetricsTotals | undefined;
  const deltas = data?.deltas || {};

  const conversionPretty = useMemo(
    () =>
      totals
        ? `${(totals.conversion_rate * 100).toFixed(2)} %`
        : t("common.none"),
    [totals, t]
  );

  // For "good" rates we display delta directly; for cancellation we flip
  // the sign so a drop reads as positive in the green-up-arrow heuristic.
  const cancellationDeltaForUi =
    deltas.cancellation_rate == null ? null : -(deltas.cancellation_rate as number);

  return (
    <div className="flex flex-col gap-7">
      {/* Header */}
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
            {t("dashboard.eyebrow")}
          </p>
          <h1 className="font-cormorant font-light text-charcoal text-[2rem] lg:text-[2.5rem] tracking-tight leading-[1.05] mt-1">
            {t("dashboard.title")}
          </h1>
        </div>
        {refreshing && (
          <span className="text-[10px] tracking-[0.22em] uppercase text-charcoal/40 font-medium animate-pulse">
            {t("common.refreshing")}
          </span>
        )}
      </header>

      {/* Controls — refined toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white border border-[#F0E9E1] rounded-2xl px-4 py-3 shadow-[0_1px_0_rgba(26,26,26,0.02)]">
        <DateRangePicker value={range} onChange={setRange} />
        <label className="flex items-center gap-2 sm:ml-auto text-[12px] text-charcoal/70 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={validMaOnly}
            onChange={(e) => setValidMaOnly(e.target.checked)}
            className="accent-[#810B38] w-3.5 h-3.5"
          />
          {t("dashboard.maOnly")}
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
          label={t("kpi.orders")}
          value={totals?.orders ?? 0}
          delta={(deltas.orders as number | undefined) ?? null}
          format="int"
          icon={<ShoppingBag size={14} strokeWidth={1.8} />}
          loading={loading}
          highlight
        />
        <KpiCard
          label={t("kpi.revenue")}
          value={totals?.revenue ?? 0}
          delta={(deltas.revenue as number | undefined) ?? null}
          format="currency"
          icon={<Wallet size={14} strokeWidth={1.8} />}
          loading={loading}
        />
        <KpiCard
          label={t("kpi.aov")}
          value={totals?.avg_order_value ?? 0}
          delta={(deltas.avg_order_value as number | undefined) ?? null}
          format="currency"
          icon={<TrendingUp size={14} strokeWidth={1.8} />}
          loading={loading}
        />
        <KpiCard
          label={t("kpi.confirmation")}
          value={totals?.confirmation_rate ?? 0}
          delta={(deltas.confirmation_rate as number | undefined) ?? null}
          format="percent"
          icon={<CheckCircle2 size={14} strokeWidth={1.8} />}
          loading={loading}
        />
        <KpiCard
          label={t("kpi.delivery")}
          value={totals?.delivery_rate ?? 0}
          delta={(deltas.delivery_rate as number | undefined) ?? null}
          format="percent"
          icon={<Truck size={14} strokeWidth={1.8} />}
          loading={loading}
        />
        <KpiCard
          label={t("kpi.cancellation")}
          value={totals?.cancellation_rate ?? 0}
          delta={cancellationDeltaForUi}
          format="percent"
          icon={<XCircle size={14} strokeWidth={1.8} />}
          loading={loading}
        />
      </div>

      {/* Secondary metric strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <KpiCard
          label={t("kpi.conversion")}
          value={conversionPretty}
          delta={(deltas.conversion_rate as number | undefined) ?? null}
          format="raw"
          loading={loading}
        />
        <KpiCard
          label={t("kpi.clicks")}
          value={totals?.clicks ?? 0}
          delta={(deltas.clicks as number | undefined) ?? null}
          format="int"
          loading={loading}
        />
        <KpiCard
          label={t("kpi.addToCart")}
          value={data?.events_by_type?.add_to_cart ?? 0}
          format="int"
          loading={loading}
        />
      </div>

      {/* Funnel + chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5">
          <OperationalFunnel
            orders={totals?.orders ?? 0}
            confirmed={
              (totals?.confirmed_orders ?? 0) +
              (totals?.shipped_orders ?? 0) +
              (totals?.delivered_orders ?? 0)
            }
            shipped={
              (totals?.shipped_orders ?? 0) + (totals?.delivered_orders ?? 0)
            }
            delivered={totals?.delivered_orders ?? 0}
            loading={loading}
          />
        </div>

        <div className="lg:col-span-7 bg-white border border-[#F0E9E1] rounded-2xl p-5 sm:p-6 shadow-[0_1px_0_rgba(26,26,26,0.02)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[9px] tracking-[0.28em] uppercase text-[#810B38] font-semibold mb-1">
                Trend
              </p>
              <h2 className="font-cormorant text-charcoal text-xl tracking-tight">
                {t("chart.title")}
              </h2>
            </div>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.22em] uppercase text-charcoal/55">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-px bg-[#C4956A] inline-block" />
                {t("chart.clicks")}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#810B38] inline-block" />
                {t("chart.orders")}
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
                  {t("common.loading")}
                </p>
              </div>
            }
          >
            <AIChatPanel context={data} />
          </Suspense>
        </div>

        <div className="lg:col-span-5 bg-white border border-[#F0E9E1] rounded-2xl p-5 sm:p-6 shadow-[0_1px_0_rgba(26,26,26,0.02)]">
          <div className="mb-4">
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#810B38] font-semibold mb-1">
              Best-sellers
            </p>
            <h2 className="font-cormorant text-charcoal text-xl tracking-tight">
              {t("top.title")}
            </h2>
          </div>
          {(data?.top_products?.length ?? 0) === 0 ? (
            <p className="text-[12px] text-charcoal/45">{t("top.empty")}</p>
          ) : (
            <ul className="flex flex-col divide-y divide-[#F0E9E1]">
              {data?.top_products?.map((p, i) => (
                <li
                  key={p.product_id}
                  className="flex items-center gap-3 py-2.5"
                >
                  <span className="font-cormorant text-[#C4956A] text-base w-5 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] text-charcoal truncate flex-1">
                    {p.product_name}
                  </span>
                  <span className="text-[11px] font-medium text-[#810B38] tabular-nums whitespace-nowrap">
                    {p.qty} {t("top.qty")} · {p.orders} {t("top.orders")}
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
