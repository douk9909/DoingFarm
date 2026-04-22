import Image from 'next/image';
import Avatar from '@/components/common/avatar/Avatar';
import characterImg from '@/assets/character/carrot1.svg';
import sideMenuIcon from '@/assets/icon/ic_sidemenu.svg';
import settingIcon from '@/assets/icon/ic_setting.svg';
import userPlusIcon from '@/assets/icon/ic_user-plus.svg';
import styles from './Navbar.module.css';
import { cn } from '@/lib/utils/cn';

export default function Navbar() {
  return (
    <header className={styles.container}>
      <div className={styles.leftContainer}>
        <Image src={characterImg} alt="캐릭터이미지" height={72} className={styles.characterImg} />
        <button className={cn(styles.button, styles.sideMenuButton)}>
          <Image src={sideMenuIcon} alt="사이드메뉴아이콘" className={styles.onlyMobileIcon} />
        </button>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.userList}>
          <Avatar src={null} name="홍길동" className={styles.profile} />
          <Avatar src={null} name="김순덕" className={styles.profile} />
          <Avatar src={null} name="박미자" className={styles.profile} />
          <Avatar src={null} name="김순이" className={styles.profile} />
        </div>
        <div className={styles.line}></div>
        <div className={styles.buttonContainer}>
          {/* Todo: dashboard/{dashboardId}/edit로 페이지 이동 */}
          <button className={cn(styles.button, styles.textButton)}>
            <Image src={settingIcon} alt="설정아이콘" />
            <span>관리</span>
          </button>
          {/* Todo: 초대하기 모달창 띄우기 */}
          <button className={cn(styles.button, styles.textButton, styles.inviteButton)}>
            <Image src={userPlusIcon} alt="초대아이콘" className={styles.iconStyle} />
            <span>초대</span>
          </button>
        </div>
      </div>
    </header>
  );
}
