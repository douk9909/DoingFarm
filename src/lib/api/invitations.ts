import { apiClient } from './client';
import type { DashboardInvitation } from './dashboard';

export interface GetMyInvitationsRequest {
  size?: number;
  cursorId?: number;
  title: string;
}

export interface GetMyInvitationsResponse {
  cursorId: number;
  invitations: DashboardInvitation[];
}

export interface UpdateMyInvitationRequest {
  inviteAccepted: boolean;
}

export const invitationApi = {
  /* 내 초대 목록 API 호출 */
  getList: (params: GetMyInvitationsRequest) =>
    apiClient.get<GetMyInvitationsResponse>('/invitations', { params }),

  /* 초대 응답 API 호출 */
  updateInvitation: (invitationId: number, data: UpdateMyInvitationRequest) =>
    apiClient.put(`/invitations/${invitationId}`, data),
};
