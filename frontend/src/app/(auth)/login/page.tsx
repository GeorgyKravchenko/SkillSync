'use client';
import BaseButton from '@/components/ui/BaseButton';
import BaseInput from '@/components/ui/BaseInput';
import useLogin from '@/hooks/useLogin';
import { IUserLogin } from '@/types/user.types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const router = useRouter();
  const { mutate, isSuccess, isError } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>();
  const onSubmit = (data: IUserLogin) => mutate(data);
  useEffect(() => {
    if (!isSuccess) return;
    router.push('/');
  }, [isSuccess, router]);

  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Реєстрація</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4 flex flex-col gap-1">
          <BaseInput {...register('email', { required: true })} type="email" placeholder="Email" />
          {errors.email && <span className="text-red-500 mx-4">{`Email обов'язковий`}</span>}
        </div>
        <div className="mb-6 flex flex-col gap-1">
          <BaseInput
            {...register('password', { required: true })}
            type="password"
            placeholder="Пароль"
          />
          {errors.password && <span className="text-red-500 mx-4">{`Пароль обов'язковий`}</span>}
          {isError && (
            <span className="text-red-500 mx-4">
              Неправильний email або пароль. Спробуйте ще раз.
            </span>
          )}
        </div>

        <BaseButton type="submit">Зареєструватися</BaseButton>
      </form>
    </section>
  );
};
export default LoginPage;
