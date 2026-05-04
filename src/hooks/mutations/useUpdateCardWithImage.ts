import { useState } from 'react';
import { cardApi, type UpdateCardRequest } from '@/lib/api/card';
import { cardImageApi } from '@/lib/api/cardImage';
import { showToast } from '@/lib/utils/toast';
import type { Card } from '@/types/card';

interface CardTitleCacheItem {
  id: number;
  title: string;
}

interface UseUpdateCardWithImageProps {
  existingCardTitles: CardTitleCacheItem[];
  isTitleCacheReady: boolean;
  onSuccess?: (columnId: number, updatedCard: Card) => void;
}

const normalizeTitle = (title: string) => title.trim().toLowerCase();

export function useUpdateCardWithImage({
  existingCardTitles,
  isTitleCacheReady,
  onSuccess,
}: UseUpdateCardWithImageProps) {
  const [isEditing, setIsEditing] = useState(false);

  const updateCard = async (
    cardId: number,
    card: UpdateCardRequest,
    imageFile?: File | null,
  ) => {
    if (!isTitleCacheReady) {
      showToast.error('할 일 목록을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      setIsEditing(true);

      const normalizedTitle = normalizeTitle(card.title);
      const isDuplicate = existingCardTitles.some(
        (item) => item.id !== cardId && normalizeTitle(item.title) === normalizedTitle,
      );

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

      const res = await cardApi.update(cardId, {
        ...card,
        imageUrl,
      });

      showToast.success('할 일이 수정되었습니다.');
      onSuccess?.(card.columnId, res.data);
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