'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  MapPin,
  PlaySquare,
  Store,
  MessageSquare,
  User as UserIcon,
  PlusCircle,
  ShieldCheck,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useFeed } from '@/context/FeedContext';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Sidebar() {
  const pathname = usePathname();
  const { openCreateModal } = useFeed();
  const { user, openAuthModal, logout } = useAuth();

  const navItems = [
    { label: 'Home Feed', href: '/', icon: Home },
    { label: 'Local Discovery', href: '/discovery', icon: MapPin, badge: 'PIN' },
    { label: 'Short Showcase', href: '/showcase', icon: PlaySquare, badge: 'Live Craft' },
    { label: 'My Storefront', href: '/storefront', icon: Store, badge: '₹ Orders' },
    { label: 'Inquiries & DMs', href: '/messages', icon: MessageSquare, badgeCount: 2 },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between fixed top-0 left-0 h-screen w-20 xl:w-64 border-r border-light-border dark:border-dark-border bg-white dark:bg-dark-surface px-3 py-6 z-40 transition-all select-none">
      {/* Top: Brand Logo & Navigation */}
      <div className="flex flex-col gap-6">
        {/* VyaparVibe Brand Logo */}
        <Link href="/" className="flex items-center gap-3 px-3 py-2 group">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-vyapar-700 text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            व्य
          </div>
          <div className="hidden xl:flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-2xl tracking-tight text-neutral-900 dark:text-white font-sans">
                VyaparVibe
              </span>
            </div>
            <span className="text-[10px] tracking-wider uppercase font-bold text-terracotta-700 dark:text-terracotta-500 -mt-0.5 flex items-center gap-1">
              <span>🇮🇳</span> Local Commerce & Crafts
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex items-center gap-3.5 px-3 py-3 rounded-2xl font-medium transition-all group ${
                  isActive
                    ? 'font-bold text-vyapar-900 dark:text-white bg-vyapar-50 dark:bg-vyapar-950/60 border border-vyapar-200/60 dark:border-vyapar-800/40 shadow-xs'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-hover hover:text-black dark:hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                      isActive ? 'stroke-[2.5px] text-vyapar-700 dark:text-vyapar-400' : 'stroke-[1.8px]'
                    }`}
                  />
                  {item.badgeCount && (
                    <span className="absolute -top-1.5 -right-2 bg-terracotta-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                      {item.badgeCount}
                    </span>
                  )}
                </div>

                <span className="hidden xl:inline text-[14px]">{item.label}</span>

                {item.badge && (
                  <span className="hidden xl:inline ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-dark-hover text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-dark-border">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Add Listing / Post Button */}
          <button
            onClick={openCreateModal}
            className="flex items-center gap-3.5 px-3 py-3 rounded-2xl font-semibold text-white bg-vyapar-700 hover:bg-vyapar-800 shadow-sm transition-all group w-full text-left mt-2 active:scale-95"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.2px] group-hover:rotate-90 transition-transform" />
            <span className="hidden xl:inline text-[14px]">Add Listing / Post</span>
          </button>

          {/* Profile Item */}
          {user ? (
            <Link
              href="/profile"
              className={`flex items-center gap-3.5 px-3 py-3 rounded-2xl font-medium transition-all group mt-2 ${
                pathname === '/profile'
                  ? 'font-bold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-dark-hover'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-hover'
              }`}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-neutral-300 dark:border-dark-border shrink-0">
                <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
              </div>
              <div className="hidden xl:flex flex-col truncate">
                <span className="text-[13px] font-bold truncate flex items-center gap-1">
                  {user.fullName.split(' ')[0]}
                  {user.isVerifiedArtisan && (
                    <ShieldCheck className="w-3.5 h-3.5 text-vyapar-600 dark:text-vyapar-400" />
                  )}
                </span>
                <span className="text-[11px] text-neutral-500 truncate">
                  {user.accountType === 'LOCAL_SELLER_ARTISAN' ? 'Artisan Seller' : 'Creator'}
                </span>
              </div>
            </Link>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-3.5 px-3 py-3 rounded-2xl font-bold text-vyapar-700 dark:text-vyapar-400 hover:bg-vyapar-50 dark:hover:bg-vyapar-950/30 transition-all w-full text-left mt-2"
            >
              <UserIcon className="w-5 h-5 stroke-[2px]" />
              <span className="hidden xl:inline text-[14px]">Artisan Login</span>
            </button>
          )}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-2">
        <ThemeToggle />

        {user && (
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-500 hover:text-rose-600 transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden xl:inline">Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}
