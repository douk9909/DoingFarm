import Link from 'next/link';
import styles from './Sidebar.module.css';
import { PATH } from '@/lib/constants/path';
import logo from '@/assets/logo/Do!ngFarm.svg';
import Image from 'next/image';
import DashBoardList from './DashBoardList';
import SidebarFooter from './SidebarFooter';

export default function Sidebar() {
  return (
    <aside className={styles.sideBar}>
      <div>
        <header className={styles.logoWrapper}>
          <Link href={PATH.HOME}>
            <Image className={styles.logoImg} src={logo} alt="로고" width={148} height={33} />
          </Link>
        </header>
        <DashBoardList />
      </div>

      <SidebarFooter />
    </aside>
  );
}
