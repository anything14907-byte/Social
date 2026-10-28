'use client';

import React, { useState } from 'react';
import { useFeed } from '@/context/FeedContext';
import { useToast } from '@/context/ToastContext';
import { INDIAN_CITIES } from '@/data/indianCities';
import {
  X,
  UploadCloud,
  Image as ImageIcon,
  Crop,
  Sparkles,
  MapPin,
  Tag,
  DollarSign,
  Check,
  ChevronRight,
  ChevronLeft,
  ShoppingBag,
  Sliders,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function CreatePostModal() {
  const { isCreateModalOpen, closeCreateModal, createPost } = useFeed();
  const { toast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string>(
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80'
  );
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:5' | '16:9'>('4:5');
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [caption, setCaption] = useState('');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [pincode, setPincode] = useState('400050');
  const [commentsDisabled, setCommentsDisabled] = useState(false);
  const [hideLikes, setHideLikes] = useState(false);

  // Monetization fields
  const [isMonetized, setIsMonetized] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('999');
  const [ctaType, setCtaType] = useState<'buy_now' | 'book_service' | 'order_whatsapp'>('buy_now');

  if (!isCreateModalOpen) return null;

  const samplePresets = [
    {
      label: 'Taj Mahal Sunrise',
      url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Jaipur Handloom Saree',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Old Delhi Chaat',
      url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Himalayan Ridge',
      url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Terracotta Pottery',
      url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const filterStyles: Record<string, string> = {
    none: '',
    warm: 'sepia(30%) saturate(140%) contrast(105%)',
    bollywood: 'contrast(120%) saturate(160%) brightness(105%)',
    vintage: 'sepia(50%) contrast(110%) brightness(95%)',
    monochrome: 'grayscale(100%) contrast(120%)',
  };

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

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const found = INDIAN_CITIES.find((c) => c.city === cityName);
    if (found) {
      setPincode(found.samplePincode);
    }
  };

  const insertHashtag = (tag: string) => {
    setCaption((prev) => (prev ? `${prev} ${tag}` : tag));
  };

  const handleSubmit = () => {
    createPost({
      mediaUrls: [selectedMediaUrl],
      mediaType: 'image',
      aspectRatio,
      caption,
      location: `${selectedCity}, India`,
      pincode,
      commentsDisabled,
      hideLikes,
      isMonetized,
      product: isMonetized
        ? {
            title: productTitle || 'Featured Creator Product',
            price: Number(productPrice) || 499,
            currency: 'INR',
            ctaType,
            inStock: true,
          }
        : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as any)}
                className="p-1 text-neutral-500 hover:text-black dark:hover:text-white mr-1"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <span className="font-bold text-base text-neutral-900 dark:text-white">
              {step === 1 && '1. Choose Media & Crop'}
              {step === 2 && '2. Write Caption & Location'}
              {step === 3 && '3. Monetization & Commerce Tag'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {step < 3 ? (
              <button
                onClick={() => setStep((s) => (s + 1) as any)}
                className="py-1 px-3.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-bold hover:opacity-90 flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="py-1.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-bold shadow-md hover:from-amber-600 hover:to-rose-700 flex items-center gap-1 active:scale-95 transition-transform"
              >
                <Check className="w-4 h-4 stroke-[3px]" /> Share Post
              </button>
            )}

            <button
              onClick={closeCreateModal}
              className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 p-5 flex flex-col gap-5">
          {/* STEP 1: Media, Aspect Ratio & Filters */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              {/* Image Preview Container */}
              <div
                className={`relative w-full rounded-2xl overflow-hidden bg-neutral-950 flex items-center justify-center border border-neutral-300 dark:border-neutral-800 ${
                  aspectRatio === '1:1'
                    ? 'aspect-square max-h-[360px]'
                    : aspectRatio === '4:5'
                    ? 'aspect-[4/5] max-h-[420px]'
                    : 'aspect-video max-h-[300px]'
                }`}
              >
                <img
                  src={selectedMediaUrl}
                  alt="Post preview"
                  style={{ filter: filterStyles[selectedFilter] }}
                  className="w-full h-full object-cover transition-all"
                />

                {/* Aspect Ratio Floating Switch */}
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md rounded-xl p-1 flex items-center gap-1 z-10 border border-white/20">
                  {(['1:1', '4:5', '16:9'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${
                        aspectRatio === ratio
                          ? 'bg-white text-black'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Custom File or Select Presets */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Select Media or Upload
                  </span>
                  <label className="cursor-pointer text-xs font-bold text-rose-500 hover:underline flex items-center gap-1">
                    <UploadCloud className="w-3.5 h-3.5" />
                    Upload from Computer
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {samplePresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setSelectedMediaUrl(preset.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedMediaUrl === preset.url
                          ? 'border-rose-500 ring-2 ring-rose-500/30 scale-105'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Indian Style Photo Filters */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Color Grading & Filters
                </span>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  {[
                    { id: 'none', label: 'Normal' },
                    { id: 'warm', label: 'Jaipur Sun' },
                    { id: 'bollywood', label: 'Bollywood Glow' },
                    { id: 'vintage', label: 'Old Bombay' },
                    { id: 'monochrome', label: 'Monochrome' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFilter(f.id)}
                      className={`py-2 px-1 rounded-xl border text-xs font-medium transition-all ${
                        selectedFilter === f.id
                          ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
                          : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Caption, Hashtags & Indian Location Tagging */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              {/* Caption Textarea */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Post Caption
                </label>
                <textarea
                  rows={4}
                  placeholder="Write a caption... (e.g. Exploring the vibrant streets of Jaipur ✨ #VocalForLocal)"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              {/* Hashtag Suggestions */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  '#IncredibleIndia',
                  '#VocalForLocal',
                  '#DesiVibes',
                  '#MakeInIndia',
                  '#StreetFoodIndia',
                  '#StartupBharat',
                  '#FestiveSeason',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => insertHashtag(tag)}
                    className="text-xs py-1 px-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-rose-500/20 hover:text-rose-500 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Indian City & Pincode Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    Indian City / Region
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none"
                  >
                    {INDIAN_CITIES.map((c) => (
                      <option key={c.city} value={c.city}>
                        {c.city}, {c.state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    PIN Code (6 digits)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 400050"
                    className="w-full p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="flex flex-col gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5" />
                  Advanced Settings
                </span>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                      Hide Likes and View Counts
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Only you will see total likes and view counts on this post
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hideLikes}
                    onChange={(e) => setHideLikes(e.target.checked)}
                    className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">
                      Turn Off Commenting
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Prevent viewers from leaving new comments
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={commentsDisabled}
                    onChange={(e) => setCommentsDisabled(e.target.checked)}
                    className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Monetization & Creator Commerce */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              {/* Monetization Toggle Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-sm">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white">
                      Tag as Product / Service for Sale
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      Sell handlooms, art, services or digital goods with instant Razorpay ₹ checkout
                    </div>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isMonetized}
                    onChange={(e) => setIsMonetized(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                </label>
              </div>

              {/* Monetization Configuration Fields */}
              {isMonetized ? (
                <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Product / Service Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Royal Peacock Banarasi Silk Saree"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        Price (in Indian Rupees - ₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-500">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="1"
                          placeholder="999"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-bold text-neutral-900 dark:text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        CTA Button Label
                      </label>
                      <select
                        value={ctaType}
                        onChange={(e) => setCtaType(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none"
                      >
                        <option value="buy_now">Buy Now (Razorpay)</option>
                        <option value="book_service">Book Service / Consultation</option>
                        <option value="order_whatsapp">Order via WhatsApp</option>
                      </select>
                    </div>
                  </div>

                  {/* Summary Preview Box */}
                  <div className="p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">
                        {productTitle || 'Untangled Product Title'}
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        Ready for instant Pan-India payment via UPI (GPay, PhonePe, Paytm)
                      </div>
                    </div>
                    <div className="text-sm font-extrabold text-neutral-900 dark:text-white">
                      {formatINR(Number(productPrice) || 0)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-400 text-xs flex flex-col items-center gap-2">
                  <ShoppingBag className="w-8 h-8 stroke-1 text-neutral-400" />
                  <span>
                    No product attached. This post will be published as a standard social post.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

