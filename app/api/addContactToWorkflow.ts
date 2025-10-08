import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing BREVO_API_KEY" }, { status: 500 });
    }
    const { email, firstName, lastName, workflowId } = await req.json();
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
    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!contactRes.ok && contactRes.status !== 201 && contactRes.status !== 204) {
      return NextResponse.json({ error: "Failed to create or update contact" }, { status: contactRes.status });
    }

    // Get contact ID by email
    const getRes = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      method: "GET",
      headers: {
        "api-key": apiKey,
        accept: "application/json",
      },
    });
    if (!getRes.ok) {
      return NextResponse.json({ error: "Failed to fetch contact ID" }, { status: getRes.status });
    }
    const contactData = await getRes.json();
    const contactId = contactData.id;

    // Add contact to workflow
    const workflowRes = await fetch(`https://api.brevo.com/v3/contacts/${contactId}/workflows/${workflowId}`, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        accept: "application/json",
      },
    });
    if (workflowRes.ok) {
      return NextResponse.json({ message: "Contact added to workflow successfully" });
    } else {
      return NextResponse.json({ error: "Failed to add contact to workflow" }, { status: workflowRes.status });
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", detail: error?.message }, { status: 500 });
  }
}
