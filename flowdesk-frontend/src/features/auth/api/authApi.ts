import { api } from '@/lib/axios';
import type { ApiResponse } from '@/types/api.types';
import type { User } from '@/types/domain.types';
import type { LoginPayload } from '../types/AuthTypes';

interface LoginResponse {
  token: string;
  user: User;
}

export const authApi = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post<ApiResponse<LoginResponse>>('/auth/login', payload);
    return data.data;
  },
  me: async () => {
    const { data } = await api.get<ApiResponse<User>>('/auth/me');
    return data.data;
  },
};
