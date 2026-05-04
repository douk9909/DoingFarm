'use client';

import { useEffect, useState } from 'react';
import TodoViewModal from './TodoViewModal';
import TodoViewPage from './TodoViewPage';
import type { TodoViewContentProps } from './TodoViewContent';

type TodoViewProps = TodoViewContentProps;

export default function TodoView(props: TodoViewProps) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile ? <TodoViewPage {...props} /> : <TodoViewModal {...props} />;
}
