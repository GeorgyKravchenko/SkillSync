'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export default function PostPage() {
  const post = {
    id: '1',
    title: 'Як використовувати React з Tailwind CSS',
    author: { name: 'Георгій' },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    content: `Tailwind CSS — це утилітарний CSS-фреймворк, який дозволяє швидко створювати стильні інтерфейси без написання кастомного CSS. У цьому пості ми розглянемо як підключити Tailwind до React проєкту, приклади використання, а також корисні практики.

### Підключення
- Встановіть залежності: **npm install -D tailwindcss postcss autoprefixer**
- Ініціалізуйте Tailwind: **npx tailwindcss init -p**

### Використання
> Просто додавайте класи до HTML/JSX елементів: <div className="bg-blue-500 text-white p-4 rounded-lg">

---

Tailwind значно спрощує стилізацію компонентів і робить код більш читабельним.
`,
  };

  const comments = [
    {
      id: 1,
      author: 'Олександр',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      content: 'Дуже корисна публікація! Дякую за зусилля.',
    },
    {
      id: 2,
      author: 'Марина',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      content: 'Хотілося б більше прикладів, але загалом все чітко 👌',
    },
  ];

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white px-6 sm:px-10 py-12 font-sans">
      <article className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-cyan-200 dark:border-cyan-700">
        <header className="mb-6">
          <h1 className="text-4xl font-extrabold text-cyan-800 dark:text-cyan-300 drop-shadow-[0_0_6px_cyan]">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Автор: <span className="font-medium">{post.author.name}</span> •{' '}
            {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: uk })}
          </p>
        </header>

        <section className="markdownStyles bg-cyan-50 dark:bg-gray-800 p-6 rounded-xl border border-cyan-300 dark:border-cyan-700 leading-relaxed shadow-inner">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="text-4xl font-bold text-cyan-800 dark:text-cyan-300 mt-6 mb-4"
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="text-3xl font-semibold text-cyan-700 dark:text-cyan-200 mt-5 mb-3"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  className="text-2xl font-semibold text-cyan-600 dark:text-cyan-100 mt-4 mb-2"
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <p
                  className="text-base text-gray-900 dark:text-gray-100 leading-relaxed mb-4"
                  {...props}
                />
              ),
              ul: ({ ...props }) => (
                <ul
                  className="list-disc list-inside mb-4 text-gray-900 dark:text-gray-100"
                  {...props}
                />
              ),
              ol: ({ ...props }) => (
                <ol
                  className="list-decimal list-inside mb-4 text-gray-900 dark:text-gray-100"
                  {...props}
                />
              ),
              li: ({ ...props }) => <li className="mb-1" {...props} />,
              blockquote: ({ children }) => (
                <blockquote className="relative pl-5 pr-4 py-3 bg-cyan-100 dark:bg-gray-700 rounded-lg border-l-4 border-cyan-500 dark:border-cyan-400 text-gray-800 dark:text-gray-100 italic">
                  <span className="block">{children}</span>
                </blockquote>
              ),
              code: ({ children, ...props }) => (
                <code
                  className="bg-gray-200 dark:bg-gray-700 text-pink-600 dark:text-pink-400 px-1 py-0.5 rounded"
                  {...props}
                >
                  {children}
                </code>
              ),
              a: ({ ...props }) => (
                <a
                  className="text-cyan-700 dark:text-cyan-400 underline hover:text-cyan-900 dark:hover:text-cyan-200"
                  {...props}
                />
              ),
              hr: ({ ...props }) => (
                <hr className="border-t border-cyan-200 dark:border-cyan-700 my-6" {...props} />
              ),
              strong: ({ ...props }) => (
                <strong className="font-semibold text-gray-900 dark:text-white" {...props} />
              ),
              em: ({ ...props }) => (
                <em className="italic text-gray-700 dark:text-gray-300" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </section>

        <footer className="mt-10">
          <Link
            href="/topics"
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition"
          >
            ← Назад до тем
          </Link>
        </footer>
      </article>

      <section className="max-w-4xl mx-auto mt-16 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-cyan-200 dark:border-cyan-700">
        <h2 className="text-2xl font-bold mb-6 text-cyan-800 dark:text-cyan-300">Коментарі</h2>
        <ul className="space-y-6">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="p-4 border border-cyan-100 dark:border-cyan-800 rounded-lg bg-cyan-50 dark:bg-gray-800"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                <span className="font-semibold">{comment.author}</span> •{' '}
                {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: uk })}
              </p>
              <p className="text-gray-900 dark:text-gray-100">{comment.content}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <textarea
            placeholder="Залишити коментар..."
            className="w-full h-24 p-4 rounded-xl border border-cyan-300 dark:border-cyan-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl shadow-md transition">
            Надіслати
          </button>
        </div>
      </section>
    </div>
  );
}
