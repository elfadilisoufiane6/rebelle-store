// Pro-grade number formatters used across the admin console.
//
// Style targets: Triple Whale / Linear / Vercel — clean tabular nums,
// compact notation for large counts, small currency suffix, thin-space
// percent, and refined delta arrows.

import type { Locale } from "./locale";

const NBSP = " "; // narrow no-break space — typographic thin space

function intlLocale(locale: Locale): string {
  // fr-MA gives correct grouping (`12 345`) for the FR view; en-US for EN.
  return locale === "fr" ? "fr-MA" : "en-US";
}

export function fmtInt(n: number, locale: Locale = "fr"): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(intlLocale(locale), {
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

// Compact: 1.2k, 3.4M — kicks in above 10 000.
export function fmtCompact(n: number, locale: Locale = "fr"): string {
  if (!Number.isFinite(n)) return "—";
  if (Math.abs(n) < 10_000) return fmtInt(n, locale);
  return new Intl.NumberFormat(intlLocale(locale), {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

// Returns { value, suffix } so the UI can render the "DH" smaller than
// the number itself — a common premium-dashboard trick.
export function fmtCurrencyParts(
  n: number,
  locale: Locale = "fr"
): { value: string; suffix: string } {
  if (!Number.isFinite(n)) return { value: "—", suffix: "" };
  const abs = Math.abs(n);
  const compact = abs >= 100_000;
  const value = new Intl.NumberFormat(intlLocale(locale), {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: compact ? 1 : 0,
  }).format(n);
  return { value, suffix: "DH" };
}

export function fmtCurrency(n: number, locale: Locale = "fr"): string {
  const { value, suffix } = fmtCurrencyParts(n, locale);
  return suffix ? `${value}${NBSP}${suffix}` : value;
}

export function fmtPercent(
  ratio: number,
  locale: Locale = "fr",
  digits = 1
): string {
  if (!Number.isFinite(ratio)) return "—";
  const pct = ratio * 100;
  const formatted = new Intl.NumberFormat(intlLocale(locale), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(pct);
  return `${formatted}${NBSP}%`;
}

export function fmtRoas(n: number, locale: Locale = "fr"): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(intlLocale(locale), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n) + "×";
}

// Delta formatter — used by the pill badge. Returns the absolute value
// with the right digit count + a direction flag the caller renders.
export function fmtDelta(
  ratio: number,
  locale: Locale = "fr"
): { text: string; up: boolean } {
  const abs = Math.abs(ratio * 100);
  const digits = abs >= 10 ? 0 : 1;
  const text = new Intl.NumberFormat(intlLocale(locale), {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(abs >= 1000 ? 999 : abs);
  return { text: `${abs >= 1000 ? "999+" : text}${NBSP}%`, up: ratio >= 0 };
}

// Date formatter for tables/modals — same compact shape in both locales
// so cell widths stay stable.
export function fmtDateTime(iso: string, locale: Locale = "fr"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const date = new Intl.DateTimeFormat(intlLocale(locale), {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(d);
  const time = new Intl.DateTimeFormat(intlLocale(locale), {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
  return `${date} ${time}`;
}

export function fmtDateLong(iso: string, locale: Locale = "fr"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}
