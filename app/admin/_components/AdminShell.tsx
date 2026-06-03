"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Megaphone,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { adminApi, AdminUser } from "@/lib/admin-api";
import { useLocale } from "../_lib/locale";

// Wraps every page under /admin (EXCEPT /admin/login). Calls /me on
// mount; on 401 → kick to login. Renders the sidebar + topbar.

type NavItem = {
  href: string;
  labelKey: string;
  icon: typeof LayoutDashboard;
};

const NAV: NavItem[] = [
  { href: "/admin/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", labelKey: "nav.orders", icon: ShoppingBag },
  { href: "/admin/ads", labelKey: "nav.ads", icon: Megaphone },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const isLogin = pathname.startsWith("/admin/login");
  const { t } = useLocale();

  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(!isLogin);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isLogin) {
      setChecking(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const me = await adminApi.me();
        if (!cancelled) setUser(me.user);
      } catch {
        if (!cancelled) {
          router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isLogin, pathname, router]);

  async function handleLogout() {
    try {
      await adminApi.logout();
    } catch {
      /* ignore */
    }
    router.replace("/admin/login");
  }

  if (isLogin) return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen bg-[#FAF6F2] flex items-center justify-center">
        <p className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold animate-pulse">
          {t("common.loading")}
        </p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAF6F2] flex">
      {/* ─── Sidebar — desktop ───────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#F0E9E1] py-8 px-5 sticky top-0 h-screen">
        <BrandMark />

        <nav className="flex-1 flex flex-col gap-0.5 mt-12">
          <p className="px-3 mb-2 text-[9px] tracking-[0.28em] uppercase text-charcoal/35 font-semibold">
            Navigation
          </p>
          {NAV.map(({ href, labelKey, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12.5px] font-medium transition-colors ${
                  active
                    ? "bg-[#FAF6F2] text-[#810B38]"
                    : "text-charcoal/65 hover:bg-[#FAF6F2]/60 hover:text-charcoal"
                }`}
              >
                {/* Gold rail on active */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full transition-all ${
                    active
                      ? "h-5 bg-[#C4956A]"
                      : "h-0 bg-transparent group-hover:h-3 group-hover:bg-[#E8D5C4]"
                  }`}
                />
                <Icon
                  size={15}
                  strokeWidth={active ? 2.2 : 1.7}
                  className={active ? "text-[#810B38]" : "text-charcoal/55"}
                />
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Footer block — language + account */}
        <div className="mt-8 pt-6 border-t border-[#F0E9E1] flex flex-col gap-4">
          <LanguageSwitch />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12px] font-medium text-charcoal/65 hover:bg-[#FAF6F2] hover:text-[#810B38] transition-colors"
          >
            <LogOut size={14} strokeWidth={1.7} />
            {t("common.logout")}
          </button>

          <div className="px-3">
            <p className="text-[9px] tracking-[0.28em] uppercase text-charcoal/35 font-semibold">
              {t("common.account")}
            </p>
            <p className="font-cormorant text-charcoal text-base mt-0.5">
              {user.username}
            </p>
          </div>
        </div>
      </aside>

      {/* ─── Mobile topbar ───────────────────────────── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-b border-[#F0E9E1] flex items-center justify-between px-5 h-14">
        <BrandMark compact />
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="text-charcoal/80 hover:text-[#810B38]"
        >
          <Menu size={22} strokeWidth={1.7} />
        </button>
      </div>

      {/* ─── Mobile drawer ───────────────────────────── */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/55 backdrop-blur-sm z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-72 bg-white py-8 px-5 flex flex-col shadow-2xl">
            <div className="flex items-start justify-between mb-10">
              <BrandMark />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close"
                className="text-charcoal/80"
              >
                <X size={22} strokeWidth={1.7} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-0.5">
              {NAV.map(({ href, labelKey, icon: Icon }) => {
                const active =
                  pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                      active
                        ? "bg-[#FAF6F2] text-[#810B38]"
                        : "text-charcoal/65 hover:bg-[#FAF6F2]/60"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full ${
                        active ? "h-5 bg-[#C4956A]" : "h-0 bg-transparent"
                      }`}
                    />
                    <Icon size={15} strokeWidth={active ? 2.2 : 1.7} />
                    {t(labelKey)}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-[#F0E9E1] flex flex-col gap-4">
              <LanguageSwitch />

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12px] font-medium text-charcoal/65 hover:bg-[#FAF6F2] transition-colors"
              >
                <LogOut size={14} strokeWidth={1.7} />
                {t("common.logout")}
              </button>

              <div className="px-3">
                <p className="text-[9px] tracking-[0.28em] uppercase text-charcoal/35 font-semibold">
                  {t("common.account")}
                </p>
                <p className="font-cormorant text-charcoal text-base mt-0.5">
                  {user.username}
                </p>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ─── Main ────────────────────────────────────── */}
      <main className="flex-1 pt-14 lg:pt-0 min-w-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  const { t } = useLocale();
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="w-4 h-px bg-[#810B38]" />
        <span className="text-[9px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
          {t("common.maison")}
        </span>
      </div>
      {!compact && (
        <p className="font-cormorant font-light text-charcoal text-[1.4rem] leading-tight mt-1.5 tracking-tight">
          {t("common.console")}
        </p>
      )}
    </div>
  );
}

function LanguageSwitch() {
  const { locale, setLocale, t } = useLocale();
  return (
    <div className="px-3">
      <p className="text-[9px] tracking-[0.28em] uppercase text-charcoal/35 font-semibold mb-1.5">
        {t("common.language")}
      </p>
      <div
        role="group"
        className="inline-flex bg-[#FAF6F2] border border-[#F0E9E1] rounded-full p-0.5"
      >
        <button
          type="button"
          onClick={() => setLocale("fr")}
          className={`px-3 py-1 text-[10px] tracking-[0.22em] uppercase font-semibold rounded-full transition-colors ${
            locale === "fr"
              ? "bg-white text-[#810B38] shadow-[0_1px_2px_rgba(26,26,26,0.06)]"
              : "text-charcoal/55 hover:text-charcoal"
          }`}
        >
          FR
        </button>
        <button
          type="button"
          onClick={() => setLocale("en")}
          className={`px-3 py-1 text-[10px] tracking-[0.22em] uppercase font-semibold rounded-full transition-colors ${
            locale === "en"
              ? "bg-white text-[#810B38] shadow-[0_1px_2px_rgba(26,26,26,0.06)]"
              : "text-charcoal/55 hover:text-charcoal"
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}
