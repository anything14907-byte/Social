'use client';

import React from 'react';
import { useFeed } from '@/context/FeedContext';
import { useAuth } from '@/context/AuthContext';
import { Plus } from 'lucide-react';

export default function StoriesBar() {
  const { stories, openStoryViewer, openCreateModal } = useFeed();
  const { user } = useAuth();

  return (
    <div className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 mb-4 select-none shadow-xs">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth">
        {/* Your Story Avatar / Create */}
        <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
          <div className="relative" onClick={() => (stories.length > 0 ? openStoryViewer(0) : openCreateModal())}>
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full border-2 border-white dark:border-black overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt="Your story"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openCreateModal();
              }}
              title="Add Story"
              className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center border-2 border-white dark:border-black shadow-sm group-hover:scale-110 transition-transform"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3px]" />
            </button>
          </div>
          <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate w-16 text-center">
            Your Story
          </span>
        </div>

        {/* Other Creators' Stories */}
        {stories.slice(1).map((story, idx) => {
          const actualIndex = idx + 1;
          const hasSeen = story.hasSeen;

          return (
            <div
              key={story.id}
              onClick={() => openStoryViewer(actualIndex)}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div
                className={`w-16 h-16 rounded-full p-[2px] transition-transform group-hover:scale-105 ${
                  hasSeen
                    ? 'border-2 border-neutral-300 dark:border-neutral-700'
                    : 'bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600'
                }`}
              >
                <div className="w-full h-full rounded-full border-2 border-white dark:border-black overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <img
                    src={story.author.avatar}
                    alt={story.author.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate w-16 text-center">
                {story.author.username}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
