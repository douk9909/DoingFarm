'use client';

import { useState } from 'react';
import TodoCreateModal from '@/components/dashboard/todoCreate/TodoCreateModal';
import { memberApi, type Member } from '@/lib/api/member';
import { useCreateCardWithImage } from '@/hooks/mutations/useCreateCardWithImage';
import { useFetch } from '@/hooks/queries/useFetch';
import { columnApi } from '@/lib/api/column';
import type { Column as ColumnType } from '@/types/column';
import Column from './Column';
import styles from './ColumnList.module.css';
import AddColumnButton from './AddColumnButton';
import AddColumnModal from './AddColumnModal';
import ColumnRefetchContext from './ColumnRefetchContext';
import { showToast } from '@/lib/utils/toast';

const MEMBER_PAGE_SIZE = 100;

export default function ColumnList({ dashboardId }: { dashboardId: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
  const [refreshKeyByColumnId, setRefreshKeyByColumnId] = useState<Record<number, number>>({});

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

  const columns = columnData?.data ?? [];

  // 담당자 드롭다운에 사용할 멤버 목록 변환
  const assignees =
    memberData?.members.map((member: Member) => ({
      id: member.userId,
      nickname: member.nickname,
    })) ?? [];

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
    <ColumnRefetchContext.Provider value={refetch}>
      <div className={`${styles.columnList} custom-scrollbar`}>
        {columns.map((column: ColumnType, index) => (
          <Column
            key={`${column.id}-${refreshKeyByColumnId[column.id] ?? 0}`}
            id={column.id}
            title={column.title}
            index={index}
            onAddCard={() => handleOpenTodoCreateModal(column.id)}
          />
        ))}
        <AddColumnButton onClick={handleAddButton} />
        {isModalOpen && (
          <AddColumnModal
            dashboardId={dashboardId}
            onClose={() => setIsModalOpen(false)}
            existingTitles={columns.map((col) => col.title)}
          />
        )}
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
    </ColumnRefetchContext.Provider>
  );
}
