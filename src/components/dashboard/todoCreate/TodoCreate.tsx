'use client';

import { useEffect, useState } from 'react';
import type { CreateTodoRequest, TodoAssigneeOption, TodoColumnOption } from '@/types/todo';
import { useIsMobile } from '@/hooks/ui/useIsMobile';
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
  const isMobile = useIsMobile();

  return isMobile ? <TodoCreatePage {...props} /> : <TodoCreateModal {...props} />;
}