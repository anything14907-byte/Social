'use client';

import React, { useState } from 'react';
import { useFeed } from '@/context/FeedContext';
import { INDIAN_REGIONS } from '@/data/indianCities';
import { Search, MapPin, Store, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LocalDiscoveryPage() {
  const { posts, setSelectedPincode, openInquiryModal } = useFeed();
  const [searchPincode, setSearchPincode] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('302001');

  const activePincode = searchPincode.length === 6 ? searchPincode : selectedRegion;

  const localListings = posts.filter((p) => p.pincode === activePincode);
  const regionInfo = INDIAN_REGIONS.find((r) => r.pincode === activePincode);

  return (
    <div className="w-full max-w-4xl px-4 py-6 flex flex-col gap-6 select-none">
      {/* Page Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-6 h-6 text-terracotta-600" />
          <span>Hyperlocal Artisan Discovery</span>
        </h1>
        <p className="text-xs text-neutral-500">
          Find authentic Indian craftsmen, handloom weavers, and creative studios by 6-digit PIN code.
        </p>
      </div>

      {/* Pincode Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Indian PIN Code (e.g. 302001, 221001)..."
          value={searchPincode}
          onChange={(e) => setSearchPincode(e.target.value.replace(/\D/g, ''))}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border text-xs sm:text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-vyapar-600 font-mono"
        />
      </div>

      {/* Popular Craft Clusters Pills */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
          Famous Indian Craft Hubs
        </span>
        <div className="flex flex-wrap gap-2">
          {INDIAN_REGIONS.map((r) => (
            <button
              key={r.pincode}
              onClick={() => {
                setSelectedRegion(r.pincode);
                setSearchPincode('');
              }}
              className={`py-2 px-3.5 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activePincode === r.pincode
                  ? 'border-vyapar-600 bg-vyapar-700 text-white shadow-xs'
                  : 'border-light-border dark:border-dark-border bg-white dark:bg-dark-card text-neutral-700 dark:text-neutral-300 hover:border-vyapar-500'
              }`}
            >
              <MapPin className="w-3 h-3 text-terracotta-500" />
              <span>{r.city} ({r.pincode})</span>
              <span className="text-[10px] opacity-75 font-normal">• {r.craftSpecialty}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Cluster Info Card */}
      {regionInfo && (
        <div className="p-4 rounded-3xl bg-vyapar-50 dark:bg-vyapar-950/40 border border-vyapar-200/80 dark:border-vyapar-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-vyapar-700 text-white">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                {regionInfo.city}, {regionInfo.state} (PIN {regionInfo.pincode})
              </h3>
              <p className="text-xs text-vyapar-800 dark:text-vyapar-300">
                Specialty Heritage: <strong>{regionInfo.craftSpecialty}</strong>
              </p>
            </div>
          </div>

          <Link
            href="/"
            onClick={() => setSelectedPincode(regionInfo.pincode)}
            className="py-1.5 px-3.5 rounded-xl bg-white dark:bg-dark-card border border-vyapar-300 dark:border-vyapar-700 text-xs font-bold text-vyapar-800 dark:text-vyapar-300 hover:bg-neutral-50 flex items-center gap-1"
          >
            Filter Home Feed <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Local Products & Artisans Grid */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
          Active Local Listings in PIN {activePincode} ({localListings.length})
        </h3>

        {localListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {localListings.map((listing) => (
              <div
                key={listing.id}
                className="p-4 rounded-3xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border flex flex-col justify-between gap-3"
              >
                <div className="flex gap-3">
                  <img
                    src={listing.mediaUrls[0]}
                    alt={listing.caption}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-vyapar-700 dark:text-vyapar-400 uppercase">
                      {listing.category}
                    </span>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">
                      {listing.product?.title || listing.caption}
                    </h4>
                    <span className="text-xs text-neutral-500 mt-0.5">
                      {listing.author.businessName || listing.author.fullName}
                    </span>
                    {listing.product && (
                      <span className="text-sm font-black text-neutral-900 dark:text-white mt-1">
                        ₹{listing.product.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-dark-border">
                  <Link
                    href={`/${listing.author.username}`}
                    className="text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:underline"
                  >
                    Visit Artisan
                  </Link>
                  <button
                    onClick={() => openInquiryModal(listing)}
                    className="py-1.5 px-3.5 rounded-xl bg-vyapar-700 hover:bg-vyapar-800 text-white font-bold text-xs"
                  >
                    Inquire / Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-3xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border text-xs text-neutral-500">
            No listings yet in PIN {activePincode}. Be the first artisan to add your workshop!
          </div>
        )}
      </div>
    </div>
  );
}
