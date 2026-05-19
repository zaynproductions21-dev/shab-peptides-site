import { NextResponse } from "next/server";
import { kvSet } from "@/lib/kv";

const BREVO_LIST_ID = 13; // "Premio Peptides Contacts" — matches /api/order convention.

interface QuizPayload {
  email: string;
  pathway: string;
  pathwayLabel: string;
  format: string;
  duration: string;
  experience: string;
  manychatKeyword: string;
}

async function addToBrevoList(email: string, payload: QuizPayload) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;
  try {
    await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        attributes: {
          SOURCE: "quiz",
          QUIZ_PATHWAY: payload.pathwayLabel,
          QUIZ_FORMAT: payload.format,
          QUIZ_DURATION: payload.duration,
          QUIZ_EXPERIENCE: payload.experience,
          QUIZ_MANYCHAT: payload.manychatKeyword,
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });
  } catch {}
}

export async function POST(req: Request) {
  let body: QuizPayload;
  try {
    body = (await req.json()) as QuizPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  if (!body.pathway || !body.pathwayLabel) {
    return NextResponse.json({ ok: false, error: "Missing pathway" }, { status: 400 });
  }

  await addToBrevoList(email, body);

  // Best-effort lead log for analytics (one entry per submission).
  try {
    const id = `quiz:${Date.now().toString(36)}:${Math.random().toString(36).slice(2, 8)}`;
    await kvSet(id, {
      email,
      pathway: body.pathway,
      pathwayLabel: body.pathwayLabel,
      format: body.format,
      duration: body.duration,
      experience: body.experience,
      manychatKeyword: body.manychatKeyword,
      submittedAt: new Date().toISOString(),
    });
  } catch {}

  return NextResponse.json({ ok: true });
}
