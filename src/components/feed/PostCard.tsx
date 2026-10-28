'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Share2,
} from 'lucide-react';
import { Post } from '@/types';
import { useFeed } from '@/context/FeedContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { formatINR, formatCount } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { toggleLikePost, toggleSavePost, addComment, openCheckout, openBoostModal } = useFeed();
  const { user } = useAuth();
  const { toast } = useToast();

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [commentInput, setCommentInput] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const isOwner = user?.username === post.author.username;
  const hasMultipleMedia = post.mediaUrls.length > 1;

  // Double tap to like
  const handleDoubleTap = () => {
    if (!post.isLiked) {
      toggleLikePost(post.id);
    }
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(post.id, commentInput);
    setCommentInput('');
  };

  const nextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMediaIndex < post.mediaUrls.length - 1) {
      setCurrentMediaIndex((prev) => prev + 1);
    }
  };

  const prevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + `/post/${post.id}`);
    toast('Post link copied to clipboard! Share on WhatsApp or Instagram 📲', 'success');
  };

  return (
    <article className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-3xl mb-6 overflow-hidden shadow-xs transition-colors">
      {/* 1. Header */}
      <div className="flex items-center justify-between p-3.5 sm:p-4">
        <div className="flex items-center gap-3">
          <Link href={`/${post.author.username}`} className="group">
            <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full border border-white dark:border-black overflow-hidden">
                <img
                  src={post.author.avatar}
                  alt={post.author.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Link>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <Link
                href={`/${post.author.username}`}
                className="font-semibold text-sm text-neutral-900 dark:text-white hover:underline flex items-center gap-1"
              >
                {post.author.username}
                {post.author.isVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-blue fill-brand-blue" />
                )}
              </Link>
              <span className="text-xs text-neutral-400">• {post.createdAt}</span>
            </div>

            {post.location && (
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                <span className="truncate max-w-[220px]">{post.location}</span>
              </span>
            )}
          </div>
        </div>

        {/* Header Right Actions: Boost Pill (if owner) & Three Dots */}
        <div className="flex items-center gap-2">
          {isOwner && (
            <button
              onClick={() => openBoostModal(post)}
              className="flex items-center gap-1 py-1 px-2.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-500/30 transition-all active:scale-95"
            >
              <TrendingUp className="w-3 h-3" />
              <span>{post.boost?.isBoosted ? 'Boosted 🚀' : 'Boost Post'}</span>
            </button>
          )}

          <button
            onClick={() => setIsOptionsOpen(true)}
            aria-label="Post options"
            className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Media Container with Double-tap, Aspect Ratio & Carousel */}
      <div
        className="relative w-full bg-neutral-950 overflow-hidden cursor-pointer select-none group"
        onDoubleClick={handleDoubleTap}
      >
        <div className="relative aspect-[4/5] sm:aspect-square w-full flex items-center justify-center">
          <img
            src={post.mediaUrls[currentMediaIndex]}
            alt={post.caption.slice(0, 50)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />

          {/* Double Tap Heart Burst Animation */}
          <AnimatePresence>
            {showHeartBurst && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0] }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
              >
                <Heart className="w-24 h-24 text-white fill-rose-500 drop-shadow-2xl stroke-rose-400 stroke-2" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Carousel Arrows */}
          {hasMultipleMedia && (
            <>
              {currentMediaIndex > 0 && (
                <button
                  onClick={prevMedia}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all z-20 shadow-lg"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {currentMediaIndex < post.mediaUrls.length - 1 && (
                <button
                  onClick={nextMedia}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all z-20 shadow-lg"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {/* Dots indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/40 px-2 py-1 rounded-full backdrop-blur-xs">
                {post.mediaUrls.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentMediaIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Monetized Product Tag Badge on Image */}
          {post.isMonetized && post.product && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                openCheckout(post.product!, post.author.fullName);
              }}
              className="absolute top-3 left-3 z-20 flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-black/75 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-xl transition-transform active:scale-95 group/tag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400 group-hover/tag:scale-110 transition-transform" />
              <span>{post.product.title}</span>
              <span className="bg-emerald-500/90 text-white text-[11px] px-1.5 py-0.2 rounded-md font-bold">
                {formatINR(post.product.price)}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Monetization CTA Bar (If post is tagged as a product/service) */}
      {post.isMonetized && post.product && (
        <div className="px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/60 border-y border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-neutral-900 dark:text-white flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
              <span>{post.product.title}</span>
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Direct checkout with UPI, Card, NetBanking & COD
            </span>
          </div>

          <button
            onClick={() => openCheckout(post.product!, post.author.fullName)}
            className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 shrink-0"
          >
            <span>{post.product.ctaType === 'book_service' ? 'Book Service' : 'Buy Now'}</span>
            <span className="bg-white/20 px-1 py-0.5 rounded text-[10px]">
              {formatINR(post.product.price)}
            </span>
          </button>
        </div>
      )}

      {/* 4. Action Bar (Like, Comment, Share, Save) */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleLikePost(post.id)}
            aria-label="Like post"
            className="text-neutral-800 dark:text-neutral-200 hover:opacity-70 transition-transform active:scale-75"
          >
            <Heart
              className={`w-7 h-7 transition-colors ${
                post.isLiked
                  ? 'text-rose-500 fill-rose-500'
                  : 'hover:text-neutral-500 stroke-[1.8px]'
              }`}
            />
          </button>

          <button
            onClick={() => setShowAllComments(!showAllComments)}
            aria-label="Comments"
            className="text-neutral-800 dark:text-neutral-200 hover:opacity-70 transition-transform active:scale-90"
          >
            <MessageCircle className="w-7 h-7 stroke-[1.8px]" />
          </button>

          <button
            onClick={handleShare}
            aria-label="Share post"
            className="text-neutral-800 dark:text-neutral-200 hover:opacity-70 transition-transform active:scale-90"
          >
            <Send className="w-7 h-7 stroke-[1.8px]" />
          </button>
        </div>

        <button
          onClick={() => toggleSavePost(post.id)}
          aria-label="Save post"
          className="text-neutral-800 dark:text-neutral-200 hover:opacity-70 transition-transform active:scale-90"
        >
          <Bookmark
            className={`w-7 h-7 transition-colors ${
              post.isSaved
                ? 'text-neutral-900 dark:text-white fill-neutral-900 dark:fill-white'
                : 'stroke-[1.8px]'
            }`}
          />
        </button>
      </div>

      {/* 5. Engagement Section (Likes counter, caption, comments list) */}
      <div className="px-4 pb-3 flex flex-col gap-1.5">
        {/* Likes Count */}
        {!post.hideLikes && (
          <span className="font-bold text-sm text-neutral-900 dark:text-white">
            {formatCount(post.likesCount)} likes
          </span>
        )}

        {/* Caption */}
        <div className="text-sm text-neutral-900 dark:text-neutral-100 leading-snug">
          <Link
            href={`/${post.author.username}`}
            className="font-bold mr-2 hover:underline inline-block"
          >
            {post.author.username}
          </Link>
          <span className="whitespace-pre-line">{post.caption}</span>
        </div>

        {/* Comments Count / Toggle */}
        {post.comments.length > 0 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-xs text-neutral-500 dark:text-neutral-400 text-left mt-0.5 hover:underline"
          >
            {showAllComments
              ? 'Hide comments'
              : `View all ${post.comments.length} comments`}
          </button>
        )}

        {/* Comments Preview or Expanded List */}
        <AnimatePresence>
          {showAllComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col gap-2 mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80"
            >
              {post.comments.map((comm) => (
                <div key={comm.id} className="flex items-start justify-between text-xs">
                  <div className="flex items-start gap-2">
                    <img
                      src={comm.user.avatar}
                      alt={comm.user.username}
                      className="w-5 h-5 rounded-full object-cover shrink-0 mt-0.5"
                    />
                    <div>
                      <span className="font-bold mr-1.5 text-neutral-900 dark:text-white">
                        {comm.user.username}
                      </span>
                      <span className="text-neutral-700 dark:text-neutral-300">{comm.text}</span>
                      <div className="text-[10px] text-neutral-400 mt-0.5">{comm.createdAt}</div>
                    </div>
                  </div>
                  <Heart className="w-3.5 h-3.5 text-neutral-400 hover:text-rose-500 cursor-pointer shrink-0 mt-1" />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inline Comment Input Box */}
        {!post.commentsDisabled && (
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-center gap-2 mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-900"
          >
            <input
              type="text"
              placeholder="Add a comment... (in Hindi, English or regional)"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 bg-transparent text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
            />
            {commentInput.trim() && (
              <button
                type="submit"
                className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
              >
                Post
              </button>
            )}
          </form>
        )}
      </div>

      {/* Post Options Modal */}
      {isOptionsOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none"
          onClick={() => setIsOptionsOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl divide-y divide-neutral-200 dark:divide-neutral-800 text-sm font-medium text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {isOwner && (
              <button
                onClick={() => {
                  setIsOptionsOpen(false);
                  openBoostModal(post);
                }}
                className="w-full py-3.5 text-amber-600 dark:text-amber-400 font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                🚀 Boost Post (Target Indian Pincodes)
              </button>
            )}

            <button
              onClick={() => {
                setIsOptionsOpen(false);
                handleShare();
              }}
              className="w-full py-3.5 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" /> Share to WhatsApp / Copy Link
            </button>

            <button
              onClick={() => {
                setIsOptionsOpen(false);
                toast('Post saved to collection', 'success');
              }}
              className="w-full py-3.5 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Add to Favorites
            </button>

            <button
              onClick={() => {
                setIsOptionsOpen(false);
                toast('Report submitted to BharatGram Safety & Compliance team', 'info');
              }}
              className="w-full py-3.5 text-rose-600 dark:text-rose-400 font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Report Post
            </button>

            <button
              onClick={() => setIsOptionsOpen(false)}
              className="w-full py-3 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
