import { Link } from 'react-router-dom';
import { RequestStatusBadge } from './RequestStatusBadge';
import { IconEye } from '@/shared/components/ui/icons';
import type { Request } from '@/types/domain.types';

const typeLabel: Record<Request['type'], string> = {
  purchase: 'Purchase',
  leave: 'Leave',
  access: 'Access',
};

interface RequestTableProps {
  requests: Request[];
}

export function RequestTable({ requests }: RequestTableProps) {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
      {/* Desktop + Tablet table */}
      <div className="hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-app-bg text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
              <th className="px-5 py-3.5">Title</th>
              <th className="hidden px-5 py-3.5 xl:table-cell">Type</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="hidden px-5 py-3.5 xl:table-cell">Created</th>
              <th className="px-5 py-3.5">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-app-bg">
                <td className="px-5 py-4">
                  <Link
                    to={`/requests/${r.id}`}
                    className="font-medium text-ink hover:text-brand-700"
                  >
                    {r.title}
                  </Link>
                </td>
                <td className="hidden px-5 py-4 text-ink-muted xl:table-cell">{typeLabel[r.type]}</td>
                <td className="px-5 py-4">
                  <RequestStatusBadge status={r.status} size="sm" />
                </td>
                <td className="hidden px-5 py-4 text-ink-muted xl:table-cell">
                  {new Date(r.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    to={`/requests/${r.id}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-control text-ink-muted transition-colors hover:bg-brand-100 hover:text-brand-700"
                    aria-label={`View ${r.title}`}
                  >
                    <IconEye size={15} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <ul className="divide-y divide-border md:hidden">
        {requests.map((r) => (
          <li key={r.id}>
            <Link
              to={`/requests/${r.id}`}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{r.title}</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {typeLabel[r.type]} ·{' '}
                  {new Date(r.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <RequestStatusBadge status={r.status} size="sm" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
