'use client';

import type { ReactNode } from 'react';
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import { cn } from '@/lib/utils/cn';
import styles from './TodoFormDropdown.module.css';

interface TodoFormDropdownProps<T> {
  label: string;
  isOpen: boolean;
  options: T[];
  placeholder: string;
  selectedContent?: ReactNode;
  getOptionKey: (option: T) => string | number;
  isOptionSelected?: (option: T) => boolean;
  onToggle: () => void;
  onSelect: (option: T) => void;
  renderOption?: (option: T, index: number) => ReactNode;
}

interface TodoDropdownAvatarProps {
  color: string;
  children: ReactNode;
}

export function TodoDropdownAvatar({ color, children }: TodoDropdownAvatarProps) {
  return (
    <span className={styles.avatar} style={{ backgroundColor: color }}>
      {children}
    </span>
  );
}

export default function TodoFormDropdown<T>({
  label,
  isOpen,
  options,
  placeholder,
  selectedContent,
  getOptionKey,
  isOptionSelected,
  onToggle,
  onSelect,
  renderOption,
}: TodoFormDropdownProps<T>) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <div className={styles.dropdown}>
        <button
          type="button"
          className={styles.dropdownButton}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`${label} 선택`}
          onClick={onToggle}
        >
          <span className={styles.selectedContent}>{selectedContent ?? placeholder}</span>
          <ArrowDownIcon
            size={16}
            color="var(--color-gray-600)"
            className={cn(isOpen && styles.arrowOpen)}
          />
        </button>

        {isOpen ? (
          <div className={styles.dropdownMenu} role="listbox" aria-label={`${label} 목록`}>
            {options.map((option, index) => (
              <button
                key={getOptionKey(option)}
                type="button"
                className={styles.dropdownOption}
                role="option"
                aria-selected={isOptionSelected?.(option) ?? false}
                onClick={() => onSelect(option)}
              >
                {renderOption ? renderOption(option, index) : String(getOptionKey(option))}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
