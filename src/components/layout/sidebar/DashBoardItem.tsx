import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './DashBoardItem.module.css';
import tagRed from '@/assets/hashTags/red.svg';
import tagOrange from '@/assets/hashTags/orange.svg';
import tagYellow from '@/assets/hashTags/yellow.svg';
import tagBlue from '@/assets/hashTags/blue.svg';
import tagGreen from '@/assets/hashTags/green.svg';
import pinIcon from '@/assets/icon/icon_pin.svg';
import crownIcon from '@/assets/icon/ic_crown.svg';
import Link from 'next/link';
import { DASHBOARD_COLOR_HEX_MAP } from '@/lib/constants/color';

interface DashBoardItemProps {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

export default function DashBoardItem({ id, title, color, createdByMe }: DashBoardItemProps) {
  const pathName = usePathname();
  const isActive = pathName === `/dashboard/${id}`;

  const getTagIcon = (color: string) => {
    // mock 색상명과 API Hex 색상을 같은 해시태그 아이콘으로 매핑
    switch (color) {
      case 'red':
      case DASHBOARD_COLOR_HEX_MAP['var(--color-profile-rose)']:
        return tagRed;
      case 'orange':
      case DASHBOARD_COLOR_HEX_MAP['var(--color-profile-orange)']:
        return tagOrange;
      case 'yellow':
      case DASHBOARD_COLOR_HEX_MAP['var(--color-profile-yellow)']:
        return tagYellow;
      case 'blue':
      case DASHBOARD_COLOR_HEX_MAP['var(--color-profile-cobalt)']:
        return tagBlue;
      case 'green':
      case DASHBOARD_COLOR_HEX_MAP['var(--color-profile-green)']:
        return tagGreen;
      default:
        return tagRed;
    }
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
