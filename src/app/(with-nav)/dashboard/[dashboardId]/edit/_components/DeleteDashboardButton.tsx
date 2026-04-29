'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from '../edit.module.css';
import { dashboardApi } from '@/lib/api/dashboard';

interface DeleteDashboardProps {
  dashboardId: number;
}

export default function DeleteDashboardButton({ dashboardId }: DeleteDashboardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteDashboard = async () => {
    if (isDeleting) return;

    if (!confirm('대시보드를 삭제하시겠습니까? 모든 데이터가 영구적으로 사라집니다.')) return;

    try {
      setIsDeleting(true);
      await dashboardApi.delete(dashboardId);

      // Todo: 토스트로 삭제 알림
      alert('대시보드가 삭제되었습니다.');
      router.push('/mydashboard');
      router.refresh();
    } catch (error) {
      // Todo: 토스트로 오류 알림
      alert('대시보드 삭제에 실패했습니다. 다시 시도해주세요.');
      console.error('대시보드 삭제 중 오류 발생:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button onClick={handleDeleteDashboard} className={styles.deleteButton} disabled={isDeleting}>
      <span>{isDeleting ? '삭제 중...' : '대시보드 삭제'}</span>
    </button>
  );
}
