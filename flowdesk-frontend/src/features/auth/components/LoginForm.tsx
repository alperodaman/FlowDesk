import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../hooks/useLogin';
import { loginSchema, type LoginFormValues } from '../schemas/loginSchema';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';

export function LoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <form className="space-y-4 rounded-xl bg-white p-6 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input type="email" {...register('email')} />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Şifre</label>
        <Input type="password" {...register('password')} />
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      {loginMutation.isError && (
        <p className="text-sm text-red-600">Giriş başarısız. Bilgileri kontrol et.</p>
      )}

      <Button type="submit" className="w-full" loading={loginMutation.isPending}>
        Giriş Yap
      </Button>
    </form>
  );
}
