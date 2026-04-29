'use client';

import { useState } from 'react';
import TodoCreateModal, {
  type CreatedTodoCard,
} from '@/components/dashboard/todoCreate/TodoCreateModal';
import { useFetch } from '@/hooks/queries/useFetch';
import { columnApi } from '@/lib/api/column';
import type { Column as ColumnType } from '@/types/column';
import Column from './Column';
import styles from './ColumnList.module.css';

const mockAssignees = [
  { id: 1, nickname: '박주헌' },
  { id: 2, nickname: '박진아' },
  { id: 3, nickname: '박경민' },
];

export default function ColumnList({ dashboardId }: { dashboardId: number }) {
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
  const { data, isLoading, error } = useFetch(() =>
    columnApi.getList(dashboardId).then((res) => ({ data: res.data })),
  );

  const columns = data?.data ?? [];

  const handleOpenTodoCreateModal = (columnId: number) => {
    setSelectedColumnId(columnId);
  };

  const handleCloseTodoCreateModal = () => {
    setSelectedColumnId(null);
  };

  const handleCreateCard = (_columnId: number, _card: CreatedTodoCard) => {
    // 카드 생성 API 연결 전까지는 모달 입력 흐름만 확인
    setSelectedColumnId(null);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <>
      <div className={styles.columnList}>
        {columns.map((column: ColumnType) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            onAddCard={() => handleOpenTodoCreateModal(column.id)}
          />
        ))}
      </div>

      {selectedColumnId ? (
        <TodoCreateModal
          columns={columns.map(({ id, title }) => ({ id, title }))}
          assignees={mockAssignees}
          initialColumnId={selectedColumnId}
          onClose={handleCloseTodoCreateModal}
          onCreate={handleCreateCard}
        />
      ) : null}
    </>
  );
}
