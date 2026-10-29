'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useFeed } from '@/context/FeedContext';
import { ShieldCheck, MapPin, Store, ArrowUpRight, Award } from 'lucide-react';
import { INDIAN_REGIONS } from '@/data/indianCities';

export default function RightSuggestions() {
  const { user, openAuthModal } = useAuth();
  const { setSelectedPincode } = useFeed();

  const featuredArtisans = [
    {
      username: 'radha_banarasi',
      name: 'Kashi Heritage Handlooms',
      location: 'Varanasi, UP',
      pincode: '221001',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      craft: 'Banarasi Zari Handlooms',
    },
    {
      username: 'farooq_sheesham',
      name: 'Saharanpur Wood Craft',
      location: 'Saharanpur, UP',
      pincode: '247001',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      craft: 'Carved Sheesham Wood',
    },
    {
      username: 'wayanad_organics',
      name: 'Wayanad Valley Spice Co.',
      location: 'Wayanad, KL',
      pincode: '673121',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      craft: 'Organic Hill Spices',
    },
  ];

  return (
    <div className="hidden lg:flex flex-col gap-6 w-80 py-6 px-3 select-none">
      {/* Current Artisan Card */}
      {user ? (
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border">
          <Link href="/profile" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-neutral-200 dark:border-dark-border">
              <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs text-neutral-900 dark:text-white flex items-center gap-1 group-hover:underline">
                {user.businessName || user.fullName}
                {user.isVerifiedArtisan && (
                  <ShieldCheck className="w-3.5 h-3.5 text-vyapar-600 dark:text-vyapar-400" />
                )}
              </span>
              <span className="text-[11px] text-neutral-500">{user.location}</span>
            </div>
          </Link>
          <button
            onClick={openAuthModal}
            className="text-[11px] font-bold text-vyapar-700 dark:text-vyapar-400 hover:underline"
          >
            Switch
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-vyapar-50 dark:bg-vyapar-950/40 border border-vyapar-200/60 dark:border-vyapar-900/40 flex flex-col gap-2">
          <span className="text-xs font-bold text-neutral-900 dark:text-white">Are you an Indian Maker?</span>
          <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
            List your craft, receive direct buyer inquiries via UPI/WhatsApp, and sell locally.
          </p>
          <button
            onClick={openAuthModal}
            className="mt-1 py-2 px-3.5 rounded-xl bg-vyapar-700 hover:bg-vyapar-800 text-white font-bold text-xs"
          >
            Join as Artisan / Creator
          </button>
        </div>
      )}

      {/* Featured Indian Artisans */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Featured Indian Artisans
          </span>
          <Link href="/discovery" className="text-[11px] font-bold text-vyapar-700 dark:text-vyapar-400 hover:underline">
            View All
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          {featuredArtisans.map((artisan) => (
            <div key={artisan.username} className="flex items-center justify-between">
              <Link href={`/${artisan.username}`} className="flex items-center gap-2.5 group">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-9 h-9 rounded-xl object-cover border border-neutral-200 dark:border-dark-border"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:underline flex items-center gap-1">
                    {artisan.name}
                    <ShieldCheck className="w-3 h-3 text-vyapar-600" />
                  </span>
                  <span className="text-[11px] text-neutral-400 truncate max-w-[140px]">
                    {artisan.craft} • {artisan.location}
                  </span>
                </div>
              </Link>

              <Link
                href={`/${artisan.username}`}
                className="text-[11px] font-bold text-vyapar-700 dark:text-vyapar-400 hover:underline flex items-center gap-0.5"
              >
                Store <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Pincode Hubs */}
      <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-dark-hover border border-light-border dark:border-dark-border flex flex-col gap-2">
        <span className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
          Explore By Craft Cluster
        </span>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {INDIAN_REGIONS.slice(0, 6).map((r) => (
            <button
              key={r.pincode}
              onClick={() => setSelectedPincode(r.pincode)}
              className="text-[11px] py-1 px-2.5 rounded-lg bg-white dark:bg-dark-surface border border-neutral-200 dark:border-dark-border text-neutral-700 dark:text-neutral-300 hover:border-vyapar-600 transition-colors"
            >
              {r.city} ({r.pincode})
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-1 text-[11px] text-neutral-400 pt-2 border-t border-light-border dark:border-dark-border">
        <span>© 2026 VYAPARVIBE • VOCAL FOR LOCAL 🇮🇳</span>
        <span>Empowering Artisans & Small Businesses Across India</span>
      </div>
    </div>
  );
}
