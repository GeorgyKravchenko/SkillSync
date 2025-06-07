import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reaction } from '@/types/reaction.enum';
import CommentService from '@/services/comment.service';
import { IComment } from '@/types/comment.types';
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

    onSuccess: ({ data }, commentId) => {
      queryClient.setQueryData(['post', postId], (old: IPost) => {
        console.log('data', data);
        if (!old) return old;

        const data2 = {
          ...old,
          comments: old.comments
            .filter((comment) => !comment.isReply)
            .map((comment: IComment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    CommentReactions: [data.CommentReactions],
                    likesCount: data.likesCount,
                    dislikesCount: data.dislikesCount,
                    replies: comment.replies.map((reply) =>
                      reply.id === commentId
                        ? {
                            ...reply,
                            CommentReactions: [data.replies.CommentReactions],
                            likesCount: data.replies.likesCount,
                            dislikesCount: data.replies.dislikesCount,
                          }
                        : reply,
                    ),
                  }
                : comment,
            ),
        };
        console.log('data2', data2);
        return data2;
      });
    },
  });
};

export const useLikeComment = (postId: number) => useCommentReaction(Reaction.LIKE, postId);

export const useDislikeComment = (postId: number) => useCommentReaction(Reaction.DISLIKE, postId);
