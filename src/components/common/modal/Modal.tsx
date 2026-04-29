'use client';

import { useEffect, useId } from 'react';
import CloseIcon from '@/assets/icons/CloseIcon';
import styles from './Modal.module.css';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
}

export default function Modal({ title, children, onClose, closeLabel = '모달 닫기' }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!onClose) {
      return;
    }

    // ESC 키로 모달을 빠르게 닫을 수 있게 처리
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={styles.content}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title ? (
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          ) : null}
          {onClose ? (
            <button
              type="button"
              className={styles.closeButton}
              aria-label={closeLabel}
              onClick={onClose}
            >
              <CloseIcon size={24} />
            </button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
