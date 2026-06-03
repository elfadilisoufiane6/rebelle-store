"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// ─────────────────────────────────────────────
// Admin-scoped i18n. The public store stays
// French-only — only pages under /admin read this
// context. Persisted to localStorage so reloads
// keep the user's chosen language.
// ─────────────────────────────────────────────

export type Locale = "fr" | "en";

type Dict = Record<string, string>;

const FR: Dict = {
  // common
  "common.loading": "Chargement…",
  "common.refreshing": "actualisation…",
  "common.error": "Erreur",
  "common.logout": "Se déconnecter",
  "common.apply": "Appliquer",
  "common.cancel": "Annuler",
  "common.close": "Fermer",
  "common.delete": "Supprimer",
  "common.search": "Rechercher",
  "common.refresh": "Rafraîchir",
  "common.vs_prev": "vs. période précédente",
  "common.none": "—",
  "common.maison": "Maison Rebelle",
  "common.console": "Console admin",
  "common.language": "Langue",
  "common.account": "Compte",

  // nav
  "nav.dashboard": "Tableau de bord",
  "nav.orders": "Commandes",
  "nav.ads": "Ads Intelligence",

  // dashboard
  "dashboard.eyebrow": "Tableau de bord",
  "dashboard.title": "Performance commerce.",
  "dashboard.maOnly": "MA valide uniquement (non-VPN)",
  "kpi.orders": "Commandes",
  "kpi.revenue": "Revenu",
  "kpi.aov": "Panier moyen",
  "kpi.confirmation": "Taux de confirmation",
  "kpi.delivery": "Taux de livraison",
  "kpi.cancellation": "Taux d'annulation",
  "kpi.conversion": "Taux de conversion",
  "kpi.clicks": "Clics totaux",
  "kpi.addToCart": "Ajouts au panier",
  "funnel.title": "Funnel opérationnel",
  "funnel.orders": "Commandes",
  "funnel.confirmed": "Confirmées",
  "funnel.shipped": "Expédiées",
  "funnel.delivered": "Livrées",
  "funnel.conv": "Conv. vs étape précédente",
  "chart.title": "Clics & commandes par jour",
  "chart.clicks": "Clics",
  "chart.orders": "Commandes",
  "chart.empty": "Aucune donnée sur la période.",
  "top.title": "Top produits",
  "top.empty": "Aucune commande sur la période.",
  "top.qty": "pcs",
  "top.orders": "cmd",

  // orders
  "orders.eyebrow": "Commandes",
  "orders.title": "Toutes les commandes.",
  "orders.searchPlaceholder": "Rechercher (ID, nom, téléphone)",
  "orders.empty": "Aucune commande sur la période sélectionnée.",
  "orders.col.date": "Date",
  "orders.col.id": "Order ID",
  "orders.col.client": "Cliente",
  "orders.col.phone": "Téléphone",
  "orders.col.items": "Articles",
  "orders.col.total": "Total",
  "orders.col.status": "Statut",
  "orders.pagination.prev": "Précédent",
  "orders.pagination.next": "Suivant",
  "orders.pagination.summary": "Page {page} sur {total} · {count} commandes",
  "status.all": "Tous les statuts",
  "status.pending": "En attente",
  "status.confirmed": "Confirmée",
  "status.shipped": "Expédiée",
  "status.delivered": "Livrée",
  "status.cancelled": "Annulée",
  "status.returned": "Retournée",

  // order modal
  "modal.eyebrow": "Aperçu commande",
  "modal.status": "Statut",
  "modal.customer": "Cliente",
  "modal.name": "Nom",
  "modal.phone": "Téléphone",
  "modal.city": "Ville",
  "modal.whatsapp": "WhatsApp",
  "modal.call": "Appeler",
  "modal.items": "Articles",
  "modal.upsell": "Upsell post-checkout",
  "modal.attribution": "Attribution",
  "modal.source": "Source",
  "modal.medium": "Medium",
  "modal.campaign": "Campagne",
  "modal.ip": "IP",
  "modal.total": "Total",
  "modal.footer": "Maroc · Paiement à la livraison",
  "modal.deleteOrder": "Supprimer la commande",
  "modal.deleteConfirm":
    "Supprimer définitivement la commande {id} ?\n\nCette action est irréversible.",

  // ads
  "ads.eyebrow": "Ads Intelligence",
  "ads.title": "Performance publicitaire.",
  "ads.stat.spend": "Dépense",
  "ads.stat.revenue": "Revenu",
  "ads.stat.purchases": "Achats",
  "ads.stat.roas": "ROAS",
  "ads.stat.cpa": "CPA",
  "ads.stat.ctr": "CTR",
  "ads.stat.cpm": "CPM",
  "ads.stat.cpc": "CPC",
  "ads.campaigns": "Campagnes",
  "ads.col.name": "Nom",
  "ads.col.spend": "Dép.",
  "ads.col.revenue": "Rev.",
  "ads.col.roas": "ROAS",
  "ads.col.cpa": "CPA",
  "ads.notConfigured": "Plateforme non configurée",
  "ads.notConfiguredHint":
    "Définis les variables d'environnement requises.",

  // AI
  "ai.eyebrow": "Assistant",
  "ai.title": "Analyste maison.",
  "ai.notConfigured": "Non configuré",
  "ai.placeholder": "Pose ta question…",
  "ai.disabled":
    "Définis ANTHROPIC_API_KEY pour activer l'assistant",
  "ai.intro":
    "Pose une question sur le store, les commandes ou demande des copies pub. L'assistant lit les chiffres du dashboard pour répondre.",
  "ai.connError": "Erreur de connexion à l'assistant",
  "ai.send": "Envoyer",

  // date range
  "range.today": "Aujourd'hui",
  "range.last7": "7 derniers jours",
  "range.last30": "30 derniers jours",
  "range.last90": "90 derniers jours",
  "range.custom": "Personnalisé",
  "range.from": "Du",
  "range.to": "Au",

  // login
  "login.title": "Console admin.",
  "login.username": "Identifiant",
  "login.password": "Mot de passe",
  "login.submit": "Se connecter",
  "login.submitting": "Connexion…",
  "login.footer": "Accès réservé · session 7 jours",
};

const EN: Dict = {
  // common
  "common.loading": "Loading…",
  "common.refreshing": "refreshing…",
  "common.error": "Error",
  "common.logout": "Sign out",
  "common.apply": "Apply",
  "common.cancel": "Cancel",
  "common.close": "Close",
  "common.delete": "Delete",
  "common.search": "Search",
  "common.refresh": "Refresh",
  "common.vs_prev": "vs. previous period",
  "common.none": "—",
  "common.maison": "Maison Rebelle",
  "common.console": "Admin console",
  "common.language": "Language",
  "common.account": "Account",

  // nav
  "nav.dashboard": "Dashboard",
  "nav.orders": "Orders",
  "nav.ads": "Ads intelligence",

  // dashboard
  "dashboard.eyebrow": "Dashboard",
  "dashboard.title": "Commerce performance.",
  "dashboard.maOnly": "Valid MA only (non-VPN)",
  "kpi.orders": "Orders",
  "kpi.revenue": "Revenue",
  "kpi.aov": "Avg. order value",
  "kpi.confirmation": "Confirmation rate",
  "kpi.delivery": "Delivery rate",
  "kpi.cancellation": "Cancellation rate",
  "kpi.conversion": "Conversion rate",
  "kpi.clicks": "Total clicks",
  "kpi.addToCart": "Add to cart",
  "funnel.title": "Operational funnel",
  "funnel.orders": "Orders",
  "funnel.confirmed": "Confirmed",
  "funnel.shipped": "Shipped",
  "funnel.delivered": "Delivered",
  "funnel.conv": "Conv. vs previous step",
  "chart.title": "Clicks & orders per day",
  "chart.clicks": "Clicks",
  "chart.orders": "Orders",
  "chart.empty": "No data for the selected period.",
  "top.title": "Top products",
  "top.empty": "No orders for the selected period.",
  "top.qty": "pcs",
  "top.orders": "ord",

  // orders
  "orders.eyebrow": "Orders",
  "orders.title": "All orders.",
  "orders.searchPlaceholder": "Search (ID, name, phone)",
  "orders.empty": "No orders for the selected period.",
  "orders.col.date": "Date",
  "orders.col.id": "Order ID",
  "orders.col.client": "Customer",
  "orders.col.phone": "Phone",
  "orders.col.items": "Items",
  "orders.col.total": "Total",
  "orders.col.status": "Status",
  "orders.pagination.prev": "Previous",
  "orders.pagination.next": "Next",
  "orders.pagination.summary": "Page {page} of {total} · {count} orders",
  "status.all": "All statuses",
  "status.pending": "Pending",
  "status.confirmed": "Confirmed",
  "status.shipped": "Shipped",
  "status.delivered": "Delivered",
  "status.cancelled": "Cancelled",
  "status.returned": "Returned",

  // order modal
  "modal.eyebrow": "Order preview",
  "modal.status": "Status",
  "modal.customer": "Customer",
  "modal.name": "Name",
  "modal.phone": "Phone",
  "modal.city": "City",
  "modal.whatsapp": "WhatsApp",
  "modal.call": "Call",
  "modal.items": "Items",
  "modal.upsell": "Post-checkout upsell",
  "modal.attribution": "Attribution",
  "modal.source": "Source",
  "modal.medium": "Medium",
  "modal.campaign": "Campaign",
  "modal.ip": "IP",
  "modal.total": "Total",
  "modal.footer": "Morocco · Cash on delivery",
  "modal.deleteOrder": "Delete this order",
  "modal.deleteConfirm":
    "Permanently delete order {id}?\n\nThis action cannot be undone.",

  // ads
  "ads.eyebrow": "Ads intelligence",
  "ads.title": "Ad performance.",
  "ads.stat.spend": "Spend",
  "ads.stat.revenue": "Revenue",
  "ads.stat.purchases": "Purchases",
  "ads.stat.roas": "ROAS",
  "ads.stat.cpa": "CPA",
  "ads.stat.ctr": "CTR",
  "ads.stat.cpm": "CPM",
  "ads.stat.cpc": "CPC",
  "ads.campaigns": "Campaigns",
  "ads.col.name": "Name",
  "ads.col.spend": "Spend",
  "ads.col.revenue": "Rev.",
  "ads.col.roas": "ROAS",
  "ads.col.cpa": "CPA",
  "ads.notConfigured": "Platform not configured",
  "ads.notConfiguredHint": "Set the required environment variables.",

  // AI
  "ai.eyebrow": "Assistant",
  "ai.title": "House analyst.",
  "ai.notConfigured": "Not configured",
  "ai.placeholder": "Ask a question…",
  "ai.disabled": "Set ANTHROPIC_API_KEY to enable the assistant",
  "ai.intro":
    "Ask about the store, your orders or request ad copy. The assistant reads the dashboard numbers to answer.",
  "ai.connError": "Connection error",
  "ai.send": "Send",

  // date range
  "range.today": "Today",
  "range.last7": "Last 7 days",
  "range.last30": "Last 30 days",
  "range.last90": "Last 90 days",
  "range.custom": "Custom",
  "range.from": "From",
  "range.to": "To",

  // login
  "login.title": "Admin console.",
  "login.username": "Username",
  "login.password": "Password",
  "login.submit": "Sign in",
  "login.submitting": "Signing in…",
  "login.footer": "Restricted access · 7-day session",
};

const DICTS: Record<Locale, Dict> = { fr: FR, en: EN };

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "rebelle.admin.locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "fr" || stored === "en") setLocaleState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const raw = DICTS[locale][key] ?? DICTS.fr[key] ?? key;
      if (!vars) return raw;
      return raw.replace(/\{(\w+)\}/g, (_, k) =>
        vars[k] !== undefined ? String(vars[k]) : `{${k}}`
      );
    },
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // Soft-fallback: if a component renders outside the provider (unlikely
    // in normal admin pages) we return a no-op so we never crash.
    return {
      locale: "fr",
      setLocale: () => {},
      t: (k: string) => DICTS.fr[k] ?? k,
    };
  }
  return ctx;
}
