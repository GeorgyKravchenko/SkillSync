import PostsService from '@/services/posts.service';
import { IPostCreateDto } from '@/types/post.types';
import { useMutation } from '@tanstack/react-query';

const useCreatePost = () => {
  return useMutation({
    mutationKey: ['createPost'],
    mutationFn: (data: IPostCreateDto) => PostsService.createPost(data),
  });
};
export default useCreatePost;
