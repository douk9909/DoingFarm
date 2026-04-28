'use client';

import { useCallback, useEffect, useState } from 'react';
import { Member, memberApi } from '@/lib/api/member';
import { usePagination } from '@/hooks/queries/usePagination';
import { cn } from '@/lib/utils/cn';

import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';
import Modal from '@/components/common/modal/Modal';

import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';

import styles from '../edit.module.css';
import CrownIcon from '@/assets/icons/CrownIcon';

interface MembersListProps {
  dashboardId: number;
}

export default function MembersList({ dashboardId }: MembersListProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [membersTotalCount, setMembersTotalCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetMember, setTargetMember] = useState<Member | null>(null);

  const { page, size, goToNext, goToPrev } = usePagination({
    initialSize: 4,
    isResponsive: false,
  });

  // 멤버 불러오기
  const fetchMembers = useCallback(async () => {
    try {
      const response = await memberApi.getList({ dashboardId, page, size });
      const { members, totalCount } = response.data;
      setMembers(members);
      setMembersTotalCount(totalCount);
    } catch (error) {
      console.error('로드 실패:', error);
    }
  }, [dashboardId, page, size]);

  // 2. 초기 렌더링 및 페이지 변경 시 호출
  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const totalPages = Math.ceil(membersTotalCount / size);

  // 삭제 버튼 클릭 시 모달 열기
  const handleDeleteClick = (member: Member) => {
    setTargetMember(member);
    setIsModalOpen(true);
  };

  // 모달에서 삭제 확정 시 멤버 삭제
  const handleDeleteMember = async () => {
    if (!targetMember) return;

    const previousMembers = [...members];
    const previousTotalCount = membersTotalCount;

    try {
      setMembers((prev) => prev.filter((member) => member.id !== targetMember.id));
      setMembersTotalCount((prev) => prev - 1);

      await memberApi.deleteMember(targetMember.id);

      await fetchMembers();

      // Todo: 토스트 띄우기
      alert('삭제되었습니다');
    } catch (error) {
      // Todo: 토스트 띄우기로 오류알림
      console.error('구성원 삭제 중 오류 발생:', error);

      setMembers(previousMembers);
      setMembersTotalCount(previousTotalCount);

      alert('변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsModalOpen(false);
      setTargetMember(null);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerWrapper}>
          <h2 className={styles.title}>구성원</h2>
          <span className={styles.memberNum}>{membersTotalCount}</span>
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
                disabled={member.isOwner}
              >
                삭제
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && targetMember && (
        <Modal>
          <div className={styles.modalProfileWrapper}>
            <h2 className={styles.modalTitle}>구성원 삭제</h2>
            <p className={styles.modalText}>{`${targetMember.nickname} 님을 삭제하시겠습니까?`}</p>
            <div className={styles.modalButtonWrapper}>
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                className={cn(styles.modalButton, styles.modalCancelButton)}
              >
                취소
              </Button>
              <Button
                onClick={handleDeleteMember}
                className={cn(styles.modalButton, styles.modalDeleteButton)}
              >
                삭제
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
