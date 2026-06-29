import clsx from 'clsx';
import { IconChevronLeft, IconChevronRight } from '@/shared/components/ui/icons';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }: PaginationProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-ink-muted">
        Showing <span className="font-medium text-ink">{start}–{end}</span> of{' '}
        <span className="font-medium text-ink">{totalItems}</span> results
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={clsx(
            'flex h-8 w-8 items-center justify-center rounded-control border text-sm transition-colors',
            page <= 1
              ? 'cursor-not-allowed border-border text-ink-subtle opacity-50'
              : 'border-border text-ink-muted hover:border-border-strong hover:bg-app-bg',
          )}
          aria-label="Previous page"
        >
          <IconChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          const isEllipsis =
            totalPages > 7 &&
            p !== 1 &&
            p !== totalPages &&
            (p < page - 1 || p > page + 1);

          if (isEllipsis) {
            if (p === 2 || p === totalPages - 1) {
              return (
                <span key={p} className="flex h-8 w-8 items-center justify-center text-sm text-ink-subtle">
                  …
                </span>
              );
            }
            return null;
          }

          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={clsx(
                'flex h-8 w-8 items-center justify-center rounded-control border text-sm font-medium transition-colors',
                p === page
                  ? 'border-brand-700 bg-brand-700 text-white'
                  : 'border-border text-ink-muted hover:border-border-strong hover:bg-app-bg',
              )}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={clsx(
            'flex h-8 w-8 items-center justify-center rounded-control border text-sm transition-colors',
            page >= totalPages
              ? 'cursor-not-allowed border-border text-ink-subtle opacity-50'
              : 'border-border text-ink-muted hover:border-border-strong hover:bg-app-bg',
          )}
          aria-label="Next page"
        >
          <IconChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
