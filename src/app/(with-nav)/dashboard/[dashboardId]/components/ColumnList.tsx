'use client';
import { useFetch } from '@/hooks/queries/useFetch';
import { columnApi } from '@/lib/api/column';
import Column from './Column';
import styles from './ColumnList.module.css';
import type { Column as ColumnType } from '@/types/column';

export default function ColumnList({ dashboardId }: { dashboardId: number }) {
  const { data, isLoading, error } = useFetch(() =>
    columnApi.getList(dashboardId).then((res) => ({ data: res.data })),
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className={styles.columnList}>
      {data?.data.map((column: ColumnType) => (
        <Column key={column.id} id={column.id} title={column.title} />
      ))}
    </div>
  );
}
