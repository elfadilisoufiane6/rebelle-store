"use client";

import { useState } from "react";

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

type Props = { value: DateRange; onChange: (r: DateRange) => void };

export default function DateRangePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  function pick(preset: DateRange, label: string) {
    onChange(preset);
    setOpen(false);
    setActiveLabel(label);
  }

  const [activeLabel, setActiveLabel] = useState("30 derniers jours");

  return (
    <div className="relative flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2 rounded-full border border-[#E8D5C4] text-[12px] font-medium text-charcoal hover:border-[#810B38] hover:text-[#810B38] transition-colors"
      >
        {activeLabel} ↓
      </button>

      <span className="text-[11px] text-charcoal/55 tabular-nums">
        {value.from} → {value.to}
      </span>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-20 bg-white border border-[#F0E9E1] rounded-2xl shadow-xl p-4 flex flex-col gap-2 min-w-[260px]">
          <button
            onClick={() => pick(presets.today, "Aujourd'hui")}
            className="text-left px-3 py-2 rounded-lg text-[12px] hover:bg-[#FAF6F2]"
          >
            Aujourd&apos;hui
          </button>
          <button
            onClick={() => pick(presets.last7, "7 derniers jours")}
            className="text-left px-3 py-2 rounded-lg text-[12px] hover:bg-[#FAF6F2]"
          >
            7 derniers jours
          </button>
          <button
            onClick={() => pick(presets.last30, "30 derniers jours")}
            className="text-left px-3 py-2 rounded-lg text-[12px] hover:bg-[#FAF6F2]"
          >
            30 derniers jours
          </button>
          <button
            onClick={() => pick(presets.last90, "90 derniers jours")}
            className="text-left px-3 py-2 rounded-lg text-[12px] hover:bg-[#FAF6F2]"
          >
            90 derniers jours
          </button>
          <div className="border-t border-[#F0E9E1] pt-3 mt-1 flex items-end gap-2">
            <label className="flex-1">
              <span className="block text-[9px] tracking-[0.22em] uppercase text-charcoal/55 mb-1">
                Du
              </span>
              <input
                type="date"
                value={value.from}
                onChange={(e) => onChange({ ...value, from: e.target.value })}
                className="w-full border border-[#E8D5C4] rounded-lg px-2 py-1.5 text-[12px]"
              />
            </label>
            <label className="flex-1">
              <span className="block text-[9px] tracking-[0.22em] uppercase text-charcoal/55 mb-1">
                Au
              </span>
              <input
                type="date"
                value={value.to}
                onChange={(e) => onChange({ ...value, to: e.target.value })}
                className="w-full border border-[#E8D5C4] rounded-lg px-2 py-1.5 text-[12px]"
              />
            </label>
          </div>
          <button
            onClick={() => {
              setActiveLabel("Personnalisé");
              setOpen(false);
            }}
            className="mt-2 bg-[#810B38] text-white text-[10px] tracking-[0.22em] uppercase font-semibold py-2 rounded-full hover:bg-[#5c0828]"
          >
            Appliquer
          </button>
        </div>
      )}
    </div>
  );
}
