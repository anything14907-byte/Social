'use client';

import React from 'react';
import CategoryFilterBar from '@/components/feed/CategoryFilterBar';
import PostCard from '@/components/feed/PostCard';
import RightSuggestions from '@/components/layout/RightSuggestions';
import { useFeed } from '@/context/FeedContext';
import { MapPin, X, Sparkles } from 'lucide-react';

export default function HomeFeedPage() {
  const { posts, selectedCategory, selectedPincode, setSelectedPincode } = useFeed();

  // Filter posts by selected category & pincode
  const filteredPosts = posts.filter((post) => {
    // Category match
    const categoryMatch =
      selectedCategory === 'all' ||
      post.category.toLowerCase().includes(selectedCategory.toLowerCase());

    // Pincode match
    const pincodeMatch = !selectedPincode || post.pincode === selectedPincode;

    return categoryMatch && pincodeMatch;
  });

  return (
    <div className="w-full max-w-[1040px] flex justify-center gap-8 px-2 sm:px-4 py-4 md:py-6">
      {/* Center Feed Column */}
      <div className="w-full max-w-[540px] flex flex-col items-center">
        {/* Category Horizontal Filter Bar */}
        <CategoryFilterBar />

        {/* Active Pincode Filter Badge (if selected) */}
        {selectedPincode && (
          <div className="w-full mb-4 p-3 rounded-2xl bg-vyapar-50 dark:bg-vyapar-950/40 border border-vyapar-200 dark:border-vyapar-900 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-vyapar-800 dark:text-vyapar-300">
              <MapPin className="w-4 h-4 text-terracotta-600" />
              <span>Showing local creations near PIN: {selectedPincode}</span>
            </div>
            <button
              onClick={() => setSelectedPincode('')}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Feed Posts */}
        <div className="w-full flex flex-col items-center">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="w-full text-center py-12 p-6 rounded-3xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border flex flex-col items-center gap-2">
              <Sparkles className="w-8 h-8 text-neutral-400" />
              <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
                No items found for this filter
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs">
                Try selecting "All Crafts & Skills" or clear your PIN code filter to see more Indian creators.
              </p>
              <button
                onClick={() => setSelectedPincode('')}
                className="mt-2 py-1.5 px-4 rounded-xl bg-vyapar-700 text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Desktop Suggestions Column */}
      <RightSuggestions />
    </div>
  );
}
