'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { showToast } from '@/lib/utils/toast';

import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';

import styles from './CommentForm.module.css';

interface CommentFormProps {
  mode?: 'create' | 'edit';
  initialContent?: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  // 사용자 정보
  currentUser: {
    nickname: string;
    src: string | null;
  };
}

export default function CommentForm({
  mode = 'create',
  initialContent = '',
  onSubmit,
  onCancel,
  placeholder = '댓글을 남겨보세요',
  currentUser,
}: CommentFormProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(mode === 'edit');
  const [content, setContent] = useState<string>(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (isExpanded) adjustHeight();
  }, [isExpanded]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    adjustHeight();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.trim() === '') {
      showToast.error('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      await onSubmit(content);
      showToast.success(mode === 'create' ? '댓글이 등록되었습니다.' : '댓글이 수정되었습니다.');

      if (mode === 'create') {
        setContent('');
        setIsExpanded(false);
      }
    } catch (error) {}
  };

  const handleCancel = () => {
    if (content.trim() !== '') {
      showToast.success(
        mode === 'create' ? '작성 중인 댓글이 삭제되었습니다.' : '변경 사항이 취소되었습니다.',
      );
    }

    if (mode === 'edit') {
      setContent(initialContent);
    } else {
      setContent('');
      setIsExpanded(false);
    }

    onCancel?.();
  };

  return (
    <div className={styles.container}>
      {!isExpanded && mode === 'create' ? (
        <button
          type="button"
          className={styles.placeholderContainer}
          onClick={() => setIsExpanded(true)}
        >
          <Avatar src={currentUser.src} alt={currentUser.nickname} name={currentUser.nickname} />
          <div className={styles.placeholder}>댓글을 남겨보세요</div>
        </button>
      ) : (
        <form className={styles.commentInputContainer} onSubmit={handleSubmit}>
          <textarea
            className={cn(
              styles.textareaStyle,
              isExpanded && content.trim() !== '' && styles.filledBlur,
            )}
            placeholder={placeholder}
            value={content}
            onChange={handleTextareaChange}
            ref={textareaRef}
            onBlur={() => {
              content.trim() === '' && mode === 'create' && setIsExpanded(false);
            }}
            autoFocus
            rows={1}
          />
          <div className={styles.buttonWrapper}>
            <Button
              type="button"
              onClick={handleCancel}
              variant="secondary"
              size="sm"
              className={styles.buttonStyle}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={content.trim() === ''}
              variant="primary"
              size="sm"
              className={styles.buttonStyle}
            >
              {mode === 'create' ? '등록' : '수정'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
