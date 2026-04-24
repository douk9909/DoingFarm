import { apiClient } from './client';
import type { Card } from '@/types/card';

export interface GetCardsResponse {
  cursorId: number;
  totalCount: number;
  cards: Card[];
}

export interface GetCardsParams {
  columnId: number;
  size?: number;
  cursorId?: number;
}

export interface CreateCardRequest {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
}

export interface UpdateCardRequest {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
}

export const cardApi = {
  create: (data: CreateCardRequest) => apiClient.post<Card>('/cards', data),

  getList: (params: GetCardsParams) => apiClient.get<GetCardsResponse>('/cards', { params }),

  getOne: (cardId: number) => apiClient.get<Card>(`/cards/${cardId}`),

  update: (cardId: number, data: UpdateCardRequest) =>
    apiClient.put<Card>(`/cards/${cardId}`, data),

  delete: (cardId: number) => apiClient.delete(`/cards/${cardId}`),
};
