'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useFeed } from '@/context/FeedContext';
import { CURRENT_USER } from '@/data/seedData';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';

export default function ArtisanProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const { user } = useAuth();
  const { posts } = useFeed();

  const isCurrentUser = user?.username === username;

  // Find matching author from posts if available
  const matchedPost = posts.find((p) => p.author.username === username);

  const profile = isCurrentUser && user
    ? user
    : matchedPost
    ? {
        ...CURRENT_USER,
        id: matchedPost.author.id,
        username: matchedPost.author.username,
        fullName: matchedPost.author.fullName,
        businessName: matchedPost.author.businessName,
        accountType: matchedPost.author.accountType,
        avatar: matchedPost.author.avatar,
        isVerifiedArtisan: matchedPost.author.isVerifiedArtisan,
        location: matchedPost.author.location || 'India',
        state: matchedPost.author.state || 'India',
        pincode: matchedPost.author.pincode || '302001',
        rating: matchedPost.author.rating || 4.9,
        reviewsCount: matchedPost.author.reviewsCount || 88,
        bio: `Master Artisan producing authentic Indian crafts.\n📍 ${matchedPost.location} (PIN ${matchedPost.pincode})\nDispatched directly from loom / workshop.`,
      }
    : {
        ...CURRENT_USER,
        username,
        fullName: `${username.replace(/_/g, ' ')} Studio`,
        businessName: `${username.replace(/_/g, ' ').toUpperCase()} Crafts`,
      };

  return (
    <div className="w-full max-w-4xl px-4 py-8 flex flex-col gap-6">
      <ProfileHeader profile={profile} isCurrentUser={isCurrentUser} />
      <ProfileTabs />
    </div>
  );
}
