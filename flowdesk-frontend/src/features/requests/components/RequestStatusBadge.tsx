import { StatusBadge } from '@/shared/components/ui/StatusBadge';
import type { RequestStatus } from '@/types/domain.types';

interface RequestStatusBadgeProps {
  status: RequestStatus;
  size?: 'sm' | 'md';
}

const labelMap: Record<RequestStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  approved: 'Approved',
  rejected: 'Rejected',
};

export function RequestStatusBadge({ status, size }: RequestStatusBadgeProps) {
  return <StatusBadge status={status} label={labelMap[status]} size={size} />;
}
