import styles from './DashboardHeader.module.css';
import AddColumnButton from './AddColumnButton';
import HashTagIcon from '@/assets/icons/HashTagIcon';

interface DashBoardHeaderProps {
  title: string;
  color: string;
}

export default function DashBoardHeader({ title, color }: DashBoardHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.titleWrapper}>
        <HashTagIcon className={styles.hashTag} size={36} color={color} />
        <h1 className={styles.title}>{title}</h1>
      </div>
      <AddColumnButton />
    </header>
  );
}
