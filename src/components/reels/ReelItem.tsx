'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Volume2,
  VolumeX,
  Music,
  ShoppingBag,
  ShieldCheck,
  MapPin,
  Play,
} from 'lucide-react';
import { Reel } from '@/types';
import { useFeed } from '@/context/FeedContext';
import { useToast } from '@/context/ToastContext';
import { formatCount, formatINR } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ReelItemProps {
  reel: Reel;
  isActive: boolean;
}

export default function ReelItem({ reel, isActive }: ReelItemProps) {
  const { toggleLikeReel, toggleSaveReel, openCheckout } = useFeed();
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState(reel.comments);

  // Autoplay/pause when reel becomes active in viewport
  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Browsers block autoplay with audio until interacted
          setIsPlaying(false);
        });
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleDoubleTap = () => {
    if (!reel.isLiked) {
      toggleLikeReel(reel.id);
    }
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 900);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `/reels?id=${reel.id}`);
    toast('Reel link copied! Share with friends on WhatsApp 🇮🇳', 'success');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comm = {
      id: `comm_${Date.now()}`,
      postId: reel.id,
      user: {
        id: 'usr_me',
        username: 'aarav_sharma',
        fullName: 'Aarav Sharma',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      },
      text: newComment.trim(),
      createdAt: 'Just now',
      likesCount: 0,
    };
    setCommentsList([comm, ...commentsList]);
    setNewComment('');
    toast('Comment added!', 'success');
  };

  return (
    <div className="relative w-full h-[calc(100vh-60px)] md:h-[calc(100vh-20px)] max-w-[420px] mx-auto rounded-3xl overflow-hidden bg-black shadow-2xl flex items-center justify-center snap-start select-none my-2 border border-neutral-800">
      {/* Video Container */}
      <div
        className="relative w-full h-full cursor-pointer flex items-center justify-center"
        onClick={togglePlay}
        onDoubleClick={handleDoubleTap}
      >
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.thumbnailUrl}
          playsInline
          loop
          muted={isMuted}
          className="w-full h-full object-cover"
        />

        {/* Play/Pause Overlay Flash */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
            <div className="p-4 rounded-full bg-black/60 text-white backdrop-blur-md">
              <Play className="w-10 h-10 fill-white translate-x-0.5" />
            </div>
          </div>
        )}

        {/* Double Tap Heart Burst */}
        <AnimatePresence>
          {showHeartBurst && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0] }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              <Heart className="w-28 h-28 text-white fill-rose-500 drop-shadow-2xl stroke-rose-400 stroke-2" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audio Mute/Unmute Float Button */}
        <button
          onClick={toggleSound}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 transition-all z-20"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Monetized Product Tag Pill on Reel */}
        {reel.product && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              openCheckout(reel.product!, reel.author.fullName);
            }}
            className="absolute top-5 left-5 z-20 flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-black/75 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 shadow-xl transition-transform active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>{reel.product.title}</span>
            <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
              {formatINR(reel.product.price)}
            </span>
          </button>
        )}
      </div>

      {/* Side Action Buttons Bar (Like, Comment, Share, Save, Audio Disc) */}
      <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-4 text-white drop-shadow-md">
        {/* Like */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLikeReel(reel.id);
          }}
          className="flex flex-col items-center gap-1 group active:scale-75 transition-transform"
        >
          <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-colors">
            <Heart
              className={`w-7 h-7 transition-colors ${
                reel.isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'
              }`}
            />
          </div>
          <span className="text-xs font-semibold">{formatCount(reel.likesCount)}</span>
        </button>

        {/* Comment Drawer */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsCommentsOpen(true);
          }}
          className="flex flex-col items-center gap-1 group active:scale-75 transition-transform"
        >
          <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-colors">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs font-semibold">{formatCount(reel.commentsCount)}</span>
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 group active:scale-75 transition-transform"
        >
          <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-colors">
            <Send className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs font-semibold">{formatCount(reel.sharesCount)}</span>
        </button>

        {/* Save */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveReel(reel.id);
          }}
          className="flex flex-col items-center gap-1 group active:scale-75 transition-transform"
        >
          <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60 transition-colors">
            <Bookmark
              className={`w-7 h-7 transition-colors ${
                reel.isSaved ? 'text-white fill-white' : 'text-white'
              }`}
            />
          </div>
        </button>

        {/* Rotating Audio Disc */}
        <div className="w-10 h-10 rounded-full border-2 border-white/60 p-1 bg-black/60 backdrop-blur-md animate-[spin_4s_linear_infinite] mt-1 overflow-hidden">
          <img
            src={reel.author.avatar}
            alt="Audio art"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Metadata & Creator Information */}
      <div className="absolute left-4 right-16 bottom-5 z-20 flex flex-col gap-2.5 text-white pointer-events-auto">
        {/* Creator Header */}
        <div className="flex items-center gap-2.5">
          <Link href={`/${reel.author.username}`} className="group flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/70">
              <img
                src={reel.author.avatar}
                alt={reel.author.username}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-sm text-white drop-shadow flex items-center gap-1 group-hover:underline">
              {reel.author.username}
              {reel.author.isVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-brand-blue fill-brand-blue" />
              )}
            </span>
          </Link>

          <button
            onClick={() => {
              setIsFollowing(!isFollowing);
              toast(isFollowing ? `Unfollowed` : `Following ${reel.author.username}`, 'info');
            }}
            className={`text-xs font-bold py-1 px-3 rounded-full border backdrop-blur-md transition-all ${
              isFollowing
                ? 'bg-white/20 border-white/40 text-white'
                : 'bg-white text-black border-transparent hover:bg-neutral-200'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>

        {/* Location Tag */}
        {reel.location && (
          <span className="text-[11px] text-white/80 flex items-center gap-1 drop-shadow-xs">
            <MapPin className="w-3 h-3 text-rose-400" />
            <span>{reel.location}</span>
          </span>
        )}

        {/* Caption */}
        <p className="text-xs text-white/95 line-clamp-2 leading-relaxed drop-shadow-sm">
          {reel.caption}
        </p>

        {/* Audio Track Marquee */}
        <div className="flex items-center gap-2 text-xs text-white/90 font-medium">
          <Music className="w-3.5 h-3.5 animate-pulse text-amber-400" />
          <div className="overflow-hidden whitespace-nowrap max-w-[220px]">
            <span className="inline-block animate-[marquee_12s_linear_infinite]">
              {reel.audioTrack.title} • {reel.audioTrack.artist}
            </span>
          </div>
        </div>
      </div>

      {/* Reel Comments Drawer */}
      <AnimatePresence>
        {isCommentsOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 h-[65%] bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800 rounded-t-3xl z-40 p-4 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-sm font-bold text-white">Comments ({commentsList.length})</span>
              <button
                onClick={() => setIsCommentsOpen(false)}
                className="text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Close
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-3">
              {commentsList.length === 0 ? (
                <div className="text-center py-6 text-xs text-neutral-400">
                  No comments yet. Be the first to cheer this Indian creator!
                </div>
              ) : (
                commentsList.map((c) => (
                  <div key={c.id} className="flex items-start gap-2 text-xs">
                    <img
                      src={c.user.avatar}
                      alt={c.user.username}
                      className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white">{c.user.username}</span>
                        <span className="text-[10px] text-neutral-400">{c.createdAt}</span>
                      </div>
                      <span className="text-neutral-200 mt-0.5">{c.text}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="pt-2 border-t border-neutral-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a comment on this reel..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 py-2 px-3 rounded-xl bg-neutral-800 text-xs text-white placeholder-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                className="py-2 px-3 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                Post
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
