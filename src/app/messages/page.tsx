'use client';

import React, { useState } from 'react';
import { Send, Search, ShieldCheck } from 'lucide-react';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string>('priya_designs');
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Record<string, { sender: string; text: string; time: string }[]>>({
    priya_designs: [
      { sender: 'priya_designs', text: 'Namaste Aarav! Did you check out our new Banarasi silk saree post?', time: '10:30 AM' },
      { sender: 'me', text: 'Yes Priya! The Royal Peacock Zari is gorgeous. Already shared it on my story!', time: '10:32 AM' },
      { sender: 'priya_designs', text: 'Thank you so much! Sending over the product sample to Mumbai tomorrow.', time: '10:35 AM' },
    ],
    kabir_wanderlust: [
      { sender: 'kabir_wanderlust', text: 'Bhai, let’s do a road trip to Spiti Valley in May!', time: 'Yesterday' },
      { sender: 'me', text: 'Count me in Kabir! Getting my camera rig serviced.', time: 'Yesterday' },
    ],
  });

  const chats = [
    {
      username: 'priya_designs',
      name: 'Priya Mehra',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      lastMsg: 'Sending over the product sample to Mumbai tomorrow.',
      unread: 1,
      isVerified: true,
    },
    {
      username: 'kabir_wanderlust',
      name: 'Kabir Verma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      lastMsg: 'Bhai, let’s do a road trip to Spiti Valley in May!',
      unread: 0,
      isVerified: false,
    },
    {
      username: 'delhi_foodie_hub',
      name: 'Rohit Aggarwal',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      lastMsg: 'Bro Chandni Chowk ka street walk pass booked!',
      unread: 0,
      isVerified: true,
    },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [
        ...(prev[selectedChat] || []),
        { sender: 'me', text: inputMsg.trim(), time: 'Just now' },
      ],
    }));
    setInputMsg('');
  };

  const activeChatData = chats.find((c) => c.username === selectedChat) || chats[0];

  return (
    <div className="w-full max-w-4xl h-[calc(100vh-80px)] md:h-screen p-4 flex gap-4 select-none">
      {/* Left Chat List */}
      <div className="w-full sm:w-80 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-4 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-lg text-neutral-900 dark:text-white">Messages</h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
            3 Unread
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search DMs & Creators..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
        </div>

        {/* Chat Items */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-1">
          {chats.map((c) => (
            <button
              key={c.username}
              onClick={() => setSelectedChat(c.username)}
              className={`p-2.5 rounded-2xl flex items-center gap-3 text-left transition-colors ${
                selectedChat === c.username
                  ? 'bg-neutral-100 dark:bg-neutral-800'
                  : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
              }`}
            >
              <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-neutral-900 dark:text-white flex items-center gap-1">
                    {c.username}
                    {c.isVerified && <ShieldCheck className="w-3 h-3 text-brand-blue fill-brand-blue" />}
                  </span>
                  {c.unread > 0 && (
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  )}
                </div>
                <p className="text-[11px] text-neutral-400 truncate mt-0.5">{c.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Conversation View */}
      <div className="hidden sm:flex flex-1 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
            <img src={activeChatData.avatar} alt={activeChatData.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-1">
              {activeChatData.username}
              {activeChatData.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-brand-blue fill-brand-blue" />}
            </h3>
            <span className="text-[10px] text-emerald-500 font-medium">Active now</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {(messages[selectedChat] || []).map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[70%] ${
                m.sender === 'me' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`py-2 px-3.5 rounded-2xl text-xs ${
                  m.sender === 'me'
                    ? 'bg-rose-600 text-white rounded-br-xs'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-neutral-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSend} className="p-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
          <input
            type="text"
            placeholder="Message... (supports regional Hinglish)"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="flex-1 py-2.5 px-4 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          <button
            type="submit"
            className="p-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white active:scale-95 transition-transform"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
