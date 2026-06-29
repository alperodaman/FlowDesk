import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { loginSchema, type LoginFormValues } from '../schemas/loginSchema';
import { Input } from '@/shared/components/ui/Input';
import { Button } from '@/shared/components/ui/Button';
import { FormField } from '@/shared/components/ui/FormField';
import { Alert } from '@/shared/components/feedback/Alert';
import { ROUTES } from '@/constants/routes';

export function LoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      {loginMutation.isError && (
        <Alert variant="danger">
          Email or password is incorrect. Please try again.
        </Alert>
      )}

      <FormField label="Email" htmlFor="email" required error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          error={!!errors.email}
          {...register('email')}
        />
      </FormField>

      <FormField label="Password" htmlFor="password" required error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={!!errors.password}
          {...register('password')}
        />
      </FormField>

      <div className="flex items-center justify-end">
        <Link
          to={ROUTES.FORGOT_PASSWORD}
          className="text-sm font-medium text-brand-700 transition-colors hover:text-brand-800"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" fullWidth size="lg" loading={loginMutation.isPending}>
        Sign in
      </Button>
    </form>
  );
}
