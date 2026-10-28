'use client';

import React from 'react';
import { STOREFRONT_PRODUCTS } from '@/data/seedData';
import { formatINR } from '@/lib/utils';
import { useFeed } from '@/context/FeedContext';
import { ShoppingBag, Star, Zap, ShieldCheck } from 'lucide-react';

export default function StorefrontGrid() {
  const { openCheckout } = useFeed();

  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Store Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/20 dark:border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white shadow-md">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-neutral-900 dark:text-white flex items-center gap-1.5">
              Creator Storefront & Services
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Direct checkout powered by Razorpay • Instant UPI, Cards, NetBanking
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            ✓ 100% Buyer Protection
          </span>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {STOREFRONT_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="group rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-xs"
          >
            {/* Product Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
              <img
                src={prod.image}
                alt={prod.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full border border-white/20">
                {prod.category}
              </span>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{prod.rating}</span>
                  </div>
                  <span>{prod.salesCount} sold</span>
                </div>

                <h4 className="font-bold text-sm text-neutral-900 dark:text-white line-clamp-2 leading-snug">
                  {prod.title}
                </h4>
              </div>

              {/* Price & Buy Now CTA */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex flex-col">
                  <span className="text-base font-black text-neutral-900 dark:text-white">
                    {formatINR(prod.price)}
                  </span>
                  <span className="text-[11px] line-through text-neutral-400">
                    {formatINR(prod.originalPrice)}
                  </span>
                </div>

                <button
                  onClick={() =>
                    openCheckout(
                      {
                        title: prod.title,
                        price: prod.price,
                        currency: 'INR',
                        ctaType: 'buy_now',
                        inStock: true,
                      },
                      'Aarav Sharma Handcrafts'
                    )
                  }
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>{prod.cta}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

