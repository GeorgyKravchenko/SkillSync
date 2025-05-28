// hooks/useSignUp.ts
import AuthService from '@/services/auth.service';
import { IUserCreateDto } from '@/types/user.types';
import { useMutation } from '@tanstack/react-query';

const useSignUp = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: IUserCreateDto) => AuthService.register(data),
  });
};

export default useSignUp;
