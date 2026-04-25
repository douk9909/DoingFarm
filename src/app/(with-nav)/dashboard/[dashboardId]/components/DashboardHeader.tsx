import Image from 'next/image';
import tagRed from '@/assets/hashTags/red.svg';
import tagOrange from '@/assets/hashTags/orange.svg';
import tagYellow from '@/assets/hashTags/yellow.svg';
import tagBlue from '@/assets/hashTags/blue.svg';
import tagGreen from '@/assets/hashTags/green.svg';
import styles from './DashboardHeader.module.css';
import AddColumnButton from './AddColumnButton';

interface DashBoardHeaderProps {
  title: string;
  color: string;
}

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

export default function DashBoardHeader({ title, color }: DashBoardHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.titleWrapper}>
        <Image src={getTagIcon(color)} alt="" width={36} height={36} />
        <h1 className={styles.title}>{title}</h1>
      </div>
      <AddColumnButton />
    </header>
  );
}
