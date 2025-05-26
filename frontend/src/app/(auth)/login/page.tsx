import BaseButton from '@/components/ui/BaseButton';
import BaseInput from '@/components/ui/BaseInput';

const LoginPage = () => {
  return (
    <section className="mb-8">
      <h2 className="text-3xl font-semibold mb-4">Увійти в акаунт</h2>
      <BaseInput type="email" placeholder="Ваш email" className="mb-4" />
      <BaseInput type="password" placeholder="Пароль" className="mb-6" />
      <BaseButton>Увійти</BaseButton>
    </section>
  );
};
export default LoginPage;
