'use client';

import Link from 'next/link';
import { use } from 'react';
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
  const resolvedParams = use(params);
  const dashboardId = Number(resolvedParams.dashboardId);

  const {
    data: dashboardData,
    isLoading,
    error,
  } = useFetch<Dashboard>(() => dashboardApi.getOne(dashboardId));

  if (isNaN(dashboardId)) {
    return <div className={styles.container}>유효하지 않은 접근입니다.</div>;
  }

  if (isLoading) {
    return <div className={styles.container}>로딩 중...</div>;
  }
  if (error || !dashboardData) {
    return <div className={styles.container}>대시보드를 불러오는 중 오류가 발생했습니다.</div>;
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
