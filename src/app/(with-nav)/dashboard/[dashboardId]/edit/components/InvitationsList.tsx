'use client';

import { useState } from 'react';
import { usePagination } from '@/hooks/queries/usePagination';
import type { DashboardInviter } from '@/lib/api/dashboard';

import Button from '@/components/common/button/Button';
import Avatar from '@/components/common/avatar/Avatar';

import styles from '../edit.module.css';
import UserPlusIcon from '@/assets/icons/UserPlusIcon';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';

interface InvitationsListProps {
  dashboardId: number;
}

export default function InvitationsList({ dashboardId }: InvitationsListProps) {
  const [invitations, setInvitations] = useState<DashboardInviter[]>([]);

  const { page, size, goToNext, goToPrev } = usePagination({
    initialSize: 5,
    isResponsive: false,
  });

  const totalPages = Math.ceil(invitations.length / size);

  const handleDeleteMember = (id: number, email: string) => {
    if (confirm(`${email} 님에게 보낸 초대를 취소하시겠습니까?`)) {
      setInvitations((prev) => prev.filter((invitation) => invitation.id !== id));
      // Todo: API 연결
    }

    // Todo: 토스트 띄우기
    alert('삭제되었습니다');
  };
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleWrapper}>
          <h2 className={styles.title}>초대 내역</h2>
          <Button size="sm" className={styles.inviteButton}>
            <UserPlusIcon size={18} color="var(--color-gray-900)" />
            <span>초대</span>
          </Button>
        </div>

        <div className={styles.pageWrapper}>
          <span className={styles.pageInfo}>
            {totalPages || 1} 페이지 중 {page}
          </span>
          <div className={styles.pageButton}>
            <button onClick={goToPrev} disabled={page === 1}>
              <ArrowLeftIcon
                size={20}
                color={page === 1 ? 'var(--color-gray-200)' : 'var(--color-gray-800)'}
              />
            </button>
            <button onClick={goToNext} disabled={page >= totalPages}>
              <ArrowRightIcon
                size={20}
                color={page >= totalPages ? 'var(--color-gray-200)' : 'var(--color-gray-800)'}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.sectionContent}>
        <p className={styles.subTitle}>이메일</p>
        <ul className={styles.list}>
          {invitations.map((invitation) => (
            <li key={invitation.id} className={styles.item}>
              <div className={styles.profileWrapper}>
                <Avatar name={invitation.email} />
                <span className={styles.profileName}> {invitation.email}</span>
              </div>
              <Button
                variant="secondary"
                onClick={() => handleDeleteMember(invitation.id, invitation.email)}
                className={styles.buttonStyle}
              >
                삭제
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
