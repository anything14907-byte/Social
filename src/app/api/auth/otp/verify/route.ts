import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json();

    if (!otp || (otp !== '123456' && otp.length !== 6)) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP. Use test OTP: 123456' },
        { status: 400 }
      );
    }

    const cleaned = String(phone).replace(/\D/g, '').slice(-10);

    // Mock JWT session token
    const token = `bg_jwt_${Buffer.from(JSON.stringify({ phone: `+91${cleaned}`, exp: Date.now() + 86400000 })).toString('base64')}`;

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: `usr_${cleaned}`,
        phone: `+91 ${cleaned}`,
        isPhoneVerified: true,
        username: `desi_${cleaned.slice(-4)}`,
        fullName: 'BharatGram User',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        isVerified: false,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Verification failed' }, { status: 500 });
  }
}

