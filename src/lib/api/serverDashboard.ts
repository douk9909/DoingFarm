import 'server-only';

import { serverApiRequest } from './serverClient';
import type { GetDashboardsParams, GetDashboardsResponse } from './dashboard';

export const serverDashboardApi = {
  // 나의 대시보드 첫 화면은 서버에서 먼저 가져와 클라이언트 초기값으로 사용
  getList: (params: GetDashboardsParams) => {
    const query =
      params.navigationMethod === 'pagination'
        ? {
            navigationMethod: params.navigationMethod,
            page: params.page,
            size: params.size,
          }
        : {
            navigationMethod: params.navigationMethod,
            cursorId: params.cursorId,
            size: params.size,
          };

    return serverApiRequest<GetDashboardsResponse>('/dashboards', { params: query });
  },
};
