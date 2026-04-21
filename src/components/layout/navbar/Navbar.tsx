import Image from 'next/image';
import Link from 'next/link';
import carrotImage from '@/assets/character/carrot1.svg';
import { PATH } from '@/lib/constants/path';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <Link href={PATH.HOME} className={styles.carrotLink}>
        <Image
          src={carrotImage}
          alt="홈으로 이동"
          width={56}
          height={64}
          className={styles.carrotImage}
          priority
        />
      </Link>

      <div className={styles.actions}>
        <button type="button" className={styles.manageButton}>
          <span className={styles.actionIcon} aria-hidden="true">
            ⚙
          </span>
          <span className={styles.manageLabel}>관리</span>
        </button>

        <button type="button" className={styles.shareButton}>
          공유
        </button>
      </div>
    </header>
  );
}