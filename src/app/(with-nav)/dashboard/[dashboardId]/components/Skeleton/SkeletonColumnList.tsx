import styles from './SkeletonDashboard.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonColumnList() {
  const skeleton = base.skeletonBase;
  return (
    <div className={styles.columnContainer}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`${skeleton} ${styles.columnWrapper}`}>
          <div className={styles.columnText}>
            <div className={`${skeleton} ${styles.icon}`} />
            <div className={`${skeleton} ${styles.columnTitle}`} />
            <div className={`${skeleton} ${styles.count}`} />
          </div>
          <div className={`${skeleton} ${styles.icon}`} />
        </div>
      ))}
    </div>
  );
}
