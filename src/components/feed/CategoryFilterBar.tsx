'use client';

import React from 'react';
import { CATEGORIES } from '@/data/categories';
import { useFeed } from '@/context/FeedContext';
import {
  Sparkles,
  Scissors,
  Flame,
  Code,
  Gem,
  Palette,
  Coffee,
  Hammer,
  Wrench,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Scissors,
  Flame,
  Code,
  Gem,
  Palette,
  Coffee,
  Hammer,
  Wrench,
};

export default function CategoryFilterBar() {
  const { selectedCategory, setSelectedCategory } = useFeed();

  return (
    <div className="w-full bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-2xl p-2.5 mb-5 select-none shadow-xs">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.iconName] || Sparkles;
          const isSelected =
            selectedCategory === cat.slug ||
            (selectedCategory === 'all' && cat.slug === 'all');

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-vyapar-700 text-white shadow-xs'
                  : 'bg-neutral-100 dark:bg-dark-hover text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-vyapar-600 dark:text-vyapar-400'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
