'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import DashboardCreateModal from './DashboardCreateModal';

interface DashboardCreateModalContextValue {
  openDashboardCreateModal: () => void;
}

// 사이드바와 빈 대시보드 화면에서 같은 생성 모달 공유
const DashboardCreateModalContext = createContext<DashboardCreateModalContextValue | null>(null);

interface DashboardCreateModalProviderProps {
  children: React.ReactNode;
}

export function DashboardCreateModalProvider({ children }: DashboardCreateModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      openDashboardCreateModal: () => setIsOpen(true),
    }),
    [],
  );

  return (
    <DashboardCreateModalContext.Provider value={value}>
      {children}
      {isOpen ? <DashboardCreateModal onClose={() => setIsOpen(false)} /> : null}
    </DashboardCreateModalContext.Provider>
  );
}

export function useDashboardCreateModal() {
  const context = useContext(DashboardCreateModalContext);

  if (!context) {
    throw new Error('useDashboardCreateModal must be used within DashboardCreateModalProvider');
  }

  return context;
}
