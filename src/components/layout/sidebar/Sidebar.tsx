import type { MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Sidebar.module.css';
import { PATH } from '@/lib/constants/path';
import logo from '@/assets/logo/Do!ngFarm.svg';
import DashBoardList from './DashBoardList';
import SidebarFooter from './SidebarFooter';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

// Mock 유저
const mockUser = {
  id: 0,
  email: 'text@gmail.com',
  nickname: '박민영',
  profileImageUrl: 'string',
  createdAt: '2026-04-23T11:56:44.104Z',
  updatedAt: '2026-04-23T11:56:44.104Z',
};

export default function Sidebar({
  isMobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  // 링크 클릭 닫힘
  const handleClickCapture = (event: MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    if (event.target.closest('a')) {
      onCloseMobile?.();
    }
  };

  return (
    <aside
      className={`${styles.sideBar} ${isMobileOpen ? styles.mobileOpen : ''}`}
      onClickCapture={handleClickCapture}
    >
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
