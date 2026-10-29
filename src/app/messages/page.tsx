'use client';

import React, { useState } from 'react';
import { Send, Search, ShieldCheck, MapPin, Store } from 'lucide-react';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string>('meera_deshmukh');
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Record<string, { sender: string; text: string; time: string }[]>>({
    meera_deshmukh: [
      { sender: 'meera_deshmukh', text: 'Namaste Rameshwar ji! I saw your Blue Pottery Jug & 2 Kulhads set on the feed.', time: '10:30 AM' },
      { sender: 'me', text: 'Namaste Meera ji! Yes, we have 18 sets freshly fired from the Amer kiln.', time: '10:32 AM' },
      { sender: 'meera_deshmukh', text: 'Can you deliver 2 sets to Bandra West, Mumbai by Friday?', time: '10:35 AM' },
      { sender: 'me', text: 'Certainly! We pack in 3-layer bubble packaging. Will dispatch today via BlueDart Express.', time: '10:38 AM' },
    ],
    priya_mukherjee: [
      { sender: 'priya_mukherjee', text: 'Do you make custom dinner plate sets with floral borders?', time: 'Yesterday' },
      { sender: 'me', text: 'Yes, we take bespoke dinner sets of 6 and 12 plates. Lead time is 7 days.', time: 'Yesterday' },
    ],
  });

  const chats = [
    {
      username: 'meera_deshmukh',
      name: 'Meera Deshmukh',
      location: 'Mumbai (PIN 400050)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      lastMsg: 'Can you deliver 2 sets to Bandra West, Mumbai by Friday?',
      unread: 1,
    },
    {
      username: 'priya_mukherjee',
      name: 'Priya Mukherjee',
      location: 'Kolkata (PIN 700016)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      lastMsg: 'Do you make custom dinner plate sets with floral borders?',
      unread: 0,
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
      <div className="w-full sm:w-80 bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border p-4 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-lg text-neutral-900 dark:text-white">Customer Inquiries</h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-vyapar-50 text-vyapar-800 dark:bg-vyapar-950 dark:text-vyapar-400">
            2 Active
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search inquiries by buyer name or PIN..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-100 dark:bg-dark-hover text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-1">
          {chats.map((c) => (
            <button
              key={c.username}
              onClick={() => setSelectedChat(c.username)}
              className={`p-2.5 rounded-2xl flex items-center gap-3 text-left transition-colors ${
                selectedChat === c.username
                  ? 'bg-neutral-100 dark:bg-dark-hover'
                  : 'hover:bg-neutral-50 dark:hover:bg-dark-hover/40'
              }`}
            >
              <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0">
                <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-neutral-900 dark:text-white truncate">
                    {c.name}
                  </span>
                  {c.unread > 0 && <span className="w-2 h-2 rounded-full bg-terracotta-600" />}
                </div>
                <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" /> {c.location}
                </span>
                <p className="text-[11px] text-neutral-500 truncate mt-0.5">{c.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Conversation Panel */}
      <div className="hidden sm:flex flex-1 bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-light-border dark:border-dark-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0">
            <img src={activeChatData.avatar} alt={activeChatData.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-1.5">
              <span>{activeChatData.name}</span>
            </h3>
            <span className="text-[10px] text-neutral-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-terracotta-600" /> {activeChatData.location}
            </span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {(messages[selectedChat] || []).map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col max-w-[75%] ${
                m.sender === 'me' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`py-2 px-3.5 rounded-2xl text-xs ${
                  m.sender === 'me'
                    ? 'bg-vyapar-700 text-white rounded-br-xs'
                    : 'bg-neutral-100 dark:bg-dark-hover text-neutral-900 dark:text-white rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-neutral-400 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-light-border dark:border-dark-border flex items-center gap-2">
          <input
            type="text"
            placeholder="Reply to customer inquiry in Hindi / English / Regional..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="flex-1 py-2.5 px-4 rounded-full bg-neutral-100 dark:bg-dark-hover text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          <button
            type="submit"
            className="p-2.5 rounded-full bg-vyapar-700 hover:bg-vyapar-800 text-white active:scale-95 transition-transform"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
