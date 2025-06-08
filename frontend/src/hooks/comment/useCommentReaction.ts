import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reaction } from '@/types/reaction.enum';
import CommentService from '@/services/comment.service';
import { IPost } from '@/types/post.types';

const useCommentReaction = (reactionType: Reaction, postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['comment-reaction', reactionType],
    mutationFn: (commentId: number) => {
      return reactionType === Reaction.LIKE
        ? CommentService.addLikeForComment(commentId)
        : CommentService.addDislikeForComment(commentId);
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ['post', postId] });
      const previousPost = queryClient.getQueryData<IPost>(['post', postId]);

      if (previousPost) {
        const comment = previousPost.comments?.find((c) => c.id === commentId);
        if (comment) {
          const isLike = reactionType === Reaction.LIKE;
          const isDislike = reactionType === Reaction.DISLIKE;
          const hasLiked = comment.CommentReactions?.some(
            (reaction) => reaction.reaction === Reaction.LIKE,
          );
          const hasDisliked = comment.CommentReactions?.some(
            (reaction) => reaction.reaction === Reaction.DISLIKE,
          );

          queryClient.setQueryData<IPost>(['post', postId], {
            ...previousPost,
            comments: previousPost.comments.map((c) =>
              c.id === commentId
                ? {
                    ...c,
                    likesCount: c.likesCount + (isLike ? (hasLiked ? -1 : 1) : hasLiked ? -1 : 0),
                    dislikesCount:
                      c.dislikesCount + (isDislike ? (hasDisliked ? -1 : 1) : hasDisliked ? -1 : 0),
                    CommentReactions:
                      hasLiked || hasDisliked
                        ? c.CommentReactions?.filter((r) => r.reaction !== reactionType)
                        : [
                            ...(c.CommentReactions || []),
                            { reaction: reactionType, authorId: c.author.id },
                          ],
                  }
                : c,
            ),
          });
        }
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

export const useLikeComment = (postId: number) => useCommentReaction(Reaction.LIKE, postId);
export const useDislikeComment = (postId: number) => useCommentReaction(Reaction.DISLIKE, postId);
