<<<<<<< HEAD
import Image, { type StaticImageData } from 'next/image';
=======
'use client';

>>>>>>> 95f60feadae4c03ff027d3ed3d9e5dad54b55c85
import styles from './Column.module.css';
import Card, { type CardTag } from '@/components/common/card/Card';
import CarrotDone from '@/assets/character/carrot1.svg';
import SeedOnProgress from '@/assets/character/seed_onprogress.svg';
import SeedTodo from '@/assets/character/seed_todo.svg';
import PumpkinIcon from '@/assets/character/pumkin.svg';
import PlusIcon from '@/assets/icons/PlusIconCard';
import SettingIcon from '@/assets/icons/SettingIcon';
<<<<<<< HEAD

export interface CardData {
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
=======
import Image from 'next/image';
import type { Card as CardType } from '@/types/card';
import { cardApi } from '@/lib/api/card';
import { useFetch } from '@/hooks/queries/useFetch';
>>>>>>> 95f60feadae4c03ff027d3ed3d9e5dad54b55c85

export interface ColumnData {
  id: number;
  title: string;
}

interface ColumnProps extends ColumnData {
  onAddCard?: () => void;
}

const getColumnIcon = (title: string): StaticImageData => {
  switch (title) {
    case 'To do':
      return SeedTodo;
    case 'On progress':
      return SeedOnProgress;
    case 'Done':
      return CarrotDone;
    default:
      return PumpkinIcon;
  }
};

<<<<<<< HEAD
export default function Column({ title, cards, totalCount, onAddCard }: ColumnProps) {
=======
export default function Column({ id, title }: ColumnProps) {
  const { data, isLoading, error } = useFetch(() =>
    cardApi.getList({ columnId: id }).then((res) => ({ data: res.data })),
  );

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

>>>>>>> 95f60feadae4c03ff027d3ed3d9e5dad54b55c85
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Image src={getColumnIcon(title)} alt="" width={17} height={24} aria-hidden />
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.count}>{data?.totalCount}</span>
        </div>
        <button type="button" aria-label="컬럼 설정">
          <SettingIcon size={20} />
        </button>
      </div>

      <div className={`${styles.cardList} custom-scrollbar`}>
        {data?.cards.map((card: CardType) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            tags={card.tags}
            dueDate={card.dueDate}
            assignee={card.assignee}
            src={card.imageUrl}
          />
        ))}
      </div>
      <button
        type="button"
        aria-label={`${title} 할 일 추가`}
        className={styles.addCardButton}
        onClick={onAddCard}
      >
        <div className={styles.iconWrapper}>
          <PlusIcon size={16} color="var(--color-gray-900)" />
        </div>
      </button>
    </div>
  );
}
