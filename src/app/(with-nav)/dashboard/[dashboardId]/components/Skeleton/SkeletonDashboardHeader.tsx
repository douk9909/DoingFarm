import styles from './SkeletonDashboard.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonDashboardHeader() {
  const skeleton = base.skeletonBase;
  return (
    <div className={styles.headerWrapper}>
      <div className={`${skeleton} ${styles.title}`} />
    </div>
  );
}
