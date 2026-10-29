'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, ArrowRight, CheckCircle2, ShieldCheck, Store } from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    loginWithEmail,
    sendMobileOtp,
    verifyMobileOtp,
    openSetupWizard,
  } = useAuth();

  const [authMode, setAuthMode] = useState<'otp' | 'email'>('otp');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await sendMobileOtp(mobileNumber);
    setIsLoading(false);
    if (res.success) {
      setOtpSent(true);
      if (res.testOtp) setOtpCode(res.testOtp);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const ok = await verifyMobileOtp(otpCode);
    setIsLoading(false);
    if (ok) {
      openSetupWizard();
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    await loginWithEmail(email);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border shadow-2xl overflow-hidden p-6">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-black dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-vyapar-700 text-white flex items-center justify-center shadow-md font-bold text-xl">
            व्य
          </div>
          <div>
            <h2 className="text-xl font-black text-neutral-900 dark:text-white">
              VyaparVibe
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Empowering India's local creators, artisans & small businesses
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-neutral-100 dark:bg-dark-hover rounded-2xl mb-5 text-xs font-bold">
          <button
            onClick={() => {
              setAuthMode('otp');
              setOtpSent(false);
            }}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'otp'
                ? 'bg-white dark:bg-dark-surface text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-500'
            }`}
          >
            🇮🇳 Indian Mobile OTP
          </button>
          <button
            onClick={() => setAuthMode('email')}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'email'
                ? 'bg-white dark:bg-dark-surface text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-500'
            }`}
          >
            Email Login
          </button>
        </div>

        {/* 1. Indian Mobile (+91) OTP Flow */}
        {authMode === 'otp' && (
          <div className="flex flex-col gap-4">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Indian Mobile Number
                  </label>
                  <div className="flex items-center rounded-2xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border overflow-hidden focus-within:border-vyapar-600">
                    <span className="px-3.5 py-3 text-sm font-bold text-neutral-700 dark:text-neutral-300 border-r border-neutral-200 dark:border-dark-border bg-neutral-200/50 dark:bg-dark-surface">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      placeholder="98290 12345"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-3 py-3 bg-transparent text-sm font-semibold text-neutral-900 dark:text-white focus:outline-none placeholder-neutral-400 font-mono"
                    />
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    Instant 6-digit verification code will be sent to your phone
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-vyapar-700 hover:bg-vyapar-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  {isLoading ? 'Sending OTP...' : 'Send Verification OTP'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 animate-in fade-in">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Enter 6-Digit OTP Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-xs text-vyapar-600 hover:underline"
                    >
                      Change Phone
                    </button>
                  </div>

                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    className="w-full p-3.5 text-center tracking-widest text-lg font-black rounded-2xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-neutral-900 dark:text-white focus:outline-none focus:border-vyapar-600 font-mono"
                  />
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold text-center">
                    ✓ Test OTP prefilled: 123456
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Continue'} <CheckCircle2 className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* 2. Email Login */}
        {authMode === 'email' && (
          <form onSubmit={handleEmailLogin} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="artisan@vyaparvibe.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-2xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-2xl bg-neutral-100 dark:bg-dark-hover border border-neutral-200 dark:border-dark-border text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 w-full py-3.5 rounded-2xl bg-vyapar-800 hover:bg-vyapar-900 text-white font-bold text-sm shadow-md active:scale-95 transition-transform"
            >
              {isLoading ? 'Logging In...' : 'Sign In'}
            </button>
          </form>
        )}

        <div className="mt-5 pt-3 border-t border-neutral-200 dark:border-dark-border flex items-center justify-center gap-2 text-[11px] text-neutral-500">
          <ShieldCheck className="w-3.5 h-3.5 text-vyapar-600" />
          <span>Verified Local Indian Commerce Protection</span>
        </div>
      </div>
    </div>
  );
}
