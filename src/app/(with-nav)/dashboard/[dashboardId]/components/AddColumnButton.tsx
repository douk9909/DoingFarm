import PlusCircleIcon from '@/assets/icons/PlusCircleIcon';
import styles from './AddColumnButton.module.css';

interface AddColumnButtonProps {
  onClick: () => void;
}

export default function AddColumnButton({ onClick }: AddColumnButtonProps) {
  return (
    <button onClick={onClick} aria-label="컬럼 추가" className={styles.addButton}>
      <PlusCircleIcon className={styles.addIcon} width={24} color="var(--color-gray-900)" />
      <span className={styles.buttonText}>새로운 컬럼 추가</span>
    </button>
  );
}
