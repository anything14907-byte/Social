'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFeed } from '@/context/FeedContext';
import ReelItem from './ReelItem';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function ReelsFeed() {
  const { reels } = useFeed();
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll position to update active reel index
  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollPosition = container.scrollTop;
    const itemHeight = container.clientHeight;
    const newIndex = Math.round(scrollPosition / itemHeight);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < reels.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToNext = () => {
    if (activeIndex < reels.length - 1 && containerRef.current) {
      const nextIdx = activeIndex + 1;
      containerRef.current.scrollTo({
        top: nextIdx * containerRef.current.clientHeight,
        behavior: 'smooth',
      });
      setActiveIndex(nextIdx);
    }
  };

  const scrollToPrev = () => {
    if (activeIndex > 0 && containerRef.current) {
      const prevIdx = activeIndex - 1;
      containerRef.current.scrollTo({
        top: prevIdx * containerRef.current.clientHeight,
        behavior: 'smooth',
      });
      setActiveIndex(prevIdx);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Floating Scroll Navigators for Desktop */}
      <div className="hidden lg:flex flex-col gap-3 fixed right-8 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={scrollToPrev}
          disabled={activeIndex === 0}
          className="p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white disabled:opacity-30 backdrop-blur-md transition-all shadow-lg"
          aria-label="Previous reel"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={scrollToNext}
          disabled={activeIndex === reels.length - 1}
          className="p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white disabled:opacity-30 backdrop-blur-md transition-all shadow-lg"
          aria-label="Next reel"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Snap Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-[calc(100vh-80px)] md:h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar flex flex-col items-center"
      >
        {reels.map((reel, index) => (
          <ReelItem
            key={reel.id}
            reel={reel}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

