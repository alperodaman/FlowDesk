import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestsApi } from '../api/requestsApi';
import { queryKeys } from '@/lib/query-keys';

export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.requests.all() });
    },
  });
}
