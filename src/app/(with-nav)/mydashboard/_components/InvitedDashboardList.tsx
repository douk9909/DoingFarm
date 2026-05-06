'use client';

import { useEffect, useRef } from 'react';
import Avatar from '@/components/common/avatar/Avatar';
import { useInvitationSearch } from '@/hooks/queries/useInvitationSearch';
import { useReceivedInvitations } from '@/hooks/queries/useReceivedInvitations';
import SearchIcon from '@/assets/icons/SearchIcon';
import type { DashboardEmptySection } from '../_content/dashboardContent';
import EmptyDashboardPanel from './EmptyDashboardPanel';
import styles from './InvitedDashboardList.module.css';
import SkeletonInvitedDashboardList from './Skeleton/SkeletonInvitedDashboardList';

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
          // 목록 아래의 보이지 않는 감지 영역이 화면에 들어오면 다음 초대 목록을 가져옵니다.
          // 사용자는 버튼을 누르지 않아도 아래로 내리기만 하면 다음 목록을 볼 수 있습니다.
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
    // 초대를 하나도 받지 않은 첫 화면은 별도 목록 대신 빈 상태 안내를 보여줍니다.
    return <EmptyDashboardPanel section={emptySection} />;
  }

  return (
    <>
      <div className={styles.toolbar}>
        <label className={styles.searchBox}>
          <SearchIcon size={18} />
          <input
            value={inputKeyword}
            placeholder="검색"
            onChange={(event) => setInputKeyword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                // 입력할 때마다 검색하지 않고, Enter를 눌렀을 때만 검색어를 확정합니다.
                // 불필요한 API 요청을 줄이기 위한 분리입니다.
                submitSearch();
              }
            }}
          />
        </label>
      </div>

      <div className={styles.panel}>
        {error ? <p className={styles.emptyText}>{error}</p> : null}

        {isLoading ? (
          <SkeletonInvitedDashboardList />
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
                        onClick={() => rejectInvitation(invitation.id)}
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
