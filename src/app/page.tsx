'use client';

import React from 'react';
import StoriesBar from '@/components/feed/StoriesBar';
import PostCard from '@/components/feed/PostCard';
import RightSuggestions from '@/components/layout/RightSuggestions';
import { useFeed } from '@/context/FeedContext';

export default function HomeFeedPage() {
  const { posts } = useFeed();

  return (
    <div className="w-full max-w-[1020px] flex justify-center gap-8 px-2 sm:px-4 py-4 md:py-6">
      {/* Center Feed Column */}
      <div className="w-full max-w-[470px] flex flex-col items-center">
        {/* Horizontal Stories Carousel */}
        <StoriesBar />

        {/* Posts Feed */}
        <div className="w-full flex flex-col items-center">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Desktop Suggestions Sidebar */}
      <RightSuggestions />
    </div>
  );
}
