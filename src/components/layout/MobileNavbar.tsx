'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPin, PlaySquare, Store, PlusCircle, MessageSquare } from 'lucide-react';
import { useFeed } from '@/context/FeedContext';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function MobileNavbar() {
  const pathname = usePathname();
  const { openCreateModal } = useFeed();
  const { user, openAuthModal } = useAuth();

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border-b border-light-border dark:border-dark-border px-4 flex items-center justify-between z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-vyapar-700 text-white font-bold text-base flex items-center justify-center">
            व्य
          </div>
          <span className="font-black text-xl tracking-tight text-neutral-900 dark:text-white">
            VyaparVibe
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="scale-75 origin-right">
            <ThemeToggle />
          </div>
          <Link href="/messages" className="relative p-1 text-neutral-800 dark:text-neutral-200">
            <MessageSquare className="w-5 h-5 stroke-[1.8px]" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-terracotta-600 rounded-full" />
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-lg border-t border-light-border dark:border-dark-border flex items-center justify-around px-2 z-40 pb-safe">
        <Link
          href="/"
          className={`p-2 transition-transform active:scale-90 ${
            pathname === '/' ? 'text-vyapar-700 dark:text-vyapar-400' : 'text-neutral-500'
          }`}
        >
          <Home className={`w-6 h-6 ${pathname === '/' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
        </Link>

        <Link
          href="/discovery"
          className={`p-2 transition-transform active:scale-90 ${
            pathname === '/discovery' ? 'text-vyapar-700 dark:text-vyapar-400' : 'text-neutral-500'
          }`}
        >
          <MapPin className={`w-6 h-6 ${pathname === '/discovery' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
        </Link>

        {/* Center Add Listing Button */}
        <button
          onClick={openCreateModal}
          className="p-1 rounded-2xl bg-vyapar-700 text-white shadow-lg active:scale-95 transition-transform"
        >
          <PlusCircle className="w-7 h-7 stroke-[2.2px] p-0.5" />
        </button>

        <Link
          href="/showcase"
          className={`p-2 transition-transform active:scale-90 ${
            pathname === '/showcase' ? 'text-vyapar-700 dark:text-vyapar-400' : 'text-neutral-500'
          }`}
        >
          <PlaySquare className={`w-6 h-6 ${pathname === '/showcase' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
        </Link>

        {user ? (
          <Link
            href="/storefront"
            className={`p-1.5 transition-transform active:scale-90 ${
              pathname === '/storefront' ? 'text-vyapar-700 dark:text-vyapar-400' : 'text-neutral-500'
            }`}
          >
            <Store className={`w-6 h-6 ${pathname === '/storefront' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
          </Link>
        ) : (
          <button onClick={openAuthModal} className="p-2 text-vyapar-700 active:scale-90">
            <Store className="w-6 h-6 stroke-[1.8px]" />
          </button>
        )}
      </nav>
    </>
  );
}
