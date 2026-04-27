'use client';

import { useState } from 'react';

import Input from '@/components/common/input';
import Button from '@/components/common/button/Button';
import { cn } from '@/lib/utils/cn';

import styles from '../edit.module.css';
import ColorPicker from '@/components/common/colorPicker/colorPicker';

interface EditFormProps {
  initialTitle: string;
  initialColor: string;
}

export default function EditForm({ initialTitle, initialColor }: EditFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Todo: API 연결, 성공 시 토스트 띄우기
    console.log('수정할 데이터:', { title, color });
    alert('변경되었습니다');
  };

  return (
    <form className={cn(styles.section, styles.editTitleForm)} onSubmit={handleSubmit}>
      <h2 className={styles.title}>{initialTitle}</h2>
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
        disabled={title === initialTitle && color === initialColor}
        fullWidth
        className={styles.editButton}
      >
        변경
      </Button>
    </form>
  );
}
