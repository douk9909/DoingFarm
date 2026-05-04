'use client';

import { useState } from 'react';
import TodoCreateModal from '@/components/dashboard/todoCreate/TodoCreateModal';
import TodoView from '@/components/dashboard/todoView/TodoView';
import { memberApi, type Member } from '@/lib/api/member';
import { useCreateCardWithImage } from '@/hooks/mutations/useCreateCardWithImage';
import { useFetch } from '@/hooks/queries/useFetch';
import { columnApi } from '@/lib/api/column';
import { dashboardApi } from '@/lib/api/dashboard';
import { apiClient } from '@/lib/api/client';
import type { Column as ColumnType } from '@/types/column';
import type { Card } from '@/types/card';
import type { User } from '@/types/user';
import Column from './Column';
import styles from './ColumnList.module.css';

const MEMBER_PAGE_SIZE = 100;

interface SelectedCard {
  cardId: number;
  columnId: number;
  columnTitle: string;
}

export default function ColumnList({
  dashboardId,
  dashboardTitle,
}: {
  dashboardId: number;
  dashboardTitle?: string;
}) {
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
  const [refreshKeyByColumnId, setRefreshKeyByColumnId] = useState<Record<number, number>>({});

  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);

  // 대시보드 정보 조회
  const { data: dashboardData } = useFetch(() =>
    dashboardApi.getOne(dashboardId).then((res) => ({ data: res.data })),
  );

  const resolvedDashboardTitle = dashboardTitle ?? dashboardData?.title;
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

  // 현재 로그인 유저 조회
  const { data: currentUser, isLoading: isUserLoading } = useFetch(() =>
    apiClient.get<User>('/users/me').then((res) => ({ data: res.data })),
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

  const handleCardClick = (cardId: number, columnId: number, columnTitle: string) => {
    setSelectedCard({ cardId, columnId, columnTitle });
  };

  const handleCloseTodoView = () => {
    setSelectedCard(null);
  };

  const handleCardDeleted = (_cardId: number) => {
    if (selectedCard) {
      refreshColumn(selectedCard.columnId);
    }
    setSelectedCard(null);
  };

  const handleEditCard = (_card: Card) => {
    // TODO: 수정 모달 연결
  };

  if (isColumnLoading || isMemberLoading || isUserLoading) return <div>로딩 중...</div>;
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
            onCardClick={(cardId) => handleCardClick(cardId, column.id, column.title)}
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

      {selectedCard !== null && currentUser && (
        <TodoView
          cardId={selectedCard.cardId}
          columnId={selectedCard.columnId}
          dashboardId={dashboardId}
          dashboardTitle={resolvedDashboardTitle}
          columnTitle={selectedCard.columnTitle}
          currentUser={currentUser}
          onClose={handleCloseTodoView}
          onCardDeleted={handleCardDeleted}
          onEditCard={handleEditCard}
        />
      )}
    </>
  );
}
