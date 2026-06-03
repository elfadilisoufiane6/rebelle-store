"use client";

import { AdminOrder } from "@/lib/admin-api";
import { useLocale } from "../_lib/locale";
import { fmtCurrencyParts, fmtDateTime } from "../_lib/format";

type Props = {
  items: AdminOrder[];
  loading?: boolean;
  onRowClick: (o: AdminOrder) => void;
  onStatusChange: (orderId: string, next: AdminOrder["status"]) => void;
};

const STATUS_TONES: Record<AdminOrder["status"], string> = {
  pending: "bg-amber-50 text-amber-800 border-amber-200",
  confirmed: "bg-sky-50 text-sky-800 border-sky-200",
  shipped: "bg-violet-50 text-violet-800 border-violet-200",
  delivered: "bg-emerald-50 text-emerald-800 border-emerald-200",
  cancelled: "bg-rose-50 text-rose-800 border-rose-200",
  returned: "bg-stone-100 text-stone-800 border-stone-300",
};

const STATUS_KEYS: AdminOrder["status"][] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
];

export default function OrdersTable({
  items,
  loading,
  onRowClick,
  onStatusChange,
}: Props) {
  const { t, locale } = useLocale();

  if (loading) {
    return (
      <div className="bg-white border border-[#F0E9E1] rounded-2xl p-10 text-center shadow-[0_1px_0_rgba(26,26,26,0.02)]">
        <p className="text-[10px] tracking-[0.28em] uppercase text-charcoal/40 animate-pulse">
          {t("common.loading")}
        </p>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="bg-white border border-[#F0E9E1] rounded-2xl p-10 text-center shadow-[0_1px_0_rgba(26,26,26,0.02)]">
        <p className="text-[13px] text-charcoal/55">{t("orders.empty")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#F0E9E1] rounded-2xl overflow-hidden shadow-[0_1px_0_rgba(26,26,26,0.02)]">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[#FAF6F2] text-[9px] tracking-[0.22em] uppercase text-charcoal/55">
              <th className="text-left px-4 py-3 font-semibold">
                {t("orders.col.date")}
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                {t("orders.col.id")}
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                {t("orders.col.client")}
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                {t("orders.col.phone")}
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                {t("orders.col.items")}
              </th>
              <th className="text-right px-4 py-3 font-semibold">
                {t("orders.col.total")}
              </th>
              <th className="text-left px-4 py-3 font-semibold">
                {t("orders.col.status")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0E9E1]">
            {items.map((o) => {
              const total = o.total_with_upsell || o.total;
              const totalParts = fmtCurrencyParts(total, locale);
              const productSummary = o.items
                .map((it) => `${it.quantity}× ${it.product_name}`)
                .join(", ");
              return (
                <tr
                  key={o.order_id}
                  onClick={() => onRowClick(o)}
                  className="hover:bg-[#FAF6F2] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-charcoal/70 whitespace-nowrap tabular-nums">
                    {fmtDateTime(o.created_at, locale)}
                  </td>
                  <td className="px-4 py-3 font-medium text-charcoal whitespace-nowrap tabular-nums">
                    {o.order_id}
                  </td>
                  <td className="px-4 py-3 text-charcoal whitespace-nowrap">
                    {o.name}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70 whitespace-nowrap tabular-nums">
                    {o.phone_normalized || o.phone}
                  </td>
                  <td className="px-4 py-3 text-charcoal/65 max-w-xs truncate">
                    {productSummary}
                  </td>
                  <td className="px-4 py-3 text-right font-cormorant font-light text-charcoal text-[1.15rem] tabular-nums tracking-tight whitespace-nowrap">
                    {totalParts.value}
                    <span className="ml-1 text-[0.55em] tracking-[0.22em] uppercase text-charcoal/45 font-medium">
                      {totalParts.suffix}
                    </span>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={o.status}
                      onChange={(e) =>
                        onStatusChange(
                          o.order_id,
                          e.target.value as AdminOrder["status"]
                        )
                      }
                      className={`text-[10px] tracking-wider uppercase font-medium border rounded-full px-2.5 py-1 cursor-pointer ${STATUS_TONES[o.status]}`}
                    >
                      {STATUS_KEYS.map((s) => (
                        <option key={s} value={s}>
                          {t(`status.${s}`)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
