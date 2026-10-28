'use client';

import React, { useState } from 'react';
import { UserProfile } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useFeed } from '@/context/FeedContext';
import { ShieldCheck, Share2, Settings, ShoppingBag, Sparkles, MapPin } from 'lucide-react';
import { formatCount } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';

interface ProfileHeaderProps {
  profile: UserProfile;
  isCurrentUser: boolean;
}

export default function ProfileHeader({ profile, isCurrentUser }: ProfileHeaderProps) {
  const { openSetupWizard } = useAuth();
  const { openVerificationModal, openCreateModal } = useFeed();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast('Profile link copied to clipboard! Share on WhatsApp 🇮🇳', 'success');
  };

  return (
    <header className="flex flex-col gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800 select-none">
      <div className="flex items-start gap-6 sm:gap-10">
        {/* Profile Picture with Indian Gradient Ring */}
        <div className="relative group">
          <div className="w-20 h-20 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 shadow-md">
            <div className="w-full h-full rounded-full border-2 border-white dark:border-black overflow-hidden bg-neutral-200 dark:bg-neutral-800">
              <img
                src={profile.avatar}
                alt={profile.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* User Details & Action Buttons */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white flex items-center gap-1.5">
              <span>{profile.username}</span>
              {profile.isVerified ? (
                <span title="BharatGram Verified Creator">
                  <ShieldCheck className="w-5 h-5 text-brand-blue fill-brand-blue inline" />
                </span>
              ) : (
                isCurrentUser && (
                  <button
                    onClick={openVerificationModal}
                    className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-brand-blue border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                  >
                    + Get Verified
                  </button>
                )
              )}
            </h1>

            {isCurrentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={openSetupWizard}
                  className="px-4 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-900 dark:text-white transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleShare}
                  aria-label="Share Profile"
                  className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isFollowing
                      ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-white'
                      : 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 text-sm text-neutral-800 dark:text-neutral-200">
            <div>
              <strong className="font-extrabold text-black dark:text-white">
                {profile.postsCount}
              </strong>{' '}
              <span className="text-neutral-500">posts</span>
            </div>
            <div>
              <strong className="font-extrabold text-black dark:text-white">
                {formatCount(profile.followersCount + (isFollowing ? 1 : 0))}
              </strong>{' '}
              <span className="text-neutral-500">followers</span>
            </div>
            <div>
              <strong className="font-extrabold text-black dark:text-white">
                {profile.followingCount}
              </strong>{' '}
              <span className="text-neutral-500">following</span>
            </div>
          </div>

          {/* Bio & Details */}
          <div className="flex flex-col gap-1 text-xs sm:text-sm">
            <span className="font-bold text-neutral-900 dark:text-white">
              {profile.fullName}
            </span>
            {profile.category && (
              <span className="text-xs text-neutral-400 font-medium">
                {profile.category}
              </span>
            )}
            <p className="whitespace-pre-line text-neutral-700 dark:text-neutral-300 leading-relaxed mt-0.5">
              {profile.bio}
            </p>

            {profile.location && (
              <span className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{profile.location} {profile.pincode ? `(${profile.pincode})` : ''}</span>
              </span>
            )}

            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-brand-blue hover:underline mt-1"
              >
                {profile.website.replace('https://', '')}
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
