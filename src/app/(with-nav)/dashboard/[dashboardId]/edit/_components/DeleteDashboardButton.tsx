'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { dashboardApi } from '@/lib/api/dashboard';
import { useGenericDelete } from '@/hooks/mutations/useGenericDelete';
import ConfirmModal from '@/components/common/ConfirmModal/ConfirmModal';

import styles from '../edit.module.css';

interface DeleteDashboardProps {
  dashboardId: number;
}

export default function DeleteDashboardButton({ dashboardId }: DeleteDashboardProps) {
  const { isPending, handleDelete } = useGenericDelete();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleDeleteDashboard = async () => {
    if (isPending) return;

    await handleDelete({
      deleteAction: () => dashboardApi.delete(dashboardId),
      successMessage: '대시보드가 삭제되었습니다.',
      onSuccess: () => {
        router.push('/mydashboard');
        setIsModalOpen(false);
      },
    });
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.deleteButton}
        disabled={isPending}
      >
        <span>{isPending ? '삭제 중...' : '대시보드 삭제'}</span>
      </button>
      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteDashboard}
          title="대시보드를 삭제하시겠습니까?"
          message="대시보드의 모든 데이터가 삭제됩니다."
          isLoading={isPending}
        />
      )}
    </>
  );
}
