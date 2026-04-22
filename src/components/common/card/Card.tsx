import Avatar from '@/components/common/avatar/Avatar';
import { formatDate } from '@/lib/utils/formatDate';
import { getHashColor } from '@/lib/utils/color';

import styles from './Card.module.css';

interface CardProps {
  id: number;
  title: string;
  tags?: string[];
  dueDate: string;
  assignee: {
    nickname: string;
    profileImage: string | null;
  };
  src?: string | null;
}

export default function Card({ src, title, tags, dueDate, assignee }: CardProps) {
  return (
    <div className={styles.cardContainer}>
      {src && (
        <div className={styles.imageWrapper}>
          <img src={src} alt={title} className={styles.cardImage} />
        </div>
      )}

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>

        <div className={styles.cardTags}>
          {tags?.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className={styles.cardTag}
              style={{ '--bg-color': getHashColor(tag) } as React.CSSProperties}
            >
              {tag}
            </span>
          ))}
        </div>

        <p className={styles.cardDate}>{formatDate(dueDate)}</p>
        <div className={styles.cardAuthor}>
          {/* Todo: Avatar 컴포넌트 머지 시 src={assignee.profileImage} name={assignee.nickname} 및 className={styles.cardAuthorAvatar} */}
          <Avatar />
          <span className={styles.cardAuthorName}>{assignee.nickname}</span>
        </div>
      </div>
    </div>
  );
}
