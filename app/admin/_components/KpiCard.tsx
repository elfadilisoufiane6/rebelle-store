"use client";

import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useLocale } from "../_lib/locale";
import {
  fmtCompact,
  fmtCurrencyParts,
  fmtDelta,
  fmtPercent,
} from "../_lib/format";

type Format = "int" | "currency" | "percent" | "raw";

type Props = {
  label: string;
  value: number | string;
  delta?: number | null; // ratio, e.g. 0.12 = +12 %
  format?: Format;
  icon?: ReactNode;
  loading?: boolean;
  highlight?: boolean;
  /** Optional micro-caption shown under the delta pill (e.g. "vs. last 30d"). */
  captionOverride?: string;
};

export default function KpiCard({
  label,
  value,
  delta,
  format = "raw",
  icon,
  loading,
  highlight,
  captionOverride,
}: Props) {
  const { t, locale } = useLocale();

  // ── Value rendering — keep the number large, the currency suffix
  //    small (premium dashboard aesthetic).
  let valueNode: ReactNode = "—";
  if (!loading) {
    if (typeof value === "string") {
      valueNode = value;
    } else if (!Number.isFinite(value)) {
      valueNode = "—";
    } else if (format === "currency") {
      const { value: v, suffix } = fmtCurrencyParts(value, locale);
      valueNode = (
        <>
          {v}
          <span
            className={`ml-1.5 text-[0.4em] font-medium tracking-[0.22em] uppercase align-baseline ${
              highlight ? "text-white/65" : "text-charcoal/45"
            }`}
          >
            {suffix}
          </span>
        </>
      );
    } else if (format === "int") {
      valueNode = fmtCompact(value, locale);
    } else if (format === "percent") {
      valueNode = fmtPercent(value, locale, value < 0.1 && value > 0 ? 2 : 1);
    } else {
      valueNode = String(value);
    }
  }

  // ── Delta pill ─────────────────────────────────────────────
  let deltaNode: ReactNode = null;
  if (!loading && delta !== undefined && delta !== null) {
    const { text, up } = fmtDelta(delta, locale);
    const Arrow = up ? ArrowUpRight : ArrowDownRight;
    const tone = highlight
      ? "bg-white/15 text-white/95 border-white/0"
      : up
        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
        : "bg-rose-50 text-rose-700 border-rose-100";
    deltaNode = (
      <span
        className={`inline-flex items-center gap-1 text-[10px] font-semibold tabular-nums tracking-tight px-2 py-0.5 rounded-full border ${tone}`}
      >
        <Arrow size={10} strokeWidth={2.4} />
        {text}
      </span>
    );
  }

  return (
    <div
      className={`group relative rounded-2xl p-4 sm:p-5 border transition-shadow ${
        highlight
          ? "bg-[#810B38] text-white border-[#810B38] shadow-[0_8px_24px_-12px_rgba(129,11,56,0.4)]"
          : "bg-white text-charcoal border-[#F0E9E1] shadow-[0_1px_0_rgba(26,26,26,0.02)] hover:shadow-[0_12px_28px_-16px_rgba(26,26,26,0.12)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={`text-[9px] sm:text-[10px] tracking-[0.24em] uppercase font-semibold ${
            highlight ? "text-white/70" : "text-charcoal/50"
          }`}
        >
          {label}
        </p>
        {icon && (
          <span
            className={`inline-flex items-center justify-center rounded-lg w-7 h-7 transition-colors ${
              highlight
                ? "bg-white/10 text-white/85"
                : "bg-[#FAF6F2] text-[#810B38] group-hover:bg-[#810B38]/8"
            }`}
          >
            {icon}
          </span>
        )}
      </div>

      <p
        className={`font-cormorant font-light tabular-nums mt-3 leading-none tracking-tight ${
          highlight ? "text-white" : "text-charcoal"
        }`}
        style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.6rem)" }}
      >
        {valueNode}
      </p>

      {(deltaNode || captionOverride) && (
        <div className="mt-3 flex items-center gap-2">
          {deltaNode}
          {!loading && (
            <span
              className={`text-[10px] tracking-tight ${
                highlight ? "text-white/55" : "text-charcoal/40"
              }`}
            >
              {captionOverride ?? t("common.vs_prev")}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
