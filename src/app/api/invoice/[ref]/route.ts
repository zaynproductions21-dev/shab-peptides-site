import { NextRequest, NextResponse } from "next/server";

interface InvoiceData {
  ref: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    organisation: string;
  };
  items: { name: string; size: string; price: string; quantity: number }[];
  total: string;
}

// Store invoices in memory for now — in production, use KV
const invoiceStore = new Map<string, InvoiceData>();

export function storeInvoice(data: InvoiceData) {
  invoiceStore.set(data.ref, data);
}

export { invoiceStore };

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ ref: string }> }
) {
  const { ref } = await params;
  const invoice = invoiceStore.get(ref);

  // If no stored invoice, show a generic template with the ref
  const data = invoice || {
    ref,
    date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    customer: { name: "—", email: "—", phone: "—", organisation: "—" },
    items: [],
    total: "0.00",
  };

  const itemRows = data.items.length > 0
    ? data.items.map((item, i) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #e8ecf0;font-size:14px;color:#2D2926">${i + 1}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e8ecf0;font-size:14px;color:#2D2926">${item.name} (${item.size})</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e8ecf0;font-size:14px;color:#2D2926;text-align:center">${item.quantity}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #e8ecf0;font-size:14px;color:#2D2926;text-align:right">${item.price}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4" style="padding:16px;text-align:center;color:#8A8580;font-size:14px">No items found for this invoice reference.</td></tr>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${data.ref} — Premio Peptides</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #f8f9fc; color: #2D2926; }
    @media print {
      body { background: white; }
      .no-print { display: none !important; }
      .invoice-card { box-shadow: none !important; border: none !important; }
    }
  </style>
</head>
<body>
  <div style="max-width:720px;margin:32px auto;padding:0 16px">

    <!-- Print button -->
    <div class="no-print" style="text-align:right;margin-bottom:16px">
      <button onclick="window.print()" style="background:#C5A04A;color:white;border:none;padding:10px 24px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer">
        Print / Save as PDF
      </button>
    </div>

    <div class="invoice-card" style="background:white;border-radius:16px;border:1px solid #e8ecf0;box-shadow:0 4px 24px rgba(0,0,0,0.06);overflow:hidden">

      <!-- Header -->
      <div style="background:#2D2926;padding:32px;display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <img src="https://premiopeptides.co.uk/logo/png/premio-logo-full-mono-white.png" alt="Premio Peptides" width="240" height="60" style="display:block;height:auto;max-width:240px;margin-bottom:6px" />
          <p style="color:#C5A04A;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin:0">Research-Grade Compounds</p>
        </div>
        <div style="text-align:right">
          <p style="color:white;font-size:22px;font-weight:700">INVOICE</p>
          <p style="color:#C5A04A;font-size:14px;font-weight:600;margin-top:4px">#${data.ref}</p>
        </div>
      </div>

      <!-- Invoice details -->
      <div style="padding:32px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:24px;border-bottom:1px solid #e8ecf0">
        <div>
          <p style="font-size:11px;font-weight:600;color:#8A8580;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Bill To</p>
          <p style="font-size:15px;font-weight:600;color:#2D2926">${data.customer.name}</p>
          <p style="font-size:13px;color:#5a5550;margin-top:2px">${data.customer.organisation}</p>
          <p style="font-size:13px;color:#5a5550">${data.customer.email}</p>
          <p style="font-size:13px;color:#5a5550">${data.customer.phone}</p>
        </div>
        <div style="text-align:right">
          <p style="font-size:11px;font-weight:600;color:#8A8580;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Invoice Date</p>
          <p style="font-size:14px;color:#2D2926;font-weight:500">${data.date}</p>
          <p style="font-size:11px;font-weight:600;color:#8A8580;text-transform:uppercase;letter-spacing:1px;margin-top:16px;margin-bottom:8px">Payment Due</p>
          <p style="font-size:14px;color:#C5A04A;font-weight:600">Upon Receipt</p>
        </div>
      </div>

      <!-- Items table -->
      <div style="padding:0 32px">
        <table style="width:100%;border-collapse:collapse;margin:24px 0">
          <thead>
            <tr style="background:#f8f9fc">
              <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#8A8580;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #e8ecf0">#</th>
              <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:#8A8580;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #e8ecf0">Item</th>
              <th style="padding:10px 16px;text-align:center;font-size:11px;font-weight:600;color:#8A8580;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #e8ecf0">Qty</th>
              <th style="padding:10px 16px;text-align:right;font-size:11px;font-weight:600;color:#8A8580;text-transform:uppercase;letter-spacing:1px;border-bottom:2px solid #e8ecf0">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>
      </div>

      <!-- Total -->
      <div style="padding:0 32px 32px">
        <div style="display:flex;justify-content:flex-end">
          <div style="background:#f8f9fc;border-radius:12px;padding:20px 28px;min-width:220px">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="font-size:13px;color:#8A8580">Subtotal</span>
              <span style="font-size:13px;color:#2D2926;font-weight:500">£${data.total}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="font-size:13px;color:#8A8580">VAT</span>
              <span style="font-size:13px;color:#2D2926;font-weight:500">£0.00</span>
            </div>
            <div style="border-top:2px solid #C5A04A;padding-top:10px;display:flex;justify-content:space-between">
              <span style="font-size:15px;font-weight:700;color:#2D2926">Total</span>
              <span style="font-size:20px;font-weight:700;color:#C5A04A">£${data.total}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bank details -->
      <div style="background:#faf8f5;border-top:1px solid #e8ecf0;padding:32px">
        <p style="font-size:11px;font-weight:600;color:#8A8580;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px">Payment Details — Bank Transfer (BACS)</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 32px;max-width:400px">
          <p style="font-size:13px;color:#8A8580">Account Name</p>
          <p style="font-size:13px;color:#2D2926;font-weight:600">BELL RED LIMITED</p>
          <p style="font-size:13px;color:#8A8580">Sort Code</p>
          <p style="font-size:13px;color:#2D2926;font-weight:600">00-00-00</p>
          <p style="font-size:13px;color:#8A8580">Account Number</p>
          <p style="font-size:13px;color:#2D2926;font-weight:600">00000000</p>
          <p style="font-size:13px;color:#8A8580">Reference</p>
          <p style="font-size:13px;color:#C5A04A;font-weight:600">${data.ref}</p>
        </div>
        <p style="font-size:12px;color:#8A8580;margin-top:16px">Please use your invoice reference <strong>${data.ref}</strong> as the payment reference so we can match your payment.</p>
      </div>

      <!-- Footer -->
      <div style="padding:24px 32px;border-top:1px solid #e8ecf0;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <div>
          <p style="font-size:12px;color:#8A8580"><strong style="color:#2D2926">BELL RED LIMITED</strong> (trading as Premio Peptides)</p>
          <p style="font-size:11px;color:#8A8580">Company No. 12841067 · 16 Neptune Street, Tipton, DY4 8JF</p>
        </div>
        <div style="text-align:right">
          <p style="font-size:12px;color:#8A8580">info@premiopeptides.co.uk</p>
          <p style="font-size:11px;color:#8A8580">premiopeptides.co.uk</p>
        </div>
      </div>

      <!-- Disclaimer -->
      <div style="padding:16px 32px 24px;background:#f8f9fc;border-top:1px solid #e8ecf0">
        <p style="font-size:10px;color:#8A8580;line-height:1.5">
          All compounds are supplied strictly for in vitro research use only. Not for human or veterinary use.
          BELL RED LIMITED (trading as Premio Peptides), Company No. 12841067, 16 Neptune Street, Tipton, England, DY4 8JF.
        </p>
      </div>

    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
