import { Link } from 'react-router-dom';
import { RequestStatusBadge } from './RequestStatusBadge';
import { IconChevronRight } from '@/shared/components/ui/icons';
import type { Request } from '@/types/domain.types';

interface RequestCardProps {
  request: Request;
}

const typeLabel: Record<Request['type'], string> = {
  purchase: 'Purchase',
  leave: 'Leave',
  access: 'Access',
};

export function RequestCard({ request }: RequestCardProps) {
  return (
    <Link
      to={`/requests/${request.id}`}
      className="flex items-center gap-4 rounded-card border border-border bg-surface p-4 shadow-card transition-colors hover:border-brand-300 hover:bg-surface-raised"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">{request.title}</p>
        <p className="mt-0.5 text-xs text-ink-muted">
          {typeLabel[request.type]} ·{' '}
          {new Date(request.createdAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <RequestStatusBadge status={request.status} size="sm" />
        <IconChevronRight size={16} className="text-ink-subtle" />
      </div>
    </Link>
  );
}
