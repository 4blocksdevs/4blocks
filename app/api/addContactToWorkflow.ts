import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, workflowId } = await req.json();
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing BREVO_API_KEY" }, { status: 500 });
    }
    if (!email || !workflowId) {
      return NextResponse.json({ error: "Email and workflowId required" }, { status: 400 });
    }

    // Create or update contact
    const payload = {
      email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
      },
      updateEnabled: true,
    };
    let contactRes;
    try {
      contactRes = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
          accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      return NextResponse.json({ error: "Network error creating contact", detail: String(err) }, { status: 502 });
    }
    if (!contactRes.ok && contactRes.status !== 201 && contactRes.status !== 204) {
      const errorText = await contactRes.text();
      return NextResponse.json({ error: "Failed to create or update contact", detail: errorText }, { status: contactRes.status });
    }

    // Get contact ID by email
    let getRes;
    try {
      getRes = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "api-key": apiKey,
          accept: "application/json",
        },
      });
    } catch (err) {
      return NextResponse.json({ error: "Network error fetching contact ID", detail: String(err) }, { status: 502 });
    }
    if (!getRes.ok) {
      const errorText = await getRes.text();
      return NextResponse.json({ error: "Failed to fetch contact ID", detail: errorText }, { status: getRes.status });
    }
    const contactData = await getRes.json();
    const contactId = contactData.id;

    // Add contact to workflow
    let workflowRes;
    try {
      workflowRes = await fetch(`https://api.brevo.com/v3/contacts/${contactId}/workflows/${workflowId}`, {
        method: "POST",
        headers: {
          "api-key": apiKey,
          accept: "application/json",
        },
      });
    } catch (err) {
      return NextResponse.json({ error: "Network error adding contact to workflow", detail: String(err) }, { status: 502 });
    }
    if (workflowRes.ok) {
      return NextResponse.json({ message: "Contact added to workflow successfully" });
    } else {
      const errorText = await workflowRes.text();
      return NextResponse.json({ error: "Failed to add contact to workflow", detail: errorText }, { status: workflowRes.status });
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", detail: error?.message }, { status: 500 });
  }
}
