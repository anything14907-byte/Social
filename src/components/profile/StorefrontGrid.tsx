'use client';

import React from 'react';
import { STOREFRONT_ITEMS } from '@/data/seedData';
import { formatINR } from '@/lib/utils';
import { useFeed } from '@/context/FeedContext';
import { ShoppingBag, Star, ShieldCheck, ArrowUpRight, Truck } from 'lucide-react';

export default function StorefrontGrid() {
  const { openInquiryModal, posts } = useFeed();

  // Find corresponding full post or create fallback
  const handleItemClick = (item: typeof STOREFRONT_ITEMS[0]) => {
    const matched = posts.find((p) => p.product?.title.includes(item.title.split(' ')[0]));
    if (matched) {
      openInquiryModal(matched);
    } else if (posts[0]) {
      openInquiryModal({
        ...posts[0],
        product: {
          title: item.title,
          price: item.price,
          currency: 'INR',
          inStock: item.inStock,
          ctaType: 'inquire_buy',
          category: item.category,
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Store Banner */}
      <div className="p-4 rounded-3xl bg-vyapar-50 dark:bg-vyapar-950/40 border border-vyapar-200/80 dark:border-vyapar-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-vyapar-700 text-white">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <span>Direct Artisan Catalog & Orders</span>
              <ShieldCheck className="w-4 h-4 text-vyapar-600 dark:text-vyapar-400" />
            </h3>
            <p className="text-[11px] text-neutral-500">
              Dispatched directly from the maker’s workshop • Pan-India shipping & Cash on Delivery available
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 w-fit">
          ✓ Verified Artisan Guarantee
        </span>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {STOREFRONT_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl overflow-hidden border border-light-border dark:border-dark-border bg-white dark:bg-dark-card flex flex-col justify-between hover:border-vyapar-600/60 transition-all shadow-xs"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                {item.category}
              </span>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{item.rating}</span>
                  </div>
                  <span>{item.salesCount} sold</span>
                </div>

                <h4 className="font-bold text-sm text-neutral-900 dark:text-white line-clamp-2 leading-snug">
                  {item.title}
                </h4>

                <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-1">
                  <Truck className="w-3 h-3 text-neutral-400" />
                  <span>{item.leadTime}</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-dark-border">
                <div className="flex flex-col">
                  <span className="text-base font-black text-neutral-900 dark:text-white">
                    {formatINR(item.price)}
                  </span>
                  <span className="text-[11px] line-through text-neutral-400">
                    {formatINR(item.originalPrice)}
                  </span>
                </div>

                <button
                  onClick={() => handleItemClick(item)}
                  className="py-2 px-4 rounded-xl bg-vyapar-700 hover:bg-vyapar-800 text-white font-bold text-xs shadow-sm transition-all active:scale-95 flex items-center gap-1"
                >
                  <span>Inquire / Buy</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
