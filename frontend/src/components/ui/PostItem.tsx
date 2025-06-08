import { IPost } from '@/types/post.types';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import Link from 'next/link';

import { remark } from 'remark';
import stripMarkdown from 'strip-markdown';

const stripMarkdownSymbols = (markdownText: string): string => {
  try {
    // Використовуємо remark для парсингу і stripMarkdown для видалення форматування
    const processedContent = String(remark().use(stripMarkdown).processSync(markdownText));
    return processedContent.trim(); // Видаляємо зайві пробіли на початку/кінці
  } catch (error) {
    console.error('Помилка при обробці Markdown:', error);
    return markdownText; // Повертаємо оригінальний текст у випадку помилки
  }
};

const PostItem = ({ post, slug }: { post: IPost; slug: string }) => {
  const cleanedContent = stripMarkdownSymbols(post.content ? post.content : '');

  return (
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
      <p className="line-clamp-3 mt-2 text-cyan-900 dark:text-cyan-200 whitespace-pre-wrap">
        {cleanedContent}
      </p>
    </li>
  );
};

export default PostItem;
