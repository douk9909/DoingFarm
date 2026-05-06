'use client';

import styles from './DashboardHeader.module.css';
import HashTagIcon from '@/assets/icons/HashTagIcon';
import { dashboardApi } from '@/lib/api/dashboard';
import { useFetch } from '@/hooks/queries/useFetch';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SkeletonDashboardHeader from './Skeleton/SkeletonDashboardHeader';

interface DashBoardHeaderProps {
  dashboardId: number;
}

export default function DashBoardHeader({ dashboardId }: DashBoardHeaderProps) {
  const router = useRouter();
  const { data, isLoading, error } = useFetch(() =>
    dashboardApi.getOne(dashboardId).then((res) => ({ data: res.data })),
  );

  useEffect(() => {
    if (error) {
      router.push('/not-found');
    }
  }, [error, router]);

  if (isLoading) return <SkeletonDashboardHeader />;

  return (
    <header className={styles.header}>
      <div className={styles.titleWrapper}>
        <HashTagIcon className={styles.hashTag} color={data?.color} />
        <h1 className={styles.title}>{data?.title}</h1>
      </div>
    </header>
  );
}
