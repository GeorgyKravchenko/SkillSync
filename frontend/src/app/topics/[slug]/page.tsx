'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import useTopic from '@/hooks/topic/useTopic';
import { useState } from 'react';
import SearchInput from '@/components/ui/SearchInput';
import useSearchPosts from '@/hooks/post/useSearchPosts';
import PostItem from '@/components/ui/PostItem';

export default function TopicPage() {
  const { slug } = useParams() as { slug: string };
  const { data: topics } = useTopic();

  const topic = topics?.find((t) => t.slug === slug);

  const [search, setSearch] = useState('');
  const { data: filteredPosts } = useSearchPosts(search.trim());

  if (!slug || !topic) return <div>Завантаження...</div>;

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white p-10 font-sans">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-2 drop-shadow-[0_0_8px_cyan]">{topic.title}</h1>
        <p className="text-cyan-800 dark:text-cyan-300 max-w-2xl mx-auto text-lg">
          {`Огляд теми "${topic.title}" — статті, обговорення, ресурси та новини.`}
        </p>
        <div className="mt-6">
          <Link
            href={`/topics/new`}
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition"
          >
            + Створити публікацію
          </Link>
        </div>

        <SearchInput value={search} onChange={setSearch} />
      </header>

      <main className="max-w-5xl mx-auto space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Останні публікації</h2>
          {filteredPosts && filteredPosts.length > 0 ? (
            <ul className="space-y-4">
              {filteredPosts.map((post) => (
                <PostItem key={post.id} post={post} slug={slug} />
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Публікацій не знайдено.</p>
          )}
        </section>
      </main>
    </div>
  );
}
