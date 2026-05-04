import { useState } from 'react';
import { cardApi } from '@/lib/api/card';
import { cardImageApi } from '@/lib/api/cardImage';
import { showToast } from '@/lib/utils/toast';
import type { Card } from '@/types/card';
import type { CreateTodoRequest, TodoAssigneeOption } from '@/types/todo';

interface CardTitleCacheItem {
  id: number;
  title: string;
}

interface UseCreateCardWithImageProps {
  dashboardId: number;
  assignees: TodoAssigneeOption[];
  existingCardTitles: CardTitleCacheItem[];
  isTitleCacheReady: boolean;
  onSuccess?: (columnId: number, createdCard: Card) => void;
}

const normalizeTitle = (title: string) => title.trim().toLowerCase();

export function useCreateCardWithImage({
  dashboardId,
  assignees,
  existingCardTitles,
  isTitleCacheReady,
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

    if (!isTitleCacheReady) {
      showToast.error('할 일 목록을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      setIsCreating(true);

      const normalizedTitle = normalizeTitle(card.title);
      const isDuplicate = existingCardTitles.some(
        (item) => normalizeTitle(item.title) === normalizedTitle,
      );

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

      const res = await cardApi.create({
        ...card,
        assigneeUserId,
        dashboardId,
        columnId,
        imageUrl,
      });

      showToast.success('할 일이 생성되었습니다.');
      onSuccess?.(columnId, res.data);
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