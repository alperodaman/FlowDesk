import { QUERY_KEY_PREFIX } from '@/constants/query-keys';

export const queryKeys = {
  auth: {
    me: () => [QUERY_KEY_PREFIX.AUTH, 'me'] as const,
  },
  requests: {
    all: () => [QUERY_KEY_PREFIX.REQUESTS] as const,
    list: (filters?: Record<string, unknown>) => [QUERY_KEY_PREFIX.REQUESTS, 'list', filters] as const,
    detail: (id: string) => [QUERY_KEY_PREFIX.REQUESTS, 'detail', id] as const,
  },
};
