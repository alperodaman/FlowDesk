import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-semibold">Giriş Yap</h1>
      <LoginForm />
    </div>
  );
}
