'use client';

import { useState, useRef, useEffect } from 'react';

import styles from './DropdownMenu.module.css';

interface MenuItem {
  icon?: React.ComponentType<{ className?: string; color?: string }>;
  color?: string;
  label: string;
  onClick: () => void;
}

interface DropdownMenuProps {
  children?: React.ReactNode;
  menuItems: MenuItem[];
}

export default function DropdownMenu({ children, menuItems, ...props }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  return (
    <div className={styles.container} ref={menuRef}>
      <button className={styles.triggerButton} onClick={() => setIsOpen(!isOpen)}>
        {children}
      </button>
      {isOpen && (
        <ul className={styles.menuContainer}>
          {menuItems.map((item) => (
            <li
              key={item.label}
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
