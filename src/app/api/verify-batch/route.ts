import { NextRequest, NextResponse } from "next/server";
import { findBatch } from "@/data/batches";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { code?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const code = body.code?.trim();
  if (!code) {
    return NextResponse.json({ ok: false, error: "Batch code required" }, { status: 400 });
  }

  const batch = findBatch(code);
  if (!batch) {
    return NextResponse.json({ ok: false, found: false, code });
  }

  return NextResponse.json({ ok: true, found: true, batch });
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return NextResponse.json({ ok: false, error: "Batch code required" }, { status: 400 });
  }
  const batch = findBatch(code);
  if (!batch) {
    return NextResponse.json({ ok: false, found: false, code });
  }
  return NextResponse.json({ ok: true, found: true, batch });
}
