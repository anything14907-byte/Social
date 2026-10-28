'use client';

import React, { useState } from 'react';
import { Grid, Film, Bookmark, ShoppingBag, Heart, MessageCircle } from 'lucide-react';
import { useFeed } from '@/context/FeedContext';
import { formatCount } from '@/lib/utils';
import StorefrontGrid from './StorefrontGrid';

export default function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved' | 'storefront'>('posts');
  const { posts, reels } = useFeed();

  const tabs = [
    { id: 'posts', label: 'Posts', icon: Grid },
    { id: 'reels', label: 'Reels', icon: Film },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'storefront', label: 'Storefront (₹)', icon: ShoppingBag, badge: 'Monetized' },
  ];

  return (
    <div className="flex flex-col gap-6 pt-2 select-none">
      {/* Tab Navigation Buttons */}
      <div className="flex items-center justify-around border-b border-neutral-200 dark:border-neutral-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3.5 px-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all ${
                isActive
                  ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-1.5 py-0.2 rounded-full font-bold lowercase">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === 'posts' && (
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square bg-neutral-900 overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={post.mediaUrls[0]}
                alt="Post"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover Overlay with Likes & Comments */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold text-sm">
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

      {activeTab === 'reels' && (
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="group relative aspect-[9/16] max-h-[340px] bg-neutral-900 overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={reel.thumbnailUrl}
                alt="Reel thumbnail"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 text-white text-xs font-bold flex items-center gap-1 drop-shadow">
                <Film className="w-3.5 h-3.5" />
                <span>{formatCount(reel.likesCount)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {posts
            .filter((p) => p.isSaved)
            .map((post) => (
              <div
                key={post.id}
                className="relative aspect-square bg-neutral-900 overflow-hidden rounded-xl"
              >
                <img src={post.mediaUrls[0]} alt="Saved post" className="w-full h-full object-cover" />
              </div>
            ))}
          {posts.filter((p) => p.isSaved).length === 0 && (
            <div className="col-span-3 text-center py-12 text-neutral-400 text-xs">
              No saved posts yet. Tap the bookmark icon on any post to save it here.
            </div>
          )}
        </div>
      )}

      {activeTab === 'storefront' && <StorefrontGrid />}
    </div>
  );
}

