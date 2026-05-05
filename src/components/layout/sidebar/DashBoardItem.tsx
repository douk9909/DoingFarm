import type { MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './DashBoardItem.module.css';
import HashTagIcon from '@/assets/icons/HashTagIcon';
import PinIcon from '@/assets/icons/PinIcon';
import crownIcon from '@/assets/icon/ic_crown.svg';
import { DASHBOARD_COLOR_HEX_MAP } from '@/lib/constants/color';

interface DashBoardItemProps {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
  pinned?: boolean;
  onTogglePin?: (id: number) => void;
}

const LEGACY_COLOR_MAP: Record<string, string> = {
  red: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-rose)'],
  orange: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-orange)'],
  yellow: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-yellow)'],
  blue: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-cobalt)'],
  green: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-green)'],
  purple: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-violet)'],
};

export default function DashBoardItem({
  id,
  title,
  color,
  createdByMe,
  pinned = false,
  onTogglePin,
}: DashBoardItemProps) {
  const pathName = usePathname();
  const isActive = pathName === `/dashboard/${id}`;
  const hashTagColor = LEGACY_COLOR_MAP[color] ?? color;

  const handlePinClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin?.(id);
  };

  return (
    <Link href={`/dashboard/${id}`} className={`${styles.menu} ${isActive ? styles.active : ''}`}>
      <div>
        <HashTagIcon className={styles.hashTag} size={24} color={hashTagColor} aria-hidden />
        <p className={styles.title}>{title}</p>
        <button
          type="button"
          className={`${styles.pinButton} ${pinned ? styles.pinned : ''}`}
          onClick={handlePinClick}
          aria-label={pinned ? '고정 해제' : '고정'}
        >
          <PinIcon className={styles.pinIcon} size={24} pinned={pinned} />
        </button>
      </div>

      {createdByMe && (
        <Image className={styles.crown} src={crownIcon} alt="" width={24} height={24} />
      )}
    </Link>
  );
}
