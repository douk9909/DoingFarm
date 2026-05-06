import 'server-only';

import { serverApiRequest } from './serverClient';
import type { GetDashboardsParams, GetDashboardsResponse } from './dashboard';

export const serverDashboardApi = {
  // 내 대시보드 첫 화면처럼 "처음부터 보여줘야 하는 데이터"는 서버에서 먼저 요청합니다.
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
