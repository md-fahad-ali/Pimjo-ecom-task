import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, rememberMe } = await req.json();

    // Simple demo validation. Replace with real validation.
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password are required" }, { status: 400 });
    }

    // In a real app, validate email/password and create a signed JWT or session id.
    const token = `demo_${Buffer.from(email).toString("base64url")}`;

    const res = NextResponse.json({ ok: true });

    const maxAge = rememberMe ? 60 * 60 * 24 * 7 : undefined; // 7 days
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      ...(maxAge ? { maxAge } : {}),
    });

    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
