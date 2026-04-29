'use client';

<<<<<<< HEAD
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
=======
import { createContext, useContext, useMemo, useState } from 'react';
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
import DashboardCreateModal from './DashboardCreateModal';

interface DashboardCreateModalContextValue {
  openDashboardCreateModal: () => void;
<<<<<<< HEAD
  dashboardListVersion: number;
  notifyDashboardCreated: () => void;
=======
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
}

// 사이드바와 빈 대시보드 화면에서 같은 생성 모달 공유
const DashboardCreateModalContext = createContext<DashboardCreateModalContextValue | null>(null);

interface DashboardCreateModalProviderProps {
  children: React.ReactNode;
}

export function DashboardCreateModalProvider({ children }: DashboardCreateModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD
  // 생성 성공 시 version을 올려 사이드바 목록 갱신
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
=======

  const value = useMemo(
    () => ({
      openDashboardCreateModal: () => setIsOpen(true),
    }),
    [],
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
  );

  return (
    <DashboardCreateModalContext.Provider value={value}>
      {children}
<<<<<<< HEAD
      {isOpen ? (
        <DashboardCreateModal
          onClose={closeDashboardCreateModal}
          onCreated={notifyDashboardCreated}
        />
      ) : null}
=======
      {isOpen ? <DashboardCreateModal onClose={() => setIsOpen(false)} /> : null}
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
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
