import CommentService from '@/services/comment.service';
import { useMutation } from '@tanstack/react-query';
import usePost from '../post/usePost';

const useDeleteComment = (postId: number) => {
  const { refetch } = usePost(postId);
  return useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: (id: number) => CommentService.deleteComment(id),
    onSuccess: () => {
      refetch();
    },
  });
};

export default useDeleteComment;
