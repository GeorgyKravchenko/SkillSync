'use client';
import { useForm } from 'react-hook-form';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import { IComment, ICommentCreateDto } from '@/types/comment.types';
import useAuthStore from '@/lib/store/user';
import OwnerKebabMenu from './kebabMenu/OwnerKebabMenu';
import { memo, useState } from 'react';
import useUpdateComment from '@/hooks/comment/useUpdateComment';
import ReactionButtonGroupForComment from './reactionButtons/ReactionButtonGroupForComment';
import Image from 'next/image';
type Props = {
  comment: IComment;
  postId: number;
};

export const CommentItem = memo(function CommentItem({ comment, postId }: Props) {
  const user = useAuthStore((state) => state.user);
  const isAuthor = user?.id === comment.author.id;
  const { register, handleSubmit, reset } = useForm<ICommentCreateDto>();
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateComment } = useUpdateComment(postId);

  const handleSave = (data: ICommentCreateDto) => {
    updateComment({
      id: comment.id,
      content: data.content,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset({ content: comment.content });
    setIsEditing(false);
  };

  return (
    <li className="relative p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        {comment.author.avatar ? (
          <Image
            width={40}
            height={40}
            src={comment.author.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center text-cyan-600 dark:text-cyan-300 font-medium">
            {comment.author.name.charAt(0)}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline mb-1">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {comment.author.name}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
              {comment.createdAt !== comment.updatedAt && '(редаговано) '}
              {formatDistanceToNow(comment.createdAt, {
                addSuffix: true,
                locale: uk,
              })}
            </span>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit(handleSave)}>
              <textarea
                className="w-full p-2 rounded border border-cyan-300 dark:border-cyan-700 bg-cyan-50 dark:bg-gray-700 text-gray-900 dark:text-white mb-2 resize-none"
                {...register('content', { required: true })}
                defaultValue={comment.content}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-3 py-1 text-sm rounded bg-cyan-600 text-white hover:bg-cyan-700 transition"
                >
                  Зберегти
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1 text-sm rounded border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Скасувати
                </button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
              <ReactionButtonGroupForComment
                commentId={comment.id}
                defaultreaction={
                  comment.CommentReactions.find((r) => r.authorId === user?.id)?.reaction || null
                }
                likeCount={comment.likesCount}
                dislikeCount={comment.dislikesCount}
                postId={postId}
              />
            </>
          )}
        </div>

        {isAuthor && (
          <OwnerKebabMenu setIsEditing={setIsEditing} commentId={comment.id} postId={postId} />
        )}
      </div>
    </li>
  );
});
