import PostsService from '@/services/posts.service';
import { useQuery } from '@tanstack/react-query';

const usePost = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const response = await PostsService.getPostById(id);
      console.log('usePost response:', response.data);
      return response.data;
    },
  });
};

export default usePost;
