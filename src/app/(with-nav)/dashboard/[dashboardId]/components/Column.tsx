'use client';

import styles from './Column.module.css';
import Card from '@/components/common/card/Card';
import CarrotDone from '@/assets/character/carrot1.svg';
import SeedOnProgress from '@/assets/character/seed_onprogress.svg';
import SeedTodo from '@/assets/character/seed_todo.svg';
import PumpkinIcon from '@/assets/character/pumkin.svg';
import PlusIcon from '@/assets/icons/PlusIconCard';
import SettingIcon from '@/assets/icons/SettingIcon';
import Image from 'next/image';
import type { Card as CardType } from '@/types/card';
import { cardApi } from '@/lib/api/card';
import { useInfiniteScroll } from '@/app/(with-nav)/dashboard/[dashboardId]/components/useInfiniteScroll';

interface ColumnProps {
  id: number;
  title: string;
}

const getColumnIcon = (title: string) => {
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

export default function Column({ id, title }: ColumnProps) {
  const { items, totalCount, isLoading, error, loaderRef, scrollContainerRef } =
    useInfiniteScroll<CardType>({
      fetcher: (cursorId) =>
        cardApi.getList({ columnId: id, cursorId, size: 5 }).then((res) => ({
          data: res.data.cards,
          totalCount: res.data.totalCount,
          nextCursorId: res.data.cursorId,
        })),
    });
  if (error) return <div>에러: {error}</div>;

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Image src={getColumnIcon(title)} alt="콜럼 아이콘" width={17} height={24} />
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.count}>{totalCount}</span>
        </div>
        <button aria-label="컬럼 수정">
          <SettingIcon size={20} />
        </button>
      </div>

      <div ref={scrollContainerRef} className={`${styles.cardList} custom-scrollbar`}>
        {items.map((card: CardType) => (
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
        <div ref={loaderRef} style={{ height: '10px', flexShrink: 0 }} />
      </div>
      <button aria-label="카드 추가" className={styles.addCardButton}>
        <div className={styles.iconWrapper}>
          <PlusIcon size={16} color={'var(--color-gray-900)'} />
        </div>
      </button>
    </div>
  );
}
