import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, currency = 'INR', receipt, notes } = await request.json();

    // Razorpay accepts amounts in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(Number(amount) * 100);
    const orderId = `order_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        entity: 'order',
        amount: amountInPaise,
        amount_paid: 0,
        amount_due: amountInPaise,
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        status: 'created',
        attempts: 0,
        notes: notes || {},
        created_at: Math.floor(Date.now() / 1000),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Razorpay order creation failed' }, { status: 500 });
  }
}
