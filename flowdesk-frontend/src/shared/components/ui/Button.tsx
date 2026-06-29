import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { IconRefreshCw } from './icons';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-700 text-white hover:bg-brand-800 focus-visible:ring-brand-700/40 active:bg-brand-900',
  secondary:
    'bg-brand-100 text-brand-800 hover:bg-brand-200 focus-visible:ring-brand-700/30 active:bg-brand-200',
  ghost:
    'bg-transparent text-ink-muted hover:bg-app-bg hover:text-ink focus-visible:ring-ink/20 active:bg-app-bg',
  danger:
    'bg-danger text-white hover:bg-red-700 focus-visible:ring-danger/40 active:bg-red-800',
  outline:
    'border border-border bg-surface text-ink hover:border-border-strong hover:bg-app-bg focus-visible:ring-ink/20 active:bg-app-bg',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-sm gap-2',
};

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-control font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <IconRefreshCw size={14} className="animate-spin" />
          <span>Loading…</span>
        </>
      ) : (
        <>
          {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
          {children}
          {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
