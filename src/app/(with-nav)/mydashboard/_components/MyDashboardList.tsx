'use client';

import Link from 'next/link';
import { DASHBOARD_COLOR_HEX_MAP } from '@/lib/constants/color';
import type { Dashboard } from '@/types/dashboard';
import PlusIcon from '@/assets/icons/PlusIcon';
import CrownIcon from '@/assets/icons/CrownIcon';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import type { DashboardEmptySection } from '../_content/dashboardContent';
import EmptyDashboardPanel from './EmptyDashboardPanel';
import styles from './MyDashboardList.module.css';
import SkeletonMyDashboardList from './Skeleton/SkeletonMyDashboardList';
import SkeletonPagination from './Skeleton/SkeletonPagination';

interface MyDashboardListProps {
  title?: string;
  emptySection: DashboardEmptySection;
  dashboards: Dashboard[];
  totalCount: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  onCreateDashboard: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const LEGACY_COLOR_MAP: Record<string, string> = {
  red: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-rose)'],
  orange: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-orange)'],
  yellow: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-yellow)'],
  blue: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-cobalt)'],
  green: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-green)'],
  purple: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-violet)'],
};

export default function MyDashboardList({
  title,
  emptySection,
  dashboards,
  totalCount,
  page,
  totalPages,
  isLoading,
  error,
  onCreateDashboard,
  onPrevPage,
  onNextPage,
}: MyDashboardListProps) {
  if (!isLoading && !error && dashboards.length === 0) {
    return <EmptyDashboardPanel section={emptySection} />;
  }

  return (
    <>
      <div className={styles.sectionHeader}>
        {title ? <h2 className={styles.sectionTitle}>{title}</h2> : null}

        {isLoading ? (
          <SkeletonPagination />
        ) : totalCount > 0 ? (
          <div className={styles.pagination}>
            <span>
              {page} of {totalPages}
            </span>

            <button
              type="button"
              aria-label="이전 대시보드 페이지"
              className={styles.pageButton}
              disabled={page <= 1 || isLoading}
              onClick={onPrevPage}
            >
              <ArrowLeftIcon width={16} height={16} />
            </button>

            <button
              type="button"
              aria-label="다음 대시보드 페이지"
              className={styles.pageButton}
              disabled={page >= totalPages || isLoading}
              onClick={onNextPage}
            >
              <ArrowRightIcon width={16} height={16} />
            </button>
          </div>
        ) : null}
      </div>

      {error ? <p className={styles.statusText}>{error}</p> : null}

      <div className={styles.dashboardCardGrid}>
        <button type="button" className={styles.createDashboardCard} onClick={onCreateDashboard}>
          새로운 대시보드
          <PlusIcon size={14} />
        </button>

        {isLoading ? (
          <SkeletonMyDashboardList />
        ) : (
          dashboards.map((dashboard) => (
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

              {dashboard.createdByMe ? <CrownIcon size={18} /> : null}

              <ArrowRightIcon width={16} height={16} />
            </Link>
          ))
        )}
      </div>
    </>
  );
}
