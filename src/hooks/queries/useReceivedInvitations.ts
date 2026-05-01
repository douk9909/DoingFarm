'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { dashboardApi, type DashboardInvitation } from '@/lib/api/dashboard';

const INVITATION_PAGE_SIZE = 8;
const SEARCH_DEBOUNCE_MS = 250;

export function useReceivedInvitations() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [invitations, setInvitations] = useState<DashboardInvitation[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pendingInvitationId, setPendingInvitationId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasNextPage = cursorId !== null;

  const removeInvitation = useCallback((invitationId: number) => {
    setInvitations((prevInvitations) =>
      prevInvitations.filter((invitation) => invitation.id !== invitationId),
    );
  }, []);

  const fetchFirstPage = useCallback(async (title: string, signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await dashboardApi.getReceivedInvitations(
        {
          size: INVITATION_PAGE_SIZE,
          title: title.trim() || undefined,
        },
        signal,
      );

      if (signal?.aborted) return;

      setInvitations(response.data.invitations);
      setCursorId(response.data.cursorId);
    } catch (fetchError) {
      if (signal?.aborted) return;

      setError(fetchError instanceof Error ? fetchError.message : '초대 목록을 불러오지 못했어요');
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  const fetchFirstPageRef = useRef(fetchFirstPage);

  useEffect(() => {
    fetchFirstPageRef.current = fetchFirstPage;
  }, [fetchFirstPage]);

  useEffect(() => {
    const controller = new AbortController();
    const timerId = window.setTimeout(() => {
      // 검색어가 바뀌면 기존 목록 기준을 버리고 첫 페이지부터 다시 맞춤
      void fetchFirstPageRef.current(searchKeyword, controller.signal);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timerId);
      controller.abort();
    };
  }, [searchKeyword]);

  const loadMore = useCallback(async () => {
    if (!hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const response = await dashboardApi.getReceivedInvitations({
        cursorId,
        size: INVITATION_PAGE_SIZE,
        title: searchKeyword.trim() || undefined,
      });

      // cursor 기반이라 다음 페이지는 기존 목록 뒤에 자연스럽게 붙임
      setInvitations((prevInvitations) => [...prevInvitations, ...response.data.invitations]);
      setCursorId(response.data.cursorId);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error ? fetchError.message : '초대 목록을 더 불러오지 못했어요',
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [cursorId, hasNextPage, isLoadingMore, searchKeyword]);

  const acceptInvitation = useCallback(
    async (invitationId: number) => {
      if (pendingInvitationId) return;

      setPendingInvitationId(invitationId);
      setError(null);

      try {
        await dashboardApi.acceptInvitation(invitationId);

        // 수락이 완료되면 받은 초대 목록에서 해당 항목을 제거함
        removeInvitation(invitationId);
      } catch (acceptError) {
        setError(acceptError instanceof Error ? acceptError.message : '초대를 수락하지 못했어요');
      } finally {
        setPendingInvitationId(null);
      }
    },
    [pendingInvitationId, removeInvitation],
  );

  const rejectInvitation = useCallback(
    async (invitationId: number) => {
      if (pendingInvitationId) return;

      setPendingInvitationId(invitationId);
      setError(null);

      try {
        await dashboardApi.rejectInvitation(invitationId);

        // 거절이 완료되면 받은 초대 목록에서 해당 항목을 제거함
        removeInvitation(invitationId);
      } catch (rejectError) {
        setError(rejectError instanceof Error ? rejectError.message : '초대를 거절하지 못했어요');
      } finally {
        setPendingInvitationId(null);
      }
    },
    [pendingInvitationId, removeInvitation],
  );

  return {
    searchKeyword,
    invitations,
    isLoading,
    isLoadingMore,
    pendingInvitationId,
    error,
    hasNextPage,
    setSearchKeyword,
    loadMore,
    acceptInvitation,
    rejectInvitation,
  };
}