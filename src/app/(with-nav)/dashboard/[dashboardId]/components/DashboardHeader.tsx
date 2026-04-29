'use client';

import styles from './DashboardHeader.module.css';
import AddColumnButton from './AddColumnButton';
import HashTagIcon from '@/assets/icons/HashTagIcon';
import { dashboardApi } from '@/lib/api/dashboard';
import { useFetch } from '@/hooks/queries/useFetch';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <header className={styles.header}>
      <div className={styles.titleWrapper}>
        <HashTagIcon className={styles.hashTag} color={data?.color} />
        <h1 className={styles.title}>{data?.title}</h1>
      </div>
      <AddColumnButton />
    </header>
  );
}
