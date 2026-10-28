'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { INDIAN_CITIES } from '@/data/indianCities';
import { X, Camera, MapPin, Check, Sparkles } from 'lucide-react';

export default function ProfileSetupWizard() {
  const { user, isSetupWizardOpen, closeSetupWizard, updateProfile } = useAuth();

  const [username, setUsername] = useState(user?.username || 'indian_creator');
  const [fullName, setFullName] = useState(user?.fullName || 'Desi Creator');
  const [bio, setBio] = useState(user?.bio || 'Proud creator from India 🇮🇳\nCreating stories & sharing local crafts ✨');
  const [city, setCity] = useState(user?.location?.split(',')[0] || 'Mumbai');
  const [pincode, setPincode] = useState(user?.pincode || '400050');
  const [avatar, setAvatar] = useState(
    user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );

  if (!isSetupWizardOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCityChange = (cityName: string) => {
    setCity(cityName);
    const found = INDIAN_CITIES.find((c) => c.city === cityName);
    if (found) {
      setPincode(found.samplePincode);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      username,
      fullName,
      bio,
      location: `${city}, India`,
      pincode,
      avatar,
    });
    closeSetupWizard();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-6">
        <button
          onClick={closeSetupWizard}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-black dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center gap-1.5 mb-6">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-neutral-900 dark:text-white">
            Set Up Your BharatGram Profile
          </h2>
          <p className="text-xs text-neutral-500">
            Customize your identity and connect with local creators in your city
          </p>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600">
              <div className="w-full h-full rounded-full border-2 border-white dark:border-black overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-rose-600 text-white shadow-md cursor-pointer hover:scale-105 transition-transform">
                <Camera className="w-3.5 h-3.5" />
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>
            <span className="text-[11px] text-neutral-400">Tap icon to change photo</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              Bio
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none resize-none"
            />
          </div>

          {/* Indian Location & Pincode */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500" /> City
              </label>
              <select
                value={city}
                onChange={(e) => handleCityChange(e.target.value)}
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
              >
                {INDIAN_CITIES.map((c) => (
                  <option key={c.city} value={c.city}>
                    {c.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                PIN Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Check className="w-4 h-4 stroke-[3px]" /> Save & Start Exploring
          </button>
        </form>
      </div>
    </div>
  );
}

