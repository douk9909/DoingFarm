'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils/cn';
import { dashboardApi } from '@/lib/api/dashboard';
import { DASHBOARD_COLOR_HEX_MAP, DashboardColor } from '@/lib/constants/color';

import ColorPicker from '@/components/common/colorPicker/colorPicker';
import Input from '@/components/common/input';
import Button from '@/components/common/button/Button';

import styles from '../edit.module.css';

interface EditFormProps {
  dashboardId: number;
  initialTitle: string;
  initialColor: string;
}

// HEX 코드로부터 CSS 토큰을 찾음
const findVarByHex = (hex: string) => {
  return Object.keys(DASHBOARD_COLOR_HEX_MAP).find(
    (key) => DASHBOARD_COLOR_HEX_MAP[key as DashboardColor] === hex.toLowerCase(),
  );
};

export default function EditForm({ dashboardId, initialTitle, initialColor }: EditFormProps) {
  const transformedColor = findVarByHex(initialColor) || initialColor;

  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(transformedColor);
  const [displayTitle, setDisplayTitle] = useState(initialTitle);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const isFetching = useRef(false);

  const isChanged = title !== initialTitle || color !== transformedColor;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isFetching.current || isLoading || !isChanged || !title.trim()) return;

    try {
      setIsLoading(true);
      isFetching.current = true;

      // 서버로 보낼 때 색상 이름을 HEX 코드로 변환
      const hexColor = DASHBOARD_COLOR_HEX_MAP[color as DashboardColor] || color;
      await dashboardApi.update(dashboardId, { title, color: hexColor });

      router.refresh();
      setDisplayTitle(title);

      // Todo: 토스트 띄우기로 변경 완료 알림
      alert('변경되었습니다');
    } catch (error) {
      // Todo: 토스트 띄우기로 오류알림
      console.error('대시보드 정보를 수정하는 중 오류 발생:', error);
      alert('변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
      isFetching.current = false;
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
