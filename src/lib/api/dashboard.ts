import { apiClient } from './client';
import type { Dashboard } from '@/types/dashboard';

interface GetDashboardsInfiniteScrollParams {
  navigationMethod: 'infiniteScroll';
  cursorId?: number;
  size?: number;
}

interface GetDashboardsPaginationParams {
  navigationMethod: 'pagination';
  page?: number;
  size?: number;
}

export type GetDashboardsParams =
  | GetDashboardsInfiniteScrollParams
  | GetDashboardsPaginationParams;

export interface GetDashboardsResponse {
  cursorId: number;
  totalCount: number;
  dashboards: Dashboard[];
}

export interface DashboardInviter {
  nickname: string;
  email: string;
  id: number;
}

export interface DashboardInvitation {
  id: number;
  inviter: DashboardInviter;
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: DashboardInviter;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetInvitationsResponse {
  totalCount: number;
  invitations: DashboardInvitation[];
}

export interface GetReceivedInvitationsParams {
  cursorId?: number;
  size?: number;
  title?: string;
}

export interface GetReceivedInvitationsResponse {
  cursorId: number | null;
  invitations: DashboardInvitation[];
}

export interface CreateDashboardRequest {
  title: string;
  color: string;
}

export interface UpdateDashboardRequest {
  title: string;
  color: string;
}

export const dashboardApi = {
  getList: (params: GetDashboardsParams, signal?: AbortSignal) =>
    apiClient.get<GetDashboardsResponse>('/dashboards', { params, signal }),

  create: (data: CreateDashboardRequest) => apiClient.post<Dashboard>('/dashboards', data),

  getOne: (dashboardId: number) => apiClient.get<Dashboard>(`/dashboards/${dashboardId}`),

  update: (dashboardId: number, data: UpdateDashboardRequest) =>
    apiClient.put<Dashboard>(`/dashboards/${dashboardId}`, data),

  delete: (dashboardId: number) => apiClient.delete(`/dashboards/${dashboardId}`),

  invite: (dashboardId: number, email: string) =>
    apiClient.post<DashboardInvitation>(`/dashboards/${dashboardId}/invitations`, { email }),

  getInvitations: (dashboardId: number, params?: { page?: number; size?: number }) =>
    apiClient.get<GetInvitationsResponse>(`/dashboards/${dashboardId}/invitations`, { params }),

  cancelInvitation: (dashboardId: number, invitationId: number) =>
    apiClient.delete(`/dashboards/${dashboardId}/invitations/${invitationId}`),

  // 받은 초대 목록은 cursor 기반이라 홈 화면 무한스크롤에서 사용
  getReceivedInvitations: (params?: GetReceivedInvitationsParams, signal?: AbortSignal) =>
    apiClient.get<GetReceivedInvitationsResponse>('/invitations', { params, signal }),

  // 수락하면 해당 대시보드가 내 목록에 추가됨
  acceptInvitation: (invitationId: number) =>
    apiClient.put<DashboardInvitation>(`/invitations/${invitationId}`, {
      inviteAccepted: true,
    }),

  // 거절하면 받은 초대 목록에서 제거됨
  rejectInvitation: (invitationId: number) => apiClient.delete(`/invitations/${invitationId}`),
};
