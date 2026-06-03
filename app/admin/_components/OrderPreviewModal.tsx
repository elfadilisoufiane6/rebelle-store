"use client";

import { useEffect } from "react";
import {
  X,
  Phone,
  MapPin,
  ShoppingBag,
  Tag,
  Receipt,
  Trash2,
} from "lucide-react";
import { AdminOrder } from "@/lib/admin-api";
import { useLocale } from "../_lib/locale";
import { fmtCurrencyParts, fmtDateLong } from "../_lib/format";

type Props = {
  order: AdminOrder;
  onClose: () => void;
  onStatusChange: (orderId: string, next: AdminOrder["status"]) => void;
  onDelete?: (orderId: string) => void;
};

const STATUS_KEYS: AdminOrder["status"][] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "returned",
];

export default function OrderPreviewModal({
  order,
  onClose,
  onStatusChange,
  onDelete,
}: Props) {
  const { t, locale } = useLocale();

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
  const totalParts = fmtCurrencyParts(total, locale);
  const phone = order.phone_normalized || order.phone;
  const whatsappLink = `https://wa.me/${phone.replace(/^\+/, "")}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex sm:items-center sm:justify-center sm:p-6 overscroll-contain"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[90vh] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Sticky header — burgundy */}
        <div className="bg-[#810B38] text-white px-5 sm:px-8 py-5 sm:py-6 flex items-start justify-between flex-shrink-0 sm:rounded-t-3xl">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] tracking-[0.28em] uppercase text-white/70 font-semibold">
              {t("modal.eyebrow")}
            </p>
            <p className="font-cormorant font-light text-xl sm:text-2xl mt-1 truncate tabular-nums tracking-tight">
              {order.order_id}
            </p>
            <p className="text-[11px] text-white/65 mt-1 tabular-nums">
              {fmtDateLong(order.created_at, locale)}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={t("common.close")}
            className="text-white/70 hover:text-white flex-shrink-0 ml-3 -mr-1 p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-5 sm:px-8 py-5 sm:py-6 flex flex-col gap-6 overflow-y-auto flex-1">
          {/* Status row */}
          <div className="flex items-center gap-3">
            <span className="text-[9px] tracking-[0.22em] uppercase text-charcoal/55 font-semibold">
              {t("modal.status")}
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
              {STATUS_KEYS.map((s) => (
                <option key={s} value={s}>
                  {t(`status.${s}`)}
                </option>
              ))}
            </select>
          </div>

          {/* Customer */}
          <section>
            <h3 className="text-[9px] tracking-[0.22em] uppercase text-[#810B38] font-semibold mb-3">
              {t("modal.customer")}
            </h3>
            <div className="bg-[#FAF6F2] rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label={t("modal.name")} value={order.name} />
              <Field label={t("modal.phone")} value={phone} mono />
              {order.city && (
                <Field label={t("modal.city")} value={order.city} />
              )}
              <div className="sm:col-span-2 flex gap-2 mt-1">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white text-[11px] tracking-wider uppercase font-semibold px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors"
                >
                  <Phone size={12} />
                  {t("modal.whatsapp")}
                </a>
                <a
                  href={`tel:+${phone}`}
                  className="inline-flex items-center gap-2 border border-[#810B38] text-[#810B38] text-[11px] tracking-wider uppercase font-semibold px-4 py-2 rounded-full hover:bg-[#810B38] hover:text-white transition-colors"
                >
                  <Phone size={12} />
                  {t("modal.call")}
                </a>
              </div>
            </div>
          </section>

          {/* Items */}
          <section>
            <h3 className="text-[9px] tracking-[0.22em] uppercase text-[#810B38] font-semibold mb-3">
              {t("modal.items")}
            </h3>
            <ul className="divide-y divide-[#F0E9E1] border border-[#F0E9E1] rounded-2xl overflow-hidden">
              {order.items.map((it, i) => {
                const unitParts = fmtCurrencyParts(it.unit_price, locale);
                return (
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
                      <p className="font-medium text-charcoal tabular-nums">
                        {unitParts.value}
                        <span className="ml-1 text-[0.7em] tracking-[0.18em] uppercase text-charcoal/50 font-medium">
                          {unitParts.suffix}
                        </span>
                      </p>
                    </div>
                  </li>
                );
              })}
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
                      {t("modal.upsell")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-charcoal/55 tabular-nums">
                      ×1
                    </p>
                    {(() => {
                      const up = fmtCurrencyParts(
                        order.upsell_price || 0,
                        locale
                      );
                      return (
                        <p className="font-medium text-charcoal tabular-nums">
                          {up.value}
                          <span className="ml-1 text-[0.7em] tracking-[0.18em] uppercase text-charcoal/50 font-medium">
                            {up.suffix}
                          </span>
                        </p>
                      );
                    })()}
                  </div>
                </li>
              )}
            </ul>
          </section>

          {/* Attribution */}
          {(order.utm_source || order.utm_campaign || order.client_ip) && (
            <section>
              <h3 className="text-[9px] tracking-[0.22em] uppercase text-[#810B38] font-semibold mb-3">
                {t("modal.attribution")}
              </h3>
              <div className="bg-[#FAF6F2] rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-[12px]">
                {order.utm_source && (
                  <Cell label={t("modal.source")} value={order.utm_source} />
                )}
                {order.utm_medium && (
                  <Cell label={t("modal.medium")} value={order.utm_medium} />
                )}
                {order.utm_campaign && (
                  <Cell
                    label={t("modal.campaign")}
                    value={order.utm_campaign}
                  />
                )}
                {order.client_ip && (
                  <Cell label={t("modal.ip")} value={order.client_ip} />
                )}
              </div>
            </section>
          )}

          {/* Totals */}
          <section className="border-t border-[#F0E9E1] pt-5 flex justify-between items-end">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-charcoal/55">
              <MapPin size={12} className="text-[#810B38]" />
              {t("modal.footer")}
            </div>
            <div className="text-right">
              <p className="text-[9px] tracking-[0.22em] uppercase text-charcoal/55">
                {t("modal.total")}
              </p>
              <p className="font-cormorant font-light text-charcoal text-[2rem] tabular-nums leading-none mt-1 tracking-tight">
                {totalParts.value}
                <span className="ml-1.5 text-[0.4em] tracking-[0.22em] uppercase text-charcoal/45 font-medium align-baseline">
                  {totalParts.suffix}
                </span>
              </p>
            </div>
          </section>

          {/* Danger zone */}
          {onDelete && (
            <section className="border-t border-[#F0E9E1] pt-4">
              <button
                onClick={() => onDelete(order.order_id)}
                className="inline-flex items-center gap-2 text-rose-700 hover:text-white hover:bg-rose-700 border border-rose-200 hover:border-rose-700 text-[11px] tracking-wider uppercase font-medium px-4 py-2 rounded-full transition-colors"
              >
                <Trash2 size={12} />
                {t("modal.deleteOrder")}
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.18em] uppercase text-charcoal/45 font-semibold">
        {label}
      </p>
      <p
        className={`text-[14px] text-charcoal mt-0.5 ${mono ? "tabular-nums" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] tracking-[0.18em] uppercase text-charcoal/45 font-semibold">
        {label}
      </p>
      <p className="text-[12px] text-charcoal mt-0.5 break-all">{value}</p>
    </div>
  );
}
