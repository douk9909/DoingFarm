'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { usePagination } from '@/hooks/queries/usePagination';
import { dashboardApi, type DashboardInvitation } from '@/lib/api/dashboard';

import Button from '@/components/common/button/Button';
import Avatar from '@/components/common/avatar/Avatar';

import styles from '../edit.module.css';
import UserPlusIcon from '@/assets/icons/UserPlusIcon';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { useMemberList } from '@/hooks/queries/useMemberList';
import BaseSectionLayout from './BaseSectionLayout';
import PaginationControl from './PaginationControl';

interface InvitationsListProps {
  dashboardId: number;
}

export default function InvitationsList({ dashboardId }: InvitationsListProps) {
  const {
    items: invitations,
    setItems: setInvitations,
    totalCount,
    setTotalCount,
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

  const handleDeleteMember = async (dashboardId: number, invitationId: number, email: string) => {
    const previousInvitations = [...invitations];
    const previousTotalCount = totalCount;

    if (confirm(`${email} 님에게 보낸 초대를 취소하시겠습니까?`)) {
      try {
        setInvitations((prev) => prev.filter((invitation) => invitation.id !== invitationId));
        setTotalCount((prev) => prev - 1);

        await dashboardApi.cancelInvitation(dashboardId, invitationId);

        // Todo: 토스트 띄우기
        alert('삭제되었습니다');
      } catch (error) {
        // Todo: 토스트 띄우기로 오류알림
        console.error('구성원 삭제 중 오류 발생:', error);

        setInvitations(previousInvitations);
        setTotalCount(previousTotalCount);

        alert('변경에 실패했습니다. 다시 시도해주세요.');
      } finally {
      }
    }
  };
  return (
    <BaseSectionLayout
      title="초대 내역"
      headerButton
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
                onClick={() =>
                  handleDeleteMember(
                    invitation.dashboard.id,
                    invitation.id,
                    invitation.invitee.email,
                  )
                }
                className={styles.buttonStyle}
              >
                삭제
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </BaseSectionLayout>

    // < className={styles.section}>
    //   <div className={styles.sectionHeader}>
    //     <div className={styles.sectionTitleWrapper}>
    //       <h2 className={styles.title}>초대 내역</h2>
    //       <Button size="sm" className={styles.inviteButton}>
    //         <UserPlusIcon size={18} color="var(--color-gray-900)" />
    //         <span>초대</span>
    //       </Button>
    //     </div>

    //     <div className={styles.pageWrapper}>
    //       <span className={styles.pageInfo}>
    //         {totalPages || 1} 페이지 중 {page}
    //       </span>
    //       <div className={styles.pageButton}>
    //         <button onClick={goToPrev} disabled={page === 1}>
    //           <ArrowLeftIcon
    //             size={20}
    //             color={page === 1 ? 'var(--color-gray-200)' : 'var(--color-gray-800)'}
    //           />
    //         </button>
    //         <button onClick={goToNext} disabled={page >= totalPages}>
    //           <ArrowRightIcon
    //             size={20}
    //             color={page >= totalPages ? 'var(--color-gray-200)' : 'var(--color-gray-800)'}
    //           />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
  );
}
