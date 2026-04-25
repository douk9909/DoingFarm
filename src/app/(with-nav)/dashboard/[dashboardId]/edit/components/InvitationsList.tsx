'use client';

import { useState } from 'react';

import Button from '@/components/common/button/Button';
import Avatar from '@/components/common/avatar/Avatar';

import styles from '../edit.module.css';
import UserPlusIcon from '@/assets/icons/UserPlusIcon';

interface InvitationsListProps {
  dashboardId: string;
}

export default function InvitationsList({ dashboardId }: InvitationsListProps) {
  // Todo: API 연결 후 제거
  const mockData = [
    { id: 1, email: 'code_master@test.com' },
    { id: 2, email: 'react_love@example.com' },
    { id: 3, email: 'design_star@gmail.com' },
  ];

  const [invitations, setInvitations] = useState(mockData);
  // Todo: 페이지네이션 추가

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
        <h2 className={styles.title}>초대 내역</h2>
        <Button className={styles.buttonStyle}>
          <UserPlusIcon size={20} color="var(--color-gray-900)" />
          <span>초대하기</span>
        </Button>
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
