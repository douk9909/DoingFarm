import styles from './SkeletonSettingSection.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonSettingSection() {
  const skeleton = `${base.skeletonBase} ${base.rounded}`;

  return (
    <div className={styles.container}>
      <div className={`${skeleton} ${styles.title}`} />

      <div className={`${skeleton} ${styles.label}`} />
      <div className={`${skeleton} ${styles.input}`} />

      <div className={styles.colorPicker}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`${base.skeletonBase} ${base.circle} ${styles.colorDot}`} />
        ))}
      </div>

      <div className={`${base.skeletonBase} ${base.lgBtn}`} />
    </div>
  );
}
