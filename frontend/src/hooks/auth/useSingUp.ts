// hooks/useSignUp.ts
import AuthService from '@/services/auth.service';
import { IUserRegister } from '@/types/user.types';
import { useMutation } from '@tanstack/react-query';

const useSignUp = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: IUserRegister) => AuthService.register(data),
  });
};

export default useSignUp;
