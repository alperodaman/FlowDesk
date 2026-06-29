import { useRequests } from '../hooks/useRequests';
import { RequestTable } from './RequestTable';
import { RequestCard } from './RequestCard';
import { LoadingSpinner } from '@/shared/components/feedback/LoadingSpinner';
import { ErrorState } from '@/shared/components/feedback/ErrorState';
import { EmptyState } from '@/shared/components/data-display/EmptyState';
import { IconClipboardList } from '@/shared/components/ui/icons';

interface RequestListProps {
  search?: string;
  status?: string;
  type?: string;
}

export function RequestList({ search, status, type }: RequestListProps) {
  const { data, isLoading, isError, refetch } = useRequests();

  if (isLoading) {
    return <LoadingSpinner center />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Could not load requests"
        description="There was an error loading your requests. Please try again."
        onRetry={refetch}
      />
    );
  }

  if (!data?.length) {
    return (
      <EmptyState
        icon={<IconClipboardList size={28} />}
        title="No requests found"
        description="You haven't created any requests yet, or none match your filters."
      />
    );
  }

  return <RequestTable requests={data} />;
}
