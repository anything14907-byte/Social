import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;
    const { targetCity, targetPincode, budget, durationDays } = await request.json();

    const estimatedImpressions = Math.round((budget || 499) * 25);

    const campaign = {
      campaignId: `camp_${Date.now()}`,
      postId,
      targetCity: targetCity || 'All India',
      targetPincode: targetPincode || '400050',
      budgetInr: budget || 499,
      durationDays: durationDays || 3,
      estimatedImpressions,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: `Post ${postId} boosted to ${targetCity}!`,
      campaign,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to boost post' }, { status: 500 });
  }
}

