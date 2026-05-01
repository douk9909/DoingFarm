'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import InvitedDashboardList from './InvitedDashboardList';
import MyDashboardList from './MyDashboardList';
import { useDashboardCreateModal } from '@/components/dashboard/create/DashboardCreateModalProvider';
import { dashboardApi } from '@/lib/api/dashboard';
import type { Dashboard } from '@/types/dashboard';
import { dashboardPageContent } from '../_content/dashboardContent';
import styles from '../page.module.css';

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
  // 서버에서 먼저 받아온 대시보드를 첫 화면에 바로 보여줌
  const [dashboards, setDashboards] = useState(initialDashboards);
  const [totalCount, setTotalCount] = useState(dashboardTotalCount);
  const [page, setPage] = useState(1);
  const [isLoadingDashboards, setIsLoadingDashboards] = useState(true);
  const [dashboardError, setDashboardError] = useState(initialError);
  const dashboardSection = dashboardPageContent.sections[0];
  const invitedSection = dashboardPageContent.sections[1];

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalCount / dashboardPageSize)),
    [dashboardPageSize, totalCount],
  );

  const fetchDashboardPage = useCallback(
    async (nextPage: number) => {
      setIsLoadingDashboards(true);
      setDashboardError(null);

      try {
        const response = await dashboardApi.getList({
          navigationMethod: 'pagination',
          page: nextPage,
          size: dashboardPageSize,
        });

        setDashboards(response.data.dashboards);
        setTotalCount(response.data.totalCount);
        setPage(nextPage);
      } catch (error) {
        setDashboardError(
          error instanceof Error ? error.message : '대시보드를 불러오지 못했어요',
        );
      } finally {
        setIsLoadingDashboards(false);
      }
    },
    [dashboardPageSize],
  );

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      // 새로고침으로 진입했을 때 서버 초기값이 비어 있어도 클라이언트에서 최신 목록을 다시 맞춤
      void fetchDashboardPage(1);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [fetchDashboardPage]);

  useEffect(() => {
    if (dashboardListVersion === 0) return;

    const timerId = window.setTimeout(() => {
      // 생성 모달에서 새 대시보드를 만들면 홈 목록도 첫 페이지부터 다시 맞춤
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