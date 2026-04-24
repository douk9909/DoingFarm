import Button from '@/components/common/button/Button';
import Avatar from '@/components/common/avatar/Avatar';

import styles from '../edit.module.css';

export default function InvitationsList() {
  return (
    <div className={styles.section}>
      <div>
        <h2 className={styles.title}>초대 내역</h2>
        <Button>초대하기</Button>
      </div>
      <div>
        <p>이메일</p>
        <ul>
          <li>
            <Avatar name="이름" />
            <span>이메일</span>
            <Button>취소</Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
