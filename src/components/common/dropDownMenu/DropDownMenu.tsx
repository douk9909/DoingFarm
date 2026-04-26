'use client';

import { useState, useRef, useEffect } from 'react';

import MoreIcon from '@/assets/icons/MoreIcon';
import SettingIcon from '@/assets/icons/SettingIcon';

import styles from './DropdownMenu.module.css';

interface dropDownMenuProps {
  status: 'setting' | 'kebab';
  menuItems: Array<{
    label: string;
    onClick: () => void;
  }>;
}

const ICON_MAP = {
  setting: SettingIcon,
  kebab: MoreIcon,
};

export default function DropdownMenu({ status, menuItems }: dropDownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const Icon = ICON_MAP[status];

  return (
    <div className={styles.container} ref={menuRef}>
      <button type="button" className={styles.iconButton} onClick={() => setIsOpen(!isOpen)}>
        <Icon />
      </button>
      {isOpen && (
        <ul className={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <li key={index} onClick={item.onClick} className={styles.menuitem}>
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
