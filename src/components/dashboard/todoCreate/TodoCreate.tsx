'use client';

import { useEffect, useState } from 'react';
import type { CreateTodoRequest, TodoAssigneeOption, TodoColumnOption } from '@/types/todo';
import TodoCreateModal from './TodoCreateModal';
import TodoCreatePage from './TodoCreatePage';

export interface TodoCreateProps {
  columns: TodoColumnOption[];
  assignees: TodoAssigneeOption[];
  initialColumnId: number;
  isCreating?: boolean;
  onClose: () => void;
  onCreate: (columnId: number, card: CreateTodoRequest, imageFile?: File | null) => Promise<void>;
}

export default function TodoCreate(props: TodoCreateProps) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile ? <TodoCreatePage {...props} /> : <TodoCreateModal {...props} />;
}
