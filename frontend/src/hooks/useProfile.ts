import ProfileService from '@/services/profile.service';
import { useQuery } from '@tanstack/react-query';

const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => ProfileService.getProfile(),
    select: (data) => data.data,
  });
};

export default useGetProfile;
