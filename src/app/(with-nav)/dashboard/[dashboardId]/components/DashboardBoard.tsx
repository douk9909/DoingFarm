'use client';

import { useState } from 'react';
import TodoCreateModal, {
  type CreatedTodoCard,
} from '@/components/dashboard/todoCreate/TodoCreateModal';
import Column, { type CardData, type ColumnData } from './Column';
import styles from './ColumnList.module.css';

interface DashboardBoardProps {
  columns: ColumnData[];
}

const mockAssignees = [
  { id: 1, nickname: '박민영' },
  { id: 2, nickname: '김도연' },
  { id: 3, nickname: '이서준' },
];

export default function DashboardBoard({ columns }: DashboardBoardProps) {
  const [boardColumns, setBoardColumns] = useState(columns);
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);

  const handleOpenTodoCreateModal = (columnId: number) => {
    setSelectedColumnId(columnId);
  };

  const handleCloseTodoCreateModal = () => {
    setSelectedColumnId(null);
  };

  const handleCreateCard = (columnId: number, card: CreatedTodoCard) => {
    const nextCard: CardData = {
      id: Date.now(),
      ...card,
    };

    // 생성된 카드는 선택한 컬럼의 마지막에 추가
    setBoardColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              totalCount: column.totalCount + 1,
              cards: [...column.cards, nextCard],
            }
          : column,
      ),
    );
    setSelectedColumnId(null);
  };

  return (
    <>
      <div className={styles.columnList}>
        {boardColumns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
            totalCount={column.totalCount}
            onAddCard={() => handleOpenTodoCreateModal(column.id)}
          />
        ))}
      </div>

      {selectedColumnId ? (
        <TodoCreateModal
          columns={boardColumns.map(({ id, title }) => ({ id, title }))}
          assignees={mockAssignees}
          initialColumnId={selectedColumnId}
          onClose={handleCloseTodoCreateModal}
          onCreate={handleCreateCard}
        />
      ) : null}
    </>
  );
}
