import PostsService from '@/services/posts.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
const useSearchPosts = (searchQuery: string) => {
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  return useQuery({
    queryKey: ['posts', debouncedSearch],
    queryFn: () => {
      if (!debouncedSearch || debouncedSearch.length === 0) return PostsService.getPosts();
      else return PostsService.searchPosts(debouncedSearch);
    },
    select: (data) => data.data,
  });
};

export default useSearchPosts;
