'use client';

import { useRouter } from 'next/navigation';

import styles from '../edit.module.css';

interface DeleteDashboardProps {
  dashboardId: string;
}

export default function DeleteDashboardButton({ dashboardId }: DeleteDashboardProps) {
  const router = useRouter(); // Todo: 추후 페이지 이동

  const handleDeleteDashboard = () => {
    if (!confirm('대시보드를 삭제하시겠습니까? 모든 데이터가 영구적으로 사라집니다.')) return;

    // Todo: API 연동 필요
  };

  return (
    <button onClick={handleDeleteDashboard} className={styles.deleteButton}>
      <span>대시보드 삭제</span>
    </button>
  );
}
