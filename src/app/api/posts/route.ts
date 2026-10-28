import { NextResponse } from 'next/server';
import { SEED_POSTS } from '@/data/seedData';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: SEED_POSTS.length,
    posts: SEED_POSTS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newPost = {
      id: `post_${Date.now()}`,
      author: body.author || {
        id: 'usr_me',
        username: 'aarav_sharma',
        fullName: 'Aarav Sharma',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        isVerified: true,
      },
      mediaUrls: body.mediaUrls || [],
      mediaType: body.mediaType || 'image',
      caption: body.caption || '',
      location: body.location || 'India',
      pincode: body.pincode || '400050',
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isSaved: false,
      createdAt: 'Just now',
      comments: [],
      isMonetized: body.isMonetized || false,
      product: body.product,
    };

    return NextResponse.json({
      success: true,
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create post' }, { status: 500 });
  }
}
