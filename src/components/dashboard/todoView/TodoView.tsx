'use client';

import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/ui/useIsMobile';
import TodoViewModal from './TodoViewModal';
import TodoViewPage from './TodoViewPage';
import type { TodoViewContentProps } from './TodoViewContent';

type TodoViewProps = TodoViewContentProps;

export default function TodoView(props: TodoViewProps) {
  const isMobile = useIsMobile();

  return isMobile ? <TodoViewPage {...props} /> : <TodoViewModal {...props} />;
}
