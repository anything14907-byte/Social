import { NextResponse } from 'next/server';
import { SEED_POSTS } from '@/data/seedData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pincode = searchParams.get('pincode');
  const category = searchParams.get('category');

  let filtered = [...SEED_POSTS];
  if (pincode) {
    filtered = filtered.filter((p) => p.pincode === pincode);
  }
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category.toLowerCase().includes(category.toLowerCase()));
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    listings: filtered,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newListing = {
      id: `post_vv_${Date.now()}`,
      author: body.author || {
        id: 'usr_vyapar_me',
        username: 'rameshwar_pottery',
        fullName: 'Rameshwar Soni',
        businessName: 'Heritage Blue Pottery Studio',
        accountType: 'LOCAL_SELLER_ARTISAN',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        isVerifiedArtisan: true,
      },
      mediaUrls: body.mediaUrls || [],
      mediaType: body.mediaType || 'image',
      caption: body.caption || '',
      category: body.category || 'Handloom & Textiles',
      location: body.location || 'Jaipur, Rajasthan',
      state: body.state || 'Rajasthan',
      pincode: body.pincode || '302001',
      isForSale: body.isForSale || false,
      product: body.product,
      likesCount: 0,
      commentsCount: 0,
      inquiriesCount: 0,
      createdAt: 'Just now',
      comments: [],
    };

    return NextResponse.json({
      success: true,
      message: 'VyaparVibe artisan listing created successfully',
      listing: newListing,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create listing' }, { status: 500 });
  }
}
