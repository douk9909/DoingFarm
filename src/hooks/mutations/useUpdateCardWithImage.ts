import { useState } from 'react';
import { cardApi, type UpdateCardRequest } from '@/lib/api/card';
import { cardImageApi } from '@/lib/api/cardImage';

interface UseUpdateCardWithImageProps {
  onSuccess?: (columnId: number) => void;
}

export function useUpdateCardWithImage({ onSuccess }: UseUpdateCardWithImageProps) {
  const [isEditing, setIsEditing] = useState(false);

  const updateCard = async (
    cardId: number,
    card: UpdateCardRequest,
    imageFile?: File | null,
  ) => {
    try {
      setIsEditing(true);

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

      onSuccess?.(card.columnId);
    } catch (error) {
      console.error('카드 수정 실패:', error);
      throw error;
    } finally {
      setIsEditing(false);
    }
  };

  return {
    isEditing,
    updateCard,
  };
}