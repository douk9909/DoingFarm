import { apiClient } from './client';

export interface GetMembersRequest {
  page: number;
  size: number;
  dashboardId: number;
}

export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface GetMembersResponse {
  members: Member[];
  totalCount: number;
}

export const memberApi = {
  /* 대시보드 멤버 조회 */
  getList: (params: GetMembersRequest) => apiClient.get<GetMembersRequest>('/members', { params }),
  /* 멤버 삭제 */
  deleteMember: (memberId: number) => apiClient.delete(`/members/${memberId}`),
};
