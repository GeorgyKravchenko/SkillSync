import CommentService from '@/services/comment.service';
import { useMutation } from '@tanstack/react-query';
import usePost from '../post/usePost';

const useUpdateComment = (postId: number) => {
  const { refetch } = usePost(postId);
  return useMutation({
    mutationKey: ['updateComment'],
    mutationFn: (data: { id: number; content: string }) =>
      CommentService.updateComment(data.content, data.id),
    onSuccess: () => {
      refetch();
    },
  });
};

export default useUpdateComment;
