import { NextResponse } from "next/server";

interface OrderItem {
  name: string;
  size: string;
  price: string;
  quantity: number;
}

interface OrderPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
    organisation: string;
    researchPurpose: string;
  };
  items: OrderItem[];
  total: string;
}

// ── Brevo (email) ──────────────────────────────────
async function sendBrevoEmail(to: string, subject: string, htmlContent: string) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("BREVO_API_KEY not set — skipping email");
    return;
  }

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Premio Peptides", email: "info@premiopeptides.co.uk" },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  });
}

// ── Twilio (SMS) ───────────────────────────────────
async function sendTwilioSms(to: string, body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!sid || !token || !from) {
    console.warn("Twilio credentials not set — skipping SMS");
    return;
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: to, From: from, Body: body }),
  });
}

// ── Build emails ───────────────────────────────────
function buildCustomerEmail(order: OrderPayload): string {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr><td style="padding:8px;border-bottom:1px solid #eee">${item.name} (${item.size})</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${item.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${item.price}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
      <div style="background:#0097A7;padding:24px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:22px">Premio Peptides</h1>
      </div>
      <div style="padding:24px">
        <h2 style="color:#0097A7;margin-top:0">Thank you for your order, ${order.customer.name}!</h2>
        <p>We've received your order and it's now being reviewed by our team.</p>
        <div style="background:#f0f9fa;border:1px solid #d0e8ec;border-radius:8px;padding:16px;margin:16px 0">
          <p style="margin:0;font-weight:bold;color:#0097A7">What happens next?</p>
          <ul style="margin:8px 0 0;padding-left:20px;color:#555">
            <li>A member of our team will contact you via WhatsApp or phone <strong>within 60 minutes</strong> to verify your research purpose</li>
            <li>Once verified, your order will be dispatched same-day (if placed before 2pm)</li>
            <li>Payment is by bank transfer (BACS) — details will be provided on the call</li>
            <li>Your certificate of analysis will be included with dispatch</li>
          </ul>
        </div>
        <h3 style="color:#333">Order Summary</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <thead><tr style="background:#f5f5f5"><th style="padding:8px;text-align:left">Item</th><th style="padding:8px;text-align:center">Qty</th><th style="padding:8px;text-align:right">Price</th></tr></thead>
          <tbody>${itemsHtml}</tbody>
          <tfoot><tr><td colspan="2" style="padding:8px;font-weight:bold">Total</td><td style="padding:8px;text-align:right;font-weight:bold;color:#0097A7;font-size:18px">£${order.total}</td></tr></tfoot>
        </table>
        <h3 style="color:#333;margin-top:24px">Your Details</h3>
        <p style="margin:4px 0;font-size:14px"><strong>Name:</strong> ${order.customer.name}</p>
        <p style="margin:4px 0;font-size:14px"><strong>Email:</strong> ${order.customer.email}</p>
        <p style="margin:4px 0;font-size:14px"><strong>Phone:</strong> ${order.customer.phone}</p>
        <p style="margin:4px 0;font-size:14px"><strong>Organisation:</strong> ${order.customer.organisation}</p>
        <p style="margin:4px 0;font-size:14px"><strong>Research Purpose:</strong> ${order.customer.researchPurpose}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
        <p style="font-size:11px;color:#999">All compounds are supplied strictly for in vitro research use only. Not for human or veterinary use. BELL RED LIMITED (trading as Premio Peptides), Company No. 12841067, 16 Neptune Street, Tipton, England, DY4 8JF.</p>
      </div>
    </div>
  `;
}

function buildBusinessEmail(order: OrderPayload): string {
  const itemsList = order.items
    .map((item) => `• ${item.name} (${item.size}) × ${item.quantity} — ${item.price}`)
    .join("\n");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333">
      <div style="background:#0097A7;padding:24px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:22px">New Order Received</h1>
      </div>
      <div style="padding:24px">
        <h2 style="color:#0097A7;margin-top:0">Order from ${order.customer.name}</h2>
        <div style="background:#fff3e0;border:1px solid #ffe0b2;border-radius:8px;padding:16px;margin:16px 0">
          <p style="margin:0;font-weight:bold;color:#e65100">ACTION REQUIRED: Contact within 60 minutes</p>
          <p style="margin:8px 0 0;font-size:14px">Phone: <strong>${order.customer.phone}</strong></p>
        </div>
        <h3>Customer Details</h3>
        <p style="margin:4px 0"><strong>Name:</strong> ${order.customer.name}</p>
        <p style="margin:4px 0"><strong>Email:</strong> ${order.customer.email}</p>
        <p style="margin:4px 0"><strong>Phone:</strong> ${order.customer.phone}</p>
        <p style="margin:4px 0"><strong>Organisation:</strong> ${order.customer.organisation}</p>
        <p style="margin:4px 0"><strong>Research Purpose:</strong> ${order.customer.researchPurpose}</p>
        <h3>Order Items</h3>
        <pre style="background:#f5f5f5;padding:12px;border-radius:6px;font-size:13px">${itemsList}\n\nTotal: £${order.total}</pre>
      </div>
    </div>
  `;
}

// ── API Route ──────────────────────────────────────
export async function POST(request: Request) {
  try {
    const order: OrderPayload = await request.json();

    // Validate required fields
    if (!order.customer?.name || !order.customer?.email || !order.customer?.phone || !order.items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const businessEmail = process.env.BUSINESS_EMAIL || "info@premiopeptides.co.uk";
    const businessPhone = process.env.BUSINESS_PHONE; // e.g. "+447000000000"

    // Send emails and SMS in parallel
    await Promise.allSettled([
      // Customer confirmation email
      sendBrevoEmail(
        order.customer.email,
        `Order Received — Premio Peptides #${Date.now().toString(36).toUpperCase()}`,
        buildCustomerEmail(order)
      ),

      // Business notification email
      sendBrevoEmail(
        businessEmail,
        `NEW ORDER: ${order.customer.name} — £${order.total}`,
        buildBusinessEmail(order)
      ),

      // SMS to business
      businessPhone
        ? sendTwilioSms(
            businessPhone,
            `NEW ORDER: ${order.customer.name} (${order.customer.organisation}) — £${order.total}. Items: ${order.items.map((i) => `${i.name} ${i.size} x${i.quantity}`).join(", ")}. Phone: ${order.customer.phone}. VERIFY WITHIN 60 MINS.`
          )
        : Promise.resolve(),

      // SMS to customer
      order.customer.phone && process.env.TWILIO_ACCOUNT_SID
        ? sendTwilioSms(
            order.customer.phone,
            `Hi ${order.customer.name}, thanks for your Premio Peptides order (£${order.total}). We're reviewing it now — expect a call or WhatsApp within 60 minutes to verify your research purpose. For queries: info@premiopeptides.co.uk`
          )
        : Promise.resolve(),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
