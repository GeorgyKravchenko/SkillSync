import useAuthStore from '@/lib/store/user';
import AuthService from '@/services/auth.service';
import { IUserLogin } from '@/types/user.types';
import { useMutation } from '@tanstack/react-query';

const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: IUserLogin) => AuthService.login(data),
    onSuccess: (response) => {
      setUser(response.data.user);
    },
  });
};

export default useLogin;
