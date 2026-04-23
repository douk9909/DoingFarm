import settingIcon from '@/assets/icon/ic_setting.svg';
import Image from 'next/image';
import styles from './SidebarFooter.module.css';

interface SideBarFooterProps {
  nickname: string;
  profileImageUrl: string;
}

export default function SidebarFooter({ nickname, profileImageUrl }: SideBarFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.nameWrapper}>
        {/* api 연동 후 프로필 이미지 바꾸기 */}
        <div className={styles.profile}>민영</div>
        <p className={styles.userName}>{nickname}</p>
      </div>
      <Image src={settingIcon} alt="세팅" width={20} height={20} />
    </footer>
  );
}
