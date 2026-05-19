import { NextResponse } from "next/server";
import { kvSet } from "@/lib/kv";
import { PATHWAYS, buildWhatsAppDeepLink, type PathwayKey } from "@/lib/pathway-mapping";

const BREVO_LIST_ID = 13; // "Premio Peptides Contacts" — matches /api/order convention.
const BREVO_SENDER = { name: "Premio Peptides", email: "info@premiopeptides.co.uk" };

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

async function sendBrevoEmail(to: string, subject: string, htmlContent: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;
  try {
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: BREVO_SENDER,
        to: [{ email: to }],
        subject,
        htmlContent,
      }),
    });
  } catch {}
}

function durationLabel(value: string): string {
  if (value === "4w") return "4 weeks (single vial)";
  if (value === "8-12w") return "8–12 weeks (stack pricing)";
  if (value === "ongoing") return "Ongoing (bulk enquiry)";
  return value;
}

function formatLabel(value: string): string {
  if (value === "pen") return "Preloaded pen";
  if (value === "vial") return "Powder vial";
  if (value === "any") return "No preference";
  return value;
}

function buildMatchEmail(payload: QuizPayload): string {
  const matched = PATHWAYS.find((p) => p.key === (payload.pathway as PathwayKey));
  if (!matched) return "";

  const isStackEligible = payload.duration === "8-12w" || payload.duration === "ongoing";
  const isBulk = payload.duration === "ongoing";
  const showCalculator = payload.experience === "first-time" || payload.experience === "familiar";

  const waLink = isBulk
    ? buildWhatsAppDeepLink("BULK", `${matched.label}, ongoing research quantities`)
    : isStackEligible
      ? buildWhatsAppDeepLink(matched.manychatKeyword, `${matched.label}, stack pricing`)
      : buildWhatsAppDeepLink(matched.manychatKeyword, matched.label);

  const compoundRows = matched.compounds
    .map(
      (c) =>
        `<tr><td style="padding:12px 16px;border-bottom:1px solid #ECE7DE;font-size:14px;font-weight:600;color:#1F2A33"><a href="https://premiopeptides.co.uk/compounds/${c.slug}" style="color:#1F2A33;text-decoration:none">${c.name}</a></td><td style="padding:12px 16px;border-bottom:1px solid #ECE7DE;text-align:right;font-size:12px"><a href="https://premiopeptides.co.uk/compounds/${c.slug}" style="color:#C5A04A;text-decoration:none">View compound →</a></td></tr>`
    )
    .join("");

  const stackBlock = isStackEligible && matched.compounds.length > 1
    ? `<div style="margin:24px 0;padding:14px 16px;background:#FBF6EB;border:1px solid #C5A04A33;border-radius:8px;font-size:14px;color:#1F2A33"><strong>Stack pricing is available</strong> on this combination for 8–12 week protocols — message us with your selection for the bundle quote.</div>`
    : "";

  const calculatorBlock = showCalculator
    ? `<p style="margin:16px 0 0;font-size:14px;color:#5B6770">New to reconstitution? Our <a href="https://premiopeptides.co.uk/reconstitution-calculator" style="color:#C5A04A">Reconstitution Calculator</a> walks you through it step-by-step.</p>`
    : "";

  return `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;background:#FAF6EE;color:#1F2A33">
  <div style="background:#ffffff;padding:24px;text-align:center;border-bottom:3px solid #C5A04A">
    <img src="https://premiopeptides.co.uk/logo/png/premio-logo-full-mono-dark.png" alt="Premio Peptides" width="220" height="55" style="display:inline-block;height:auto;max-width:220px;border:0" />
  </div>
  <div style="padding:28px 24px;background:#ffffff">
    <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#C5A04A">For laboratory and research use only</p>
    <h1 style="margin:0 0 12px;font-size:22px;line-height:1.25;color:#1F2A33">Your matched research pathway</h1>
    <h2 style="margin:0 0 8px;font-size:18px;line-height:1.3;color:#1F2A33">${matched.label}</h2>
    <p style="margin:0 0 12px;font-size:14px;color:#5B6770;line-height:1.55">${matched.summary}</p>
    <div style="display:inline-block;padding:6px 12px;background:#FBF6EB;border:1px solid #C5A04A33;border-radius:999px;font-size:12px;font-weight:600;color:#C5A04A;margin-bottom:24px">
      ${matched.citationCount}+ peer-reviewed papers reference this pathway
    </div>

    <p style="margin:24px 0 12px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#5B6770">Compounds studied for this pathway</p>
    <table style="width:100%;border-collapse:collapse;border:1px solid #ECE7DE;border-radius:8px;overflow:hidden">${compoundRows}</table>
    ${stackBlock}

    <p style="margin:24px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#5B6770">Your selections</p>
    <ul style="margin:0 0 24px;padding-left:18px;font-size:13px;color:#5B6770;line-height:1.7">
      <li>Format: ${formatLabel(payload.format)}</li>
      <li>Protocol duration: ${durationLabel(payload.duration)}</li>
      <li>Experience: ${payload.experience.replace("-", " ")}</li>
    </ul>

    <a href="${waLink}" style="display:block;text-align:center;padding:14px 20px;background:#25D366;color:#ffffff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px">${isBulk ? "Enquire about bulk research quantities" : "Get this protocol on WhatsApp"}</a>
    ${calculatorBlock}

    <hr style="margin:28px 0;border:none;border-top:1px solid #ECE7DE" />
    <p style="margin:0;font-size:12px;color:#8B95A0;line-height:1.6">
      Reference information based on peer-reviewed laboratory research. Not a dosing recommendation, not a therapeutic claim. For laboratory and research use only — not for human or veterinary consumption.
    </p>
  </div>
  <div style="padding:18px 24px;text-align:center;font-size:11px;color:#8B95A0">
    Premio Peptides · UK research-grade peptides · <a href="https://premiopeptides.co.uk" style="color:#8B95A0">premiopeptides.co.uk</a>
  </div>
</div>
  `.trim();
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

  const html = buildMatchEmail(body);
  if (html) {
    await sendBrevoEmail(
      email,
      "Your matched research pathway — Premio Peptides",
      html,
    );
  }

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
