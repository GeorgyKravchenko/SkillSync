import useAuthStore from '@/lib/store/user';
import ProfileService from '@/services/profile.service';
import { IUpdateProfile } from '@/types/user.types';
import { useMutation } from '@tanstack/react-query';

const useUpdateProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationKey: ['profile'],
    mutationFn: (data: IUpdateProfile) => ProfileService.updateProfile(data),
    onSuccess: (response) => {
      setUser(response.data.user);
    },
  });
};

export default useUpdateProfile;
