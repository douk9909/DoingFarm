import Link from 'next/link';
import styles from './Sidebar.module.css';
import { PATH } from '@/lib/constants/path';
import logo from '@/assets/logo/Do!ngFarm.svg';
import Image from 'next/image';
import DashBoardList from './DashBoardList';
import SidebarFooter from './SidebarFooter';

// api 연동 후 삭제
const mockUser = {
  id: 0,
  email: 'text@gmail.com',
  nickname: '박민영',
  profileImageUrl: 'string',
  createdAt: '2026-04-23T11:56:44.104Z',
  updatedAt: '2026-04-23T11:56:44.104Z',
};

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

      <SidebarFooter nickname={mockUser.nickname} profileImageUrl={mockUser.profileImageUrl} />
    </aside>
  );
}
