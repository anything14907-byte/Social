'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Phone, Mail, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    loginWithEmail,
    sendMobileOtp,
    verifyMobileOtp,
    loginWithGoogle,
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
      // Prompt user with setup wizard
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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden p-6">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* BharatGram Header */}
        <div className="flex flex-col items-center text-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-lg">
            <div className="w-full h-full bg-white dark:bg-black rounded-[14px] flex items-center justify-center">
              <span className="font-extrabold text-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent">
                भ
              </span>
            </div>
          </div>
          <h2 className="text-xl font-black text-neutral-900 dark:text-white">
            Welcome to BharatGram
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            India's creative social network & creator marketplace 🇮🇳
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl mb-5 text-xs font-bold">
          <button
            onClick={() => {
              setAuthMode('otp');
              setOtpSent(false);
            }}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'otp'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-500'
            }`}
          >
            🇮🇳 Indian Mobile OTP
          </button>
          <button
            onClick={() => setAuthMode('email')}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'email'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-500'
            }`}
          >
            Email & Password
          </button>
        </div>

        {/* 1. Indian Mobile Number OTP Flow */}
        {authMode === 'otp' && (
          <div className="flex flex-col gap-4">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Indian Mobile Number
                  </label>
                  <div className="flex items-center rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden focus-within:border-rose-500">
                    <span className="px-3.5 py-3 text-sm font-bold text-neutral-700 dark:text-neutral-300 border-r border-neutral-200 dark:border-neutral-700 bg-neutral-200/50 dark:bg-neutral-800/80">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      placeholder="98765 43210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-3 py-3 bg-transparent text-sm font-semibold text-neutral-900 dark:text-white focus:outline-none placeholder-neutral-400"
                    />
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    You will receive an SMS OTP for instant login
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  {isLoading ? 'Sending SMS...' : 'Get OTP Code'} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 animate-in fade-in">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                      Enter 6-Digit Verification Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-xs text-rose-500 hover:underline"
                    >
                      Change Number
                    </button>
                  </div>

                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    className="w-full p-3.5 text-center tracking-widest text-lg font-black rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:border-rose-500"
                  />
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold text-center">
                    ✓ Test OTP prefilled: 123456
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Log In'} <CheckCircle2 className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}

        {/* 2. Email & Password Flow */}
        {authMode === 'email' && (
          <form onSubmit={handleEmailLogin} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="creator@bharatgram.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
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
                className="w-full p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 w-full py-3.5 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition-transform"
            >
              {isLoading ? 'Logging In...' : 'Sign In with Email'}
            </button>
          </form>
        )}

        {/* Or Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-neutral-200 dark:border-neutral-800 flex-1" />
          <span className="text-[11px] font-semibold text-neutral-400">OR</span>
          <div className="h-px bg-neutral-200 dark:border-neutral-800 flex-1" />
        </div>

        {/* Google OAuth Login Button */}
        <button
          onClick={loginWithGoogle}
          className="w-full py-3 px-4 rounded-2xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-bold flex items-center justify-center gap-2.5 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

