'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useFetch } from '@/hooks/queries/useFetch';
import { Dashboard } from '@/types/dashboard';
import { dashboardApi } from '@/lib/api/dashboard';

import EditForm from './_components/EditForm';
import MembersList from './_components/MembersList';
import InvitationsList from './_components/InvitationsList';
import DeleteDashboardButton from './_components/DeleteDashboardButton';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';

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

  const [updatedDashboardTitle, setUpdatedDashboardTitle] = useState<string | null>(null);
  const [updatedDashboardColor, setUpdatedDashboardColor] = useState<string | null>(null);
  const dashboardTitle = updatedDashboardTitle ?? dashboardData?.title ?? '';
  const dashboardColor = updatedDashboardColor ?? dashboardData?.color ?? '';

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
        {dashboardData && (
          <EditForm
            dashboardId={id}
            initialTitle={dashboardTitle}
            initialColor={dashboardColor}
            currentDisplayTitle={dashboardTitle}
            onTitleUpdate={setUpdatedDashboardTitle}
            onColorUpdate={setUpdatedDashboardColor}
          />
        )}
        <MembersList dashboardId={id} />
        <InvitationsList dashboardId={id} />
        <DeleteDashboardButton dashboardId={id} />
      </div>
    </section>
  );
}
