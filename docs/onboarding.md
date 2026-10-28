# Onboarding — working on this repo with Claude Code

Everything a new team member needs to get their own Claude Code session running
against `shab-peptides-site` (the Premio Peptides site). Follow top to bottom.

---

## 1. Access you need first

Ask the repo owner for these before you start — you can't get past step 3 without them:

| Access | Why | Who grants it |
|---|---|---|
| GitHub collaborator on `zaynproductions21-dev/shab-peptides-site` | clone + push | repo owner |
| Vercel team `shab-peptides-site` project | pull env vars, see deploys | repo owner |
| Claude Code seat (Claude Pro/Max or Anthropic Console API key) | run Claude Code | your own account |

---

## 2. Local prerequisites

- **Node 24** (the repo is built and deployed on Node 24 LTS; Next 16 + React 19 assume it)
- **npm 11** (ships with Node 24 — `package-lock.json` is the source of truth, don't switch to pnpm/yarn)
- **git**
- Optional but recommended: `npm i -g vercel` for pulling env vars and running preview deploys

```bash
node -v   # expect v24.x
npm -v    # expect 11.x
```

---

## 3. Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Then, from anywhere:

```bash
claude
```

The first run walks you through login (Claude account or Anthropic API key). Once
authenticated, `claude` picks up your credentials in every project.

---

## 4. Clone and install

```bash
git clone https://github.com/zaynproductions21-dev/shab-peptides-site.git
cd shab-peptides-site
npm ci
```

Use `npm ci`, not `npm install` — it installs exactly what's in the lockfile.

---

## 5. Environment variables

`.env*` is gitignored — **secrets are never committed**. Pull them from Vercel:

```bash
npx vercel link
npx vercel env pull .env.local
```

If you don't have Vercel access yet, ask the owner for the values directly. What
each one does:

| Variable | Used for |
|---|---|
| `BREVO_API_KEY` | transactional email (order confirmations, invoices) |
| `BUSINESS_EMAIL` | where business-side order alerts land |
| `BUSINESS_PHONE` | UK number that receives the "verify within 60 mins" SMS alert |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_PHONE_NUMBER` | outbound SMS — see the SMS rule in §7 |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile CAPTCHA on the order form |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Upstash Redis — order storage + rate limiting |
| `DISPATCH_PIN` / `DISPATCH_SESSION_SECRET` | auth for the internal `/dispatch` console |
| `REVIEW_MODERATION_SECRET` | approving/rejecting customer reviews |
| `NEXT_PUBLIC_SITE_ORIGIN` | canonical origin used in schema/SEO output |
| `NEXT_PUBLIC_POSTHOG_KEY` | product analytics |
| `PUBLISHOS_ORIGIN` | PublishOS API (product catalogue, reviews) |

Without `.env.local` the marketing pages still render; the order, dispatch,
review and batch-verifier flows will not.

---

## 6. Run it

```bash
npm run dev     # http://localhost:3000
npm run build   # production build — run this before any PR
```

There is no test suite. `npm run build` (which type-checks) is the gate.

---

## 7. Project rules that are not obvious from the code

**Read `AGENTS.md` before writing any code.** This repo runs **Next.js 16**, which
has breaking changes versus what most models were trained on. The house rule is:
read the relevant guide in `node_modules/next/dist/docs/` first rather than
writing App Router code from memory. `CLAUDE.md` just points at `AGENTS.md`, so
Claude Code picks this up automatically in every session.

**Outbound SMS is a toll-fraud target — treat it as security-critical.** Twilio
account health was previously degraded by SMS pumping through the public order
endpoint. Every outbound SMS path must keep all three guards, and any change to
`src/app/api/order/route.ts` should be reviewed with that in mind:

1. **Geo-gate** — only `+44` destinations are messaged; anything else is skipped as suspected pumping
2. **Rate limit** — per-IP (5 / 10 min) and per-destination-number (3 / hour), via Upstash
3. **Fail CAPTCHA closed** — if `TURNSTILE_SECRET_KEY` is missing in production, the request is rejected, not waved through

See `docs/twilio-runbook.md` for the sender-ID setup.

**Never commit secrets or generated artefacts.** `.env*`, `.vercel`, `_audit_*`
and `.claude/research/` are gitignored — keep it that way.

---

## 8. Working with Claude Code in this repo

```bash
cd shab-peptides-site
claude
```

Useful in practice:

- Claude reads `CLAUDE.md` → `AGENTS.md` on startup, so the Next 16 rule applies automatically
- `.claude/settings.local.json` holds pre-approved tool permissions. It's local to each machine — you'll build up your own as you approve prompts
- Ask for a plan before large changes; review the diff before committing
- Claude can commit, but **pushing and production deploys stay with a human** — push your own branches

**Your sessions are your own.** Claude Code stores chat history locally on your
machine under `~/.claude/projects/`, tied to your own Claude login. You don't see
anyone else's sessions and they don't see yours — nothing about a conversation is
shared through this repo. Clone from GitHub (step 4) rather than copying someone
else's working directory, so you only get tracked files.

Branch, don't commit to `main` directly:

```bash
git checkout -b feat/your-change
```

---

## 9. Deploying

Production deploys go through Vercel from `main`. Preview deploys:

```bash
npx vercel        # preview URL
npx vercel --prod # production — owner only
```

---

## 10. Where things live

```
src/app/            routes (App Router) — one directory per page
src/app/api/        order, dispatch, review, quiz, invoice, batch-verifier endpoints
src/app/dispatch/   internal order-management console (PIN-protected)
src/components/     shared UI
src/data/           product / content data
src/lib/            kv, email, sms and other helpers
docs/               runbooks and planning notes
public/             static assets
proxy.ts            request middleware
```
