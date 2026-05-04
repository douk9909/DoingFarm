import { apiClient } from './client';
import type { DashboardInvitation } from './dashboard';

export interface GetMyInvitationsRequest {
  size?: number;
  cursorId?: number;
  title?: string;
}

export interface GetMyInvitationsResponse {
  cursorId: number;
  invitations: DashboardInvitation[];
}

export interface UpdateMyInvitationRequest {
  inviteAccepted: boolean;
}

export const invitationApi = {
  // 받은 초대 목록은 cursor 기반이라 홈 화면 무한스크롤에서 사용
  getReceivedInvitations: (params?: GetMyInvitationsRequest, signal?: AbortSignal) =>
    apiClient.get<GetMyInvitationsResponse>('/invitations', { params, signal }),

  /* 초대 응답 API 호출 */
  updateInvitation: (invitationId: number, data: UpdateMyInvitationRequest) =>
    apiClient.put(`/invitations/${invitationId}`, data),
};
