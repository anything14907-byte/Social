'use client';

import React, { useState } from 'react';
import { Store, Grid, Star, Bookmark, Heart, MessageCircle } from 'lucide-react';
import { useFeed } from '@/context/FeedContext';
import { formatCount } from '@/lib/utils';
import StorefrontGrid from './StorefrontGrid';

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<'store' | 'posts' | 'reviews' | 'saved'>('store');
  const { posts } = useFeed();

  const reviews = [
    {
      id: 'rev_1',
      name: 'Pooja Agarwal',
      city: 'Mumbai (PIN 400050)',
      rating: 5,
      date: '3 days ago',
      product: 'Jaipur Cobalt Blue Water Jug',
      text: 'The glaze finish is stunning! Exactly like the traditional Amer blue pottery. Water stays cool and sweet. Dispatched within 24h via express courier.',
    },
    {
      id: 'rev_2',
      name: 'Vikramaditya Rao',
      city: 'Bengaluru (PIN 560034)',
      rating: 5,
      date: '1 week ago',
      product: 'Handmade Kulhads (Set of 6)',
      text: 'Ordered for our festive Diwali gathering. Everyone loved sipping chai in authentic handmade kulhads. Rameshwar ji packed each piece in 3 layers of protective straw and bubble wrap.',
    },
    {
      id: 'rev_3',
      name: 'Sunita Mehra',
      city: 'New Delhi (PIN 110001)',
      rating: 4.8,
      date: '2 weeks ago',
      product: 'Custom Blue Pottery Nameplate',
      text: 'Customized our house nameplate in Hindi script. Super cooperative artisan, sent WhatsApp preview before firing in the kiln!',
    },
  ];

  const tabs = [
    { id: 'store', label: 'Store Catalog', icon: Store, badge: 'In Stock' },
    { id: 'posts', label: 'Craft Posts', icon: Grid },
    { id: 'reviews', label: 'Customer Reviews (4.9 ★)', icon: Star },
    { id: 'saved', label: 'Saved', icon: Bookmark },
  ];

  return (
    <div className="flex flex-col gap-6 pt-2 select-none">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-around border-b border-light-border dark:border-dark-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all ${
                isActive
                  ? 'border-vyapar-700 dark:border-vyapar-400 text-vyapar-800 dark:text-vyapar-300'
                  : 'border-transparent text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] bg-vyapar-50 dark:bg-vyapar-950 text-vyapar-700 dark:text-vyapar-400 px-1.5 py-0.2 rounded-full font-bold lowercase">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Store Catalog */}
      {activeTab === 'store' && <StorefrontGrid />}

      {/* Tab 2: Craft Posts Grid */}
      {activeTab === 'posts' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square bg-neutral-900 overflow-hidden rounded-2xl cursor-pointer"
            >
              <img
                src={post.mediaUrls[0]}
                alt="Craft"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-xs">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4 fill-white" />
                  {formatCount(post.likesCount)}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 fill-white" />
                  {formatCount(post.commentsCount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Customer Reviews */}
      {activeTab === 'reviews' && (
        <div className="flex flex-col gap-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-neutral-900 dark:text-white">{rev.name}</span>
                  <span className="text-[11px] text-neutral-400">• {rev.city}</span>
                </div>
                <div className="flex items-center text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500" />
                  ))}
                </div>
              </div>

              <div className="text-[11px] font-semibold text-vyapar-700 dark:text-vyapar-400">
                Purchased: {rev.product}
              </div>

              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                "{rev.text}"
              </p>

              <span className="text-[10px] text-neutral-400">{rev.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Saved */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {posts
            .filter((p) => p.isSaved)
            .map((post) => (
              <div
                key={post.id}
                className="relative aspect-square bg-neutral-900 overflow-hidden rounded-2xl"
              >
                <img src={post.mediaUrls[0]} alt="Saved craft" className="w-full h-full object-cover" />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
