'use client';

import React, { useState } from 'react';
import { useFeed } from '@/context/FeedContext';
import { Search, Heart, MessageCircle, ShoppingBag } from 'lucide-react';
import { formatCount } from '@/lib/utils';
import { CATEGORIES } from '@/data/categories';

export default function ExplorePage() {
  const { posts, openInquiryModal } = useFeed();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      p.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.author.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.pincode.includes(searchTerm);

    const matchesCategory =
      activeCategory === 'All' ||
      p.category.toLowerCase().includes(activeCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-4xl px-4 py-6 flex flex-col gap-6 select-none">
      {/* Search Input Bar */}
      <div className="relative w-full max-w-lg mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search Indian artisans, craft clusters, or PIN code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-vyapar-600 shadow-xs"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <button
          onClick={() => setActiveCategory('All')}
          className={`py-1.5 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'All'
              ? 'bg-vyapar-700 text-white shadow-xs'
              : 'bg-white dark:bg-dark-card text-neutral-600 dark:text-neutral-300 border border-light-border dark:border-dark-border hover:border-vyapar-600'
          }`}
        >
          All Crafts
        </button>
        {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={`py-1.5 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.name
                ? 'bg-vyapar-700 text-white shadow-xs'
                : 'bg-white dark:bg-dark-card text-neutral-600 dark:text-neutral-300 border border-light-border dark:border-dark-border hover:border-vyapar-600'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid of Explore Posts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => post.isForSale && openInquiryModal(post)}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer"
          >
            <img
              src={post.mediaUrls[0]}
              alt={post.caption}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Tag indicator for marketplace items */}
            {post.isForSale && post.product && (
              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-vyapar-300">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
            )}

            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs font-bold drop-shadow z-10">
              <span className="truncate max-w-[120px]">{post.author.businessName || post.author.fullName}</span>
              {post.product && (
                <span className="bg-black/60 px-2 py-0.5 rounded-md text-vyapar-300">
                  ₹{post.product.price}
                </span>
              )}
            </div>

            {/* Hover overlay */}
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
    </div>
  );
}
