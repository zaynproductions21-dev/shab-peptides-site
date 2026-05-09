# Twilio Setup Runbook — Premio Peptides

**Goal:** customer SMS confirmations send from a branded **`Premio`** sender ID instead of a generic Twilio number, and business SMS alerts route to the new UK WhatsApp number `+447466402766`.

**Estimated time:** ~25 min total (10 min hands-on, ~15 min waiting for Twilio approval).

---

## Why this matters

| Today | After this runbook |
|---|---|
| Customer SMS comes from a random `+44 7…` Twilio number → looks spammy, often filtered | Customer sees **`Premio`** as the sender → high trust, recognisable |
| Business "VERIFY WITHIN 60 MINS" alert SMS goes to old UAE personal number | Business alerts go to the new UK WhatsApp number |
| Twilio number shared across multiple businesses (Chai, Premio, etc.) | Premio's outbound SMS is isolated from other brands' reputation |

---

## Step 1 — Register the Alphanumeric Sender ID in Twilio (10 min)

UK alphanumeric sender IDs are **outbound only** (customers can't reply) and **free** — you just register the string. Approval typically takes 24–48 hours; sometimes instant.

### 1a. Open the Twilio Console
1. Log in to https://console.twilio.com
2. Make sure you're in the right **Project / Account** (top-left dropdown — pick the one Premio uses)
3. Left sidebar → **Phone Numbers** → **Manage** → **Sender IDs**
   - Or direct link: https://console.twilio.com/us1/develop/phone-numbers/manage/sender-ids

### 1b. Add the Sender ID
1. Click **Add Sender ID**
2. **Sender ID:** `Premio`
   - Max 11 chars, alphanumeric, **no spaces**, **case sensitive** (carriers display exactly what you register)
   - Fallback options if "Premio" already taken in Twilio's pool: `PremioPep`, `PremioUK`, `PremioLab`
3. **Country:** United Kingdom (GB)
4. **Friendly Name:** `Premio Peptides — Order Confirmations`

### 1c. Compliance form (required for UK)

Twilio will show a use-case form. Paste this verbatim (adjust the bold lines):

```
Business name: BELL RED LIMITED (trading as Premio Peptides)
Company number: 12841067
Registered address: 16 Neptune Street, Tipton, England, DY4 8JF
Website: https://premiopeptides.co.uk
Industry: Research-grade chemical supplier (B2B / verified researchers)

Use case: Order confirmation and verification SMS to customers who have
voluntarily placed an order via our checkout form. SMS is one-way
(no customer replies expected).

Opt-in method: Customers enter their phone number on our checkout form
at https://premiopeptides.co.uk/cart. The form clearly states they will
receive an order confirmation SMS. Submission of the order constitutes
explicit opt-in.

Opt-out method: Reply STOP. We honour STOP requests immediately and
maintain a suppression list. (Note: alphanumeric sender IDs cannot
receive replies — customers who wish to opt out can email
info@premiopeptides.co.uk and we remove them from future communications.)

Sample message #1 (order confirmation):
"Hi {Name}, thanks for your Premio Peptides order (£{total}, ref #{ref}).
We're reviewing it now — expect a call or WhatsApp within 60 minutes
to verify your research purpose. For queries: info@premiopeptides.co.uk"

Estimated SMS volume: 50–500 messages per month
```

5. **Submit** → Twilio assigns it a status of `pending` → typical approval **24–48 hours**, often same-day in UK.

### 1d. While waiting

You can keep using the existing Twilio number — no downtime. The env var swap below only happens once the sender ID is `approved`.

---

## Step 2 — Update Vercel environment variables (5 min)

Once the sender ID is approved (Twilio sends a confirmation email):

### 2a. Open Vercel
1. https://vercel.com/dashboard → select the **shab-peptides-site / premio-peptides** project
2. **Settings** → **Environment Variables**

### 2b. Update / add these vars

| Key | New value | Environments | Notes |
|---|---|---|---|
| `TWILIO_PHONE_NUMBER` | `Premio` | Production, Preview | The "From" string for outbound SMS. After Twilio approval. |
| `BUSINESS_PHONE` | `+447466402766` | Production, Preview | Number that receives "VERIFY WITHIN 60 MINS" alerts |

For each:
- Click **Edit** on the existing var (or **Add New** if missing)
- Paste the new value, tick **Production** + **Preview**, hit **Save**

### 2c. Redeploy

Env var changes don't apply to existing deployments — trigger a redeploy:
- Vercel Dashboard → **Deployments** tab → top deployment → **⋯** menu → **Redeploy**
- Or just push any commit to `main` and let auto-deploy handle it

---

## Step 3 — Test plan (10 min)

Once redeployed:

### 3a. Place a test order
1. Go to https://premiopeptides.co.uk
2. Add any peptide → checkout → use a phone number you control (your own UK mobile)
3. Submit

### 3b. Verify all four channels fire
| Channel | What to check | Expected |
|---|---|---|
| Customer email | Inbox | Order received email, logo visible, invoice CTA works |
| Business email | info@premiopeptides.co.uk | "NEW ORDER" email with full details |
| Business SMS | Your phone (07466402766) | "NEW ORDER: ... VERIFY WITHIN 60 MINS" — sender shows as `Premio` |
| Customer SMS | Your test phone | "Hi {name}, thanks for your Premio Peptides order…" — sender shows as `Premio` |

### 3c. If customer SMS doesn't arrive
- Check Twilio Console → **Monitor** → **Logs** → **Messaging** for delivery status
- Common causes:
  - Sender ID still `pending` (wait for email)
  - UK carrier filtering (rare for ASID, more common for raw Twilio numbers — we just fixed this)
  - Customer's phone in unusual format (we now normalise to E.164 in `/api/order` so this should be handled)

### 3d. If business SMS doesn't arrive on the new UK number
- Confirm `BUSINESS_PHONE` env var saved correctly in Vercel (Settings → Env Vars)
- Confirm a redeploy happened *after* you saved it
- Confirm `+447466402766` is the right number (E.164 with `+44`, no leading 0)

---

## Step 4 — Cost

| Item | Cost |
|---|---|
| Alphanumeric Sender ID registration | **Free** |
| Outbound SMS to UK | ~£0.04 per message |
| Inbound SMS to your existing number (unchanged) | Already in your Twilio bill |

At 200 orders/month × 2 SMS each (customer + business) = **~£16/month** SMS spend. Negligible.

---

## Rollback

If anything breaks after the swap:

1. Vercel → Env Vars → revert `TWILIO_PHONE_NUMBER` to the previous Twilio number value
2. Redeploy
3. Customer SMS will go back to coming from a number (not branded), but everything keeps working

The only thing that *can't* immediately roll back is the sender ID registration itself — but you don't lose anything by leaving "Premio" approved in your Twilio account.

---

## Notes for future you

- **Adding more brands?** Each brand should get its own sender ID. Don't share `Premio` across Chai, ZayPOS, etc.
- **Adding 2-way SMS later?** Sender IDs are one-way. To accept replies, buy a UK long code (~£1/month) and switch the `From` to that number for that specific use case (or use Twilio's Messaging Services to mix sender types).
- **Opt-out compliance:** UK GDPR + PECR require a clear opt-out path. Since alphanumeric is one-way, the email path (`info@premiopeptides.co.uk` for STOP requests) is your fallback. Add this language to the privacy/terms page if not already there.

---

**Filed:** 2026-05-09
**Repo:** zaynproductions21-dev/shab-peptides-site
**Author:** Claude Code session
