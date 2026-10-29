'use client';

import React, { useState } from 'react';
import { useFeed } from '@/context/FeedContext';
import { formatINR } from '@/lib/utils';
import {
  X,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  MapPin,
  Phone,
  QrCode,
  CreditCard,
} from 'lucide-react';

export default function OrderInquiryModal() {
  const { selectedListingForInquiry, closeInquiryModal, submitOrderInquiry } = useFeed();

  const [buyerName, setBuyerName] = useState('Ananya Sharma');
  const [buyerPhone, setBuyerPhone] = useState('9812345678');
  const [buyerCity, setBuyerCity] = useState('New Delhi');
  const [buyerPincode, setBuyerPincode] = useState('110001');
  const [buyerAddress, setBuyerAddress] = useState('B-12, Green Park Main');
  const [customNotes, setCustomNotes] = useState('');
  const [paymentOption, setPaymentOption] = useState<'UPI' | 'COD' | 'WHATSAPP'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!selectedListingForInquiry || !selectedListingForInquiry.product) return null;

  const product = selectedListingForInquiry.product;
  const seller = selectedListingForInquiry.author;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      submitOrderInquiry({
        listingId: selectedListingForInquiry.id,
        listingTitle: product.title,
        listingImage: selectedListingForInquiry.mediaUrls[0],
        sellerId: seller.id,
        sellerName: seller.businessName || seller.fullName,
        buyerName,
        buyerPhone: `+91 ${buyerPhone}`,
        buyerCity,
        buyerPincode,
        buyerAddress,
        amount: product.price,
        message: customNotes,
        inquiryType: product.ctaType === 'book_service' ? 'SERVICE_BOOKING' : 'PURCHASE',
      });
    }, 1200);
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Namaste! I saw your "${product.title}" on VyaparVibe (₹${product.price}). I'm interested in placing an order for delivery to ${buyerCity} (${buyerPincode}).`
    );
    window.open(`https://wa.me/919829012345?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="bg-vyapar-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-vyapar-800 flex items-center justify-center border border-vyapar-700">
              <ShoppingBag className="w-4 h-4 text-vyapar-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-1.5">
                <span>Direct Artisan Inquiry & Order</span>
              </h3>
              <p className="text-[11px] text-vyapar-300">
                Direct buyer-to-artisan connection • 0% Middleman markup
              </p>
            </div>
          </div>

          <button
            onClick={closeInquiryModal}
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div className="p-8 flex flex-col items-center text-center gap-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-vyapar-100 dark:bg-vyapar-950 text-vyapar-700 dark:text-vyapar-400 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Inquiry Placed Successfully! 🎉
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm">
                Your order request for <strong className="text-neutral-800 dark:text-neutral-200">{product.title}</strong> has been transmitted directly to {seller.businessName || seller.fullName}.
              </p>
            </div>

            <div className="w-full p-4 rounded-2xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs flex flex-col gap-2 text-left">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order Amount</span>
                <span className="font-bold text-neutral-900 dark:text-white">{formatINR(product.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Destination</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{buyerCity} ({buyerPincode})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Artisan Workshop</span>
                <span className="font-semibold text-neutral-900 dark:text-white">{seller.location}</span>
              </div>
            </div>

            <button
              onClick={openWhatsAppDirect}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp for Fast Dispatch</span>
            </button>

            <button
              onClick={closeInquiryModal}
              className="w-full py-2.5 rounded-xl border border-neutral-300 dark:border-dark-border text-neutral-700 dark:text-neutral-300 font-semibold text-xs"
            >
              Back to Home Feed
            </button>
          </div>
        ) : (
          /* Form Body */
          <form onSubmit={handleInquirySubmit} className="overflow-y-auto p-5 flex flex-col gap-4 flex-1">
            {/* Listing Summary Preview */}
            <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border flex items-center gap-3">
              <img
                src={selectedListingForInquiry.mediaUrls[0]}
                alt={product.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 flex flex-col">
                <span className="text-[10px] font-bold text-vyapar-700 dark:text-vyapar-400 uppercase tracking-wider">
                  {selectedListingForInquiry.category}
                </span>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">
                  {product.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-black text-neutral-900 dark:text-white">
                    {formatINR(product.price)}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    by {seller.businessName || seller.fullName}
                  </span>
                </div>
              </div>
            </div>

            {/* Buyer Contact Details */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-vyapar-600" />
                Buyer Information
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
                />

                <div className="flex items-center rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border overflow-hidden">
                  <span className="px-2 text-xs font-bold text-neutral-500">🇮🇳 +91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98123 45678"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full p-2.5 bg-transparent text-xs text-neutral-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address & Pincode */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
                Delivery Location
              </span>

              <input
                type="text"
                required
                placeholder="Street Address / Flat No."
                value={buyerAddress}
                onChange={(e) => setBuyerAddress(e.target.value)}
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="City (e.g. New Delhi)"
                  value={buyerCity}
                  onChange={(e) => setBuyerCity(e.target.value)}
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
                />
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="PIN Code (e.g. 110001)"
                  value={buyerPincode}
                  onChange={(e) => setBuyerPincode(e.target.value)}
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Custom Notes / Questions */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Custom Notes for Artisan (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Please customize size or pack with gift paper for a festival..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none resize-none"
              />
            </div>

            {/* Preferred Payment Method */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Preferred Payment Channel
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'UPI', label: 'UPI / QR', icon: QrCode },
                  { id: 'COD', label: 'Cash on Delivery', icon: Truck },
                  { id: 'WHATSAPP', label: 'WhatsApp Chat', icon: MessageCircle },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentOption(m.id as any)}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-[11px] font-bold transition-all ${
                        paymentOption === m.id
                          ? 'border-vyapar-600 bg-vyapar-50 dark:bg-vyapar-950/40 text-vyapar-800 dark:text-vyapar-300 ring-2 ring-vyapar-500/20'
                          : 'border-neutral-200 dark:border-dark-border text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 w-full py-3.5 rounded-2xl bg-vyapar-700 hover:bg-vyapar-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Transmitting Inquiry to Artisan...</span>
              ) : (
                <>
                  <span>Confirm Order / Inquiry ({formatINR(product.price)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
