'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  PackageCheck,
  Clock,
  Layers,
} from 'lucide-react';
import { PostListing } from '@/types';
import { useFeed } from '@/context/FeedContext';
import { formatINR, formatCount } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

interface PostCardProps {
  post: PostListing;
}

export default function PostCard({ post }: PostCardProps) {
  const { toggleLikePost, toggleSavePost, addComment, openInquiryModal } = useFeed();
  const { toast } = useToast();

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [commentInput, setCommentInput] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const hasMultipleMedia = post.mediaUrls.length > 1;

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
    navigator.clipboard?.writeText(window.location.origin + `/#${post.id}`);
    toast('Listing link copied to clipboard! Share on WhatsApp 📲', 'success');
  };

  return (
    <article className="w-full bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-3xl mb-6 overflow-hidden shadow-xs transition-colors">
      {/* 1. Header: Creator Avatar, Business Name, Verified Badge, Location */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Link href={`/${post.author.username}`} className="group">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border border-neutral-200 dark:border-dark-border group-hover:ring-2 ring-vyapar-500/40 transition-all shrink-0">
              <img
                src={post.author.avatar}
                alt={post.author.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link
                href={`/${post.author.username}`}
                className="font-bold text-sm text-neutral-900 dark:text-white hover:underline flex items-center gap-1"
              >
                <span>{post.author.businessName || post.author.fullName}</span>
                {post.author.isVerifiedArtisan && (
                  <span title="Verified Indian Artisan">
                    <ShieldCheck className="w-4 h-4 text-vyapar-600 dark:text-vyapar-400 fill-vyapar-600/20 inline" />
                  </span>
                )}
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-terracotta-600 shrink-0" />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  {post.location} (PIN {post.pincode})
                </span>
              </span>
              <span>•</span>
              <span className="text-[11px] text-neutral-400">{post.createdAt}</span>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-neutral-100 dark:bg-dark-hover text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-dark-border shrink-0">
          {post.category}
        </span>
      </div>

      {/* 2. Media Container with Carousel & Double Tap */}
      <div
        className="relative w-full bg-neutral-950 overflow-hidden cursor-pointer select-none group"
        onDoubleClick={handleDoubleTap}
      >
        <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full flex items-center justify-center">
          <img
            src={post.mediaUrls[currentMediaIndex]}
            alt={post.caption.slice(0, 50)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />

          {/* Double Tap Heart Burst */}
          <AnimatePresence>
            {showHeartBurst && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all z-20 shadow-md"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {currentMediaIndex < post.mediaUrls.length - 1 && (
                <button
                  onClick={nextMedia}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all z-20 shadow-md"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-xs">
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

          {/* Floating Price Tag if For Sale */}
          {post.isForSale && post.product && (
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-black/80 text-white text-xs font-bold backdrop-blur-md border border-white/20 shadow-lg">
              <span className="text-vyapar-400">₹</span>
              <span>{post.product.price.toLocaleString('en-IN')}</span>
              {post.product.pricingUnit && (
                <span className="text-[10px] text-neutral-300 font-normal">
                  ({post.product.pricingUnit})
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Embedded Commerce Action Bar (Prominent "Inquire / Buy Now" or "Book Service") */}
      {post.isForSale && post.product && (
        <div className="p-4 bg-vyapar-50/70 dark:bg-vyapar-950/30 border-y border-vyapar-200/60 dark:border-vyapar-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-black text-neutral-900 dark:text-white">
                {formatINR(post.product.price)}
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                {post.product.pricingUnit || 'direct artisan price'}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
              {post.product.materialsUsed && (
                <span className="flex items-center gap-1 truncate max-w-[280px]">
                  <Layers className="w-3 h-3 text-neutral-400 shrink-0" />
                  <span>{post.product.materialsUsed}</span>
                </span>
              )}
              {post.product.leadTimeDays && (
                <span className="flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Dispatches in {post.product.leadTimeDays}d</span>
                </span>
              )}
            </div>
          </div>

          {/* Action Button: Inquire / Buy Now / Book */}
          <button
            onClick={() => openInquiryModal(post)}
            className="py-2.5 px-5 rounded-2xl bg-vyapar-700 hover:bg-vyapar-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {post.product.ctaType === 'book_service' ? 'Book Service' : 'Inquire / Buy Now'}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4. Social Engagement Bar: Like, Comment, Share, Save */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleLikePost(post.id)}
            aria-label="Like post"
            className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 active:scale-90 transition-transform"
          >
            <Heart
              className={`w-6 h-6 transition-colors ${
                post.isLiked
                  ? 'text-rose-500 fill-rose-500'
                  : 'hover:text-neutral-500 stroke-[1.8px]'
              }`}
            />
            <span className="text-xs font-bold">{formatCount(post.likesCount)}</span>
          </button>

          <button
            onClick={() => setShowAllComments(!showAllComments)}
            aria-label="Comments"
            className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 active:scale-90 transition-transform"
          >
            <MessageCircle className="w-6 h-6 stroke-[1.8px]" />
            <span className="text-xs font-bold">{formatCount(post.commentsCount)}</span>
          </button>

          <button
            onClick={handleShare}
            aria-label="Share post"
            className="p-1 text-neutral-800 dark:text-neutral-200 active:scale-90 transition-transform"
          >
            <Share2 className="w-5 h-5 stroke-[1.8px]" />
          </button>
        </div>

        <button
          onClick={() => toggleSavePost(post.id)}
          aria-label="Save post"
          className="text-neutral-800 dark:text-neutral-200 active:scale-90 transition-transform"
        >
          <Bookmark
            className={`w-6 h-6 ${
              post.isSaved
                ? 'text-vyapar-700 dark:text-vyapar-400 fill-vyapar-700 dark:fill-vyapar-400'
                : 'stroke-[1.8px]'
            }`}
          />
        </button>
      </div>

      {/* 5. Caption & Details */}
      <div className="px-4 pb-4 flex flex-col gap-2">
        <div className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
          <Link
            href={`/${post.author.username}`}
            className="font-bold mr-1.5 text-neutral-900 dark:text-white hover:underline"
          >
            {post.author.businessName || post.author.fullName}
          </Link>
          <span className="whitespace-pre-line">{post.caption}</span>
        </div>

        {/* Inquiries Counter Pill */}
        {post.inquiriesCount && post.inquiriesCount > 0 ? (
          <div className="text-[11px] text-terracotta-700 dark:text-terracotta-400 font-semibold flex items-center gap-1 mt-0.5">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>{post.inquiriesCount} local buyers inquired recently</span>
          </div>
        ) : null}

        {/* Comments Preview or Expanded List */}
        {post.comments.length > 0 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-xs text-neutral-500 hover:underline text-left"
          >
            {showAllComments
              ? 'Hide replies'
              : `View all ${post.comments.length} replies & reviews`}
          </button>
        )}

        <AnimatePresence>
          {showAllComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col gap-2 mt-1 pt-2 border-t border-neutral-100 dark:border-dark-border"
            >
              {post.comments.map((comm) => (
                <div key={comm.id} className="flex items-start gap-2 text-xs">
                  <img
                    src={comm.user.avatar}
                    alt={comm.user.username}
                    className="w-5 h-5 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="font-bold mr-1.5 text-neutral-900 dark:text-white">
                      {comm.user.fullName}
                    </span>
                    <span className="text-neutral-700 dark:text-neutral-300">{comm.text}</span>
                    <div className="text-[10px] text-neutral-400">{comm.createdAt}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inline Comment Input Box */}
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-center gap-2 mt-2 pt-2 border-t border-neutral-100 dark:border-dark-border"
        >
          <input
            type="text"
            placeholder="Ask the artisan a question or leave feedback..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="flex-1 bg-transparent text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          {commentInput.trim() && (
            <button
              type="submit"
              className="text-xs font-bold text-vyapar-700 dark:text-vyapar-400 hover:underline"
            >
              Post
            </button>
          )}
        </form>
      </div>
    </article>
  );
}
