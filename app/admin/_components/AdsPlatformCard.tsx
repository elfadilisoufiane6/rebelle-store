"use client";

import { ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { AdsMetricsResponse } from "@/lib/admin-api";

type Props = {
  title: string;
  brandColor: string;
  icon: ReactNode;
  data: AdsMetricsResponse | null;
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
};

function fmtCurrency(n: number) {
  return (
    new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(n) +
    " DH"
  );
}
function fmtInt(n: number) {
  return new Intl.NumberFormat("fr-MA").format(Math.round(n));
}
function fmtRoas(n: number) {
  return `${n.toFixed(2)}×`;
}
function fmtPct(n: number) {
  return `${(n * 100).toFixed(2)} %`;
}

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
      <p className="font-cormorant font-light text-[#810B38] text-xl sm:text-2xl tabular-nums mt-1 leading-none">
        {loading ? "—" : value}
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
  const t = data?.totals;
  const items = data?.items ?? [];
  const configured = data?.configured ?? false;

  return (
    <div className="bg-white border border-[#F0E9E1] rounded-2xl overflow-hidden">
      {/* Header — platform-coloured strip */}
      <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 border-b border-[#F0E9E1]">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white"
            style={{ background: brandColor }}
          >
            {icon}
          </span>
          <div>
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
              Ads
            </p>
            <p className="font-cormorant text-charcoal text-base leading-none mt-0.5">
              {title}
            </p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading || refreshing}
          className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase text-charcoal/70 hover:text-[#810B38] disabled:opacity-50"
          aria-label="Rafraîchir"
        >
          <RefreshCw
            size={12}
            className={refreshing ? "animate-spin" : undefined}
          />
          Rafraîchir
        </button>
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-5">
        {!configured && !loading && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12px] text-amber-800">
            <p className="font-semibold mb-1">Plateforme non configurée</p>
            <p>{data?.error || "Définis les variables d'environnement requises."}</p>
          </div>
        )}

        {configured && data?.error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[12px] text-rose-700">
            {data.error}
          </div>
        )}

        {/* Totals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat
            label="Dépense"
            value={fmtCurrency(t?.spend ?? 0)}
            loading={loading}
          />
          <Stat
            label="Revenu"
            value={fmtCurrency(t?.revenue ?? 0)}
            loading={loading}
          />
          <Stat
            label="Achats"
            value={fmtInt(t?.purchases ?? 0)}
            loading={loading}
          />
          <Stat
            label="ROAS"
            value={fmtRoas(t?.roas ?? 0)}
            loading={loading}
          />
          <Stat
            label="CPA"
            value={
              t?.cpa === null || t?.cpa === undefined
                ? "—"
                : fmtCurrency(t.cpa)
            }
            loading={loading}
          />
          <Stat label="CTR" value={fmtPct(t?.ctr ?? 0)} loading={loading} />
          <Stat
            label="CPM"
            value={fmtCurrency(t?.cpm ?? 0)}
            loading={loading}
          />
          <Stat
            label="CPC"
            value={fmtCurrency(t?.cpc ?? 0)}
            loading={loading}
          />
        </div>

        {/* Per-campaign breakdown */}
        {items.length > 0 && (
          <div>
            <p className="text-[9px] tracking-[0.22em] uppercase text-charcoal/50 font-semibold mb-2">
              Campagnes
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="text-left text-[9px] tracking-[0.18em] uppercase text-charcoal/45">
                    <th className="py-2 pr-3 font-semibold">Nom</th>
                    <th className="py-2 pr-3 font-semibold text-right">Dép.</th>
                    <th className="py-2 pr-3 font-semibold text-right">Rev.</th>
                    <th className="py-2 pr-3 font-semibold text-right">ROAS</th>
                    <th className="py-2 font-semibold text-right">CPA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E9E1]">
                  {items.slice(0, 12).map((row) => (
                    <tr key={row.campaign_id}>
                      <td className="py-2 pr-3 text-charcoal truncate max-w-[180px]">
                        {row.campaign_name}
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums text-charcoal/70">
                        {fmtCurrency(row.spend)}
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums text-charcoal/70">
                        {fmtCurrency(row.revenue)}
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
                        {fmtRoas(row.roas)}
                      </td>
                      <td className="py-2 text-right tabular-nums text-charcoal/70">
                        {row.cpa === null ? "—" : fmtCurrency(row.cpa)}
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
