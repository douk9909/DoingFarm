import { apiClient } from './client';
import type { Column } from '@/types/column';

export interface GetColumnsResponse {
  result: string;
  data: Column[];
}

export interface CreateColumnRequest {
  title: string;
  dashboardId: number;
}

export interface UpdateColumnRequest {
  title: string;
}

export const columnApi = {
  create: (data: CreateColumnRequest) => apiClient.post<Column>('/columns', data),

  getList: (dashboardId: number) =>
    apiClient.get<GetColumnsResponse>('/columns', {
      params: { dashboardId },
    }),

  update: (columnId: number, data: UpdateColumnRequest) =>
    apiClient.put<Column>(`/columns/${columnId}`, data),

  delete: (columnId: number) => apiClient.delete(`/columns/${columnId}`),

  uploadCardImage: (columnId: number, file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient.post<{ imageUrl: string }>(`/columns/${columnId}/card-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
