"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { useLocale } from "../_lib/locale";

export type DateRange = { from: string; to: string };

function isoDay(d: Date) {
  return d.toISOString().slice(0, 10);
}

function shift(days: number): DateRange {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - (days - 1));
  from.setHours(0, 0, 0, 0);
  to.setHours(23, 59, 59, 999);
  return { from: isoDay(from), to: isoDay(to) };
}

export const presets = {
  today: shift(1),
  last7: shift(7),
  last30: shift(30),
  last90: shift(90),
};

const PRESETS: Array<{ key: keyof typeof presets; labelKey: string }> = [
  { key: "today", labelKey: "range.today" },
  { key: "last7", labelKey: "range.last7" },
  { key: "last30", labelKey: "range.last30" },
  { key: "last90", labelKey: "range.last90" },
];

type Props = { value: DateRange; onChange: (r: DateRange) => void };

export default function DateRangePicker({ value, onChange }: Props) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<keyof typeof presets | "custom">(
    "last30"
  );
  const popRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (popRef.current && !popRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  function pick(key: keyof typeof presets) {
    onChange(presets[key]);
    setActiveKey(key);
    setOpen(false);
  }

  const triggerLabel =
    activeKey === "custom" ? t("range.custom") : t(`range.${activeKey}`);

  return (
    <div className="relative inline-flex items-center gap-3" ref={popRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#E8D5C4] bg-white text-[12px] font-medium text-charcoal hover:border-[#810B38] hover:text-[#810B38] transition-colors"
      >
        <Calendar size={13} strokeWidth={1.8} />
        {triggerLabel}
        <ChevronDown
          size={13}
          strokeWidth={1.8}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <span className="hidden sm:inline text-[11px] text-charcoal/50 tabular-nums">
        {value.from} → {value.to}
      </span>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-30 bg-white border border-[#F0E9E1] rounded-2xl shadow-[0_24px_64px_-16px_rgba(26,26,26,0.18)] p-3 flex flex-col min-w-[280px]">
          <div className="flex flex-col gap-0.5">
            {PRESETS.map(({ key, labelKey }) => (
              <button
                key={key}
                onClick={() => pick(key)}
                className={`text-left px-3 py-2 rounded-lg text-[12.5px] transition-colors ${
                  activeKey === key
                    ? "bg-[#FAF6F2] text-[#810B38] font-medium"
                    : "text-charcoal hover:bg-[#FAF6F2]"
                }`}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>

          <div className="border-t border-[#F0E9E1] pt-3 mt-2 flex items-end gap-2">
            <label className="flex-1">
              <span className="block text-[9px] tracking-[0.22em] uppercase text-charcoal/55 mb-1 font-semibold">
                {t("range.from")}
              </span>
              <input
                type="date"
                value={value.from}
                onChange={(e) => {
                  onChange({ ...value, from: e.target.value });
                  setActiveKey("custom");
                }}
                className="w-full border border-[#E8D5C4] rounded-lg px-2 py-1.5 text-[12px] focus:border-[#810B38] focus:outline-none"
              />
            </label>
            <label className="flex-1">
              <span className="block text-[9px] tracking-[0.22em] uppercase text-charcoal/55 mb-1 font-semibold">
                {t("range.to")}
              </span>
              <input
                type="date"
                value={value.to}
                onChange={(e) => {
                  onChange({ ...value, to: e.target.value });
                  setActiveKey("custom");
                }}
                className="w-full border border-[#E8D5C4] rounded-lg px-2 py-1.5 text-[12px] focus:border-[#810B38] focus:outline-none"
              />
            </label>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="mt-3 bg-[#810B38] text-white text-[10px] tracking-[0.22em] uppercase font-semibold py-2 rounded-full hover:bg-[#5c0828] transition-colors"
          >
            {t("common.apply")}
          </button>
        </div>
      )}
    </div>
  );
}
