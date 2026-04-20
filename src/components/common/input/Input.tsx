import styles from './Input.module.css';
import { cn } from '@/lib/utils/cn';

function Input() {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}></div>
      <input className={styles.inputStyle} />
      <div className={styles.iconWrapper}></div>
    </div>
  );
}
