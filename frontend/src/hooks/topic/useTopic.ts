import topicService from '@/services/topic.service';
import { useQuery } from '@tanstack/react-query';

const useTopic = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: () => topicService.getTopics(),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 60,
  });
};
export default useTopic;
