'use client';

import React, { useState } from 'react';
import { useFeed } from '@/context/FeedContext';
import { Search, Sparkles, Heart, MessageCircle, ShoppingBag } from 'lucide-react';
import { formatCount } from '@/lib/utils';

export default function ExplorePage() {
  const { posts } = useFeed();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Handlooms & Sarees',
    'Street Food',
    'Himalayan Travel',
    'Indian Tech & Startups',
    'Ceramics & Crafts',
  ];

  const filteredPosts = posts.filter((p) => {
    if (searchTerm) {
      return (
        p.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.author.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-4xl px-4 py-6 flex flex-col gap-6 select-none">
      {/* Search Input Bar */}
      <div className="relative w-full max-w-lg mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search Indian creators, locations, #VocalForLocal..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-rose-500 shadow-xs"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`py-1.5 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-black shadow-xs'
                : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Explore Posts */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {filteredPosts.map((post, idx) => {
          const isLarge = idx % 5 === 0;

          return (
            <div
              key={post.id}
              className={`group relative overflow-hidden rounded-xl bg-neutral-900 cursor-pointer ${
                isLarge ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
              }`}
            >
              <img
                src={post.mediaUrls[0]}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Tag indicator for monetized items */}
              {post.isMonetized && (
                <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-amber-400">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Hover overlay */}
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
          );
        })}
      </div>
    </div>
  );
}
