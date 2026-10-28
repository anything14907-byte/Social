'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-700 dark:text-neutral-200 flex items-center gap-3 w-full"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-6 h-6 text-amber-400" />
          <span className="hidden xl:inline text-sm font-medium">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-6 h-6 text-brand-purple" />
          <span className="hidden xl:inline text-sm font-medium">Dark Mode</span>
        </>
      )}
    </button>
  );
}
