"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { useLocale } from "../_lib/locale";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const { t, locale, setLocale } = useLocale();
  const router = useRouter();
  const search = useSearchParams();
  const next = search?.get("next") || "/admin/dashboard";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await adminApi.login(username, password);
      router.push(next);
    } catch (err) {
      const message = err instanceof Error ? err.message : t("common.error");
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF6F2] flex items-center justify-center px-6 py-12 relative">
      {/* Floating language toggle */}
      <div className="absolute top-6 right-6 inline-flex bg-white border border-[#F0E9E1] rounded-full p-0.5 shadow-[0_1px_0_rgba(26,26,26,0.04)]">
        <button
          type="button"
          onClick={() => setLocale("fr")}
          className={`px-3 py-1 text-[10px] tracking-[0.22em] uppercase font-semibold rounded-full transition-colors ${
            locale === "fr"
              ? "bg-[#FAF6F2] text-[#810B38]"
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
              ? "bg-[#FAF6F2] text-[#810B38]"
              : "text-charcoal/55 hover:text-charcoal"
          }`}
        >
          EN
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#810B38]" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#810B38] font-semibold">
              {t("common.maison")}
            </span>
            <span className="w-6 h-px bg-[#810B38]" />
          </div>
          <h1 className="font-cormorant font-light text-charcoal text-[2.4rem] leading-[1.05] tracking-tight">
            {t("login.title")}
          </h1>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-white rounded-3xl border border-[#F0E9E1] p-8 shadow-[0_30px_80px_-30px_rgba(26,26,26,0.12)] flex flex-col gap-5"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-[9px] tracking-[0.22em] uppercase text-charcoal/55 font-semibold">
              {t("login.username")}
            </span>
            <input
              type="text"
              autoComplete="username"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-[#E8D5C4] rounded-xl px-4 py-3 text-sm text-charcoal focus:border-[#810B38] focus:outline-none transition-colors"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[9px] tracking-[0.22em] uppercase text-charcoal/55 font-semibold">
              {t("login.password")}
            </span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#E8D5C4] rounded-xl px-4 py-3 text-sm text-charcoal focus:border-[#810B38] focus:outline-none transition-colors"
            />
          </label>

          {error && (
            <p className="text-[12px] text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-[#810B38] text-white text-[11px] tracking-[0.22em] uppercase font-semibold py-4 rounded-full hover:bg-[#5c0828] disabled:opacity-60 transition-colors"
          >
            <Lock size={12} strokeWidth={2.2} />
            {submitting ? t("login.submitting") : t("login.submit")}
          </button>
        </form>

        <p className="text-center text-[10px] tracking-[0.22em] uppercase text-charcoal/40 mt-6">
          {t("login.footer")}
        </p>
      </div>
    </main>
  );
}
