// Cloudflare Pages Function — POST /api/trial
//
// Captures a free-trial lead from the marketing signup form, then continues the
// visitor to the dashboard app to finish account creation. Free tier: runs on
// the Workers free plan (100k req/day) — a marketing form is nowhere near that.
//
// No KV/D1/email binding required (those need extra setup). If LEAD_WEBHOOK_URL
// is configured (Slack/Make/Zapier/CRM), the lead is forwarded there; otherwise
// it's a no-op and the visitor is still handed off to the app.
//
// Local test:  npx wrangler pages dev dist
//   then POST a form to http://localhost:8788/api/trial

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const PLANS = new Set(["starter", "growth", "enterprise"]);

// Someone hitting /api/trial directly (or a stray GET) → send them to the form.
export function onRequestGet({ request }) {
  return Response.redirect(new URL("/signup", request.url).toString(), 303);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let form;
  try {
    form = await request.formData();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Bots do — accept
  // silently so they don't learn it was rejected.
  if ((form.get("company_website") || "").toString().trim() !== "") {
    return new Response("OK", { status: 200 });
  }

  const str = (k) => (form.get(k) || "").toString().trim();
  const lead = {
    first_name: str("first_name"),
    last_name: str("last_name"),
    practice: str("practice"),
    email: str("email"),
    plan: PLANS.has(str("plan").toLowerCase()) ? str("plan").toLowerCase() : "growth",
  };

  if (!lead.first_name || !lead.practice || !EMAIL_RE.test(lead.email)) {
    return new Response("Please fill in your name, practice, and a valid email.", {
      status: 400,
    });
  }

  // Forward the lead if a webhook is configured. waitUntil so the redirect
  // isn't blocked on the downstream call.
  if (env.LEAD_WEBHOOK_URL) {
    context.waitUntil(
      fetch(env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...lead,
          source: "aso_public/signup",
          submitted_at: new Date().toISOString(),
        }),
      }).catch(() => {})
    );
  }

  // Continue to the app to create the account (prefilled).
  const appSignup = env.APP_SIGNUP_URL ||
    "https://artemissmiles.artemisorthoapp.com/signup";
  const dest = new URL(appSignup);
  dest.searchParams.set("email", lead.email);
  dest.searchParams.set("plan", lead.plan);

  return Response.redirect(dest.toString(), 303);
}
