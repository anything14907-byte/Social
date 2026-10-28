'use client';

import React, { useState } from 'react';
import { useFeed } from '@/context/FeedContext';
import { useToast } from '@/context/ToastContext';
import { formatINR } from '@/lib/utils';
import {
  ShoppingBag,
  TrendingUp,
  ShieldCheck,
  CreditCard,
  QrCode,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Users,
} from 'lucide-react';
import StorefrontGrid from '@/components/profile/StorefrontGrid';

export default function MonetizationHubPage() {
  const { openVerificationModal, openCreateModal } = useFeed();
  const { toast } = useToast();

  const [upiPayoutId, setUpiPayoutId] = useState('creator@okhdfcbank');
  const [isSavedUpi, setIsSavedUpi] = useState(false);

  const earnings = {
    totalRevenue: 48920,
    monthlyEarnings: 14250,
    ordersDelivered: 28,
    activeBoosts: 2,
  };

  const handleSaveUpi = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedUpi(true);
    toast(`Direct creator UPI payout route updated to: ${upiPayoutId}`, 'success');
  };

  return (
    <div className="w-full max-w-4xl px-4 py-8 flex flex-col gap-8 select-none">
      {/* Header Banner */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
            🇮🇳 Bharat Creator Economy
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
          Monetization & Storefront Hub
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Sell your products, accept instant Indian UPI payments, boost posts to local pincodes, and manage your creator earnings.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col gap-1">
          <span className="text-xs text-neutral-400 font-medium">Total Revenue (₹)</span>
          <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
            {formatINR(earnings.totalRevenue)}
          </span>
          <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-0.5">
            +32% this month <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col gap-1">
          <span className="text-xs text-neutral-400 font-medium">This Month Payout</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {formatINR(earnings.monthlyEarnings)}
          </span>
          <span className="text-[11px] text-neutral-400">Direct to Bank UPI</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col gap-1">
          <span className="text-xs text-neutral-400 font-medium">Orders Fulfilled</span>
          <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
            {earnings.ordersDelivered}
          </span>
          <span className="text-[11px] text-blue-500 font-bold">100% Pan-India COD & Prepaid</span>
        </div>

        <div className="p-4 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col gap-1">
          <span className="text-xs text-neutral-400 font-medium">Active Boosts</span>
          <span className="text-xl sm:text-2xl font-black text-amber-500">
            {earnings.activeBoosts}
          </span>
          <span className="text-[11px] text-neutral-400">Mumbai & Delhi NCR</span>
        </div>
      </div>

      {/* UPI Direct Payout Settlement Configuration */}
      <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              Direct UPI Auto-Settlement (T+1 Daily Payout)
            </h3>
            <p className="text-xs text-neutral-500">
              Payments collected from your store posts are settled directly to your Indian UPI VPA
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveUpi} className="flex items-center gap-2">
          <input
            type="text"
            value={upiPayoutId}
            onChange={(e) => setUpiPayoutId(e.target.value)}
            className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none"
          />
          <button
            type="submit"
            className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-sm transition-colors"
          >
            Save VPA
          </button>
        </form>
      </div>

      {/* Monetization Actions Trio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Tag Post for Sale */}
        <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 w-fit">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
              Tag Post as Product / Service
            </h4>
            <p className="text-xs text-neutral-500">
              Create a new post with a price tag (₹) and Buy Now CTA for immediate buyer checkout.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="w-full py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-bold text-xs text-neutral-900 dark:text-white transition-colors"
          >
            Create Store Post
          </button>
        </div>

        {/* 2. Boost Post to Local Pincodes */}
        <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 w-fit">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
              Hyperlocal City Ad Boost
            </h4>
            <p className="text-xs text-neutral-500">
              Pay ₹199 to ₹999 to show your post in users' feeds across Mumbai, Bengaluru, or specific pincodes.
            </p>
          </div>
          <button
            onClick={() => toast('Select any post on your feed or profile and tap "Boost Post"', 'info')}
            className="w-full py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 font-bold text-xs text-neutral-900 dark:text-white transition-colors"
          >
            Boost From Feed
          </button>
        </div>

        {/* 3. Verified Blue Badge */}
        <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-brand-blue w-fit">
              <ShieldCheck className="w-5 h-5 fill-brand-blue text-brand-blue" />
            </div>
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
              Get Verified Blue Tick
            </h4>
            <p className="text-xs text-neutral-500">
              Apply with Aadhaar, PAN or GSTIN for authenticity trust badge and seller protection.
            </p>
          </div>
          <button
            onClick={openVerificationModal}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-xs text-white transition-colors shadow-sm"
          >
            Apply for Blue Tick
          </button>
        </div>
      </div>

      {/* Creator Storefront Showcase */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
          Your Active Storefront Listings
        </h3>
        <StorefrontGrid />
      </div>
    </div>
  );
}
