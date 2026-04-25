import EditForm from './components/EditForm';
import MembersList from './components/MembersList';
import InvitationsList from './components/InvitationsList';

import styles from './edit.module.css';
import TrashFillIcon from '@/assets/icons/TrashFillIcon';

interface DashboardEditPageProps {
  params: Promise<{
    dashboardId: string;
  }>;
}

export default async function DashboardEditPage({ params }: DashboardEditPageProps) {
  const { dashboardId } = await params;

  return (
    <section className={styles.container}>
      <button className={styles.prevButton}>돌아가기</button>

      <div className={styles.contentWrapper}>
        {/* 대시보드 이름 변경 */}
        <EditForm initialTitle="테스트 " initialColor="색상" />
        {/* 대시보드 구성원 변경 */}
        <MembersList />
        {/* 대시보드 초대 내역 */}
        <InvitationsList />
        {/* 대시보드 삭제 버튼 */}
        <button className={styles.deleteButton}>
          <span>대시보드 삭제</span>
        </button>
      </div>
    </section>
  );
}
