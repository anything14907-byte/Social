'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFeed } from '@/context/FeedContext';
import { useToast } from '@/context/ToastContext';
import { X, Heart, Send, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StoryViewerModal() {
  const { stories, activeStoryIndex, closeStoryViewer, nextStory, prevStory } = useFeed();
  const { toast } = useToast();

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

  // Reset state on story switch
  useEffect(() => {
    setProgress(0);
    setIsLiked(false);
    setReplyText('');
  }, [activeStoryIndex]);

  // Story progress timer
  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;

    const intervalTime = 50; // every 50ms
    const totalDuration = 5000; // 5 seconds per story
    const increment = (intervalTime / totalDuration) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimerRef.current as NodeJS.Timeout);
          nextStory();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [activeStoryIndex, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeStoryIndex === null) return;
      if (e.key === 'Escape') closeStoryViewer();
      if (e.key === 'ArrowRight') nextStory();
      if (e.key === 'ArrowLeft') prevStory();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStoryIndex]);

  if (activeStoryIndex === null || !activeStory) return null;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    toast(`Reply sent to ${activeStory.author.username}: "${replyText}"`, 'success');
    setReplyText('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center select-none">
        {/* Close Button */}
        <button
          onClick={closeStoryViewer}
          aria-label="Close stories"
          className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-black/40 hover:bg-black/80 transition-all z-50"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Previous Navigation Arrow */}
        {activeStoryIndex > 0 && (
          <button
            onClick={prevStory}
            aria-label="Previous story"
            className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all z-40"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Next Navigation Arrow */}
        {activeStoryIndex < stories.length - 1 && (
          <button
            onClick={nextStory}
            aria-label="Next story"
            className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all z-40"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}

        {/* Story Card Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          className="relative w-full max-w-[420px] h-[90vh] max-h-[820px] rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Progress Indicators */}
          <div className="absolute top-3 left-3 right-3 z-30 flex items-center gap-1.5">
            {stories.map((s, idx) => (
              <div
                key={s.id}
                className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-75 rounded-full"
                  style={{
                    width:
                      idx < activeStoryIndex
                        ? '100%'
                        : idx === activeStoryIndex
                        ? `${progress}%`
                        : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story Author Header */}
          <div className="absolute top-6 left-4 right-4 z-30 flex items-center justify-between text-white drop-shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/60">
                <img
                  src={activeStory.author.avatar}
                  alt={activeStory.author.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{activeStory.author.username}</span>
                <span className="text-xs text-white/70">• {activeStory.createdAt}</span>
              </div>
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 text-white/80 hover:text-white"
            >
              {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>

          {/* Clickable Touch Zones for Next/Prev */}
          <div className="absolute inset-0 z-20 flex">
            <div className="w-1/3 h-full cursor-pointer" onClick={prevStory} />
            <div className="w-2/3 h-full cursor-pointer" onClick={nextStory} />
          </div>

          {/* Story Media */}
          <div className="relative w-full h-full bg-neutral-950 flex items-center justify-center">
            <img
              src={activeStory.mediaUrl}
              alt="Story content"
              className="w-full h-full object-cover select-none"
            />
            {/* Story Caption Overlay */}
            {activeStory.caption && (
              <div className="absolute bottom-20 left-4 right-4 z-30 p-3 rounded-2xl bg-black/60 backdrop-blur-md text-white text-sm font-medium border border-white/10">
                {activeStory.caption}
              </div>
            )}
          </div>

          {/* Reply & Like Bar at Bottom */}
          <div className="relative z-30 p-3.5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center gap-2.5">
            <form onSubmit={handleSendReply} className="flex-1">
              <input
                type="text"
                placeholder={`Reply to ${activeStory.author.username}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                className="w-full py-2.5 px-4 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white placeholder-white/60 text-xs focus:outline-none focus:border-white transition-all"
              />
            </form>

            {replyText.trim() ? (
              <button
                onClick={handleSendReply}
                className="p-2.5 rounded-full bg-rose-600 text-white shadow-md active:scale-95 transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLiked(!isLiked);
                  if (!isLiked) toast(`Liked ${activeStory.author.username}'s story ❤️`, 'info');
                }}
                className="p-2 text-white hover:scale-110 active:scale-90 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'
                  }`}
                />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

