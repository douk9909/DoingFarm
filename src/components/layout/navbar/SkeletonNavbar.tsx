import styles from './SkeletonNavbar.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonNavbar() {
  const skeleton = base.skeletonBase;

  return (
    <div className={styles.skeletonItem}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`${skeleton} ${base.circle} ${styles.skeletonProfile}`} />
      ))}
      <div className={styles.line} />
      <div className={styles.skeletonButtonWrapper}>
        <div className={`${skeleton} ${styles.button}`} />
        <div className={`${skeleton} ${styles.button}`} />
      </div>
    </div>
  );
}
