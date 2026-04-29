'use client';

import { useState, useRef, useEffect } from 'react';

import { cn } from '@/lib/utils/cn';

import styles from './DropDownMenu.module.css';

interface MenuItem {
  id: string;
  icon?: React.ComponentType<{ className?: string; color?: string }>;
  color?: string;
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  menuItems: MenuItem[];
  position?: 'top' | 'bottom';
}

export default function DropdownMenu({
  trigger,
  menuItems,
  position = 'bottom',
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={menuRef}>
      <button className={styles.triggerButton} onClick={() => setIsOpen((prev) => !prev)}>
        {trigger}
      </button>
      {isOpen && (
        <ul className={cn(styles.menuContainer, position === 'top' ? styles.top : styles.bottom)}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.menuLi}>
              <button
                type="button"
                className={styles.menuItem}
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick();
                  setIsOpen(false);
                }}
                style={{ color: item.color }}
              >
                {item.icon && <item.icon className={styles.menuIcon} color={item.color} />}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
