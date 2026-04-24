import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';

import styles from '../edit.module.css';

export default function MembersList() {
  return (
    <div className={styles.section}>
      <div>
        <h2 className={styles.title}>구성원</h2>
        <div>
          <span>n 페이지 중 n</span>
          <div>
            <button></button>
            <button></button>
          </div>
        </div>
      </div>
      <div>
        <p>이름</p>
        <ul>
          <li>
            <Avatar name="이름" />
            <span>이름</span>
            <Button>삭제</Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
