'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Play,
  ShoppingBag,
  ShieldCheck,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { ShowcaseVideo } from '@/types';
import { useFeed } from '@/context/FeedContext';
import { formatCount, formatINR } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ShowcaseItemProps {
  showcase: ShowcaseVideo;
  isActive: boolean;
}

export default function ShowcaseItem({ showcase, isActive }: ShowcaseItemProps) {
  const { toggleLikeShowcase, toggleSaveShowcase, openInquiryModal, posts } = useFeed();
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
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
    if (!showcase.isLiked) {
      toggleLikeShowcase(showcase.id);
    }
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 800);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `/showcase?id=${showcase.id}`);
    toast('Showcase craft video link copied! Share on WhatsApp 📲', 'success');
  };

  const linkedPost = posts.find((p) => p.id === showcase.productListingId);

  return (
    <div className="relative w-full h-[calc(100vh-65px)] md:h-[calc(100vh-24px)] max-w-[440px] mx-auto rounded-3xl overflow-hidden bg-black shadow-2xl flex items-center justify-center snap-start select-none my-2 border border-neutral-800">
      {/* Video Element */}
      <div
        className="relative w-full h-full cursor-pointer flex items-center justify-center"
        onClick={togglePlay}
        onDoubleClick={handleDoubleTap}
      >
        <video
          ref={videoRef}
          src={showcase.videoUrl}
          poster={showcase.thumbnailUrl}
          playsInline
          loop
          muted={isMuted}
          className="w-full h-full object-cover"
        />

        {/* Play/Pause Indicator Flash */}
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
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0] }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              <Heart className="w-28 h-28 text-white fill-rose-500 drop-shadow-2xl stroke-rose-400 stroke-2" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mute / Unmute Button */}
        <button
          onClick={toggleSound}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 transition-all z-20"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Category Pill on Video */}
        <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 py-1 px-3 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
          <Sparkles className="w-3 h-3 text-vyapar-400" />
          <span>{showcase.category}</span>
        </div>
      </div>

      {/* Side Action Buttons */}
      <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 text-white drop-shadow-md">
        {/* Like */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLikeShowcase(showcase.id);
          }}
          className="flex flex-col items-center gap-1 group active:scale-75 transition-transform"
        >
          <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60">
            <Heart
              className={`w-6 h-6 ${
                showcase.isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'
              }`}
            />
          </div>
          <span className="text-[11px] font-bold">{formatCount(showcase.likesCount)}</span>
        </button>

        {/* Comments */}
        <div className="flex flex-col items-center gap-1">
          <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-[11px] font-bold">{formatCount(showcase.commentsCount)}</span>
        </div>

        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 group active:scale-75 transition-transform"
        >
          <div className="p-2.5 rounded-full bg-black/40 backdrop-blur-md group-hover:bg-black/60">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-[11px] font-bold">{formatCount(showcase.sharesCount)}</span>
        </button>

        {/* Save */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveShowcase(showcase.id);
          }}
          className="p-2.5 rounded-full bg-black/40 backdrop-blur-md active:scale-75 transition-transform"
        >
          <Bookmark
            className={`w-6 h-6 ${
              showcase.isSaved ? 'text-vyapar-400 fill-vyapar-400' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Bottom Metadata & Embedded Buy Pill */}
      <div className="absolute left-4 right-16 bottom-5 z-20 flex flex-col gap-2.5 text-white pointer-events-auto">
        {/* Creator Info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/70">
            <img src={showcase.author.avatar} alt="Artisan" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs flex items-center gap-1 drop-shadow">
              {showcase.author.businessName || showcase.author.fullName}
              <ShieldCheck className="w-3.5 h-3.5 text-vyapar-400 fill-vyapar-400" />
            </span>
            <span className="text-[10px] text-white/80 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5 text-terracotta-400" /> {showcase.location}
            </span>
          </div>
        </div>

        <h4 className="text-xs font-bold text-white line-clamp-1 drop-shadow">
          {showcase.title}
        </h4>
        <p className="text-[11px] text-white/90 line-clamp-2 leading-relaxed drop-shadow-xs">
          {showcase.description}
        </p>

        {/* Embedded Commerce Tag on Video */}
        {showcase.productPrice && linkedPost && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              openInquiryModal(linkedPost);
            }}
            className="w-fit py-1.5 px-3 rounded-full bg-vyapar-700/90 hover:bg-vyapar-700 text-white text-xs font-bold backdrop-blur-md border border-vyapar-500/50 flex items-center gap-1.5 shadow-lg active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-vyapar-300" />
            <span>Inquire / Buy ({formatINR(showcase.productPrice)})</span>
          </button>
        )}
      </div>
    </div>
  );
}
