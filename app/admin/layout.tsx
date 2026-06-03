import type { Metadata } from "next";
import AdminShell from "./_components/AdminShell";
import { LocaleProvider } from "./_lib/locale";

export const metadata: Metadata = {
  title: "Admin · Rebelle",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
      <AdminShell>{children}</AdminShell>
    </LocaleProvider>
  );
}
