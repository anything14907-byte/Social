'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CURRENT_USER } from '@/data/seedData';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';

export default function UserProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const { user } = useAuth();

  const isCurrentUser = user?.username === username;

  // Mock creator profile based on username
  const profile = isCurrentUser && user
    ? user
    : {
        ...CURRENT_USER,
        username: username || 'desi_creator',
        fullName: username === 'priya_designs' ? 'Priya Mehra Handlooms' : username === 'kabir_wanderlust' ? 'Kabir Verma' : `${username} India`,
        avatar: username === 'priya_designs' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        bio: `Namaste! 🇮🇳 Creator and entrepreneur on BharatGram.\nSharing stories from my corner of India. ✨`,
        isVerified: true,
      };

  return (
    <div className="w-full max-w-4xl px-4 py-8 flex flex-col gap-6">
      <ProfileHeader profile={profile} isCurrentUser={isCurrentUser} />
      <ProfileTabs />
    </div>
  );
}

