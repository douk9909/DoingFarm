import type { ReactNode } from 'react';
import styles from './Modal.module.css';
import Button from '@/components/common/button/Button';
import { cn } from '@/lib/utils/cn';

interface ModalProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export default function Modal({
  open,
  title,
  children,
  footer,
  onClose,
  className,
}: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className={styles.overlay} role="presentation" onClick={onClose}>
      <div
        className={cn(styles.content, className)}
        role="dialog"
        aria-modal="true"
        // 모달 안쪽 클릭은 닫힘으로 이어지지 않게 막아둠
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          {title ? <h2 className={styles.title}>{title}</h2> : <span />}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={styles.closeButton}
            aria-label="닫기"
            onClick={onClose}
          >
            ×
          </Button>
        </header>

        <div className={styles.body}>{children}</div>

        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </div>
    </div>
  );
}
