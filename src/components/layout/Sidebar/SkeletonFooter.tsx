import styles from './SkeletonFooter.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonFooter() {
  const skeleton = base.skeletonBase;

  return (
    <div className={styles.container}>
      <div className={styles.userWrapper}>
        <div className={`${skeleton} ${base.avatar}`} />
        <div className={`${skeleton} ${styles.userName}`} />
      </div>
      <div className={`${skeleton} ${styles.icon}`} />
    </div>
  );
}
