'use client';

import { useState } from 'react';
import { getRandomTodoTagColor } from '@/lib/constants/todo';
import type { TodoFormCard } from '@/types/todo';

export function useTodoTags(initialTags: TodoFormCard['tags'] = []) {
  // 현재 입력 중인 태그 텍스트
  const [tagInput, setTagInput] = useState('');

  // 태그 목록 상태 (초기값 지원)
  const [tags, setTags] = useState<TodoFormCard['tags']>(initialTags);

  const addTag = (label: string) => {
    const nextLabel = label.trim();

    // 공백 입력 방지
    if (nextLabel.length === 0) {
      return;
    }

    setTags((prevTags) => {
      // 같은 이름의 태그는 한 번만 추가
      if (prevTags.some((tag) => tag.label === nextLabel)) {
        return prevTags;
      }

      return [
        ...prevTags,
        {
          label: nextLabel,
          color: getRandomTodoTagColor(),
        },
      ];
    });

    // 입력창 초기화
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