'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';

import styles from './Comment.module.css';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Todo: toast로 안내 */
    if (content.trim() === '') return alert('댓글 내용을 입력해주세요.');

    /* Todo: 댓글 등록 로직 추가 */
    onSubmit(content);

    /* Todo: toast로 안내 */
    alert('댓글이 등록되었습니다.');

    if (mode === 'create') {
      setContent('');
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    if (content.trim() !== '') {
      /* Todo: 삭제 모달 띄우기 */
      alert(
        mode === 'create'
          ? '작성 중인 댓글이 있어요. 삭제하시겠습니까?'
          : '변경 사항을 취소하시겠습니까?',
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
        <div className={styles.placeholderContainer}>
          <Avatar src={currentUser.src} alt={currentUser.nickname} name={currentUser.nickname} />
          <div className={styles.placeholder} onClick={() => setIsExpanded(true)}>
            댓글을 남겨보세요
          </div>
        </div>
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
          {/* Todo: 버튼 컴포넌트 등록하기 */}
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
