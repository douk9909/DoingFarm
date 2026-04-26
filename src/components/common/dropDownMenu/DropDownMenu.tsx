'use client';

import { useState, useRef, useEffect } from 'react';

import styles from './DropdownMenu.module.css';

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
}

export default function DropdownMenu({ trigger, menuItems }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={styles.container} ref={menuRef}>
      <button className={styles.triggerButton} onClick={() => setIsOpen((prev) => !prev)}>
        {trigger}
      </button>
      {isOpen && (
        <ul className={styles.menuContainer}>
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
                setIsOpen(false);
              }}
              className={styles.menuItem}
              style={{ color: item.color }}
            >
              {item.icon && <item.icon className={styles.menuIcon} color={item.color} />}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
