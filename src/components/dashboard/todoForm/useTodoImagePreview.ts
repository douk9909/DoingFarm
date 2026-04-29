'use client';

import { useEffect, useRef, useState } from 'react';

export function useTodoImagePreview() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const imagePreviewUrlRef = useRef('');

  useEffect(() => {
    return () => {
      if (imagePreviewUrlRef.current) {
        URL.revokeObjectURL(imagePreviewUrlRef.current);
      }
    };
  }, []);

  const updateImage = (file: File | null) => {
    const nextPreviewUrl = file ? URL.createObjectURL(file) : '';

    if (imagePreviewUrlRef.current) {
      URL.revokeObjectURL(imagePreviewUrlRef.current);
    }

    imagePreviewUrlRef.current = nextPreviewUrl;
    setImageFile(file);
    setImagePreviewUrl(nextPreviewUrl);
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
