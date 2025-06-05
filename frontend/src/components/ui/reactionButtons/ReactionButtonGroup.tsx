import { useState } from 'react';

const ReactionButtonGroup = () => {
  const [reaction, setReaction] = useState<'like' | 'dislike' | null>(null); // 'like' | 'dislike' | null

  return (
    <div className="flex items-center gap-2">
      <label className="cursor-pointer group p-1">
        <input
          type="radio"
          name="reaction"
          value="like"
          checked={reaction === 'like'}
          onChange={() => setReaction('like')}
          className="sr-only"
          aria-label="Поставить лайк"
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`
            transition-all duration-200 ease-out stroke-[1.5]
            ${
              reaction === 'like'
                ? 'stroke-cyan-400 group-hover:stroke-cyan-500'
                : 'stroke-gray-400 group-hover:stroke-cyan-600 dark:stroke-gray-500 dark:group-hover:stroke-cyan-600'
            }
            active:scale-[0.97]
          `}
        >
          <path
            d="M3 12.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm5 0c1 0 5-2.5 5-7.5 0-2 3-2 3 0s0 3-1 5.5h6a1 1 0 0 1 1 1v3.24a2 2 0 0 1-.505 1.328l-2.898 3.26a2 2 0 0 1-1.495.672h-6.769a1 1 0 0 1-.6-.2L8 18.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>

      <label className="cursor-pointer group p-1">
        <input
          type="radio"
          name="reaction"
          value="dislike"
          checked={reaction === 'dislike'}
          onChange={() => setReaction('dislike')}
          className="sr-only"
          aria-label="Поставить дизлайк"
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`
            transition-all duration-200 ease-out stroke-[1.5]
            ${
              reaction === 'dislike'
                ? 'stroke-red-500 group-hover:stroke-red-600'
                : 'stroke-gray-400 group-hover:stroke-red-600 dark:stroke-gray-500 dark:group-hover:stroke-red-600'
            }
            active:scale-[0.97]
          `}
        >
          <path
            d="M22 11.5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2zm-5 0c-1 0-5 2.5-5 7.5 0 2-3 2-3 0s0-3 1-5.5H4a1 1 0 0 1-1-1V9.26a2 2 0 0 1 .505-1.328l2.898-3.26A2 2 0 0 1 7.898 4h6.769a1 1 0 0 1 .6.2L17 5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>
    </div>
  );
};

export default ReactionButtonGroup;
