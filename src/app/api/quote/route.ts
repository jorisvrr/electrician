import { NextResponse } from "next/server";

/**
 * ============================================================================
 *  AANVRAGEN — integratiepunt voor productie
 * ============================================================================
 *
 *  In de demo gebeurt er bewust niets met de aanvraag: hij wordt gevalideerd,
 *  gelogd en met een OK beantwoord. Zo kan de flow volledig getest worden
 *  zonder database, account of externe dienst.
 *
 *  Voor een echte klant hoef je alleen hieronder één blok aan te zetten:
 *
 *   1. WEBHOOK (makkelijkst — Make, Zapier, n8n, eigen endpoint)
 *      Zet QUOTE_WEBHOOK_URL in de Vercel environment variables.
 *      Werkt dan meteen; onderstaande code doet de rest.
 *
 *   2. E-MAIL via Resend
 *      npm i resend
 *      const resend = new Resend(process.env.RESEND_API_KEY);
 *      await resend.emails.send({ from, to, subject, text });
 *
 *   3. FORMSPREE / Formcarry
 *      Vervang de fetch hieronder door een POST naar de formulier-endpoint.
 *
 *   4. CRM of Supabase
 *      Insert in een `leads`-tabel vanuit deze route.
 *
 *  Let op bij livegang: voeg spam-bescherming toe (honeypot-veld of Turnstile)
 *  en stel een AVG-conforme bewaartermijn in voor de aanvragen.
 *
 *  Specifiek voor deze niche: `urgencyId` is het veld om op te routeren. Komt
 *  er een aanvraag binnen met urgentie "nu", dan hoort die niet in de gewone
 *  mailbox te belanden maar in een kanaal waar iemand hem meteen ziet — een
 *  sms, een Teams-melding of een piepertje. Een storingsmelding die een dag
 *  blijft liggen is erger dan geen formulier hebben.
 * ============================================================================
 */

type QuotePayload = {
  work: string[];
  postcode: string;
  place: string;
  /** Optioneel: woning, bedrijfspand of VvE */
  property: string;
  /** Label zoals de bezoeker het zag */
  urgency: string;
  /** Stabiele id — gebruik deze om op te routeren, niet het label */
  urgencyId: string;
  name: string;
  phone: string;
  email: string;
  message: string;
};

function isValid(body: unknown): body is QuotePayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    Array.isArray(b.work) &&
    typeof b.name === "string" &&
    b.name.trim().length > 1 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 5 &&
    typeof b.email === "string" &&
    b.email.includes("@")
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Vul naam, telefoonnummer en e-mailadres in." },
      { status: 422 },
    );
  }

  const webhookUrl = process.env.QUOTE_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          receivedAt: new Date().toISOString(),
          source: "website-offerteformulier",
          /** Maakt het filteren van spoedaanvragen in je CRM triviaal */
          isUrgent: body.urgencyId === "nu",
        }),
      });
      if (!res.ok) throw new Error(`Webhook antwoordde met ${res.status}`);
    } catch (error) {
      console.error("[offerte] doorsturen mislukt:", error);
      return NextResponse.json({ error: "Versturen mislukt" }, { status: 502 });
    }
  } else {
    // DEMO-modus: geen webhook ingesteld, dus alleen loggen.
    console.info("[offerte] demo-aanvraag ontvangen:", body);
  }

  return NextResponse.json({ ok: true });
}
