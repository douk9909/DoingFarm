'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

export default function DashboardEditPage({ params }: DashboardEditPageProps) {
  const { dashboardId } = use(params);
  const id = Number(dashboardId);
  const router = useRouter();

  const {
    data: dashboardData,
    isLoading,
    error,
  } = useFetch<Dashboard>(() => dashboardApi.getOne(id).then((res) => ({ data: res.data })));

  // Todo: 로딩 컴포넌트 추가
  if (isLoading) return <div>로딩 중...</div>;

  if (error || !dashboardData) {
    router.push('/not-found');
    return null;
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
        {/* <InvitationsList dashboardId={id} /> */}
        {/* 대시보드 삭제 버튼 */}
        {/* <DeleteDashboardButton dashboardId={id} /> */}
      </div>
    </section>
  );
}
