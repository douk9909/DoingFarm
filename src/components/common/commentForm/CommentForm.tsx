'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { showToast } from '@/lib/utils/toast';

import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';
import ConfirmModal from '@/components/common/ConfirmModal/ConfirmModal';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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

  // 댓글 등록
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Todo: 댓글 등록 로직 추가 */
    await onSubmit(content);

    showToast.success('댓글이 등록되었습니다');

    if (mode === 'create') {
      setContent('');
      setIsExpanded(false);
    }
  };

  // 댓글 수정 중에 취소 버튼을 눌렀을 때
  const handleCancelClick = () => {
    if (initialContent !== content && content.trim() !== '') {
      setIsModalOpen(true);
      return;
    }
    handleCancel();
  };

  const handleCancel = () => {
    if (mode === 'edit') {
      setContent(initialContent);
    } else {
      setContent('');
      setIsExpanded(false);
    }
    setIsModalOpen(false);
    onCancel?.();
  };

  const cancelMsg =
    mode === 'create'
      ? '작성 중인 댓글이 있어요. 삭제하시겠습니까?'
      : '변경 사항을 취소하시겠습니까?';

  return (
    <>
      {isModalOpen && (
        <ConfirmModal
          isOpen
          title="댓글 취소"
          message={cancelMsg}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleCancel}
        />
      )}

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
                'custom-scrollbar',
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
                onClick={handleCancelClick}
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
    </>
  );
}
