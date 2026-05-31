import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cheap presence-check for the admin cookie. The actual signature
// verification happens server-side on every API call — the cookie is
// HMAC-signed by the backend with ADMIN_SESSION_SECRET, which the
// middleware does not have access to. If the cookie exists, the
// browser can navigate to /admin/* and the in-page hooks (AdminShell)
// will validate via /api/admin/me.
//
// Redirects /admin → /admin/dashboard.
// Redirects unauthenticated /admin/* (except /admin/login) → /admin/login.

const COOKIE_NAME = "rebelle_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin" || pathname === "/admin/") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const hasCookie = req.cookies.has(COOKIE_NAME);
  if (!hasCookie) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
