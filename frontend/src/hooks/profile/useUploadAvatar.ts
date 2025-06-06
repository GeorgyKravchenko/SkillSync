import ProfileService from '@/services/profile.service';
import { useMutation } from '@tanstack/react-query';

const useUploadAvatar = () => {
  return useMutation({
    mutationKey: ['uploadAvatar'],
    mutationFn: async (file: File) => {
      return await ProfileService.uploadAvatar(file);
    },
    onSuccess: ({ data }) => {
      console.log('Avatar uploaded successfully:', data);
    },
  });
};
export default useUploadAvatar;
