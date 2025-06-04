// hooks/useSignUp.ts
import useAuthStore from '@/lib/store/user';
import AuthService from '@/services/auth.service';
import { IUserCreateDto } from '@/types/user.types';
import { useMutation } from '@tanstack/react-query';

const useSignUp = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: IUserCreateDto) => AuthService.register(data),
    onSuccess: (response) => {
      setUser(response.data.user);
    },
  });
};

export default useSignUp;
