import PostsService from '@/services/posts.service';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

const usePost = (id: number) => {
  const router = useRouter();

  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      try {
        const response = await PostsService.getPostById(id);
        return response.data;
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 404) {
          router.push('/404');
        } else if (err.response?.status === 401) {
          router.push('/login');
        } else {
          throw err;
        }
      }
    },
  });
};

export default usePost;
