import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/dispatch-auth";
import { getOrder, patchOrder } from "@/lib/publishos-orders";

export const runtime = "nodejs";

const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://premiopeptides.co.uk";

// Royal Mail tracking codes: 13 chars (9 digits + 2 letters + GB), e.g. AA123456789GB.
// Some services use 16 digits (Tracked 24/48), some 20 digits (International).
// Permissive: allow 9-30 alphanumeric.
function normaliseTracking(raw: string): string | null {
  const cleaned = raw.replace(/[\s-]/g, "").toUpperCase();
  if (!/^[A-Z0-9]{9,30}$/.test(cleaned)) return null;
  return cleaned;
}

interface Order {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{ name: string; size: string; quantity: number }>;
  total: string;
  deliveryAddress?: {
    line1: string;
    line2?: string;
    city: string;
    postcode: string;
    countryName: string;
  };
}

function buildEmail(order: Order, tracking: string, brandedTrackUrl: string, royalMailUrl: string): string {
  const itemsHtml = order.items
    .map((i) => `<tr><td style="padding:6px 0;color:#2D2926">${i.name} <span style="color:#6B655E">(${i.size})</span></td><td style="padding:6px 0;text-align:right;color:#2D2926">×${i.quantity}</td></tr>`)
    .join("");
  const addr = order.deliveryAddress
    ? `${order.deliveryAddress.line1}${order.deliveryAddress.line2 ? `, ${order.deliveryAddress.line2}` : ""}, ${order.deliveryAddress.city}, ${order.deliveryAddress.postcode}, ${order.deliveryAddress.countryName}`
    : "";

  return `<!doctype html>
<html><body style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#F7F5F1;color:#2D2926;line-height:1.55">
  <div style="max-width:600px;margin:0 auto;padding:24px 20px;background:#FFFFFF">
    <div style="text-align:center;padding-bottom:16px;border-bottom:1px solid #EFEAE0">
      <img src="${SITE_ORIGIN}/logo/png/premio-logo-full-mono-dark.png" alt="Premio Peptides" width="220" height="55" style="display:inline-block;height:auto;max-width:220px;border:0" />
    </div>

    <h1 style="font-size:22px;font-weight:700;margin:20px 0 4px;color:#2D2926">Your order is on the way</h1>
    <p style="font-size:13px;color:#6B655E;margin:0 0 20px">
      Order <span style="font-family:ui-monospace,monospace;color:#2D2926">#${order.orderId}</span> · dispatched via Royal Mail
    </p>

    <div style="background:#F0F9FA;border:1px solid #D0E8EC;border-radius:10px;padding:20px;margin:12px 0">
      <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#0F7B84;text-transform:uppercase;letter-spacing:.06em">Royal Mail tracking number</p>
      <p style="margin:0 0 14px;font-family:ui-monospace,monospace;font-size:20px;font-weight:700;color:#0F7B84;letter-spacing:.02em">${tracking}</p>
      <a href="${royalMailUrl}" style="display:inline-block;background:#0F7B84;color:#FFFFFF;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:8px;font-size:14px">Track on Royal Mail →</a>
      <p style="margin:12px 0 0;font-size:12px;color:#4C6167">
        Or <a href="${brandedTrackUrl}" style="color:#0F7B84;text-decoration:underline">view your Premio order details</a>
      </p>
    </div>

    ${addr ? `
    <p style="font-size:12px;color:#6B655E;margin:16px 0 4px">Shipping to</p>
    <p style="margin:0;color:#2D2926;font-size:14px">${addr}</p>
    ` : ""}

    <h2 style="font-size:14px;font-weight:700;margin:22px 0 6px;color:#2D2926">In this parcel</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${itemsHtml}</table>

    <hr style="border:none;border-top:1px solid #EFEAE0;margin:26px 0" />

    <p style="font-size:13px;color:#6B655E;line-height:1.6;margin:0 0 10px">
      Please allow up to 48h for the tracking to become live on Royal Mail's system. If you have any questions about your order, reply to this email or WhatsApp us on the number that verified you.
    </p>
    <p style="font-size:13px;color:#6B655E;margin:0">
      For research use only. Not for human consumption.
    </p>

    <p style="margin:28px 0 0;text-align:center;font-size:12px;color:#8A8580">
      Premio Peptides · a Bell Red Limited brand · UK
    </p>
  </div>
</body></html>`;
}

async function sendBrevo(to: { email: string; name: string }, subject: string, html: string): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) throw new Error("BREVO_API_KEY not set");
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: "Premio Peptides", email: "orders@premiopeptides.co.uk" },
      to: [to],
      subject,
      htmlContent: html,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Brevo ${res.status}: ${body.slice(0, 200)}`);
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  try {
    const { orderId, tracking } = (await req.json()) as { orderId?: string; tracking?: string };
    if (!orderId || !tracking) {
      return NextResponse.json({ error: "orderId and tracking required" }, { status: 400 });
    }
    const trk = normaliseTracking(tracking);
    if (!trk) {
      return NextResponse.json({ error: "Tracking code looks invalid (expected 9-30 letters/digits)" }, { status: 400 });
    }

    const order = await getOrder(orderId);
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    if (!order.customerEmail) {
      return NextResponse.json({ error: "Order has no customer email — cannot notify" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const brandedUrl = `${SITE_ORIGIN}/track/${encodeURIComponent(order.orderId)}`;
    const royalMailUrl = `https://www.royalmail.com/track-your-item#/tracking-results/${encodeURIComponent(trk)}`;

    // 1. Persist tracking to PublishOS (status → shipped)
    const patched = await patchOrder(order.orderId, {
      status: "shipped",
      royalMailTracking: trk,
      dispatchedAt: now,
    });
    if (!patched.ok) {
      return NextResponse.json({ error: `PublishOS update failed: ${patched.error || "unknown"}` }, { status: 502 });
    }

    // 2. Send branded email
    try {
      await sendBrevo(
        { email: order.customerEmail, name: order.customerName || "" },
        `Your Premio Peptides order #${order.orderId} has been dispatched`,
        buildEmail(
          {
            orderId: order.orderId,
            customerName: order.customerName,
            customerEmail: order.customerEmail,
            customerPhone: order.customerPhone,
            items: order.items,
            total: order.total,
            deliveryAddress: order.deliveryAddress,
          },
          trk,
          brandedUrl,
          royalMailUrl,
        ),
      );
      await patchOrder(order.orderId, { trackingEmailSentAt: now });
    } catch (mailErr) {
      // Tracking was saved but email failed — surface so the operator can retry.
      return NextResponse.json({
        ok: true,
        savedTracking: trk,
        emailSent: false,
        emailError: mailErr instanceof Error ? mailErr.message : String(mailErr),
        brandedUrl,
      });
    }

    return NextResponse.json({
      ok: true,
      savedTracking: trk,
      emailSent: true,
      brandedUrl,
    });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 500 });
  }
}
