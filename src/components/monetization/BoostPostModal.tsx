'use client';

import React, { useState } from 'react';
import { useFeed } from '@/context/FeedContext';
import { useToast } from '@/context/ToastContext';
import { INDIAN_CITIES } from '@/data/indianCities';
import { formatINR } from '@/lib/utils';
import {
  X,
  TrendingUp,
  MapPin,
  Users,
  Calendar,
  Check,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function BoostPostModal() {
  const { selectedPostForBoost, closeBoostModal, applyBoostToPost } = useFeed();
  const { toast } = useToast();

  const [targetCity, setTargetCity] = useState('Mumbai');
  const [targetPincode, setTargetPincode] = useState('400050');
  const [budgetTier, setBudgetTier] = useState<number>(499);
  const [durationDays, setDurationDays] = useState<number>(3);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedPostForBoost) return null;

  const budgetOptions = [
    { budget: 199, estReach: '4,500 - 6,000', label: 'Starter Boost' },
    { budget: 499, estReach: '12,000 - 16,500', label: 'Popular (Recommended)' },
    { budget: 999, estReach: '25,000 - 35,000', label: 'Mega Creator Reach' },
  ];

  const handleCitySelect = (city: string) => {
    setTargetCity(city);
    const found = INDIAN_CITIES.find((c) => c.city === city);
    if (found) {
      setTargetPincode(found.samplePincode);
    }
  };

  const handleBoostPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      applyBoostToPost(selectedPostForBoost.id, targetCity, targetPincode, budgetTier);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-sm">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Boost Post • Indian Audience Reach
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Promote your content & products directly to users in your city
              </p>
            </div>
          </div>

          <button
            onClick={closeBoostModal}
            className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 flex flex-col gap-5 flex-1">
          {/* Post Preview Thumbnail */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
            <img
              src={selectedPostForBoost.mediaUrls[0]}
              alt="Boost preview"
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">
                {selectedPostForBoost.caption || 'BharatGram Post'}
              </span>
              <span className="text-[11px] text-neutral-500">
                Current likes: {selectedPostForBoost.likesCount} • Location: {selectedPostForBoost.location || 'India'}
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                Eligible for hyperlocal targeted boost 🚀
              </span>
            </div>
          </div>

          {/* Target Location Selection */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Target Location (Indian City & PIN)
            </span>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={targetCity}
                onChange={(e) => handleCitySelect(e.target.value)}
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white font-medium focus:outline-none"
              >
                {INDIAN_CITIES.map((c) => (
                  <option key={c.city} value={c.city}>
                    {c.city} ({c.state})
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Target PIN Code"
                value={targetPincode}
                onChange={(e) => setTargetPincode(e.target.value)}
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* Budget & Reach Tier Selection */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-blue-500" />
              Select Budget & Estimated Reach
            </span>

            <div className="flex flex-col gap-2">
              {budgetOptions.map((opt) => (
                <div
                  key={opt.budget}
                  onClick={() => setBudgetTier(opt.budget)}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    budgetTier === opt.budget
                      ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30'
                      : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Estimated reach: <strong>{opt.estReach} people</strong>
                    </span>
                  </div>
                  <div className="text-sm font-black text-amber-600 dark:text-amber-400">
                    {formatINR(opt.budget)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Duration Selector */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                Campaign Duration
              </span>
            </div>
            <div className="flex items-center gap-2">
              {[1, 3, 7].map((days) => (
                <button
                  key={days}
                  onClick={() => setDurationDays(days)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    durationDays === days
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-black'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  {days} {days === 1 ? 'day' : 'days'}
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={handleBoostPayment}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-75"
          >
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Pay {formatINR(budgetTier)} & Launch Boost</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
