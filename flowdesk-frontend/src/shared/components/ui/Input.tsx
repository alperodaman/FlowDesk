import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftAddon, rightAddon, error, ...props }, ref) => {
    if (leftAddon || rightAddon) {
      return (
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="pointer-events-none absolute left-3 flex items-center text-ink-subtle">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            className={clsx(
              'h-9 w-full rounded-control border bg-surface text-sm text-ink placeholder:text-ink-subtle',
              'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0',
              error
                ? 'border-danger focus:border-danger focus:ring-danger/20'
                : 'border-border focus:border-brand-600 focus:ring-brand-600/20',
              leftAddon && 'pl-9',
              rightAddon && 'pr-9',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            {...props}
          />
          {rightAddon && (
            <div className="pointer-events-none absolute right-3 flex items-center text-ink-subtle">
              {rightAddon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={clsx(
          'h-9 w-full rounded-control border bg-surface px-3 text-sm text-ink placeholder:text-ink-subtle',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0',
          error
            ? 'border-danger focus:border-danger focus:ring-danger/20'
            : 'border-border focus:border-brand-600 focus:ring-brand-600/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
