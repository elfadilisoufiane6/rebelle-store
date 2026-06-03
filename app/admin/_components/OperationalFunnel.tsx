"use client";

import { useLocale } from "../_lib/locale";
import { fmtInt, fmtPercent } from "../_lib/format";

type Stage = { labelKey: string; count: number };

type Props = {
  orders: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  loading?: boolean;
};

function ratio(n: number, d: number) {
  if (!d || !Number.isFinite(d)) return 0;
  return n / d;
}

export default function OperationalFunnel({
  orders,
  confirmed,
  shipped,
  delivered,
  loading,
}: Props) {
  const { t, locale } = useLocale();

  const stages: Stage[] = [
    { labelKey: "funnel.orders", count: orders },
    { labelKey: "funnel.confirmed", count: confirmed },
    { labelKey: "funnel.shipped", count: shipped },
    { labelKey: "funnel.delivered", count: delivered },
  ];

  const max = Math.max(1, orders);

  return (
    <div className="bg-white border border-[#F0E9E1] rounded-2xl p-5 sm:p-6 shadow-[0_1px_0_rgba(26,26,26,0.02)] h-full">
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[9px] tracking-[0.28em] uppercase text-[#810B38] font-semibold mb-1">
            Funnel
          </p>
          <h2 className="font-cormorant text-charcoal text-xl tracking-tight">
            {t("funnel.title")}
          </h2>
        </div>
        <span className="text-[10px] tracking-[0.22em] uppercase text-charcoal/40 font-medium">
          {loading ? "…" : `${fmtInt(orders, locale)} ${t("funnel.orders").toLowerCase()}`}
        </span>
      </div>

      <ul className="flex flex-col gap-4">
        {stages.map((stage, i) => {
          const widthPct = (stage.count / max) * 100;
          const prev = i > 0 ? stages[i - 1].count : null;
          const conv = prev !== null ? ratio(stage.count, prev) : null;
          const dropoff =
            prev !== null && prev > 0 ? 1 - stage.count / prev : null;

          // Gradient gets slightly lighter as we move down the funnel —
          // visually hints at compounding loss.
          const gradients = [
            "linear-gradient(90deg,#810B38,#9d1045)",
            "linear-gradient(90deg,#810B38,#a51947)",
            "linear-gradient(90deg,#9d1045,#b8265b)",
            "linear-gradient(90deg,#a51947,#C4956A)",
          ];

          return (
            <li key={stage.labelKey} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12.5px] text-charcoal font-medium">
                  {t(stage.labelKey)}
                </span>
                <span className="font-cormorant text-charcoal text-[1.25rem] tabular-nums tracking-tight">
                  {loading ? "—" : fmtInt(stage.count, locale)}
                </span>
              </div>

              <div className="h-2 bg-[#F0E9E1] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    width: `${Math.min(100, Math.max(0, widthPct))}%`,
                    background: gradients[i],
                  }}
                />
              </div>

              {conv !== null && (
                <div className="flex items-center justify-between text-[10px] tracking-[0.16em] uppercase font-medium">
                  <span className="text-charcoal/45">{t("funnel.conv")}</span>
                  <span
                    className={`tabular-nums ${
                      conv >= 0.6
                        ? "text-emerald-700"
                        : conv >= 0.3
                          ? "text-amber-700"
                          : "text-rose-700"
                    }`}
                  >
                    {fmtPercent(conv, locale, 1)}
                    {dropoff !== null && dropoff > 0 && (
                      <span className="text-charcoal/35 ml-1 normal-case tracking-normal">
                        (−{(dropoff * 100).toFixed(0)} %)
                      </span>
                    )}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
