'use client';

import { useEffect, useId } from 'react';
import CloseIcon from '@/assets/icons/CloseIcon';
<<<<<<< HEAD
import { cn } from '@/lib/utils/cn';
=======
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
import styles from './Modal.module.css';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
<<<<<<< HEAD
  contentClassName?: string;
}

export default function Modal({
  title,
  children,
  onClose,
  closeLabel = '모달 닫기',
  contentClassName,
}: ModalProps) {
=======
}

export default function Modal({ title, children, onClose, closeLabel = '모달 닫기' }: ModalProps) {
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
  const titleId = useId();

  useEffect(() => {
    if (!onClose) {
      return;
    }

<<<<<<< HEAD
    // ESC로 모달을 닫을 수 있게 처리
=======
    // ESC 키로 모달을 빠르게 닫을 수 있게 처리
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
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
<<<<<<< HEAD
        className={cn(styles.content, contentClassName)}
=======
        className={styles.content}
>>>>>>> 85c8c509e7b0f8cf68103994b57f302499ad8d06
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
