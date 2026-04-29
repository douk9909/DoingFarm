'use client';

import ImageIcon from '@/assets/icons/ImageIcon';
import styles from './TodoImageField.module.css';

interface TodoImageFieldProps {
  imagePreviewUrl: string;
  onChangeImage: (file: File | null) => void;
  onRemoveImage: () => void;
}

export default function TodoImageField({
  imagePreviewUrl,
  onChangeImage,
  onRemoveImage,
}: TodoImageFieldProps) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    onChangeImage(file);
  };

  return (
    <div className={styles.field}>
      <span className={styles.label}>이미지</span>
      {imagePreviewUrl ? (
        <div className={styles.imagePreview}>
          <img src={imagePreviewUrl} alt="" />
          <button
            type="button"
            className={styles.removeImageButton}
            aria-label="이미지 삭제"
            onClick={onRemoveImage}
          >
            ×
          </button>
        </div>
      ) : (
        <label className={styles.imageUpload}>
          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleImageChange}
          />
          <ImageIcon size={24} color="var(--color-gray-600)" />
          <span>+ image upload</span>
        </label>
      )}
    </div>
  );
}
