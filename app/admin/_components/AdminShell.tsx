"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, LogOut, Menu, X } from "lucide-react";
import { adminApi, AdminUser } from "@/lib/admin-api";

// Wraps every page under /admin (EXCEPT /admin/login). Calls /me on
// mount; on 401 → kick to login. Renders the sidebar + topbar.

const NAV = [
  { href: "/admin/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Commandes", icon: ShoppingBag },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const isLogin = pathname.startsWith("/admin/login");

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
          router.replace(
            `/admin/login?next=${encodeURIComponent(pathname)}`
          );
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
      // ignore
    }
    router.replace("/admin/login");
  }

  if (isLogin) return <>{children}</>;

  if (checking) {
    return (
      <div className="min-h-screen bg-[#FAF6F2] flex items-center justify-center">
        <p className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold animate-pulse">
          Chargement…
        </p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAF6F2] flex">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-[#F0E9E1] py-8 px-5">
        <BrandMark />
        <nav className="flex-1 flex flex-col gap-1 mt-10">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12px] font-medium transition-colors ${
                  active
                    ? "bg-[#810B38] text-white"
                    : "text-charcoal/70 hover:bg-[#FAF6F2] hover:text-charcoal"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12px] font-medium text-charcoal/70 hover:bg-[#FAF6F2] hover:text-[#810B38] transition-colors"
        >
          <LogOut size={15} />
          Se déconnecter
        </button>
        <p className="mt-4 text-[10px] tracking-[0.22em] uppercase text-charcoal/40">
          {user.username}
        </p>
      </aside>

      {/* Mobile topbar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 bg-white border-b border-[#F0E9E1] flex items-center justify-between px-5 h-14">
        <BrandMark compact />
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Ouvrir le menu"
          className="text-charcoal"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-72 bg-white py-8 px-5 flex flex-col shadow-2xl">
            <div className="flex items-start justify-between mb-8">
              <BrandMark />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Fermer"
                className="text-charcoal"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-1">
              {NAV.map(({ href, label, icon: Icon }) => {
                const active =
                  pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12px] font-medium transition-colors ${
                      active
                        ? "bg-[#810B38] text-white"
                        : "text-charcoal/70 hover:bg-[#FAF6F2]"
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12px] font-medium text-charcoal/70 hover:bg-[#FAF6F2] transition-colors"
            >
              <LogOut size={15} />
              Se déconnecter
            </button>
            <p className="mt-4 text-[10px] tracking-[0.22em] uppercase text-charcoal/40">
              {user.username}
            </p>
          </aside>
        </>
      )}

      <main className="flex-1 lg:pl-0 pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto px-5 lg:px-10 py-8 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="w-4 h-px bg-[#810B38]" />
        <span className="text-[9px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
          Maison Rebelle
        </span>
      </div>
      {!compact && (
        <p className="font-cormorant font-light text-charcoal text-xl mt-1.5">
          Console <em className="not-italic text-[#810B38]">admin</em>
        </p>
      )}
    </div>
  );
}
