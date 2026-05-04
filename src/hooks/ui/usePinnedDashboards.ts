'use client';

import { useState, useCallback } from 'react';

const PINNED_KEY = 'pinnedDashboardIds';

const readPinnedIds = (): number[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PINNED_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
};

const writePinnedIds = (ids: number[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PINNED_KEY, JSON.stringify(ids));
};

export const usePinnedDashboards = () => {
  const [pinnedIds, setPinnedIds] = useState<number[]>(readPinnedIds);

  const togglePin = useCallback((dashboardId: number) => {
    setPinnedIds((prev) => {
      const next = prev.includes(dashboardId)
        ? prev.filter((id) => id !== dashboardId)
        : [...prev, dashboardId];
      writePinnedIds(next);
      return next;
    });
  }, []);

  const isPinned = useCallback(
    (dashboardId: number) => pinnedIds.includes(dashboardId),
    [pinnedIds],
  );

  return { pinnedIds, togglePin, isPinned };
};
