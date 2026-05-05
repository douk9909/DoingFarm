import styles from './SkeletonCard.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonCard() {
  const skeleton = base.skeletonBase;
  return (
    <div className={styles.columnWrapper}>
      {[...Array(2)].map((_, i) => (
        <div key={i} className={`${skeleton} ${styles.cardWrapper}`}>
          <div className={`${skeleton} ${styles.image}`} />
          <div className={`${skeleton} ${styles.title}`} />
          <div className={styles.tags}>
            {[...Array(2)].map((_, i) => (
              <div key={i} className={`${skeleton} ${styles.tag}`} />
            ))}
          </div>
          <div className={`${skeleton} ${styles.date}`} />
          <div className={styles.userWrapper}>
            <div className={`${skeleton} ${base.circle} ${styles.avatar}`} />
            <div className={`${skeleton} ${styles.userName}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
