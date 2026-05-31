"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getVisitorId, getSessionId, readAttribution } from "@/lib/visitor";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Fires a single pageview event per route change. Mounted once from
// the root layout — re-runs whenever the pathname (or search) changes
// because Next.js doesn't unmount the layout between route transitions.
export default function ClickTracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  const lastKey = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = `${pathname}?${search?.toString() || ""}`;
    if (lastKey.current === key) return;
    lastKey.current = key;

    const payload = {
      event_type: "pageview" as const,
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      path: pathname,
      referrer: document.referrer || null,
      ...readAttribution(),
    };

    // Best-effort, never blocks UI
    fetch(`${API_URL}/api/track/click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }, [pathname, search]);

  return null;
}
