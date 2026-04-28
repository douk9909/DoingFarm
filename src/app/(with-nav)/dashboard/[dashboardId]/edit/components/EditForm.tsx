'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '@/components/common/input';
import Button from '@/components/common/button/Button';
import { cn } from '@/lib/utils/cn';

import styles from '../edit.module.css';
import ColorPicker from '@/components/common/colorPicker/colorPicker';
import { dashboardApi } from '@/lib/api/dashboard';

interface EditFormProps {
  dashboardId: number;
  initialTitle: string;
  initialColor: string;
}

export default function EditForm({ dashboardId, initialTitle, initialColor }: EditFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);
  const [displayTitle, setDisplayTitle] = useState(initialTitle);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const isChanged = title !== initialTitle || color !== initialColor;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isChanged || isLoading) return;

    if (!title.trim()) {
      alert('대시보드 이름을 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);

      await dashboardApi.update(dashboardId, { title, color });
      router.refresh();

      setDisplayTitle(title);

      // Todo: 토스트 띄우기로 변경 완료 알림
      console.log('수정 데이터:', { dashboardId, title, color });
      alert('변경되었습니다');
    } catch (error) {
      // Todo: 토스트 띄우기로 오류알림
      console.error('대시보드 정보를 수정하는 중 오류 발생:', error);
      alert('변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={cn(styles.section, styles.editTitleForm)} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{displayTitle}</h2>
      <Input.Text
        type="text"
        label="대시보드 이름"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.inputTitle}
      />
      <ColorPicker selectedColor={color} onSelect={(newColor) => setColor(newColor)} />
      <Button
        type="submit"
        disabled={!isChanged || isLoading || !title.trim()}
        fullWidth
        className={styles.editButton}
      >
        {isLoading ? '변경 중...' : '변경'}
      </Button>
    </form>
  );
}
