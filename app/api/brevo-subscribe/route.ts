import { NextResponse } from "next/server";

interface BrevoSubscribeBody {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  utm?: Record<string, any>;
  lead_source?: string;
  tags?: string[];
  listIds?: number[]; // optional override
}

/**
 * POST /api/brevo-subscribe
 * Secure server-side proxy to Brevo (Sendinblue) contacts API.
 * Never call Brevo API directly from the browser: keeps API key private & allows UTM enrichment.
 */
export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server missing BREVO_API_KEY" }, { status: 500 });
    }

    const defaultListId = process.env.BREVO_LIST_ID ? parseInt(process.env.BREVO_LIST_ID, 10) : undefined;
    const body = (await req.json()) as BrevoSubscribeBody;

    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const listIds: number[] = body.listIds && body.listIds.length > 0
      ? body.listIds
      : (defaultListId ? [defaultListId] : []);

    // Map attributes. Brevo ignores unknown attributes; ensure they exist in Brevo dashboard if needed.
    const attributes: Record<string, any> = {};
    if (body.firstName) attributes.FIRSTNAME = body.firstName;
    if (body.lastName) attributes.LASTNAME = body.lastName;
    if (body.company) attributes.COMPANY = body.company;
    if (body.lead_source) attributes.LEAD_SOURCE = body.lead_source;

    // Flatten UTM parameters under prefixed keys (create custom Brevo attributes if you want them stored):
    if (body.utm) {
      const UTM_KEYS = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term","gclid","fbclid","ad_id","adset_id","campaign_id"];
      UTM_KEYS.forEach(k => {
        if (body.utm && body.utm[k] !== undefined) {
          // Use uppercase attribute names e.g. UTM_SOURCE in Brevo custom fields
            attributes[k.toUpperCase()] = body.utm[k];
        }
      });
      if (body.utm.landing_page) attributes.LANDING_PAGE = body.utm.landing_page;
      if (body.utm.referrer) attributes.REFERRER = body.utm.referrer;
    }

    const payload = {
      email: body.email,
      attributes,
      updateEnabled: true, // upsert behavior
      listIds: listIds.length ? listIds : undefined,
      tags: body.tags && body.tags.length ? body.tags : undefined,
    };

    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Brevo returns 201 for new, 204 for updated (sometimes 200). We'll surface status.
    if (!brevoRes.ok && brevoRes.status !== 201 && brevoRes.status !== 204) {
      const errText = await brevoRes.text();
      return NextResponse.json({ error: "Brevo error", detail: errText }, { status: brevoRes.status });
    }

    // If this is a PDF download (tags include 'pdf' or 'mvp_roadmap'), log a custom event to Brevo Events API
    const tags = body.tags || [];
    if (tags.includes("pdf") || tags.includes("mvp_roadmap")) {
      // Compose event payload
      const eventPayload = {
        event_name: "pdf_downloaded",
        event_date: new Date().toISOString(),
        identifiers: {
          email_id: body.email,
        },
        contact_properties: { ...attributes },
        event_properties: {
          file_name: tags.includes("mvp_roadmap") ? "MVP Roadmap PDF" : "PDF Download",
          lead_source: body.lead_source,
          ...body.utm,
        },
      };
      // Send event to Brevo
      await fetch("https://api.brevo.com/v3/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
          accept: "application/json",
        },
        body: JSON.stringify(eventPayload),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Unexpected server error", detail: err?.message }, { status: 500 });
  }
}
