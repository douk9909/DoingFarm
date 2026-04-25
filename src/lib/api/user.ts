import { apiClient } from './client';
import type { User } from '@/types/user';

export interface UpdateUserRequest {
  nickname: string;
  profileImageUrl?: string | null;
}

export interface UpdatePasswordRequest {
  password: string;
  newPassword: string;
}

export const userApi = {
  getMe: () => apiClient.get<User>('/users/me'),

  updateMe: (data: UpdateUserRequest) => apiClient.put<User>('/users/me', data),

  updatePassword: (data: UpdatePasswordRequest) => apiClient.put('/users/me/password', data),

  uploadProfileImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient.post<{ profileImageUrl: string }>('/users/me/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
