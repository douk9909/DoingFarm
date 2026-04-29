'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface DashboardContextType {
  title: string;
  color: string;
  updateDashboard: (title: string, color: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');

  const updateDashboard = (newTitle: string, newColor: string) => {
    setTitle(newTitle);
    setColor(newColor);
  };

  return (
    <DashboardContext.Provider value={{ title, color, updateDashboard }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('DashboardProvider 안에서만 사용 가능해요!');
  return context;
}
