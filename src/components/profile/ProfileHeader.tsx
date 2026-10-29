'use client';

import React from 'react';
import { UserProfile } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Share2, Star, MapPin, Store, MessageCircle, Phone } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface ProfileHeaderProps {
  profile: UserProfile;
  isCurrentUser: boolean;
}

export default function ProfileHeader({ profile, isCurrentUser }: ProfileHeaderProps) {
  const { openSetupWizard } = useAuth();
  const { toast } = useToast();

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast('Artisan Storefront link copied to clipboard! Share on WhatsApp 📲', 'success');
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/919829012345?text=Namaste!%20I%20found%20your%20storefront%20on%20VyaparVibe`, '_blank');
  };

  return (
    <header className="flex flex-col gap-5 pb-6 border-b border-light-border dark:border-dark-border select-none">
      <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-8">
        {/* Artisan Avatar */}
        <div className="relative shrink-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-vyapar-600/50 shadow-md">
            <img src={profile.avatar} alt={profile.fullName} className="w-full h-full object-cover" />
          </div>
          {profile.isVerifiedArtisan && (
            <div
              title="Verified Indian Artisan"
              className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-vyapar-700 text-white shadow-md border-2 border-white dark:border-dark-card"
            >
              <ShieldCheck className="w-4 h-4 fill-white" />
            </div>
          )}
        </div>

        {/* Business & Artisan Info */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
                <span>{profile.businessName || profile.fullName}</span>
              </h1>
              <span className="text-xs text-neutral-500 font-medium">
                Proprietor: {profile.fullName} • {profile.accountType === 'LOCAL_SELLER_ARTISAN' ? 'Master Artisan Seller' : 'Creative Creator'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isCurrentUser ? (
                <button
                  onClick={openSetupWizard}
                  className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-dark-hover hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-900 dark:text-white transition-colors"
                >
                  Edit Store Profile
                </button>
              ) : (
                <button
                  onClick={openWhatsApp}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Shop</span>
                </button>
              )}

              <button
                onClick={handleShare}
                aria-label="Share Storefront"
                className="p-2 rounded-xl bg-neutral-100 dark:bg-dark-hover hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rating, Reviews, Sales Stats */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-neutral-700 dark:text-neutral-300">
            <div className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{profile.rating || 4.9}</span>
              <span className="text-neutral-400 font-normal">({profile.reviewsCount || 142} verified reviews)</span>
            </div>

            <div className="h-3 w-px bg-neutral-300 dark:bg-dark-border" />

            <div>
              <strong className="font-extrabold text-neutral-900 dark:text-white">{profile.salesCount || 384}</strong>{' '}
              <span className="text-neutral-500">Orders Fulfilled</span>
            </div>

            <div className="h-3 w-px bg-neutral-300 dark:bg-dark-border" />

            <div>
              <strong className="font-extrabold text-neutral-900 dark:text-white">{profile.postsCount || 28}</strong>{' '}
              <span className="text-neutral-500">Craft Posts</span>
            </div>
          </div>

          {/* Bio & Workshop Location */}
          <p className="whitespace-pre-line text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 pt-1">
            <span className="flex items-center gap-1 text-terracotta-700 dark:text-terracotta-400 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>Workshop: {profile.location} (PIN {profile.pincode})</span>
            </span>

            {profile.gstin && (
              <span className="font-mono text-[11px] bg-neutral-100 dark:bg-dark-hover px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-400">
                GSTIN: {profile.gstin}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
