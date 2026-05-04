'use client';

import { useState, useCallback, useEffect } from 'react';
import { userApi } from '@/lib/api/user';

const PINNED_KEY_PREFIX = 'pinnedDashboardIds';

const buildKey = (userId: number) => `${PINNED_KEY_PREFIX}_${userId}`;

const readPinnedIds = (key: string): number[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
};

const writePinnedIds = (key: string, ids: number[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(ids));
};

export const usePinnedDashboards = () => {
  const [storageKey, setStorageKey] = useState<string | null>(null);
  const [pinnedIds, setPinnedIds] = useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;

    userApi.getMe().then((res) => {
      if (cancelled) return;
      const key = buildKey(res.data.id);
      setStorageKey(key);
      setPinnedIds(readPinnedIds(key));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!storageKey) return;
    writePinnedIds(storageKey, pinnedIds);
  }, [storageKey, pinnedIds]);

  const togglePin = useCallback(
    (dashboardId: number) => {
      if (!storageKey) return;

      setPinnedIds((prev) =>
        prev.includes(dashboardId)
          ? prev.filter((id) => id !== dashboardId)
          : [...prev, dashboardId],
      );
    },
    [storageKey],
  );

  const isPinned = useCallback(
    (dashboardId: number) => pinnedIds.includes(dashboardId),
    [pinnedIds],
  );

  return { pinnedIds, togglePin, isPinned };
};
