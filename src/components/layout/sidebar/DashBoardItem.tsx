import Image from 'next/image';
import styles from './DashBoardItem.module.css';
import tagRed from '@/assets/hashTags/red.svg';
import tagOrange from '@/assets/hashTags/orange.svg';
import tagYellow from '@/assets/hashTags/yellow.svg';
import tagBlue from '@/assets/hashTags/blue.svg';
import tagGreen from '@/assets/hashTags/green.svg';
import pinIcon from '@/assets/icon/icon_pin.svg';
import crownIcon from '@/assets/icon/ic_crown.svg';

export default function DashBoardItem() {
  return (
    <div className={styles.menu}>
      <div>
        <Image className={styles.hashTag} src={tagRed} alt="" width={24} height={24} />
        <p>포트폴리오</p>
        <Image className={styles.pin} src={pinIcon} alt="" width={24} height={24} />
      </div>
      <Image className={styles.crown} src={crownIcon} alt="" width={24} height={24} />
    </div>
  );
}
