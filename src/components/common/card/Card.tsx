import Image from 'next/image';
import Avatar from '@/components/common/avatar/Avatar';
import { formatDate } from '@/lib/utils/formatDate';
import { getHashColor } from '@/lib/utils/color';

import styles from './Card.module.css';

export interface CardTag {
  label: string;
  color: string;
}

interface CardProps {
  id: number;
  title: string;
  tags?: Array<string | CardTag>;
  dueDate: string;
  assignee: {
    nickname: string;
    profileImage: string | null;
  };
  src?: string | null;
}

export default function Card({ src, title, tags, dueDate, assignee }: CardProps) {
  // 생성 모달에서 받은 태그 색상이 있으면 그대로 사용
  const getTagLabel = (tag: string | CardTag) => (typeof tag === 'string' ? tag : tag.label);
  const getTagColor = (tag: string | CardTag) =>
    typeof tag === 'string' ? getHashColor(tag) : tag.color;

  return (
    <div className={styles.cardContainer}>
      {src && (
        <div className={styles.imageWrapper}>
          <Image width={300} height={200} src={src} alt={title} className={styles.cardImage} />
        </div>
      )}

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>

        <div className={styles.cardTags}>
          {tags?.map((tag, index) => (
            <span
              key={`${getTagLabel(tag)}-${index}`}
              className={styles.cardTag}
              style={{ '--bg-color': getTagColor(tag) } as React.CSSProperties}
            >
              {getTagLabel(tag)}
            </span>
          ))}
        </div>

        <p className={styles.cardDate}>{formatDate(dueDate)}</p>
        <div className={styles.cardAuthor}>
          <Avatar
            src={assignee.profileImage}
            alt={assignee.nickname}
            name={assignee.nickname}
            className={styles.cardAuthorAvatar}
          />
          <span className={styles.cardAuthorName}>{assignee.nickname}</span>
        </div>
      </div>
    </div>
  );
}
