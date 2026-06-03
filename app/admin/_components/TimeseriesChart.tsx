"use client";

// Lightweight pure-SVG dual-line chart (clicks vs orders by day).
// Avoids pulling in a charting library for one view.

import { useLocale } from "../_lib/locale";

type Point = { date: string; clicks: number; orders: number };

type Props = { data: Point[]; loading?: boolean };

export default function TimeseriesChart({ data, loading }: Props) {
  const { t } = useLocale();

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-[10px] tracking-[0.28em] uppercase text-charcoal/40 animate-pulse">
          {t("common.loading")}
        </p>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-[12px] text-charcoal/45">{t("chart.empty")}</p>
      </div>
    );
  }

  const W = 800;
  const H = 240;
  const padL = 32;
  const padR = 16;
  const padT = 12;
  const padB = 28;

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

  function areaFor(values: number[], max: number) {
    if (values.length === 0) return "";
    const top = values
      .map((v, i) => {
        const x = padL + i * xStep;
        const y = padT + innerH - (v / max) * innerH;
        return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
    const last = padL + (values.length - 1) * xStep;
    const baseY = padT + innerH;
    return `${top} L${last.toFixed(2)},${baseY} L${padL},${baseY} Z`;
  }

  const clicksPath = pathFor(
    data.map((d) => d.clicks),
    maxClicks
  );
  const ordersPath = pathFor(
    data.map((d) => d.orders),
    maxOrders
  );
  const ordersArea = areaFor(
    data.map((d) => d.orders),
    maxOrders
  );

  // ~5 evenly-spaced x-axis labels
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
      <defs>
        <linearGradient id="ordersFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#810B38" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#810B38" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* horizontal grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((tk) => (
        <line
          key={tk}
          x1={padL}
          x2={W - padR}
          y1={padT + innerH * tk}
          y2={padT + innerH * tk}
          stroke="#F0E9E1"
          strokeWidth={1}
        />
      ))}

      {/* orders area + line (burgundy) */}
      <path d={ordersArea} fill="url(#ordersFill)" />
      <path
        d={ordersPath}
        fill="none"
        stroke="#810B38"
        strokeWidth={2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* clicks (gold) */}
      <path
        d={clicksPath}
        fill="none"
        stroke="#C4956A"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />

      {/* x-axis date labels */}
      {ticks.map((idx) => {
        const x = padL + idx * xStep;
        const label = data[idx]?.date?.slice(5) || "";
        return (
          <text
            key={idx}
            x={x}
            y={H - 8}
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
