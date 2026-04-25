import Button from '@/components/common/button/Button';
import Avatar from '@/components/common/avatar/Avatar';

import styles from '../edit.module.css';

export default function InvitationsList() {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>초대 내역</h2>
        <Button className={styles.buttonStyle}>초대하기</Button>
      </div>
      <div className={styles.sectionContent}>
        <p className={styles.subTitle}>이메일</p>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.profileWrapper}>
              <Avatar name="example@test.com" />
              <span className={styles.profileName}>example@test.com</span>
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
