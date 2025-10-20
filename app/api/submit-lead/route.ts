import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, source } = await req.json();

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Import the validation functions at runtime to avoid edge function issues
    const { isValidEmail, sanitizeEmail } = await import("@/lib/utils");

    // Email validation
    const sanitizedEmail = sanitizeEmail(email);
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format or potentially fake email detected" },
        { status: 400 }
      );
    }

    // TODO: Integrate with your CRM
    // Example integrations:

    // HubSpot Integration
    // const hubspotResponse = await fetch('https://api.hubapi.com/contacts/v1/contact/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
    //   },
    //   body: JSON.stringify({
    //     properties: [
    //       { property: 'email', value: email },
    //       { property: 'firstname', value: name.split(' ')[0] },
    //       { property: 'lastname', value: name.split(' ').slice(1).join(' ') },
    //       { property: 'lead_source', value: source }
    //     ]
    //   })
    // });

    // ActiveCampaign Integration
    // const acResponse = await fetch(`${process.env.ACTIVECAMPAIGN_URL}/api/3/contacts`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Api-Token': process.env.ACTIVECAMPAIGN_API_KEY
    //   },
    //   body: JSON.stringify({
    //     contact: {
    //       email: email,
    //       firstName: name.split(' ')[0],
    //       lastName: name.split(' ').slice(1).join(' '),
    //       fieldValues: [
    //         {
    //           field: 'lead_source',
    //           value: source
    //         }
    //       ]
    //     }
    //   })
    // });

    // Mailchimp Integration
    // const mailchimpResponse = await fetch(`https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     email_address: email,
    //     status: 'subscribed',
    //     merge_fields: {
    //       FNAME: name.split(' ')[0],
    //       LNAME: name.split(' ').slice(1).join(' '),
    //       SOURCE: source
    //     }
    //   })
    // });

    // For now, simulate successful submission
    console.log("Lead submitted:", { name, email, source });

    // Send email with PDF (implement email service)
    //await sendWelcomeEmail(email, name);

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting lead:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function sendWelcomeEmail(email: string, name: string) {
  // TODO: Implement email service (SendGrid, Mailgun, etc.)
  // Example with SendGrid:

  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // const msg = {
  //   to: email,
  //   from: 'info@4blocks.xyz',
  //   subject: 'Your MVP Roadmap is Here! 🚀',
  //   html: `
  //     <h2>Hi ${name.split(' ')[0]},</h2>
  //     <p>Thank you for downloading our MVP Roadmap! You can find your PDF attached.</p>
  //     <p>Best regards,<br/>The 4Blocks Team</p>
  //   `,
  //   attachments: [
  //     {
  //       filename: 'MVP-Roadmap-4Blocks.pdf',
  //       type: 'application/pdf',
  //       disposition: 'attachment',
  //       content_id: 'mvp-roadmap'
  //     }
  //   ]
  // };

  // return sgMail.send(msg);

  console.log(`Welcome email would be sent to: ${email}`);
}
