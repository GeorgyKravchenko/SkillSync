import ProfileService from '@/services/profile.service';
import { IUpdateProfile } from '@/types/user.types';
import { useMutation } from '@tanstack/react-query';

const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ['profile'],
    mutationFn: (data: IUpdateProfile) => ProfileService.updateProfile(data),
  });
};

export default useUpdateProfile;
