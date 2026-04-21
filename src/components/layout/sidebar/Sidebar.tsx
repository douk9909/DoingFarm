import Image from 'next/image';
import Link from 'next/link';
import logoImage from '@public/images/logo.svg';
import styles from './Sidebar.module.css';
import { PATH } from '@/lib/constants/path';
import { cn } from '@/lib/utils/cn';

interface SidebarProps {
  isCompact: boolean;
}

export default function Sidebar({ isCompact }: SidebarProps) {
  return (
    <aside
      className={cn(styles.sidebar, isCompact && styles.sidebarCompact)}
    >
      <Link href={PATH.HOME} className={styles.logo}>
        <Image
          src={logoImage}
          alt="Do!ngFarm"
          width={148}
          height={33}
          priority
        />
      </Link>

      <div className={styles.menuSection}>
        <div className={styles.menuHeader}>
          <Link href={PATH.MY_DASHBOARD} className={styles.addRow}>
            <span className={styles.addLabel}>대시보드 추가</span>
          </Link>
        </div>

        <Link href={PATH.MY_DASHBOARD} className={styles.addRowMobile}>
          <span className={styles.addIcon}>+</span>
        </Link>
      </div>

      <div className={styles.profile}>
        <span className={styles.avatar}>김</span>
        <span className={styles.profileName}>김도욱</span>
        <button type="button" className={styles.profileButton}>
          ⚙
        </button>
      </div>
    </aside>
  );
}
