'use client';

import { useState } from 'react';

import { Input } from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import { cn } from '@/lib/utils/cn';

import styles from '../edit.module.css';
import ColorPicker from './ColorPicker';

interface EditFormProps {
  initialTitle: string;
  initialColor: string;
}

export default function EditForm({ initialTitle, initialColor }: EditFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);

  return (
    <form className={cn(styles.section, styles.editTitleForm)}>
      <h2 className={styles.title}>{initialTitle}</h2>
      <Input type="text" label="대시보드 이름" value={initialTitle} className={styles.inputTitle} />
      <ColorPicker />
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
