import { forwardRef, type InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { IconSearch } from './icons';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClear, value, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <IconSearch size={16} className="pointer-events-none absolute left-3 text-ink-subtle" />
        <input
          ref={ref}
          type="search"
          value={value}
          className={clsx(
            'h-9 w-full rounded-control border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-ink-subtle',
            'transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';
