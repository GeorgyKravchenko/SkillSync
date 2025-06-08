import { Reaction } from '@/types/reaction.enum';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usePost from '../post/usePost';
import PostsService from '@/services/posts.service';
import { IPost } from '@/types/post.types';

const usePostReaction = (reactionType: Reaction, postId: number) => {
  const queryClient = useQueryClient();
  const { data: post } = usePost(postId);

  return useMutation({
    mutationKey: ['post-reaction', reactionType],
    mutationFn: (id: number) => {
      return reactionType === Reaction.LIKE
        ? PostsService.addLikeForPost(id)
        : PostsService.addDislikeForPost(id);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] });
      const previousPost = queryClient.getQueryData<IPost>(['post', postId]);

      if (previousPost) {
        const isLike = reactionType === Reaction.LIKE;
        const isDislike = reactionType === Reaction.DISLIKE;
        const hasLiked = previousPost.PostReactions?.some(
          (reaction) => reaction.reaction === Reaction.LIKE,
        );
        const hasDisliked = previousPost.PostReactions?.some(
          (reaction) => reaction.reaction === Reaction.DISLIKE,
        );

        queryClient.setQueryData<IPost>(['post', postId], {
          ...previousPost,
          likesCount: previousPost.likesCount + (isLike ? (hasLiked ? -1 : 1) : hasLiked ? -1 : 0),
          dislikesCount:
            previousPost.dislikesCount +
            (isDislike ? (hasDisliked ? -1 : 1) : hasDisliked ? -1 : 0),
          PostReactions:
            hasLiked || hasDisliked
              ? previousPost.PostReactions?.filter((r) => r.reaction !== reactionType)
              : post?.author?.id
                ? [
                    ...(previousPost.PostReactions || []),
                    { reaction: reactionType, authorId: post.author.id },
                  ]
                : previousPost.PostReactions,
        });
      }

      return { previousPost };
    },
    onError: (err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(['post', postId], context.previousPost);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
};

export const useLikePost = (postId: number) => usePostReaction(Reaction.LIKE, postId);
export const useDislikePost = (postId: number) => usePostReaction(Reaction.DISLIKE, postId);
