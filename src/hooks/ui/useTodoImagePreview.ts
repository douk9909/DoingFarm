'use client';

import { useRef, useState } from 'react';

export function useTodoImagePreview() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const readerIdRef = useRef(0);

  const updateImage = (file: File | null) => {
    readerIdRef.current += 1;
    const readerId = readerIdRef.current;

    setImageFile(file);

    if (!file) {
      setImagePreviewUrl('');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (readerId === readerIdRef.current && typeof reader.result === 'string') {
        // 카드 미리보기에서 바로 쓸 수 있게 data URL로 저장
        setImagePreviewUrl(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    updateImage(null);
  };

  return {
    imageFile,
    imagePreviewUrl,
    updateImage,
    removeImage,
  };
}
