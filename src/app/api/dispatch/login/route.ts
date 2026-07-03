import { NextRequest, NextResponse } from "next/server";
import { mintSession, verifyPin, clearSession } from "@/lib/dispatch-auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { pin } = (await req.json()) as { pin?: string };
    if (typeof pin !== "string" || !/^\d{4,10}$/.test(pin)) {
      return NextResponse.json({ error: "Invalid PIN format" }, { status: 400 });
    }
    if (!verifyPin(pin)) {
      // Slow the response slightly to blunt brute-force
      await new Promise((r) => setTimeout(r, 400));
      return NextResponse.json({ error: "Wrong PIN" }, { status: 401 });
    }
    const cookie = mintSession();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(cookie.name, cookie.value, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: cookie.maxAge,
    });
    return res;
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookie = clearSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookie.name, cookie.value, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
