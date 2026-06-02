"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi, AdsMetricsResponse } from "@/lib/admin-api";
import DateRangePicker, {
  DateRange,
  presets,
} from "../_components/DateRangePicker";
import AdsPlatformCard from "../_components/AdsPlatformCard";

// Inline SVG marks so the page has no extra image deps
function MetaMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.3 5.7c-1.6-1.6-3.7-2.5-6-2.5-3 0-5.5 1.5-7 4-1.5-2.5-4-4-7-4-1.8 0-3.4.6-4.7 1.7-.5.4-.5 1.2 0 1.6.4.4 1 .4 1.4 0C-1 5.7 0 5.3 1.3 5.3c2.5 0 4.5 2 4.5 4.5v8.5c0 .7.6 1.2 1.2 1.2.7 0 1.3-.5 1.3-1.2v-8.5c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5v8.5c0 .7.6 1.2 1.3 1.2.6 0 1.2-.5 1.2-1.2v-8.5c0-2.5 2-4.5 4.5-4.5z" />
    </svg>
  );
}
function TikTokMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.6 7.5c-1.4-.3-2.8-1.2-3.6-2.4-.4-.6-.7-1.3-.8-2.1V3h-2.8v11.5c0 1.5-1.2 2.7-2.7 2.7s-2.8-1.2-2.8-2.7 1.2-2.8 2.8-2.8h.6V8.8h-.6c-3.1 0-5.6 2.5-5.6 5.6S6.6 20 9.8 20s5.6-2.5 5.6-5.6V8.7c1 .8 2.3 1.3 3.6 1.5h.6V7.5h-.6z" />
    </svg>
  );
}

export default function AdminAdsPage() {
  const [range, setRange] = useState<DateRange>(presets.last30);
  const [meta, setMeta] = useState<AdsMetricsResponse | null>(null);
  const [tiktok, setTiktok] = useState<AdsMetricsResponse | null>(null);

  const [metaLoading, setMetaLoading] = useState(true);
  const [tiktokLoading, setTiktokLoading] = useState(true);
  const [metaRefreshing, setMetaRefreshing] = useState(false);
  const [tiktokRefreshing, setTiktokRefreshing] = useState(false);

  const loadMeta = useCallback(
    async (silent = false) => {
      if (silent) setMetaRefreshing(true);
      else setMetaLoading(true);
      try {
        const res = await adminApi.metaAds({
          from: range.from,
          to: range.to,
        });
        setMeta(res);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Erreur";
        setMeta({
          success: false,
          configured: false,
          error: msg,
          items: [],
          totals: {
            spend: 0,
            revenue: 0,
            purchases: 0,
            impressions: 0,
            clicks: 0,
            reach: 0,
            ctr: 0,
            cpm: 0,
            cpc: 0,
            cpa: null,
            roas: 0,
          },
        });
      } finally {
        setMetaLoading(false);
        setMetaRefreshing(false);
      }
    },
    [range.from, range.to]
  );

  const loadTiktok = useCallback(
    async (silent = false) => {
      if (silent) setTiktokRefreshing(true);
      else setTiktokLoading(true);
      try {
        const res = await adminApi.tiktokAds({
          from: range.from,
          to: range.to,
        });
        setTiktok(res);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Erreur";
        setTiktok({
          success: false,
          configured: false,
          error: msg,
          items: [],
          totals: {
            spend: 0,
            revenue: 0,
            purchases: 0,
            impressions: 0,
            clicks: 0,
            reach: 0,
            ctr: 0,
            cpm: 0,
            cpc: 0,
            cpa: null,
            roas: 0,
          },
        });
      } finally {
        setTiktokLoading(false);
        setTiktokRefreshing(false);
      }
    },
    [range.from, range.to]
  );

  useEffect(() => {
    loadMeta();
    loadTiktok();
  }, [loadMeta, loadTiktok]);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1 mb-2">
        <p className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
          Ads Intelligence
        </p>
        <h1 className="font-cormorant font-light text-charcoal text-3xl lg:text-4xl">
          Performance publicitaire.
        </h1>
      </header>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white border border-[#F0E9E1] rounded-2xl p-4">
        <DateRangePicker
          value={range}
          onChange={(r) => {
            setRange(r);
            // initial load (not silent) on range change so users see
            // the skeleton — they're switching periods, not refreshing
          }}
        />
      </div>

      <AdsPlatformCard
        title="Meta Ads"
        brandColor="#1877F2"
        icon={<MetaMark />}
        data={meta}
        loading={metaLoading}
        refreshing={metaRefreshing}
        onRefresh={() => loadMeta(true)}
      />

      <AdsPlatformCard
        title="TikTok Ads"
        brandColor="#000000"
        icon={<TikTokMark />}
        data={tiktok}
        loading={tiktokLoading}
        refreshing={tiktokRefreshing}
        onRefresh={() => loadTiktok(true)}
      />
    </div>
  );
}
