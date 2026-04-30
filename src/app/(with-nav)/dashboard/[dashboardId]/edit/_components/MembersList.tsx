'use client';

import { useMemberList } from '@/hooks/queries/useMemberList';
import { useState } from 'react';
import { Member, memberApi } from '@/lib/api/member';

import BaseSectionLayout from './BaseSectionLayout';
import PaginationControl from './PaginationControl';

import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';
import ConfirmModal from '@/components/common/ConfirmModal/ConfirmModal';

import CrownIcon from '@/assets/icons/CrownIcon';

import styles from '../edit.module.css';
import { useGenericDelete } from '@/hooks/mutations/useGenericDelete';

interface MembersListProps {
  dashboardId: number;
}

export default function MembersList({ dashboardId }: MembersListProps) {
  const {
    items: members,
    totalCount,
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

  const { isPending, handleDelete } = useGenericDelete();

  // 삭제 버튼 클릭 시 모달 열기
  const handleDeleteClick = (member: Member) => {
    setTargetMember(member);
    setIsModalOpen(true);
  };

  const handleDeleteMember = async () => {
    if (!targetMember || isPending) return;

    await handleDelete({
      deleteAction: () => memberApi.deleteMember(targetMember.id),
      successMessage: '구성원이 삭제되었습니다.',
      onSuccess: async () => {
        setIsModalOpen(false);
        setTargetMember(null);

        // 페이지에 남은 멤버가 없는 경우 이전 페이지로 이동
        if (members.length === 1 && page > 1) {
          goToPrev();
        } else {
          await fetchData();
        }
      },
    });
  };

  return (
    <>
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
      {isModalOpen && targetMember && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteMember}
          title="구성원 삭제"
          message={`${targetMember.nickname} 님을 삭제하시겠습니까?`}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
