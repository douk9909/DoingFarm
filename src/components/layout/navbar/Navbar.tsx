'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Avatar from '@/components/common/avatar/Avatar';
import { cn } from '@/lib/utils/cn';
import { PATH } from '@/lib/constants/path';
import characterImg from '@/assets/character/carrot1.svg';
import sideMenuIcon from '@/assets/icon/ic_sidemenu.svg';
import settingIcon from '@/assets/icon/ic_setting.svg';
import userPlusIcon from '@/assets/icon/ic_user-plus.svg';
import styles from './Navbar.module.css';

const MAX_VISIBLE_USERS = 5;

interface NavbarProps {
  isMobileSidebarOpen?: boolean;
  onOpenMobileSidebar?: () => void;
}

export default function Navbar({
  isMobileSidebarOpen = false,
  onOpenMobileSidebar,
}: NavbarProps) {
  const pathname = usePathname();
  const isMyDashboard = pathname === PATH.MY_DASHBOARD;

  // Mock 유저
  const users = [
    { id: 1, nickname: '김순미', profileImage: null },
    { id: 2, nickname: '김선달', profileImage: null },
    { id: 3, nickname: '박민영', profileImage: null },
    { id: 4, nickname: '김서이', profileImage: null },
    { id: 5, nickname: '박지연', profileImage: null },
    { id: 6, nickname: '손유림', profileImage: null },
    { id: 7, nickname: '최민규', profileImage: null },
    { id: 8, nickname: '정하민', profileImage: null },
  ];

  const displayUsers = users.slice(0, MAX_VISIBLE_USERS);
  const extraCount = users.length - MAX_VISIBLE_USERS;

  return (
    <header className={styles.container}>
      <div className={styles.leftContainer}>
        <Image
          src={characterImg}
          alt="캐릭터 이미지"
          width={60}
          height={72}
          className={styles.characterImg}
        />
        <button
          type="button"
          aria-label="사이드바 열기"
          aria-expanded={isMobileSidebarOpen}
          className={cn(
            styles.button,
            styles.sideMenuButton,
            isMobileSidebarOpen && styles.sideMenuButtonOpen,
          )}
          onClick={onOpenMobileSidebar}
        >
          <Image src={sideMenuIcon} alt="" className={styles.onlyMobileIcon} />
        </button>
      </div>

      <div className={styles.rightContainer}>
        {!isMyDashboard && (
          <>
            <div className={styles.userList}>
              {displayUsers.map((user) => (
                <Avatar
                  key={user.id}
                  src={user.profileImage}
                  name={user.nickname}
                  alt={user.nickname}
                  className={styles.profile}
                />
              ))}
              {extraCount > 0 && <span className={styles.extraCount}>+{extraCount}</span>}
            </div>
            <div className={styles.line}></div>
          </>
        )}

        <div className={styles.buttonContainer}>
          <button type="button" className={cn(styles.button, styles.textButton, styles.manageButton)}>
            <Image src={settingIcon} alt="설정 아이콘" className={styles.buttonIcon} />
            <span>관리</span>
          </button>

          <button type="button" className={cn(styles.button, styles.textButton, styles.inviteButton)}>
            <Image src={userPlusIcon} alt="초대 아이콘" className={cn(styles.buttonIcon, styles.iconStyle)} />
            <span>초대</span>
          </button>
        </div>
      </div>
    </header>
  );
}
