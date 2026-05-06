import styles from './SkeletonInvitedDashboardList.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonInvitedDashboardList() {
  const skeleton = base.skeletonBase;

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <div>
          {/* 테이블 헤더 */}
          <div className={styles.tableHeader}>
            <div className={`${skeleton} ${styles.headerItem}`} />
            <div className={`${skeleton} ${styles.headerItem}`} />
            <div className={`${skeleton} ${styles.headerItem}`} />
          </div>

          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.tableRow}>
              <div className={`${skeleton} ${styles.rowName}`} />
              <div className={styles.rowInviter}>
                <div className={`${skeleton} ${base.avatar}`} />
                <div className={`${skeleton} ${styles.inviterName}`} />
              </div>
              <div className={styles.rowBtns}>
                <div className={`${skeleton} ${styles.btn}`} />
                <div className={`${skeleton} ${styles.btn}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
