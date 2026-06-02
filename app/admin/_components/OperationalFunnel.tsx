"use client";

type Stage = { label: string; count: number };

type Props = {
  orders: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  loading?: boolean;
};

function pct(n: number, d: number) {
  if (!d || !Number.isFinite(d)) return 0;
  return n / d;
}

function fmtPct(p: number) {
  return `${(p * 100).toFixed(1)} %`;
}

function fmtInt(n: number) {
  return new Intl.NumberFormat("fr-MA").format(n);
}

export default function OperationalFunnel({
  orders,
  confirmed,
  shipped,
  delivered,
  loading,
}: Props) {
  const stages: Stage[] = [
    { label: "Commandes", count: orders },
    { label: "Confirmées", count: confirmed },
    { label: "Expédiées", count: shipped },
    { label: "Livrées", count: delivered },
  ];

  const max = Math.max(1, orders);

  return (
    <div className="bg-white border border-[#F0E9E1] rounded-2xl p-5 sm:p-6">
      <div className="flex items-end justify-between mb-5">
        <h2 className="font-cormorant text-charcoal text-xl">
          Funnel opérationnel
        </h2>
        <span className="text-[10px] tracking-[0.22em] uppercase text-charcoal/40 font-medium">
          {loading ? "…" : `${fmtInt(orders)} commandes`}
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {stages.map((stage, i) => {
          const widthPct = (stage.count / max) * 100;
          const prev = i > 0 ? stages[i - 1].count : null;
          const conv = prev !== null ? pct(stage.count, prev) : null;
          const dropoff =
            prev !== null && prev > 0 ? 1 - stage.count / prev : null;

          return (
            <li key={stage.label} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[12px] sm:text-[13px] text-charcoal font-medium">
                  {stage.label}
                </span>
                <span className="font-cormorant text-[#810B38] text-lg tabular-nums">
                  {loading ? "—" : fmtInt(stage.count)}
                </span>
              </div>

              <div className="h-2.5 bg-[#F0E9E1] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#810B38] transition-[width] duration-700 ease-out"
                  style={{ width: `${Math.min(100, Math.max(0, widthPct))}%` }}
                />
              </div>

              {conv !== null && (
                <div className="flex items-center justify-between text-[10px] tracking-[0.18em] uppercase font-medium">
                  <span className="text-charcoal/45">
                    Conversion vs étape précédente
                  </span>
                  <span
                    className={
                      conv >= 0.6
                        ? "text-emerald-700"
                        : conv >= 0.3
                          ? "text-amber-700"
                          : "text-rose-700"
                    }
                  >
                    {fmtPct(conv)}
                    {dropoff !== null && dropoff > 0 && (
                      <span className="text-charcoal/40 ml-1">
                        (-{(dropoff * 100).toFixed(0)} %)
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
