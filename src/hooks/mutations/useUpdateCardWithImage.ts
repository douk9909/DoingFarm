import { useState } from 'react';
import { cardApi, type UpdateCardRequest } from '@/lib/api/card';
import { cardImageApi } from '@/lib/api/cardImage';
import { showToast } from '@/lib/utils/toast';
import type { TodoColumnOption } from '@/types/todo';

interface UseUpdateCardWithImageProps {
  columns: TodoColumnOption[];
  onSuccess?: (columnId: number) => void;
}

const normalizeTitle = (title: string) => title.trim().toLowerCase();

const checkDuplicateTitleInDashboard = async (
  columns: TodoColumnOption[],
  title: string,
  currentCardId: number,
) => {
  const normalized = normalizeTitle(title);

  const cardLists = await Promise.all(
    columns.map((column) => cardApi.getList({ columnId: column.id, size: 100 })),
  );

  return cardLists.some((res) =>
    res.data.cards.some(
      (card) => card.id !== currentCardId && normalizeTitle(card.title) === normalized,
    ),
  );
};

export function useUpdateCardWithImage({ columns, onSuccess }: UseUpdateCardWithImageProps) {
  const [isEditing, setIsEditing] = useState(false);

  const updateCard = async (
    cardId: number,
    card: UpdateCardRequest,
    imageFile?: File | null,
  ) => {
    try {
      setIsEditing(true);

      const isDuplicate = await checkDuplicateTitleInDashboard(columns, card.title, cardId);

      if (isDuplicate) {
        showToast.error('이미 같은 제목의 할 일이 있습니다.');
        return;
      }

      let imageUrl = card.imageUrl;

      // 새 이미지가 있으면 먼저 업로드하고 반환된 URL을 카드 수정에 사용
      if (imageFile) {
        const res = await cardImageApi.upload(card.columnId, imageFile);
        imageUrl = res.data.imageUrl;
      }

      await cardApi.update(cardId, {
        ...card,
        imageUrl,
      });

      showToast.success('할 일이 수정되었습니다.');
      onSuccess?.(card.columnId);
    } catch (error) {
      console.error('카드 수정 실패:', error);
      showToast.error('카드 수정에 실패했습니다.');
    } finally {
      setIsEditing(false);
    }
  };

  return {
    isEditing,
    updateCard,
  };
}