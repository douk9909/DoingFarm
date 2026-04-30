'use client';

import EmptyDashboardPanel from './EmptyDashboardPanel';
import type { Dashboard } from '@/types/dashboard';
import { dashboardPageContent } from '../_content/dashboardContent';
import styles from '../page.module.css';

interface MyDashboardHomeClientProps {
  initialDashboards: Dashboard[];
  dashboardTotalCount: number;
  initialError: string | null;
}

export default function MyDashboardHomeClient({
  initialDashboards,
  dashboardTotalCount,
  initialError,
}: MyDashboardHomeClientProps) {
  // 서버에서 먼저 받아온 데이터를 초기 화면에 바로 보여줌
  const dashboardSection = dashboardPageContent.sections[0];
  const invitedSection = dashboardPageContent.sections[1];

  return (
    <div className={styles.sectionList}>
      <section className={styles.section}>
        {dashboardSection.hideTitle ? null : (
          <h2 className={styles.sectionTitle}>{dashboardSection.title}</h2>
        )}

        {initialError ? <p className={styles.statusText}>{initialError}</p> : null}

        {initialDashboards.length > 0 ? (
          <div className={styles.dashboardListPanel}>
            <p className={styles.statusText}>총 {dashboardTotalCount}개의 대시보드를 불러왔어요</p>
            {/* 다음 단계에서 카드 UI와 페이지네이션으로 교체할 임시 목록 */}
            <ul className={styles.dashboardPreviewList}>
              {initialDashboards.map((dashboard) => (
                <li key={dashboard.id} className={styles.dashboardPreviewItem}>
                  {dashboard.title}
                </li>
              ))}
            </ul>
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
