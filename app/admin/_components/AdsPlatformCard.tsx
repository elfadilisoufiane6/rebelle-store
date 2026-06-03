"use client";

import { ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { AdsMetricsResponse } from "@/lib/admin-api";
import { useLocale } from "../_lib/locale";
import {
  fmtCurrency,
  fmtCurrencyParts,
  fmtInt,
  fmtPercent,
  fmtRoas,
} from "../_lib/format";

type Props = {
  title: string;
  brandColor: string;
  icon: ReactNode;
  data: AdsMetricsResponse | null;
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
};

function Stat({
  label,
  value,
  loading,
}: {
  label: string;
  value: string;
  loading?: boolean;
}) {
  return (
    <div>
      <p className="text-[9px] tracking-[0.22em] uppercase text-charcoal/50 font-semibold">
        {label}
      </p>
      <p className="font-cormorant font-light text-charcoal text-[1.5rem] sm:text-[1.7rem] tabular-nums mt-1 leading-none tracking-tight">
        {loading ? "—" : value}
      </p>
    </div>
  );
}

function CurrencyStat({
  label,
  value,
  loading,
  locale,
}: {
  label: string;
  value: number;
  loading?: boolean;
  locale: "fr" | "en";
}) {
  const parts = fmtCurrencyParts(value, locale);
  return (
    <div>
      <p className="text-[9px] tracking-[0.22em] uppercase text-charcoal/50 font-semibold">
        {label}
      </p>
      <p className="font-cormorant font-light text-charcoal text-[1.5rem] sm:text-[1.7rem] tabular-nums mt-1 leading-none tracking-tight">
        {loading ? "—" : (
          <>
            {parts.value}
            <span className="ml-1 text-[0.45em] tracking-[0.22em] uppercase text-charcoal/45 font-medium align-baseline">
              {parts.suffix}
            </span>
          </>
        )}
      </p>
    </div>
  );
}

export default function AdsPlatformCard({
  title,
  brandColor,
  icon,
  data,
  loading,
  refreshing,
  onRefresh,
}: Props) {
  const { t, locale } = useLocale();
  const totals = data?.totals;
  const items = data?.items ?? [];
  const configured = data?.configured ?? false;

  return (
    <div className="bg-white border border-[#F0E9E1] rounded-2xl overflow-hidden shadow-[0_1px_0_rgba(26,26,26,0.02)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-[#F0E9E1]">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.2)]"
            style={{ background: brandColor }}
          >
            {icon}
          </span>
          <div>
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
              {t("ads.eyebrow")}
            </p>
            <p className="font-cormorant text-charcoal text-base leading-none mt-0.5 tracking-tight">
              {title}
            </p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-charcoal/70 hover:text-[#810B38] disabled:opacity-50 font-semibold"
          aria-label={t("common.refresh")}
        >
          <RefreshCw
            size={12}
            className={refreshing ? "animate-spin" : undefined}
          />
          {t("common.refresh")}
        </button>
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-5">
        {!configured && !loading && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] text-amber-800">
            <p className="font-semibold mb-1">{t("ads.notConfigured")}</p>
            <p>{data?.error || t("ads.notConfiguredHint")}</p>
          </div>
        )}

        {configured && data?.error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[12px] text-rose-700">
            {data.error}
          </div>
        )}

        {/* Totals — 4-col grid, premium currency rendering */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <CurrencyStat
            label={t("ads.stat.spend")}
            value={totals?.spend ?? 0}
            loading={loading}
            locale={locale}
          />
          <CurrencyStat
            label={t("ads.stat.revenue")}
            value={totals?.revenue ?? 0}
            loading={loading}
            locale={locale}
          />
          <Stat
            label={t("ads.stat.purchases")}
            value={fmtInt(totals?.purchases ?? 0, locale)}
            loading={loading}
          />
          <Stat
            label={t("ads.stat.roas")}
            value={fmtRoas(totals?.roas ?? 0, locale)}
            loading={loading}
          />
          <CurrencyStat
            label={t("ads.stat.cpa")}
            value={totals?.cpa ?? 0}
            loading={loading || totals?.cpa == null}
            locale={locale}
          />
          <Stat
            label={t("ads.stat.ctr")}
            value={fmtPercent(totals?.ctr ?? 0, locale, 2)}
            loading={loading}
          />
          <CurrencyStat
            label={t("ads.stat.cpm")}
            value={totals?.cpm ?? 0}
            loading={loading}
            locale={locale}
          />
          <CurrencyStat
            label={t("ads.stat.cpc")}
            value={totals?.cpc ?? 0}
            loading={loading}
            locale={locale}
          />
        </div>

        {/* Per-campaign breakdown */}
        {items.length > 0 && (
          <div>
            <p className="text-[9px] tracking-[0.22em] uppercase text-charcoal/50 font-semibold mb-2">
              {t("ads.campaigns")}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-left text-[9px] tracking-[0.18em] uppercase text-charcoal/45">
                    <th className="py-2 pr-3 font-semibold">
                      {t("ads.col.name")}
                    </th>
                    <th className="py-2 pr-3 font-semibold text-right">
                      {t("ads.col.spend")}
                    </th>
                    <th className="py-2 pr-3 font-semibold text-right">
                      {t("ads.col.revenue")}
                    </th>
                    <th className="py-2 pr-3 font-semibold text-right">
                      {t("ads.col.roas")}
                    </th>
                    <th className="py-2 font-semibold text-right">
                      {t("ads.col.cpa")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E9E1]">
                  {items.slice(0, 12).map((row) => (
                    <tr key={row.campaign_id}>
                      <td className="py-2 pr-3 text-charcoal truncate max-w-[180px]">
                        {row.campaign_name}
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums text-charcoal/70">
                        {fmtCurrency(row.spend, locale)}
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums text-charcoal/70">
                        {fmtCurrency(row.revenue, locale)}
                      </td>
                      <td
                        className={`py-2 pr-3 text-right tabular-nums font-medium ${
                          row.roas >= 2
                            ? "text-emerald-700"
                            : row.roas >= 1
                              ? "text-amber-700"
                              : "text-rose-700"
                        }`}
                      >
                        {fmtRoas(row.roas, locale)}
                      </td>
                      <td className="py-2 text-right tabular-nums text-charcoal/70">
                        {row.cpa === null ? "—" : fmtCurrency(row.cpa, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
