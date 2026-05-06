'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import EditIcon from '@/assets/icons/EditIcon';
import LogoutIcon from '@/assets/icons/LogoutIcon';
import SettingIcon from '@/assets/icons/SettingIcon';
import DropdownMenu from '@/components/common/DropDownMenu/DropDownMenu';
import styles from './SidebarFooter.module.css';
import { PATH } from '@/lib/constants/path';
import { authApi } from '@/lib/api/auth';
import { removeToken } from '@/lib/utils/storage';
import { showToast } from '@/lib/utils/toast';
import { useState, useEffect, Suspense } from 'react';
import { userApi } from '@/lib/api/user';
import type { User } from '@/types/user';
import SkeletonFooter from './SkeletonFooter';
import Avatar from '@/components/common/avatar/Avatar';

function isValidImageUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  return url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://');
}

export default function SidebarFooter() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchUserData = async () => {
      try {
        const res = await userApi.getMe();
        if (isMounted) setUser(res.data);
      } catch (error) {
        console.error('유저 정보를 불러오지 못했습니다.', error);
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchUserData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleProfileUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<User>;
      if (customEvent.detail) {
        setUser(customEvent.detail);
      }
    };
    window.addEventListener('profile-updated', handleProfileUpdate);
    return () => window.removeEventListener('profile-updated', handleProfileUpdate);
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
    } finally {
      removeToken();
      showToast.success('로그아웃 되었습니다.');
      router.push(PATH.LOGIN);
    }
  };

  const menuItems = [
    {
      id: 'profile',
      icon: EditIcon,
      label: '프로필 변경',
      href: PATH.MY_PAGE,
    },
    {
      id: 'logout',
      icon: LogoutIcon,
      label: '로그아웃',
      color: 'var(--color-danger)',
      onClick: handleLogout,
    },
  ];

  const trigger = <SettingIcon size={20} />;

  if (isLoading) {
    return (
      <footer className={styles.footer}>
        <SkeletonFooter />
      </footer>
    );
  }

  if (!user) {
    return (
      <footer className={styles.footer}>
        <span className={styles.userName}>로그인이 필요합니다.</span>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <Link href={PATH.MY_PAGE} className={styles.nameWrapper}>
        <Avatar
          src={user.profileImageUrl}
          alt={user.nickname}
          name={user.nickname}
          className={styles.profileImg}
        />
        <span className={styles.userName}>{user.nickname}</span>
      </Link>

      <DropdownMenu trigger={trigger} menuItems={menuItems} position="top" />
    </footer>
  );
}
