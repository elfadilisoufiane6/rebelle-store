"use client";

import { useEffect } from "react";
import { X, Phone, MapPin, ShoppingBag, Tag, Receipt, Trash2 } from "lucide-react";
import { AdminOrder } from "@/lib/admin-api";

type Props = {
  order: AdminOrder;
  onClose: () => void;
  onStatusChange: (orderId: string, next: AdminOrder["status"]) => void;
  onDelete?: (orderId: string) => void;
};

const STATUS_LABELS: Record<AdminOrder["status"], string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} à ${hh}:${mi}`;
}

export default function OrderPreviewModal({
  order,
  onClose,
  onStatusChange,
  onDelete,
}: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const total = order.total_with_upsell || order.total;
  const phone = order.phone_normalized || order.phone;
  const whatsappLink = `https://wa.me/${phone.replace(/^\+/, "")}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl"
      >
        {/* Header — burgundy */}
        <div className="bg-[#810B38] text-white px-6 sm:px-8 py-6 rounded-t-3xl flex items-start justify-between">
          <div>
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/70 font-semibold">
              Aperçu commande
            </p>
            <p className="font-cormorant font-light text-2xl mt-1">
              {order.order_id}
            </p>
            <p className="text-[11px] text-white/65 mt-1 tabular-nums">
              {formatDateTime(order.created_at)}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="text-white/70 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-6 sm:px-8 py-6 flex flex-col gap-6">
          {/* Status row */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-[0.22em] uppercase text-charcoal/55 font-semibold">
              Statut
            </span>
            <select
              value={order.status}
              onChange={(e) =>
                onStatusChange(
                  order.order_id,
                  e.target.value as AdminOrder["status"]
                )
              }
              className="text-[12px] font-medium border border-[#E8D5C4] rounded-full px-3 py-1.5 bg-white"
            >
              {(Object.keys(STATUS_LABELS) as AdminOrder["status"][]).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          {/* Customer */}
          <section>
            <h3 className="text-[9px] tracking-[0.22em] uppercase text-[#810B38] font-semibold mb-3">
              Cliente
            </h3>
            <div className="bg-[#FAF6F2] rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-charcoal/45">
                  Nom
                </p>
                <p className="text-[14px] text-charcoal mt-0.5">{order.name}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-charcoal/45">
                  Téléphone
                </p>
                <p className="text-[14px] text-charcoal mt-0.5 tabular-nums">
                  {phone}
                </p>
              </div>
              {order.city && (
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-charcoal/45">
                    Ville
                  </p>
                  <p className="text-[14px] text-charcoal mt-0.5">{order.city}</p>
                </div>
              )}
              <div className="sm:col-span-2 flex gap-2 mt-1">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white text-[11px] tracking-wider uppercase font-semibold px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors"
                >
                  <Phone size={12} />
                  WhatsApp
                </a>
                <a
                  href={`tel:+${phone}`}
                  className="inline-flex items-center gap-2 border border-[#810B38] text-[#810B38] text-[11px] tracking-wider uppercase font-semibold px-4 py-2 rounded-full hover:bg-[#810B38] hover:text-white transition-colors"
                >
                  <Phone size={12} />
                  Appeler
                </a>
              </div>
            </div>
          </section>

          {/* Items */}
          <section>
            <h3 className="text-[9px] tracking-[0.22em] uppercase text-[#810B38] font-semibold mb-3">
              Articles
            </h3>
            <ul className="divide-y divide-[#F0E9E1] border border-[#F0E9E1] rounded-2xl overflow-hidden">
              {order.items.map((it, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-[#FAF6F2]"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#FAF6F2] border border-[#E8D5C4] flex items-center justify-center text-[#810B38]">
                    <ShoppingBag size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-cormorant text-charcoal text-base leading-tight">
                      {it.product_name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-charcoal/55 uppercase tracking-wider">
                      {it.sku && (
                        <span className="inline-flex items-center gap-1">
                          <Tag size={10} /> {it.sku}
                        </span>
                      )}
                      {it.offer && <span>· {it.offer}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-charcoal/55 tabular-nums">
                      ×{it.quantity}
                    </p>
                    <p className="font-medium text-[#810B38] tabular-nums">
                      {it.unit_price.toLocaleString("fr-MA")} DH
                    </p>
                  </div>
                </li>
              ))}
              {order.upsell_accepted && order.upsell_product_name && (
                <li className="flex items-center gap-4 px-4 py-3 bg-amber-50/40">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                    <Receipt size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-cormorant text-charcoal text-base leading-tight">
                      {order.upsell_product_name}
                    </p>
                    <p className="text-[10px] text-amber-700 uppercase tracking-wider mt-0.5">
                      Upsell post-checkout
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-charcoal/55 tabular-nums">×1</p>
                    <p className="font-medium text-[#810B38] tabular-nums">
                      {(order.upsell_price || 0).toLocaleString("fr-MA")} DH
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </section>

          {/* Attribution */}
          {(order.utm_source || order.utm_campaign || order.client_ip) && (
            <section>
              <h3 className="text-[9px] tracking-[0.22em] uppercase text-[#810B38] font-semibold mb-3">
                Attribution
              </h3>
              <div className="bg-[#FAF6F2] rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-[12px]">
                {order.utm_source && (
                  <Cell label="Source" value={order.utm_source} />
                )}
                {order.utm_medium && (
                  <Cell label="Medium" value={order.utm_medium} />
                )}
                {order.utm_campaign && (
                  <Cell label="Campaign" value={order.utm_campaign} />
                )}
                {order.client_ip && (
                  <Cell label="IP" value={order.client_ip} />
                )}
              </div>
            </section>
          )}

          {/* Totals */}
          <section className="border-t border-[#F0E9E1] pt-5 flex justify-between items-end">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-charcoal/55">
              <MapPin size={12} className="text-[#810B38]" />
              Maroc · Paiement à la livraison
            </div>
            <div className="text-right">
              <p className="text-[9px] tracking-[0.22em] uppercase text-charcoal/55">
                Total
              </p>
              <p className="font-cormorant font-light text-[#810B38] text-3xl tabular-nums leading-none mt-1">
                {total.toLocaleString("fr-MA")} DH
              </p>
            </div>
          </section>

          {/* Danger zone — only renders when parent passes a delete handler */}
          {onDelete && (
            <section className="border-t border-[#F0E9E1] pt-4">
              <button
                onClick={() => onDelete(order.order_id)}
                className="inline-flex items-center gap-2 text-red-700 hover:text-white hover:bg-red-700 border border-red-200 hover:border-red-700 text-[11px] tracking-wider uppercase font-medium px-4 py-2 rounded-full transition-colors"
              >
                <Trash2 size={12} />
                Supprimer la commande
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] tracking-[0.18em] uppercase text-charcoal/45">
        {label}
      </p>
      <p className="text-[12px] text-charcoal mt-0.5 break-all">{value}</p>
    </div>
  );
}
