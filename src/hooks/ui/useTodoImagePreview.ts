'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useTodoImagePreview() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const objectUrlRef = useRef('');

  const revokePreviewUrl = useCallback(() => {
    if (!objectUrlRef.current) return;

    URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = '';
  }, []);

  const updateImage = (file: File | null) => {
    revokePreviewUrl();
    setImageFile(file);

    if (!file) {
      setImagePreviewUrl('');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setImagePreviewUrl(objectUrl);
  };

  const removeImage = () => {
    updateImage(null);
  };

  useEffect(() => {
    return () => {
      revokePreviewUrl();
    };
  }, [revokePreviewUrl]);

  return {
    imageFile,
    imagePreviewUrl,
    updateImage,
    removeImage,
  };
}
