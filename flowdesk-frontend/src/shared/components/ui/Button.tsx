import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  variant?: Variant;
  loading?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition',
        variant === 'primary' && 'bg-slate-900 text-white hover:bg-slate-800',
        variant === 'secondary' && 'bg-slate-200 text-slate-900 hover:bg-slate-300',
        variant === 'ghost' && 'bg-transparent text-slate-900 hover:bg-slate-100',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Yükleniyor...' : children}
    </button>
  );
}
