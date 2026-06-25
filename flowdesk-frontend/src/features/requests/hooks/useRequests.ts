import { useQuery } from '@tanstack/react-query';
import { requestsApi } from '../api/requestsApi';
import { queryKeys } from '@/lib/query-keys';

export function useRequests() {
  return useQuery({
    queryKey: queryKeys.requests.list(),
    queryFn: requestsApi.list,
  });
}
