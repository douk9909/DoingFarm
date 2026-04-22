'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/utils/cn';

import Avatar from '@/components/common/avatar/Avatar';

import styles from './Comment.module.css';

export default function Comment() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);

    // 높이 조절 로직
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Todo: toast로 안내 */
    if (content.trim() === '') return alert('댓글 내용을 입력해주세요.');

    /* Todo: 댓글 등록 로직 추가 */
    console.log('댓글 등록:', content);
    /* Todo: toast로 안내 */
    alert('댓글이 등록되었습니다.');
    setContent('');
    setIsExpanded(false);
  };

  const handleCancel = () => {
    if (content.trim() !== '') {
      /* Todo: 삭제 모달 띄우기 */
      alert('작성 중인 내용을 삭제하시겠습니까?');
    }
    setContent('');
    setIsExpanded(false);
  };

  return (
    <div className={styles.container}>
      {!isExpanded ? (
        <div className={styles.placeholderContainer}>
          <Avatar />
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
            placeholder="댓글을 남겨보세요"
            value={content}
            onChange={handleTextareaChange}
            ref={textareaRef}
            onBlur={() => {
              content.trim() === '' && setIsExpanded(false);
            }}
            autoFocus
            rows={1}
          />
          {/* Todo: 버튼 컴포넌트 등록하기 */}
          <div className={styles.buttonWrapper}>
            <button type="button" onClick={handleCancel}>
              취소
            </button>
            <button type="submit" disabled={content.trim() === ''}>
              등록
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
