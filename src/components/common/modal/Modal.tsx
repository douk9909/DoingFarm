import styles from './Modal.module.css';
import CloseIcon from '@/assets/icons/CloseIcon';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
}

export default function Modal({ title, children, onClose, closeLabel = '모달 닫기' }: ModalProps) {
  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={styles.content}
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title ? <h2 className={styles.title}>{title}</h2> : null}
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
