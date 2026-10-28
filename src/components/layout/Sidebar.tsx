'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Compass,
  Film,
  Send,
  Heart,
  PlusSquare,
  User as UserIcon,
  Menu,
  ShieldCheck,
  LogOut,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useFeed } from '@/context/FeedContext';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Sidebar() {
  const pathname = usePathname();
  const { openCreateModal, openVerificationModal } = useFeed();
  const { user, openAuthModal, logout } = useAuth();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: 'Reels', href: '/reels', icon: Film, badge: 'Trending' },
    { label: 'Messages', href: '/messages', icon: Send, badgeCount: 3 },
    { label: 'Notifications', href: '/notifications', icon: Heart, badgeCount: 5 },
    { label: 'Storefront', href: '/monetization', icon: ShoppingBag, badge: '₹ Shop' },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between fixed top-0 left-0 h-screen w-20 xl:w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-3 py-6 z-40 transition-all select-none">
      {/* Top Section: Logo & Nav items */}
      <div className="flex flex-col gap-6">
        {/* BharatGram Brand Logo */}
        <Link href="/" className="flex items-center gap-3 px-3 py-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-neutral-950 rounded-[14px] flex items-center justify-center">
              <span className="font-extrabold text-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent">
                भ
              </span>
            </div>
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 dark:from-white dark:via-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent font-sans">
              BharatGram
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-600 dark:text-amber-400 -mt-1 flex items-center gap-1">
              <span>🇮🇳</span> Made in India
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex items-center gap-4 px-3 py-3 rounded-2xl font-medium transition-all group ${
                  isActive
                    ? 'font-bold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-900 shadow-sm'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100/70 dark:hover:bg-neutral-900/60 hover:text-black dark:hover:text-white'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-transform group-hover:scale-110 ${
                      isActive ? 'stroke-[2.6px]' : 'stroke-[1.8px]'
                    }`}
                  />
                  {item.badgeCount && (
                    <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                      {item.badgeCount}
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline text-[15px]">{item.label}</span>
                {item.badge && (
                  <span className="hidden xl:inline ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Create Button (Interactive Modal trigger) */}
          <button
            onClick={openCreateModal}
            className="flex items-center gap-4 px-3 py-3 rounded-2xl font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100/70 dark:hover:bg-neutral-900/60 hover:text-black dark:hover:text-white transition-all group w-full text-left"
          >
            <div className="relative">
              <PlusSquare className="w-6 h-6 stroke-[1.8px] group-hover:scale-110 transition-transform text-rose-500" />
            </div>
            <span className="hidden xl:inline text-[15px] font-medium">Create</span>
          </button>

          {/* Profile Link */}
          {user ? (
            <Link
              href="/profile"
              className={`flex items-center gap-4 px-3 py-3 rounded-2xl font-medium transition-all group ${
                pathname === '/profile'
                  ? 'font-bold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-900 shadow-sm'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100/70 dark:hover:bg-neutral-900/60 hover:text-black dark:hover:text-white'
              }`}
            >
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-700 group-hover:scale-110 transition-transform">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden xl:inline text-[15px] truncate">{user.fullName.split(' ')[0]} (Profile)</span>
            </Link>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-4 px-3 py-3 rounded-2xl font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all w-full text-left"
            >
              <UserIcon className="w-6 h-6 stroke-[1.8px]" />
              <span className="hidden xl:inline text-[15px] font-semibold">Sign In / Register</span>
            </button>
          )}
        </nav>
      </div>

      {/* Bottom Section: Theme & More Options */}
      <div className="flex flex-col gap-2 relative">
        {/* More Menu Dropdown */}
        {isMoreMenuOpen && (
          <div className="absolute bottom-16 left-0 w-60 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 flex flex-col gap-1 backdrop-blur-lg">
            <button
              onClick={() => {
                setIsMoreMenuOpen(false);
                openVerificationModal();
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors w-full text-left"
            >
              <ShieldCheck className="w-4 h-4 text-brand-blue" />
              <span>Apply for Blue Verified Badge</span>
            </button>

            <button
              onClick={() => {
                setIsMoreMenuOpen(false);
                openCreateModal();
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors w-full text-left"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Monetize / Creator Tools</span>
            </button>

            <div className="h-px bg-neutral-200 dark:bg-neutral-800 my-1" />

            <div className="px-1">
              <ThemeToggle />
            </div>

            {user && (
              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  logout();
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        )}

        {/* More Settings Trigger */}
        <button
          onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
          className="flex items-center gap-4 px-3 py-3 rounded-2xl font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all w-full text-left"
        >
          <Menu className="w-6 h-6 stroke-[1.8px]" />
          <span className="hidden xl:inline text-[15px]">More</span>
        </button>
      </div>
    </aside>
  );
}

