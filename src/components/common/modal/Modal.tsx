import styles from './Modal.module.css';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ title, children }: ModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {title ? <h2 className={styles.title}>{title}</h2> : null}
        {children}
      </div>
    </div>
  );
}
