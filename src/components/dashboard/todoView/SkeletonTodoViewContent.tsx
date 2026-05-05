import styles from './SkeletonTodoViewContent.module.css';
import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonTodoViewContent() {
  const skeleton = base.skeletonBase;
  return (
    <div className={styles.wrapper}>
      {/* 왼쪽 메인 영역 */}
      <div className={styles.mainSection}>
        <div className={`${skeleton} ${styles.title}`} />
        <div className={`${skeleton} ${styles.tag}`} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`${skeleton} ${styles.descLine}`} />
          ))}
        </div>
        <div className={`${skeleton} ${styles.imageBox}`} />
        {/* 댓글 영역 */}
        <div className={styles.commentWrapper}>
          <div className={`${skeleton} ${base.avatar}`} />
          <div className={`${skeleton} ${styles.comment}`} />
        </div>
      </div>

      {/* 오른쪽 사이드바 영역 */}
      <div className={styles.sideSection}>
        <div className={styles.buttonWrapper}>
          <div className={`${skeleton} ${styles.btn}`} />
          <div className={`${skeleton} ${styles.btn}`} />
        </div>
        {/* 프로젝트 영역 */}
        <div>
          <div className={`${skeleton} ${styles.label}`} />
          <div className={`${skeleton} ${styles.value}`} />
        </div>

        {/* 담당자 영역 */}
        <div>
          <div className={`${skeleton} ${styles.label}`} />
          <div className={styles.row}>
            <div className={`${skeleton} ${base.avatar}`} />
            <div className={`${skeleton} ${styles.value}`} />
          </div>
        </div>

        {/* 마감일 영역 */}
        <div>
          <div className={`${skeleton} ${styles.label}`} />
          <div className={`${skeleton} ${styles.value}`} style={{ width: '160px' }} />
        </div>
      </div>
    </div>
  );
}
