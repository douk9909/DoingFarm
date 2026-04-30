'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EmptyDashboardPanel from './EmptyDashboardPanel';
import { useDashboardCreateModal } from '@/components/dashboard/create/DashboardCreateModalProvider';
import { dashboardApi } from '@/lib/api/dashboard';
import { DASHBOARD_COLOR_HEX_MAP } from '@/lib/constants/color';
import type { Dashboard } from '@/types/dashboard';
import chevronLeftIcon from '@/assets/icon/ic_chevron_left.svg';
import chevronRightIcon from '@/assets/icon/ic_chevorn_right.svg';
import crownIcon from '@/assets/icon/ic_crown.svg';
import plusIcon from '@/assets/icon/ic_plus3.svg';
import { dashboardPageContent } from '../_content/dashboardContent';
import styles from '../page.module.css';

interface MyDashboardHomeClientProps {
  initialDashboards: Dashboard[];
  dashboardTotalCount: number;
  dashboardPageSize: number;
  initialError: string | null;
}

const LEGACY_COLOR_MAP: Record<string, string> = {
  red: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-rose)'],
  orange: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-orange)'],
  yellow: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-yellow)'],
  blue: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-cobalt)'],
  green: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-green)'],
  purple: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-violet)'],
};

export default function MyDashboardHomeClient({
  initialDashboards,
  dashboardTotalCount,
  dashboardPageSize,
  initialError,
}: MyDashboardHomeClientProps) {
  const { openDashboardCreateModal, dashboardListVersion } = useDashboardCreateModal();
  // 서버에서 먼저 받아온 데이터를 초기 화면에 바로 보여줌
  const [dashboards, setDashboards] = useState(initialDashboards);
  const [totalCount, setTotalCount] = useState(dashboardTotalCount);
  const [page, setPage] = useState(1);
  const [isLoadingDashboards, setIsLoadingDashboards] = useState(false);
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
    if (dashboardListVersion === 0) return;

    const refreshFirstPage = async () => {
      try {
        const response = await dashboardApi.getList({
          navigationMethod: 'pagination',
          page: 1,
          size: dashboardPageSize,
        });

        // 생성 모달에서 새 대시보드를 만들면 홈 목록도 첫 페이지부터 다시 맞춤
        setDashboards(response.data.dashboards);
        setTotalCount(response.data.totalCount);
        setPage(1);
        setDashboardError(null);
      } catch (error) {
        setDashboardError(
          error instanceof Error ? error.message : '대시보드를 불러오지 못했어요',
        );
      }
    };

    void refreshFirstPage();
  }, [dashboardListVersion, dashboardPageSize]);

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
        <div className={styles.sectionHeader}>
          {dashboardSection.hideTitle ? null : (
            <h2 className={styles.sectionTitle}>{dashboardSection.title}</h2>
          )}

          {totalCount > 0 ? (
            <div className={styles.pagination}>
              <span>
                {page} of {totalPages}
              </span>
              <button
                type="button"
                aria-label="이전 대시보드 페이지"
                className={styles.pageButton}
                disabled={page <= 1 || isLoadingDashboards}
                onClick={handlePrevPage}
              >
                <Image src={chevronLeftIcon} alt="" width={16} height={16} />
              </button>
              <button
                type="button"
                aria-label="다음 대시보드 페이지"
                className={styles.pageButton}
                disabled={page >= totalPages || isLoadingDashboards}
                onClick={handleNextPage}
              >
                <Image src={chevronRightIcon} alt="" width={16} height={16} />
              </button>
            </div>
          ) : null}
        </div>

        {dashboardError ? <p className={styles.statusText}>{dashboardError}</p> : null}

        {dashboards.length > 0 ? (
          <div className={styles.dashboardCardGrid}>
            <button
              type="button"
              className={styles.createDashboardCard}
              onClick={openDashboardCreateModal}
            >
              새로운 대시보드
              <Image src={plusIcon} alt="" width={14} height={14} />
            </button>

            {dashboards.map((dashboard) => (
              <Link
                key={dashboard.id}
                href={`/dashboard/${dashboard.id}`}
                className={styles.dashboardCard}
              >
                <span
                  className={styles.dashboardColor}
                  style={{ backgroundColor: LEGACY_COLOR_MAP[dashboard.color] ?? dashboard.color }}
                />
                <span className={styles.dashboardTitle}>{dashboard.title}</span>
                {dashboard.createdByMe ? (
                  <Image
                    src={crownIcon}
                    alt="내가 만든 대시보드"
                    width={18}
                    height={18}
                    className={styles.dashboardCrown}
                  />
                ) : null}
                <Image src={chevronRightIcon} alt="" width={16} height={16} />
              </Link>
            ))}

            {isLoadingDashboards ? <p className={styles.statusText}>불러오는 중...</p> : null}
          </div>
        ) : (
          <EmptyDashboardPanel section={dashboardSection} />
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{invitedSection.title}</h2>
        <EmptyDashboardPanel section={invitedSection} />
      </section>
    </div>
  );
}
