'use client';

import { useState } from 'react';
import TodoCreateModal from '@/components/dashboard/todoCreate/TodoCreateModal';
import TodoEditModal from '@/components/dashboard/todoEdit/TodoEditModal';
import { memberApi, type Member } from '@/lib/api/member';
import { useCreateCardWithImage } from '@/hooks/mutations/useCreateCardWithImage';
import { useFetch } from '@/hooks/queries/useFetch';
import { columnApi } from '@/lib/api/column';
import type { Column as ColumnType } from '@/types/column';
import type { Card as CardType } from '@/types/card';
import Column from './Column';
import styles from './ColumnList.module.css';

const MEMBER_PAGE_SIZE = 100;

export default function ColumnList({ dashboardId }: { dashboardId: number }) {
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);
  const [refreshKeyByColumnId, setRefreshKeyByColumnId] = useState<Record<number, number>>({});

  // 컬럼 조회
  const {
    data: columnData,
    isLoading: isColumnLoading,
    error: columnError,
  } = useFetch(() => columnApi.getList(dashboardId).then((res) => ({ data: res.data })));

  // 대시보드 멤버 조회
  const {
    data: memberData,
    isLoading: isMemberLoading,
    error: memberError,
  } = useFetch(() =>
    memberApi
      .getList(dashboardId, { page: 1, size: MEMBER_PAGE_SIZE })
      .then((res) => ({ data: res.data })),
  );

  const columns = columnData?.data ?? [];

  // 담당자 드롭다운에 사용할 멤버 목록 변환
  const assignees =
    memberData?.members.map((member: Member) => ({
      id: member.userId,
      nickname: member.nickname,
    })) ?? [];

  const handleOpenTodoCreateModal = (columnId: number) => {
    setSelectedColumnId(columnId);
  };

  const handleCloseTodoCreateModal = () => {
    setSelectedColumnId(null);
  };

  const handleOpenTodoEditModal = (card: CardType) => {
    setEditingCard(card);
  };

  const handleCloseTodoEditModal = () => {
    setEditingCard(null);
  };

  const refreshColumn = (columnId: number) => {
    setRefreshKeyByColumnId((prev) => ({
      ...prev,
      [columnId]: (prev[columnId] ?? 0) + 1,
    }));
  };

  const { isCreating, createCard } = useCreateCardWithImage({
    dashboardId,
    assignees,
    onSuccess: (columnId) => {
      setSelectedColumnId(null);
      refreshColumn(columnId);
    },
  });

  if (isColumnLoading || isMemberLoading) return <div>로딩 중...</div>;
  if (columnError) return <div>에러: {columnError}</div>;
  if (memberError) return <div>에러: {memberError}</div>;

  return (
    <>
      <div className={styles.columnList}>
        {columns.map((column: ColumnType) => (
          <Column
            key={`${column.id}-${refreshKeyByColumnId[column.id] ?? 0}`}
            id={column.id}
            title={column.title}
            onAddCard={() => handleOpenTodoCreateModal(column.id)}
            onEditCard={handleOpenTodoEditModal}
          />
        ))}
      </div>

      {selectedColumnId ? (
        <TodoCreateModal
          columns={columns.map(({ id, title }) => ({ id, title }))}
          assignees={assignees}
          initialColumnId={selectedColumnId}
          isCreating={isCreating}
          onClose={handleCloseTodoCreateModal}
          onCreate={createCard}
        />
      ) : null}

      {editingCard ? (
        <TodoEditModal
          card={editingCard}
          columns={columns.map(({ id, title }) => ({ id, title }))}
          assignees={assignees}
          onClose={handleCloseTodoEditModal}
          onEdit={async (cardId, card) => {
            console.log('수정 테스트:', cardId, card);
            handleCloseTodoEditModal();
          }}
        />
      ) : null}
    </>
  );
}