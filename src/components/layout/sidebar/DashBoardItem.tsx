import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './DashBoardItem.module.css';
import HashTagIcon from '@/assets/icons/HashTagIcon';
import pinIcon from '@/assets/icon/icon_pin.svg';
import crownIcon from '@/assets/icon/ic_crown.svg';
import { DASHBOARD_COLOR_HEX_MAP } from '@/lib/constants/color';

interface DashBoardItemProps {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

const LEGACY_COLOR_MAP: Record<string, string> = {
  red: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-rose)'],
  orange: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-orange)'],
  yellow: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-yellow)'],
  blue: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-cobalt)'],
  green: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-green)'],
  purple: DASHBOARD_COLOR_HEX_MAP['var(--color-profile-violet)'],
};

export default function DashBoardItem({ id, title, color, createdByMe }: DashBoardItemProps) {
  const pathName = usePathname();
  const isActive = pathName === `/dashboard/${id}`;
  const hashTagColor = LEGACY_COLOR_MAP[color] ?? color;

  return (
    <Link href={`/dashboard/${id}`} className={`${styles.menu} ${isActive ? styles.active : ''}`}>
      <div>
        <HashTagIcon className={styles.hashTag} size={24} color={hashTagColor} aria-hidden />
        <p className={styles.title}>{title}</p>
        <Image className={styles.pin} src={pinIcon} alt="" width={24} height={24} />
      </div>

      {createdByMe && (
        <Image className={styles.crown} src={crownIcon} alt="" width={24} height={24} />
      )}
    </Link>
  );
}
