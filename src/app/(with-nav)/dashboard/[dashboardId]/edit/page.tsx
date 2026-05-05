'use client';

import { use, useState, useEffect, Suspense } from 'react';
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
import SkeletonSettingSection from './_components/Skeleton/SkeletonSettingSection';
import SkeletonListSection from './_components/Skeleton/SkeletonListSection';

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

  useEffect(() => {
    if (!isLoading && (error || !dashboardData)) {
      router.push('/not-found');
    }
  }, [isLoading, error, dashboardData, router]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Link href={`/dashboard/${dashboardId}`} className={styles.prevButton}>
          <ArrowLeftIcon size={20} />
          <span>돌아가기</span>
        </Link>
        <div className={styles.contentWrapper}>
          <SkeletonSettingSection />
          <SkeletonListSection />
          <SkeletonListSection />
          <div className={styles.skeletonDeleteButton} />
        </div>
      </div>
    );
  }

  if (error || !dashboardData) return null;

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
