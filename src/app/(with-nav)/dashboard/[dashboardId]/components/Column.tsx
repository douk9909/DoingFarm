import styles from './Column.module.css';
import Card from '@/components/common/card/Card';
import CarrotDone from '@/assets/character/carrot1.svg';
import SeedOnProgress from '@/assets/character/seed_onprogress.svg';
import SeedTodo from '@/assets/character/seed_todo.svg';
import PumpkinIcon from '@/assets/character/pumkin.svg';
import SettingIcon from '@/assets/icon/ic_setting.svg';
import PlusIcon from '@/assets/icon/ic_plus_white.svg';
import Image from 'next/image';

interface CardData {
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

interface ColumnProps {
  id: number;
  title: string;
  cards: CardData[];
  totalCount: number;
}

const getColumnIcon = (title: string) => {
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

export default function Column({ title, cards, totalCount }: ColumnProps) {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Image src={getColumnIcon(title)} alt="콜럼 아이콘" width={17} height={24} />
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.count}>{totalCount}</span>
        </div>
        <button>
          <Image src={SettingIcon} alt="설정" width={20} height={20} />
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
      <button className={styles.addCardButton}>
        <div className={styles.iconWrapper}>
          <Image src={PlusIcon} alt="콜럼 추가" width={16} height={16} />
        </div>
      </button>
    </div>
  );
}
