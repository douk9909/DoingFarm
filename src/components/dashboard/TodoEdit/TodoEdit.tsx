'use client';

import { useEffect, useState } from 'react';
import type { UpdateCardRequest } from '@/lib/api/card';
import type { Card } from '@/types/card';
import type { TodoAssigneeOption, TodoColumnOption } from '@/types/todo';
import { useIsMobile } from '@/hooks/ui/useIsMobile';
import TodoEditModal from './TodoEditModal';
import TodoEditPage from './TodoEditPage';

export interface TodoEditProps {
  card: Card;
  columns: TodoColumnOption[];
  assignees: TodoAssigneeOption[];
  isEditing?: boolean;
  onClose: () => void;
  onEdit: (cardId: number, card: UpdateCardRequest, imageFile?: File | null) => Promise<void>;
}

export default function TodoEdit(props: TodoEditProps) {
  const isMobile = useIsMobile();

  return isMobile ? <TodoEditPage {...props} /> : <TodoEditModal {...props} />;
}