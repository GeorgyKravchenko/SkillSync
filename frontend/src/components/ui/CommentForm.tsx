'use client';

import { useForm } from 'react-hook-form';
import { ICommentCreateDto } from '@/types/comment.types';

type Props = {
  onSubmit: (data: Pick<ICommentCreateDto, 'content'>) => void;
};

export default function CommentForm({ onSubmit }: Props) {
  const { register, handleSubmit } = useForm<Pick<ICommentCreateDto, 'content'>>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register('content', { required: true })}
        placeholder="Залишити коментар..."
        className="w-full h-24 p-4 rounded-xl border border-cyan-300 dark:border-cyan-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl shadow-md transition"
      >
        Надіслати
      </button>
    </form>
  );
}
