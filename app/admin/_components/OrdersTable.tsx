"use client";

import { AdminOrder } from "@/lib/admin-api";

type Props = {
  items: AdminOrder[];
  loading?: boolean;
  onRowClick: (o: AdminOrder) => void;
  onStatusChange: (orderId: string, next: AdminOrder["status"]) => void;
};

const STATUS_LABELS: Record<AdminOrder["status"], string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const STATUS_COLORS: Record<AdminOrder["status"], string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-violet-100 text-violet-800 border-violet-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yy} ${hh}:${mi}`;
}

export default function OrdersTable({
  items,
  loading,
  onRowClick,
  onStatusChange,
}: Props) {
  if (loading) {
    return (
      <div className="bg-white border border-[#F0E9E1] rounded-2xl p-10 text-center">
        <p className="text-[10px] tracking-[0.28em] uppercase text-charcoal/40 animate-pulse">
          Chargement…
        </p>
      </div>
    );
  }
  if (items.length === 0) {
    return (
      <div className="bg-white border border-[#F0E9E1] rounded-2xl p-10 text-center">
        <p className="text-[13px] text-charcoal/55">
          Aucune commande sur la période sélectionnée.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#F0E9E1] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[#FAF6F2] text-[9px] tracking-[0.22em] uppercase text-charcoal/55">
              <th className="text-left px-4 py-3 font-semibold">Date</th>
              <th className="text-left px-4 py-3 font-semibold">Order ID</th>
              <th className="text-left px-4 py-3 font-semibold">Client</th>
              <th className="text-left px-4 py-3 font-semibold">Téléphone</th>
              <th className="text-left px-4 py-3 font-semibold">Produits</th>
              <th className="text-right px-4 py-3 font-semibold">Total</th>
              <th className="text-left px-4 py-3 font-semibold">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0E9E1]">
            {items.map((o) => {
              const total = o.total_with_upsell || o.total;
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
                    {formatDateTime(o.created_at)}
                  </td>
                  <td className="px-4 py-3 font-medium text-charcoal whitespace-nowrap">
                    {o.order_id}
                  </td>
                  <td className="px-4 py-3 text-charcoal whitespace-nowrap">
                    {o.name}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70 whitespace-nowrap tabular-nums">
                    {o.phone_normalized || o.phone}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70 max-w-xs truncate">
                    {productSummary}
                  </td>
                  <td className="px-4 py-3 text-right font-cormorant font-light text-[#810B38] text-lg tabular-nums">
                    {total.toLocaleString("fr-MA")} DH
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
                      className={`text-[10px] tracking-wider uppercase font-medium border rounded-full px-2.5 py-1 ${STATUS_COLORS[o.status]} cursor-pointer`}
                    >
                      {(Object.keys(STATUS_LABELS) as AdminOrder["status"][]).map(
                        (s) => (
                          <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </option>
                        )
                      )}
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
