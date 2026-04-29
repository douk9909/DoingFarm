'use client';

import { useMemberList } from '@/hooks/queries/useMemberList';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Member, memberApi } from '@/lib/api/member';
import { usePagination } from '@/hooks/queries/usePagination';
import { cn } from '@/lib/utils/cn';

import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';
import Modal from '@/components/common/modal/Modal';

import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import CrownIcon from '@/assets/icons/CrownIcon';

import styles from '../edit.module.css';
import BaseSectionLayout from './BaseSectionLayout';
import PaginationControl from './PaginationControl';

interface MembersListProps {
  dashboardId: number;
}

export default function MembersList({ dashboardId }: MembersListProps) {
  console.log('대시보드 ID 타입 체크:', typeof dashboardId, dashboardId);
  const {
    items: members,
    setItems: setMembers,
    totalCount,
    setTotalCount,
    page,
    goToNext,
    goToPrev,
    isLoading,
    totalPages,
    fetchData,
  } = useMemberList<Member>({
    dashboardId,
    fetchApi: memberApi.getList,
    resourceName: 'members',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetMember, setTargetMember] = useState<Member | null>(null);

  // 삭제 버튼 클릭 시 모달 열기
  const handleDeleteClick = (member: Member) => {
    setTargetMember(member);
    setIsModalOpen(true);
  };

  // 모달에서 삭제 확정 시 멤버 삭제
  const handleDeleteMember = async () => {
    if (!targetMember || isLoading) return;

    const previousMembers = [...members];
    const previousTotalCount = totalCount;

    try {
      setMembers((prev) => prev.filter((member) => member.id !== targetMember.id));
      setTotalCount((prev) => prev - 1);

      await memberApi.deleteMember(targetMember.id);

      // 페이지에 남은 멤버가 없는 경우 이전 페이지로 이동
      if (members.length === 1 && page > 1) {
        goToPrev();
      } else {
        await fetchData();
      }

      // Todo: 토스트 띄우기
      alert('삭제되었습니다');
    } catch (error) {
      // Todo: 토스트 띄우기로 오류알림
      console.error('구성원 삭제 중 오류 발생:', error);

      setMembers(previousMembers);
      setTotalCount(previousTotalCount);

      alert('변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsModalOpen(false);
      setTargetMember(null);
    }
  };

  return (
    <BaseSectionLayout
      title="구성원"
      headerNum={totalCount}
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
        <p className={styles.subTitle}>이름</p>
        <ul className={styles.list}>
          {members.map((member) => (
            <li key={member.id} className={styles.item}>
              <div className={styles.profileWrapper}>
                <Avatar src={member.profileImageUrl} name={member.nickname} />
                <span className={styles.profileName}>{member.nickname}</span>
                {member.isOwner && <CrownIcon size={16} />}
              </div>
              <Button
                variant="secondary"
                onClick={() => handleDeleteClick(member)}
                className={styles.buttonStyle}
                disabled={member.isOwner || isLoading}
              >
                삭제
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </BaseSectionLayout>

    // <div className={styles.section}>
    //   <div className={styles.sectionHeader}>
    //     <div className={styles.headerWrapper}>
    //       <h2 className={styles.title}>구성원</h2>
    //       <span className={styles.memberNum}>{totalCount}</span>
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

    // {isModalOpen && targetMember && (
    //   <Modal>
    //     <div className={styles.modalProfileWrapper}>
    //       <h2 className={styles.modalTitle}>구성원 삭제</h2>
    //       <p className={styles.modalText}>{`${targetMember.nickname} 님을 삭제하시겠습니까?`}</p>
    //       <div className={styles.modalButtonWrapper}>
    //         <Button
    //           variant="secondary"
    //           onClick={() => setIsModalOpen(false)}
    //           className={cn(styles.modalButton, styles.modalCancelButton)}
    //         >
    //           취소
    //         </Button>
    //         <Button
    //           onClick={handleDeleteMember}
    //           className={cn(styles.modalButton, styles.modalDeleteButton)}
    //         >
    //           삭제
    //         </Button>
    //       </div>
    //     </div>
    //   </Modal>
    // )}
  );
}
