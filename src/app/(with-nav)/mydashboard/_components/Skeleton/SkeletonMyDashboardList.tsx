import styles from './SkeletonMyDashboardList.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonMyDashboardList() {
  const skeleton = base.skeletonBase;

  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div key={i} className={`${skeleton} ${styles.skeletonCard}`}>
          <div className={styles.contentTitleWrapper}>
            <div className={`${skeleton} ${base.circle} ${styles.dot}`} />
            <div className={`${skeleton} ${styles.title}`} />
          </div>
          <div className={`${skeleton} ${styles.icon}`} />
        </div>
      ))}
    </>
  );
}
