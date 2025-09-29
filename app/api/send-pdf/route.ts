import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: Implement email service to send PDF
    // Example with SendGrid, Mailgun, or similar service
    
    console.log(`Sending PDF to: ${email}`);

    // Simulate successful email send
    return NextResponse.json({ 
      success: true, 
      message: 'PDF sent successfully' 
    });

  } catch (error) {
    console.error('Error sending PDF:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}