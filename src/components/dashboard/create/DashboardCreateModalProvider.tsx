'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import DashboardCreateModal from './DashboardCreateModal';

interface DashboardCreateModalContextValue {
  openDashboardCreateModal: () => void;
  dashboardListVersion: number;
  notifyDashboardCreated: () => void;
}

// 사이드바와 빈 대시보드 화면에서 같은 생성 모달 공유
const DashboardCreateModalContext = createContext<DashboardCreateModalContextValue | null>(null);

interface DashboardCreateModalProviderProps {
  children: React.ReactNode;
}

export function DashboardCreateModalProvider({ children }: DashboardCreateModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  // 생성 성공 시 값을 올려 사이드바 목록 재조회를 유도
  const [dashboardListVersion, setDashboardListVersion] = useState(0);

  const value = useMemo(
    () => ({
      openDashboardCreateModal: () => setIsOpen(true),
      dashboardListVersion,
      notifyDashboardCreated: () => setDashboardListVersion((version) => version + 1),
    }),
    [dashboardListVersion],
  );

  return (
    <DashboardCreateModalContext.Provider value={value}>
      {children}
      {isOpen ? (
        <DashboardCreateModal
          onClose={() => setIsOpen(false)}
          onCreated={value.notifyDashboardCreated}
        />
      ) : null}
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
