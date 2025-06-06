import { Reaction } from '@/types/reaction.enum';
import { useMutation } from '@tanstack/react-query';
import usePost from '../post/usePost';
import PostsService from '@/services/posts.service';

const usePostReaction = (reactionType: Reaction, postId: number) => {
  const { refetch } = usePost(postId);

  return useMutation({
    mutationKey: ['post-reaction', reactionType],
    mutationFn: (id: number) => {
      return reactionType === Reaction.LIKE
        ? PostsService.addLikeForPost(id)
        : PostsService.addDislikeForPost(id);
    },
    onSuccess: () => {
      refetch();
    },
  });
};

export const useLikePost = (postId: number) => usePostReaction(Reaction.LIKE, postId);
export const useDislikePost = (postId: number) => usePostReaction(Reaction.DISLIKE, postId);
