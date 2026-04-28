import Image, { type StaticImageData } from 'next/image';
import styles from './Column.module.css';
import Card, { type CardTag } from '@/components/common/card/Card';
import CarrotDone from '@/assets/character/carrot1.svg';
import SeedOnProgress from '@/assets/character/seed_onprogress.svg';
import SeedTodo from '@/assets/character/seed_todo.svg';
import PumpkinIcon from '@/assets/character/pumkin.svg';
import PlusIcon from '@/assets/icons/PlusIconCard';
import SettingIcon from '@/assets/icons/SettingIcon';

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

export interface ColumnData {
  id: number;
  title: string;
  cards: CardData[];
  totalCount: number;
}

interface ColumnProps extends ColumnData {
  onAddCard?: () => void;
}

const getColumnIcon = (title: string): StaticImageData => {
  switch (title) {
    case 'To-do':
      return SeedTodo;
    case 'On Progress':
      return SeedOnProgress;
    case 'Done':
      return CarrotDone;
    default:
      return PumpkinIcon;
  }
};

export default function Column({ title, cards, totalCount, onAddCard }: ColumnProps) {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Image src={getColumnIcon(title)} alt="" width={17} height={24} aria-hidden />
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.count}>{totalCount}</span>
        </div>
        <button type="button" aria-label="컬럼 설정">
          <SettingIcon size={20} />
        </button>
      </div>

      <div className={`${styles.cardList} custom-scrollbar`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            tags={card.tags}
            dueDate={card.dueDate}
            assignee={card.assignee}
            src={card.src}
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
