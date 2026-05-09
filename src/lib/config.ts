export const WHATSAPP_NUMBER = "447466402766";

export const WHATSAPP_ORDER_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent("Hi Premio Peptides, I'd like to place an order. Can you help?");

// Normalise a user-entered phone number into E.164 (+44…) so Twilio accepts it.
// Handles UK local (07…), international with 00 prefix (00…), already-E.164 (+…),
// and strips spaces, dashes, parentheses. Falls back to the raw digits if format
// is unrecognised — Twilio will then reject it and the SMS branch quietly skips.
export function normalisePhone(input: string): string {
  if (!input) return "";
  const cleaned = input.replace(/[\s\-()]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("00")) return "+" + cleaned.slice(2);
  if (cleaned.startsWith("0")) return "+44" + cleaned.slice(1);
  return cleaned;
}
