'use client';

import React, { useState } from 'react';
import { useFeed } from '@/context/FeedContext';
import { CATEGORIES } from '@/data/categories';
import { INDIAN_REGIONS, INDIAN_STATES } from '@/data/indianCities';
import {
  X,
  UploadCloud,
  ShoppingBag,
  MapPin,
  Check,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  Package,
  Layers,
  Sparkles,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function CreatePostModal() {
  const { isCreateModalOpen, closeCreateModal, createListing } = useFeed();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string>(
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80'
  );
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('Terracotta & Pottery');
  const [city, setCity] = useState('Jaipur');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('302001');

  // Commerce Fields
  const [isForSale, setIsForSale] = useState(true);
  const [productTitle, setProductTitle] = useState('');
  const [price, setPrice] = useState('1450');
  const [pricingUnit, setPricingUnit] = useState('per piece');
  const [materialsUsed, setMaterialsUsed] = useState('');
  const [stockQuantity, setStockQuantity] = useState('10');
  const [ctaType, setCtaType] = useState<'inquire_buy' | 'book_service' | 'whatsapp'>('inquire_buy');

  if (!isCreateModalOpen) return null;

  const samplePresets = [
    {
      label: 'Jaipur Blue Pottery',
      url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Varanasi Silk Loom',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Saharanpur Woodcarving',
      url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Kerala Hill Spices',
      url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Bengaluru Tech Dev',
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedMediaUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);
    const matched = INDIAN_REGIONS.find((r) => r.pincode === clean);
    if (matched) {
      setCity(matched.city);
      setState(matched.state);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createListing({
      mediaUrls: [selectedMediaUrl],
      mediaType: 'image',
      caption,
      category,
      location: `${city}, ${state}`,
      state,
      pincode,
      isForSale,
      product: isForSale
        ? {
            title: productTitle || 'Handcrafted Artisan Creation',
            price: Number(price) || 999,
            pricingUnit,
            currency: 'INR',
            inStock: true,
            stockQuantity: Number(stockQuantity) || 1,
            ctaType,
            category,
            materialsUsed,
            leadTimeDays: 2,
          }
        : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-light-border dark:border-dark-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep(1)}
                className="p-1 text-neutral-500 hover:text-black dark:hover:text-white mr-1"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <span className="font-bold text-base text-neutral-900 dark:text-white">
              {step === 1 ? '1. Upload Craft Media & Description' : '2. Marketplace Pricing & Pincode'}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {step === 1 ? (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-1.5 px-4 rounded-xl bg-vyapar-700 hover:bg-vyapar-800 text-white text-xs font-bold flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="py-1.5 px-4 rounded-xl bg-vyapar-700 hover:bg-vyapar-800 text-white text-xs font-bold shadow-md flex items-center gap-1 active:scale-95"
              >
                <Check className="w-4 h-4 stroke-[3px]" /> Publish Listing
              </button>
            )}

            <button
              onClick={closeCreateModal}
              className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-dark-hover"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-5 flex flex-col gap-5">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              {/* Image Preview */}
              <div className="relative w-full aspect-[16/9] max-h-[260px] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200 dark:border-dark-border flex items-center justify-center">
                <img src={selectedMediaUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>

              {/* Upload or Choose Preset */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                    Select Craft Photos / Video
                  </span>
                  <label className="cursor-pointer text-xs font-bold text-vyapar-700 dark:text-vyapar-400 hover:underline flex items-center gap-1">
                    <UploadCloud className="w-3.5 h-3.5" />
                    Upload from Device
                    <input type="file" accept="image/*,video/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {samplePresets.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => setSelectedMediaUrl(p.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedMediaUrl === p.url
                          ? 'border-vyapar-600 ring-2 ring-vyapar-500/30 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Craft Category */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Craft / Skill Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
                >
                  {CATEGORIES.filter((c) => c.slug !== 'all').map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Caption */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Craft Description / Story
                </label>
                <textarea
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Describe your craft, materials, dimensions, and dispatch timeline..."
                  className="p-3 rounded-2xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              {/* Commerce Toggle */}
              <div className="p-4 rounded-2xl bg-vyapar-50 dark:bg-vyapar-950/40 border border-vyapar-200 dark:border-vyapar-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-vyapar-700 text-white">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Tag as Marketplace Item / Service
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      Enable direct buyer inquiries, orders, and ₹ payment actions
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={isForSale}
                  onChange={(e) => setIsForSale(e.target.checked)}
                  className="w-5 h-5 accent-vyapar-600 rounded cursor-pointer"
                />
              </div>

              {isForSale && (
                <div className="flex flex-col gap-4 animate-in fade-in">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Product / Service Title
                    </label>
                    <input
                      type="text"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      placeholder="e.g. Traditional Hand-Painted Blue Pottery Jug"
                      className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                        Price (in Indian Rupees - ₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          placeholder="1450"
                          className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs font-bold text-neutral-900 dark:text-white focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                        Pricing Unit
                      </label>
                      <input
                        type="text"
                        value={pricingUnit}
                        onChange={(e) => setPricingUnit(e.target.value)}
                        placeholder="per piece / set / hour"
                        className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                        Stock / Units Available
                      </label>
                      <input
                        type="number"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value)}
                        placeholder="10"
                        className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                        CTA Action Button
                      </label>
                      <select
                        value={ctaType}
                        onChange={(e) => setCtaType(e.target.value as any)}
                        className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
                      >
                        <option value="inquire_buy">Inquire / Buy Now</option>
                        <option value="book_service">Book Service</option>
                        <option value="whatsapp">Order via WhatsApp</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Materials / Ingredients Used
                    </label>
                    <input
                      type="text"
                      value={materialsUsed}
                      onChange={(e) => setMaterialsUsed(e.target.value)}
                      placeholder="e.g. Quartz stone, natural copper oxide glaze, zero clay"
                      className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Local Pincode & City */}
              <div className="flex flex-col gap-2 pt-2 border-t border-light-border dark:border-dark-border">
                <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
                  Workshop Origin (PIN & City)
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    placeholder="PIN Code"
                    className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs font-mono text-neutral-900 dark:text-white focus:outline-none"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
                  />
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
