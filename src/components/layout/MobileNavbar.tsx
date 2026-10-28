'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Film, PlusSquare, Send, Heart, User as UserIcon } from 'lucide-react';
import { useFeed } from '@/context/FeedContext';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function MobileNavbar() {
  const pathname = usePathname();
  const { openCreateModal } = useFeed();
  const { user, openAuthModal } = useAuth();

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 px-4 flex items-center justify-between z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5">
            <div className="w-full h-full bg-white dark:bg-black rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-base bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent">
                भ
              </span>
            </div>
          </div>
          <span className="font-black text-xl tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 bg-clip-text text-transparent">
            BharatGram
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="scale-75 origin-right">
            <ThemeToggle />
          </div>
          <Link href="/notifications" className="relative p-1 text-neutral-800 dark:text-neutral-200">
            <Heart className="w-6 h-6 stroke-[1.8px]" />
            <span className="absolute 1 top-0 right-0 w-2 h-2 bg-rose-600 rounded-full" />
          </Link>
          <Link href="/messages" className="relative p-1 text-neutral-800 dark:text-neutral-200">
            <Send className="w-6 h-6 stroke-[1.8px]" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-600 rounded-full" />
          </Link>
        </div>
      </header>

      {/* Bottom Fixed Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-around px-2 z-40 pb-safe">
        <Link
          href="/"
          className={`p-2 transition-transform active:scale-90 ${
            pathname === '/' ? 'text-black dark:text-white' : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <Home className={`w-6 h-6 ${pathname === '/' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
        </Link>

        <Link
          href="/explore"
          className={`p-2 transition-transform active:scale-90 ${
            pathname === '/explore' ? 'text-black dark:text-white' : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <Compass className={`w-6 h-6 ${pathname === '/explore' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
        </Link>

        {/* Create Post Button */}
        <button
          onClick={openCreateModal}
          className="p-1 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white shadow-lg active:scale-95 transition-transform"
        >
          <PlusSquare className="w-7 h-7 stroke-[2.2px] p-0.5" />
        </button>

        <Link
          href="/reels"
          className={`p-2 transition-transform active:scale-90 ${
            pathname === '/reels' ? 'text-black dark:text-white' : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <Film className={`w-6 h-6 ${pathname === '/reels' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
        </Link>

        {user ? (
          <Link
            href="/profile"
            className="p-1.5 transition-transform active:scale-90"
          >
            <div className={`w-7 h-7 rounded-full overflow-hidden border-2 ${
              pathname === '/profile' ? 'border-neutral-900 dark:border-white' : 'border-transparent'
            }`}>
              <img
                src={user.avatar}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        ) : (
          <button
            onClick={openAuthModal}
            className="p-2 text-rose-500 active:scale-90"
          >
            <UserIcon className="w-6 h-6 stroke-[1.8px]" />
          </button>
        )}
      </nav>
    </>
  );
}

