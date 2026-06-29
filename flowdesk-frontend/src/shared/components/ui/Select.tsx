import { forwardRef, type SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={clsx(
          'h-9 w-full appearance-none rounded-control border bg-surface px-3 pr-8 text-sm text-ink',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0',
          error
            ? 'border-danger focus:border-danger focus:ring-danger/20'
            : 'border-border focus:border-brand-600 focus:ring-brand-600/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")] bg-[position:right_12px_center] bg-no-repeat",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = 'Select';
