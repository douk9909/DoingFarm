'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
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
  const [dashboardListVersion, setDashboardListVersion] = useState(0);

  const openDashboardCreateModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDashboardCreateModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const notifyDashboardCreated = useCallback(() => {
    setDashboardListVersion((version) => version + 1);
  }, []);

  const value = useMemo(
    () => ({
      openDashboardCreateModal,
      dashboardListVersion,
      notifyDashboardCreated,
    }),
    [dashboardListVersion, notifyDashboardCreated, openDashboardCreateModal],
  );

  return (
    <DashboardCreateModalContext.Provider value={value}>
      {children}
      {isOpen ? (
        <DashboardCreateModal
          onClose={closeDashboardCreateModal}
          onCreated={notifyDashboardCreated}
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
