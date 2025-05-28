import AuthService from '@/services/auth.service';
import { IUserLogin } from '@/types/user.types';
import { useMutation } from '@tanstack/react-query';

const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: IUserLogin) => AuthService.login(data),
  });
};

export default useLogin;
