import { apiClient } from './client';
import type { Dashboard } from '@/types/dashboard';

export interface GetDashboardsParams {
  navigationMethod: 'infiniteScroll' | 'pagination';
  cursorId?: number;
  page?: number;
  size?: number;
}

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

export interface CreateDashboardRequest {
  title: string;
  color: string;
}

export interface UpdateDashboardRequest {
  title: string;
  color: string;
}

export const dashboardApi = {
  getList: (params: GetDashboardsParams) =>
    apiClient.get<GetDashboardsResponse>('/dashboards', { params }),

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
};
