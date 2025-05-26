import BaseButton from '@/components/ui/BaseButton';
import BaseInput from '@/components/ui/BaseInput';

const SingUpPage = () => {
  return (
    <section>
      <h2 className="text-3xl font-semibold mb-4">Реєстрація</h2>
      <BaseInput type="text" placeholder="Ім'я користувача" className="mb-4" />
      <BaseInput type="email" placeholder="Email" className="mb-4" />
      <BaseInput type="password" placeholder="Пароль" className="mb-6" />
      <BaseButton>Зареєструватися</BaseButton>
    </section>
  );
};
export default SingUpPage;
