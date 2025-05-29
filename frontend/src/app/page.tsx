'use client';

import useTopic from '@/hooks/topic/useTopic';
import Link from 'next/link';

export default function HomePage() {
  const { data: topics } = useTopic();
  return (
    <div className=" pt-24 min-h-screen transition-colors duration-500 bg-gradient-to-br from-cyan-100 to-blue-300 dark:from-cyan-900 dark:to-blue-900 text-gray-900 dark:text-white p-10 flex flex-col items-center justify-center font-sans relative">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-[0_0_10px_cyan]">
          SkillsSync
        </h1>
        <p className="text-cyan-700 dark:text-cyan-300 text-lg max-w-2xl mx-auto">
          Платформа для обміну досвідом і знаннями між фахівцями у різних сферах.
        </p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="hover:-translate-y-2 transition-transform rounded-xl border border-cyan-400 dark:border-cyan-600 p-6 shadow-lg shadow-cyan-700/30 dark:shadow-cyan-700/80 bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">🔗 Менторство</h2>
          <p className="text-cyan-800 dark:text-cyan-200">
            Знаходьте наставників або ставайте ними, обмінюючись досвідом напряму.
          </p>
        </div>

        <div className="hover:-translate-y-2 transition-transform rounded-xl border border-cyan-400 dark:border-cyan-600 p-6 shadow-lg shadow-cyan-700/30 dark:shadow-cyan-700/80 bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">📚 База знань</h2>
          <p className="text-cyan-800 dark:text-cyan-200">
            Публікуйте та переглядайте статті, кейси та корисні поради від спільноти.
          </p>
        </div>

        <div className="hover:-translate-y-2 transition-transform rounded-xl border border-cyan-400 dark:border-cyan-600 p-6 shadow-lg shadow-cyan-700/30 dark:shadow-cyan-700/80 bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">🏅 Рейтинг і нагороди</h2>
          <p className="text-cyan-800 dark:text-cyan-200">
            Отримуйте визнання за активність та допомогу іншим користувачам.
          </p>
        </div>
      </main>

      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Популярні теми</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {topics &&
            topics.map((topic) => (
              <Link
                href={`/topics/${topic.slug}`}
                key={topic.slug}
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-cyan-300 dark:border-cyan-600 text-center text-cyan-700 dark:text-cyan-200 font-medium hover:scale-105 transition-transform cursor-pointer"
              >
                {topic.title}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
