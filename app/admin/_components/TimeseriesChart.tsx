"use client";

// Lightweight pure-SVG dual-line chart (clicks vs orders by day).
// Avoids pulling in a charting library for one view.

type Point = { date: string; clicks: number; orders: number };

type Props = { data: Point[]; loading?: boolean };

export default function TimeseriesChart({ data, loading }: Props) {
  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-[10px] tracking-[0.28em] uppercase text-charcoal/40 animate-pulse">
          Chargement…
        </p>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-[12px] text-charcoal/45">Aucune donnée sur la période.</p>
      </div>
    );
  }

  const W = 800;
  const H = 240;
  const padL = 30;
  const padR = 12;
  const padT = 10;
  const padB = 24;

  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const maxClicks = Math.max(1, ...data.map((d) => d.clicks));
  const maxOrders = Math.max(1, ...data.map((d) => d.orders));

  const xStep = data.length > 1 ? innerW / (data.length - 1) : 0;

  function pathFor(values: number[], max: number) {
    return values
      .map((v, i) => {
        const x = padL + i * xStep;
        const y = padT + innerH - (v / max) * innerH;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }

  const clicksPath = pathFor(
    data.map((d) => d.clicks),
    maxClicks
  );
  const ordersPath = pathFor(
    data.map((d) => d.orders),
    maxOrders
  );

  // ~4 evenly-spaced x-axis labels
  const ticks: number[] = [];
  const tickCount = Math.min(data.length, 5);
  for (let i = 0; i < tickCount; i++) {
    ticks.push(Math.round((i * (data.length - 1)) / Math.max(1, tickCount - 1)));
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-64"
      preserveAspectRatio="none"
    >
      {/* horizontal grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={padL}
          x2={W - padR}
          y1={padT + innerH * t}
          y2={padT + innerH * t}
          stroke="#F0E9E1"
          strokeWidth={1}
        />
      ))}

      {/* clicks (gold) */}
      <path d={clicksPath} fill="none" stroke="#C4956A" strokeWidth={1.5} />
      {/* orders (burgundy) */}
      <path d={ordersPath} fill="none" stroke="#810B38" strokeWidth={2} />

      {/* x-axis date labels */}
      {ticks.map((idx) => {
        const x = padL + idx * xStep;
        const label = data[idx]?.date?.slice(5) || "";
        return (
          <text
            key={idx}
            x={x}
            y={H - 6}
            textAnchor="middle"
            fontSize={9}
            fill="#1A1A1A"
            opacity={0.45}
            fontFamily="Montserrat, sans-serif"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
