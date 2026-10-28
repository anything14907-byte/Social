'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useFeed } from '@/context/FeedContext';
import { ShieldCheck, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { STOREFRONT_PRODUCTS } from '@/data/seedData';

export default function RightSuggestions() {
  const { user, openAuthModal } = useAuth();
  const { openCheckout } = useFeed();
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});

  const toggleFollow = (username: string) => {
    setFollowingMap((prev) => ({ ...prev, [username]: !prev[username] }));
  };

  const suggestedUsers = [
    {
      username: 'varanasi_silk_craft',
      name: 'Varanasi Silk Artisans',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      reason: 'Followed by priya_designs + 12 more',
      isVerified: true,
    },
    {
      username: 'mumbai_street_snaps',
      name: 'Aditya Kulkarni',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      reason: 'Popular in Bandra West',
      isVerified: false,
    },
    {
      username: 'kerala_spice_route',
      name: 'Kerala Organic Spices',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      reason: 'Trending in Storefront',
      isVerified: true,
    },
  ];

  return (
    <div className="hidden lg:flex flex-col gap-6 w-80 py-6 px-4 select-none">
      {/* Current User Quick Header */}
      {user ? (
        <div className="flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700">
              <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-neutral-900 dark:text-white flex items-center gap-1 group-hover:underline">
                {user.username}
                {user.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-brand-blue fill-brand-blue" />}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">{user.fullName}</span>
            </div>
          </Link>
          <button
            onClick={openAuthModal}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
          >
            Switch
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
          <span className="text-sm font-semibold text-neutral-900 dark:text-white">Join BharatGram</span>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Connect with millions of Indian creators, share reels, and monetize your creations.
          </p>
          <button
            onClick={openAuthModal}
            className="mt-1 py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-medium text-xs shadow-md"
          >
            Sign In with Mobile OTP
          </button>
        </div>
      )}

      {/* Suggested Creators */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            Suggested for you
          </span>
          <button className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:underline">
            See All
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {suggestedUsers.map((su) => {
            const isFollowing = followingMap[su.username];
            return (
              <div key={su.username} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 shrink-0">
                    <img src={su.avatar} alt={su.username} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-1">
                      {su.username}
                      {su.isVerified && <ShieldCheck className="w-3 h-3 text-brand-blue fill-brand-blue" />}
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate max-w-[130px]">
                      {su.reason}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFollow(su.username)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                    isFollowing
                      ? 'text-neutral-600 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-800'
                      : 'text-brand-blue hover:text-blue-700 dark:hover:text-blue-400'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Indian Storefront Drop */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/20 dark:border-rose-500/20 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5" />
            Trending Desi Storefront
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-white">
            ₹ Razorpay Ready
          </span>
        </div>

        <div className="flex gap-2.5 items-center">
          <img
            src={STOREFRONT_PRODUCTS[0].image}
            alt="Preset pack"
            className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-neutral-900 dark:text-white line-clamp-1">
              {STOREFRONT_PRODUCTS[0].title}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-neutral-900 dark:text-white">
                {formatINR(STOREFRONT_PRODUCTS[0].price)}
              </span>
              <span className="text-[10px] line-through text-neutral-400">
                {formatINR(STOREFRONT_PRODUCTS[0].originalPrice)}
              </span>
            </div>
            <button
              onClick={() =>
                openCheckout(
                  {
                    title: STOREFRONT_PRODUCTS[0].title,
                    price: STOREFRONT_PRODUCTS[0].price,
                    currency: 'INR',
                    ctaType: 'buy_now',
                    inStock: true,
                  },
                  'DesiFrame Official'
                )
              }
              className="mt-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-0.5"
            >
              Buy Now with UPI <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex flex-col gap-2 text-[11px] text-neutral-400 dark:text-neutral-500 pt-2 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <Link href="/about" className="hover:underline">About</Link>
          <span>•</span>
          <Link href="/help" className="hover:underline">Help & Indian Grievance</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:underline">Digital Personal Data Protection (DPDP)</Link>
          <span>•</span>
          <Link href="/monetization" className="hover:underline">Creator Storefront</Link>
          <span>•</span>
          <Link href="/api" className="hover:underline">API & Devs</Link>
        </div>
        <span>© 2026 BHARATGRAM • PROUDLY CRAFTED IN BHARAT 🇮🇳</span>
      </div>
    </div>
  );
}
