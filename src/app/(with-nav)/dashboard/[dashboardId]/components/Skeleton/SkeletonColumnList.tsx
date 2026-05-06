import styles from './SkeletonDashboard.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonColumnList() {
  const skeleton = base.skeletonBase;
  return (
    <div className={styles.columnContainer}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`${styles.lightSkeleton} ${styles.columnWrapper}`} />
      ))}
    </div>
  );
}
