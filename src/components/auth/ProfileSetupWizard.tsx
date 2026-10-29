'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { INDIAN_STATES, INDIAN_REGIONS } from '@/data/indianCities';
import { AccountType } from '@/types';
import { X, Check, Store, Palette, MapPin, QrCode } from 'lucide-react';

export default function ProfileSetupWizard() {
  const { user, isSetupWizardOpen, closeSetupWizard, updateProfile } = useAuth();

  const [accountType, setAccountType] = useState<AccountType>(
    user?.accountType || 'LOCAL_SELLER_ARTISAN'
  );
  const [businessName, setBusinessName] = useState(user?.businessName || 'Heritage Craft Studio');
  const [fullName, setFullName] = useState(user?.fullName || 'Rameshwar Soni');
  const [bio, setBio] = useState(
    user?.bio || 'Handcrafted traditional creations made with pride in India. Shipping Pan-India.'
  );
  const [state, setState] = useState(user?.state || 'Rajasthan');
  const [city, setCity] = useState(user?.location?.split(',')[0] || 'Jaipur');
  const [pincode, setPincode] = useState(user?.pincode || '302001');
  const [upiId, setUpiId] = useState(user?.upiId || 'artisan@okhdfcbank');

  if (!isSetupWizardOpen) return null;

  const handlePincodeChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 6);
    setPincode(clean);
    const matched = INDIAN_REGIONS.find((r) => r.pincode === clean);
    if (matched) {
      setCity(matched.city);
      setState(matched.state);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      accountType,
      businessName,
      fullName,
      bio,
      location: `${city}, ${state}`,
      state,
      pincode,
      upiId,
    });
    closeSetupWizard();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border shadow-2xl overflow-hidden p-6 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={closeSetupWizard}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-black dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center gap-1.5 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-vyapar-500/10 text-vyapar-700 dark:text-vyapar-400 flex items-center justify-center border border-vyapar-500/20 font-bold">
            व्य
          </div>
          <h2 className="text-xl font-black text-neutral-900 dark:text-white">
            Set Up Your VyaparVibe Profile
          </h2>
          <p className="text-xs text-neutral-500">
            Tell local Indian buyers about your craft, skills, and business
          </p>
        </div>

        <form onSubmit={handleSave} className="overflow-y-auto flex-1 flex flex-col gap-4 pr-1">
          {/* Account Type Selection */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Select Your Role on VyaparVibe
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAccountType('LOCAL_SELLER_ARTISAN')}
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                  accountType === 'LOCAL_SELLER_ARTISAN'
                    ? 'border-vyapar-600 bg-vyapar-50 dark:bg-vyapar-950/40 text-vyapar-800 dark:text-vyapar-200 ring-2 ring-vyapar-500/20'
                    : 'border-neutral-200 dark:border-dark-border hover:bg-neutral-50 dark:hover:bg-dark-hover text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <Store className="w-5 h-5 text-vyapar-600 dark:text-vyapar-400" />
                <div>
                  <div className="text-xs font-bold">Local Seller / Artisan</div>
                  <div className="text-[10px] text-neutral-500">Selling handcrafted goods, textiles, food</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAccountType('CREATIVE_CREATOR')}
                className={`p-3 rounded-2xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                  accountType === 'CREATIVE_CREATOR'
                    ? 'border-terracotta-600 bg-terracotta-50 dark:bg-terracotta-800/20 text-terracotta-700 dark:text-terracotta-200 ring-2 ring-terracotta-500/20'
                    : 'border-neutral-200 dark:border-dark-border hover:bg-neutral-50 dark:hover:bg-dark-hover text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <Palette className="w-5 h-5 text-terracotta-600" />
                <div>
                  <div className="text-xs font-bold">Creative Creator / Freelance</div>
                  <div className="text-[10px] text-neutral-500">Offering services, dev, design, art</div>
                </div>
              </button>
            </div>
          </div>

          {/* Business & Full Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Studio / Business Name
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Amer Blue Pottery"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rameshwar Soni"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Craft / Creator Bio
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none resize-none"
            />
          </div>

          {/* Indian State, City & 6-Digit Pincode */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-terracotta-600" /> PIN Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => handlePincodeChange(e.target.value)}
                placeholder="302001"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none font-mono"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                City / Town
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Jaipur"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                State
              </label>
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

          {/* Direct UPI Payout ID */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-vyapar-600" />
              Creator UPI ID (for instant direct buyer payments)
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. mobile@upi or artisan@okhdfcbank"
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none font-mono"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-2xl bg-vyapar-700 hover:bg-vyapar-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Check className="w-4 h-4 stroke-[3px]" /> Save & Launch Storefront
          </button>
        </form>
      </div>
    </div>
  );
}
