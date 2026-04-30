'use client';

import { Input } from '@/components/common/input';
import type { TodoFormCard } from '@/types/todo';
import styles from './TodoTagField.module.css';

interface TodoTagFieldProps {
  value: string;
  tags: TodoFormCard['tags'];
  onChange: (value: string) => void;
  onAddTag: (value: string) => void;
}

export default function TodoTagField({ value, tags, onChange, onAddTag }: TodoTagFieldProps) {
  const trimmedValue = value.trim();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onAddTag(value);
    }
  };

  return (
    <div className={styles.field}>
      <Input.Text
        label="태그"
        value={value}
        placeholder="태그를 입력해주세요"
        className={styles.tagInput}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      {(trimmedValue || tags.length > 0) && (
        <div className={styles.tagPanel}>
          {trimmedValue ? <span className={styles.tagHint}>옵션 선택 또는 생성</span> : null}
          <div className={styles.tagList}>
            {trimmedValue ? (
              <button
                type="button"
                className={styles.tagChip}
                style={{ backgroundColor: 'var(--color-black-200)' }}
                onClick={() => onAddTag(value)}
              >
                생성&nbsp;&nbsp; {trimmedValue}
              </button>
            ) : null}
            {tags.map((tag) => (
              <span key={tag.label} className={styles.tagChip} style={{ backgroundColor: tag.color }}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
