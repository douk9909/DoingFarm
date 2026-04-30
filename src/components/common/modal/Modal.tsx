'use client';

import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@/assets/icons/CloseIcon';
import { cn } from '@/lib/utils/cn';
import styles from './Modal.module.css';

type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  contentClassName?: string;
  size?: ModalSize; // ✅ 추가
}

export default function Modal({
  title,
  children,
  onClose,
  closeLabel = '모달 닫기',
  contentClassName,
  size = 'md', 
}: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!onClose) return;

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

  const modal = (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={cn(
          styles.content,
          styles[size],
          contentClassName
        )}
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

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(modal, document.body);
}