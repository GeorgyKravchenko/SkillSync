import CommentService from '@/services/comment.service';
import { ICommentCreateDto } from '@/types/comment.types';
import { useMutation } from '@tanstack/react-query';
import usePost from '../post/usePost';

const useCreateComment = (postId: number) => {
  const { refetch } = usePost(postId);
  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: (data: ICommentCreateDto) => CommentService.createComment(data),
    onSuccess: () => {
      refetch();
    },
  });
};

export default useCreateComment;
