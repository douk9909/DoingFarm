import styles from './SkeletonMyDashboardList.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonPagination() {
  const skeleton = base.skeletonBase;

  return (
    <div className={styles.container}>
      <div className={styles.paginationGroup}>
        <div className={`${skeleton} ${styles.pagination}`} />
        <div className={`${skeleton} ${base.smBtn}`} />
        <div className={`${skeleton} ${base.smBtn}`} />
      </div>
    </div>
  );
}
