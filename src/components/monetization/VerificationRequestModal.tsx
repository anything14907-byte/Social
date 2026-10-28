'use client';

import React, { useState } from 'react';
import { useFeed } from '@/context/FeedContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  X,
  ShieldCheck,
  FileText,
  Upload,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';

export default function VerificationRequestModal() {
  const { isVerificationModalOpen, closeVerificationModal } = useFeed();
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState(user?.fullName || 'Aarav Sharma');
  const [docType, setDocType] = useState<'aadhaar' | 'pan' | 'gstin' | 'passport'>('aadhaar');
  const [docNumber, setDocNumber] = useState('XXXX-XXXX-4921');
  const [category, setCategory] = useState('Creator / Digital Influencer');
  const [socialLink, setSocialLink] = useState('https://instagram.com/aarav_sharma');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  if (!isVerificationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsApproved(true);
      updateProfile({ isVerified: true });
      toast('Verification application approved! Blue badge activated on your profile 🇮🇳✨', 'success');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-brand-blue border border-blue-500/20">
              <ShieldCheck className="w-5 h-5 fill-brand-blue text-brand-blue" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-1.5">
                Apply for BharatGram Verified Badge
                <ShieldCheck className="w-4 h-4 fill-brand-blue text-brand-blue" />
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Government KYC & Creator Authenticity Verification
              </p>
            </div>
          </div>

          <button
            onClick={closeVerificationModal}
            className="p-1.5 text-neutral-400 hover:text-black dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isApproved ? (
          <div className="p-8 flex flex-col items-center text-center gap-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/60 text-brand-blue flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 fill-brand-blue text-brand-blue" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Application Approved! 🇮🇳
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Your identity has been verified via Bharat KYC. The blue verification checkmark is now active across your posts, stories, and reels.
              </p>
            </div>

            <button
              onClick={closeVerificationModal}
              className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-sm shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-5 flex flex-col gap-4 flex-1">
            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-2.5 text-xs text-blue-900 dark:text-blue-200">
              <Lock className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              <span>
                Verified creators on BharatGram get boosted reach, priority support, and verified store trust badges for direct customer payments.
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Full Legal Name (as per Govt ID)
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Document Type
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
                >
                  <option value="aadhaar">Aadhaar Card (UIDAI)</option>
                  <option value="pan">PAN Card (Income Tax)</option>
                  <option value="gstin">GSTIN Certificate (Business)</option>
                  <option value="passport">Indian Passport</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Document ID Number
                </label>
                <input
                  type="text"
                  required
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  placeholder="e.g. 5432-8765-9012"
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Creator / Public Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
              >
                <option>Creator / Digital Influencer</option>
                <option>Handloom & Indian Artisan Brand</option>
                <option>Journalist / News Reporter</option>
                <option>Artist, Musician & Performer</option>
                <option>Startup Founder / Business</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Primary Social or Media Link
              </label>
              <input
                type="url"
                value={socialLink}
                onChange={(e) => setSocialLink(e.target.value)}
                placeholder="https://youtube.com/@channel or website"
                className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="p-3 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl flex flex-col items-center justify-center gap-1.5 text-center text-xs text-neutral-500">
              <Upload className="w-5 h-5 text-neutral-400" />
              <span>Upload Front Photo of Govt ID (JPEG / PNG / PDF)</span>
              <span className="text-[10px] text-neutral-400">Encrypted according to DPDP India standards</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-3.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 fill-white" />
                  <span>Submit KYC for Verification</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
