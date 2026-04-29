import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useFetch } from '@/hooks/queries/useFetch';
import { Dashboard } from '@/types/dashboard';
import { dashboardApi } from '@/lib/api/dashboard';

import EditForm from './components/EditForm';
import MembersList from './components/MembersList';
import InvitationsList from './components/InvitationsList';

import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import DeleteDashboardButton from './components/DeleteDashboardButton';

import styles from './edit.module.css';

interface DashboardEditPageProps {
  params: Promise<{
    dashboardId: string;
  }>;
}

export default async function DashboardEditPage({ params }: DashboardEditPageProps) {
  const { dashboardId } = await params;
  const id = Number(dashboardId);

  if (isNaN(id)) {
    return notFound();
  }

  let dashboardData: Dashboard | null = null;
  try {
    const response = await dashboardApi.getOne(id);
    dashboardData = response.data;

    if (!dashboardData) {
      return notFound();
    }
  } catch (error) {
    return notFound();
  }

  return (
    <section className={styles.container}>
      <Link href={`/dashboard/${dashboardId}`} className={styles.prevButton}>
        <ArrowLeftIcon size={20} />
        <span>돌아가기</span>
      </Link>
      <div className={styles.contentWrapper}>
        {/* 대시보드 이름 변경 */}
        {dashboardData && (
          <EditForm
            dashboardId={id}
            initialTitle={dashboardData.title}
            initialColor={dashboardData.color}
          />
        )}
        {/* 대시보드 구성원 변경 */}
        <MembersList dashboardId={id} />
        {/* 대시보드 초대 내역 */}
        <InvitationsList dashboardId={id} />
        {/* 대시보드 삭제 버튼 */}
        <DeleteDashboardButton dashboardId={id} />
      </div>
    </section>
  );
}
