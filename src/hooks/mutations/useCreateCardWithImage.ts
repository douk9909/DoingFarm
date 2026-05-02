import { useState } from 'react';
import { cardApi } from '@/lib/api/card';
import { cardImageApi } from '@/lib/api/cardImage';
import type { CreateTodoRequest, TodoAssigneeOption } from '@/types/todo';

interface UseCreateCardWithImageProps {
  dashboardId: number;
  assignees: TodoAssigneeOption[];
  onSuccess?: (columnId: number) => void;
}

export function useCreateCardWithImage({
  dashboardId,
  assignees,
  onSuccess,
}: UseCreateCardWithImageProps) {
  const [isCreating, setIsCreating] = useState(false);

  const createCard = async (
    columnId: number,
    card: CreateTodoRequest,
    imageFile?: File | null,
  ) => {
    const defaultAssigneeId = assignees[0]?.id;
    const assigneeUserId = card.assigneeUserId ?? defaultAssigneeId;

    if (!assigneeUserId) {
      return;
    }

    try {
      setIsCreating(true);

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

      onSuccess?.(columnId);
    } catch (error) {
      console.error('카드 생성 실패:', error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    isCreating,
    createCard,
  };
}