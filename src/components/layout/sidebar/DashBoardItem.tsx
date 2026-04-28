import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './DashBoardItem.module.css';
import tagRed from '@/assets/hashTags/red.svg';
import tagOrange from '@/assets/hashTags/orange.svg';
import tagYellow from '@/assets/hashTags/yellow.svg';
import tagBlue from '@/assets/hashTags/blue.svg';
import tagGreen from '@/assets/hashTags/green.svg';
import tagPurple from '@/assets/hashTags/purple.svg';
import pinIcon from '@/assets/icon/icon_pin.svg';
import crownIcon from '@/assets/icon/ic_crown.svg';
import { DASHBOARD_COLOR_HEX_MAP } from '@/lib/constants/color';

interface DashBoardItemProps {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

const DASHBOARD_TAG_ICON_MAP = {
  red: tagRed,
  [DASHBOARD_COLOR_HEX_MAP['var(--color-profile-rose)']]: tagRed,
  orange: tagOrange,
  [DASHBOARD_COLOR_HEX_MAP['var(--color-profile-orange)']]: tagOrange,
  yellow: tagYellow,
  [DASHBOARD_COLOR_HEX_MAP['var(--color-profile-yellow)']]: tagYellow,
  blue: tagBlue,
  [DASHBOARD_COLOR_HEX_MAP['var(--color-profile-cobalt)']]: tagBlue,
  green: tagGreen,
  [DASHBOARD_COLOR_HEX_MAP['var(--color-profile-green)']]: tagGreen,
  purple: tagPurple,
  [DASHBOARD_COLOR_HEX_MAP['var(--color-profile-violet)']]: tagPurple,
};

export default function DashBoardItem({ id, title, color, createdByMe }: DashBoardItemProps) {
  const pathName = usePathname();
  const isActive = pathName === `/dashboard/${id}`;

  const getTagIcon = (color: string) => {
    // API Hex 색상도 기존 해시태그 아이콘에 맞춰 표시
    return DASHBOARD_TAG_ICON_MAP[color as keyof typeof DASHBOARD_TAG_ICON_MAP] ?? tagRed;
  };

  return (
    <Link href={`/dashboard/${id}`} className={`${styles.menu} ${isActive ? styles.active : ''}`}>
      <div>
        <Image className={styles.hashTag} src={getTagIcon(color)} alt="" width={24} height={24} />
        <p className={styles.title}>{title}</p>
        <Image className={styles.pin} src={pinIcon} alt="" width={24} height={24} />
      </div>

      {createdByMe && (
        <Image className={styles.crown} src={crownIcon} alt="" width={24} height={24} />
      )}
    </Link>
  );
}
