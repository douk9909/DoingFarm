'use client';

import { useState, useEffect } from 'react';
import { dashboardApi, type DashboardInvitation } from '@/lib/api/dashboard';
import { useMemberList } from '@/hooks/queries/useMemberList';
import { useGenericDelete } from '@/hooks/mutations/useGenericDelete';
import { useDashboardCreateModal } from '@/components/dashboard/create/DashboardCreateModalProvider';

import Button from '@/components/common/Button/Button';
import Avatar from '@/components/common/Avatar/Avatar';

import InvitationModal from '@/components/dashboard/invite/InvitationModal';
import BaseSectionLayout from './BaseSectionLayout';
import PaginationControl from './PaginationControl';
import ConfirmModal from '@/components/common/ConfirmModal/ConfirmModal';
import UserPlusIcon from '@/assets/icons/UserPlusIcon';

import styles from '../edit.module.css';
import SkeletonListSection from './Skeleton/SkeletonListSection';

interface InvitationsListProps {
  dashboardId: number;
}

export default function InvitationsList({ dashboardId }: InvitationsListProps) {
  const {
    items: invitations,
    page,
    goToNext,
    goToPrev,
    isLoading,
    fetchData,
    totalPages,
  } = useMemberList<DashboardInvitation>({
    dashboardId,
    fetchApi: dashboardApi.getInvitations,
    resourceName: 'invitations',
  });

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetInvitation, setTargetInvitation] = useState<DashboardInvitation | null>(null);

  const { isPending, handleDelete } = useGenericDelete();
  const { notifyDashboardCreated } = useDashboardCreateModal();

  const handleDeleteInvitation = async () => {
    if (!targetInvitation || isPending) return;

    await handleDelete({
      deleteAction: () => dashboardApi.cancelInvitation(dashboardId, targetInvitation.id),

      successMessage: '초대가 취소되었습니다.',

      onSuccess: async () => {
        notifyDashboardCreated();
        setIsModalOpen(false);
        setTargetInvitation(null);

        // 페이지에 남은 멤버가 없는 경우 이전 페이지로 이동
        if (invitations.length === 1 && page > 1) {
          goToPrev();
        } else {
          await fetchData();
        }
      },
    });
  };

  useEffect(() => {
    const handler = async () => {
      await fetchData();
    };

    window.addEventListener('invitationUpdated', handler);

    return () => {
      window.removeEventListener('invitationUpdated', handler);
    };
  }, []);

  if (isLoading && invitations.length === 0) {
    return <SkeletonListSection />;
  }

  return (
    <>
      <BaseSectionLayout
        title="초대 내역"
        headerButton={
          <Button className={styles.inviteButton} onClick={() => setIsInviteModalOpen(true)}>
            <UserPlusIcon size={18} color="var(--color-gray-900)" />
            <span>초대</span>
          </Button>
        }
        pagination={
          <PaginationControl
            page={page}
            totalPages={totalPages}
            goToNext={goToNext}
            goToPrev={goToPrev}
          />
        }
      >
        <div className={styles.sectionContent}>
          <p className={styles.subTitle}>이메일</p>
          <ul className={styles.list}>
            {invitations.map((invitation) => (
              <li key={invitation.id} className={styles.item}>
                <div className={styles.profileWrapper}>
                  <Avatar name={invitation.invitee.email} />
                  <span className={styles.profileName}> {invitation.invitee.email}</span>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setTargetInvitation(invitation);
                    setIsModalOpen(true);
                  }}
                  className={styles.buttonStyle}
                >
                  취소
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </BaseSectionLayout>
      {isModalOpen && targetInvitation && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteInvitation}
          title="초대 취소"
          message={`${targetInvitation.invitee.email} 님의 초대를 취소하시겠습니까?`}
          isLoading={isPending}
        />
      )}

      {isInviteModalOpen && (
        <InvitationModal
          dashboardId={dashboardId}
          onClose={() => setIsInviteModalOpen(false)}
          onInvite={async () => {
            await fetchData();
          }}
        />
      )}
    </>
  );
}
