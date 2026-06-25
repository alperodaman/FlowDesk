import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';
import type { Request } from '@/types/domain.types';
import type { CreateRequestPayload } from '../types/RequestTypes';

export const requestsApi = {
  list: async () => {
    const { data } = await api.get<ApiResponse<Request[]>>('/requests');
    return data.data;
  },
  detail: async (id: string) => {
    const { data } = await api.get<ApiResponse<Request>>(`/requests/${id}`);
    return data.data;
  },
  create: async (payload: CreateRequestPayload) => {
    const { data } = await api.post<ApiResponse<Request>>('/requests', payload);
    return data.data;
  },
};
