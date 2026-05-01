'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DASHBOARD_COLOR_HEX_MAP } from '@/lib/constants/color';
import type { Dashboard } from '@/types/dashboard';
import chevronLeftIcon from '@/assets/icon/ic_chevron_left.svg';
import chevronRightIcon from '@/assets/icon/ic_chevorn_right.svg';
import crownIcon from '@/assets/icon/ic_crown.svg';
import plusIcon from '@/assets/icon/ic_plus3.svg';
import type { DashboardEmptySection } from '../_content/dashboardContent';
import EmptyDashboardPanel from './EmptyDashboardPanel';
import styles from './MyDashboardList.module.css';

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
  if (dashboards.length === 0) {
    // 에러가 있어도 목록이 비어 있으면 기존 빈 상태 화면을 유지함
    return <EmptyDashboardPanel section={emptySection} />;
  }

  return (
    <>
      <div className={styles.sectionHeader}>
        {title ? <h2 className={styles.sectionTitle}>{title}</h2> : null}

        {totalCount > 0 ? (
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
              <Image src={chevronLeftIcon} alt="" width={16} height={16} />
            </button>
            <button
              type="button"
              aria-label="다음 대시보드 페이지"
              className={styles.pageButton}
              disabled={page >= totalPages || isLoading}
              onClick={onNextPage}
            >
              <Image src={chevronRightIcon} alt="" width={16} height={16} />
            </button>
          </div>
        ) : null}
      </div>

      {error ? <p className={styles.statusText}>{error}</p> : null}

      <div className={styles.dashboardCardGrid}>
        <button type="button" className={styles.createDashboardCard} onClick={onCreateDashboard}>
          새로운 대시보드
          <Image src={plusIcon} alt="" width={14} height={14} />
        </button>

        {dashboards.map((dashboard) => (
          <Link
            key={dashboard.id}
            href={`/dashboard/${dashboard.id}`}
            className={styles.dashboardCard}
          >
            {/* API에서 예전 색상 이름이 와도 같은 색상 토큰으로 맞춰서 보여줌 */}
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

        {isLoading ? <p className={styles.statusText}>불러오는 중...</p> : null}
      </div>
    </>
  );
}
