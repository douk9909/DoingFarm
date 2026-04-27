import PlusCircleIcon from '@/assets/icons/PlusCircleIcon';
import styles from './AddColumnButton.module.css';

export default function AddColumnButton() {
  return (
    <button aria-label="컬럼 추가" className={styles.addButton}>
      <PlusCircleIcon className={styles.addIcon} width={24} color="var(--color-gray-900)" />
      <span className={styles.buttonText}>새로운 컬럼 추가</span>
    </button>
  );
}
