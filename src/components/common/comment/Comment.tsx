import Avatar from '@/components/common/avatar/Avatar';
import styles from './Comment.module.css';

export default function Comment() {
  return (
    <div className={styles.container}>
      <div className={styles.placeholderContainer}>
        <Avatar />
        <div className={styles.placeholder}>댓글을 남겨보세요</div>
      </div>

      <div className={styles.commentInputContainer}>
        <textarea className={styles.textareaStyle} placeholder="댓글을 남겨보세요" autoFocus />
        <div className={styles.buttonWrapper}>
          <button>취소</button>
          <button>등록</button>
        </div>
      </div>
    </div>
  );
}
