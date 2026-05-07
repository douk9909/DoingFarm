'use client';

import { useMemo } from 'react';
import Avatar from '@/components/common/avatar/Avatar';
import CloseIcon from '@/assets/icons/CloseIcon';
import { getHashColor } from '@/lib/utils/color';
import styles from './CardFilter.module.css';

export interface FilterState {
  tags: string[];
  assignees: number[];
}

export interface AssigneeInfo {
  id: number;
  nickname: string;
  profileImageUrl?: string | null;
}

interface CardFilterProps {
  allTags: string[];
  allAssignees: AssigneeInfo[];
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
}

export const EMPTY_FILTER: FilterState = { tags: [], assignees: [] };

export function isFilterActive(filter: FilterState): boolean {
  return filter.tags.length > 0 || filter.assignees.length > 0;
}

export function matchesFilter(
  card: { tags: string[]; assignee: { id: number } } | { tags: string[]; assigneeId: number },
  filter: FilterState,
): boolean {
  const hasTagFilter = filter.tags.length > 0;
  const hasAssigneeFilter = filter.assignees.length > 0;

  if (hasTagFilter) {
    const matchesTag = card.tags.some((tag) => filter.tags.includes(tag));
    if (!matchesTag) return false;
  }

  if (hasAssigneeFilter) {
    const assigneeId = 'assignee' in card ? card.assignee.id : card.assigneeId;
    if (!filter.assignees.includes(assigneeId)) return false;
  }

  return true;
}

export default function CardFilter({
  allTags,
  allAssignees,
  filter,
  onFilterChange,
}: CardFilterProps) {
  const hasActiveFilter = isFilterActive(filter);

  const sortedTags = useMemo(() => [...allTags].sort((a, b) => a.localeCompare(b)), [allTags]);

  const toggleTag = (tag: string) => {
    const next = filter.tags.includes(tag)
      ? filter.tags.filter((t) => t !== tag)
      : [...filter.tags, tag];
    onFilterChange({ ...filter, tags: next });
  };

  const toggleAssignee = (id: number) => {
    const next = filter.assignees.includes(id)
      ? filter.assignees.filter((a) => a !== id)
      : [...filter.assignees, id];
    onFilterChange({ ...filter, assignees: next });
  };

  const clearAll = () => {
    onFilterChange(EMPTY_FILTER);
  };

  if (sortedTags.length === 0 && allAssignees.length === 0) return null;

  return (
    <div className={styles.filterContainer}>
      {sortedTags.length > 0 && (
        <div className={styles.filterSection}>
          <span className={styles.filterLabel}>태그</span>
          <div className={styles.chipList}>
            {sortedTags.map((tag) => {
              const isActive = filter.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={`${styles.chip} ${isActive ? styles.chipActive : ''}`}
                  style={
                    {
                      '--chip-color': getHashColor(tag),
                    } as React.CSSProperties
                  }
                  onClick={() => toggleTag(tag)}
                  aria-pressed={isActive}
                >
                  <span className={styles.chipDot} />
                  <span className={styles.chipText}>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {allAssignees.length > 0 && (
        <div className={styles.filterSection}>
          <span className={styles.filterLabel}>담당자</span>
          <div className={styles.chipList}>
            {allAssignees.map((assignee) => {
              const isActive = filter.assignees.includes(assignee.id);
              return (
                <button
                  key={assignee.id}
                  type="button"
                  className={`${styles.chip} ${styles.assigneeChip} ${isActive ? styles.chipActive : ''}`}
                  onClick={() => toggleAssignee(assignee.id)}
                  aria-pressed={isActive}
                >
                  <Avatar
                    src={assignee.profileImageUrl}
                    alt={assignee.nickname}
                    name={assignee.nickname}
                    className={styles.chipAvatar}
                  />
                  <span className={styles.chipText}>{assignee.nickname}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {hasActiveFilter && (
        <button type="button" className={styles.clearButton} onClick={clearAll}>
          <CloseIcon size={12} />
          <span>필터 초기화</span>
        </button>
      )}
    </div>
  );
}
