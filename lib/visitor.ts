// Visitor identification (anonymous, per-browser).
// Persists a UUIDv4 in localStorage so all events from this device
// stitch together server-side. Falls back to in-memory if storage is
// unavailable (incognito + 3rd party storage blocked, very rare).

const STORAGE_KEY = "rebelle_vid";
const SESSION_KEY = "rebelle_sid";

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // RFC4122-ish fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = uuid();
      window.localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return uuid();
  }
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = uuid();
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return uuid();
  }
}

// Pull attribution params out of the URL + cookies the pixels drop.
export function readAttribution() {
  if (typeof window === "undefined") {
    return {} as Record<string, string | undefined>;
  }
  const params = new URLSearchParams(window.location.search);
  const cookies = parseCookies(document.cookie);
  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    fbc: cookies._fbc,
    fbp: cookies._fbp,
    ttclid: params.get("ttclid") || cookies.ttclid,
    scid: params.get("scid") || cookies.scid,
  };
}

function parseCookies(raw: string): Record<string, string> {
  if (!raw) return {};
  return raw.split(/;\s*/).reduce<Record<string, string>>((acc, pair) => {
    const eq = pair.indexOf("=");
    if (eq < 0) return acc;
    acc[pair.slice(0, eq)] = decodeURIComponent(pair.slice(eq + 1));
    return acc;
  }, {});
}
