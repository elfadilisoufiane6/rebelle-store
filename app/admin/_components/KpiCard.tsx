"use client";

import { ReactNode } from "react";

type Format = "int" | "currency" | "percent" | "raw";

type Props = {
  label: string;
  value: number | string;
  delta?: number | null; // ratio, e.g. 0.12 = +12 %
  format?: Format;
  icon?: ReactNode;
  loading?: boolean;
  highlight?: boolean;
};

const fmtInt = (n: number) =>
  new Intl.NumberFormat("fr-MA").format(Math.round(n));
const fmtCurrency = (n: number) =>
  new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 0 }).format(n) +
  " DH";
const fmtPercent = (n: number) =>
  `${(n * 100).toFixed(n < 0.1 && n > 0 ? 1 : 1)} %`;

function formatValue(value: number | string, format: Format): string {
  if (typeof value === "string") return value;
  if (!Number.isFinite(value)) return "—";
  if (format === "currency") return fmtCurrency(value);
  if (format === "int") return fmtInt(value);
  if (format === "percent") return fmtPercent(value);
  return String(value);
}

export default function KpiCard({
  label,
  value,
  delta,
  format = "raw",
  icon,
  loading,
  highlight,
}: Props) {
  const display = loading ? "—" : formatValue(value, format);

  // Direction: positive = up. For cancellation/return rates the caller
  // can simply not pass delta (or invert it upstream).
  let deltaNode: ReactNode = null;
  if (!loading && delta !== undefined && delta !== null) {
    const pct = Math.abs(delta * 100);
    const up = delta >= 0;
    const arrow = up ? "▲" : "▼";
    const color = up ? "text-emerald-600" : "text-rose-600";
    deltaNode = (
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-medium tabular-nums ${
          highlight ? "text-white/90" : color
        }`}
      >
        <span>{arrow}</span>
        <span>
          {pct >= 1000 ? "999+" : pct.toFixed(pct >= 10 ? 0 : 1)} %
        </span>
      </span>
    );
  }

  return (
    <div
      className={`relative rounded-2xl p-4 sm:p-5 border ${
        highlight
          ? "bg-[#810B38] text-white border-[#810B38]"
          : "bg-white text-charcoal border-[#F0E9E1]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={`text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-semibold ${
            highlight ? "text-white/70" : "text-charcoal/50"
          }`}
        >
          {label}
        </p>
        {icon && (
          <span
            className={`inline-flex items-center justify-center rounded-lg w-7 h-7 ${
              highlight
                ? "bg-white/10 text-white/85"
                : "bg-[#FAF6F2] text-[#810B38]"
            }`}
          >
            {icon}
          </span>
        )}
      </div>

      <p
        className={`font-cormorant font-light tabular-nums mt-2 leading-none ${
          highlight ? "text-white" : "text-[#810B38]"
        }`}
        style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)" }}
      >
        {display}
      </p>

      {deltaNode && <div className="mt-2.5">{deltaNode}</div>}
    </div>
  );
}
