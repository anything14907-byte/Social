import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const inquiry = {
      id: `inq_${Date.now()}`,
      listingId: body.listingId,
      listingTitle: body.listingTitle,
      sellerId: body.sellerId,
      buyerName: body.buyerName,
      buyerPhone: body.buyerPhone,
      buyerCity: body.buyerCity,
      buyerPincode: body.buyerPincode,
      buyerAddress: body.buyerAddress,
      amount: body.amount,
      message: body.message,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };

    // In production: dispatch SMS/WhatsApp notification to seller via Gupshup/MSG91
    return NextResponse.json({
      success: true,
      message: 'Inquiry transmitted to artisan successfully',
      inquiry,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to submit inquiry' }, { status: 500 });
  }
}
