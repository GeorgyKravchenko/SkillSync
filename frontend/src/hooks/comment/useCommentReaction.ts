import CommentService from '@/services/comment.service';
import { Reaction } from '@/types/reaction.enum';
import { useMutation } from '@tanstack/react-query';
import usePost from '../post/usePost';

const useCommentReaction = (reactionType: Reaction, postId: number) => {
  const { refetch } = usePost(postId);

  return useMutation({
    mutationKey: ['comment-reaction', reactionType],
    mutationFn: (id: number) => {
      return reactionType === Reaction.LIKE
        ? CommentService.addLikeForComment(id)
        : CommentService.addDislikeForComment(id);
    },
    onSuccess: (res) => {
      refetch();
      console.log(`Comment ${reactionType.toLowerCase()}d successfully`, res);
    },
  });
};

export const useLikeComment = (postId: number) => useCommentReaction(Reaction.LIKE, postId);
export const useDislikeComment = (postId: number) => useCommentReaction(Reaction.DISLIKE, postId);
