import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const PUBLISHOS_ORIGIN = process.env.PUBLISHOS_ORIGIN || "https://publishos-eosin.vercel.app";

interface Body {
  name?: string;
  email?: string;
  organisation?: string;
  researchQuestion?: string;
  modelSystem?: string;
  cadence?: string;
  budgetRange?: string;
  compoundsAlreadyEvaluating?: string;
  consentToResearchVerification?: boolean;
  source?: "quiz_fallback" | "direct";
  "cf-turnstile-response"?: string;
}

const TURNSTILE_SECRET = process.env.CLOUDFLARE_TURNSTILE_SECRET;

async function verifyTurnstile(token: string | undefined, ip: string | null): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true; // dev: skip
  if (!token) return false;
  const form = new URLSearchParams();
  form.set("secret", TURNSTILE_SECRET);
  form.set("response", token);
  if (ip) form.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const data = (await res.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;

    // Required-fields validation
    const required = ["name", "email", "organisation", "researchQuestion", "modelSystem", "cadence", "budgetRange"] as const;
    const missing = required.filter((k) => !body[k] || typeof body[k] !== "string" || !body[k]!.trim());
    if (missing.length) {
      return NextResponse.json({ error: "missing_fields", missing }, { status: 400 });
    }
    if (!body.consentToResearchVerification) {
      return NextResponse.json({ error: "consent_required" }, { status: 400 });
    }

    // Email shape check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email!)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }

    // Turnstile anti-bot
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || null;
    const human = await verifyTurnstile(body["cf-turnstile-response"], ip);
    if (!human) {
      return NextResponse.json({ error: "bot_check_failed" }, { status: 403 });
    }

    // Forward to PublishOS
    const forwardRes = await fetch(`${PUBLISHOS_ORIGIN}/api/custom-protocols`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        organisation: body.organisation,
        researchQuestion: body.researchQuestion,
        modelSystem: body.modelSystem,
        cadence: body.cadence,
        budgetRange: body.budgetRange,
        compoundsAlreadyEvaluating: body.compoundsAlreadyEvaluating,
        consentToResearchVerification: true,
        source: body.source === "quiz_fallback" ? "quiz_fallback" : "direct",
      }),
    });
    const forwardData = (await forwardRes.json().catch(() => ({}))) as { ok?: boolean; requestId?: string; error?: string };
    if (!forwardRes.ok || !forwardData.ok) {
      return NextResponse.json(
        { error: `PublishOS error: ${forwardData.error || forwardRes.status}` },
        { status: 502 },
      );
    }

    // Fire a Brevo internal alert to the Premio team (best-effort, non-blocking)
    const apiKey = process.env.BREVO_API_KEY;
    if (apiKey) {
      const esc = (s: string) => s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      const notifyHtml = `<p>New bulk / bespoke enquiry from <strong>${esc(body.name!)}</strong> (${esc(body.email!)}) at <strong>${esc(body.organisation!)}</strong>.</p>
<p><strong>Model system:</strong> ${esc(body.modelSystem!)}</p>
<p><strong>Cadence:</strong> ${esc(body.cadence!)}</p>
<p><strong>Budget:</strong> ${esc(body.budgetRange!)}</p>
<p><strong>Research question:</strong></p>
<p style="white-space:pre-wrap;background:#f6f6f6;padding:10px;border-radius:6px">${esc(body.researchQuestion!)}</p>
${body.compoundsAlreadyEvaluating ? `<p><strong>Already evaluating:</strong><br/>${esc(body.compoundsAlreadyEvaluating)}</p>` : ""}
<p>Review and reply: <a href="https://publishos-eosin.vercel.app/custom-protocols">PublishOS → Premio Enquiries</a> (reference <code>${esc(forwardData.requestId || "")}</code>)</p>
<p style="color:#999;font-size:12px">SLA: named-specialist reply within 24 business hours.</p>`;
      fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          sender: { name: "Premio Enquiries", email: "orders@premiopeptides.co.uk" },
          to: [{ email: "orders@premiopeptides.co.uk" }],
          subject: `📬 New bulk / bespoke enquiry #${forwardData.requestId}`,
          htmlContent: notifyHtml,
        }),
      }).catch(() => undefined);
    }

    return NextResponse.json({ ok: true, requestId: forwardData.requestId });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed" },
      { status: 500 },
    );
  }
}
