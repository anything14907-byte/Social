import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    const cleaned = String(phone).replace(/\D/g, '').slice(-10);
    if (cleaned.length !== 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian phone number (+91)' },
        { status: 400 }
      );
    }

    // In production: Send SMS via Twilio, Gupshup, or MSG91 Indian SMS Gateway
    const testOtp = '123456';
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    return NextResponse.json({
      success: true,
      message: `OTP sent successfully to +91 ${cleaned}`,
      testOtp, // Provided for easy development / demo testing
      expiresAt,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to send OTP' }, { status: 500 });
  }
}
