'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import InvitedDashboardList from './InvitedDashboardList';
import MyDashboardList from './MyDashboardList';
import { useDashboardCreateModal } from '@/components/dashboard/create/DashboardCreateModalProvider';
import { dashboardApi } from '@/lib/api/dashboard';
import type { Dashboard } from '@/types/dashboard';
import { dashboardPageContent } from '../_content/dashboardContent';
import styles from '../page.module.css';

const COMPACT_DASHBOARD_PAGE_SIZE = 1;
const DESKTOP_DASHBOARD_MEDIA_QUERY = '(min-width: 1200px)';

interface MyDashboardHomeClientProps {
  initialDashboards: Dashboard[];
  dashboardTotalCount: number;
  dashboardPageSize: number;
  initialError: string | null;
}

export default function MyDashboardHomeClient({
  initialDashboards,
  dashboardTotalCount,
  dashboardPageSize,
  initialError,
}: MyDashboardHomeClientProps) {
  const { openDashboardCreateModal, dashboardListVersion } = useDashboardCreateModal();
  // 서버가 먼저 가져온 값을 클라이언트 상태의 시작값으로 사용합니다.
  // 발표에서는 이 부분을 "서버가 준비한 화면을 클라이언트가 이어받는다"라고 설명하면 됩니다.
  const [dashboards, setDashboards] = useState(initialDashboards);
  const [totalCount, setTotalCount] = useState(dashboardTotalCount);
  const [page, setPage] = useState(1);
  const [activeDashboardPageSize, setActiveDashboardPageSize] = useState(dashboardPageSize);
  const [isLoadingDashboards, setIsLoadingDashboards] = useState(true);
  const [dashboardError, setDashboardError] = useState(initialError);
  const dashboardSection = dashboardPageContent.sections[0];
  const invitedSection = dashboardPageContent.sections[1];

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalCount / activeDashboardPageSize)),
    [activeDashboardPageSize, totalCount],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_DASHBOARD_MEDIA_QUERY);

    const updateDashboardPageSize = () => {
      // PC는 한 화면에 대시보드 3개, 태블릿/모바일은 1개만 보여서 요청 개수도 화면에 맞춥니다.
      setActiveDashboardPageSize(
        mediaQuery.matches ? dashboardPageSize : COMPACT_DASHBOARD_PAGE_SIZE,
      );
    };

    updateDashboardPageSize();
    mediaQuery.addEventListener('change', updateDashboardPageSize);

    return () => {
      mediaQuery.removeEventListener('change', updateDashboardPageSize);
    };
  }, [dashboardPageSize]);

  const fetchDashboardPage = useCallback(
    async (nextPage: number) => {
      // 처음 이후의 페이지 이동은 사용자의 클릭으로 일어나기 때문에 클라이언트에서 다시 요청합니다.
      setIsLoadingDashboards(true);
      setDashboardError(null);

      try {
        const response = await dashboardApi.getList({
          navigationMethod: 'pagination',
          page: nextPage,
          size: activeDashboardPageSize,
        });

        setDashboards(response.data.dashboards);
        setTotalCount(response.data.totalCount);
        setPage(nextPage);
      } catch (error) {
        setDashboardError(error instanceof Error ? error.message : '대시보드를 불러오지 못했어요');
      } finally {
        setIsLoadingDashboards(false);
      }
    },
    [activeDashboardPageSize],
  );

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      // 서버 초기값을 먼저 보여준 뒤, 클라이언트에서 최신 목록을 한 번 더 맞춥니다.
      void fetchDashboardPage(1);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [fetchDashboardPage]);

  useEffect(() => {
    if (dashboardListVersion === 0) return;

    const timerId = window.setTimeout(() => {
      // 새 대시보드를 만들면 목록과 페이지 수가 바뀔 수 있어서 첫 페이지부터 다시 가져옵니다.
      void fetchDashboardPage(1);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [dashboardListVersion, fetchDashboardPage]);

  const handlePrevPage = () => {
    if (page <= 1 || isLoadingDashboards) return;
    void fetchDashboardPage(page - 1);
  };

  const handleNextPage = () => {
    if (page >= totalPages || isLoadingDashboards) return;
    void fetchDashboardPage(page + 1);
  };

  return (
    <div className={styles.sectionList}>
      <section className={styles.section}>
        <MyDashboardList
          title={dashboardSection.hideTitle ? undefined : dashboardSection.title}
          emptySection={dashboardSection}
          dashboards={dashboards}
          totalCount={totalCount}
          page={page}
          totalPages={totalPages}
          isLoading={isLoadingDashboards}
          error={dashboardError}
          onCreateDashboard={openDashboardCreateModal}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{invitedSection.title}</h2>
        <InvitedDashboardList emptySection={invitedSection} />
      </section>
    </div>
  );
}
