import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginForm } from './LoginForm';

function renderWithProviders(ui: React.ReactNode) {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe('LoginForm', () => {
  it('shows validation errors', async () => {
    const user = userEvent.setup();

    renderWithProviders(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /giriş yap/i }));

    expect(screen.getByText(/geçerli bir email/i)).toBeInTheDocument();
    expect(screen.getByText(/şifre en az 6 karakter/i)).toBeInTheDocument();
  });
});
