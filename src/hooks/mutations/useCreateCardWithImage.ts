import { useState } from 'react';
import { cardApi } from '@/lib/api/card';
import { cardImageApi } from '@/lib/api/cardImage';
import { showToast } from '@/lib/utils/toast';
import type { CreateTodoRequest, TodoAssigneeOption, TodoColumnOption } from '@/types/todo';

interface UseCreateCardWithImageProps {
  dashboardId: number;
  assignees: TodoAssigneeOption[];
  columns: TodoColumnOption[];
  onSuccess?: (columnId: number) => void;
}

const normalizeTitle = (title: string) => title.trim().toLowerCase();

const checkDuplicateTitleInDashboard = async (columns: TodoColumnOption[], title: string) => {
  const normalized = normalizeTitle(title);

  const cardLists = await Promise.all(
    columns.map((column) => cardApi.getList({ columnId: column.id, size: 100 })),
  );

  return cardLists.some((res) =>
    res.data.cards.some((card) => normalizeTitle(card.title) === normalized),
  );
};

export function useCreateCardWithImage({
  dashboardId,
  assignees,
  columns,
  onSuccess,
}: UseCreateCardWithImageProps) {
  const [isCreating, setIsCreating] = useState(false);

  const createCard = async (columnId: number, card: CreateTodoRequest, imageFile?: File | null) => {
    const defaultAssigneeId = assignees[0]?.id;
    const assigneeUserId = card.assigneeUserId ?? defaultAssigneeId;

    if (!assigneeUserId) {
      showToast.error('담당자를 선택해주세요.');
      return;
    }

    try {
      setIsCreating(true);

      const isDuplicate = await checkDuplicateTitleInDashboard(columns, card.title);

      if (isDuplicate) {
        showToast.error('이미 같은 제목의 할 일이 있습니다.');
        return;
      }

      let imageUrl = card.imageUrl;

      // 이미지가 있으면 먼저 업로드하고 반환된 URL을 카드 생성에 사용
      if (imageFile) {
        const res = await cardImageApi.upload(columnId, imageFile);
        imageUrl = res.data.imageUrl;
      }

      await cardApi.create({
        ...card,
        assigneeUserId,
        dashboardId,
        columnId,
        imageUrl,
      });

      showToast.success('할 일이 생성되었습니다.');
      onSuccess?.(columnId);
    } catch (error) {
      console.error('카드 생성 실패:', error);
      showToast.error('카드 생성에 실패했습니다.');
    } finally {
      setIsCreating(false);
    }
  };

  return {
    isCreating,
    createCard,
  };
}