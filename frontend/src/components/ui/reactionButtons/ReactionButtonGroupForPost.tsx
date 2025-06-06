import { useDislikePost, useLikePost } from '@/hooks/post/usePostReaction';
import { Reaction } from '@/types/reaction.enum';
import { useState } from 'react';

const ReactionButtonGroupForPost = ({
  postId,
  likeCount,
  dislikeCount,
  defaultreaction,
}: {
  postId: number;
  likeCount: number;
  dislikeCount: number;
  defaultreaction: Reaction | null;
}) => {
  const [reaction, setReaction] = useState<Reaction | null>(defaultreaction);
  const { mutate: like } = useLikePost(postId);
  const { mutate: dislike } = useDislikePost(postId);

  const toggleReaction = (newReaction: Reaction) => {
    if (newReaction === Reaction.LIKE) {
      like(postId);
    } else {
      dislike(postId);
    }
    setReaction((prev) => (prev === newReaction ? null : newReaction));
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => toggleReaction(Reaction.LIKE)}
        aria-label="Поставить или убрать лайк"
        aria-pressed={reaction === Reaction.LIKE}
        className="group flex items-center p-1 transition-colors"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-200 ease-out stroke-[1.5]
            ${
              reaction === Reaction.LIKE
                ? 'stroke-cyan-600 group-hover:stroke-cyan-500'
                : 'stroke-gray-400 group-hover:stroke-cyan-600 dark:stroke-gray-500 dark:group-hover:stroke-cyan-600'
            }
            active:scale-[0.97]`}
        >
          <path
            d="M3 12.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm5 0c1 0 5-2.5 5-7.5 0-2 3-2 3 0s0 3-1 5.5h6a1 1 0 0 1 1 1v3.24a2 2 0 0 1-.505 1.328l-2.898 3.26a2 2 0 0 1-1.495.672h-6.769a1 1 0 0 1-.6-.2L8 18.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="ml-2 text-xl">{likeCount}</span>
      </button>

      <button
        onClick={() => toggleReaction(Reaction.DISLIKE)}
        aria-label="Поставить или убрать дизлайк"
        aria-pressed={reaction === Reaction.DISLIKE}
        className="group flex items-center p-1 transition-colors"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-200 ease-out stroke-[1.5]
            ${
              reaction === Reaction.DISLIKE
                ? 'stroke-red-500 group-hover:stroke-red-600'
                : 'stroke-gray-400 group-hover:stroke-red-600 dark:stroke-gray-500 dark:group-hover:stroke-red-600'
            }
            active:scale-[0.97]`}
        >
          <path
            d="M22 11.5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2zm-5 0c-1 0-5 2.5-5 7.5 0 2-3 2-3 0s0-3 1-5.5H4a1 1 0 0 1-1-1V9.26a2 2 0 0 1 .505-1.328l2.898-3.26A2 2 0 0 1 7.898 4h6.769a1 1 0 0 1 .6.2L17 5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="ml-2 text-xl">{dislikeCount}</span>
      </button>
    </div>
  );
};

export default ReactionButtonGroupForPost;
