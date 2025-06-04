'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useParams } from 'next/navigation';
import usePost from '@/hooks/post/usePost';
import useCreateComment from '@/hooks/comment/useCreateComment';
import { ICommentCreateDto } from '@/types/comment.types';
import CommentItem from '@/components/ui/CommentItem';
import MarkdownContent from '@/components/ui/MarkDownContent';
import CommentForm from '@/components/ui/CommentForm';

export default function PostPage() {
  const { postId } = useParams() as { postId: string };
  const { data: post, isLoading } = usePost(+postId);
  const { mutate: createComment } = useCreateComment(+postId);
  if (isLoading || !post) return <div className="text-center pt-24">Завантаження...</div>;
  const handleCreateComment = (content: Pick<ICommentCreateDto, 'content'>) =>
    createComment({ ...content, postId: +postId });

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

        <MarkdownContent content={post.content} />

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
          {post.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={+postId} />
          ))}
        </ul>

        <div className="mt-8">
          <CommentForm onSubmit={handleCreateComment} />
        </div>
      </section>
    </div>
  );
}
