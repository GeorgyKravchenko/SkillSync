'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-6 py-3 backdrop-blur-md bg-white/30 dark:bg-gray-900/40 border border-cyan-300 dark:border-cyan-700 rounded-2xl shadow-[0_4px_30px_rgba(0,255,255,0.1)] transition-all">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 font-bold text-xl tracking-wide">
          <span className="text-2xl">⚡</span> SkillsSync
        </div>
        <nav className="hidden md:flex gap-6 text-cyan-800 dark:text-cyan-200 font-medium">
          <Link href="/" className="hover:text-cyan-500 transition">
            Головна
          </Link>
          <Link href="/skills" className="hover:text-cyan-500 transition">
            Навички
          </Link>
          <Link href="/contacts" className="hover:text-cyan-500 transition">
            Контакти
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-cyan-400 dark:border-cyan-600 bg-white/20 dark:bg-white/10 hover:scale-110 transition text-cyan-700 dark:text-cyan-300"
            title="Змінити тему"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full border border-cyan-400 dark:border-cyan-600 bg-white/20 dark:bg-white/10 hover:scale-110 transition text-cyan-700 dark:text-cyan-300"
            title="Профіль"
            onClick={() => {
              router.push('/profile');
            }}
          >
            👤
          </button>
        </div>
      </div>
    </header>
  );
}
