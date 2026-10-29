'use client';

import React from 'react';
import { ShoppingBag, Heart, MessageCircle, ShieldCheck, MapPin } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 'n1',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: 'Meera Deshmukh sent an inquiry for "Jaipur Cobalt Blue Water Jug & 2 Kulhads Set" (₹1,450 to Mumbai PIN 400050).',
      time: '15m ago',
      icon: ShoppingBag,
      iconColor: 'text-vyapar-700 bg-vyapar-500/10',
    },
    {
      id: 'n2',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: 'Radha Mohan Weavers (Kashi Heritage) liked your ceramic firing kiln showcase.',
      time: '1h ago',
      icon: Heart,
      iconColor: 'text-rose-500 bg-rose-500/10',
    },
    {
      id: 'n3',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      text: 'Farooq Ahmed commented: "The quartz formulation gives such brilliant transparency!"',
      time: '4h ago',
      icon: MessageCircle,
      iconColor: 'text-blue-500 bg-blue-500/10',
    },
    {
      id: 'n4',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      text: 'Your artisan studio verification was approved by All India Handicrafts Board.',
      time: '1d ago',
      icon: ShieldCheck,
      iconColor: 'text-vyapar-700 bg-vyapar-500/10',
    },
  ];

  return (
    <div className="w-full max-w-2xl px-4 py-8 flex flex-col gap-6 select-none">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
          Notifications & Activity
        </h1>
        <button className="text-xs font-semibold text-vyapar-700 dark:text-vyapar-400 hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border flex items-center gap-3.5 hover:border-vyapar-500/40 transition-colors shadow-xs"
            >
              <div className="relative w-11 h-11 shrink-0">
                <img src={n.avatar} alt="Notification user" className="w-full h-full rounded-2xl object-cover" />
                <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${n.iconColor} border border-white dark:border-dark-card`}>
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
