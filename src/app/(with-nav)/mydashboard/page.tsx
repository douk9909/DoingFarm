import Image from 'next/image';
import myDashboardBgImage from '@/assets/backgroundImg/dashboard_bg.svg';
import { serverDashboardApi } from '@/lib/api/serverDashboard';
import type { Dashboard } from '@/types/dashboard';
import MyDashboardHomeClient from './_components/MyDashboardHomeClient';
import { dashboardPageContent } from './_content/dashboardContent';
import styles from './page.module.css';

const DASHBOARD_PAGE_SIZE = 3;

export default async function MyDashboardPage() {
  let initialDashboards: Dashboard[] = [];
  let dashboardTotalCount = 0;
  let initialError: string | null = null;

  try {
    // 서버에서 첫 페이지를 먼저 가져와 클라이언트 초기 화면에 넘겨줌
    const dashboardResponse = await serverDashboardApi.getList({
      navigationMethod: 'pagination',
      page: 1,
      size: DASHBOARD_PAGE_SIZE,
    });

    initialDashboards = dashboardResponse.dashboards;
    dashboardTotalCount = dashboardResponse.totalCount;
  } catch (error) {
    initialError =
      error instanceof Error ? error.message : '대시보드를 불러오지 못했어요';
  }

  return (
    <section className={styles.page}>
      <div className={styles.backgroundLayer}>
        <Image
          src={myDashboardBgImage}
          alt=""
          fill
          sizes="100vw"
          className={styles.backgroundImage}
          priority
        />
      </div>

      <div className={styles.canvas}>
        <div className={styles.inner}>
          <header className={styles.hero}>
            <p className={styles.breadcrumb}>{dashboardPageContent.breadcrumb}</p>
            <h1 className={styles.pageTitle}>{dashboardPageContent.pageTitle}</h1>
          </header>

          <MyDashboardHomeClient
            initialDashboards={initialDashboards}
            dashboardTotalCount={dashboardTotalCount}
            dashboardPageSize={DASHBOARD_PAGE_SIZE}
            initialError={initialError}
          />
        </div>
      </div>
    </section>
  );
}
