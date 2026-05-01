'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import EditIcon from '@/assets/icons/EditIcon';
import LogoutIcon from '@/assets/icons/LogoutIcon';
import SettingIcon from '@/assets/icons/SettingIcon';
import DropdownMenu from '@/components/common/DropDownMenu/DropDownMenu';
import styles from './SidebarFooter.module.css';
import { PATH } from '@/lib/constants/path';

interface SideBarFooterProps {
  nickname: string;
  profileImageUrl: string | null;
}

function isValidImageUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  return url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://');
}

export default function SidebarFooter({ nickname, profileImageUrl }: SideBarFooterProps) {
  const router = useRouter();

  const menuItems = [
    {
      id: 'profile',
      icon: EditIcon,
      label: '프로필 변경',
      onClick: () => router.push(PATH.MY_PAGE),
    },
    {
      id: 'logout',
      icon: LogoutIcon,
      label: '로그아웃',
      color: 'var(--color-danger)',
      onClick: () => {
        // TODO: 로그아웃 API 호출
        router.push(PATH.LOGIN);
      },
    },
  ];

  const trigger = <SettingIcon size={20} />;

  return (
    <footer className={styles.footer}>
      <button className={styles.nameWrapper} onClick={() => router.push(PATH.MY_PAGE)}>
        {isValidImageUrl(profileImageUrl) ? (
          <Image
            src={profileImageUrl}
            alt={nickname}
            width={30}
            height={30}
            className={styles.profileImg}
          />
        ) : (
          <div className={styles.profile}>{nickname.slice(0, 2)}</div>
        )}
        <span className={styles.userName}>{nickname}</span>
      </button>

      <DropdownMenu trigger={trigger} menuItems={menuItems} position="top" />
    </footer>
  );
}
