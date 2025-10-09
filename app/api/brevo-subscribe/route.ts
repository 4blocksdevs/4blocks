import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
interface BrevoSubscribeBody {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  utm?: Record<string, any>;
  lead_source?: string;
  tags?: string[];
  listIds?: number[];
}

/**
 * POST /api/brevo-subscribe
 * Secure server-side proxy to Brevo (Sendinblue) contacts API.
 * This keeps your Brevo API key private and enriches contacts with UTM metadata.
 */
export async function POST(req: Request) {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    const defaultListId = process.env.BREVO_LIST_ID
      ? parseInt(process.env.BREVO_LIST_ID, 10)
      : 2;

    if (!apiKey) {
      console.error("❌ Missing BREVO_API_KEY in environment variables.");
      return NextResponse.json(
        { error: "Server misconfiguration: missing BREVO_API_KEY" },
        { status: 500 },
      );
    }

    const body = (await req.json()) as BrevoSubscribeBody;

    if (!body.email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Build list IDs
    const listIds =
      body.listIds?.length && body.listIds.length > 0
        ? body.listIds
        : defaultListId
        ? [defaultListId]
        : [];

    // Map standard & custom attributes
    const attributes: Record<string, any> = {};
    if (body.firstName) attributes.FIRSTNAME = body.firstName;
    if (body.lastName) attributes.LASTNAME = body.lastName;
    if (body.company) attributes.COMPANY = body.company;
    if (body.lead_source) attributes.LEAD_SOURCE = body.lead_source;

    // Flatten UTM parameters under uppercase keys
    if (body.utm) {
      const UTM_KEYS = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "gclid",
        "fbclid",
        "ad_id",
        "adset_id",
        "campaign_id",
      ];
      for (const key of UTM_KEYS) {
        if (body.utm[key] !== undefined) {
          attributes[key.toUpperCase()] = body.utm[key];
        }
      }
      if (body.utm.landing_page)
        attributes.LANDING_PAGE = body.utm.landing_page;
      if (body.utm.referrer) attributes.REFERRER = body.utm.referrer;
    }

    // Prepare Brevo contact payload
    const payload = {
      email: body.email,
      attributes,
      updateEnabled: true,
      listIds: listIds.length ? listIds : undefined,
      tags: body.tags?.length ? body.tags : undefined,
    };

    // Send to Brevo contacts API
    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Brevo returns 201 (created), 204 (updated), or 200 (OK)
    if (![200, 201, 204].includes(brevoRes.status)) {
      const errText = await brevoRes.text();
      console.error("⚠️ Brevo contacts API error:", errText);
      return NextResponse.json(
        { error: "Brevo contacts API error", detail: errText },
        { status: brevoRes.status },
      );
    }

    // Log PDF download event (if relevant)
    const tags = body.tags || [];
    if (tags.includes("pdf") || tags.includes("mvp_roadmap")) {
      const eventPayload = {
        event_name: "pdf_downloaded",
        event_date: new Date().toISOString(),
        identifiers: { email_id: body.email },
        contact_properties: attributes,
        event_properties: {
          file_name: tags.includes("mvp_roadmap")
            ? "MVP Roadmap PDF"
            : "PDF Download",
          lead_source: body.lead_source,
          ...body.utm,
        },
      };

      try {
        const eventRes = await fetch("https://api.brevo.com/v3/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
            accept: "application/json",
          },
          body: JSON.stringify(eventPayload),
        });

        if (!eventRes.ok) {
          console.warn(
            "⚠️ Brevo event tracking failed:",
            await eventRes.text(),
          );
        }
      } catch (eventErr) {
        console.error("⚠️ Brevo event API error:", eventErr);
      }
    }

    console.log(`✅ Brevo contact synced: ${body.email}`);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Unexpected server error:", err);
    return NextResponse.json(
      { error: "Unexpected server error", detail: err?.message },
      { status: 500 },
    );
  }
}
