import AddIcon from '@/assets/icon/ic_plus.svg';
import Image from 'next/image';
import styles from './AddColumnButton.module.css';

export default function AddColumnButton() {
  return (
    <button className={styles.addButton}>
      <Image src={AddIcon} alt="칼럼 추가" width={24} height={24} />
      <span className={styles.buttonText}>새로운 컬럼 추가</span>
    </button>
  );
}
