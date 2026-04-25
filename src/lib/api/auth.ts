import { apiClient } from './client';
import type { LoginRequest, LoginResponse, SignupRequest } from '@/types/auth';

export const authApi = {
  login: (data: LoginRequest) => apiClient.post<LoginResponse>('/auth/login', data),

  signup: (data: SignupRequest) => apiClient.post('/users', data),

  logout: () => apiClient.delete('/auth/tokens'),
};
