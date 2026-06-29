import clsx from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  center?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
};

export function LoadingSpinner({ size = 'md', className, label = 'Loading…', center = false }: LoadingSpinnerProps) {
  const spinner = (
    <div
      role="status"
      aria-label={label}
      className={clsx('flex items-center gap-2', center && 'justify-center', className)}
    >
      <div
        className={clsx(
          'animate-spin rounded-full border-brand-100 border-t-brand-700',
          sizeClasses[size],
        )}
      />
      {center && <span className="sr-only">{label}</span>}
    </div>
  );

  if (center) {
    return (
      <div className="flex min-h-32 items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}
