'use client';
import BaseButton from '@/components/ui/BaseButton';
import BaseInput from '@/components/ui/BaseInput';
import useSingUp from '@/hooks/auth/useSingUp';
import { IUserCreateDto } from '@/types/user.types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const SingUpPage = () => {
  const router = useRouter();
  const { mutate, isSuccess } = useSingUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCreateDto>();
  const onSubmit = (data: IUserCreateDto) => {
    mutate(data);
    console.log('Registration submitted', data);
  };
  useEffect(() => {
    if (!isSuccess) return;
    router.push('/');
  }, [isSuccess, router]);
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Реєстрація</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4 flex flex-col gap-1">
          <BaseInput
            {...register('name', { required: true })}
            type="text"
            placeholder="Ім'я користувача"
          />
          {errors.name && (
            <span className="text-red-500 mx-4">{`Ім'я користувача обов'язкове`}</span>
          )}
        </div>
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
        </div>

        <BaseButton type="submit">Зареєструватися</BaseButton>
      </form>
    </section>
  );
};
export default SingUpPage;
