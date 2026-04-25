import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';

import styles from '../edit.module.css';

export default function MembersList() {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>구성원</h2>
        <div className={styles.pageWrapper}>
          <span className={styles.pageInfo}>n 페이지 중 n</span>
          <div className={styles.pageButton}>
            <button></button>
            <button></button>
          </div>
        </div>
      </div>
      <div className={styles.sectionContent}>
        <p className={styles.subTitle}>이름</p>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.profileWrapper}>
              <Avatar name="이름" />
              <span className={styles.profileName}>이름</span>
            </div>
            <Button variant="secondary" className={styles.buttonStyle}>
              삭제
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
