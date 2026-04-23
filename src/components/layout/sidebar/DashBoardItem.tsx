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
    switch (color) {
      case 'red':
        return tagRed;
      case 'orange':
        return tagOrange;
      case 'yellow':
        return tagYellow;
      case 'blue':
        return tagBlue;
      case 'green':
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
