'use client';

import styles from './DashboardHeader.module.css';
import HashTagIcon from '@/assets/icons/HashTagIcon';
import { dashboardApi } from '@/lib/api/dashboard';
import { useFetch } from '@/hooks/queries/useFetch';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SkeletonDashboardHeader from './Skeleton/SkeletonDashboardHeader';
import CardFilter, { type FilterState, type AssigneeInfo } from './CardFilter';

interface DashBoardHeaderProps {
  dashboardId: number;
  allTags?: string[];
  allAssignees?: AssigneeInfo[];
  filter?: FilterState;
  onFilterChange?: (filter: FilterState) => void;
}

export default function DashBoardHeader({
  dashboardId,
  allTags = [],
  allAssignees = [],
  filter,
  onFilterChange,
}: DashBoardHeaderProps) {
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
    <div className={styles.staticHeader}>
      <header className={styles.header}>
        <div className={styles.titleWrapper}>
          <HashTagIcon className={styles.hashTag} color={data?.color} />
          <h1 className={styles.title}>{data?.title}</h1>
        </div>
      </header>

      {filter && onFilterChange && (
        <CardFilter
          allTags={allTags}
          allAssignees={allAssignees}
          filter={filter}
          onFilterChange={onFilterChange}
        />
      )}
    </div>
  );
}
