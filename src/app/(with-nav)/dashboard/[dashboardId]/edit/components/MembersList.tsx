'use client';

import { useState } from 'react';

import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';

import styles from '../edit.module.css';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { usePagination } from '@/hooks/queries/usePagination';

interface MembersListProps {
  dashboardId: string;
}

export default function MembersList({ dashboardId }: MembersListProps) {
  // Todo: API 연결 후 제거
  const mockData = [
    { id: 1, userId: 101, nickname: '사용자1', profileImageUrl: null, isOwner: true },
    { id: 2, userId: 102, nickname: '사용자2', profileImageUrl: null, isOwner: false },
    { id: 3, userId: 103, nickname: '사용자3', profileImageUrl: null, isOwner: false },
    { id: 4, userId: 104, nickname: '사용자4', profileImageUrl: null, isOwner: false },
    { id: 5, userId: 105, nickname: '사용자5', profileImageUrl: null, isOwner: false },
    { id: 6, userId: 106, nickname: '사용자6', profileImageUrl: null, isOwner: false },
    { id: 7, userId: 107, nickname: '사용자7', profileImageUrl: null, isOwner: false },
    { id: 8, userId: 108, nickname: '사용자8', profileImageUrl: null, isOwner: false },
    { id: 9, userId: 109, nickname: '사용자9', profileImageUrl: null, isOwner: false },
  ];

  const [members, setMembers] = useState(mockData);
  const { page, size, goToNext, goToPrev } = usePagination({
    initialSize: 4,
    isResponsive: false,
  });

  const totalPages = Math.ceil(members.length / size);
  const startIndex = (page - 1) * size;
  const currentMembers = members.slice(startIndex, startIndex + size);

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
        <div className={styles.headerWrapper}>
          <h2 className={styles.title}>구성원</h2>
          <span className={styles.memberNum}>{members.length}</span>
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
        <p className={styles.subTitle}>이름</p>
        <ul className={styles.list}>
          {currentMembers.map((member) => (
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
