import PostsService from '@/services/posts.service';
import { useQuery } from '@tanstack/react-query';

const usePosts = (slug: string) => {
  return useQuery({
    queryKey: ['posts', slug],
    queryFn: () => PostsService.getPosts(),
    select: (data) => data.data,
  });
};
export default usePosts;
