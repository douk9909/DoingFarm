'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { memberApi } from '@/lib/api/member';
import { useFetch } from '@/hooks/queries/useFetch';

import { cn } from '@/lib/utils/cn';
import { PATH } from '@/lib/constants/path';
import Avatar from '@/components/common/avatar/Avatar';

import characterImg from '@/assets/character/carrot1.svg';
import SidebarIcon from '@/assets/icons/SidebarIcon';
import SettingIcon from '@/assets/icons/SettingIcon';
import UserPlusIcon from '@/assets/icons/UserPlusIcon';

import styles from './Navbar.module.css';

const MAX_VISIBLE_USERS = 5;

interface NavbarProps {
  isMobileSidebarOpen?: boolean;
  onOpenMobileSidebar?: () => void;
}

export default function Navbar({ isMobileSidebarOpen = false, onOpenMobileSidebar }: NavbarProps) {
  const pathname = usePathname();
  const dashboardId = Number(pathname.split('/')[2]);
  const isMyDashboard = pathname === PATH.MY_DASHBOARD || pathname === PATH.MY_PAGE;

  const { data: membersData } = useFetch(() =>
    memberApi
      .getList(dashboardId, { page: 1, size: MAX_VISIBLE_USERS })
      .then((res) => ({ data: res.data })),
  );

  const displayMembers = membersData?.members || [];
  const totalCount = membersData?.totalCount || 0;
  const extraCount = totalCount - MAX_VISIBLE_USERS;

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
          <SidebarIcon size={24} className={styles.buttonIcon} />
        </button>
      </div>

      <div className={styles.rightContainer}>
        {!isMyDashboard && (
          <>
            <div className={styles.userList}>
              {displayMembers?.map((member) => (
                <Avatar
                  key={member.userId}
                  src={member.profileImageUrl}
                  name={member.nickname}
                  alt={member.nickname}
                  className={styles.profile}
                />
              ))}
              {extraCount > 0 && <span className={styles.extraCount}>+{extraCount}</span>}
            </div>
            <div className={styles.line}></div>

            <div className={styles.buttonContainer}>
              <Link
                href={`${pathname}/edit`}
                className={cn(styles.button, styles.textButton, styles.manageButton)}
              >
                <SettingIcon size={20} className={styles.buttonIcon} />
                <span>관리</span>
              </Link>

              <button
                type="button"
                className={cn(styles.button, styles.textButton, styles.inviteButton)}
              >
                <UserPlusIcon size={20} className={cn(styles.buttonIcon, styles.iconStyle)} />
                <span>초대</span>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
