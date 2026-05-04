import styles from './SkeletonListSection.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonListSection() {
  const skeleton = base.skeletonBase;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={`${skeleton} ${styles.title}`} />
          <div className={`${skeleton} ${styles.badge}`} />
        </div>
        <div className={styles.paginationGroup}>
          <div className={`${skeleton} ${styles.pagination}`} />
          <div className={`${skeleton} ${styles.paginationButton}`} />
          <div className={`${skeleton} ${styles.paginationButton}`} />
        </div>
      </div>

      <div className={styles.list}>
        <div className={`${skeleton} ${styles.subTitle}`} />
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.userInfo}>
              <div className={`${skeleton} ${base.circle} ${styles.avatar}`} />
              <div className={`${skeleton} ${styles.text}`} />
            </div>
            <div className={`${skeleton} ${styles.itemButton}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
