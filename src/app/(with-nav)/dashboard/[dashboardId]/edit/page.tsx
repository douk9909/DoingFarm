import EditForm from './components/EditForm';
import MembersList from './components/MembersList';
import InvitationsList from './components/InvitationsList';

import { DASHBOARD_COLORS } from '@/lib/constants/color';

import styles from './edit.module.css';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import DeleteDashboardButton from './components/DeleteDashboardButton';

interface DashboardEditPageProps {
  params: Promise<{
    dashboardId: string;
  }>;
}

export default async function DashboardEditPage({ params }: DashboardEditPageProps) {
  const { dashboardId } = await params;

  // Todo: API 연결 후 mock data삭제
  const initialData = {
    id: '1',
    title: '테스트 프로젝트',
    color: DASHBOARD_COLORS[0], // ColorPicker 팔레트에 있는 값 중 하나
  };

  return (
    <section className={styles.container}>
      <button className={styles.prevButton}>
        <ArrowLeftIcon size={20} />
        <span>돌아가기</span>
      </button>
      <div className={styles.contentWrapper}>
        {/* 대시보드 이름 변경 */}
        <EditForm initialTitle={initialData.title} initialColor={initialData.color} />
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
