import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className={clsx('flex flex-col gap-1.5', className)} {...props}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-ink"
      >
        {label}
        {required && (
          <span className="ml-0.5 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-ink-subtle">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
