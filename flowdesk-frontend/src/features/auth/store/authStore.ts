import { create } from 'zustand';
import type { AuthState } from '../types/AuthTypes';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (token, user) =>
    set({
      token,
      user,
      isAuthenticated: true,
    }),
  clearAuth: () =>
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    }),
}));
