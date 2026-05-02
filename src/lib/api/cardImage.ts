import { apiClient } from './client';

export interface UploadCardImageResponse {
  imageUrl: string;
}

export const cardImageApi = {
  // 카드 이미지 업로드
  upload: (columnId: number, image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    return apiClient.post<UploadCardImageResponse>(
      `/columns/${columnId}/card-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },
};