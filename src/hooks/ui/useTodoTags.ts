'use client';

import { useState } from 'react';
import { getRandomTodoTagColor } from '@/lib/constants/todo';
import type { TodoFormCard } from '@/types/todo';

export function useTodoTags(initialTags: TodoFormCard['tags'] = []) {
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<TodoFormCard['tags']>(initialTags);

  const addTag = (label: string) => {
    const nextLabel = label.trim();

    if (nextLabel.length === 0) {
      return;
    }

    setTags((prevTags) => {
      // 같은 이름의 태그는 한 번만 추가
      if (prevTags.some((tag) => tag.label === nextLabel)) {
        return prevTags;
      }

      return [...prevTags, { label: nextLabel, color: getRandomTodoTagColor() }];
    });

    setTagInput('');
  };

  const removeTag = (label: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.label !== label));
  };

  return {
    tagInput,
    tags,
    setTagInput,
    addTag,
    removeTag,
  };
}