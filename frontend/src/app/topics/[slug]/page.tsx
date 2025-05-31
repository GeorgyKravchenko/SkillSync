'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import usePosts from '@/hooks/post/usePosts';
import useTopic from '@/hooks/topic/useTopic';

export default function TopicPage() {
  const { slug } = useParams() as { slug: string };

  const { data: topics } = useTopic();
  const { data: posts } = usePosts(slug);

  const topic = topics?.find((t) => t.slug === slug);

  if (!slug || !topic) return notFound();

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
      </header>

      <main className="max-w-5xl mx-auto space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Останні публікації</h2>
          <ul className="space-y-4">
            {posts?.map((post) => (
              <li
                key={post.id}
                className="p-4 rounded-xl border border-cyan-300 dark:border-cyan-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition"
              >
                <Link href={`/topics/${slug}/post/${post.id}`}>
                  <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300 hover:underline">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Автор: {post.author.name} •{' '}
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                    locale: uk,
                  })}
                </p>
                <p className="mt-2 text-cyan-900 dark:text-cyan-200">{post.content}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
