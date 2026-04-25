import { apiClient } from './client';
import type { Comment } from '@/types/comment';

export interface GetCommentsParams {
  cardId: number;
  size?: number;
  cursorId?: number;
}

export interface GetCommentsResponse {
  cursorId: number;
  comments: Comment[];
}

export interface CreateCommentRequest {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface UpdateCommentRequest {
  content: string;
}

export const commentApi = {
  create: (data: CreateCommentRequest) => apiClient.post<Comment>('/comments', data),

  getList: (params: GetCommentsParams) =>
    apiClient.get<GetCommentsResponse>('/comments', { params }),

  update: (commentId: number, data: UpdateCommentRequest) =>
    apiClient.put<Comment>(`/comments/${commentId}`, data),

  delete: (commentId: number) => apiClient.delete(`/comments/${commentId}`),
};
