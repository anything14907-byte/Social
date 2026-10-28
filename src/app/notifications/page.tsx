'use client';

import React from 'react';
import { Heart, MessageCircle, ShoppingBag, ShieldCheck, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 'n1',
      type: 'order',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      text: 'Neha Kapoor placed a new order for "Royal Peacock Banarasi Silk Saree" (₹3,499 via UPI).',
      time: '15m ago',
      icon: ShoppingBag,
      iconColor: 'text-amber-500 bg-amber-500/10',
    },
    {
      id: 'n2',
      type: 'like',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: 'kabir_wanderlust and 241 others liked your photo from Marine Drive, Mumbai.',
      time: '1h ago',
      icon: Heart,
      iconColor: 'text-rose-500 bg-rose-500/10',
    },
    {
      id: 'n3',
      type: 'boost',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: 'Your campaign boost to Mumbai & Pune has reached 14,800 viewers with 84 clicks!',
      time: '3h ago',
      icon: TrendingUp,
      iconColor: 'text-blue-500 bg-blue-500/10',
    },
    {
      id: 'n4',
      type: 'comment',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      text: 'delhi_foodie_hub commented: "Insane lighting Aarav bhai! The reflections are unreal 🔥"',
      time: '5h ago',
      icon: MessageCircle,
      iconColor: 'text-indigo-500 bg-indigo-500/10',
    },
    {
      id: 'n5',
      type: 'verify',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: 'Your verified creator blue checkmark request was verified with UIDAI Aadhaar.',
      time: '1d ago',
      icon: ShieldCheck,
      iconColor: 'text-brand-blue bg-blue-500/10',
    },
  ];

  return (
    <div className="w-full max-w-2xl px-4 py-8 flex flex-col gap-6 select-none">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-neutral-900 dark:text-white">Notifications</h1>
        <button className="text-xs font-semibold text-rose-500 hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-3.5 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-xs"
            >
              <div className="relative w-11 h-11 shrink-0">
                <img src={n.avatar} alt="Notification user" className="w-full h-full rounded-full object-cover" />
                <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${n.iconColor} border border-white dark:border-black`}>
                  <Icon className="w-3 h-3" />
                </div>
              </div>

              <div className="flex-1 text-xs text-neutral-800 dark:text-neutral-200 leading-snug">
                <span>{n.text}</span>
                <span className="block text-[10px] text-neutral-400 mt-0.5">{n.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
