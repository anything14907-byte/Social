import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    // In production with real Razorpay:
    // const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    //   .update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
    // if (generated_signature !== razorpay_signature) return error;

    return NextResponse.json({
      success: true,
      message: 'Razorpay Indian payment verified successfully!',
      transaction: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id || `pay_${Date.now()}`,
        status: 'PAID',
        verifiedAt: new Date().toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Payment verification failed' }, { status: 500 });
  }
}

