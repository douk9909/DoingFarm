'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { DashboardInvitation } from '@/lib/api/dashboard';
import { invitationApi } from '@/lib/api/invitations';
import { useDashboards } from './useDashboards';
import { useDashboardCreateModal } from '@/components/dashboard/create/DashboardCreateModalProvider';
import { showToast } from '@/lib/utils/toast';

const INVITATION_PAGE_SIZE = 8;

export function useReceivedInvitations(searchKeyword = '') {
  const [invitations, setInvitations] = useState<DashboardInvitation[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pendingInvitationId, setPendingInvitationId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasNextPage = cursorId !== null;

  const { notifyDashboardCreated, dashboardListVersion } = useDashboardCreateModal();
  const {
    dashboards,
    isLoading: isDashboardsLoading,
    refetchDashboards,
  } = useDashboards(dashboardListVersion);

  // 이미 내 대시보드 목록에 들어온 초대는 화면에서 다시 보여주지 않도록 걸러냅니다.
  // 예를 들어 초대를 수락한 직후 같은 항목이 초대 목록에 남아 보이는 상황을 막기 위한 처리입니다.
  const getFilteredInvitations = useCallback(
    (rawList: DashboardInvitation[]) => {
      const myDashboardIds = new Set(dashboards.map((d) => d.id));

      return rawList.filter((inv) => !myDashboardIds.has(inv.dashboard.id));
    },
    [dashboards],
  );

  const fetchFirstPage = useCallback(
    async (title: string, signal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await invitationApi.getReceivedInvitations(
          {
            size: INVITATION_PAGE_SIZE,
            title: title.trim() || undefined,
          },
          signal,
        );

        if (signal?.aborted) return;

        setInvitations(getFilteredInvitations(response.data.invitations));
        setCursorId(response.data.cursorId);
      } catch (fetchError) {
        if (signal?.aborted) return;

        setError(
          fetchError instanceof Error ? fetchError.message : '초대 목록을 불러오지 못했어요',
        );
      } finally {
        if (!signal?.aborted) {
          setIsLoading(false);
        }
      }
    },
    [getFilteredInvitations],
  );

  const fetchFirstPageRef = useRef(fetchFirstPage);

  useEffect(() => {
    fetchFirstPageRef.current = fetchFirstPage;
  }, [fetchFirstPage]);

  useEffect(() => {
    if (isDashboardsLoading) return;
    const controller = new AbortController();

    // 검색어가 바뀌면 이전 목록을 이어 붙이지 않고 첫 페이지부터 새로 조회합니다.
    fetchFirstPage(searchKeyword, controller.signal);

    return () => {
      controller.abort();
    };
  }, [searchKeyword, fetchFirstPage, isDashboardsLoading]);

  const loadMore = useCallback(async () => {
    if (!hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const response = await invitationApi.getReceivedInvitations({
        cursorId,
        size: INVITATION_PAGE_SIZE,
        title: searchKeyword.trim() || undefined,
      });

      // cursor 기반 목록이라 다음 페이지는 기존 목록 뒤에 이어 붙입니다.
      const filteredNewData = getFilteredInvitations(response.data.invitations);
      setInvitations((prev) => [...prev, ...filteredNewData]);
      setCursorId(response.data.cursorId);
    } catch (fetchError) {
      setError(
        fetchError instanceof Error ? fetchError.message : '초대 목록을 더 불러오지 못했어요',
      );
    } finally {
      setIsLoadingMore(false);
    }
  }, [cursorId, hasNextPage, isLoadingMore, searchKeyword, getFilteredInvitations]);

  // 초대 수락: API 성공 후 초대 목록에서 제거하고 내 대시보드 목록을 다시 맞춥니다.
  const acceptInvitation = useCallback(
    async (invitationId: number, dashboardId: number) => {
      if (pendingInvitationId) return;

      setPendingInvitationId(invitationId);
      setError(null);

      try {
        await invitationApi.updateInvitation(invitationId, { inviteAccepted: true });

        showToast.success('초대를 수락했습니다');

        // 수락이 완료되면 받은 초대 목록에서 해당 항목을 제거합니다.
        setInvitations((prev) => prev.filter((inv) => inv.dashboard.id !== dashboardId));

        notifyDashboardCreated();
      } catch (acceptError) {
        setError(acceptError instanceof Error ? acceptError.message : '초대를 수락하지 못했어요');
        showToast.error(
          acceptError instanceof Error ? acceptError.message : '초대를 수락하지 못했어요',
        );
      } finally {
        setPendingInvitationId(null);
      }
    },
    [pendingInvitationId, refetchDashboards, notifyDashboardCreated],
  );

  // 초대 거절: API 성공 후 현재 목록에서만 제거하면 됩니다.
  const rejectInvitation = useCallback(
    async (invitationId: number) => {
      if (pendingInvitationId) return;

      setPendingInvitationId(invitationId);
      setError(null);

      try {
        await invitationApi.updateInvitation(invitationId, { inviteAccepted: false });

        showToast.success('초대를 거절했습니다');
        // 거절이 완료되면 받은 초대 목록에서 해당 항목을 제거합니다.
        setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
      } catch (rejectError) {
        setError(rejectError instanceof Error ? rejectError.message : '초대를 거절하지 못했어요');
        showToast.error(
          rejectError instanceof Error ? rejectError.message : '초대를 거절하지 못했어요',
        );
      } finally {
        setPendingInvitationId(null);
      }
    },
    [pendingInvitationId],
  );

  return {
    invitations,
    isLoading: (isLoading || isDashboardsLoading) && invitations.length === 0,
    isLoadingMore,
    pendingInvitationId,
    error,
    hasNextPage,
    loadMore,
    acceptInvitation,
    rejectInvitation,
  };
}
