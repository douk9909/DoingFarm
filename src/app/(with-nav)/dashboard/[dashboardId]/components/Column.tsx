'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import styles from './Column.module.css';
import Card from '@/components/common/Card/Card';
import CarrotDone from '@/assets/character/carrot1.svg';
import SeedOnProgress from '@/assets/character/seed_onprogress.svg';
import SeedTodo from '@/assets/character/seed_todo.svg';
import PumpkinIcon from '@/assets/character/pumkin.svg';
import PlusIcon from '@/assets/icons/PlusIconCard';
import SettingIcon from '@/assets/icons/SettingIcon';
import type { Card as CardType } from '@/types/card';
import { cardApi } from '@/lib/api/card';
import EditColumnModal from './modal/EditColumnModal';
import { useInfiniteScroll } from '@/hooks/queries/useInfiniteScroll';
import SkeletonCard from './Skeleton/SkeletonCard';

export interface ColumnData {
  id: number;
  title: string;
}

interface ColumnProps extends ColumnData {
  onAddCard?: () => void;
  index: number;
  existingTitles: string[];
  onCardClick?: (cardId: number) => void;
}

const COLUMN_ICONS = [SeedTodo, SeedOnProgress, CarrotDone];

const getColumnIcon = (index: number) => {
  return COLUMN_ICONS[index] ?? PumpkinIcon;
};

export default function Column({
  id,
  title,
  index,
  onAddCard,
  existingTitles,
  onCardClick,
}: ColumnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCards = useCallback(
    (cursorId?: number) =>
      cardApi.getList({ columnId: id, cursorId, size: 5 }).then((res) => ({
        data: res.data.cards,
        totalCount: res.data.totalCount,
        nextCursorId: res.data.cursorId,
      })),
    [id],
  );

  const { items, totalCount, error, isLoading, lastItemRef, scrollContainerRef } =
    useInfiniteScroll<CardType>({
      fetcher: fetchCards,
    });

  if (error) return <div>에러: {error}</div>;

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Image src={getColumnIcon(index)} alt="" width={17} height={24} aria-hidden />
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.count}>{totalCount}</span>
        </div>
        <button onClick={() => setIsModalOpen(true)} type="button" aria-label="컬럼 설정">
          <SettingIcon size={20} />
        </button>
      </div>

      {/* 카드 추가 버튼 카드 리스트 위로 이동 */}
      <button
        type="button"
        aria-label="카드 추가"
        className={styles.addCardButton}
        onClick={onAddCard}
      >
        <div className={styles.iconWrapper}>
          <PlusIcon size={16} color="var(--color-gray-900)" />
        </div>
      </button>

      <div ref={scrollContainerRef} className={`${styles.cardList} custom-scrollbar`}>
        {isLoading && items.length === 0 ? (
          <SkeletonCard />
        ) : (
          items.map((card: CardType, cardIndex) => (
            // wrapper div로 마지막 카드 감지
            <div
              key={card.id}
              ref={cardIndex === items.length - 1 ? lastItemRef : null}
              className={styles.cardWrapper}
            >
              <button
                type="button"
                className={styles.cardButton}
                onClick={() => onCardClick?.(card.id)}
              >
                <Card
                  id={card.id}
                  title={card.title}
                  tags={card.tags}
                  dueDate={card.dueDate}
                  assignee={card.assignee}
                  src={card.imageUrl}
                />
              </button>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <EditColumnModal
          columnId={id}
          currentTitle={title}
          onClose={() => setIsModalOpen(false)}
          existingTitles={existingTitles}
        />
      )}
    </div>
  );
}
