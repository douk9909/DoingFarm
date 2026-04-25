'use client';

import { useState } from 'react';

import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';

import styles from '../edit.module.css';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';

interface MembersListProps {
  dashboardId: string;
}

export default function MembersList({ dashboardId }: MembersListProps) {
  // Todo: API 연결 후 제거
  const mockData = [
    { id: 1, userId: 101, nickname: '사용자', profileImageUrl: null, isOwner: true },
    { id: 2, userId: 102, nickname: '사용자1', profileImageUrl: null, isOwner: false },
    { id: 3, userId: 103, nickname: '사용자2', profileImageUrl: null, isOwner: false },
  ];

  const [members, setMembers] = useState(mockData);
  // Todo: 페이지네이션 추가

  const handleDeleteMember = (id: number, nickname: string) => {
    if (confirm(`${nickname} 님을 삭제하시겠습니까?`)) {
      setMembers((prev) => prev.filter((member) => member.id !== id));
      // Todo: API 연결
    }

    // Todo: 토스트 띄우기
    alert('삭제되었습니다');
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>구성원</h2>
        <div className={styles.pageWrapper}>
          <span className={styles.pageInfo}>n 페이지 중 n</span>
          <div className={styles.pageButton}>
            <button>
              <ArrowLeftIcon size={20} color="var(--color-gray-500)" />
            </button>
            <button>
              <ArrowRightIcon size={20} color="var(--color-gray-500)" />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.sectionContent}>
        <p className={styles.subTitle}>이름</p>
        <ul className={styles.list}>
          {members.map((member) => (
            <li key={member.id} className={styles.item}>
              <div className={styles.profileWrapper}>
                <Avatar src={member.profileImageUrl} name={member.nickname} />
                <span className={styles.profileName}>{member.nickname}</span>
              </div>
              <Button
                variant="secondary"
                onClick={() => handleDeleteMember(member.id, member.nickname)}
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
