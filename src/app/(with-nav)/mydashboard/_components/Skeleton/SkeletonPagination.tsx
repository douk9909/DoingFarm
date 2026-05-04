import styles from './SkeletonMyDashboardList.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonPagination() {
  const skeleton = base.skeletonBase;

  return (
    <div className={styles.container}>
      <div className={styles.paginationGroup}>
        <div className={`${skeleton} ${styles.paginationText}`} />
        <div className={`${skeleton} ${styles.paginationBtn}`} />
        <div className={`${skeleton} ${styles.paginationBtn}`} />
      </div>
    </div>
  );
}
