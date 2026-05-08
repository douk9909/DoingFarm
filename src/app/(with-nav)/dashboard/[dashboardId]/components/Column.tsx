'use client';

import { useDroppable } from '@dnd-kit/core';

import { useCallback, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Column.module.css';
import CarrotDone from '@/assets/character/carrot1.svg';
import SeedOnProgress from '@/assets/character/seed_onprogress.svg';
import SeedTodo from '@/assets/character/seed_todo.svg';
import PumpkinIcon from '@/assets/character/pumkin.svg';
import PlusIcon from '@/assets/icons/PlusIconCard';
import SettingIcon from '@/assets/icons/SettingIcon';
import type { Card as CardType } from '@/types/card';
import { cardApi } from '@/lib/api/card';
import EditColumnModal from './modal/EditColumnModal';
import { usePaginatedFetch } from '@/hooks/queries/usePaginatedFetch';
import { useInfiniteScroll } from '@/hooks/queries/useInfiniteScroll';
import DraggableCard from './DraggableCard';
import SkeletonCard from './Skeleton/SkeletonCard';
import { type FilterState, isFilterActive, matchesFilter } from './CardFilter';

export interface ColumnData {
  id: number;
  title: string;
}

interface ColumnProps extends ColumnData {
  onAddCard?: () => void;
  index: number;
  existingTitles: string[];
  onCardClick?: (cardId: number) => void;
  filter?: FilterState;
  filteredTotalCount?: number;
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
  filter,
  filteredTotalCount = 0,
}: ColumnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: `column-${id}`,
    data: { columnId: id },
  });

  const fetchCards = useCallback(
    (cursorId?: number) =>
      cardApi.getList({ columnId: id, cursorId, size: 5 }).then((res) => ({
        data: res.data.cards,
        totalCount: res.data.totalCount,
        nextCursorId: res.data.cursorId,
      })),
    [id],
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { items, totalCount, error, isLoading, hasNextPage, fetchNext } =
    usePaginatedFetch<CardType>({
      fetcher: fetchCards,
    });

  const lastItemRef = useInfiniteScroll({
    onLoadMore: fetchNext,
    hasNextPage,
    isLoading,
    root: scrollContainerRef,
  });

  const filterActive = filter ? isFilterActive(filter) : false;

  const filteredItems = useMemo(() => {
    if (!filter || !filterActive) return items;
    return items.filter((card) => matchesFilter(card, filter));
  }, [items, filter, filterActive]);

  const displayCount = filterActive ? filteredTotalCount : totalCount;

  if (error) return <div>에러: {error}</div>;

  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Image src={getColumnIcon(index)} alt="" width={17} height={24} aria-hidden />
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.count}>{displayCount}</span>
        </div>
        <button onClick={() => setIsModalOpen(true)} type="button" aria-label="컬럼 설정">
          <SettingIcon size={20} />
        </button>
      </div>

      {/* 카드 추가 버튼 */}
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

      <div
        ref={(node) => {
          setDropRef(node);
          scrollContainerRef.current = node;
        }}
        style={{ background: isOver ? 'rgba(255,255,255,0.1)' : undefined }}
        className={`${styles.cardList} custom-scrollbar`}
      >
        {isLoading && items.length === 0 ? (
          <SkeletonCard />
        ) : (
          <>
            {filteredItems.length === 0 && filterActive && (
              <div className={styles.emptyFilter}>
                <span>필터 조건에 맞는 카드가 없습니다</span>
              </div>
            )}

            {filteredItems.map((card: CardType) => (
              <div key={card.id} className={styles.cardWrapper}>
                <DraggableCard card={card} onClick={() => onCardClick?.(card.id)} />
              </div>
            ))}

            <div ref={lastItemRef} className={styles.sentinel} />
          </>
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
