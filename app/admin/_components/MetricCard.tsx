"use client";

type Props = {
  label: string;
  value: number | string;
  loading?: boolean;
  highlight?: boolean;
  format?: "int" | "currency" | "raw";
};

export default function MetricCard({
  label,
  value,
  loading,
  highlight,
  format = "raw",
}: Props) {
  const display = (() => {
    if (loading) return "—";
    if (format === "currency") {
      const n = typeof value === "number" ? value : Number(value) || 0;
      return new Intl.NumberFormat("fr-MA", {
        maximumFractionDigits: 0,
      }).format(n) + " DH";
    }
    if (format === "int") {
      const n = typeof value === "number" ? value : Number(value) || 0;
      return new Intl.NumberFormat("fr-MA").format(n);
    }
    return String(value);
  })();

  return (
    <div
      className={`rounded-2xl p-5 border ${
        highlight
          ? "bg-[#810B38] text-white border-[#810B38]"
          : "bg-white text-charcoal border-[#F0E9E1]"
      }`}
    >
      <p
        className={`text-[9px] tracking-[0.22em] uppercase font-semibold ${
          highlight ? "text-white/70" : "text-charcoal/50"
        }`}
      >
        {label}
      </p>
      <p
        className={`font-cormorant font-light tabular-nums mt-2 leading-none ${
          highlight ? "text-white" : "text-[#810B38]"
        }`}
        style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
      >
        {display}
      </p>
    </div>
  );
}
