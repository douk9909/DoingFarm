'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Avatar from '@/components/common/avatar/Avatar';
import { useInvitationSearch } from '@/hooks/queries/useInvitationSearch';
import { useReceivedInvitations } from '@/hooks/queries/useReceivedInvitations';
import searchIcon from '@/assets/icon/ic_search.svg';
import type { DashboardEmptySection } from '../_content/dashboardContent';
import EmptyDashboardPanel from './EmptyDashboardPanel';
import styles from './InvitedDashboardList.module.css';

interface InvitedDashboardListProps {
  emptySection: DashboardEmptySection;
}

export default function InvitedDashboardList({ emptySection }: InvitedDashboardListProps) {
  const { inputKeyword, searchKeyword, setInputKeyword, submitSearch } = useInvitationSearch();

  const {
    invitations,
    isLoading,
    isLoadingMore,
    pendingInvitationId,
    error,
    hasNextPage,
    loadMore,
    acceptInvitation,
    rejectInvitation,
  } = useReceivedInvitations(searchKeyword);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isLoadingMore) {
          // 아래 감지 영역이 보이면 cursor로 다음 초대 목록을 이어서 가져옴
          void loadMore();
        }
      },
      { rootMargin: '120px' },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isLoadingMore, loadMore]);

  if (!isLoading && !error && invitations.length === 0 && searchKeyword.trim() === '') {
    // 초대를 하나도 받지 않은 첫 화면은 기존 빈 상태 패널 그대로 보여줌
    return <EmptyDashboardPanel section={emptySection} />;
  }

  return (
    <>
      <div className={styles.toolbar}>
        <label className={styles.searchBox}>
          <Image src={searchIcon} alt="" width={18} height={18} />
          <input
            value={inputKeyword}
            placeholder="검색"
            onChange={(event) => setInputKeyword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                // Enter 입력 시 현재 input 값을 검색어로 확정해서 목록을 다시 불러옴
                submitSearch();
              }
            }}
          />
        </label>
      </div>

      <div className={styles.panel}>
        {error ? <p className={styles.emptyText}>{error}</p> : null}

        {isLoading ? (
          <p className={styles.emptyText}>초대 목록을 불러오는 중...</p>
        ) : invitations.length === 0 ? (
          <p className={styles.emptyText}>검색 결과가 없어요</p>
        ) : (
          <div className={styles.table}>
            <div className={styles.header}>
              <span>이름</span>
              <span>초대자</span>
              <span>수락 여부</span>
            </div>

            <ul className={styles.rows}>
              {invitations.map((invitation) => {
                const isPending = pendingInvitationId === invitation.id;

                return (
                  <li key={invitation.id} className={styles.row}>
                    <span className={styles.title}>{invitation.dashboard.title}</span>
                    <span className={styles.inviter}>
                      <Avatar name={invitation.inviter.nickname} className={styles.avatar} />
                      {invitation.inviter.nickname}
                    </span>
                    <span className={styles.actions}>
                      <button
                        type="button"
                        className={styles.rejectButton}
                        onClick={() => rejectInvitation(invitation.id, invitation.dashboard.id)}
                        disabled={isPending}
                      >
                        {isPending ? '처리 중' : '거절'}
                      </button>
                      <button
                        type="button"
                        className={styles.acceptButton}
                        onClick={() => acceptInvitation(invitation.id, invitation.dashboard.id)}
                        disabled={isPending}
                      >
                        {isPending ? '처리 중' : '수락'}
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div ref={sentinelRef} className={styles.sentinel}>
              {isLoadingMore ? '더 불러오는 중...' : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
