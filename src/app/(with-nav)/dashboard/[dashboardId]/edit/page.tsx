import EditForm from './components/EditForm';
import MembersList from './components/MembersList';
import InvitationsList from './components/InvitationsList';

import { DASHBOARD_COLORS } from '@/lib/constants/color';

import styles from './edit.module.css';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import DeleteDashboardButton from './components/DeleteDashboardButton';
import { dashboardApi } from '@/lib/api/dashboard';
import { Dashboard } from '@/types/dashboard';

interface DashboardEditPageProps {
  params: {
    dashboardId: string;
  };
}

export default async function DashboardEditPage({ params }: DashboardEditPageProps) {
  const dashboardId = Number(params.dashboardId);

  let dashboardData: Dashboard | null = null;

  try {
    const response = await dashboardApi.getOne(dashboardId);
    dashboardData = response.data;
  } catch (error) {
    // Todo: 토스트 띄우기로 에러처리
    console.error('대시보드 정보를 불러오는 중 오류 발생:', error);
  }

  return (
    <section className={styles.container}>
      <button className={styles.prevButton}>
        <ArrowLeftIcon size={20} />
        <span>돌아가기</span>
      </button>
      <div className={styles.contentWrapper}>
        {/* 대시보드 이름 변경 */}
        {dashboardData && (
          <EditForm
            dashboardId={dashboardId}
            initialTitle={dashboardData.title}
            initialColor={dashboardData.color}
          />
        )}
        {/* 대시보드 구성원 변경 */}
        <MembersList dashboardId={dashboardId} />
        {/* 대시보드 초대 내역 */}
        <InvitationsList dashboardId={dashboardId} />
        {/* 대시보드 삭제 버튼 */}
        <DeleteDashboardButton dashboardId={dashboardId} />
      </div>
    </section>
  );
}
