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
    // 첫 화면에 바로 필요한 내 대시보드 목록은 서버에서 먼저 가져옵니다.
    // 이렇게 하면 사용자가 페이지에 들어왔을 때 빈 화면 대신 준비된 목록을 먼저 볼 수 있습니다.
    const dashboardResponse = await serverDashboardApi.getList({
      navigationMethod: 'pagination',
      page: 1,
      size: DASHBOARD_PAGE_SIZE,
    });

    initialDashboards = dashboardResponse.dashboards;
    dashboardTotalCount = dashboardResponse.totalCount;
  } catch (error) {
    initialError = error instanceof Error ? error.message : '대시보드를 불러오지 못했어요';
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

          {/* 서버에서 준비한 초기 데이터를 넘기고, 이후 클릭/검색/스크롤은 클라이언트 컴포넌트가 처리합니다. */}
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
