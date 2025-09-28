 import type { NextRequest } from "next/server";
 import { NextResponse } from "next/server";

 // Temporary pass-through middleware to ensure dev server runs without next-auth.
 // TODO: Reintroduce authentication once package compatibility is confirmed.
 export function middleware(req: NextRequest) {
   // Check for an auth cookie for dashboard routes.
   const hasToken = req.cookies.get("auth_token");
   if (!hasToken) {
     const url = req.nextUrl.clone();
     const callbackUrl = encodeURIComponent(url.pathname + url.search);
     const loginUrl = new URL(`/auth/login?callbackUrl=${callbackUrl}`, req.url);
     return NextResponse.redirect(loginUrl);
   }
   return NextResponse.next();
 }

 export const config = {
   matcher: ["/dashboard/:path*"],
 };
