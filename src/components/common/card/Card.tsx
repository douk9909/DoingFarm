import Avatar from '@/components/common/avatar/Avatar';
import { formatDate } from '@/lib/utils/formatDate';

import styles from './Card.module.css';

interface CardProps {
  src?: string | null;
  title: string;
  tags?: string[];
  date: string;
  authorName: string;
}

export default function Card({ src, title, tags, date, authorName }: CardProps) {
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
          {tags?.map((tag) => (
            <span key={tag} className={styles.cardTag}>
              {tag}
            </span>
          ))}
        </div>

        <p className={styles.cardDate}>{formatDate(date)}</p>
        <div className={styles.cardAuthor}>
          {/* Todo: Avater 컴포넌트 머지 시 name={authorName} 및 size={20} */}
          <Avatar />
          <span className={styles.cardAuthorName}>{authorName}</span>
        </div>
      </div>
    </div>
  );
}
