'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { CURRENT_USER } from '@/data/seedData';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';

export default function MonetizationPage() {
  const { user } = useAuth();
  const profile = user || CURRENT_USER;

  return (
    <div className="w-full max-w-4xl px-4 py-8 flex flex-col gap-6">
      <ProfileHeader profile={profile} isCurrentUser={true} />
      <ProfileTabs />
    </div>
  );
}
