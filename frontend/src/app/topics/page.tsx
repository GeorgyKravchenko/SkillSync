// app/topic/page.tsx
import Link from 'next/link';

const topics = [
  { slug: 'programming', title: '💻 Програмування' },
  { slug: 'design', title: '🎨 Дизайн' },
  { slug: 'marketing', title: '📈 Маркетинг' },
  { slug: 'psychology', title: '🧠 Психологія' },
  { slug: 'medicine', title: '🩺 Медицина' },
  { slug: 'finance', title: '💰 Фінанси' },
];

export default function TopicsPage() {
  return (
    <div className="pt-24 min-h-screen transition-colors duration-500 bg-gradient-to-br from-cyan-100 to-blue-300 dark:from-cyan-900 dark:to-blue-900 text-gray-900 dark:text-white p-10 flex flex-col items-center font-sans relative">
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide drop-shadow-[0_0_10px_cyan]">
          Теми для обговорення
        </h1>
        <p className="text-cyan-700 dark:text-cyan-300 text-lg max-w-2xl mx-auto">
          Обирайте категорію, яка вас цікавить, щоб переглядати статті, ставити питання та
          обговорювати з іншими учасниками спільноти.
        </p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="block hover:-translate-y-1 transition-transform rounded-xl border border-cyan-400 dark:border-cyan-600 p-6 shadow-md shadow-cyan-700/30 dark:shadow-cyan-700/80 bg-white dark:bg-gray-900 text-center"
          >
            <h2 className="text-xl font-semibold text-cyan-800 dark:text-cyan-200">
              {topic.title}
            </h2>
          </Link>
        ))}
      </main>
    </div>
  );
}
