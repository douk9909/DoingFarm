import settingIcon from '@/assets/icon/ic_setting.svg';
import Image from 'next/image';
import styles from './SidebarFooter.module.css';

export default function SidebarFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.nameWrapper}>
        <div className={styles.profile}>민영</div>
        <p className={styles.userName}>박민영</p>
      </div>
      <Image src={settingIcon} alt="세팅" width={20} height={20} />
    </footer>
  );
}
