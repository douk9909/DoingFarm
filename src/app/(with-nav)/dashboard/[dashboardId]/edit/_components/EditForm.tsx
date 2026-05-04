'use client';

import axios from 'axios';
import { useRef, useState } from 'react';

import { dashboardApi } from '@/lib/api/dashboard';
import { showToast } from '@/lib/utils/toast';
import type { ApiError } from '@/lib/api/client';
import { DASHBOARD_COLOR_HEX_MAP, DashboardColor } from '@/lib/constants/color';
import { useDashboardCreateModal } from '@/components/dashboard/create/DashboardCreateModalProvider';

import ColorPicker from '@/components/common/colorPicker/colorPicker';
import Input from '@/components/common/input';
import Button from '@/components/common/button/Button';

import styles from '../edit.module.css';
import BaseSectionLayout from './BaseSectionLayout';
import SkeletonSettingSection from './Skeleton/SkeletonSettingSection';

interface EditFormProps {
  dashboardId: number;
  initialTitle: string;
  initialColor: string;
  currentDisplayTitle: string;
  onTitleUpdate: (newName: string) => void;
  onColorUpdate: (newColor: string) => void;
}

// HEX 코드로부터 CSS 토큰을 찾음
const findVarByHex = (hex: string) => {
  return Object.keys(DASHBOARD_COLOR_HEX_MAP).find(
    (key) => DASHBOARD_COLOR_HEX_MAP[key as DashboardColor] === hex.toLowerCase(),
  );
};

export default function EditForm({
  dashboardId,
  initialTitle,
  initialColor,
  currentDisplayTitle,
  onTitleUpdate,
  onColorUpdate,
}: EditFormProps) {
  const transformedColor = findVarByHex(initialColor) || initialColor;

  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(transformedColor);
  const [isLoading, setIsLoading] = useState(false);

  const isFetching = useRef(false);
  const { notifyDashboardCreated } = useDashboardCreateModal();

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

      onTitleUpdate(title);
      onColorUpdate(color);
      notifyDashboardCreated();

      showToast.success('변경되었습니다');
    } catch (error) {
      const message =
        axios.isAxiosError<ApiError>(error) && error.response?.data?.message
          ? error.response.data.message
          : '대시보드 수정 중 오류 발생';
      showToast.error(message);
    } finally {
      setIsLoading(false);
      isFetching.current = false;
    }
  };

  if (isLoading) {
    return <SkeletonSettingSection />;
  }

  return (
    <BaseSectionLayout title={currentDisplayTitle}>
      <div className={styles.sectionContent}>
        <form className={styles.editTitleForm} onSubmit={handleSubmit}>
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
      </div>
    </BaseSectionLayout>
  );
}
