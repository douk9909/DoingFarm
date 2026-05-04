'use client';

import { useEffect, useMemo, useState } from 'react';
import TodoCreate from '@/components/dashboard/todoCreate/TodoCreate';
import TodoEdit from '@/components/dashboard/todoEdit/TodoEdit';
import TodoView from '@/components/dashboard/todoView/TodoView';
import { apiClient } from '@/lib/api/client';
import { cardApi } from '@/lib/api/card';
import { dashboardApi } from '@/lib/api/dashboard';
import { memberApi, type Member } from '@/lib/api/member';
import { useCreateCardWithImage } from '@/hooks/mutations/useCreateCardWithImage';
import { useUpdateCardWithImage } from '@/hooks/mutations/useUpdateCardWithImage';
import { useFetch } from '@/hooks/queries/useFetch';
import { columnApi } from '@/lib/api/column';
import type { Column as ColumnType } from '@/types/column';
import type { Card } from '@/types/card';
import type { User } from '@/types/user';
import Column from './Column';
import styles from './ColumnList.module.css';
import AddColumnButton from './AddColumnButton';
import AddColumnModal from './modal/AddColumnModal';
import ColumnRefetchContext from './ColumnRefetchContext';
import { showToast } from '@/lib/utils/toast';
import SkeletonColumnList from './Skeleton/SkeletonColumnList';

const MEMBER_PAGE_SIZE = 100;
const CARD_CACHE_SIZE = 1000;

interface SelectedCard {
  cardId: number;
  columnId: number;
  columnTitle: string;
}

interface CardTitleCacheItem {
  id: number;
  title: string;
}

export default function ColumnList({
  dashboardId,
  dashboardTitle,
}: {
  dashboardId: number;
  dashboardTitle?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [refreshKeyByColumnId, setRefreshKeyByColumnId] = useState<Record<number, number>>({});
  const [cardTitleCache, setCardTitleCache] = useState<CardTitleCacheItem[]>([]);
  const [isTitleCacheReady, setIsTitleCacheReady] = useState(false);

  // 대시보드 정보 조회
  const { data: dashboardData } = useFetch(() =>
    dashboardApi.getOne(dashboardId).then((res) => ({ data: res.data })),
  );

  // 컬럼 조회
  const {
    data: columnData,
    isLoading: isColumnLoading,
    error: columnError,
    refetch,
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

  // ❗ columns를 useMemo로 감싸서 불필요한 리렌더 방지
  const columns = useMemo(() => columnData?.data ?? [], [columnData]);

  const todoColumns = useMemo(() => columns.map(({ id, title }) => ({ id, title })), [columns]);

  const existingColumnTitles = useMemo(() => columns.map((column) => column.title), [columns]);

  const resolvedDashboardTitle = dashboardTitle ?? dashboardData?.title ?? '';

  // 담당자 드롭다운에 사용할 멤버 목록 변환
  const assignees =
    memberData?.members.map((member: Member) => ({
      id: member.userId,
      nickname: member.nickname,
    })) ?? [];

  useEffect(() => {
    let isCancelled = false;

    const fetchCardTitleCache = async () => {
      if (todoColumns.length === 0) {
        setCardTitleCache([]);
        setIsTitleCacheReady(true);
        return;
      }

      setIsTitleCacheReady(false);

      try {
        const responses = await Promise.all(
          todoColumns.map((column) =>
            cardApi.getList({
              columnId: column.id,
              size: CARD_CACHE_SIZE,
            }),
          ),
        );

        if (isCancelled) return;

        const nextCardTitleCache = responses.flatMap((res) =>
          res.data.cards.map((card) => ({
            id: card.id,
            title: card.title,
          })),
        );

        setCardTitleCache(nextCardTitleCache);
        setIsTitleCacheReady(true);
      } catch (error) {
        console.error('카드 제목 캐시 조회 실패:', error);

        if (isCancelled) return;

        setCardTitleCache([]);
        setIsTitleCacheReady(true);
      }
    };

    void fetchCardTitleCache();

    return () => {
      isCancelled = true;
    };
  }, [todoColumns]);

  const handleAddButton = () => {
    if (columns.length >= 10) {
      showToast.error('컬럼은 10개까지만 생성 가능합니다.');
      return;
    }

    setIsModalOpen(true);
  };

  const handleOpenTodoCreateModal = (columnId: number) => {
    setSelectedColumnId(columnId);
  };

  const handleCloseTodoCreateModal = () => {
    setSelectedColumnId(null);
  };

  const handleCardClick = (cardId: number, columnId: number, columnTitle: string) => {
    setSelectedCard({ cardId, columnId, columnTitle });
  };

  const handleCloseTodoView = () => {
    setSelectedCard(null);
  };

  const handleEditCard = (card: Card) => {
    // 상세 모달의 수정하기 버튼에서 받은 카드 정보로 수정 모달을 열어줌
    setSelectedCard(null);
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

  const handleCardDeleted = (cardId: number) => {
    if (selectedCard) {
      refreshColumn(selectedCard.columnId);
    }

    setCardTitleCache((prev) => prev.filter((card) => card.id !== cardId));
    setSelectedCard(null);
  };

  const { isCreating, createCard } = useCreateCardWithImage({
    dashboardId,
    assignees,
    existingCardTitles: cardTitleCache,
    isTitleCacheReady,
    onSuccess: (columnId, createdCard) => {
      setSelectedColumnId(null);
      setCardTitleCache((prev) => [
        ...prev,
        {
          id: createdCard.id,
          title: createdCard.title,
        },
      ]);
      refreshColumn(columnId);
    },
  });

  const { isEditing, updateCard } = useUpdateCardWithImage({
    existingCardTitles: cardTitleCache,
    isTitleCacheReady,
    onSuccess: (nextColumnId, updatedCard) => {
      const previousColumnId = editingCard?.columnId;

      setEditingCard(null);

      setCardTitleCache((prev) => {
        const hasCachedCard = prev.some((card) => card.id === updatedCard.id);

        if (!hasCachedCard) {
          return [
            ...prev,
            {
              id: updatedCard.id,
              title: updatedCard.title,
            },
          ];
        }

        return prev.map((card) =>
          card.id === updatedCard.id
            ? {
                id: updatedCard.id,
                title: updatedCard.title,
              }
            : card,
        );
      });

      refreshColumn(nextColumnId);

      if (previousColumnId && previousColumnId !== nextColumnId) {
        refreshColumn(previousColumnId);
      }
    },
  });

  if (isColumnLoading || isMemberLoading || isUserLoading) return <SkeletonColumnList />;
  if (columnError) return <div>에러: {columnError}</div>;
  if (memberError) return <div>에러: {memberError}</div>;

  return (
    <ColumnRefetchContext.Provider value={refetch}>
      <div className={`${styles.columnList} custom-scrollbar`}>
        {columns.map((column: ColumnType, index) => (
          <Column
            key={`${column.id}-${refreshKeyByColumnId[column.id] ?? 0}`}
            id={column.id}
            title={column.title}
            index={index}
            existingTitles={existingColumnTitles}
            onAddCard={() => handleOpenTodoCreateModal(column.id)}
            onCardClick={(cardId) => handleCardClick(cardId, column.id, column.title)}
          />
        ))}

        <AddColumnButton onClick={handleAddButton} />

        {isModalOpen && (
          <AddColumnModal
            dashboardId={dashboardId}
            onClose={() => setIsModalOpen(false)}
            existingTitles={existingColumnTitles}
          />
        )}
      </div>

      {selectedColumnId ? (
        <TodoCreate
          columns={todoColumns}
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

      {editingCard ? (
        <TodoEdit
          card={editingCard}
          columns={todoColumns}
          assignees={assignees}
          isEditing={isEditing}
          onClose={handleCloseTodoEditModal}
          onEdit={updateCard}
        />
      ) : null}
    </ColumnRefetchContext.Provider>
  );
}
